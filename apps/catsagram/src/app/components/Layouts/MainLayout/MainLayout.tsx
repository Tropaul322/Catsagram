import React, { memo } from 'react';
// import { useCookies } from 'react-cookie';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import {
  useUserContext,
  useUserDispatchContext,
} from '../../../../context/user.context';

import './styles.css';

function MainLayout({ children }: React.PropsWithChildren) {
  const { user } = useUserContext();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useUserDispatchContext();

  console.log(user);

  const logout = () => {
    dispatch({
      type: 'SET_USER',
      user: {},
    });

    navigate('/login');
  };

  return (
    <div className='home_wrapper'>
      <div className='header'>
        <h1>Catsagram</h1>
        {user?.email ? (
          <button type='button' onClick={logout}>
            Log out
          </button>
        ) : (
          <Link to='/login'>Login</Link>
        )}
      </div>
      <div className='container'>
        <Outlet />
      </div>
    </div>
  );
}

export default memo(MainLayout);
