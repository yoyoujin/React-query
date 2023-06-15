import { useQuery } from '@tanstack/react-query';

async function fetchComments(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, {
    method: 'DELETE',
  });
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, {
    method: 'PATCH',
    data: { title: 'REACT QUERY FOREVER!!!!' },
  });
  return response.json();
}

export function PostDetail({ post }) {
  const { data, isLoading, isError, error } = useQuery(['comments', post.id], () =>
    fetchComments(post.id)
  );

  if (isLoading) return <h3>Loading...</h3>;

  if (isError)
    return (
      <>
        <h3>Error</h3>
        <p>{error.toString()}</p>
      </>
    );

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}

// Why don't commets refresh?
// - Every query uses the same key (comments)
// - Data for queries with known keys only refetched upon trigger
// - Example triggers:
//   - component remount
//   - window focus
//   - running refetch function
//   - automated refetch
//   - query invalidation after a mutation

// Solution?
// - Option: remove programmatically for every new title
//   - it's not easy
//   - it's not really what we want
// - No reason to remove data from the cache
//   - we're not even perfoming the same query!
//   - 블로그 게시물 1을 클릭했을 때 게시글 1에 대한 캐시데이터를 사용하는 것이 좋지, 게시물 2의 댓글로 덮어쓰는 것은 좋지 않음!
// - Query includes postID
//   - Cache on a per-query basis
//   - don't share cache for any 'comments' query regardless of post id
// - What we really want: label the query for each post separately
// 👉 배열에 두번째 아이템으로 postid를 함께 넘겨줘야함! [] : 쿼리에 대한 의존성 배열
