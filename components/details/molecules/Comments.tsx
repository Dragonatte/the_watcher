import React, { FC, JSX } from "react";

import { Comment } from "@/model/Comment.model";
import s from "@/service/app.services";
import CommentsTabs from "@/components/details/molecules/CommentsTabs";

const Comments: FC<{ id: string }> = async ({
  id,
}: {
  id: string;
}): Promise<JSX.Element> => {
  const comments: Comment[] = await (async () => {
    setTimeout(() => {}, 10000);

    return s.comments.findByMovie(id);
  })();

  return <CommentsTabs comments={comments} />;
};

export default Comments;
