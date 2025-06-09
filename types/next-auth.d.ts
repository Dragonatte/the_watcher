declare module "next-auth" {
  interface Session {
    user: {
      address: string;
      isCritic?: boolean; // Optional property for critic status
    } & DefaultSession["user"];
  }
}
