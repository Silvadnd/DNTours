"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, Phone, MessageCircle, MapPin } from "lucide-react";
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
            duration: 0.35,
            ease: "easeInOut",
        },
    },
    open: {
        opacity: 1,
        y: "0%",
        transition: {
            duration: 0.4,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren: 0.06,
        },
    },
};

const itemVariants: Variants = {
    closed: { opacity: 0, y: 16 },
    open: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: "easeOut" },
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

    // Prevent body scrolling when mobile full-screen menu is open
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

            {/* Standard Interactive Full-Screen Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="fixed inset-0 z-[100] bg-slate-950/98 backdrop-blur-2xl text-white flex flex-col justify-between overflow-y-auto px-6 py-8"
                    >
                        {/* Decorative Background Glows */}
                        <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 bg-[#0D9488]/20 rounded-full blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 bg-dn-orange/15 rounded-full blur-3xl" />

                        {/* Top Header Bar */}
                        <div className="flex items-center justify-between w-full max-w-lg mx-auto relative z-10 border-b border-white/10 pb-5">
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
                                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all active:scale-95 flex items-center justify-center"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Navigation Links with Stagger Animation */}
                        <div className="w-full max-w-lg mx-auto my-auto py-8 relative z-10">
                            <ul className="space-y-3">
                                {navLinks.map((link, idx) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <motion.li key={link.name} variants={itemVariants}>
                                            <Link
                                                href={link.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={clsx(
                                                    "group flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 border",
                                                    isActive
                                                        ? "bg-white/10 border-dn-orange/40 text-dn-orange font-bold shadow-lg shadow-black/20"
                                                        : "bg-white/5 border-transparent text-slate-100 hover:bg-white/10 hover:border-white/10"
                                                )}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <span className={clsx(
                                                        "text-xs font-mono font-semibold px-2 py-0.5 rounded-md",
                                                        isActive
                                                            ? "bg-dn-orange/20 text-dn-orange"
                                                            : "bg-white/5 text-slate-400 group-hover:text-white"
                                                    )}>
                                                        0{idx + 1}
                                                    </span>
                                                    <span className="text-xl font-bold tracking-tight">
                                                        {link.name}
                                                    </span>
                                                </div>
                                                <ChevronRight
                                                    className={clsx(
                                                        "w-5 h-5 transition-transform duration-200",
                                                        isActive
                                                            ? "text-dn-orange translate-x-0"
                                                            : "text-slate-400 -translate-x-1 group-hover:translate-x-0 group-hover:text-white"
                                                    )}
                                                />
                                            </Link>
                                        </motion.li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Interactive Bottom Actions & Contact Details */}
                        <div className="w-full max-w-lg mx-auto relative z-10 pt-4 border-t border-white/10 space-y-3">
                            <a
                                href="https://api.whatsapp.com/send/?phone=94779452473&text=Hi%20DN%20Tours!%20I'd%20like%20to%20plan%20a%20tour."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-bold text-sm shadow-lg shadow-emerald-950/40 transition-all"
                            >
                                <MessageCircle className="w-5 h-5" />
                                <span>Book on WhatsApp</span>
                            </a>

                            <div className="flex items-center justify-between px-2 pt-1 text-xs text-slate-400">
                                <a
                                    href="tel:+94779452473"
                                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                                >
                                    <Phone className="w-3.5 h-3.5 text-dn-orange" />
                                    <span>+94 77 945 2473</span>
                                </a>

                                <div className="flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-[#0D9488]" />
                                    <span>Ahungalla, Sri Lanka</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;

