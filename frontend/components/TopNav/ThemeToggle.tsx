import useDarkMode from "@/hooks/useDarkMode";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle: React.FC = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);

  return (
    <div className="flex items-center bg-gray-400 dark:bg-gray-600 hover:bg-grey-900 px-2 h-9 mr-3 rounded-md shadow-md transition duration-300 ease-in-out cursor-pointer">
      <span onClick={handleMode}>
        {darkTheme ? (
          <FaSun
            size="24"
            className="topnav-icon text-yellow-400 hover:text-yellow-600"
          />
        ) : (
          <FaMoon
            size="24"
            className="topnav-icon text-blue-900 hover:text-purple-800"
          />
        )}
      </span>
    </div>
  );
};

export default ThemeToggle;
