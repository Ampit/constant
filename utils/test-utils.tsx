// test-utils.js
import { render } from "@testing-library/react";
import type { AppProps /*, AppContext */ } from "next/app";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
// import { wrapper } from "../store"; //Our function for store initialization //HOC wich helps us use Redux with Next.js
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
// Add in any providers here if necessary:
// (ReduxProvider, ThemeProvider, etc)
const Providers = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </QueryClientProvider>
  );
};

const customRender = (ui: any, options = {}) =>
  render(ui, { wrapper: Providers, ...options } as any);

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
