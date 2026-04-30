"use client";
import { PasswordTextField } from "@/components/auth/PasswordTextField";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SignupSchema, signupSchema } from "@/lib/schemas/auth-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "aws-amplify/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

function Page() {
  const router = useRouter();
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function handleSignUp(data: SignupSchema) {
    try {
      await signUp({
        username: data.email,
        password: data.password,
        options: {
          userAttributes: {
            email: data.email,
            name: data.username,
          },
        },
      });

      sessionStorage.setItem("pendingSignupEmail", data.email);
      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
    } catch (error) {
      form.setError("root", {
        message: getSignUpErrorMessage(error),
      });
    }
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
      <div className="w-full bg-surface-container-lowest rounded-xl p-8 editorial-shadow border border-outline-variant/10">
        <form className="space-y-6" onSubmit={form.handleSubmit(handleSignUp)}>
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
            <Button
              type="submit"
              size="lg"
              className="w-full p-5"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "Creating account..."
                : "Create Account"}
            </Button>
          </div>
          {form.formState.errors.root?.message && (
            <FieldError errors={[form.formState.errors.root]} />
          )}
        </form>

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

function getSignUpErrorMessage(error: unknown) {
  if (!(error instanceof Error)) {
    return "Unable to create account. Please try again.";
  }

  switch (error.name) {
    case "UsernameExistsException":
      return "An account already exists for this email address.";
    case "InvalidPasswordException":
      return "Password does not meet the required policy.";
    case "InvalidParameterException":
      return "Please check your signup details and try again.";
    case "LimitExceededException":
      return "Too many attempts. Please wait a moment and try again.";
    default:
      return error.message || "Unable to create account. Please try again.";
  }
}

export default Page;
