"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeSelector() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const initialTheme = storedTheme || "light";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const handleToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <>
      <label className="swap swap-rotate">
        <input
          type="checkbox"
          onChange={handleToggle}
          checked={theme === "dark"}
        />

        <FaSun className="swap-on" size="20" />
        <FaMoon className="swap-off" size="20" />
      </label>
    </>
  );
}
