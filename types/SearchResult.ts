import { Movie } from "./Movies";
import { PersonDetails } from "./PersonDetails";
import { Show } from "./Series";

export type SearchResult = {
  page: number;
  results: Media[];
  total_pages: number;
  total_results: number;
};

export type BaseMedia = {
  media_type: "movie" | "tv" | "person";
}

export type Media = Show | Movie | PersonDetails;

export type MediaInfo = {
  movie: { type: string; path: string; image: string };
  tv: { type: string; path: string; image: string };
  person: { type: string; path: string; image: string };
};
