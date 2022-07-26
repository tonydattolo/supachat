import { FaHashtag } from "react-icons/fa";

import ConnectButton from "../ConnectButton/ConnectButton";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

const TopNav: React.FC = () => {
  return (
    <div className="top-navigation">
      {/* channel title anchored to left side of top nav */}
      <FaHashtag className="title-hashtag" />
      <h5 className="title-text">channel name here</h5>
      <ThemeToggle />
      <SearchBar />
      <ConnectButton />
    </div>
  );
};

export default TopNav;
