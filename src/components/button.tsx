interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-full transition-all active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
