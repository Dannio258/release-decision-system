import type { InputHTMLAttributes } from "react";

type SeachBarProps = InputHTMLAttributes<HTMLInputElement>;

function SearchBar({ className, ...props }: SeachBarProps) {
  return (
    <>
      <input
        type="text"
        className={`${className} rounded-xl border border-outline bg-panel px-4 py-3  transition outline-none placeholder:text-muted focus:border-accent`}
        {...props}
        placeholder="Search by ID"
      />
    </>
  );
}
export default SearchBar;
