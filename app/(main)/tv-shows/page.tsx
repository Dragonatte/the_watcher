"use client";

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Skeleton, Pagination } from "@heroui/react";
import Link from "next/link";

import { title } from "@/components/primitives";
import { TVShow } from "@/model/TVShow.model";
import { fetchTVShows } from "@/actions/tvshow.action";
import ItemCard from "@/components/hero/atom/ItemCard";
import ErrorDisplay from "@/components/error/ErrorDisplay";
import { useBackgroundImg } from "@/context/BackgroundImgContext";

const Page: React.FC = (): React.JSX.Element => {
  const { setBackgroundImg } = useBackgroundImg();

  const [tvshows, setTVShows] = useState<TVShow[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(
    localStorage.getItem("currentPageTVShows")
      ? parseInt(localStorage.getItem("currentPageTVShows")!)
      : 1,
  );
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("currentPageTVShows", currentPage.toString());
    setBackgroundImg(null);
    setLoading(true);
    setError(null);
    fetchTVShows(currentPage).then(({ items: tvshows, pages, error }): void => {
      if (error) {
        setError(error);
      } else {
        setTVShows(tvshows);
        setTotalPages(pages);
      }
    });

    setLoading(false);
  }, [currentPage]);

  function fetchingTVShows(page: number): void {
    setLoading(true);
    setError(null);
    fetchTVShows(page).then(({ items: tvshow, pages, error }): void => {
      if (error) {
        setError(error);
      } else {
        setTVShows(tvshow);
        setTotalPages(pages);
      }
      setLoading(false);
    });
  }

  function handlePageChange(page: number): void {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section className={"container mx-auto py-8 px-4"}>
      <h1 className={clsx(title({ size: "lg" }))}>Series de TV Populares</h1>

      {error && (
        <ErrorDisplay
          message={error}
          onRetry={() => {
            fetchingTVShows(currentPage);
          }}
        />
      )}
      <section className={"my-8"}>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {Array.from({ length: 20 }).map((_, index: number) => (
              <div key={index} className="space-y-2 relative">
                <Skeleton className="aspect-[2/3] w-full rounded-lg" />
                <div
                  className={
                    "absolute bottom-0 p-3 flex flex-col gap-1 items-start"
                  }
                >
                  <Skeleton className="h-4 w-3/4 rounded-2xl" />
                  <Skeleton className="h-3 w-1/2 rounded-2xl" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {tvshows.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {tvshows.map(
                  (tvshow: TVShow): React.ReactElement => (
                    <Link
                      key={tvshow.id}
                      className={"flex justify-center"}
                      href={`./tv-shows/${tvshow.id}`}
                    >
                      <ItemCard key={tvshow.id} item={tvshow} />
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
        {!loading && !error && tvshows.length > 0 && (
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
