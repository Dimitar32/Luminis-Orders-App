// ThemeToggle.js - Icon Button to Switch Themes
import { useTheme } from "./ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";
import styles from "./Pages/OrdersPage/OrdersPages.module.css";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    return (
        <button
            className={styles.themeToggle}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            {theme === "dark" ? <FaSun className={styles.icon} /> : <FaMoon className={styles.icon} />}
        </button>
    );
};

export default ThemeToggle;