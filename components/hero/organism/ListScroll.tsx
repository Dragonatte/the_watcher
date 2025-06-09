import React, { Suspense } from "react";

import ItemCardSkeleton from "@/components/hero/skeleton/ItemCardSkeleton";
import ItemList from "@/components/hero/molecule/ItemList";

const ListScroll: React.FC<{ type: "movie" | "tv" }> = ({
  type,
}: {
  type: "movie" | "tv";
}): React.JSX.Element => (
  <div
    className="relative max-w-full
  before:absolute before:left-0 before:top-0 before:w-8 before:h-full before:bg-linear-to-l before:from-transparent before:to-background before:z-10
  after:absolute after:right-0 after:top-0 after:w-8 after:h-full after:bg-linear-to-r after:from-transparent after:to-background after:z-10
  "
  >
    <div className="flex overflow-x-scroll gap-4 p-4 scrollbar-transparent">
      <Suspense
        fallback={
          <div className="flex gap-4">
            {Array.from(
              { length: 6 },
              (_: never, index: number): React.JSX.Element => (
                <ItemCardSkeleton key={index} />
              ),
            )}
          </div>
        }
      >
        <ItemList type={type} />
      </Suspense>
    </div>
  </div>
);

export default ListScroll;
