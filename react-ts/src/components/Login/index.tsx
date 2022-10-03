import { memo, useState } from 'react';

import './style.css';
import useLogin from '../../hooks/useLogin';
import { useUserDispatchContext } from '../../context/user.context';

const Login = () => {
  const { mutate } = useLogin();
  const dispatch = useUserDispatchContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e: any) => {
    e.preventDefault();
    await mutate({ user: { email, password } }, {
      onSuccess: ({ login }: any) => {
        document.cookie = `token=${login.access_token}`;
        dispatch({ type: 'LOGIN', user: { ...login.user } });
      },
    });
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
    <form onSubmit={submit} className="login_container">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" onChange={onEmailChange} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" onChange={onPasswordChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default memo(Login);
