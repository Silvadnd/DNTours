import React from "react";

interface SwipeHandMarkProps {
    className?: string;
    label?: string;
    size?: number;
    strokeWidth?: number;
    color?: string;
}

export const SwipeHandMark: React.FC<SwipeHandMarkProps> = ({
    className = "",
    label,
    size = 56,
    strokeWidth = 3.5,
    color = "white",
}) => {
    return (
        <div className={`inline-flex flex-col items-center select-none bg-transparent pointer-events-none ${className}`}>
            {/* Animated Hand Gesture Graphic matching user illustration */}
            <div className="relative animate-swipe-hand">
                <svg
                    width={size}
                    height={size * 1.08}
                    viewBox="0 0 100 108"
                    fill="none"
                    stroke={color}
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.95))" }}
                >
                    {/* Top Left Arrow (pointing left) */}
                    <path
                        d="M26 11H12M12 11L18 5M12 11L18 17"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Touch Ripple / Contact Arc above fingertip matching reference */}
                    <path
                        d="M33 16C33 9.5 37 5 42 5C47 5 51 9.5 51 16"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-ripple-touch"
                    />

                    {/* Top Right Arrow (pointing right) */}
                    <path
                        d="M58 11H72M72 11L66 5M72 11L66 17"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Hand Outline with Index Finger Extended */}
                    {/* Index finger pointing straight up touching the contact circle */}
                    <path
                        d="M37 40V19C37 16.2386 39.2386 14 42 14C44.7614 14 47 16.2386 47 19V38"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Middle finger curled */}
                    <path
                        d="M47 31C47 28.7909 48.7909 27 51 27C53.2091 27 55 28.7909 55 31V41"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Ring finger curled */}
                    <path
                        d="M55 35C55 32.7909 56.7909 31 59 31C61.2091 31 63 32.7909 63 35V45"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Pinky finger curled */}
                    <path
                        d="M63 39C63 36.7909 64.7909 35 67 35C69.2091 35 71 36.7909 71 39V56C71 69.2548 60.2548 80 47 80C39.5 80 32.8 76.5 28.5 71"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Thumb on left side */}
                    <path
                        d="M28.5 71C25.5 67 23 60.5 24 53C24.5 49 27 46 31 46C34.5 46 36.5 48.5 37 53V40"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {/* Label below hand matching user illustration */}
            {label && (
                <span className="text-[10px] font-extrabold tracking-widest text-[#0D9488] uppercase mt-1 font-heading">
                    {label}
                </span>
            )}
        </div>
    );
};

export default SwipeHandMark;
