import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import './index.css';
import {
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Home from './components/Home';
import { ToastProvider } from './context/toast.context';
import Toast from './components/Toast';
import Admin from './components/Admin';
import AddCat from './components/AddCat';
import client from './service/api';
import CatPage from './components/CatPage';
import MainLayout from './components/Layouts/MainLayout/MainLayout';
import AdminLayout from './components/Layouts/AdminLayout/AdminLayout';
import { SSEProvider } from './context/sse.context';
import { queryClient } from './service/queryClient';
import Login from './components/Login';
import { UserProvider } from './context/user.context';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}>
        <SSEProvider>
          <UserProvider>
            <ToastProvider>
              <Routes>
                <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
                <Route path="/" element={<MainLayout><Home /></MainLayout>} />
                <Route path="/:id" element={<MainLayout><CatPage /></MainLayout>} />
                <Route path="/admin" element={<AdminLayout><Admin /></AdminLayout>} />
                <Route path="/admin/add-cat" element={<AdminLayout><AddCat /></AdminLayout>} />
                <Route
                  path="*"
                  element={(
                    <main style={{ padding: '1rem' }}>
                      <p>There's nothing here!</p>
                    </main>
              )}
                />
              </Routes>
              <ReactQueryDevtools initialIsOpen={false} />
              <Toast />
            </ToastProvider>
          </UserProvider>
        </SSEProvider>
      </ApolloProvider>
    </QueryClientProvider>
  </BrowserRouter>,
);
