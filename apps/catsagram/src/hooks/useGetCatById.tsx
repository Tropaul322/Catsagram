import { useQuery } from '@tanstack/react-query';
import { GraphQLClient, request } from 'graphql-request';
import useValueMemo from '../helpers/useValueMemo';
import { GetByIdDocument } from '@cats/data-access';
import getCookie from '../helpers/getCookie';

export default function useGetCatById(variables = {}, queryOptions = {}): any {
  const endpoint = 'http://13.40.139.212:3001/graphql';
  // eslint-disable-next-line no-return-await
  const client = new GraphQLClient(endpoint, {
    headers: { authorization: `Bearer ${getCookie('token')}` },
  });
  const fetchData = async () => client.request(GetByIdDocument, variables);
  const { data: cat, ...queryState } = useQuery(['cat'], fetchData, {
    retry: false,
    notifyOnChangeProps: ['data', 'error'],
    ...queryOptions,
  });

  return useValueMemo(
    () => ({
      cat,
      ...queryState,
    }),
    [cat, queryState]
  );
}
