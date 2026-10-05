import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={`${className} cursor-pointer rounded-xl bg-amber-600 px-4 py-2`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
