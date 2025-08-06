import { Filters } from "@/types/Filters";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

export const useMovieFilter = (filters: Filters, isMovie: boolean) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const formSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    const form = event.currentTarget;
    const formData = new FormData(form);

    for (const [key, value] of formData.entries()) {
      if (
        key !== "with_genres" &&
        value !== "0" &&
        value !== "popularity.desc" &&
        value
      ) {
        params.set(key, value.toString());
      }
    }

    const withGenre = formData.getAll("with_genres");
    if (withGenre.length) {
      params.set("with_genres", withGenre.join(","));
    }

    filters.page = 1;
    params.set("page", filters.page.toString());
    if (isMovie) {
      router.push("/movies?" + params.toString());
    } else {
      router.push("/series?" + params.toString());
    }
  };

  const handleReset = () => {
    if (isMovie) {
      router.push("/movies");
    } else {
      router.push("/series");
    }
  };

  return { formSubmit, handleReset };
};
