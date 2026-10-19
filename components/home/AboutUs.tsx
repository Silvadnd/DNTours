import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";

const AboutUs = () => {
    return (
        <section id="about" className="py-20 md:py-28 bg-[#F8FAFC] relative overflow-hidden scroll-mt-20 border-t border-slate-200/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Image */}
                    <div className="relative h-100 md:h-140 rounded-3xl overflow-hidden shadow-xl group border border-slate-200/80">
                        <Image
                            src="/images/ui/about.webp"
                            alt="About DN Tours Ahungalla - Private Tour Guide and Chauffeur Services"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority={false}
                            quality={85}
                        />
                        {/* Premium Glassmorphism Stats Badge */}
                        <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-md bg-white/20 backdrop-blur-xl p-5 sm:p-6 rounded-2xl shadow-2xl border border-white/30 text-white">
                            <div className="flex items-center gap-6 sm:gap-8">
                                <div>
                                    <p className="text-2xl sm:text-3xl font-extrabold font-heading text-white leading-none mb-1 drop-shadow-sm">5+</p>
                                    <p className="text-[11px] sm:text-xs text-white/90 uppercase tracking-wider font-bold">Years Exp</p>
                                </div>
                                <div className="border-l border-white/30 pl-6 sm:pl-8">
                                    <p className="text-2xl sm:text-3xl font-extrabold font-heading text-white leading-none mb-1 drop-shadow-sm">1k+</p>
                                    <p className="text-[11px] sm:text-xs text-white/90 uppercase tracking-wider font-bold">Happy Travelers</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D9488]/10 text-[#0D9488] text-xs font-bold uppercase tracking-widest">
                                About DN Tours
                            </div>
                            <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#0F172A] leading-tight">
                                Experience Sri Lanka With <span className="text-[#FF6A2A]">Authentic Local Hospitality</span>
                            </h2>
                        </div>

                        <p className="text-slate-600 font-body text-base md:text-lg leading-relaxed">
                            At DN Tours, we don&apos;t just guide you we welcome you to the heart of Sri Lanka.
                            From the misty tea estates of Ella and Nuwara Eliya to the golden beaches of Ahungalla and Bentota,
                            our mission is to show you the island&apos;s hidden gems with the warmth of genuine Sri Lankan hospitality.
                        </p>
                        <p className="text-slate-600 font-body text-base md:text-lg leading-relaxed">
                            Whether you seek wildlife safaris in Udawalawe, UNESCO World Heritage temples, or relaxing coastal transfers,
                            our private chauffeur services ensure you travel safely and at your own leisurely pace.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <Link href="/contact">
                                <Button variant="primary">Start Your Journey</Button>
                            </Link>
                            <Link href="/services">
                                <Button variant="outline">Our Services</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
