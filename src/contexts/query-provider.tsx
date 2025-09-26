import { QueryClient, QueryClientProvider, type QueryClientConfig } from '@tanstack/react-query';
import type { ReactNode } from 'react';

const STALE_TIME = 300000; // 5 minutes

export class AppQueryClient extends QueryClient {
  constructor(staleTime: number = STALE_TIME, config?: QueryClientConfig) {
    super({
      defaultOptions: {
        queries: {
          staleTime,
          retry: (failureCount, error: unknown) => {
            // Don't retry on 4xx errors
            const responseError = error as { response?: { status?: number } };
            const status = responseError?.response?.status;
            if (status && status >= 400 && status < 500) {
              return false;
            }
            return failureCount < 3;
          },
        },
        mutations: {
          retry: false,
        },
      },

      ...config,
    } as QueryClientConfig);
  }
}


interface QueryProviderProps {
  queryClient: AppQueryClient;
  children: ReactNode;
}

export function QueryProvider({ queryClient, children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
