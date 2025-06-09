import { Prisma } from "@/lib/prisma/generated/prisma/client";

export type Comment = Prisma.CommentGetPayload<{
  include: {
    user: {
      select: {
        username: true;
        image: true;
        isCritic: true;
      };
    };
    rating: {
      select: {
        rating: true;
      };
    };
  };
}>;
