import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={`${className} cursor-pointer rounded-xl bg-action p-4 font-medium -strong transition hover:bg-action-hover`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
