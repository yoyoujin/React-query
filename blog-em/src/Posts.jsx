import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { PostDetail } from './PostDetail';

const maxPostPage = 10;

async function fetchPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0');
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  // replace with useQuery
  const { data, isLoading, isError, error } = useQuery(['posts'], fetchPosts, { staleTime: 2000 });
  // 블로그 게시물이 2초마다 만료되도록 설정함

  if (isLoading) return <h3>Loading...</h3>;
  if (isError)
    return (
      <>
        <h3>Oops, something went wrong</h3>
        <p>{error.toString()}</p>
      </>
    );
  // 리액트 쿼리는 기본적으로 3번 요청시도를 해본 후, 해당 데이터를 가져올 수 없다고 결정한다

  return (
    <>
      <ul>
        {data.map((post) => (
          <li key={post.id} className='post-title' onClick={() => setSelectedPost(post)}>
            {post.title}
          </li>
        ))}
      </ul>
      <div className='pages'>
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
