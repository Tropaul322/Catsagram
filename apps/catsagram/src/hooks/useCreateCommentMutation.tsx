import { useMutation } from '@tanstack/react-query';
import { GraphQLClient } from 'graphql-request';
import { CreateCommentDocument } from '@cats/data-access';
import getCookie from '../helpers/getCookie';

export default function useLikeCatMutation(): any {
  const endpoint = 'http://35.179.74.235:3001/graphql';
  // eslint-disable-next-line no-return-await, max-len
  const client = new GraphQLClient(endpoint, {
    headers: { authorization: `Bearer ${getCookie('token')}` },
  });
  const createComment = async (data: object) =>
    client.request(CreateCommentDocument, data);
  return useMutation(createComment);
}
