"use client";
import React from "react";
import Image from "next/image";

const services = [
    {
        title: "Personalized Itinerary Planning",
        desc: "We don't believe in one-size-fits-all. Our experts work with you to craft a journey that matches your interests, pace, and budget perfectly.",
        image: "/images/ui/50.jpg"
    },
    {
        title: "Transportation Arrangements",
        desc: "Travel in comfort and safety. We provide modern, air-conditioned vehicles with experienced, English-speaking driver-guides.",
        image: "/images/ui/51.jpg"
    },
    {
        title: "Excursions to Popular Attractions",
        desc: "From the cultural triangle to the wild coasts, we organize seamless visits to Sri Lanka's most iconic sites with skip-the-line access where possible.",
        image: "/images/ui/27.jpeg"
    }
];

export default function ServicesPage() {
    return (
        <div className="bg-white min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="font-heading font-bold text-4xl md:text-6xl text-dn-navy">Our Services</h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto font-body">Everything you need for a seamless Sri Lankan adventure, curated with care.</p>
                </div>

                <div className="space-y-24">
                    {services.map((service, index) => (
                        <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center group`}>
                            <div className="w-full md:w-1/2 relative h-75 md:h-100 rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                            </div>
                            <div className="w-full md:w-1/2 space-y-6">
                                <div className="w-16 h-2 bg-dn-orange rounded-full"></div>
                                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dn-navy">{service.title}</h2>
                                <p className="font-body text-lg text-gray-600 leading-relaxed">{service.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
