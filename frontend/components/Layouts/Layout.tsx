import { AppProps } from "next/app"
import Head from "next/head"

interface Props {
  children: React.ReactNode
}

// can still have implicit children props in React 18 as follows:
// import { PropsWithChildren } from 'react';
// export const Layout: React.FC<PropsWithChildren<Props>> = ({ children }) => {
// https://stackoverflow.com/a/59106817/11616858

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>LAYOUT</title>
      </Head>

      <main>{children}</main>

    </>
  )

}

export default Layout