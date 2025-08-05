import { imageUrlHelper } from "@/lib/imageUrlHelper";
import { Movie } from "@/types/Movies";
import { Show } from "@/types/Series";
import Image from "next/image";
import Link from "next/link";

type MediaCard = {
  media: Movie | Show;
  isMovie?: boolean;
};

const MediaCard = ({ media, isMovie }: MediaCard) => {
  const getLink = (media: Movie | Show) => {
    if (isMovie) {
      return `movies/${media.id}`;
    } else {
      return `series/${media.id}`;
    }
  };

  return (
    <Link
      role="listitem"
      href={getLink(media)}
      className="flex flex-col gap-2 glass rounded-md shadow-md border border-transparent hover:border-white hover:cursor-pointer">
      <Image
        className="w-full object-cover rounded-t-md flex-[2]"
        src={imageUrlHelper(media.poster_path)}
        height={150}
        width={100}
        alt="Image of popular movie"
      />
      <h2 className="flex items-center justify-center flex-1 p-2 text-center">
        {"title" in media ? media.title : media.name}
      </h2>
    </Link>
  );
};

export default MediaCard;
