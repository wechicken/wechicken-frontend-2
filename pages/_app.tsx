import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import GlobalStyle from 'styles/GlobalStyles';
import { theme } from 'styles/theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Layout from 'library/components/Layout/Layout';
import { store } from 'library/store/index';
import { mediaQuery } from 'styles/media';
import AuthProvider from 'library/components/Layout/AuthProvider';
import SEO from 'library/components/Layout/SEO';
import ErrorBoundary from 'library/components/Layout/ErrorBoundary';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const queryClient = new QueryClient();

  return (
    <SEO>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ThemeProvider theme={{ ...theme, ...mediaQuery }}>
              <GlobalStyle />
              <Layout>
                <ErrorBoundary>
                  <ReactQueryDevtools initialIsOpen={false} />
                  <Component {...pageProps} />
                </ErrorBoundary>
              </Layout>
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </Provider>
    </SEO>
  );
}
export default MyApp;
