import { useQuery } from '@tanstack/react-query';
import { GraphQLClient, request } from 'graphql-request';
import useValueMemo from '../helpers/useValueMemo';
import { GetCatsDocument } from '@cats/data-access';
import getCookie from '../helpers/getCookie';

export default function useCats(queryOptions = {}): any {
  const endpoint = 'http://18.134.3.48:3001/graphql';
  // eslint-disable-next-line no-return-await
  const client = new GraphQLClient(endpoint, {
    headers: { authorization: `Bearer ${getCookie('token')}` },
  });
  const fetchData = async () => client.request(GetCatsDocument);
  const { data: cats, ...queryState } = useQuery(['cats'], fetchData, {
    retry: false,
    notifyOnChangeProps: ['data', 'error'],
    ...queryOptions,
  });

  return useValueMemo(
    () => ({
      cats,
      ...queryState,
    }),
    [cats, queryState]
  );
}
