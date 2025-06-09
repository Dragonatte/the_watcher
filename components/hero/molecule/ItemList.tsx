import React from "react";
import Link from "next/link";

import ItemCard from "@/components/hero/atom/ItemCard";

import { Movie } from "@/model/Movie.model";
import { TVShow } from "@/model/TVShow.model";
import s from "@/service/app.services";

const ItemList: React.FC<{ type: "movie" | "tv" }> = async ({
  type,
}: {
  type: "movie" | "tv";
}): Promise<React.JSX.Element> => {
  const data: Movie[] | TVShow[] = await (type === "movie"
    ? s.movies.getPopularMovies()
    : s.tvseries.getPopularTVSeries());

  return (
    <>
      {data.map(
        (item: Movie | TVShow): React.JSX.Element => (
          <Link
            key={item.id}
            href={
              type === "movie" ? `/movies/${item.id}` : `/tv-shows/${item.id}`
            }
          >
            <ItemCard item={item} />
          </Link>
        ),
      )}
    </>
  );
};

export default ItemList;
