import {
  useContext, createContext, useReducer, ReactNode, useEffect,
} from 'react';
import useCheckAuth from '../hooks/useCheckAuth';

export const userContext = createContext({});
export const userDispatchContext = createContext<any>({});

  interface Props {
    children: ReactNode;
  }

const userReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};

export function UserProvider({ children }: Props) {
  const [state, dispatch] = useReducer(userReducer, { user: {} });
  const { isLoading, user } = useCheckAuth();

  useEffect(() => {
    if (user) {
      dispatch({ type: 'LOGIN', user: { ...user.checkAuth } });
    }
  }, []);

  return (
    <userContext.Provider value={state}>
      <userDispatchContext.Provider value={dispatch}>
        {children}
      </userDispatchContext.Provider>
    </userContext.Provider>
  );
}

export const useUserContext: any = () => useContext(userContext);
export const useUserDispatchContext: any = () => useContext(userDispatchContext);
