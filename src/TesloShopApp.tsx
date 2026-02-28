import { RouterProvider } from "react-router"
import { router } from "./router/app.router"

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Toaster } from 'sonner';
import type { PropsWithChildren } from "react";
import { CustomFullScreenLoading } from "./components/custom/CustomFullScreenLoading";
import { useAuthStore } from "./auth/store/auth.store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false
    }
  }
})

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const checkAuthStatus = useAuthStore(state => state.checkAuthStatus)
  const { isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthStatus,
    refetchInterval: 1000 * 60 * 1.5,
    refetchOnWindowFocus: true
  })
  if (isLoading) return <CustomFullScreenLoading />
  return children
}

export const TesloShopApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <CheckAuthProvider>
        <RouterProvider router={router} />
      </CheckAuthProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
