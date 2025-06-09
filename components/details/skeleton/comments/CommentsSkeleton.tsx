"use client";

import React, { FC, JSX } from "react";
import { Tabs, Tab } from "@heroui/react";

import CommentCardSkeleton from "@/components/details/skeleton/comments/CommentCardSkeleton";

const Comments: FC = (): JSX.Element => {
  const comments: never[] = Array.from({ length: 10 });

  return (
    <Tabs aria-label="Comentarios" className={"mt-8"}>
      <Tab key={"all"} className={"w-full flex flex-col gap-4"} title={"Todas"}>
        {comments.map((_: never, index: number) => (
          <CommentCardSkeleton key={index} />
        ))}
      </Tab>
      <Tab key={"user"} className={"w-full"} title={"Usuarios"}>
        {comments.map((_: never, index: number) => (
          <CommentCardSkeleton key={index} />
        ))}
      </Tab>
      <Tab key={"critics"} className={"w-full"} title={"Críticos"}>
        {comments.map((_: never, index: number) => (
          <CommentCardSkeleton key={index} />
        ))}
      </Tab>
    </Tabs>
  );
};

export default Comments;
