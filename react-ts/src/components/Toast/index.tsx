import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import ReactDOM from 'react-dom';
import {
  useToastContext,
  useToastDispatchContext,
} from '../../context/toast.context';

import './styles.css';

type ToastType = 'success' | 'error' | 'info' | 'warning';

type Message = {
  type: ToastType;
  title: string;
  id: string;
};

export default function Toast() {
  const { messages } = useToastContext();
  const [closing, setClosing] = useState(false);
  const dispatch = useToastDispatchContext();

  const element = useMemo(() => document.createElement('div'), []);

  const removeElement = useCallback(() => {
    document.body.removeChild(element);
  }, [element]);

  const removeToast = useCallback(
    (id: string) => {
      setClosing(true);
      setTimeout(() => {
        dispatch({
          type: 'REMOVE',
          id,
        });
        setClosing(false);
      }, 500);
    },
    [dispatch],
  );

  useEffect(() => {
    element.classList.add('toast_container');
    element.id = `toast${new Date().getTime()}`;
    document.body.appendChild(element);
    return () => removeElement();
  }, [element, removeElement]);

  function list() {
    return messages?.map((message: Message) => (
      <button
        onClick={() => removeToast(message.id)}
        type="button"
        className={`toast ${message.type}${closing ? ' closing' : ''}`}
        key={message.id}
      >
        {message.title}
      </button>
    ));
  }

  return ReactDOM.createPortal(list(), element);
}
