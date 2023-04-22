import React from 'react'
import { createContext, useContext, ReactNode, useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

const sseContext = createContext({});

interface Props {
  children: ReactNode;
}

type Data = {
  message: string;
  key: 'string';
};

export function SSEProvider({ children }: Props) {
  const queryClient = useQueryClient();
  useEffect(() => {
    const sse = new EventSource('http://35.179.74.235:3001/cat/notifications');

    function getRealtimeData(data: Data) {
      if (data.key) {
        queryClient.invalidateQueries([...data.key]);
      }
    }
    sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));
    sse.onerror = () => sse.close();
    return () => {
      sse.close();
    };
  }, [queryClient]);

  return (
    <sseContext.Provider value={queryClient}>{children}</sseContext.Provider>
  );
}

export const useSSEContext: unknown = () => useContext(sseContext);
