import { useMutation } from '@tanstack/react-query';
import { request } from 'graphql-request';
import { DeleteCatDocument } from '../graphql/generated/schemas';

export default function useDeleteCatMutation(): any {
  const endpoint = 'http://localhost:3001/graphql';
  // eslint-disable-next-line no-return-await
  const deleteCat = async (data: any) => await request(endpoint, DeleteCatDocument, data);
  return useMutation(deleteCat);
}
