"use client";
import { useTheme } from "@/app/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const ThemeSwitcher = () => {
  const { toggleTheme, theme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      {theme === "dark" ? <Sun size={24}/> : <Moon size={24} />}
    </button>
  );
};

export default ThemeSwitcher;
