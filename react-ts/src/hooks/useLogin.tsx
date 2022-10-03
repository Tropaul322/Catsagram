import { useMutation, useQuery } from '@tanstack/react-query';
import { request } from 'graphql-request';
import useValueMemo from '../helpers/useValueMemo';
import { LoginDocument } from '../graphql/generated/schemas';

export default function useLogin(queryOptions = {}): any {
  const endpoint = 'http://localhost:3001/graphql';
  // eslint-disable-next-line no-return-await
  const loginUser = async (data: any) => await request(endpoint, LoginDocument, data);
  return useMutation(loginUser);
}
