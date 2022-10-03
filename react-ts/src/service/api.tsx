import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/client';
import getCookie from '../helpers/getCookie';

const client = new ApolloClient({
  uri: `http://localhost:${process.env.REACT_APP_SERVER_PORT}/graphql`,
  headers: {
    authorization: `Bearer ${getCookie('token')}`,
  },
  cache: new InMemoryCache(),
});

export default client;
