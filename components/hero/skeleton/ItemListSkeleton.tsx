import React, { FC, JSX } from "react";

import ItemCardSkeleton from "@/components/hero/skeleton/ItemCardSkeleton";

const ItemListSkeleton: FC = (): JSX.Element => (
  <>
    {" "}
    {Array.from({ length: 20 }).map(
      (_: unknown, index: number): JSX.Element => (
        <ItemCardSkeleton key={index} />
      ),
    )}{" "}
  </>
);

export default ItemListSkeleton;
