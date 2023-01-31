import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastProvider } from './context/toast.context';
import Toast from './app/components/Toast'
import { SSEProvider } from './context/sse.context';
import { queryClient } from './service/queryClient';
import { UserProvider } from './context/user.context';
import AuthMiddleware from './middleware/AuthMiddleware';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <SSEProvider>
        <UserProvider>
          <ToastProvider>
            <AuthMiddleware>
              <App />
            </AuthMiddleware>
            <ReactQueryDevtools initialIsOpen={false} />
            <Toast />
          </ToastProvider>
        </UserProvider>
      </SSEProvider>
    </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
