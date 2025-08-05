import { imageUrlHelper } from "@/lib/imageUrlHelper";
import { fetchMultiSearch } from "@/lib/tmdb";
import { Media, SearchResult } from "@/types/SearchResult";
import Image from "next/image";
import Link from "next/link";

type SearchQueryPageProps = {
  params: Promise<{ searchQuery: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const SearchQueryPage = async ({
  params,
  searchParams,
}: SearchQueryPageProps) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const { searchQuery } = resolvedParams;

  const page = Array.isArray(resolvedSearchParams.page)
    ? resolvedSearchParams.page[0]
    : resolvedSearchParams.page || "1";

  const data: SearchResult = await fetchMultiSearch(searchQuery, page);

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
    return {
      type: "Person",
      path: `/person/${item.id}`,
      image: item.profile_path,
    };
  };

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(150px,100%),1fr))] gap-4">
        {data?.results?.map((m: Media) => {
          const { path, image } = getMediaInfo(m);
          return (
            <Link
              key={m.id}
              href={path}
              className="flex flex-col gap-2 glass rounded-md shadow-md border border-transparent hover:border-white hover:cursor-pointer">
              <Image
                className="w-full object-cover rounded-t-md flex-[2]"
                src={imageUrlHelper(image)}
                height={150}
                width={100}
                alt={"title" in m ? m.title : m.name}
              />
              <h2 className="flex items-center justify-center flex-1 p-2 text-center">
                {"title" in m ? m.title : m.name}
              </h2>
            </Link>
          );
        })}
      </div>

      {data.total_pages > 1 && (
        <div className="flex gap-4 mt-4 justify-center items-center">
          {Number(page) > 1 && (
            <Link
              href={`?page=${Number(page) - 1}`}
              className="col-span-full text-center p-2 hover:bg-blue-800 dark:hover:bg-fuchsia-300 rounded-md border border-fuchsia-300">
              Prev
            </Link>
          )}

          <span>
            Page {page} of {data.total_pages}
          </span>

          {Number(page) < data.total_pages && (
            <Link
              href={`?page=${Number(page) + 1}`}
              className="col-span-full text-center p-2 hover:bg-blue-800 dark:hover:bg-fuchsia-300 rounded-md border border-fuchsia-300">
              Next
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default SearchQueryPage;
