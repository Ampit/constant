import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import { wrapper } from "../store"; //Our function for store initialization //HOC wich helps us use Redux with Next.js
import { QueryClient, QueryClientProvider } from "react-query";

import { AppProps } from "next/app";
import { useEffect } from "react";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Turn service worker off for development
    // if ("serviceWorker" in navigator) {
    //   window.addEventListener("load", function () {
    //     navigator.serviceWorker.register("/sw.js").then(
    //       function (registration) {
    //         console.log(
    //           "Service Worker registration successful with scope: ",
    //           registration.scope
    //         ); // eslint-disable-line no-eval
    //       },
    //       function (err) {
    //         console.log("Service Worker registration failed: ", err); // eslint-disable-line no-eval
    //       }
    //     );
    //   });
    // }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <Layout {...pageProps}>
          <Component />
        </Layout>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default wrapper.withRedux(MyApp);
