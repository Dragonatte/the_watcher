import { VerificationToken } from "@/model/VerificationToken.model";
import prisma from "@/lib/prisma/prisma";

export const verificationTokenService = () => ({
  findAll: async (): Promise<VerificationToken[]> =>
    prisma.verificationToken.findMany<VerificationToken>(),
  findByToken: async (token: string): Promise<VerificationToken | null> =>
    prisma.verificationToken.findFirst({
      where: { token },
    }),
  create: async (data: VerificationToken): Promise<VerificationToken | null> =>
    prisma.verificationToken.create<VerificationToken>({
      data: {
        identifier: data.identifier,
        token: data.token,
        expires: data.expires,
      },
    }),
});
