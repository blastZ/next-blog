const getPostNames = () =>
  new Promise((resolve, reject) => {
    const postFileNames = preval`module.exports = require("fs").readdirSync("./pages/posts")` || [];
    resolve(postFileNames);
  });

export const getPostList = async () => {
  const postNames = await getPostNames();
  const posts = postNames.map(name => {
    const frontMatter = require(`../pages/posts/${name}`).frontMatter;

    return frontMatter;
  });

  return posts.filter(o => o && o.published).sort((a, b) => new Date(b.date) - new Date(a.date));
};
