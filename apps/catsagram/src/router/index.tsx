import React from 'react'
import type { RouteObject } from 'react-router-dom';
import MainLayout from '../app/components/Layouts/MainLayout/MainLayout';
import Home from '../app/components/Home/index';
import Login from '../app/components/Login';
import CatPage from '../app/components/CatPage';
import Admin from '../app/components/Admin';

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
    {
      path: '/admin',
      element: <Admin />
    }
  ],
};

const routes: RouteObject[] = [authRoutes, normalRoutes];

export default routes;
