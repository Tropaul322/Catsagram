import React from 'react'
import routes from '../router';
import {  useRoutes } from 'react-router-dom';

export function App() {
  const content = useRoutes(routes)
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{content}</>
  );
}

export default App;
