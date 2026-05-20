interface LoadingProps {
  label?: string;
  className?: string;
}

function Loading({ label = "Loading...", className = "" }: LoadingProps) {
  return (
    <div
      role="status"
      className={`flex h-full w-full items-center justify-center gap-3 text-sm font-medium text-muted-foreground ${className}`}
    >
      <span className="size-5 animate-spin rounded-full border-2 border-muted border-t-primary" />
      <span>{label}</span>
    </div>
  );
}

export default Loading;
