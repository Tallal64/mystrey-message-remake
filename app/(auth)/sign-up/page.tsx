"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Controller, useForm } from "react-hook-form";
import { signUpSchema } from "@/schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ApiPromise } from "@/types/ApiPromise";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import z from "zod";

export default function SignUpForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    const makeSignUpRequest = async () => {
      try {
        const response = await axios.post<ApiPromise>("/api/sign-up", data);
        router.replace(`/verify/${data.username}`);
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiPromise>;
        // Throw the message so toast.promise can catch it for the 'error' state
        throw new Error(
          axiosError.response?.data.message || "Error during sign-up"
        );
      }
    };

    // Pass the promise to Sonner (submit button)
    toast.promise(makeSignUpRequest(), {
      loading: "Creating account...",
      success: (data) => `${data.message || "Account"} has been created`,
      error: (err) => err.message,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>Sign up to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="sign-up-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="Username">Username</FieldLabel>
                    <Input
                      {...field}
                      id="Username"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Username"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="Email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="Email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Email"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="Password">Password</FieldLabel>
                    <Input
                      {...field}
                      id="Password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Password"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            variant="outline"
            type="submit"
            form="sign-up-form"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
