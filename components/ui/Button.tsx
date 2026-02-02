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
        primary: "bg-dn-orange text-white hover:bg-dn-orange-soft shadow-lg hover:shadow-dn-orange/30",
        secondary: "bg-dn-ocean text-white hover:bg-opacity-90 shadow-md",
        outline: "border-2 border-dn-orange text-dn-orange hover:bg-dn-orange hover:text-white",
        ghost: "bg-transparent text-dn-text hover:bg-black/5 hover:text-dn-ocean",
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
