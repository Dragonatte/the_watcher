import Image from "next/image";
import React, { FC, JSX } from "react";

import SeeDetails from "@/components/common/atoms/SeeDetails";
import { Movie } from "@/model/Movie.model";
import s from "@/service/app.services";

const FeaturedMovie: FC = async (): Promise<JSX.Element> => {
  const movie: Movie = await s.movies.getFeaturedMovies();

  return (
    <section className="relative rounded-xl overflow-hidden aspect-wide w-full">
      <Image
        fill
        priority
        alt={movie.title}
        className="object-cover object-center"
        src={s.movies.getImageUrl(movie.backdrop_path!, "original") || ""}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-0 hover:opacity-100 duration-300 ease-in-out transition group">
        <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full md:max-w-2xl transition translate-y-16 duration-300 ease-in-out group-hover:translate-y-0">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-sm md:text-base line-clamp-2 md:line-clamp-3 mb-4 text-muted-foreground">
            {movie.overview}
          </p>
          <SeeDetails id={movie.id} />
        </div>
      </div>
    </section>
  );
};

export default FeaturedMovie;
