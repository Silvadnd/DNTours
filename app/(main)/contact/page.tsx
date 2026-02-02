"use client";
import React from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-125 w-full overflow-hidden">
                <Image 
                    src="/images/ui/50.jpg" 
                    alt="Contact Us" 
                    fill 
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/60"></div>
                
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                    <h1 className="font-heading font-bold text-5xl md:text-7xl text-white mb-6 drop-shadow-2xl">
                        Get in Touch
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg">
                        We&apos;d love to hear from you. Let&apos;s start planning your dream vacation.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Contact Info */}
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <div className="flex items-center gap-6 p-6 rounded-2xl bg-dn-bg hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-dn-orange/10 rounded-full flex items-center justify-center text-dn-orange">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="font-bold text-lg text-dn-navy">Email Us</p>
                                    <a href="mailto:info@dntours.lk" className="text-gray-600 hover:text-dn-orange transition-colors">info@dntours.lk</a>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 p-6 rounded-2xl bg-dn-bg hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-dn-orange/10 rounded-full flex items-center justify-center text-dn-orange">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p className="font-bold text-lg text-dn-navy">Call Us</p>
                                    <a href="tel:+94771234567" className="text-gray-600 hover:text-dn-orange transition-colors">+94 77 123 4567</a>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 p-6 rounded-2xl bg-dn-bg hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-dn-orange/10 rounded-full flex items-center justify-center text-dn-orange">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="font-bold text-lg text-dn-navy">Visit Us</p>
                                    <p className="text-gray-600">No. 123, Galle Road, Colombo 03, Sri Lanka</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-xl mb-6 text-dn-navy">Follow Our Journey</h3>
                            <div className="flex gap-4">
                                {[
                                    { Icon: Instagram, href: "https://www.instagram.com/dn_tours_ahungalla?igsh=dGxwZG5laTZwNDF5&utm_source=qr", color: "hover:bg-pink-600", title: "Instagram" },
                                    { Icon: Facebook, href: "https://web.facebook.com/profile.php?id=100092422871408&mibextid=wwXIfr&rdid=x10gNiEGd7mcs8JA&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F1EPR2Vbd6G%2F%3Fmibextid%3DwwXIfr%26_rdc%3D1%26_rdr#", color: "hover:bg-blue-600", title: "Facebook" },
                                ].map(({ Icon, href, color, title }, idx) => (
                                    <a 
                                        key={idx} 
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={title}
                                        aria-label={title}
                                        className={`w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-white hover:border-transparent transition-all hover:scale-110 ${color}`}
                                    >
                                        <Icon size={20} />
                                    </a>
                                ))}
                                
                                {/* YouTube */}
                                <a 
                                    href="https://www.youtube.com/@dntoursahungalla"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="YouTube"
                                    aria-label="YouTube"
                                    className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-white hover:border-transparent hover:bg-red-600 transition-all hover:scale-110"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                    </svg>
                                </a>
                                
                                {/* TikTok */}
                                <a 
                                    href="https://www.tiktok.com/@dntoursahungalla?_r=1&_t=ZS-93MkuZFs9rx"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="TikTok"
                                    aria-label="TikTok"
                                    className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-white hover:border-transparent hover:bg-black transition-all hover:scale-110"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                                    </svg>
                                </a>
                                
                                {/* WhatsApp */}
                                <a 
                                    href="https://api.whatsapp.com/send/?phone=94779452473&text&type=phone_number&app_absent=0"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="WhatsApp"
                                    aria-label="WhatsApp"
                                    className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-white hover:border-transparent hover:bg-green-500 transition-all hover:scale-110"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-dn-bg p-8 md:p-10 rounded-3xl shadow-xl">
                        <h3 className="font-heading font-bold text-2xl mb-6 text-dn-navy">Send a Message</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">First Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-dn-orange/50 transition-all" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Last Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-dn-orange/50 transition-all" placeholder="Doe" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Email Address</label>
                                <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-dn-orange/50 transition-all" placeholder="john@example.com" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Your Message</label>
                                <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-dn-orange/50 transition-all" placeholder="Tell us about your travel plans..."></textarea>
                            </div>

                            <Button variant="primary" className="w-full py-4 text-lg shadow-dn-orange/20">Send Message</Button>
                        </form>
                    </div>
                </div>

                {/* Map Iframe */}
                <div className="mt-24 w-full h-96 rounded-3xl overflow-hidden shadow-2xl">
                    <iframe
                    src="https://maps.google.com/maps?q=DN%20Tours%20Ahungalla&z=16&output=embed"
                    width="100%"
                    height="100%"
                    className="border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="DN Tours Location"
                    ></iframe>
                </div>
            </div>
        </div>
    )
}
