import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FavoriteSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xs flex flex-col md:flex-row">
      {/* Image Skeleton */}
      <div className="relative h-56 md:h-56 md:w-1/3 overflow-hidden">
        <Skeleton height="100%" width="100%" />
      </div>

      {/* Content Skeleton */}
      <div className="p-4 md:p-6 flex flex-col justify-between w-full">
        <div>
          <Skeleton height={24} width="60%" className="mb-2" />
          <div className="flex items-center gap-2 mt-2">
            <Skeleton width={16} height={16} />
            <Skeleton width="70%" height={16} />
          </div>

          <div className="flex flex-wrap gap-3 mt-3">
            <Skeleton width={60} height={16} />
            <Skeleton width={50} height={16} />
            <Skeleton width={70} height={16} />
          </div>
        </div>

        {/* Price section */}
        <div className="mt-4 border-t pt-4 flex justify-between items-center">
          <Skeleton width={100} height={20} />
          <Skeleton width={60} height={24} borderRadius={4} />
        </div>
      </div>
    </div>
  );
};

export default FavoriteSkeleton;
