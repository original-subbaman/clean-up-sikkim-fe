"use client";
import { Eye, EyeClosed } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignupSchema, signupSchema } from "@/lib/schemas/signup-schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useState } from "react";

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
    <>
      <BackgroundDecoration />
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
            <Button variant="outline" className="w-full p-5" type="button">
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google logo"
                className="h-6 w-6"
              />
              <span className=" font-semibold">Sign up with Google</span>
            </Button>
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
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel
                      htmlFor="password"
                      className="block text-sm font-label font-bold text-on-surface-variant mb-2 ml-1"
                    >
                      Password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id="password"
                        name="password"
                        aria-invalid={fieldState.invalid}
                        placeholder="••••••••"
                        type={passwordVisible ? "text" : "password"}
                        className="w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 rounded-xl px-5 py-4 text-on-surface placeholder:text-outline transition-all duration-200"
                      />
                      <Button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary"
                        variant="ghost"
                        size="icon"
                        onClick={togglePasswordVisibility}
                      >
                        {passwordVisible ? <Eye /> : <EyeClosed />}
                      </Button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                    <p className="mt-2 text-[0.7rem] text-outline px-1">
                      Must be at least 8 characters with a symbol.
                    </p>
                  </Field>
                )}
              />
            </div>
            <div className="pt-2">
              <Button type="submit" size="lg" className="w-full p-5">
                Create Account
              </Button>
            </div>
          </form>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-on-surface-variant">
              Already have an account?
              <a
                className="text-tertiary font-bold ml-1 hover:underline transition-all"
                href="/login"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function BackgroundDecoration() {
  return (
    <div>
      <div className="fixed top-0 right-0 -z-10 opacity-10">
        <svg
          fill="none"
          height="600"
          viewBox="0 0 600 600"
          width="600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="450" cy="150" fill="#0f5238" r="300"></circle>
        </svg>
      </div>
      <div className="fixed bottom-0 left-0 -z-10 opacity-10">
        <svg
          fill="none"
          height="400"
          viewBox="0 0 400 400"
          width="400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            fill="#812a00"
            height="400"
            rx="100"
            transform="rotate(-15 -100 200)"
            width="400"
            x="-100"
            y="200"
          ></rect>
        </svg>
      </div>
    </div>
  );
}

export default Page;
