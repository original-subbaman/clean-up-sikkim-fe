"use client";
import OTPInput from "@/components/common/OTPInput";
import { Button } from "@/components/ui/button";
import { confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import { ArrowLeft, ArrowRight, Leaf } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

type VerifyOtpForm = {
  otp: string[];
};

function VerifyOTPPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [resendError, setResendError] = useState<string | null>(null);
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<VerifyOtpForm>({
    defaultValues: { otp: Array(6).fill("") },
  });

  async function onSubmit(data: VerifyOtpForm) {
    if (!email) {
      setError("root", {
        message: "Missing email address. Please start signup again.",
      });
      return;
    }

    try {
      const confirmationCode = data.otp.join("");

      await confirmSignUp({
        username: email,
        confirmationCode,
      });

      router.push(`/login?email=${encodeURIComponent(email)}`);
    } catch (error) {
      setError("root", {
        message: getVerifyOtpErrorMessage(error),
      });
    }
  }

  async function handleResendCode() {
    setStatusMessage(null);
    setResendError(null);

    if (!email) {
      setResendError("Missing email address. Please start signup again.");
      return;
    }

    try {
      await resendSignUpCode({ username: email });
      setStatusMessage("A new verification code has been sent.");
    } catch (error) {
      setResendError(getVerifyOtpErrorMessage(error));
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-surface-container-lowest p-8 md:p-12 rounded-2xl shadow-[0_20px_40px_rgba(15,82,56,0.06)] relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none">
          <svg height="200" viewBox="0 0 100 100" width="200">
            <path
              className="text-primary"
              d="M50 0 L100 50 L50 100 L0 50 Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-6">
            <Leaf className="text-primary text-4xl mr-2" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight mb-3">
            Verify Your Identity
          </h1>
          <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
            We&apos;ve sent a 6-digit code to your email. Enter it below to secure
            your Clean Up Sikkim account.
          </p>
        </header>
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Controller
              name="otp"
              control={control}
              rules={{
                validate: {
                  allFilled: (value) => {
                    const allFilled = value.every(
                      (digit) => digit && digit.trim() !== "",
                    );
                    return allFilled || "Please enter all 6 digits";
                  },
                  numbersOnly: (value) => {
                    const allNumbers = value.every(
                      (digit) => !digit || /^[0-9]$/.test(digit),
                    );
                    return allNumbers || "Only numbers are allowed";
                  },
                },
              }}
              render={({ field, fieldState }) => (
                <>
                  <OTPInput value={field.value} onChange={field.onChange} />
                  {fieldState.error && (
                    <p className="text-destructive text-sm mt-2">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
            <Button
              size={"xl"}
              className="w-full py-4 px-6 
              rounded-2xl bg-linear-to-br from-primary to-primary-container text-white font-bold text-base shadow-lg shadow-primary/10 
              hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
              type="submit"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? "Verifying..." : "Verify & Continue"}</span>
              <ArrowRight className="text-xl group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            {errors.root?.message && (
              <p className="text-destructive text-sm text-center">
                {errors.root.message}
              </p>
            )}
            {statusMessage && (
              <p className="text-primary text-sm text-center">{statusMessage}</p>
            )}
            {resendError && (
              <p className="text-destructive text-sm text-center">
                {resendError}
              </p>
            )}
            <div className="text-center">
              <button
                className="text-tertiary font-semibold text-sm hover:underline underline-offset-4 decoration-2"
                type="button"
                onClick={handleResendCode}
              >
                Resend Code
              </button>
            </div>
          </div>
        </form>
        <footer className="mt-10 pt-8 border-t border-outline-variant/10 text-center">
          <Link
            className="inline-flex items-center gap-2 text-on-surface-variant font-medium text-sm hover:text-primary transition-colors group"
            href="/login"
          >
            <ArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform" />
            Back to Sign In
          </Link>
        </footer>
      </div>
    </div>
  );
}

function getVerifyOtpErrorMessage(error: unknown) {
  if (!(error instanceof Error)) {
    return "Unable to verify the code. Please try again.";
  }

  switch (error.name) {
    case "CodeMismatchException":
      return "The verification code is incorrect.";
    case "ExpiredCodeException":
      return "The verification code has expired. Please request a new one.";
    case "LimitExceededException":
      return "Too many attempts. Please wait a moment and try again.";
    case "UserNotFoundException":
      return "No account was found for this email address.";
    default:
      return error.message || "Unable to verify the code. Please try again.";
  }
}

export default VerifyOTPPage;
