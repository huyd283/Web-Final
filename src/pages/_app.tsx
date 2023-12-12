import '@/styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import React from 'react';
import { ToastContainer } from 'react-toastify';

import GlobalLoadingProvider from '@/hocs/GlobalLoading';
import LoadingWrapper from '@/hocs/LoadingWrapper';
import ReduxProvider from '@/hocs/ReduxProvider';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ReduxProvider>
      <GlobalLoadingProvider>
        <LoadingWrapper>
          <Component {...pageProps} />
        </LoadingWrapper>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          draggable={false}
          closeOnClick
          pauseOnHover
        />
      </GlobalLoadingProvider>
    </ReduxProvider>
  );
};

export default MyApp;
