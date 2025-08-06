"use client";
import { Filters, TMDB_SORT_OPTIONS } from "@/types/Filters";
import { MovieGenres } from "@/types/Movies";
import { TVGenres } from "@/types/Series";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterBadge {
  key: string;
  value: string;
  label: string;
}

const getLabel = (key: string) => {
  const filterLabels: Record<keyof Filters, string> = {
    with_genres: "Genres",
    sort_by: "Sort By",
    "vote_average.gte": "Min Vote Average",
    "vote_average.lte": "Max Vote Average",
    "primary_release_date.lte": "Release Before",
    "primary_release_date.gte": "Release After",
    page: "Page",
  };
  return filterLabels[key as keyof Filters] || key;
};

type FilterBadgesProps = {
  isMovie: boolean;
};

const FilterBadges = ({ isMovie }: FilterBadgesProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeFilters: { key: string; value: string; label: string }[] = [];

  const getNames = (filter: FilterBadge) => {
    if (filter.key === "sort_by") {
      const element = TMDB_SORT_OPTIONS.find(
        (element) => element.value === filter.value
      );
      return `${filter.label}: ${element?.label}`;
    }
    if (filter.key === "with_genres") {
      if (isMovie) {
        return `${filter.label}: ${MovieGenres[Number(filter.value)]}`;
      }
      return `${filter.label}: ${TVGenres[Number(filter.value)]}`;
    }

    return `${filter.label} ${filter.value}`;
  };

  searchParams.forEach((v, k) => {
    if (k === "page") return;
    if (k === "with_genres") {
      v.split(",").forEach((element) =>
        activeFilters.push({ key: k, value: element, label: getLabel(k) })
      );
    } else {
      activeFilters.push({ key: k, value: v, label: getLabel(k) });
    }
  });

  const handleRemoveFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    const genres = newParams.get(key)?.split(",") || [];

    if (key === "with_genres" && genres?.length > 1) {
      const filteredGenres = genres.filter((g) => g != value);
      newParams.set(key, filteredGenres.toString());
    } else {
      newParams.delete(key, value);
    }

    newParams.set("page", "1");
    if (isMovie) {
      router.push(`/movies?${newParams.toString()}`);
    } else {
      router.push(`/series?${newParams.toString()}`);
    }
  };

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {activeFilters.map((filter) => (
        <div
          key={`${filter.key}-${filter.value}`}
          className="flex items-center bg-gray-200 dark:bg-gray-500 rounded-full px-3 py-1 text-sm">
          <span>{getNames(filter)}</span>
          <button
            onClick={() => handleRemoveFilter(filter.key, filter.value)}
            className="ml-2 text-gray-800 hover:text-gray-700 cursor-pointer"
            aria-label="Remove filter">
            <X aria-hidden={true} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FilterBadges;
