import { AppProps, AppInitialProps } from "next/app"
import { PropsWithChildren } from "react"
import Head from "next/head"

import ChannelSidebar from "@/components/ChannelSidebar/ChannelSidebar"

interface Props {
  children: React.ReactNode
}

// can still have implicit children props in React 18 as follows:
// import { PropsWithChildren } from 'react';
// export const Layout: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  // https://stackoverflow.com/a/59106817/11616858
  
export const Layout: React.FC<PropsWithChildren<Props>> = ({ children }) => {
// export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>LAYOUT</title>
      </Head>

      {/* <div className="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow">
        <div className="w-fixed w-full flex-shrink flex-grow-0 px-4">
            <div className="sticky top-0 p-4 w-full h-full">
                <ul>
                    <li>
                        <a href="#">Home</a>  
                    </li>
                    <li>
                        <a href="#">About</a>
                    </li>
                </ul>
            </div>
        </div> */}

        <ChannelSidebar />

        <main role="main" className="w-full flex-grow pt-1 px-3">
            {/* <!-- fluid-width: main content goes here --> */}
            {children}
        </main>
        <div className="w-fixed w-full flex-shrink flex-grow-0 px-2">
            {/* <!-- fixed-width --> */}
            <div className="flex sm:flex-col px-2">
                {/* <!-- sidebar goes here --> */}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <a href="#">Button</a>  
                </button>
            </div>
        </div>
    {/* </div> */}

      {/* <main>{children}</main> */}

    </>
  )

}

export default Layout