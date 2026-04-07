function AuthRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full h-screen ">
      <BackgroundDecoration />
      <div className="flex-1 flex items-center justify-center">{children}</div>
    </div>
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
export default AuthRootLayout;
