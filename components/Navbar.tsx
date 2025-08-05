"use client";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import Searchbar from "./Search/Searchbar";
import { Menu } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <header
      className="flex gap-4 p-4 justify-between items-center shadow-lg"
      role="banner">
      <Link
        href="/"
        className="hidden md:block uppercase tracking-wider"
        aria-label="MovieBase - Home">
        MovieBase
      </Link>
      <Link
        href="/"
        className="md:hidden uppercase tracking-wider"
        aria-label="MovieBase - Home">
        MB
      </Link>

      <Searchbar aria-label="Search movies and TV series" />

      <div className="relative">
        <button
          className="md:hidden cursor-pointer"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu">
          <Menu aria-hidden="true" />
        </button>

        <nav
          className="hidden md:flex gap-4 absolute md:static top-0 right-0"
          aria-label="Main navigation">
          <ThemeSwitcher aria-label="Toggle dark mode" />
          <ul className="flex gap-4">
            <li>
              <Link
                href="/"
                aria-current={pathname === "/" ? "page" : undefined}>
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/movies"
                aria-current={pathname === "/movies" ? "page" : undefined}>
                Movies
              </Link>
            </li>
            <li>
              <Link
                className="whitespace-nowrap"
                href="/series"
                aria-current={pathname === "/series" ? "page" : undefined}>
                TV Series
              </Link>
            </li>
          </ul>
        </nav>

        {isMobileMenuOpen && (
          <nav
            id="mobile-menu"
            className="md:hidden absolute mt-2 glass right-0 flex flex-col items-end gap-4 p-4 shadow-lg rounded-lg z-10"
            aria-label="Mobile navigation">
            <ThemeSwitcher aria-label="Toggle dark mode" />
            <ul className="flex flex-col gap-4 items-end">
              <li>
                <Link
                  href="/"
                  aria-current={pathname === "/" ? "page" : undefined}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/movies"
                  aria-current={pathname === "/movies" ? "page" : undefined}>
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  className="whitespace-nowrap"
                  href="/series"
                  aria-current={pathname === "/series" ? "page" : undefined}>
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
