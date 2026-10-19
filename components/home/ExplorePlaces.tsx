"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { MapPin, MessageCircle, ExternalLink, Compass } from "lucide-react";

interface Destination {
    name: string;
    category: "Trending" | "Near Ahungalla" | "Heritage" | "Wildlife & Nature";
    desc: string;
    image: string;
    infoUrl?: string;
    locationNote?: string;
}

const destinations: Destination[] = [
    {
        name: "Madu River Mangrove Safari",
        category: "Near Ahungalla",
        desc: "A tranquil boat safari through dense mangrove tunnels, cinnamon islands, and bird habitats just 10 minutes from Ahungalla.",
        image: "/images/ui/4d.jpg",
        locationNote: "10 mins from Ahungalla",
        infoUrl: "https://www.srilanka.travel/madu-river"
    },
    {
        name: "Galle Dutch Fort",
        category: "Near Ahungalla",
        desc: "A preserved 17th-century UNESCO World Heritage coastal fortress featuring Dutch colonial ramparts, quaint cafes, and lighthouse views.",
        image: "/images/ui/1a.webp",
        locationNote: "45 mins from Ahungalla",
        infoUrl: "https://whc.unesco.org/en/list/451/"
    },
    {
        name: "Bentota River & Water Activities",
        category: "Near Ahungalla",
        desc: "Scenic river cruises, serene waters, and water sports located along the golden southwestern coastline.",
        image: "/images/ui/5d.jpg",
        locationNote: "15 mins from Ahungalla",
        infoUrl: "https://www.srilanka.travel/bentota-river"
    },
    {
        name: "Sigiriya Rock Fortress",
        category: "Heritage",
        desc: "The breathtaking 5th-century ancient palace atop a sheer 200m granite rock with ancient frescoes and landscaped water gardens.",
        image: "/images/ui/98.jpeg",
        locationNote: "Cultural Triangle",
        infoUrl: "https://whc.unesco.org/en/list/202/"
    },
    {
        name: "Ella & Nine Arch Bridge",
        category: "Trending",
        desc: "Scenic misty mountain town surrounded by lush tea hills, Little Adam's Peak hikes, and the iconic colonial Nine Arch rail bridge.",
        image: "/images/ui/97.jpeg",
        locationNote: "Central Highlands",
        infoUrl: "https://www.srilanka.travel/ella"
    },
    {
        name: "Mirissa Whale Watching & Beach",
        category: "Wildlife & Nature",
        desc: "One of the world's premier locations for spotting majestic blue whales, sperm whales, and spinning dolphins in the warm Indian Ocean.",
        image: "/images/ui/6d.webp",
        locationNote: "South Coast (near Weligama)",
        infoUrl: "https://www.srilanka.travel/whale-watching"
    },
    {
        name: "Udawalawe National Park",
        category: "Wildlife & Nature",
        desc: "Renowned for guaranteed wild elephant sightings in open grasslands, water monitors, and the Elephant Transit Home rehabilitation center.",
        image: "/images/ui/7c.jpg",
        locationNote: "Southern Dry Zone",
        infoUrl: "https://www.srilanka.travel/udawalawe"
    },
    {
        name: "Yala National Park Safari",
        category: "Wildlife & Nature",
        desc: "Sri Lanka's premier wildlife sanctuary boasting one of the world's highest densities of wild leopards, sloth bears, and crocodiles.",
        image: "/images/ui/42.jpg",
        locationNote: "Southeast Coast",
        infoUrl: "https://www.srilanka.travel/yala"
    },
    {
        name: "Kandy Temple of the Tooth",
        category: "Heritage",
        desc: "The sacred royal palace complex housing Sri Lanka's venerated Tooth Relic of the Buddha, set beside Kandy's tranquil central lake.",
        image: "/images/ui/45.jpg",
        locationNote: "Central Province",
        infoUrl: "https://whc.unesco.org/en/list/450/"
    },
    {
        name: "Nuwara Eliya Tea Country",
        category: "Trending",
        desc: "Known as 'Little England' for its cool highland climate, rolling green tea carpet estates, waterfalls, and colonial charm.",
        image: "/images/ui/44.jpg",
        locationNote: "Central Highlands",
        infoUrl: "https://www.srilanka.travel/nuwara-eliya"
    },
    {
        name: "Colombo City Highlights",
        category: "Trending",
        desc: "A vibrant blend of modern high-rises, historic colonial architecture, bustling Pettah markets, and seaside strolls along Galle Face Green.",
        image: "/images/ui/62.png",
        locationNote: "Western Province",
        infoUrl: "https://www.srilanka.travel/colombo"
    },
    {
        name: "Dambulla Cave Temple",
        category: "Heritage",
        desc: "The largest and best-preserved cave temple complex in Sri Lanka, featuring five sanctuaries adorned with over 150 Buddhist statues.",
        image: "/images/ui/46.jpg",
        locationNote: "Cultural Triangle",
        infoUrl: "https://whc.unesco.org/en/list/561/"
    }
];

