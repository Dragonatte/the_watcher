"use client";

import React from "react";
import { Card, CardBody, CardFooter } from "@heroui/react";
import Image from "next/image";
import clsx from "clsx";

import { Star } from "@/components/common/atoms/icons";
import { formatDate } from "@/utils/date/date_formatter";
import { Movie } from "@/model/Movie.model";
import { TVShow } from "@/model/TVShow.model";
import s from "@/service/app.services";
import typeGuardMovie from "@/utils/TypeGuard";

const ItemCard: React.FC<{
  item: Movie | TVShow;
  className?: string;
}> = ({
  item,
  className,
}: {
  item: Movie | TVShow;
  className?: string;
}): React.JSX.Element => {
  const isMovie: boolean = typeGuardMovie(item);

  return (
    <Card
      isFooterBlurred
      className={clsx(
        "overflow-hidden w-72 h-full !transition-transform ease-in-out duration-75 hover:scale-105 hover:shadow-lg",
        className,
      )}
      radius="lg"
    >
      <CardBody className="aspect-poster relative">
        {item.poster_path ? (
          <Image
            fill
            alt={isMovie ? (item as Movie).title : (item as TVShow).name}
            className="object-cover"
            priority={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={s.movies.getImageUrl(item.poster_path, "w500") || ""}
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No Image</span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-background/40 drop-shadow-md backdrop-blur-md rounded-md px-2 py-1 text-xs font-medium flex items-center justify-center gap-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span>{item.vote_average.toFixed(1)}</span>
        </div>
      </CardBody>
      <CardFooter className="absolute bottom-0 bg-background/20 p-3 flex flex-col gap-1 items-start">
        <h3 className="font-semibold font-header line-clamp-1">
          {isMovie ? (item as Movie).title : (item as TVShow).name}
        </h3>
        <p className="text-xs text-muted-foreground">
          {isMovie
            ? formatDate((item as Movie).release_date)
            : formatDate((item as TVShow).first_air_date)}
        </p>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
