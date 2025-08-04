import SearchItemSkeleton from "./SearchItemSkeleton";

type SearchItemsSkeletonProps = {
  repeatSkeleton: number;
};
const SearchItemsSkeleton = ({
  repeatSkeleton,
}: SearchItemsSkeletonProps) => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: repeatSkeleton }).map((_, i) => (
        <SearchItemSkeleton key={i} />
      ))}
    </div>
  );
};

export default SearchItemsSkeleton;
