import Filter from "@/components/Filters/Filter";
import Pagination from "@/components/Pagination";
import FilterBadges from "@/components/Filters/FilterBadges";
import { Movies } from "@/types/Movies";
import MediaCard from "@/components/MediaCard";
import { Filters } from "@/types/Filters";
import { fetchDiscoverMovies } from "@/lib/tmdb";

type MoviePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const MoviesPage = async ({ searchParams }: MoviePageProps) => {
  const {
    sort_by,
    with_genres,
    "primary_release_date.gte": releaseDateGte,
    "primary_release_date.lte": releaseDateLte,
    "vote_average.gte": voteAverageGte,
    "vote_average.lte": voteAverageLte,
    page,
  } = await searchParams;

  const filters: Filters = {
    sort_by: sort_by?.toString() || "popularity.desc",
    with_genres: with_genres?.toString() || "",
    "primary_release_date.gte": releaseDateGte?.toString() || "",
    "primary_release_date.lte": releaseDateLte?.toString() || "",
    "vote_average.gte": voteAverageGte?.toString() || "",
    "vote_average.lte": voteAverageLte?.toString() || "",
    page: Number(page?.toString()) || 1,
  };

  const queryString = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (value) queryString.set(key, String(value));
  }

  const movies: Movies = await fetchDiscoverMovies(queryString.toString());

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex flex-col gap-4 flex-1">
        <Filter isMovie={true} filters={filters} />
        <FilterBadges isMovie={true} />
      </div>
      <div className="flex-[3]">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(150px,100%),1fr))] gap-2">
          {movies?.results?.map((movie) => (
            <MediaCard key={movie.id} media={movie} isMovie={true} />
          ))}
        </div>
        <Pagination
          isMovie={true}
          currentPage={movies.page}
          totalPages={movies.total_pages}
          searchParams={queryString}
        />
      </div>
    </div>
  );
};

export default MoviesPage;
