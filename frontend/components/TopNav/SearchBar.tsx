import { FaSearch } from "react-icons/fa";

const SearchBar: React.FC = () => {
  return (
    <div className="search">
      <input className="search-input" type="text" placeholder="Search..." />
      <FaSearch size="18" className="text-secondary my-auto" />
    </div>
  );
};

export default SearchBar;
