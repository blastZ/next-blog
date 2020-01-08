import useApp from '../hooks/useApp';

export default ({ id }) => {
  const { currentPost } = useApp();
  const { anchors = [] } = currentPost;
  return (
    <div style={{ position: 'relative' }}>
      <span style={{ position: 'absolute', top: '-80px' }} id={id} />
      <h2>{`${+id + 1}.${anchors[id]}`}</h2>
    </div>
  );
};
