import { BaseMedia } from "./SearchResult";

export type SeriesDetails = {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  last_air_date: string;
  status: "Returning Series" | "Ended" | "Canceled" | "In Production";
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genres: {
    id: number;
    name: string;
  }[];
  created_by: {
    id: number;
    name: string;
    profile_path: string | null;
  }[];
  networks: {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }[];
  number_of_seasons: number;
  number_of_episodes: number;
  seasons: {
    air_date: string | null;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
  }[];
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    runtime: number;
    season_number: number;
    still_path: string | null;
  } | null;
  next_episode_to_air: null | {
    id: number;
    name: string;
    overview: string;
    air_date: string;
    episode_number: number;
    season_number: number;
  };
};

export type TVGenre = {
  [id: number]: string;
};

export const TVGenres: TVGenre = {
  10759: "Action & Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  10762: "Kids",
  9648: "Mystery",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
  37: "Western",
};

export type Shows = {
  page: number;
  total_pages: number;
  total_results: number;
  results: Show[];
};

export type Show = BaseMedia & {
  media_type: "tv";
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
};
