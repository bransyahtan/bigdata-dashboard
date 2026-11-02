import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "secondary" | "success" | "warning" | "danger" | "outline";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = "default", children, className, ...props }) => {
  const variantStyles: Record<BadgeVariant, string> = {
    default: "bg-zinc-900 text-white border border-zinc-900",
    secondary: "bg-zinc-100 text-zinc-700 border border-zinc-200",
    success: "bg-emerald-50 text-emerald-800 border border-emerald-200",
    warning: "bg-amber-50 text-amber-800 border border-amber-200",
    danger: "bg-rose-50 text-rose-800 border border-rose-200",
    outline: "border border-zinc-200 text-zinc-600 bg-white",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium tracking-wide uppercase font-mono",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
