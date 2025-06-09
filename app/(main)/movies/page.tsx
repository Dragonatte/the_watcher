"use client";

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Skeleton, Pagination } from "@heroui/react";
import Link from "next/link";

import { title } from "@/components/primitives";
import { Movie } from "@/model/Movie.model";
import { fetchMovies } from "@/actions/movie.action";
import ItemCard from "@/components/hero/atom/ItemCard";
import ErrorDisplay from "@/components/error/ErrorDisplay";
import { useBackgroundImg } from "@/context/BackgroundImgContext";
import { ActionResult } from "@/model/ActionResult.model";

const Page: React.FC = (): React.JSX.Element => {
  const { setBackgroundImg } = useBackgroundImg();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(
    localStorage.getItem("currentPageMovies")
      ? parseInt(localStorage.getItem("currentPageMovies")!)
      : 1,
  );
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("currentPageMovies", currentPage.toString());
    setBackgroundImg(null);
    setLoading(true);
    setError(null);
    fetchMovies(currentPage).then(
      ({ items: movies, pages, error }: ActionResult<Movie>): void => {
        if (error) {
          setError(error);
        } else {
          setMovies(movies);
          setTotalPages(pages);
        }
      },
    );

    setLoading(false);
  }, [currentPage]);

  function fetchingMovies(page: number): void {
    setLoading(true);
    setError(null);
    fetchMovies(page).then(
      ({ items: movies, pages, error }: ActionResult<Movie>): void => {
        if (error) {
          setError(error);
        } else {
          setMovies(movies);
          setTotalPages(pages);
        }
        setLoading(false);
      },
    );
  }

  function handlePageChange(page: number): void {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section className={"container mx-auto py-8 px-4"}>
      <h1 className={clsx(title({ size: "lg" }))}>Películas Populares</h1>

      {error && (
        <ErrorDisplay
          message={error}
          onRetry={() => {
            fetchingMovies(currentPage);
          }}
        />
      )}
      <section className={"my-8"}>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {Array.from({ length: 20 }).map((_, index: number) => (
              <div key={index} className="space-y-2">
                <Skeleton className="aspect-[2/3] w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {movies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {movies.map(
                  (movie: Movie): React.ReactElement => (
                    <Link
                      key={movie.id}
                      className={"flex justify-center"}
                      href={`./movies/${movie.id}`}
                    >
                      <ItemCard key={movie.id} item={movie} />
                    </Link>
                  ),
                )}
              </div>
            ) : (
              !error && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No se encontraron películas.
                  </p>
                </div>
              )
            )}
          </>
        )}
      </section>
      <footer className={"flex justify-center"}>
        {!loading && !error && movies.length > 0 && (
          <>
            <Pagination
              className={"hidden 2xl:block"}
              initialPage={currentPage}
              siblings={16}
              total={totalPages}
              onChange={handlePageChange}
            />
            <Pagination
              className={"hidden xl:block 2xl:hidden"}
              initialPage={currentPage}
              siblings={12}
              total={totalPages}
              onChange={handlePageChange}
            />
            <Pagination
              className={"hidden lg:block xl:hidden"}
              initialPage={currentPage}
              siblings={10}
              total={totalPages}
              onChange={handlePageChange}
            />
            <Pagination
              className={"hidden md:block lg:hidden"}
              initialPage={currentPage}
              siblings={8}
              total={totalPages}
              onChange={handlePageChange}
            />
            <Pagination
              className={"block md:hidden"}
              initialPage={currentPage}
              siblings={1}
              total={totalPages}
              onChange={handlePageChange}
            />
          </>
        )}
      </footer>
    </section>
  );
};

export default Page;
