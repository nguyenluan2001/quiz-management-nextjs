import '../styles/globals.css';
import { Provider } from "react-redux"
import store from "../redux/store";
function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    // <Component {...pageProps} />
    <>
      <Provider store={store}>
        {getLayout(
          <Component {...pageProps}></Component>
        )}
      </Provider>
    </>
  );
}

export default MyApp;
