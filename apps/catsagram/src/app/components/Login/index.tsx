import { memo, useState } from 'react';
import React from 'react'
import './style.css';
import { useNavigate } from 'react-router-dom';
import useLogin from '../../../hooks/useLogin';
import { useLoginMutation } from '@cats/data-access';
import graphqlRequestClient from '../../../client/graphqlRequestClient';
import { useUserDispatchContext } from '../../../context/user.context';

const Login = () => {
  const { mutate } = useLogin();
  const navigate = useNavigate();
  const dispatch = useUserDispatchContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoading, mutate: loginUser } = useLoginMutation(
    graphqlRequestClient,
    {
      onSuccess(data: any) {
        console.log(data);
        dispatch({
          type: 'SET_USER',
          user: data.login.user,
        });
        navigate('/');
      },
      onError(error: any) {
        console.log(error);
      },
    }
  );

  const submit = async (e: any) => {
    e.preventDefault();
    await loginUser({ user: { email, password } });
  };

  const onEmailChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const onPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={submit} className='login_container'>
      <div>
        <label htmlFor='email'>Email</label>
        <input id='email' onChange={onEmailChange} />
      </div>
      <div>
        <label htmlFor='password'>Passwords</label>
        <input id='password' onChange={onPasswordChange} />
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default memo(Login);
