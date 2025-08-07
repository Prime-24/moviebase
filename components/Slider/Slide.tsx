import { Movie, MovieGenres } from "@/types/Movies";
import Image from "next/image";
import Link from "next/link";
import Badge from "../Badge";
import { imageUrlHelper } from "@/lib/imageUrlHelper";

type SlideProps = {
  movie: Movie;
  imageIndex: number;
};

const Slide = ({ movie, imageIndex }: SlideProps) => {
  return (
    <div
      className="relative flex w-full shrink-0 transition-transform duration-300"
      style={{ translate: `${-100 * imageIndex}%` }}
      aria-live="polite"
      aria-atomic="true">
      <Image
        priority={true}
        className="absolute inset-0 h-full w-full object-cover -z-10 brightness-50"
        src={imageUrlHelper(movie.backdrop_path)}
        alt="Image of upcoming movie"
        width={1280}
        height={720}
        aria-hidden="true"
      />
      <div className="flex gap-2 p-4 backdrop-blur-xs">
        <div className="flex flex-[2] flex-col items-start gap-4 text-white">
          <h2 className="text-3xl" aria-label={`Movie title: ${movie.title}`}>
            {movie.title}
          </h2>
          <div className="flex gap-4 flex-wrap" aria-label="Movie genres">
            {movie.genre_ids.map((genre) => (
              <Badge
                key={genre}
                text={MovieGenres[genre]}
                aria-label={MovieGenres[genre]}
              />
            ))}
          </div>
          <p className="line-clamp-3" aria-label="Movie description">
            {movie.overview}
          </p>
          <p
            className="font-bold"
            aria-label={`Release date: ${new Date(
              movie.release_date
            ).toLocaleDateString("en-US")}`}>
            Release date:{" "}
            {new Date(movie.release_date).toLocaleDateString("en-US")}
          </p>
          <Link
            href={"movies/" + movie.id}
            className="px-4 py-2 bg-linear-to-br from-blue-500 to-fuchsia-500 hover:from-blue-800 hover:to-fuchsia-500 rounded-md"
            aria-label={`View details for ${movie.title}`}>
            View Movie details
          </Link>
        </div>
        <div className="flex-[1]">
          <Image
            width={1280}
            height={720}
            className="w-full h-full object-cover rounded-md"
            src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
            alt={`Poster for ${movie.title}`}
            priority={true}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};

export default Slide;
