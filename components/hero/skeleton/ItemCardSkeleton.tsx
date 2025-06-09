"use client";

import React, { FC, JSX } from "react";
import { Card, CardBody, CardFooter, Skeleton } from "@heroui/react";

const ItemCardSkeleton: FC = (): JSX.Element => {
  return (
    <Card isFooterBlurred className={"overflow-hidden w-72 h-full"} radius="lg">
      <CardBody className="aspect-poster relative">
        <Skeleton />
        <div className="absolute top-2 right-2 h-4 w-8 drop-shadow-md rounded-md border border-default-700">
          <Skeleton />
        </div>
      </CardBody>
      <CardFooter className="absolute bottom-0 w-full h-16 border border-default-700">
        <Skeleton />
      </CardFooter>
    </Card>
  );
};

export default ItemCardSkeleton;
