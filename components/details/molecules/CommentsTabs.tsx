"use client";

import React, { FC, JSX } from "react";
import { Tabs, Tab } from "@heroui/react";

import { Comment } from "@/model/Comment.model";
import CommentCard from "@/components/details/atoms/CommentCard";
import { formatDate } from "@/utils/date/date_formatter";

const Comments: FC<{ comments: Comment[] }> = ({
  comments,
}: {
  comments: Comment[];
}): JSX.Element => {
  const [userComments, criticComments, allComments] = comments.reduce(
    (
      acc: [Comment[], Comment[], Comment[]],
      comment: Comment,
    ): [Comment[], Comment[], Comment[]] => {
      if (!comment.user.isCritic) {
        acc[0].push(comment);
      } else {
        acc[1].push(comment);
      }
      acc[2].push(comment);

      return acc;
    },
    [[], [], []],
  );

  return (
    <Tabs aria-label="Comentarios" className={"mt-8"}>
      <Tab key={"all"} className={"w-full flex flex-col gap-4"} title={"Todas"}>
        {allComments.length > 0 ? (
          allComments.map((comment: Comment) => (
            <CommentCard
              key={comment.id}
              comment={comment.content}
              date={formatDate(comment.createdAt.toString())}
              userImg={comment.user.image || "/default-avatar.png"}
              username={comment.user.username!}
            />
          ))
        ) : (
          <p>No hay comentarios disponibles.</p>
        )}
      </Tab>
      <Tab key={"user"} className={"w-full"} title={"Usuarios"}>
        {userComments.length > 0 ? (
          userComments.map((comment: Comment) => (
            <CommentCard
              key={comment.id}
              comment={comment.content}
              date={formatDate(comment.createdAt.toString())}
              userImg={comment.user.image || "/default-avatar.png"}
              username={comment.user.username!}
            />
          ))
        ) : (
          <p>No hay comentarios de usuarios disponibles.</p>
        )}
      </Tab>
      <Tab key={"critics"} className={"w-full"} title={"Críticos"}>
        {criticComments.length > 0 ? (
          criticComments.map((comment: Comment) => (
            <CommentCard
              key={comment.id}
              comment={comment.content}
              date={formatDate(comment.createdAt.toString())}
              userImg={comment.user.image || "/default-avatar.png"}
              username={comment.user.username!}
            />
          ))
        ) : (
          <p>No hay comentarios de críticos disponibles.</p>
        )}
      </Tab>
    </Tabs>
  );
};

export default Comments;