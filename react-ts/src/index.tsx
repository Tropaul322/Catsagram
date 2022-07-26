import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import './index.css';
import Home from './components/Home';
import Admin from './components/Admin';
import AddCat from './components/AddCat';
import client from './service/api';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/add-cat" element={<AddCat />} />
          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  </>,
);
