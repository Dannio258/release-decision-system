import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={`${className} cursor-pointer rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-500`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
