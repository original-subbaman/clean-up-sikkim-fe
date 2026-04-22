"use client";
import { Eye, EyeClosed } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignupSchema, signupSchema } from "@/lib/schemas/auth-schemas";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useState } from "react";
import { PasswordTextField } from "@/components/auth/PasswordTextField";
import LoginWithGoogle from "@/components/auth/LoginWithGoogle";
import Link from "next/link";

function Page() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function togglePasswordVisibility() {
    setPasswordVisible((prev) => !prev);
  }

  return (
    <div className="w-full max-w-md my-8">
      <div className="text-center mb-4">
        <h1 className="font-headline font-extrabold text-4xl tracking-tight text-primary mb-2">
          Clean Up Sikkim
        </h1>
        <p className="text-on-surface-variant font-medium">
          Join to keep Sikkim clean and green.
        </p>
      </div>
      {/* Sign Up Card*/}
      <div className="w-full bg-surface-container-lowest rounded-xl p-8  editorial-shadow border border-outline-variant/10">
        {/* Social Sign Up */}
        <div className="space-y-2 mb-8">
          <LoginWithGoogle label="Sign Up With Google" onClick={() => {}} />
        </div>
        <div className="relative mb-8 flex items-center">
          <div className="grow border-t border-outline-variant opacity-30"></div>
          <span className="px-4 text-xs font-label uppercase tracking-widest text-outline">
            Or use email
          </span>
          <div className="grow border-t border-outline-variant opacity-30"></div>
        </div>
        {/* form */}
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit((data) => console.log(data))}
        >
          <div>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel
                    htmlFor="username"
                    className="block text-sm font-label font-bold text-on-surface-variant mb-2 ml-1"
                  >
                    Username
                  </FieldLabel>
                  <Input
                    {...field}
                    id="username"
                    name="username"
                    aria-invalid={fieldState.invalid}
                    placeholder="ecoguardian_42"
                    type="text"
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
            <PasswordTextField name="password" control={form.control} />
          </div>
          <div className="pt-2">
            <Button type="submit" size="lg" className="w-full p-5">
              Create Account
            </Button>
          </div>
        </form>

        {/* Sign In Link */}
        <div className="mt-8 pt-8 text-center border-t border-outline-variant/20">
          <p className="text-on-surface-variant text-sm">
            Already have an account?
            <Link
              className="text-primary font-bold ml-1 hover:underline transition-all"
              href="/login"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
