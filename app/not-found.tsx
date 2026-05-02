// app/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-on-surface">Page not found</h1>
      <p className="mt-3 max-w-md text-on-surface-variant">
        The page you are looking for does not exist or may have been moved.
      </p>

      <Button asChild className="mt-6">
        <Link href="/map">Go home</Link>
      </Button>
    </main>
  );
}
