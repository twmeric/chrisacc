import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  children: ReactNode;
  variant?: "gold" | "outline-white" | "outline-dark" | "navy";
  size?: "md" | "lg";
  className?: string;
  onClick?: () => void;
}

export default function Button({
  href,
  children,
  variant = "gold",
  size = "md",
  className = "",
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold transition-all duration-300 tracking-wide";

  const sizes = {
    md: "px-7 py-3 text-[15px]",
    lg: "px-10 py-4 text-base",
  };

  const variants = {
    gold:
      "bg-brand-gold text-brand-navy shadow-[0_4px_14px_rgba(201,162,39,0.35)] hover:-translate-y-0.5 hover:bg-brand-gold-light hover:shadow-[0_6px_20px_rgba(201,162,39,0.45)]",
    "outline-white":
      "border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-brand-navy hover:border-white",
    "outline-dark":
      "border border-brand-navy/30 bg-transparent text-brand-navy hover:bg-brand-navy hover:text-white",
    navy:
      "bg-brand-navy text-white shadow-[0_4px_14px_rgba(26,58,92,0.35)] hover:-translate-y-0.5 hover:bg-brand-navy-light hover:shadow-[0_6px_20px_rgba(26,58,92,0.45)]",
  };

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
