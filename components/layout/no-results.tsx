export const NoResults = () => {
  return (
    <div className="grid min-h-[25rem] place-items-center xl:min-h-[35rem]">
      <p className="flex flex-col items-center justify-center gap-2 tracking-tight">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-foreground"
        >
          <path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" />
          <path d="M4 6h.01" />
          <path d="M2.29 9.62A10 10 0 1 0 21.31 8.35" />
          <path d="M16.24 7.76A6 6 0 1 0 8.23 16.67" />
          <path d="M12 18h.01" />
          <path d="M17.99 11.66A6 6 0 0 1 15.77 16.67" />
          <circle cx="12" cy="12" r="2" />
          <path d="m13.41 10.59 5.66-5.66" />
        </svg>
        <div className="space-y-1 text-center">
          <div className="font-domine text-lg font-medium">No results found</div>
          <div className="text-sm text-muted-foreground">
            We couldn't find what you were looking for.
          </div>
        </div>
      </p>
    </div>
  )
}
