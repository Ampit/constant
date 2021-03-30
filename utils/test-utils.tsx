// test-utils.js
import { render } from "@testing-library/react";
import { Provider } from "next-auth/client";
import Layout from "../components/Layout";
import { wrapper } from "../store"; //Our function for store initialization //HOC wich helps us use Redux with Next.js
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
// Add in any providers here if necessary:
// (ReduxProvider, ThemeProvider, etc)
const Providers = ({ children }: any) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider session={pageProps.session}>
        <Layout>{children}</Layout>
      </Provider>
    </QueryClientProvider>
  );
};

const customRender = (ui: any, options = {}) =>
  render(ui, { wrapper: Providers, ...options } as any);

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
