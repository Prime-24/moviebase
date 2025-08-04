import Badge from "@/components/Badge";
import { imageUrlHelper } from "@/lib/imageUrlHelper";
import { fetchSeriesDetails } from "@/lib/tmdb";
import { SeriesDetails } from "@/types/Series";
import Image from "next/image";

type SeriesDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const SeriesDetailsPage = async ({ params }: SeriesDetailsPageProps) => {
  const { id } = await params;

  const series: SeriesDetails = await fetchSeriesDetails(Number(id));

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const releaseDate = new Date(series?.first_air_date).toLocaleDateString(
    "en-US",
    options
  );

  return (
    <div className="relative flex items-center justify-center h-[calc(100vh-6.75rem)]">
      <Image
        width={1280}
        height={720}
        className="absolute h-full w-full object-cover brightness-50"
        src={imageUrlHelper(series?.backdrop_path)}
        alt="Background image of series"
      />
      <div className="flex gap-4 m-4 p-4 rounded-lg shadow-lg glass max-w-5xl w-full max-h-[560px] overflow-y-auto">
        <div className="flex flex-col gap-4 flex-[2]">
          <h2 className="text-3xl">{series?.name}</h2>
          <div className="flex flex-wrap gap-4">
            {series?.genres.map((g) => (
              <Badge key={g.id} text={g.name} />
            ))}
          </div>
          <p>{series?.overview}</p>
          <div className="flex flex-col gap-4 justify-between">
            <span>Number of episodes: {series?.number_of_episodes}</span>
            <span>Number of Seasons: {series?.number_of_seasons}</span>
            <span>Release date: {releaseDate}</span>
          </div>
        </div>
        <div className="flex-1 rounded-md overflow-clip">
          <Image
            width={100}
            height={150}
            className="w-full h-full object-cover"
            src={"https://image.tmdb.org/t/p/original" + series?.poster_path}
            alt="Poster image of series"
          />
        </div>
      </div>
    </div>
  );
};

export default SeriesDetailsPage;
