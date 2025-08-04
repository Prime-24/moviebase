"use client";

import { UpcomingMovies } from "@/types/Movies";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Slide from "./Slide";

type SliderProps = {
  upcomingMovies: UpcomingMovies;
};

const Slider = ({ upcomingMovies }: SliderProps) => {
  const [imageIndex, setImageIndex] = useState(0);

  function showNextImage() {
    setImageIndex((index) => {
      if (index === upcomingMovies?.results.slice(0, 5).length - 1) return 0;
      return index + 1;
    });
  }

  function showPrevImage() {
    setImageIndex((index) => {
      if (index === 0) return upcomingMovies?.results.slice(0, 5).length - 1;
      return index - 1;
    });
  }

  return (
    <div className="relative flex shadow-2xl overflow-hidden carousel rounded-lg text-white">
      {upcomingMovies?.results.slice(0, 5).map((movie) => (
        <Slide key={movie.id} movie={movie} imageIndex={imageIndex} />
      ))}
      <button
        className="absolute top-1/2 -translate-y-1/2 left-2 cursor-pointer hover:text-fuchsia-600"
        onClick={showPrevImage}>
        <ChevronLeft size={60} />
      </button>
      <button
        className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer hover:text-fuchsia-600"
        onClick={showNextImage}>
        <ChevronRight size={60} />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
        {upcomingMovies?.results.slice(0, 5).map((_, index) => (
          <span
            key={index}
            className={`h-2 w-4 rounded-lg ${
              index === imageIndex ? "bg-fuchsia-600" : "bg-fuchsia-50"
            }`}></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
