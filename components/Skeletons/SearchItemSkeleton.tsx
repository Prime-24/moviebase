
const SearchItemSkeleton = () => {
  return (
    <div className="flex gap-2 rounded-md overflow-clip shadow-lg glass text-gray-800">
      <div className="w-[100px] h-[150px] bg-gray-300 animate-pulse rounded-sm"></div>

      <div className="flex flex-col gap-2 justify-center flex-1">
        <div className="h-6 w-3/4 bg-gray-300 animate-pulse rounded"></div>

        <div className="h-4 w-1/2 bg-gray-300 animate-pulse rounded"></div>

        <div className="flex gap-2 items-center">
          <div className="w-6 h-6 bg-gray-300 animate-pulse rounded-full"></div>
          <div className="h-4 w-8 bg-gray-300 animate-pulse rounded"></div>
        </div>

        <div className="h-4 w-1/3 bg-gray-300 animate-pulse rounded"></div>
      </div>
    </div>
  );
};

export default SearchItemSkeleton;
