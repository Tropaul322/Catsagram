import { useQuery } from '@tanstack/react-query';
import { GraphQLClient, request } from 'graphql-request';
import useValueMemo from '../helpers/useValueMemo';
import { CheckAuthDocument } from '@cats/data-access';
import getCookie from '../helpers/getCookie';

export default function useCheckAuth(queryOptions = {}): any {
  const endpoint = 'http://13.40.139.212:3001/graphql';
  // eslint-disable-next-line no-return-await
  const client = new GraphQLClient(endpoint, {
    headers: { authorization: `Bearer ${getCookie('token')}` },
  });
  const fetchData = async () => client.request(CheckAuthDocument);
  const { data: user, ...queryState } = useQuery(['currentUser'], fetchData, {
    retry: false,
    notifyOnChangeProps: ['data', 'error'],
    ...queryOptions,
  });

  return useValueMemo(
    () => ({
      user,
      ...queryState,
    }),
    [user, queryState]
  );
}
