import { User } from "@/lib/prisma/generated/prisma/client";
import prisma from "@/lib/prisma/prisma";
import { RegisterUser } from "@/model/User.model";

export const userService = () => ({
  getAll: async (): Promise<User[]> => {
    return prisma.user.findMany({
      include: {
        accounts: true,
        sessions: true,
      },
    });
  },

  getById: async (id: string): Promise<User | null> =>
    prisma.user.findUnique({
      where: { id },
      include: {
        accounts: true,
        sessions: true,
      },
    }),

  getByEmail: async (email: string): Promise<User | null> =>
    prisma.user.findUnique({
      where: { email },
      include: {
        accounts: true,
        sessions: true,
      },
    }),

  getByUsername: async (username: string): Promise<User | null> =>
    prisma.user.findUnique({
      where: { username },
      include: {
        accounts: true,
        sessions: true,
      },
    }),

  create: async (data: RegisterUser): Promise<User> =>
    prisma.user.create({ data }),

  update: async (id: string, data: Partial<User>): Promise<User> =>
    prisma.user.update({
      where: { id },
      data,
    }),

  remove: async (id: string): Promise<User> => prisma.user.delete({ where: { id } }),
});
