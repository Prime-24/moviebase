const BASE_URL = "https://api.themoviedb.org/3";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMGEzMWI0MWU3MmZhNThiY2Y2NzA4NjNjY2RkOGIyMiIsIm5iZiI6MTc1MzUxNzU2NS4xOTUwMDAyLCJzdWIiOiI2ODg0OGRmZDY1ZjA4MDdlNTlkOWFjMTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.u7hsLeHY63VoFkMy8NxRu3LcrD1GyUnhQJAXWEFlhgo",
  },
};

export const fetchMultiSearch = async (searchTerm: string, page?: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/multi?include_adult=false&language=en-US&query=${searchTerm}&page=${
        page ? page : "1"
      }`,
      options
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchMovieDetails = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}`, options);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchSeriesDetails = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/tv/${id}`, options);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchPersonDetails = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/person/${id}`, options);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchUpcomingMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/upcoming`, options);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchPopularMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular`, options);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchPopularShows = async () => {
  try {
    const response = await fetch(`${BASE_URL}/tv/popular`, options);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const fetchDiscoverMovies = async (queryParams?: string) => {
  if (queryParams === undefined) queryParams = "";
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?${queryParams}`,
      options
    );
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
