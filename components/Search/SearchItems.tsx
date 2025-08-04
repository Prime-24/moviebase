import { SearchResult } from "@/types/SearchResult";

import Link from "next/link";
import { use } from "react";
import SearchItem from "./SearchItem";

type SearchItemsProps = {
  media: Promise<SearchResult> | null;
  searchTerm: string;
  clearSearchTerm: () => void;
};

const SearchItems = ({
  media,
  searchTerm,
  clearSearchTerm,
}: SearchItemsProps) => {
  if (!media) return null;
  const allSearchResults = use(media);

  const handleClick = () => clearSearchTerm();

  return (
    <>
      {allSearchResults.results.slice(0, 5).map((item) => (
        <SearchItem
          clearSearchTerm={clearSearchTerm}
          key={item.id}
          item={item}
        />
      ))}
      <Link
        href={`/search/${encodeURIComponent(searchTerm)}?page=1`}
        onClick={handleClick}
        className="block text-center p-2 hover:bg-blue-800 dark:hover:bg-fuchsia-300 rounded-md border border-fuchsia-300">
        See All Results ({allSearchResults.total_results})
      </Link>
    </>
  );
};

export default SearchItems;
