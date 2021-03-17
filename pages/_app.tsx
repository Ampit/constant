import "../styles/globals.css";
import { Provider } from "next-auth/client";
import Layout from "../components/Layout";
import { wrapper } from "../store"; //Our function for store initialization //HOC wich helps us use Redux with Next.js
import { QueryClient, QueryClientProvider } from "react-query";

import { AppProps } from "next/app";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </QueryClientProvider>
  );
}

export default wrapper.withRedux(MyApp);
