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
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import GithubAuthButton from "../github-auth-button";
import GoogleAuthButton from "../google-auth-button";
import { loginSchema, type TLoginSchema } from "../zod-schema";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: TLoginSchema) => {
    await authClient.signIn.email(
      {
        email: data.identifier,
        password: data.password,
      },
      {
        onSuccess: () => {
          navigate({ to: "/" });
        },
        onError: ({ error }) => {
          setAuthError(error.message);
        },
      },
    );
  };

  return (
    <fieldset disabled={isSubmitting} className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Github or Google account
          </CardDescription>
          {authError && (
            <div role="alert" className="text-destructive text-sm">
              {authError}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <GithubAuthButton />
                <GoogleAuthButton />
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("identifier")}
                />
                <FieldError
                  errors={[{ message: errors.identifier?.message }]}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    to="/"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">
                  Login
                  {isSubmitting && <Loader2 className="animate-spin" />}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link to="/auth/signup">Sign up</Link>
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
