import type { RouteObject } from 'react-router-dom';
import MainLayout from '../components/Layouts/MainLayout/MainLayout';
import Home from '../components/Home/index';
import Login from '../components/Login';
import CatPage from '../components/CatPage';

const authRoutes: RouteObject = {
  path: '/',
  children: [
    {
      path: 'login',
      element: <Login />,
    },
  ],
};

const normalRoutes: RouteObject = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: ':id',
      element: <CatPage />,
    },
  ],
};

const routes: RouteObject[] = [authRoutes, normalRoutes];

export default routes;
