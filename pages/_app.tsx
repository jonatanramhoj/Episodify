import Header from "@/components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { QueryClientProvider, QueryClient } from "react-query";
import client from "@/utils/apolloClient";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <>
      <Head>
        <title>Episodify</title>
      </Head>
      <ApolloProvider client={client}>
        <QueryClientProvider client={queryClient}>
          <Header />
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </QueryClientProvider>
      </ApolloProvider>
    </>
  );
}
