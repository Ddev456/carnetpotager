import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type AppType } from "next/dist/shared/lib/utils";
import { Layout } from "~/components/Layout";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  const queryClient = new QueryClient();
  return (
<QueryClientProvider client={queryClient}>
  <Layout>
      <Component {...pageProps} />
  </Layout>
</QueryClientProvider>
  );
};

export default MyApp;
