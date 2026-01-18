import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const variantClass = `btn-${variant}`;

  return (
    <button className={`btn ${variantClass} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
