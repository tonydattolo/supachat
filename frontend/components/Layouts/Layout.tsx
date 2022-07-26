import { AppProps, AppInitialProps } from "next/app";
import { PropsWithChildren } from "react";
import Head from "next/head";
import { FaFire, FaPoo, FaYoutube, FaAlipay } from "react-icons/fa";

import Channel from "@/types/Channel";

import ChannelSidebar from "@/components/ChannelSidebar/ChannelSidebar";
import TopNav from "@/components/TopNav/TopNav";
import MainChatArea from "../MainChatArea/MainChatArea";
import BottomTextInput from "../BottomTextInput/BottomTextInput";
import SidebarTest from "../SidebarTest/SidebarTest";

interface Props {
  children: React.ReactNode;
}

const exampleChannels: Channel[] = [
  {
    id: "1",
    name: "general",
    icon: <FaFire />,
  },
  {
    id: "2",
    name: "random",
    icon: <FaPoo />,
  },
  {
    id: "3",
    name: "videos",
    icon: <FaYoutube />,
  },
];

// can still have implicit children props in React 18 as follows:
// import { PropsWithChildren } from 'react';
// export const Layout: React.FC<PropsWithChildren<Props>> = ({ children }) => {
// https://stackoverflow.com/a/59106817/11616858

export const Layout: React.FC<PropsWithChildren<Props>> = ({
  children,
}: Props) => {
  // export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>LAYOUT</title>
      </Head>

      <div className="flex">
        {/* <ChannelSidebar channels={exampleChannels} /> */}
        <SidebarTest />
        <div className="flex flex-col bg-gray-300 dark:bg-gray-700 m-0 h-full w-full overflow-hidden">
          <TopNav />
          <MainChatArea />
          <BottomTextInput />
        </div>
      </div>
    </>
  );
};

export default Layout;
