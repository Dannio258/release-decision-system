import type { InputHTMLAttributes } from "react";

type SeachBarProps = InputHTMLAttributes<HTMLInputElement>;

function SearchBar({ className, ...props }: SeachBarProps) {
  return (
    <>
      <input
        type="text"
        className={`${className} rounded-xl border px-4 py-2 outline-none`}
        {...props}
        placeholder="Search by ID"
      />
    </>
  );
}
export default SearchBar;
