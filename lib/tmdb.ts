import { Movies } from "@/types/Movies";
import { SearchResult } from "@/types/SearchResult";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

const fetchFromTMDB = async (endpoint: string) => {
  const res = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!res.ok) {
    let errorMessage = `Failed with status ${res.status}`;
    try {
      const errorData = await res.json();
      errorMessage = errorData.status_message || errorMessage;
    } catch {}
    throw new Error(errorMessage);
  }

  return res.json();
};

export const fetchMultiSearch = async (
  searchTerm: string,
  page: string = "1"
): Promise<SearchResult> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tmdb/search?query=${searchTerm}&page=${page}`
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch search results");
  }

  const data: SearchResult = await response.json();
  return data;
};

export const fetchMovieDetails = async (id: number) =>
  fetchFromTMDB(`/movie/${id}`);

export const fetchSeriesDetails = async (id: number) =>
  fetchFromTMDB(`/tv/${id}`);

export const fetchPersonDetails = async (id: number) =>
  fetchFromTMDB(`/person/${id}`);

export const fetchUpcomingMovies = async () => fetchFromTMDB(`/movie/upcoming`);

export const fetchPopularMovies = async () => fetchFromTMDB(`/movie/popular`);

export const fetchPopularShows = async () => fetchFromTMDB(`/tv/popular`);

export const fetchDiscoverMovies = async (
  queryParams: string = ""
): Promise<Movies> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tmdb/discover/movies?${queryParams}`
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch search results");
  }

  const data: Movies = await response.json();
  return data;
};
