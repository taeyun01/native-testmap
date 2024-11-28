import {QueryClient} from '@tanstack/react-query';

const queryClient = new QueryClient({
  //* Query는 기본적으로 요청이 실패하면 3번 재요청을 하는데, 이를 비활성화
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

export default queryClient;