const categories = ["All", "Near Ahungalla", "Heritage", "Wildlife & Nature", "Trending"] as const;

const ExplorePlaces = () => {
    const [activeTab, setActiveTab] = useState<string>("All");
    const [visibleCount, setVisibleCount] = useState<number>(8);

    const filteredDestinations = activeTab === "All"
        ? destinations
        : destinations.filter(d => d.category === activeTab);

    const visibleDestinations = filteredDestinations.slice(0, visibleCount);

    return (
        <section id="explore-places" className="py-20 md:py-28 bg-[#F8FAFC] relative scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12 space-y-4">
                    <span className="text-xs uppercase tracking-widest font-bold text-[#0D9488] bg-[#0D9488]/10 px-4 py-1.5 rounded-full inline-block">
                        Explore Sri Lanka
                    </span>
                    <h2 className="font-heading font-bold text-3xl md:text-5xl text-[#0F172A]">
                        Iconic Destinations &amp; <span className="text-[#FF6A2A]">Hidden Gems</span>
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto font-body text-base md:text-lg">
                        Discover UNESCO heritage fortresses, misty tea hills, pristine beaches, and wildlife safaris easily accessible with your DN Tours private driver.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setActiveTab(cat);
                                setVisibleCount(8);
                            }}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                                activeTab === cat
                                    ? "bg-[#0D9488] text-white shadow-md scale-105"
                                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/60 shadow-2xs"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Destination Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {visibleDestinations.map((item, idx) => (
                        <div
                            key={idx}
                            className="group rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 bg-white flex flex-col h-full hover:-translate-y-1.5"
                        >
                            {/* Image with Location Badge */}
                            <div className="relative h-56 overflow-hidden bg-gray-100">
                                <Image
                                    src={item.image}
                                    alt={`${item.name} - Sri Lanka Tour Destination`}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                                {item.locationNote && (
                                    <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-xs text-dn-navy px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs">
                                        <MapPin size={12} className="text-dn-orange" />
                                        <span>{item.locationNote}</span>
                                    </div>
                                )}
                            </div>

                            {/* Card Content */}
                            <div className="p-5 flex flex-col grow justify-between space-y-4">
                                <div>
                                    <h3 className="font-heading font-bold text-lg mb-2 text-dn-navy group-hover:text-dn-orange transition-colors">
                                        {item.name}
                                    </h3>
                                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed line-clamp-3">
                                        {item.desc}
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-2 pt-2 border-t border-gray-100">
                                    <a
                                        href={`https://api.whatsapp.com/send/?phone=94779452473&text=${encodeURIComponent(`Hello DN Tours! I would like to visit ${item.name} on my Sri Lanka tour. Could you share tour options?`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                    >
                                        <button className="w-full py-2 px-3 rounded-xl bg-dn-orange hover:bg-dn-orange/90 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs">
                                            <MessageCircle size={14} />
                                            <span>Plan This Trip</span>
                                        </button>
                                    </a>

                                    <div className="flex justify-between items-center text-xs pt-1">
                                        <a
                                            href="#tours"
                                            className="text-dn-navy font-semibold hover:text-dn-orange flex items-center gap-1 transition-colors"
                                        >
                                            <Compass size={13} />
                                            <span>View Tours</span>
                                        </a>

                                        {item.infoUrl && (
                                            <a
                                                href={item.infoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-400 hover:text-gray-600 flex items-center gap-0.5"
                                                title="Official Info"
                                            >
                                                <span>Guide</span>
                                                <ExternalLink size={11} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Show More / Show Less */}
                {filteredDestinations.length > visibleCount && (
                    <div className="text-center mt-12">
                        <Button
                            variant="outline"
                            onClick={() => setVisibleCount(prev => prev + 4)}
                            className="border-dn-navy text-dn-navy hover:bg-dn-navy hover:text-white"
                        >
                            View More Destinations ({filteredDestinations.length - visibleCount} more)
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ExplorePlaces;
