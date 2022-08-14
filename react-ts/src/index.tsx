import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import './index.css';
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

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <SSEProvider>
        <ToastProvider>
          <Routes>
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
          <Toast />
        </ToastProvider>
      </SSEProvider>
    </ApolloProvider>
  </BrowserRouter>,
);
