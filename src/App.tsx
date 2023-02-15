import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import HomeLayout from "layouts/Home.layout";

function App() {
  const urlAPI = process.env.REACT_APP_URL_API;

  const client = new ApolloClient({
    uri: urlAPI,
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <HomeLayout />
    </ApolloProvider>
  );
}

export default App;
