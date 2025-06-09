import crypto from "crypto";

import { RegisterUser, User } from "@/model/User.model";
import s from "@/service/app.services";
import { comparePassword, hashPassword } from "@/utils/auth/pass_hash";
import { VerificationToken } from "@/model/VerificationToken.model";

export const authService = () => ({
  signin: async (email: string, password: string): Promise<User> => {
    const user: User | null = await s.users.getByEmail(email);

    if (!user) throw new Error("Invalid credentials");
    const correctPass: boolean = await comparePassword(password, user.password);

    if (!correctPass) throw new Error("Invalid credentials");

    return user;
  },

  signup: async (name: string, username: string, email: string, password: string): Promise<User> => {
    const emailExists: User | null = await s.users.getByEmail(email);

    if (emailExists) throw new Error("Email already exists");

    const hashedPassword: string = await hashPassword(password);

    const newUser: RegisterUser = {
      name,
      username,
      email,
      password: hashedPassword,
    };

    const createdUser: User | null = await s.users.create(newUser);

    if (!createdUser) throw new Error("Failed to create user");
    const verifyToken: VerificationToken = {
      identifier: createdUser.email,
      token: crypto.randomBytes(16).toString("hex"), // Simple token generation
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    };

    const createdVerifyToken: VerificationToken = await s.verificationTokens.create(verifyToken);

    await s.emails.sendEmail(
      [createdUser.email!],
      "Verify your email",
      //`<p>Click <a href="${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify?token=${createdVerifyToken.token}">here</a> to verify your email.</p>`
      `<p>Click <a href="http://localhost:3000/api/auth/verify-user?token=${createdVerifyToken.token}">here</a> to verify your email.</p>`,
    );

    return createdUser;
  },

  verifyEmail: async (token: string): Promise<void> => {
    const verificationToken: VerificationToken | null = await s.verificationTokens.findByToken(token);

    if (!verificationToken) throw new Error("Invalid or expired token");
    const user: User | null = await s.users.getByEmail(verificationToken.identifier);

    if (!user) throw new Error("User not found");
    if (verificationToken.expires < new Date()) throw new Error("Token has expired");

    await s.users.update(user.id, { emailVerified: new Date() });
  },
});
