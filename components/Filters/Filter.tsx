"use client";
import Vote from "./Vote";
import Genres from "./Genres";
import SortBy from "./SortBy";
import Years from "./Years";
import Form from "next/form";
import { Filters } from "@/types/Filters";
import { useMovieFilter } from "@/hooks/useMovieFilter";

type FilterProps = {
  filters: Filters;
  isMovie: boolean;
};

const Filter = ({ filters, isMovie }: FilterProps) => {
  const { handleReset, formSubmit } = useMovieFilter(filters, isMovie);

  return (
    <Form
      action={""}
      onSubmit={formSubmit}
      className="flex flex-col gap-4 p-2 flex-wrap rounded-md glass"
      aria-label="Movie filters"
      role="form">
      <Genres
        selectedGenres={filters.with_genres.toString()}
        aria-label="Select genres"
        isMovie={isMovie}
      />
      <div className="flex gap-4">
        <Vote
          label="min Vote:"
          name="vote_average.gte"
          defaultValue={Number(filters["vote_average.gte"])}
          aria-label="Minimum vote average"
        />
        <Vote
          label="max Vote:"
          name="vote_average.lte"
          defaultValue={Number(filters["vote_average.lte"])}
          aria-label="Maximum vote average"
        />
      </div>
      <SortBy value={filters.sort_by.toString()} aria-label="Sort by" />
      <div className="flex gap-4">
        <Years
          label="From Year:"
          name={"primary_release_date.gte"}
          value={filters["primary_release_date.gte"].toString()}
          aria-label="Release date from"
        />
        <Years
          label="To Year:"
          name={"primary_release_date.lte"}
          value={filters["primary_release_date.lte"].toString()}
          aria-label="Release date to"
        />
      </div>
      <div className="flex gap-2">
        <button
          className="px-4 py-2 rounded-md bg-linear-to-br from-blue-500 to-fuchsia-500 hover:from-blue-800 hover:to-fuchsia-500 cursor-pointer"
          type="submit"
          aria-label="Apply filters">
          Filter
        </button>
        <button
          className="px-4 py-2 rounded-md border border-blue-500 hover:bg-blue-500 cursor-pointer"
          type="reset"
          onClick={handleReset}
          aria-label="Reset all filters">
          Reset filters
        </button>
      </div>
    </Form>
  );
};

export default Filter;
