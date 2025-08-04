import Vote from "./Vote";
import Genres from "./Genres";
import SortBy from "./SortBy";
import Years from "./Years";
import Form from "next/form";
import { FormEvent } from "react";
import { Filters } from "@/types/Filters";

type FilterProps = {
  filters: Filters;
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
  searchParams: string;
};

const Filter = ({ filters, onFormSubmit, onReset }: FilterProps) => {
  return (
    <Form
      action={""}
      onSubmit={onFormSubmit}
      className="flex flex-col gap-4 p-2 flex-wrap rounded-md glass">
      <Genres selectedGenres={filters.with_genres} />
      <div className="flex gap-4">
        <Vote
          label="min Vote:"
          name="vote_average.gte"
          defaultValue={Number(filters["vote_average.gte"])}
        />
        <Vote
          label="max Vote:"
          name="vote_average.lte"
          defaultValue={Number(filters["vote_average.lte"])}
        />
      </div>
      <SortBy value={filters.sort_by} />
      <div className="flex gap-4">
        <Years
          label="From Year:"
          name={"primary_release_date.gte"}
          value={filters["primary_release_date.gte"]}
        />
        <Years
          label="To Year:"
          name={"primary_release_date.lte"}
          value={filters["primary_release_date.lte"]}
        />
      </div>
      <div className="flex gap-2">
        <button
          className="px-4 py-2 rounded-md bg-linear-to-br from-blue-500 to-fuchsia-500 hover:from-blue-800 hover:to-fuchsia-500 cursor-pointer"
          type="submit">
          Filter
        </button>
        <button
          className="px-4 py-2 rounded-md border border-blue-500 hover:bg-blue-500 cursor-pointer"
          type="reset"
          onClick={onReset}>
          Reset filters
        </button>
      </div>
    </Form>
  );
};

export default Filter;
