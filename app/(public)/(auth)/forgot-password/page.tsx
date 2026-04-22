import Link from "next/link";
import { Mail, ArrowRight, ArrowLeft, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-md z-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface-container mb-6">
          <Leaf className="text-primary w-10 h-10" />
        </div>
        <h2 className="text-3xl font-headline font-extrabold tracking-tight text-primary">
          Clean Up Sikkim
        </h2>
      </div>
      <div className="bg-surface-container-lowest p-8 md:p-10 rounded-xl shadow-[0_20px_40px_rgba(15,82,56,0.06)] border border-outline-variant/10">
        <div className="mb-8">
          <h1 className="text-2xl font-headline font-bold text-on-surface mb-2">
            Forgot Password?
          </h1>
          <p className="text-on-surface-variant leading-relaxed">
            No worries, we'll send you reset instructions.
          </p>
        </div>
        <form className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-on-surface-variant px-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="text-neutral text-outline text-xl" />
              </div>
              <Input
                className="w-full pl-11 pr-4 py-3.5 bg-surface-container-low border-none rounded-xl text-on-surface focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline/60"
                id="email"
                name="email"
                placeholder="steward@example.com"
                type="email"
              />
            </div>
          </div>
          <Button
            size={"xl"}
            className="w-full signature-gradient text-on-primary font-semibold 
            py-4 rounded-xl shadow-lg hover:opacity-90 active:scale-[0.98] 
            transition-all duration-200 flex items-center justify-center gap-2 group"
            type="submit"
          >
            <span>Send Reset Link</span>
            <ArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
        <div className="mt-8 text-center">
          <Link
            className="inline-flex items-center 
            gap-2 text-tertiary font-semibold hover:opacity-80 transition-opacity group"
            href="/login"
          >
            <ArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
      {/* <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="bg-surface-container-low/50 p-4 rounded-xl flex items-start gap-3">
          <span className="material-symbols-outlined text-primary text-xl">
            security
          </span>
          <p className="text-xs text-on-surface-variant leading-tight">
            Secure 256-bit encrypted recovery process.
          </p>
        </div>
        <div className="bg-surface-container-low/50 p-4 rounded-xl flex items-start gap-3">
          <span className="material-symbols-outlined text-primary text-xl">
            support_agent
          </span>
          <p className="text-xs text-on-surface-variant leading-tight">
            Need help? Reach out to our steward support.
          </p>
        </div>
      </div> */}
    </div>
  );
}

export default ForgotPasswordPage;
