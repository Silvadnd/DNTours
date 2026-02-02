"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "User Memory", href: "/memory" },
    { name: "Explore Places", href: "/explore" },
    { name: "Our Story", href: "/story" },
    { name: "Contact Us", href: "/contact" },
];

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
                        ? "bg-dn-navy/10 border-white/20 py-4"
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
                        className="md:hidden text-white p-1"
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Toggle menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-0 z-[60] bg-dn-navy/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8"
                    >
                        <button
                            className="absolute top-8 right-8 text-white bg-white/10 p-2 rounded-full"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={clsx(
                                    "text-2xl font-bold transition-colors hover:text-dn-orange",
                                    pathname === link.href ? "text-dn-orange" : "text-white"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
