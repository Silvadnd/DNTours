"use client";
import React from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

const categories = [
    {
        title: "Trending Places",
        items: [
            { name: "Sigiriya Rock Fortress", desc: "The ancient palace on a rock, often called the 8th Wonder of the World.", image: "/images/ui/98.jpeg", link: "https://whc.unesco.org/en/list/202/" },
            { name: "Ella", desc: "A hiker's paradise with stunning views and the famous Nine Arch Bridge.", image: "/images/ui/97.jpeg", link: "https://www.lonelyplanet.com/sri-lanka/the-hill-country/ella" },
            { name: "Colombo City Tour", desc: "Experience the commercial capital with culture, food, and modern attractions.", image: "/images/ui/62.png", link: "https://www.srilanka.travel/colombo" },
            { name: "Galle Fort", desc: "A UNESCO World Heritage site featuring colonial architecture.", image: "/images/ui/1a.webp", link: "https://whc.unesco.org/en/list/451/" }
        ]
    },
    {
        title: "Hidden Gems",
        items: [
            { name: "Madu River", desc: "A serene mangrove river safari rich in wildlife and local culture.", image: "/images/ui/4d.jpg", link: "https://www.srilanka.travel/madu-river" },
            { name: "Bentota River", desc: "Perfect for river safaris, water sports, and peaceful boat rides.", image: "/images/ui/5d.jpg", link: "https://www.srilanka.travel/bentota-river" }
        ]
    },
    {
        title: "Most Beautiful Places",
        items: [
            { name: "Nuwara Eliya", desc: "Known as 'Little England' for its cool climate and colonial bungalows.", image: "/images/ui/44.jpg", link: "https://www.lonelyplanet.com/sri-lanka/the-hill-country/nuwara-eliya" },
            { name: "Mirissa Whale Watching", desc: "One of the best locations in the world to spot blue whales.", image: "/images/ui/6d.webp", link: "https://whc.unesco.org/en/list/1203/" },
            { name: "Yala National Park", desc: "The best place to spot leopards in the wild.", image: "/images/ui/42.jpg", link: "https://www.srilanka.travel/yala" },
            { name: "Udawalawa National Park", desc: "Famous for elephant sightings and breathtaking safari experiences.", image: "/images/ui/7c.jpg", link: "https://www.srilanka.travel/udawalawa" }
        ]
    }
];

export default function ExplorePage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <div className="relative h-[60vh] w-full">
                <Image src="/images/ui/31.jpeg" alt="Explore Sri Lanka" fill className="object-cover" />
                <div className="absolute inset-0 bg-dn-navy/40 flex flex-col items-center justify-center text-center text-white p-4">
                    <h1 className="font-heading font-bold text-5xl md:text-7xl mb-4 drop-shadow-lg">Explore Places</h1>
                    <p className="font-body text-xl max-w-2xl drop-shadow-md">Discover the icons and secrets of our island paradise.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
                {categories.map((cat, idx) => (
                    <div key={idx}>
                        <h2 className="font-heading font-bold text-3xl md:text-4xl text-dn-navy mb-12 border-l-8 border-dn-orange pl-6">{cat.title}</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {cat.items.map((item, i) => (
                                <div key={i} className="group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 bg-white flex flex-col h-full hover:-translate-y-2">
                                    <div className="relative h-56 overflow-hidden">
                                        <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                                    </div>
                                    <div className="p-6 flex flex-col grow">
                                        <h3 className="font-bold text-lg mb-2 text-dn-navy group-hover:text-dn-orange transition-colors">{item.name}</h3>
                                        <p className="text-gray-500 text-sm mb-6 grow leading-relaxed">{item.desc}</p>
                                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                                            <Button variant="outline" size="sm" className="w-full">Learn More</Button>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
