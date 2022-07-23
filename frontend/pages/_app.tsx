import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next'

import { Provider as RTKProvider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "../store"

import { WagmiConfig, createClient, configureChains, chain } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import Layout from '@/components/Layouts/Layout';



const { provider, webSocketProvider } = configureChains(
  [chain.polygon],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

let persistor = persistStore(store);

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


export const MyApp: React.FC<AppPropsWithLayout> = ({ Component, pageProps }: AppPropsWithLayout) => {

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <RTKProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WagmiConfig client={client}>
          {Component.getLayout ? (
              <>
                {getLayout(<Component {...pageProps} />)}
              </>
            ) : (
              <>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </>
            )}
          {/* {getLayout(<Component {...pageProps} />)} */}
        </WagmiConfig>
      </PersistGate>
    </RTKProvider>
  )
}

export default MyApp