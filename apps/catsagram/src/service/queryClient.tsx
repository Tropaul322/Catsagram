import { QueryClient } from '@tanstack/react-query';

// eslint-disable-next-line import/prefer-default-export
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
    },
  },
});
