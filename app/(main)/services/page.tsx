import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { pageMetadata, generateOGTags, generateTwitterTags } from "@/lib/seo";
import Button from "@/components/ui/Button";
import { Car, Map, Plane, Compass, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: pageMetadata.services.title,
  description: pageMetadata.services.description,
  keywords: pageMetadata.services.keywords,
  openGraph: generateOGTags("services"),
  twitter: generateTwitterTags("services"),
  alternates: {
    canonical: "https://dntoursahungalla.com/services",
  },
};

const services = [
    {
        title: "Personalized Itinerary Planning",
        desc: "We don't believe in one-size-fits-all travel. Our local team works with you to craft a journey that matches your pace, interests, and schedule across Sri Lanka.",
        image: "/images/ui/50.jpg",
        icon: Compass,
    },
    {
        title: "Comfortable Private Chauffeur & Transfers",
        desc: "Travel in comfort and safety. We provide modern, air-conditioned vehicles with experienced, English-speaking driver-guides for round-trips and city-to-city transfers.",
        image: "/images/ui/51.jpg",
        icon: Car,
    },
    {
        title: "Bandaranaike Airport (BIA) Transfers",
        desc: "Punctual, stress-free airport pickup and drop-off service connecting Bandaranaike International Airport (CMB) with Ahungalla, Bentota, Galle, and southern coastal hotels.",
        image: "/images/ui/62.png",
        icon: Plane,
    },
    {
        title: "Excursions to Iconic Attractions & Safaris",
        desc: "From UNESCO World Heritage sites (Sigiriya, Galle Fort, Kandy) to thrilling wildlife safaris in Yala and Udawalawe, enjoy seamless day excursions.",
        image: "/images/ui/200.jpeg",
        icon: Map,
    }
];

export default function ServicesPage() {
    return (
        <div className="bg-[#F8FAFC] min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-xs uppercase tracking-widest font-bold text-[#0D9488] bg-[#0D9488]/10 px-4 py-1.5 rounded-full inline-block">
                        What We Offer
                    </span>
                    <h1 className="font-heading font-bold text-4xl md:text-6xl text-[#0F172A]">Our Services</h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-body">Everything you need for a seamless Sri Lankan adventure, curated with local care.</p>
                </div>

                <div className="space-y-20">
                    {services.map((service, index) => (
                        <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 md:gap-14 items-center group bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-xs`}>
                            <div className="w-full md:w-1/2 relative h-75 md:h-96 rounded-2xl overflow-hidden shadow-md">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="w-full md:w-1/2 space-y-5">
                                <div className="w-12 h-1.5 bg-[#0D9488] rounded-full"></div>
                                <h2 className="font-heading font-bold text-2xl md:text-3xl text-[#0F172A]">{service.title}</h2>
                                <p className="font-body text-base md:text-lg text-slate-600 leading-relaxed">{service.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call To Action */}
                <div className="mt-20 bg-white rounded-3xl p-8 md:p-14 text-center shadow-sm border border-slate-200/80 relative overflow-hidden">
                    <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                        <span className="text-xs uppercase tracking-widest font-bold text-[#0D9488] bg-[#0D9488]/10 px-4 py-1.5 rounded-full inline-block">
                            Start Exploring
                        </span>
                        <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0F172A]">
                            Ready to Plan Your <span className="text-[#FF6A2A]">Sri Lanka Journey</span>?
                        </h2>
                        <p className="text-slate-600 text-base md:text-lg">
                            Whether you need an airport transfer to Ahungalla, a scenic day trip, or a full island tour, we provide fast quotes and tailored itineraries.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 pt-2">
                            <a
                                href="https://api.whatsapp.com/send/?phone=94779452473&text=Hello%20DN%20Tours!%20I%20would%20like%20to%20inquire%20about%20your%20private%20tour%20and%20transfer%20services."
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button variant="primary" size="lg" className="flex items-center gap-2">
                                    <MessageCircle size={20} />
                                    WhatsApp Quick Enquiry
                                </Button>
                            </a>
                            <Link href="/contact">
                                <Button variant="outline" size="lg">
                                    Contact Form
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
