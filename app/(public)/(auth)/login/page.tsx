import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Page() {
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
            <LoginWithGoogle />
          </div>
          <div className="flex items-center gap-4 mb-8">
            <div className="grow h-px bg-outline-variant/30"></div>
            <span className="text-xs font-label uppercase tracking-widest text-outline">
              or email
            </span>
            <div className="grow h-px bg-outline-variant/30"></div>
          </div>
          <form action="#" className="space-y-6" method="POST">
            <div>
              <Label
                className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2 ml-1"
                htmlFor="email"
              >
                Email address
              </Label>
              <Input
                className="w-full bg-surface-container-low border-none rounded-xl py-3.5 px-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                id="email"
                name="email"
                placeholder="steward@organic.com"
                required
                type="email"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <Label
                  className="block text-xs font-label uppercase tracking-widest text-on-surface-variant"
                  htmlFor="password"
                >
                  Password
                </Label>
                <a
                  className="text-xs font-medium text-tertiary hover:underline"
                  href="#"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                className="w-full bg-surface-container-low border-none rounded-xl py-3.5 px-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                id="password"
                name="password"
                placeholder="••••••••"
                required
                type="password"
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          <div className="mt-8 pt-8 border-t border-outline-variant/20 text-center">
            <p className="text-sm text-on-surface-variant">
              Don't have an account?
              <a
                className="text-primary font-bold hover:underline ml-1"
                href="/signup"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const LoginWithGoogle = () => {
  return (
    <button className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-surface-container-low rounded-xl font-medium text-on-surface hover:bg-surface-container-highest transition-colors duration-200">
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        ></path>
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        ></path>
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
          fill="#FBBC05"
        ></path>
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        ></path>
      </svg>
      <span>Continue with Google</span>
    </button>
  );
};

export default Page;
