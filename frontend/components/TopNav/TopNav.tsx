import { FaHashtag } from "react-icons/fa";

import ConnectButton from "../ConnectButton/ConnectButton";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

const TopNav: React.FC = () => {
  return (
    <nav
      className="flex flex-wrap fixed items-center justify-evenly 
    bg-gray-300 dark:bg-gray-700 bg-opacity-90 
    h-16 m-0 shadow-lg
    w-screen z-10
    "
    >
      {/* channel title anchored to left side of top nav */}
      <FaHashtag className="title-hashtag" />
      <h5 className="title-text">channel name here</h5>
      <ThemeToggle />
      <SearchBar />
      <ConnectButton />
    </nav>
  );
};

export default TopNav;
