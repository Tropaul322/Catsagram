import { useCookies } from 'react-cookie';
import {
  useContext,
  createContext,
  useReducer,
  ReactNode,
  useEffect,
} from 'react';

export const userContext = createContext({});
export const userDispatchContext = createContext<any>({});

interface Props {
  children: ReactNode;
}

const userReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_USER':
      console.log(action);
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export function UserProvider({ children }: Props) {
  const [state, dispatch] = useReducer(userReducer, { user: {} });

  return (
    <userContext.Provider value={state}>
      <userDispatchContext.Provider value={dispatch}>
        {children}
      </userDispatchContext.Provider>
    </userContext.Provider>
  );
}

export const useUserContext: any = () => useContext(userContext);
export const useUserDispatchContext: any = () =>
  useContext(userDispatchContext);
