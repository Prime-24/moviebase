"use client";
import { MovieGenres } from "@/types/Movies";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

type GenresProps = {
  selectedGenres: string[];
};

const Genres = ({ selectedGenres }: GenresProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localSelectedGenres, setLocalSelectedGenres] =
    useState<string[]>(selectedGenres);

  useEffect(() => {
    setLocalSelectedGenres(selectedGenres);
  }, [selectedGenres]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleGenreChange = (id: string) => {
    setLocalSelectedGenres((prev) => {
      if (prev.includes(id)) {
        return prev.filter((genreId) => genreId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup={"listbox"}
        aria-label="Filter movies by genre"
        className="flex gap-2 justify-between w-full px-4 py-2 rounded-md border border-gray-500"
        onClick={toggleDropdown}>
        <span>Filter genres</span>
        <span className="transition-transform duration-200">
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </span>
      </button>

      <div
        role="listbox"
        aria-multiselectable="true"
        aria-label="Movie genres"
        className={`absolute left-0 right-0 mt-2 flex flex-col gap-4 p-4 h-80 overflow-auto bg-slate-100/90 dark:bg-gray-500/90 backdrop-blur-md rounded-md shadow-xl transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-[-10px] pointer-events-none"
        }`}>
        <ul className="flex flex-col gap-2 cursor-pointer">
          {Object.entries(MovieGenres).map(([id, name]) => (
            <li key={id} className="flex gap-2 cursor-pointer">
              <input
                type="checkbox"
                id={`genre-${id}`}
                name="with_genres"
                checked={localSelectedGenres.includes(id)}
                onChange={() => handleGenreChange(id)}
                value={id}
              />
              <label className="w-full" htmlFor={`genre-${id}`}>
                {name}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Genres;
