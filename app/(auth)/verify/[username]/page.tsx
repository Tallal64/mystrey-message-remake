"use client";

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
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { ApiPromise } from "@/types/ApiPromise";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { verifyCodeSchema } from "@/schemas/verifyCodeSchema";
import z from "zod";
import { Button } from "@/components/ui/button";

export default function VerifyCode() {
  const router = useRouter();
  const params = useParams();
  const { username } = params;

  const form = useForm<z.infer<typeof verifyCodeSchema>>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof verifyCodeSchema>) => {
    const makeVerifyCodeRequest = async () => {
      try {
        const response = await axios.post<ApiPromise>("/api/verify-code", {
          username,
          code: data.code,
        });

        router.replace("/dashboard");
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiPromise>;
        throw new Error(
          axiosError.response?.data.message || "Error during verification"
        );
      }
    };

    // Pass the promise to Sonner (submit button)
    toast.promise(makeVerifyCodeRequest(), {
      loading: "Verifying account...",
      success: (data) => `${data?.message || "Account"} has been created`,
      error: (err) => err.message,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Verify Code</CardTitle>
          <CardDescription>
            Enter the code that was sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="verify-code-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="code"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="code">
                      Enter Verification Code
                    </FieldLabel>
                    <Input
                      {...field}
                      id="code"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter code"
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
            form="verify-code-form"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
