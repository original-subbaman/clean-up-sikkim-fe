export default function Footer() {
  return (
    <footer className="w-full py-2 px-8 bg-muted text-muted-foreground border-t mt-auto">
      <div className="container mx-auto text-center text-sm">
        © {new Date().getFullYear()} Clean Up Sikkim. All rights reserved.
      </div>
    </footer>
  );
}
