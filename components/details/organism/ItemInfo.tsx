"use client";

import Image from "next/image";
import clsx from "clsx";
import React, { FC, JSX } from "react";
import { Chip } from "@heroui/chip";

import s from "@/service/app.services";
import { Genre } from "@/model/Genre.model";
import { CalendarIcon, ClockIcon, Star } from "@/components/common/atoms/icons";
import { Movie } from "@/model/Movie.model";
import { TVShow } from "@/model/TVShow.model";
import { title } from "@/components/primitives";
import GenreChip from "@/components/details/atoms/GenreChip";

interface ItemInfoProps {
  item: Movie | TVShow;
  type: "movie" | "tv";
}

const ItemInfo: FC<ItemInfoProps> = ({ item, type }: ItemInfoProps) => {
  const itemTitle: string =
    type === "movie" ? (item as Movie).title : (item as TVShow).name;
  const releasedDate: string =
    type === "movie"
      ? (item as Movie).release_date
      : (item as TVShow).first_air_date;

  return (
    <section className="flex flex-col gap-8 lg:flex-row">
      <Image
        priority
        alt={itemTitle}
        className={"object-cover rounded-2xl"}
        height={(360 * 3) / 2}
        src={s.movies.getImageUrl(item.poster_path!) || ""}
        width={360}
      />
      <section>
        <h1 className={clsx(title({ size: "md" }), "font-header")}>
          {itemTitle}
        </h1>
        <div className={"flex items-center gap-4 my-4"}>
          {item.genres!.map(
            (genre: Genre, index: number): JSX.Element => (
              <GenreChip key={index} genre={genre} type={type} />
            ),
          )}
        </div>
        <div className="flex items-center gap-4 mb-8 text-xs md:text-base">
          <Chip
            size={"sm"}
            startContent={
              <Star className={"fill-amber-400 size-3 md:size-4.5"} />
            }
            variant="flat"
          >
            {item.vote_average.toFixed(2)}/10{" "}
            <span className={"text-default-500"}>
              ({item.vote_count} votos)
            </span>
          </Chip>
          {type === "movie" ? (
            <Chip
              size={"sm"}
              startContent={
                <ClockIcon className={"fill-default-900 size-3 md:size-4.5"} />
              }
              variant="flat"
            >
              {(item as Movie).runtime} mins.
            </Chip>
          ) : (
            ""
          )}
          <Chip
            size={"sm"}
            startContent={
              <CalendarIcon className={"fill-default-900 size-3 md:size-4.5"} />
            }
            variant="flat"
          >
            {new Date(releasedDate).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </Chip>
        </div>
        <h2 className={clsx(title({ size: "sm" }), "font-header")}>Sinopsis</h2>
        <p
          className={"text-justify text-default-500 mt-4 text-sm md:text-base"}
        >
          {item.overview}
        </p>
      </section>
    </section>
  );
};

export default ItemInfo;
