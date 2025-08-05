import { Movies } from "@/types/Movies";
import { Shows } from "@/types/Series";
import MediaCard from "./MediaCard";

type MediaCardsProps = {
  media: Movies | Shows;
  isMovie?: boolean;
};

const MediaCards = ({ media, isMovie }: MediaCardsProps) => {
  return (
    <div
      className="grid grid-cols-[repeat(auto-fill,minmax(min(150px,100%),1fr))] gap-4"
      role="list"
      aria-label={isMovie ? "List of movies" : "List of TV shows"}>
      {media?.results?.slice(0, 10).map((m) => (
        <MediaCard key={m.id} media={m} isMovie={isMovie} />
      ))}
    </div>
  );
};

export default MediaCards;
