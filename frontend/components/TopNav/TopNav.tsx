import { FaHashtag } from "react-icons/fa";

import ConnectButton from "../ConnectButton/ConnectButton";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

const TopNav: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-evenly bg-grey-300 dark:bg-gray-700 bg-opacity-90 w-full h-16 m-0 shadow-lg">
      {/* channel title anchored to left side of top nav */}
      <div className="text-lg text-gray-500 tracking-wider font-semibold text-opacity-80 mr-auto ml-2 my-auto transition duration-300 ease-in-out">
        <FaHashtag className="text-lg tracking-wider font-semibold text-gray-500 ml-2 my-auto" />
        channel name here
        <ThemeToggle />
        <SearchBar />
        <ConnectButton />
      </div>
    </div>
  );
};

export default TopNav;
