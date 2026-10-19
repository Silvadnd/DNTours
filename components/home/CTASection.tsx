"use client";
import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { MessageCircle, Phone, MapPin, ShieldCheck, HeartHandshake } from "lucide-react";

const CTASection = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-[#F0F9FF] to-[#FAF8F5] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-gradient-to-br from-[#0F766E] to-[#0D9488] rounded-3xl p-8 md:p-14 border border-teal-500/30 text-center max-w-4xl mx-auto shadow-xl space-y-8 text-white">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
                        <HeartHandshake size={14} />
                        Direct Local Communication
                    </div>

                    <h2 className="font-heading font-bold text-3xl md:text-5xl text-white leading-tight">
                        Ready to Discover the Soul of <span className="text-amber-300">Sri Lanka</span>?
                    </h2>

                    <p className="text-teal-50 text-base md:text-xl font-body leading-relaxed max-w-2xl mx-auto">
                        Whether you are landing at Colombo airport, staying at an Ahungalla resort, or planning an island-wide round tour, we are here to make your journey smooth and unforgettable.
                    </p>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
                        <a
                            href="https://api.whatsapp.com/send/?phone=94779452473&text=Hello%20DN%20Tours!%20I%20would%20like%20to%20plan%20a%20private%20tour%20in%20Sri%20Lanka."
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button variant="primary" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2">
                                <MessageCircle size={20} />
                                Chat on WhatsApp (+94 77 945 2473)
                            </Button>
                        </a>
                        <Link href="/contact">
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-dn-navy"
                            >
                                Send Travel Enquiry
                            </Button>
                        </Link>
                    </div>

                    {/* Quick highlights */}
                    <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-300">
                        <div className="flex items-center justify-center gap-2">
                            <ShieldCheck size={16} className="text-dn-orange" />
                            <span>100% Private &amp; Air-Conditioned</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <MapPin size={16} className="text-dn-orange" />
                            <span>Based in Ahungalla, Sri Lanka</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <Phone size={16} className="text-dn-orange" />
                            <span>Direct Local Pricing</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
