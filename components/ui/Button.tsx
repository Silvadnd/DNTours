import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    className?: string;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    variant = "primary",
    size = "md",
    className,
    children,
    ...props
}) => {
    const baseStyles = "rounded-full transition-all duration-300 font-medium inline-flex items-center justify-center cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-[#FF6A2A] text-white hover:bg-[#FF8A4C] shadow-md hover:shadow-[#FF6A2A]/30",
        secondary: "bg-[#0D9488] text-white hover:bg-[#0F766E] shadow-md hover:shadow-teal-600/20",
        outline: "border-2 border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488] hover:text-white",
        ghost: "bg-transparent text-[#0F172A] hover:bg-slate-100 hover:text-[#0D9488]",
    };

    const sizes = {
        sm: "px-4 py-1.5 text-sm",
        md: "px-6 py-2.5 text-base",
        lg: "px-8 py-3.5 text-lg",
    };

    return (
        <button
            className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
