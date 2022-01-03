import '../styles/globals.css';
import { Provider } from "react-redux"
import store from "../redux/store";
import { QueryClientProvider, QueryClient } from 'react-query';
const queryClient = new QueryClient()
function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    // <Component {...pageProps} />
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {getLayout(
            <Component {...pageProps}></Component>
          )}
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default MyApp;
