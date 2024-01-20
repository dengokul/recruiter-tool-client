import {
  ApolloClient,
  InMemoryCache,
  from,
  ApolloLink,
  ApolloProvider as Provider,
} from "@apollo/client";
// import { createUploadLink } from "apollo-upload-client";
import { createUploadLink } from "apollo-upload-client";
import { API_URL } from "config/constant";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }: any) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }: any) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }: any) => ({
    headers: {
      authorization: "",
      ...headers,
    },
  }));

  return forward(operation);
});

const uploadLink = createUploadLink({
  uri: API_URL,
  credentials: "same-origin",
});

export const client = new ApolloClient({
  link: from([errorLink, authLink.concat(uploadLink)]),
  cache: new InMemoryCache(),
});

export const ApolloProvider = Provider;
