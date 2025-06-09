"use client";
import React, { FC, JSX } from "react";
import { Textarea, Avatar, Form } from "@heroui/react";
import { Button } from "@heroui/button";
import axios from "axios";

import { User as UserType } from "@/model/User.model";
import RatingStars from "@/components/details/atoms/RatingStars";

const CommentInput: FC<{ user: UserType }> = ({
  user,
}: {
  user: UserType;
}): JSX.Element => {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    axios
      .post("/api/comments", {
        content: data.content,
        userId: user.id,
      })
      .then();
  }

  return (
    <Form
      className={
        "mt-8 w-full bg-default-500/5 backdrop-blur-2xl p-4 rounded-2xl border-2 border-default-200/50 hover:border-default-400/50 transition-colors duration-200"
      }
      method="post"
      onSubmit={handleSubmit}
    >
      <div className={"flex items-center gap-4 w-full"}>
        <Avatar
          showFallback
          className={"aspect-square !w-11"}
          src={user.image!}
        />
        <Textarea
          aria-label="Comentario"
          autoComplete="off"
          className={"w-full"}
          minRows={1}
          name="content"
          placeholder="Escribe un comentario..."
          size="lg"
          variant="bordered"
        />
      </div>
      <div className={"w-full"}>
        <div className={"w-full flex justify-between items-center gap-4 mt-4"}>
          <RatingStars />
          <div className={"flex items-center gap-2"}>
            <Button radius={"full"} variant={"ghost"}>
              Cancelar
            </Button>
            <Button
              color="primary"
              radius={"full"}
              type="submit"
              variant="solid"
            >
              Comentar
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default CommentInput;
