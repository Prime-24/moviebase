import MediaCards from "@/components/MediaCards";
import Slider from "@/components/Slider/Slider";
import {
  fetchPopularMovies,
  fetchPopularShows,
  fetchUpcomingMovies,
} from "@/lib/tmdb";
import { Movies, UpcomingMovies } from "@/types/Movies";
import { Shows } from "@/types/Series";

export default async function Home() {

  const upcomingMovies = await fetchUpcomingMovies();

  // const [upcomingMovies, popularMovies, popularShows]: [
  //   UpcomingMovies,
  //   Movies,
  //   Shows
  // ] = await Promise.all([
  //   fetchUpcomingMovies(),
  //   fetchPopularMovies(),
  //   fetchPopularShows(),
  // ]);

  return (
    <div className="flex flex-col gap-4 mt-8">
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl">Upcoming Movies</h1>
        <Slider upcomingMovies={upcomingMovies} />
      </section>

      {/* <section className="flex flex-col gap-4">
        <h2 className="text-3xl">Popular Movies</h2>
        <MediaCards media={popularMovies} isMovie />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-3xl">Popular Shows</h2>
        <MediaCards media={popularShows} isMovie={false} />
      </section> */}
    </div>
  );
}
