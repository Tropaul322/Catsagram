import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/client';


const client = new ApolloClient({
  uri: `http://localhost:${process.env.REACT_APP_SERVER_PORT}/graphql`,
  cache: new InMemoryCache(),
});

export default client;
