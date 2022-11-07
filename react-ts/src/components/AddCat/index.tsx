/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCreateCatMutation from '../../hooks/useCreateCatMutation';
import useToast from '../../hooks/useToast';

import './style.css';

function AddCat() {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');

  const { mutate } = useCreateCatMutation();
  const toast = useToast();

  const onUrlChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setUrl(e.target.value);
  };

  const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!url) {
      return;
    }
    e.preventDefault();
    mutate({ cat: { url, likes: 0 } });
    toast.addToast({ type: 'success', title: 'New cat added!' });
    // navigate('/admin');
  };

  return (
    <div className='add_wrapper'>
      <Link to='/'>home</Link>
      <div className='add_header'>
        <h1>Add cat</h1>
      </div>

      <div className='content'>
        <label htmlFor='link'>Link</label>
        <input type='text' id='link' onChange={onUrlChange} />
        <button type='submit' onClick={submit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddCat;
