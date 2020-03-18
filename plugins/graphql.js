import ApolloClient from "apollo-boost";

const apolloClient = new ApolloClient({
  uri: "/api/graphql"
});

export default apolloClient;
