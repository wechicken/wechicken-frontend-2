import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import GlobalStyle from 'styles/GlobalStyles';
import { theme } from 'styles/theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Stage } from 'library/enums';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: process.env.STAGE === Stage.Development ? false : 3,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
export default MyApp;
