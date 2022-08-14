import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

const sseContext = createContext({});

interface Props {
  children: ReactNode;
}

type Data = {
  message: string;
};

export function SSEProvider({ children }: Props) {
  useEffect(() => {
    const sse = new EventSource('http://localhost:3001/cat/notifications');

    function getRealtimeData(data: Data) {
      console.log(data);
    }
    sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));
    sse.onerror = () => sse.close();
    return () => {
      sse.close();
    };
  }, []);

  return <sseContext.Provider value="">{children}</sseContext.Provider>;
}

export const useSSEContext = () => useContext(sseContext);
