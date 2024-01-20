import { BrowserRouter } from "react-router-dom";
import Routes from "routes/routes";
import { ModalContextProvider } from "contexts/ModalContextProvider";
import { ApolloProvider, client } from "utils/ApolloUtils";

const App = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ModalContextProvider>
          <Routes />
        </ModalContextProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;
