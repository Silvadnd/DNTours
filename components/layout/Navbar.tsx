"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Places", href: "/#explore-places" },
    { name: "Services", href: "/services" },
    { name: "Memories", href: "/memory" },
    { name: "Our Story", href: "/story" },
    { name: "Contact Us", href: "/contact" },
];

const menuVariants: Variants = {
    closed: {
        opacity: 0,
        y: "-100%",
        transition: {
            duration: 0.3,
            ease: "easeInOut",
        },
    },
    open: {
        opacity: 1,
        y: "0%",
        transition: {
            duration: 0.35,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren: 0.05,
        },
    },
};

const itemVariants: Variants = {
    closed: { opacity: 0, y: 15 },
    open: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.25, ease: "easeOut" },
    },
};

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent body scrolling when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [mobileMenuOpen]);

    return (
        <>
            <nav
                className={clsx(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center",
                    isScrolled ? "pt-4" : "pt-6"
                )}
            >
                <div className={clsx(
                    "rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300 backdrop-blur-md border shadow-lg",
                    "w-[90%] max-w-7xl",
                    isScrolled
                        ? "bg-dn-navy/90 border-white/20 py-3.5"
                        : "bg-dn-navy/80 border-dn-ocean/30 py-3"
                )}>
                    {/* Logo */}
                    <Link href="/" className="flex items-center shrink-0">
                        <Image src="/images/logo/DNlogo.png" alt="DN Tours" width={200} height={90} className="h-8 md:h-10 w-auto" priority />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1 lg:space-x-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={clsx(
                                    "text-sm font-medium transition-colors hover:text-dn-orange px-3 py-1 rounded-full",
                                    pathname === link.href ? "text-dn-orange bg-white/10" : "text-white"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Open mobile menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </nav>

            {/* Clean Minimal Full-Screen Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="fixed inset-0 z-[100] bg-dn-navy/98 backdrop-blur-2xl text-white flex flex-col justify-between px-6 py-8"
                    >
                        {/* Top Header Bar */}
                        <div className="flex items-center justify-between w-full max-w-md mx-auto border-b border-white/10 pb-5">
                            <Link
                                href="/"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center"
                            >
                                <Image
                                    src="/images/logo/DNlogo.png"
                                    alt="DN Tours Logo"
                                    width={160}
                                    height={60}
                                    className="h-8 w-auto"
                                    priority
                                />
                            </Link>

                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                aria-label="Close menu"
                                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <div className="w-full max-w-md mx-auto my-auto py-6">
                            <ul className="flex flex-col space-y-4">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <motion.li key={link.name} variants={itemVariants}>
                                            <Link
                                                href={link.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={clsx(
                                                    "block py-3 px-4 rounded-xl text-xl font-bold tracking-tight transition-all duration-200",
                                                    isActive
                                                        ? "text-dn-orange bg-white/10"
                                                        : "text-white/90 hover:text-dn-orange hover:bg-white/5"
                                                )}
                                            >
                                                {link.name}
                                            </Link>
                                        </motion.li>
                                    );
                                })}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;

