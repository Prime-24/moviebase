"use client";
import { fetchMultiSearch } from "@/lib/tmdb";
import { SearchResult } from "@/types/SearchResult";
import { SearchIcon, X } from "lucide-react";
import {
  ChangeEvent,
  KeyboardEvent,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import SearchItems from "./SearchItems";
import { useRouter } from "next/navigation";
import SearchItemsSkeleton from "../Skeletons/SearchItemsSkeleton";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [media, setMedia] = useState<Promise<SearchResult> | null>(null);
  const [openSearch, setOpenSearch] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (searchTerm.length < 3) {
      setMedia(null);
      setOpenSearch(false);
      return;
    } else {
      setOpenSearch(true);
    }

    const fetchData = () => {
      const data = fetchMultiSearch(searchTerm, "1");
      setMedia(data);
    };

    const debounceTimer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  //outSide click AI help
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!searchBoxRef.current?.contains(e.target as Node)) {
        setOpenSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSearch]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const clearSearchTerm = () => {
    setSearchTerm("");
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") clearSearchTerm();
    if (searchTerm.length >= 3) {
      if (event.key === "Enter") {
        router.push(`/search/${encodeURIComponent(searchTerm)}?page=1`);
        clearSearchTerm();
      }
    }
  };

  const handleInputClick = () => {
    if (searchTerm.length > 2) setOpenSearch(true);
  };

  return (
    <div
      ref={searchBoxRef}
      role="search"
      aria-label="Quick search"
      className="relative flex gap-2 items-center border rounded-md max-w-md w-full">
      <div className="relative w-full">
        <SearchIcon
          aria-hidden="true"
          className="absolute left-1 top-2"
          size={24}
        />
        <input
          className="pl-10 py-2 w-full"
          type="text"
          name="search"
          id="search"
          placeholder="Quick search..."
          value={searchTerm}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => handleKeyDown(e)}
          onClick={handleInputClick}
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={openSearch}
          aria-label="Search input"
          autoComplete="off"
        />
        {searchTerm.length >= 1 && (
          <button
            onClick={clearSearchTerm}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label="Clear search">
            <X size={20} aria-hidden="true" />
          </button>
        )}
      </div>
      <div
        id="search-results"
        className={`absolute top-full left-0 right-0 flex flex-col gap-4 max-h-96 overflow-y-auto mt-1 rounded-md shadow-lg p-2 z-10 glass transition-all duration-300 ease-in-out ${
          openSearch
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-[-20px] pointer-events-none"
        } `}
        role="listbox"
        aria-labelledby="search">
        <Suspense fallback={<SearchItemsSkeleton repeatSkeleton={5} />}>
          <SearchItems
            media={media}
            searchTerm={searchTerm}
            clearSearchTerm={clearSearchTerm}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Searchbar;
