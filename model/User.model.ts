import {
  Prisma,
  User as PrismaUser,
} from "@/lib/prisma/generated/prisma/client";

export type User = PrismaUser;

export type RegisterUser = Prisma.UserCreateInput;
