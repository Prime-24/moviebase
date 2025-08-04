import { Media } from "@/types/SearchResult";
import { Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { imageUrlHelper } from "@/lib/imageUrlHelper";

type SearchItemProps = {
  item: Media;
  clearSearchTerm: () => void;
};

const SearchItem = ({ item, clearSearchTerm }: SearchItemProps) => {
  const getMediaInfo = (item: Media) => {
    if (item.media_type === "movie") {
      return {
        type: "Movie",
        path: `/movies/${item.id}`,
        image: item.poster_path,
      };
    }
    if (item.media_type === "tv") {
      return {
        type: "Show",
        path: `/series/${item.id}`,
        image: item.poster_path,
      };
    }
    if (item.media_type === "person") {
      return {
        type: "Person",
        path: `/person/${item.id}`,
        image: item.profile_path,
      };
    }
  };

  const getMediaDate = (item: Media): string => {
    if ("release_date" in item && item.release_date) {
      return item.release_date;
    }

    if ("first_air_date" in item && item.first_air_date) {
      return item.first_air_date;
    }

    return "";
  };

  const info = getMediaInfo(item);
  const title = "title" in item ? item.title : item.name;
  const date = getMediaDate(item);
  const imageUrl = imageUrlHelper(info?.image);
  const voteAverage = "vote_average" in item ? item.vote_average : "";

  return (
    <Link
      href={getMediaInfo(item)?.path!}
      key={item.id}
      onClick={clearSearchTerm}
      className="flex gap-2 rounded-md overflow-clip shadow-lg glass text-gray-800">
      <Image
        width={100}
        height={150}
        src={imageUrl}
        alt="Poster of searched results"
      />
      <div className="flex flex-col gap-2 justify-center">
        <h2>{title}</h2>
        <p>{info?.type}</p>
        <div className="flex gap-2 items-center">
          <Star fill="yellow" size={24} />
          {voteAverage}
        </div>
        {date.length > 0 ? <p>{date}</p> : null}
      </div>
    </Link>
  );
};

export default SearchItem;
