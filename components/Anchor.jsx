import { useCurrentPost } from '../store';

export default function Anchor({ id }) {
  const currentPost = useCurrentPost()();
  const { anchors = [] } = currentPost;

  return (
    <div style={{ position: 'relative' }}>
      <span style={{ position: 'absolute', top: '-80px' }} id={id} />
      <h2>{`${+id + 1}.${anchors[id]}`}</h2>
    </div>
  );
}
