import React, { useState } from "react";
import { Menu, X, User, Moon, Sun } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="bg-white shadow-md dark:bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          {/* Logo */}
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a
              href="#"
              className="text-xl font-bold text-light-blue
            dark:text-white
            "
            >
              Schedule Master
            </a>
          </div>

          <div className="cursor-pointer" onClick={toggleDarkMode}>
            {!darkMode ? <Moon /> : <Sun />}
          </div>
        </div>
      </div>
    </header>
  );
}
