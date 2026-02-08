export function Logo({ className = "size-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shield shape */}
      <path
        d="M16 2L4 7v9c0 7.73 5.12 14.48 12 16 6.88-1.52 12-8.27 12-16V7L16 2z"
        fill="currentColor"
        className="text-foreground"
      />
      {/* Inner Q */}
      <path
        d="M16 8a7 7 0 1 0 3.5 13.06l1.5 1.5 1.8-1.8-1.3-1.3A7 7 0 0 0 16 8zm0 2.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z"
        fill="currentColor"
        className="text-primary"
      />
    </svg>
  );
}
