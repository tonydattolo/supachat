import useDarkMode from "@/hooks/useDarkMode";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle: React.FC = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);

  return (
    <span onClick={handleMode}>
      {darkTheme ? (
        <FaSun size="24" className="topnav-icon" />
      ) : (
        <FaMoon size="24" className="topnav-icon" />
      )}
    </span>
  );
};

export default ThemeToggle;
