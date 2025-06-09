import prisma from "@/lib/prisma/prisma";

export const commentService = () => ({
  findByMovie: async (movieId: string) => {
    setTimeout(() => {}, 10000);

    return prisma.comment.findMany({
      where: { movieId },
      include: {
        user: {
          select: {
            username: true,
            image: true,
            isCritic: true,
          },
        },
        rating: {
          select: {
            rating: true,
          },
        },
      },
    });
  },
});
