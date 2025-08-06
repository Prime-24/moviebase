const HOST_URL = process.env.NEXT_PUBLIC_BASE_URL;

const fetchFromTMDB = async (endpoint: string) => {
  const res = await fetch(`${HOST_URL}${endpoint}`);
  return res.json();
};

export const fetchMultiSearch = async (
  searchTerm: string,
  page: string = "1"
) => fetchFromTMDB(`/api/tmdb/search?query=${searchTerm}&page=${page}`);

export const fetchMovieDetails = async (id: number) =>
  fetchFromTMDB(`/api/tmdb/movies/${id}`);

export const fetchSeriesDetails = async (id: number) =>
  fetchFromTMDB(`/api/tmdb/tv/${id}`);

export const fetchPersonDetails = async (id: number) =>
  fetchFromTMDB(`/api/tmdb/person/${id}`);

export const fetchUpcomingMovies = async () =>
  fetchFromTMDB(`/api/tmdb/upcoming`);

export const fetchPopularMovies = async () =>
  fetchFromTMDB(`/api/tmdb/popular/movies`);

export const fetchPopularShows = async () =>
  fetchFromTMDB(`/api/tmdb/popular/shows`);

export const fetchDiscoverMovies = async (query: string) =>
  fetchFromTMDB(`/api/tmdb/discover/movies?${query}`);
