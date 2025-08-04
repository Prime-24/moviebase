import Badge from "@/components/Badge";
import { imageUrlHelper } from "@/lib/imageUrlHelper";
import { fetchMovieDetails } from "@/lib/tmdb";
import { MovieDetails } from "@/types/Movies";
import Image from "next/image";

type MovieDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const MovieDetailsPage = async ({ params }: MovieDetailsPageProps) => {
  const { id } = await params;

  const movie: MovieDetails = await fetchMovieDetails(Number(id));

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const budget = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(movie?.budget);
  const releaseDate = new Date(movie?.release_date).toLocaleDateString(
    "en-US",
    options
  );

  return (
    <div className="relative flex items-center justify-center h-[calc(100vh-6.75rem)]">
      <Image
        width={1280}
        height={720}
        className="absolute h-full w-full object-cover brightness-50 rounded-md"
        src={imageUrlHelper(movie?.backdrop_path)}
        alt="Background image of movie"
      />
      <div className="flex gap-4 m-4 p-4 rounded-lg shadow-lg glass backdrop-blur-md max-w-5xl w-full max-h-[560px] overflow-y-auto">
        <div className="flex flex-col gap-4 flex-[2] text-white">
          <h2 className="text-3xl">{movie?.original_title}</h2>
          <div className="flex flex-wrap gap-4">
            {movie.genres.map((g) => (
              <Badge key={g.id} text={g.name} />
            ))}
          </div>
          <p>{movie.overview}</p>
          <div className="flex flex-col gap-4 justify-between">
            <span>Runtime: {movie?.runtime} minutes</span>
            <span>Budget: {budget}</span>
            <span>Release date: {releaseDate}</span>
            <span>Origin country: {movie?.origin_country}</span>
          </div>
        </div>
        <div className="flex-1 rounded-md overflow-clip">
          <Image
            width={100}
            height={150}
            className="w-full h-full object-cover"
            src={"https://image.tmdb.org/t/p/original" + movie?.poster_path}
            alt="Poster image of movie"
          />
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
