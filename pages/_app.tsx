import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import GlobalStyle from 'styles/GlobalStyles';
import { theme } from 'styles/theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Stage } from 'library/enums';
import { ReactQueryDevtools } from 'react-query/devtools';
import Layout from 'library/components/Layout/Layout';
import { store } from 'library/store/index';
import { mediaQuery } from 'styles/media';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: process.env.STAGE === Stage.Development ? false : 3,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
    },
  });

  return (
    <>
      <Head>
        {' '}
        <title>{`>wechicken`}</title>
      </Head>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={{ ...theme, ...mediaQuery }}>
            <GlobalStyle />
            <Layout>
              <ReactQueryDevtools initialIsOpen={false} />
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </>
  );
}
export default MyApp;
