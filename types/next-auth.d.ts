import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id?: string;
      username?: string;
      isAcceptingMessage?: boolean;
      isVerified?: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    _id: string;
    username: string;
    isAcceptingMessage: boolean;
    isVerified: boolean;
  }

  interface JWT {
    _id: string;
    username: string;
    isAcceptingMessage: boolean;
    isVerified: boolean;
  }
}
