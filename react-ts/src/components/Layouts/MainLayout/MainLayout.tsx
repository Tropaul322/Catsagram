import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext, useUserDispatchContext } from '../../../context/user.context';

import './styles.css';

function MainLayout({ children }: React.PropsWithChildren) {
  const { user } = useUserContext();
  const dispatch = useUserDispatchContext();

  const logout = () => {
    dispatch({
      type: 'LOGOUT',
    });
  };

  return (
    <div className="home_wrapper">
      <div className="header">
        <h1>Catsagram</h1>
        {user?.email ? <button type="button" onClick={logout}>Log out</button> : <Link to="/login">Login</Link> }
      </div>
      <div className="container">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
