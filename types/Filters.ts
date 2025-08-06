export const TMDB_SORT_OPTIONS = [
  { value: "popularity.asc", label: "Popularity (Low to High)" },
  { value: "popularity.desc", label: "Popularity (High to Low) - Default" },
  { value: "release_date.asc", label: "Release Date (Oldest First)" },
  { value: "release_date.desc", label: "Release Date (Newest First)" },
  { value: "revenue.asc", label: "Revenue (Low to High)" },
  { value: "revenue.desc", label: "Revenue (High to Low)" },
  {
    value: "primary_release_date.asc",
    label: "Primary Release (Oldest First)",
  },
  {
    value: "primary_release_date.desc",
    label: "Primary Release (Newest First)",
  },
  { value: "original_title.asc", label: "Title (A-Z)" },
  { value: "original_title.desc", label: "Title (Z-A)" },
  { value: "vote_average.asc", label: "Rating (Low to High)" },
  { value: "vote_average.desc", label: "Rating (High to Low)" },
  { value: "vote_count.asc", label: "Votes (Low to High)" },
  { value: "vote_count.desc", label: "Votes (High to Low)" },
];

export type TMDBSortBy =
  | "popularity.asc"
  | "popularity.desc"
  | "release_date.asc"
  | "release_date.desc"
  | "revenue.asc"
  | "revenue.desc"
  | "primary_release_date.asc"
  | "primary_release_date.desc"
  | "original_title.asc"
  | "original_title.desc"
  | "vote_average.asc"
  | "vote_average.desc"
  | "vote_count.asc"
  | "vote_count.desc";

export type Filters = {
  sort_by: string;
  with_genres: string;
  "primary_release_date.gte": string;
  "primary_release_date.lte": string;
  "vote_average.gte": string;
  "vote_average.lte": string;
  page: number;
};

