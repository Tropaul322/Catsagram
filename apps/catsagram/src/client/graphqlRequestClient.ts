import { GraphQLClient } from 'graphql-request';
import getCookie from '../helpers/getCookie';

const GRAPHQL_ENDPOINT =
  (process.env.REACT_APP_GRAPHQL_ENDPOINT as string) ||
  'http://13.40.139.212:3001/graphql';

const graphqlRequestClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
  credentials: 'include',
  mode: 'cors',
});

export default graphqlRequestClient;
