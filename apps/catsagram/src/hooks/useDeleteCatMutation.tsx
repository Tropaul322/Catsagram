import { useMutation } from '@tanstack/react-query';
import { request } from 'graphql-request';
import { DeleteCatDocument } from '@cats/data-access';

export default function useDeleteCatMutation(): any {
  const endpoint = 'http://18.134.3.48:3001/graphql';
  // eslint-disable-next-line no-return-await
  const deleteCat = async (data: any) =>
    // eslint-disable-next-line no-return-await
    await request(endpoint, DeleteCatDocument, data);
  return useMutation(deleteCat);
}
