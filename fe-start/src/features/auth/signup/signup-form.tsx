import { authClient } from "#/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signupSchema, type TSignupSchema } from "../zod-schema";
import { env } from "#/config/env";

export default function SignupForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async ({
    email,
    fullName,
    password,
    username,
  }: TSignupSchema) => {
    setLoading(true);
    setError("");
    try {
      await authClient.signUp.email(
        {
          email,
          name: fullName,
          password: password,
          username,
          callbackURL: `${env.VITE_FRONTEND_URL}`,
        },
        {
          onSuccess: () => {
            setMessage(
              `An email has been sent to ${email}. Please follow to verify your account`,
            );
            reset();
            toast.success("Account created successfully");
          },
          onError: ({ error }) => {
            setError(error.message);
            console.log(error);
          },
        },
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <fieldset disabled={loading} className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
          {!!message && (
            <div role="alert">
              <p>{message} </p>
            </div>
          )}
          {!!error && (
            <div role="alert">
              <p className="text-destructive">{error}</p>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <FieldError errors={[{ message: errors.fullName.message }]} />
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <FieldError errors={[{ message: errors.email.message }]} />
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="m@example.com"
                  {...register("username")}
                />
                {errors.username && (
                  <FieldError errors={[{ message: errors.username.message }]} />
                )}
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      {...register("password")}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      type="password"
                      {...register("confirmPassword")}
                    />
                  </Field>
                </Field>
                {errors.confirmPassword || errors.password ? (
                  <FieldError
                    errors={[
                      {
                        message:
                          errors?.password?.message ||
                          errors?.confirmPassword?.message,
                      },
                    ]}
                  />
                ) : (
                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <Button type="submit">
                  Create Account
                  {loading && <Loader2 className="animate-spin" />}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link to="/auth/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </fieldset>
  );
}
