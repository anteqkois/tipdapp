import type { NextComponentType, NextPageContext } from 'next';
import type { Router } from 'next/router';

declare module 'next/app' {
  type AppProps<P = Record<string, unknown>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Component: NextComponentType<NextPageContext, any, P> & {
      isProtected: boolean;
      getLayout: (ReactNode) => JSX.Element;
    };
    router: Router;
    __N_SSG?: boolean;
    __N_SSP?: boolean;
    pageProps: P & {
      /** Initial session passed in from `getServerSideProps` or `getInitialProps` */
      session?: Session;
    };
  };
}
