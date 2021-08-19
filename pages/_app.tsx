import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import GlobalStyle from 'styles/GlobalStyles';
import { theme } from 'styles/theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Layout from 'library/components/Layout/Layout';
import { store } from 'library/store/index';
import { mediaQuery } from 'styles/media';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
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
  );
}
export default MyApp;
