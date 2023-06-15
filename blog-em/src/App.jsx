import { Posts } from './Posts';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient(); // provider를 추가할 수 있게됨

function App() {
  return (
    // provide React Query client to App
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <h1>Blog Posts</h1>
        <Posts />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
