"use client";
import { TMDB_SORT_OPTIONS } from "@/types/Filters";

type SortByProps = {
  value: string;
};

const SortyBy = ({ value }: SortByProps) => {
  return (
    <div className="flex flex-col gap-2 items-start">
      <label htmlFor="sort_by">Sort by:</label>
      <select
        className="border border-gray-600 py-2 px-4 rounded-md cursor-pointer"
        defaultValue={value}
        name="sort_by"
        id="sort_by">
        {TMDB_SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value} className="text-black">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortyBy;
