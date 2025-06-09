import React, { FC, JSX, Suspense } from "react";

import FeaturedMovie from "@/components/hero/atom/FeaturedMovies";
import SeeAllButton from "@/components/hero/atom/SeeAllButton";
import ListScroll from "@/components/hero/organism/ListScroll";

const Home: FC = (): JSX.Element => (
  <section className="container mx-auto flex flex-col items-center justify-center min-h-[calc(100dvh-7.5rem)] gap-4 py-8 md:py-10">
    <Suspense fallback={<div className="w-full h-96 bg-muted animate-pulse" />}>
      <FeaturedMovie />
    </Suspense>

    <div className="flex justify-between items-center gap-4 mt-16 w-full">
      <h2 className="text-2xl font-bold font-header">Películas Populares</h2>
      <SeeAllButton link="/movies" />
    </div>

    <ListScroll type="movie" />

    <div className="flex justify-between items-center gap-4 mt-16 w-full">
      <h2 className="text-2xl font-bold font-header">Series de TV Populares</h2>
      <SeeAllButton link="/tv-shows" />
    </div>

    <ListScroll type="tv" />
  </section>
);

export default Home;
