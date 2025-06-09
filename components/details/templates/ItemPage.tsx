import React, { FC, JSX, Suspense } from "react";
import clsx from "clsx";

import { Movie } from "@/model/Movie.model";
import { title } from "@/components/primitives";
import s from "@/service/app.services";
import { User as UserType } from "@/model/User.model";
import Comments from "@/components/details/molecules/Comments";
import CommentsSkeleton from "@/components/details/skeleton/comments/CommentsSkeleton";
import ItemInfo from "@/components/details/organism/ItemInfo";
import { TVShow } from "@/model/TVShow.model";

interface ItemPageProps {
  id: string;
  user: UserType;
  type: "movie" | "tv";
}

const ItemPage: FC<ItemPageProps> = async ({
  id,
  user,
  type,
}: ItemPageProps): Promise<JSX.Element> => {
  const item: Movie | TVShow =
    type === "movie"
      ? await s.movies.getById(id)
      : await s.tvseries.getById(id);

  const error: string | null = item ? null : "No se pudo cargar la película.";

  if (!item) {
    return (
      <div className="container mx-auto py-8 px-4">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p>No se encontró la película.</p>
        )}
      </div>
    );
  }

  return (
    <>
      <section className={"min-h-dvh md:py-8 bg-cover"}>
        <article className="w-full h-full rounded-none border-none p-4 md:container md:mx-auto md:p-6 backdrop-blur-2xl bg-background/50 md:border md:border-white/15 md:rounded-2xl">
          <ItemInfo item={item} type={type} />
          <section className={"mt-8 flex flex-col"}>
            <h1 className={clsx(title({ size: "md" }), "font-header")}>
              Críticas
            </h1>
            {user ? <>User</> : <>No user</>}
            <Suspense fallback={<CommentsSkeleton />}>
              <Comments id={id} />
            </Suspense>
          </section>
        </article>
      </section>
    </>
  );
};

export default ItemPage;
