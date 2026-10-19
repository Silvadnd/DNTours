import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { pageMetadata, generateOGTags, generateTwitterTags } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageMetadata.about.title,
  description: pageMetadata.about.description,
  keywords: pageMetadata.about.keywords,
  openGraph: generateOGTags("about"),
  twitter: generateTwitterTags("about"),
  alternates: {
    canonical: "https://dntoursahungalla.com/story",
  },
};

const stats = [
    { number: "5+", label: "Years of Experience" },
    { number: "1,000+", label: "Travelers Guided" },
    { number: "450+", label: "Tours Completed" },
    { number: "50+", label: "Destinations Covered" },
];

export default function StoryPage() {
    return (
        <div className="bg-[#F8FAFC] min-h-screen">
            {/* Hero Section for Story */}
            <div className="relative h-[48vh] w-full flex items-center justify-center">
                <Image src="/images/ui/42.jpg" alt="Our Story" fill className="object-cover" />
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
                <div className="relative z-10 text-center text-white px-4">
                    <span className="text-xs uppercase tracking-widest font-bold text-teal-300 bg-teal-900/40 px-4 py-1.5 rounded-full inline-block mb-3">
                        About DN Tours
                    </span>
                    <h1 className="font-heading font-bold text-4xl md:text-6xl mb-3">Our Story</h1>
                    <p className="font-body text-lg md:text-xl text-slate-100 max-w-2xl mx-auto">From humble beginnings to creating unforgettable Sri Lanka journeys.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
                {/* The Origin */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D9488]/10 text-[#0D9488] text-xs font-bold uppercase tracking-widest">
                            Our Origins
                        </div>
                        <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0F172A]">
                            Born from a Passion for <span className="text-[#FF6A2A]">Discovery</span>
                        </h2>
                        <p className="font-body text-slate-600 leading-relaxed text-base md:text-lg">
                            DN Tours started with a simple idea: to show the world the real Sri Lanka. Not just the crowded tourist spots, but the heart, soul, and hidden natural wonders of the island.
                        </p>
                        <p className="font-body text-slate-600 leading-relaxed text-base md:text-lg">
                            Founded by travel enthusiasts who grew up exploring Sri Lanka&apos;s southern coasts and central highlands, we wanted to share that same genuine warmth with every visitor who arrives in Ahungalla.
                        </p>
                    </div>
                    <div className="relative h-100 rounded-3xl overflow-hidden shadow-xl border border-slate-200/80">
                        <Image src="/images/ui/59.jpg" alt="The Beginning of DN Tours" fill className="object-cover" />
                    </div>
                </div>

                {/* Core Values & Milestones */}
                <div className="bg-white rounded-3xl p-10 md:p-14 border border-slate-200/80 shadow-sm relative overflow-hidden">
                    <div className="text-center mb-10 space-y-2">
                        <span className="text-xs uppercase tracking-widest font-bold text-[#0D9488] bg-[#0D9488]/10 px-3.5 py-1 rounded-full inline-block">
                            Our Values
                        </span>
                        <h3 className="font-heading font-bold text-2xl md:text-3xl text-[#0F172A]">
                            Proven Trust &amp; Island Expertise
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center relative z-10">
                        {stats.map((stat, index) => (
                            <div key={index} className="space-y-2 p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/70 hover:border-[#0D9488]/40 hover:shadow-md transition-all">
                                <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading text-[#0D9488]">
                                    {stat.number}
                                </p>
                                <p className="text-slate-700 font-semibold text-sm md:text-base leading-snug">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mission */}
                <div className="text-center max-w-3xl mx-auto space-y-6 p-8 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
                    <span className="text-xs uppercase tracking-widest font-bold text-[#0D9488] bg-[#0D9488]/10 px-3.5 py-1 rounded-full inline-block">
                        Our Mission
                    </span>
                    <p className="text-xl md:text-2xl font-body text-slate-700 italic leading-relaxed">
                        &quot;To provide safe, unforgettable, and authentic Sri Lankan travel experiences that bridge cultures and create lifelong memories.&quot;
                    </p>
                </div>
            </div>
        </div>
    );
}
