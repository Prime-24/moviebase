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
      className="relative flex w-full h-full object-cover shrink-0 grow-0 items-center transition-transform duration-300"
      style={{ translate: `${-100 * imageIndex}%` }}>
      <Image
        className="absolute w-full h-full object-cover -z-10 brightness-50"
        src={imageUrlHelper(movie.backdrop_path)}
        style={{ objectFit: "cover" }}
        fill={true}
        alt="Image of upcoming movie"
      />
      <div className="flex gap-2 p-4 backdrop-blur-xs">
        <div className="flex flex-[2] flex-col items-start gap-4 text-white">
          <h2 className="text-3xl">{movie.title}</h2>
          <div className="flex gap-4 flex-wrap">
            {movie.genre_ids.map((genre) => (
              <Badge key={genre} text={MovieGenres[genre]} />
            ))}
          </div>
          <h2 className="line-clamp-3">{movie.overview}</h2>
          <h2 className="font-bold">
            Release date:{" "}
            {new Date(movie.release_date).toLocaleDateString("en-US")}
          </h2>
          <Link
            href={"movies/" + movie.id}
            className="px-4 py-2 bg-linear-to-br from-blue-500 to-fuchsia-500 hover:from-blue-800 hover:to-fuchsia-500 rounded-md">
            View Movie details
          </Link>
        </div>
        <div className="flex-[1]">
          <Image
            width={1280}
            height={720}
            className="w-full h-full object-cover rounded-md"
            src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
            alt="Background image of upcoming movie"
          />
        </div>
      </div>
    </div>
  );
};

export default Slide;
