export const fetchMultiSearch = async (searchTerm: string, page?: string) => {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/tmdb/search?query=${searchTerm}&page=${page || "1"}`
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch search results");
  }
  return await response.json();
};

export const fetchMovieDetails = async (id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tmdb/movies/${id}`
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch movie details");
  }
  return await response.json();
};

export const fetchSeriesDetails = async (id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tmdb/tv/${id}`
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch series details");
  }
  return await response.json();
};

export const fetchPersonDetails = async (id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tmdb/person/${id}`
  );
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  return await response.json();
};

export const fetchUpcomingMovies = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tmdb/upcoming`
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch upcoming movies");
  }
  return await response.json();
};

export const fetchPopularMovies = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tmdb/popular/movies`
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch popular movies");
  }
  return await response.json();
};

export const fetchPopularShows = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tmdb/popular/shows`
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch popular shows");
  }
  return await response.json();
};

export const fetchDiscoverMovies = async (queryParams?: string) => {
  if (queryParams === undefined) queryParams = "";

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tmdb/discover/movies?${queryParams}`
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch filtered movies");
  }
  return await response.json();
};
