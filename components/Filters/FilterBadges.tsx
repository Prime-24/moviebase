"use client";

import { TMDB_SORT_OPTIONS } from "@/types/Filters";
import { MovieGenres } from "@/types/Movies";
import { X } from "lucide-react";

interface FilterBadge {
  key: string;
  value: string;
  label: string;
}

interface FilterBadgesProps {
  filters: FilterBadge[];
  onRemove: (key: string, value: string) => void;
}

const getNames = (filter: FilterBadge) => {
  if (filter.key === "sort_by") {
    const element = TMDB_SORT_OPTIONS.find(
      (element) => element.value === filter.value
    );
    return `${filter.label}: ${element?.label}`;
  }
  if (filter.key === "with_genres") {
    return `${filter.label}: ${MovieGenres[Number(filter.value)]}`;
  }

  return `${filter.label} ${filter.value}`;
};

const FilterBadges = ({ filters, onRemove }: FilterBadgesProps) => {
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filters.map((filter) => (
        <div
          key={`${filter.key}-${filter.value}`}
          className="flex items-center bg-gray-200 dark:bg-gray-500 rounded-full px-3 py-1 text-sm">
          <span>{getNames(filter)}</span>
          <button
            onClick={() => onRemove(filter.key, filter.value)}
            className="ml-2 text-gray-800 hover:text-gray-700 cursor-pointer">
            <X />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FilterBadges;
