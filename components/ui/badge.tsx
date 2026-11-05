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
    default: "bg-zinc-900 text-zinc-50 border border-zinc-800 shadow-2xs",
    secondary: "bg-zinc-100 text-zinc-700 border border-zinc-200/70",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200/80",
    warning: "bg-amber-50 text-amber-700 border border-amber-200/80",
    danger: "bg-rose-50 text-rose-700 border border-rose-200/80",
    outline: "border border-zinc-200 text-zinc-600 bg-white shadow-2xs",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-normal whitespace-nowrap shrink-0 transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
