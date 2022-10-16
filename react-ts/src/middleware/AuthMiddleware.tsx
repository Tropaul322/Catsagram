import { useCookies } from 'react-cookie';
import React, { memo, useEffect } from 'react';
import { gql } from 'graphql-request';
import { useNavigate } from 'react-router-dom';
import {
  useCheckAuthQuery,
  CheckAuthQuery,
} from '../graphql/generated/schemas';
import graphqlRequestClient from '../client/graphqlRequestClient';
import {
  useUserDispatchContext,
  useUserContext,
} from '../context/user.context';

export const REFRESH_ACCESS_TOKEN = gql`
  query {
    refresh {
      access_token
    }
  }
`;

type AuthMiddlewareProps = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const dispatch = useUserDispatchContext();
  const [cookie] = useCookies();
  // eslint-disable-next-line no-unused-expressions
  useEffect(() => {
    if (!user?.email && !cookie.access_token) {
      navigate('/login');
    }
  }, []);

  const query = useCheckAuthQuery<CheckAuthQuery, Error>(
    graphqlRequestClient,
    {},
    {
      enabled: Boolean(cookie.access_token),
      retry: false,
      onSuccess: (data) => {
        dispatch({
          type: 'SET_USER',
          user: { email: data.checkAuth.email, id: data.checkAuth.id },
        });
      },
      onError(error: any) {
        error.response.errors.forEach(async (err: any) => {
          if (err.message.includes('Unauthorized')) {
            try {
              await graphqlRequestClient.request(REFRESH_ACCESS_TOKEN);
              query.refetch();
            } catch (e) {
              navigate('/login');
            }
          }
        });
      },
    }
  );

  if (query.isLoading && query.isFetching && cookie.access_token) {
    return <div>Loading</div>;
  }

  return children;
};

export default memo(AuthMiddleware);
