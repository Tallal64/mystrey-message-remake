import z from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, "username must be at least 3 characters.")
    .max(15, "username must be at most 15 characters."),

  email: z.email("invalid email"),

  password: z.string().min(4, "password must be at least 4 characters."),
});
