import { useMemo } from 'react';

const useValueMemo = (callback: () => void, deps: object[]) =>
  useMemo(
    callback,
    deps.map((dep) => JSON.stringify(dep))
  );

export default useValueMemo;
