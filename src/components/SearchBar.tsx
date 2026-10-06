import type { InputHTMLAttributes } from "react";

type SeachBarProps = InputHTMLAttributes<HTMLInputElement>;

function SearchBar({ className, ...props }: SeachBarProps) {
  return (
    <>
      <input
        type="text"
        className={`${className} rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 transition outline-none placeholder:text-slate-500 focus:border-blue-500`}
        {...props}
        placeholder="Search by ID"
      />
    </>
  );
}
export default SearchBar;
