import { FaSearch } from "react-icons/fa";

const SearchBar: React.FC = () => {
  return (
    <div className="search">
      <input
        className="w-1/5 flex items-center justify-start bg-gray-400 dark:bg-gray-600 text-gray-500 px-2 h-9 ml-0 mr-0 rounded-md shadow-md transition duration-300 ease-in-out"
        type="text"
        placeholder="Search..."
      />
      <FaSearch size="18" className="text-secondary my-auto" />
    </div>
  );
};

export default SearchBar;
