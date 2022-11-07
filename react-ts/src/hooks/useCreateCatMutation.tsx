import { useMutation } from '@tanstack/react-query';
import { request } from 'graphql-request';
import { CreateCatDocument } from '../graphql/generated/schemas';

export default function useCreateCatMutation(): any {
  const endpoint = 'http://localhost:3001/graphql';
  // eslint-disable-next-line no-return-await
  const createCat = async (data: any) =>
    // eslint-disable-next-line no-return-await
    await request(endpoint, CreateCatDocument, data);
  return useMutation(createCat);
}
