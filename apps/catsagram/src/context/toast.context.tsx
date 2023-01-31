import React from 'react'
import { useContext, createContext, useReducer, ReactNode } from 'react';

export const ToastContext = createContext({ messages: [] });
export const ToastDispatchContext = createContext<any>(null);

interface Props {
  children: ReactNode;
}

const ToastReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    case 'REMOVE':
      return {
        ...state,
        messages: [
          ...state.messages.filter(
            (message: { id: string }) => message.id !== action.id
          ),
        ],
      };
    default:
      return state;
  }
};

export function ToastProvider({ children }: Props) {
  const [state, dispatch] = useReducer(ToastReducer, { messages: [] });
  return (
    <ToastContext.Provider value={state}>
      <ToastDispatchContext.Provider value={dispatch}>
        {children}
      </ToastDispatchContext.Provider>
    </ToastContext.Provider>
  );
}

export const useToastContext: any = () => useContext(ToastContext);
export const useToastDispatchContext: any = () =>
  useContext(ToastDispatchContext);
