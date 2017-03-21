import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo';

import App from './App';
import './index.css';

const networkInterface = createNetworkInterface({
  uri:  'https://wbdfwma4ag.execute-api.us-west-2.amazonaws.com/dev/graphql'
});
const client = new ApolloClient({
  networkInterface,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
