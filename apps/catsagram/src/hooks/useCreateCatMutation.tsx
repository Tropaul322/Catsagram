import { useMutation } from '@tanstack/react-query';
import { request } from 'graphql-request';
import { CreateCatDocument } from '@cats/data-access';

export default function useCreateCatMutation(): any {
  const endpoint = 'http://13.40.139.212:3001/graphql';
  // eslint-disable-next-line no-return-await
  const createCat = async (data: any) =>
    // eslint-disable-next-line no-return-await
    await request(endpoint, CreateCatDocument, data);
  return useMutation(createCat);
}
