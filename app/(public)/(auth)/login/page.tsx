"use client";
import LoginWithGoogle from "@/components/auth/LoginWithGoogle";
import { PasswordTextField } from "@/components/auth/PasswordTextField";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoginSchema, loginSchema } from "@/lib/schemas/auth-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

function Page() {
  const router = useRouter();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="w-full flex justify-center items-center flex-1">
      <div className="z-10 w-full max-w-md">
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-tertiary/5 rounded-full blur-3xl"></div>
        <div className="bg-surface-container-lowest rounded-xl p-8 md:p-10 editorial-shadow border border-outline-variant/10">
          <div className="flex flex-col items-center mb-10">
            <h1 className="font-headline text-2xl font-extrabold tracking-tight text-primary">
              Clean Up Sikkim
            </h1>
            <p className="text-on-surface-variant text-sm mt-1">
              Welcome back!
            </p>
          </div>
          <div className="space-y-3 mb-8">
            <LoginWithGoogle label="Continue With Google" onClick={() => {}} />
          </div>
          <div className="flex items-center gap-4 mb-8">
            <div className="grow h-px bg-outline-variant/30"></div>
            <span className="text-xs font-label uppercase tracking-widest text-outline">
              or email
            </span>
            <div className="grow h-px bg-outline-variant/30"></div>
          </div>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit((data) => router.push("/verify-otp"))}
          >
            <div>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel
                      htmlFor="email"
                      className="block text-sm font-label font-bold text-on-surface-variant mb-2 ml-1"
                    >
                      Email Address
                    </FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      name="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="hello@example.com"
                      type="email"
                      className="w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 rounded-xl px-5 py-4 text-on-surface placeholder:text-outline transition-all duration-200"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <div>
              <PasswordTextField
                control={form.control}
                name="password"
                hint=""
              />
              <div className="flex justify-between items-center my-4 ml-1">
                <Link
                  className="text-xs font-medium text-tertiary hover:underline"
                  href="/forgot-password"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full">
              Sign In
            </Button>
          </form>
          <div className="mt-8 pt-8 border-t border-outline-variant/20 text-center">
            <p className="text-sm text-on-surface-variant">
              Don't have an account?
              <Link
                className="text-primary font-bold hover:underline ml-1"
                href="/signup"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
