import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import GlobalStyle from 'styles/GlobalStyles';
import { theme } from 'styles/theme';
import { QueryClient, QueryClientProvider } from 'react-query';
<<<<<<< HEAD
import Layout from 'library/components/Layout/Layout';
=======
import { mq } from 'styles/media';
>>>>>>> 88a66b8... feat: media.ts 작성 및 미디어 쿼리 theme 추가

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={{...theme, ...mq}}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
export default MyApp;
