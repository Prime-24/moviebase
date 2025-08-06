import { Filters } from "@/types/Filters";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

export const useMovieFilter = (filters: Filters) => {
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
    router.push("/movies?" + params.toString());
  };

  const handleReset = () => {
    router.push("/movies");
  };

  return {formSubmit, handleReset}

};
