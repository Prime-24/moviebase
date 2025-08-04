"use client";
import { fetchDiscoverMovies } from "@/lib/tmdb";
import { Movies } from "@/types/Movies";
import Filter from "@/components/Filters/Filter";
import { useEffect, useState } from "react";
import MediaCard from "@/components/MediaCard";
import Pagination from "@/components/Pagination";
import { useMovieFilter } from "@/hooks/useMovieFilter";
import FilterBadges from "@/components/Filters/FilterBadges";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movies>();

  const {
    currentFilters,
    handlePageChange,
    formSubmit,
    handleReset,
    searchParams,
    getActiveFilters,
    handleRemoveFilter,
  } = useMovieFilter();

  useEffect(() => {
    const fetchmovies = async () => {
      const movies = await fetchDiscoverMovies(searchParams.toString());
      setMovies(movies);
    };
    fetchmovies();
  }, [searchParams]);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex flex-col gap-4 flex-1">
        <Filter
          filters={currentFilters}
          onFormSubmit={formSubmit}
          onReset={handleReset}
          searchParams={searchParams.toString()}
        />
        <FilterBadges
          filters={getActiveFilters()}
          onRemove={handleRemoveFilter}
        />
      </div>
      <div className="flex-[3]">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(150px,100%),1fr))] gap-2">
          {movies?.results?.map((movie) => (
            <MediaCard key={movie.id} media={movie} isMovie={true} />
          ))}
        </div>
        {movies && (
          <Pagination
            currentPage={currentFilters.page}
            totalPages={movies?.total_pages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default MoviesPage;
