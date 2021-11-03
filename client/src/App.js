import './App.css';
import BookList from './components/BookList';
import AddBook from './components/AddBook';

import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

// apollo client set up
const client = new ApolloClient({
  uri : 'http://localhost:5000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="main">
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
