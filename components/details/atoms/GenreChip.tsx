import { Chip } from "@heroui/chip";
import React, { FC, JSX } from "react";

import {
  movieGenreColorMap,
  tvSeriesGenreColorMap,
} from "@/config/genrecolormap";
import { Genre } from "@/model/Genre.model";

interface GenreChipProps {
  genre: Genre;
  type: "movie" | "tv";
}

const GenreChip: FC<GenreChipProps> = ({
  genre,
  type,
}: GenreChipProps): JSX.Element => {
  const color: { dot: string; base: string; text: string } =
    type === "movie"
      ? movieGenreColorMap[
          genre.id as unknown as keyof typeof movieGenreColorMap
        ] || {
          dot: "bg-default-900",
          base: "bg-default-900/20",
          text: "text-default-900",
        }
      : tvSeriesGenreColorMap[
          genre.id as unknown as keyof typeof tvSeriesGenreColorMap
        ] || {
          dot: "bg-default-900",
          base: "bg-default-900/20",
          text: "text-default-900",
        };

  const dotClass: string = color?.dot ?? "";
  const bgClass: string = color?.base ?? "";
  const textClass: string = color?.text ?? "text-default-900";

  return (
    <Chip
      key={genre.id}
      className={"border-none"}
      classNames={{
        dot: dotClass,
        base: bgClass,
        content: textClass,
      }}
      variant="dot"
    >
      {genre.name}
    </Chip>
  );
};

export default GenreChip;
