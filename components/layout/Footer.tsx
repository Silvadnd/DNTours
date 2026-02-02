/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, Phone, MapPin, Send, ArrowRight, ExternalLink } from "lucide-react";

const Footer = () => {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setTimeout(() => {
                setSubscribed(false);
                setEmail("");
            }, 3000);
        }
    };

    return (
        <footer className="relative bg-linear-to-br from-dn-navy via-dn-navy to-dn-ocean text-white pt-9 pb-5 overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-dn-orange/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-dn-ocean/20 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 max-w-5xl mx-auto">
                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <Image src="/images/logo/DNlogo.png" alt="DN Tours" width={180} height={90} className="h-25 w-auto mb-6 hover:scale-105 transition-transform mx-auto md:mx-0" />
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Your gateway to authentic Sri Lankan experiences. Creating unforgettable memories since day one.
                        </p>
                        <div className="flex gap-3 justify-center md:justify-start">
                            {[
                                { Icon: Instagram, href: "https://www.instagram.com/dn_tours_ahungalla?igsh=dGxwZG5laTZwNDF5&utm_source=qr", color: "hover:bg-pink-600" },
                                { Icon: Facebook, href: "https://web.facebook.com/profile.php?id=100092422871408&mibextid=wwXIfr&rdid=x10gNiEGd7mcs8JA&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F1EPR2Vbd6G%2F%3Fmibextid%3DwwXIfr%26_rdc%3D1%26_rdr#", color: "hover:bg-blue-600" }
                            ].map(({ Icon, href, color }, idx) => (
                                <a
                                    key={idx}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-all ${color}`}
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                            <a
                                href="https://www.tiktok.com/@dntoursahungalla?_r=1&_t=ZS-93MkuZFs9rx"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-all hover:bg-black"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                            </a>
                            <a
                                href="https://api.whatsapp.com/send/?phone=94779452473&text&type=phone_number&app_absent=0"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-all hover:bg-green-500"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center md:text-left">
                        <h3 className="font-heading font-bold text-lg mb-6 text-dn-orange">Quick Links</h3>
                        <ul className="space-y-3">
                            {[
                                { name: "Home", href: "/" },
                                { name: "Services", href: "/services" },
                                { name: "Explore Places", href: "/explore" },
                                { name: "Our Story", href: "/story" }
                            ].map((link) => (
                                <li key={link.name} className="flex justify-center md:justify-start">
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-dn-orange transition-colors flex items-center gap-2 group"
                                    >
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="text-center md:text-left">
                        <h3 className="font-heading font-bold text-lg mb-6 text-dn-orange">Get In Touch</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-300 hover:text-white transition-colors group justify-center md:justify-start">
                                <Mail size={18} className="mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                                <a href="mailto:da.dinethnawanjana@gmail.com" className="break-all">da.dinethnawanjana@gmail.com</a>
                            </li>
                            <li className="flex items-start gap-3 text-gray-300 hover:text-white transition-colors group justify-center md:justify-start">
                                <Phone size={18} className="mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                                <a href="tel:+94779452473">+94 77 945 2473</a>
                            </li>
                            <li className="flex items-start gap-3 text-gray-300 hover:text-white transition-colors group justify-center md:justify-start">
                                <MapPin size={18} className="mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                                <span>Galwehera, Ahungalla,<br />Ahungalla 80562</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} DN Tours. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-dn-orange transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-dn-orange transition-colors">Terms of Service</Link>
                    </div>
                    <p className="mt-4 md:mt-0 flex items-center gap-2">
                        Crafted with by <a href="https://wa.me/qr/LIXA7JMHEJ4WA1" target="_blank" rel="noopener noreferrer" className="text-dn-orange hover:underline font-bold flex items-center gap-1">LUMINO <ExternalLink size={14} /></a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
