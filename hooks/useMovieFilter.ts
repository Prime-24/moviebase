"use client";
import { Filters, TMDBSortBy } from "@/types/Filters";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

export const useMovieFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  let currentFilters: Filters = {
    with_genres: searchParams.get("with_genres")?.split(",") || [],
    "vote_average.gte": searchParams.get("vote_average.gte") || "",
    "vote_average.lte": searchParams.get("vote_average.lte") || "",
    sort_by: (searchParams.get("sort_by") as TMDBSortBy) || "popularity.desc",
    "primary_release_date.gte":
      searchParams.get("primary_release_date.gte") || "",
    "primary_release_date.lte":
      searchParams.get("primary_release_date.lte") || "",
    page: Number(searchParams.get("page")) || 1,
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/movies?${params.toString()}`);
  };

  const handleReset = () => {
    router.push("/movies");
  };

  const getLabel = (key: string) => {
    const filterLabels: Record<keyof Filters, string> = {
      with_genres: "Genres",
      sort_by: "Sort By",
      "vote_average.gte": "Min Vote Average",
      "vote_average.lte": "Max Vote Average",
      "primary_release_date.lte": "Release Before",
      "primary_release_date.gte": "Release After",
      page: "Page",
    };
    return filterLabels[key as keyof Filters] || key;
  };

  const formSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.entries().forEach((entry) => {
      const [key, value] = entry;
      if (
        key !== "with_genres" &&
        value !== "0" &&
        value !== "popularity.desc" &&
        value
      ) {
        params.set(key, value.toString());
      }
    });

    const withGenre = formData.getAll("with_genres");
    if (withGenre.length) {
      params.set("with_genres", withGenre.join(","));
    }

    currentFilters.page = 1;
    params.set("page", currentFilters.page.toString());

    router.push("/movies?" + params.toString());
  };

  const getActiveFilters = () => {
    const activeFilters: { key: string; value: string; label: string }[] = [];

    searchParams.forEach((v, k) => {
      if (k === "page") return;
      if (k === "with_genres") {
        v.split(",").forEach((element) =>
          activeFilters.push({ key: k, value: element, label: getLabel(k) })
        );
      } else {
        activeFilters.push({ key: k, value: v, label: getLabel(k) });
      }
    });

    return activeFilters;
  };

  const handleRemoveFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    const genres = newParams.get(key)?.split(",") || [];

    if (key === "with_genres" && genres?.length > 1) {
      const filteredGenres = genres.filter((g) => g != value);
      newParams.set(key, filteredGenres.toString());
    } else {
      newParams.delete(key, value);
    }

    newParams.set("page", "1");
    router.push(`/movies?${newParams.toString()}`);
  };

  return {
    currentFilters,
    handlePageChange,
    formSubmit,
    handleReset,
    searchParams,
    getActiveFilters,
    handleRemoveFilter,
  };
};
