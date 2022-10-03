import { useMutation } from '@tanstack/react-query';
import { GraphQLClient, request } from 'graphql-request';
import { LikeCatDocument } from '../graphql/generated/schemas';
import getCookie from '../helpers/getCookie';

export default function useLikeCatMutation(): any {
  const endpoint = 'http://localhost:3001/graphql';
  const client = new GraphQLClient(endpoint, { headers: { authorization: `Bearer ${getCookie('token')}` } });
  // eslint-disable-next-line no-return-await
  const likeCat = async (id: number) => await client.request(LikeCatDocument, id);
  return useMutation(likeCat);
}
