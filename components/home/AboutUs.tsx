import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";

const AboutUs = () => {
    return (
        <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left Image */}
                <div className="relative h-100 md:h-150 rounded-3xl overflow-hidden shadow-2xl group">
                    <Image
                        src="/images/ui/about.WebP"
                        alt="About DN Tours"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority={false}
                        quality={85}
                    />
                    {/* Glass card overlay */}
                    <div className="absolute bottom-6 left-6 right-6 glass p-6 rounded-2xl">
                        <div className="flex gap-4 text-white">
                            <div>
                                <p className="text-2xl font-bold font-heading">5+</p>
                                <p className="text-xs text-gray-200 uppercase tracking-widest">Years Exp</p>
                            </div>
                            <div className="w-px bg-white/30"></div>
                            <div>
                                <p className="text-2xl font-bold font-heading">1k+</p>
                                <p className="text-xs text-gray-200 uppercase tracking-widest">Happy Travelers</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Content */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h4 className="text-dn-orange font-bold uppercase tracking-widest text-sm">About Us</h4>
                        <h2 className="font-heading font-bold text-4xl md:text-5xl text-dn-navy leading-tight">
                            Experience Sri Lanka Like Never Before
                        </h2>
                    </div>

                    <p className="text-gray-600 font-body text-lg leading-relaxed">
                        At DN Tours, we don&apos;t just guide you, We take you on a journey through the heart of Sri Lanka.
                        From the misty mountains of Ella to the pristine beaches of Mirissa, our mission is to show you
                        the island&apos;s hidden gems with the warmth of true Sri Lankan hospitality.
                    </p>
                    <p className="text-gray-600 font-body text-lg leading-relaxed">
                        Whether you seek adventure, relaxation or cultural immersion, our personalized itineraries
                        are designed to leave you with stories to tell for a lifetime. We handle the details, so you can focus on the memories.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link href="/contact">
                            <Button variant="primary">Start Your Journey</Button>
                        </Link>
                        <Link href="/services">
                            <Button variant="outline">Our Services</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
