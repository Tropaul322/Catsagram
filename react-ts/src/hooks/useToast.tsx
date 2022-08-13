import { useToastDispatchContext } from '../context/toast.context';

type ToastType = 'success' | 'error' | 'info' | 'warning';

type Message = {
    type: ToastType;
    title: string;
}

export default function useToast() {
  const dispatch = useToastDispatchContext();

  const addToast = (newMessage: Message) => {
    const id = Math.random().toString();
    dispatch({
      type: 'ADD',
      message: { ...newMessage, id },
    });

    setTimeout(() => {
      dispatch({
        type: 'REMOVE',
        id,
      });
    }, 3000);
  };

  const removeToast = (id: number) => {
    dispatch({
      type: 'REMOVE',
      id,
    });
  };

  return {
    addToast,
    removeToast,
  };
}
