"use client";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import Searchbar from "./Search/Searchbar";
import { Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <header className="flex gap-4 p-4 justify-between items-center shadow-lg">
      <Link href="/" className="hidden md:block uppercase tracking-wider">
        MovieBase
      </Link>
      <Link href="/" className="md:hidden uppercase tracking-wider">
        MB
      </Link>
      <Searchbar />
      <div className="relative">
        <Menu className="md:hidden cursor-pointer" onClick={toggleMobileMenu} />

        <nav
          className="hidden md:flex gap-4 absolute md:static top-0 right-0"
          aria-label="Main navigation">
          <ThemeSwitcher />
          <ul className="flex gap-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/movies">Movies</Link>
            </li>
            <li>
              <Link className="whitespace-nowrap" href="/series">
                TV Series
              </Link>
            </li>
          </ul>
        </nav>
        {isMobileMenuOpen && (
          <nav className="md:hidden absolute mt-2 glass right-0 flex flex-col items-end gap-4 p-4 shadow-lg rounded-lg z-10">
            <ThemeSwitcher />
            <ul className="flex flex-col gap-4 items-end">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/movies">Movies</Link>
              </li>
              <li>
                <Link className="whitespace-nowrap" href="/series">
                  TV Series
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
