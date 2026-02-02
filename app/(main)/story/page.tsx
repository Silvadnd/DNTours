"use client";
import React from "react";
import Image from "next/image";
import CountUp from "react-countup";
import { useInView } from "framer-motion";

const stats = [
    { label: "Years of Experience", value: 5, suffix: "+" },
    { label: "Travelers Guided", value: 1000, suffix: "+" },
    { label: "Tours Completed", value: 450, suffix: "+" },
    { label: "Destinations Covered", value: 50, suffix: "+" },
];

export default function StoryPage() {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section for Story */}
            <div className="relative h-[50vh] w-full flex items-center justify-center">
                <Image src="/images/ui/27.jpeg" alt="Our Story" fill className="object-cover" />
                <div className="absolute inset-0 bg-dn-navy/70" />
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="font-heading font-bold text-5xl md:text-6xl mb-4">Our Story</h1>
                    <p className="font-body text-xl max-w-2xl mx-auto">From humble beginnings to creating unforgettable memories.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
                {/* The Origin */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="font-heading font-bold text-3xl md:text-4xl text-dn-navy">Born from a Passion for <span className="text-dn-orange">Discovery</span></h2>
                        <p className="font-body text-gray-600 leading-relaxed">
                            DN Tours started with a simple idea: to show the world the real Sri Lanka. Not just the tourist spots, but the heart and soul of the island.
                            Founded by travel enthusiasts who grew up exploring these mountains and beaches, we wanted to share that same sense of wonder with you.
                        </p>
                        <p className="font-body text-gray-600 leading-relaxed">
                            We believe that travel is more than just sightseeing; it&apos;s about connection. Connecting with nature, with culture, and with people.
                            That&apos;s why every tour we plan is personal, every guide we hire is passionate, and every recommendation we make is genuine.
                        </p>
                    </div>
                    <div className="relative h-100 rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                        <Image src="/images/ui/59.jpg" alt="The Beginning" fill className="object-cover" />
                    </div>
                </div>

                {/* Stats Counter */}
                <div ref={ref} className="bg-dn-navy rounded-[3rem] p-12 md:p-20 text-white shadow-2xl relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10"
                        style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center relative z-10">
                        {stats.map((stat, index) => (
                            <div key={index} className="space-y-2">
                                <p className="text-4xl md:text-6xl font-bold font-heading text-dn-orange">
                                    {isInView ? <CountUp end={stat.value} duration={2.5} /> : 0}{stat.suffix}
                                </p>
                                <p className="text-gray-300 font-medium uppercase tracking-wider text-sm md:text-base">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mission */}
                <div className="text-center max-w-4xl mx-auto space-y-8">
                    <h2 className="font-heading font-bold text-3xl md:text-4xl text-dn-navy">Our Mission</h2>
                    <p className="text-xl md:text-2xl font-body text-gray-500 italic">
                        &quot; To provide safe, unforgettable, and authentic Sri Lankan travel experiences that bridge cultures and create lifelong memories.&quot;
                    </p>
                </div>
            </div>
        </div>
    );
}
