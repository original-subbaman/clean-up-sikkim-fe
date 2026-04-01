import Footer from "@/components/Footer";

function AuthRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full h-screen ">
      <div className="flex-1 flex items-center justify-center">{children}</div>
    </div>
  );
}

export default AuthRootLayout;
