import z from "zod";

export const signInSchema = z.object({
  identifier: z.string("Email or Username is required"),
  password: z.string("Password is required"),
});
