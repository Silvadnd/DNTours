"use client";
import React, { useState } from "react";
import TourMap from "./TourMap";
import clsx from "clsx";
import { motion } from "framer-motion";

// Sample Data using placeholder images from UI folder
const tours = {
  "One Day": [
    {
      id: "1d-1",
      name: "Madu River Tour",
      description: "Explore the stunning mangrove ecosystem and biodiversity.",
      locations: [
        { id: "mr1", name: "Madu River", lat: 6.3049, lng: 80.0775, image: "/images/ui/1.jpeg" }
      ]
    },

    {
      id: "1d-2",
      name: "Bentota River Safari",
      description: "Mangrove exploration and river adventure in Bentota.",
      locations: [
        { id: "br1", name: "Bentota River", lat: 6.4256, lng: 79.9951, image: "/images/ui/4.jpeg" }
      ]
    },

    {
      id: "1d-3",
      name: "Mirissa Whale Watching",
      description: "Experience majestic whales and dolphins in the Indian Ocean.",
      locations: [
        { id: "mw1", name: "Mirissa", lat: 5.9467, lng: 80.4575, image: "/images/ui/12.jpeg" }
      ]
    },

    {
      id: "1d-4",
      name: "Udawalawe Safari",
      description: "Close encounters with elephants in their natural habitat.",
      locations: [
        { id: "u1", name: "Udawalawe National Park", lat: 6.4240, lng: 80.8880, image: "/images/ui/14.jpeg" },
        { id: "u2", name: "Elephant Transit Home", lat: 6.4740, lng: 80.8990, image: "/images/ui/15.jpeg" }
      ]
    },

    {
      id: "1d-5",
      name: "Colombo City Tour",
      description: "Discover the vibrant capital city with its colonial heritage and modern attractions.",
      locations: [
        { id: "c1", name: "Colombo City", lat: 6.9271, lng: 79.8612, image: "/images/ui/16.jpeg" }
      ]
    }
    ],
    "Two Days": [
         {
        id: "dt-1",
        name: "Kandy & Nuwara Eliya",
        description: "Culture, tea plantations, and cool hill country climate.",
        locations: [
            { id: "dt1-l1", name: "Temple of the Tooth Relic", lat: 7.2936, lng: 80.6413, image: "/images/ui/11.jpeg" },
            { id: "dt1-l2", name: "Royal Botanical Garden", lat: 7.2690, lng: 80.5977, image: "/images/ui/12.jpeg" },
            { id: "dt1-l3", name: "Tea Plantation & Factory", lat: 6.9500, lng: 80.7800, image: "/images/ui/13.jpeg" },
            { id: "dt1-l4", name: "Gregory Lake", lat: 6.9570, lng: 80.7820, image: "/images/ui/14.jpeg" }
        ]
    },

    {
        id: "dt-2",
        name: "Udawalawe Safari & Hill Country",
        description: "Elephants, wildlife safari, and scenic mountain views.",
        locations: [
            { id: "dt2-l1", name: "Udawalawe National Park", lat: 6.4240, lng: 80.8880, image: "/images/ui/15.jpeg" },
            { id: "dt2-l2", name: "Elephant Transit Home", lat: 6.4740, lng: 80.8990, image: "/images/ui/16.jpeg" },
            { id: "dt2-l3", name: "Nuwara Eliya City", lat: 6.9497, lng: 80.7891, image: "/images/ui/17.jpeg" }
        ]
    },

    {
        id: "dt-3",
        name: "Sigiriya, Dambulla & Kandy",
        description: "Ancient kingdoms, cave temples, and cultural heritage.",
        locations: [
            { id: "dt3-l1", name: "Sigiriya Rock Fortress", lat: 7.9570, lng: 80.7603, image: "/images/ui/18.jpeg" },
            { id: "dt3-l2", name: "Dambulla Cave Temple", lat: 7.8565, lng: 80.6482, image: "/images/ui/19.jpeg" },
            { id: "dt3-l3", name: "Temple of the Tooth Relic", lat: 7.2936, lng: 80.6413, image: "/images/ui/20.jpeg" }
        ]
    }
    ],
    "Three Days": [
        {
        id: "3d-1",
        name: "Option 01 – Dambulla, Sigiriya & Kaudulla / Minneriya",
        description: "Ancient heritage sites with an unforgettable elephant safari.",
        locations: [
            { id: "3d1-l1", name: "Dambulla Cave Temple", lat: 7.8565, lng: 80.6482, image: "/images/ui/11.jpeg" },
            { id: "3d1-l2", name: "Sigiriya Rock Fortress", lat: 7.9570, lng: 80.7603, image: "/images/ui/12.jpeg" },
            { id: "3d1-l3", name: "Kaudulla National Park", lat: 8.0347, lng: 80.9000, image: "/images/ui/13.jpeg" }
            // or Minneriya National Park if needed
        ]
    },

    {
        id: "3d-2",
        name: "Option 02 – Udawalawe, Nuwara Eliya & Kandy",
        description: "Wildlife safari, hill country beauty, and cultural capital.",
        locations: [
            { id: "3d2-l1", name: "Udawalawe National Park", lat: 6.4240, lng: 80.8880, image: "/images/ui/14.jpeg" },
            { id: "3d2-l2", name: "Nuwara Eliya", lat: 6.9497, lng: 80.7891, image: "/images/ui/15.jpeg" },
            { id: "3d2-l3", name: "Temple of the Tooth Relic", lat: 7.2936, lng: 80.6413, image: "/images/ui/16.jpeg" },
            { id: "3d2-l4", name: "Sigiriya / Dambulla", lat: 7.9570, lng: 80.7603, image: "/images/ui/17.jpeg" }
        ]
    },

    {
        id: "3d-3",
        name: "Option 03 – Sigiriya, Polonnaruwa & Kandy",
        description: "Cultural Triangle journey through ancient kingdoms.",
        locations: [
            { id: "3d3-l1", name: "Sigiriya Rock Fortress", lat: 7.9570, lng: 80.7603, image: "/images/ui/18.jpeg" },
            { id: "3d3-l2", name: "Polonnaruwa Ancient City", lat: 7.9403, lng: 81.0188, image: "/images/ui/19.jpeg" },
            { id: "3d3-l3", name: "Temple of the Tooth Relic", lat: 7.2936, lng: 80.6413, image: "/images/ui/20.jpeg" }
        ]
    }
    ],
    "Five Days": [
        {
        id: "5d-1",
        name: "Option 01 – Island Loop",
        description: "Wildlife, hill country, cultural triangle, and ancient capitals.",
        locations: [
            { id: "5d1-l1", name: "Udawalawe National Park", lat: 6.4240, lng: 80.8880, image: "/images/ui/21.jpeg" },
            { id: "5d1-l2", name: "Ella", lat: 6.8667, lng: 81.0466, image: "/images/ui/22.jpeg" },
            { id: "5d1-l3", name: "Nuwara Eliya", lat: 6.9497, lng: 80.7891, image: "/images/ui/23.jpeg" },
            { id: "5d1-l4", name: "Kandy", lat: 7.2936, lng: 80.6413, image: "/images/ui/24.jpeg" },
            { id: "5d1-l5", name: "Dambulla Cave Temple", lat: 7.8565, lng: 80.6482, image: "/images/ui/25.jpeg" },
            { id: "5d1-l6", name: "Sigiriya Rock Fortress", lat: 7.9570, lng: 80.7603, image: "/images/ui/26.jpeg" },
            { id: "5d1-l7", name: "Anuradhapura Ancient City", lat: 8.3114, lng: 80.4037, image: "/images/ui/27.jpeg" }
        ]
    },

    {
        id: "5d-2",
        name: "Option 02 – Cultural & Scenic Escape",
        description: "Cultural triangle mixed with hill country or east coast relaxation.",
        locations: [
            { id: "5d2-l1", name: "Kandy", lat: 7.2936, lng: 80.6413, image: "/images/ui/28.jpeg" },
            { id: "5d2-l2", name: "Sigiriya Rock Fortress", lat: 7.9570, lng: 80.7603, image: "/images/ui/29.jpeg" },
            { id: "5d2-l3", name: "Dambulla Cave Temple", lat: 7.8565, lng: 80.6482, image: "/images/ui/30.jpeg" },
            { id: "5d2-l4", name: "Polonnaruwa Ancient City", lat: 7.9403, lng: 81.0188, image: "/images/ui/31.jpeg" },
            { id: "5d2-l5", name: "Nuwara Eliya", lat: 6.9497, lng: 80.7891, image: "/images/ui/32.jpeg" }
            // OR Pasikuda Beach if selected
        ]
    },

    {
        id: "5d-3",
        name: "Option 03 – Wildlife, Hills & Heritage",
        description: "Safaris, tea country, cultural sites, and beach or ancient cities.",
        locations: [
            { id: "5d3-l1", name: "Yala National Park", lat: 6.3716, lng: 81.5168, image: "/images/ui/33.jpeg" },
            { id: "5d3-l2", name: "Ella", lat: 6.8667, lng: 81.0466, image: "/images/ui/34.jpeg" },
            { id: "5d3-l3", name: "Nuwara Eliya", lat: 6.9497, lng: 80.7891, image: "/images/ui/35.jpeg" },
            { id: "5d3-l4", name: "Kandy", lat: 7.2936, lng: 80.6413, image: "/images/ui/36.jpeg" },
            { id: "5d3-l5", name: "Dambulla Cave Temple", lat: 7.8565, lng: 80.6482, image: "/images/ui/37.jpeg" },
            { id: "5d3-l6", name: "Sigiriya Rock Fortress", lat: 7.9570, lng: 80.7603, image: "/images/ui/38.jpeg" },
            { id: "5d3-l7", name: "Nilaveli Beach", lat: 8.6847, lng: 81.1886, image: "/images/ui/39.jpeg" },
            { id: "5d3-l8", name: "Anuradhapura Ancient City", lat: 8.3114, lng: 80.4037, image: "/images/ui/48.webp" }
        ]
    }
    ],
    "Seven Days": [
        {
        id: "7d-1",
        name: "Option 01 – Safari, Hills & East Coast",
        description: "Wildlife safari, tea country, cultural triangle, and Nilaveli beach stay.",
        locations: [
            // Day 1 (Udawalawe or Yala)
            { id: "7d1-l1", name: "Udawalawe National Park", lat: 6.4240, lng: 80.8880, image: "/images/ui/41.jpg" },
            { id: "7d1-l2", name: "Yala National Park", lat: 6.3716, lng: 81.5168, image: "/images/ui/42.jpg" },

            // Day 2 (Ella / Nuwara Eliya)
            { id: "7d1-l3", name: "Ella", lat: 6.8667, lng: 81.0466, image: "/images/ui/43.jpg" },
            { id: "7d1-l4", name: "Nuwara Eliya", lat: 6.9497, lng: 80.7891, image: "/images/ui/44.jpg" },

            // Day 3 (Kandy)
            { id: "7d1-l5", name: "Kandy", lat: 7.2936, lng: 80.6413, image: "/images/ui/45.jpg" },

            // Day 4 (Dambulla + Sigiriya)
            { id: "7d1-l6", name: "Dambulla Cave Temple", lat: 7.8565, lng: 80.6482, image: "/images/ui/46.jpg" },
            { id: "7d1-l7", name: "Sigiriya Rock Fortress", lat: 7.9570, lng: 80.7603, image: "/images/ui/47.jpg" },    
            // Day 5 (Polonnaruwa)
            { id: "7d1-l8", name: "Polonnaruwa Ancient City", lat: 7.9403, lng: 81.0188, image: "/images/ui/48.webp" },

            // Day 6 (Nilaveli)
            { id: "7d1-l9", name: "Nilaveli Beach", lat: 8.6847, lng: 81.1886, image: "/images/ui/49.jpg" }
        ]
    },

    {
        id: "7d-2",
        name: "Option 02 – Heritage North & East",
        description: "Cultural triangle, ancient capitals, Wilpattu safari, then relax in Pasikuda or explore Jaffna.",
        locations: [
            // Day 1 (Kandy)
            { id: "7d2-l1", name: "Kandy", lat: 7.2936, lng: 80.6413, image: "/images/ui/45.jpg" },

            // Day 2 (Dambulla + Sigiriya)
            { id: "7d2-l2", name: "Dambulla Cave Temple", lat: 7.8565, lng: 80.6482, image: "/images/ui/46.jpg" },
            { id: "7d2-l3", name: "Sigiriya Rock Fortress", lat: 7.9570, lng: 80.7603, image: "/images/ui/47.jpg" },
            // Day 3 (Anuradhapura)
            { id: "7d2-l4", name: "Anuradhapura Ancient City", lat: 8.3114, lng: 80.4037, image: "/images/ui/48.webp" },

            // Day 4 (Wilpattu)
            { id: "7d2-l5", name: "Wilpattu National Park", lat: 8.4500, lng: 80.0167, image: "/images/ui/41.jpg" },

            // Day 5/6 (Pasikuda or Jaffna)
            { id: "7d2-l6", name: "Pasikuda Beach", lat: 7.9250, lng: 81.5650, image: "/images/ui/55.jpg" },
            { id: "7d2-l7", name: "Jaffna", lat: 9.6615, lng: 80.0255, image: "/images/ui/56.jpg" }
        ]
    }
    ],
    "Ten Days": [
        {
        id: "10d-1",
        name: "Option 01 – Grand Island Explorer",
        description: "Coastal south, wildlife safaris, east coast beaches, cultural triangle, and hill country.",
        locations: [
            // South Coast
            { id: "10d1-l1", name: "Galle", lat: 6.0328, lng: 80.2168, image: "/images/ui/35.jpeg" },
            { id: "10d1-l2", name: "Mirissa Whale Watching", lat: 5.9485, lng: 80.4716, image: "/images/ui/61.jpeg" },

            // Safari
            { id: "10d1-l3", name: "Udawalawe National Park", lat: 6.4240, lng: 80.8880, image: "/images/ui/30.jpeg" },
            { id: "10d1-l4", name: "Yala National Park", lat: 6.3716, lng: 81.5168, image: "/images/ui/41.jpg" },

            // East Coast
            { id: "10d1-l5", name: "Arugam Bay", lat: 6.8420, lng: 81.8340, image: "/images/ui/64.jpg" },
            { id: "10d1-l6", name: "Pasikuda Beach", lat: 7.9250, lng: 81.5650, image: "/images/ui/55.jpg" },

            // Cultural Triangle
            { id: "10d1-l7", name: "Polonnaruwa Ancient City", lat: 7.9403, lng: 81.0188, image: "/images/ui/48.webp" },
            { id: "10d1-l8", name: "Sigiriya Rock Fortress", lat: 7.9570, lng: 80.7603, image: "/images/ui/47.jpg" },
            { id: "10d1-l9", name: "Dambulla Cave Temple", lat: 7.8565, lng: 80.6482, image: "/images/ui/46.jpg" },

            // Hill Country & Exit
            { id: "10d1-l10", name: "Kandy", lat: 7.2936, lng: 80.6413, image: "/images/ui/45.jpg" },
            { id: "10d1-l11", name: "Negombo", lat: 7.2083, lng: 79.8358, image: "/images/ui/70.jpg" }
        ]
    },

    {
        id: "10d-2",
        name: "Option 02 – Heritage & Northern Journey",
        description: "City highlights, cultural triangle, ancient capitals, and northern Sri Lanka.",
        locations: [
            // City Tour
            { id: "10d2-l1", name: "Colombo City Tour", lat: 6.9271, lng: 79.8612, image: "/images/ui/71.jpg" },

            // Central Hills
            { id: "10d2-l2", name: "Kandy", lat: 7.2936, lng: 80.6413, image: "/images/ui/45.jpg" },

            // Cultural Triangle
            { id: "10d2-l3", name: "Sigiriya Rock Fortress", lat: 7.9570, lng: 80.7603, image: "/images/ui/47.jpg" },
            { id: "10d2-l4", name: "Dambulla Cave Temple", lat: 7.8565, lng: 80.6482, image: "/images/ui/46.jpg" },

            // Safari & Ancient Capital
            { id: "10d2-l5", name: "Kaudulla National Park", lat: 8.0347, lng: 80.9000, image: "/images/ui/41.jpg" },
            { id: "10d2-l6", name: "Anuradhapura Ancient City", lat: 8.3114, lng: 80.4037, image: "/images/ui/48.webp" },

            // North
            { id: "10d2-l7", name: "Jaffna", lat: 9.6615, lng: 80.0255, image: "/images/ui/56.jpg" }
        ]
    }
    ]
};

const TourSection = () => {
    const days = Object.keys(tours);
    const [activeDay, setActiveDay] = useState("Two Days");
    const [selectedOptionId, setSelectedOptionId] = useState<string>(tours["Two Days"][0].id);

    const activeTourOptions = tours[activeDay as keyof typeof tours];
    const activeOption = activeTourOptions.find(o => o.id === selectedOptionId) || activeTourOptions[0];

    return (
        <section id="tours" className="py-20 bg-dn-bg relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="font-heading font-bold text-3xl md:text-5xl text-dn-navy mb-4">
                        Plan Your <span className="text-dn-orange">Perfect</span> Tour
                    </h2>
                    <p className="text-gray-600">Select duration and explore itineraries</p>
                </div>

                {/* Day Tabs */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
                    {days.map((day) => (
                        <button
                            key={day}
                            onClick={() => {
                                setActiveDay(day);
                                setSelectedOptionId(tours[day as keyof typeof tours][0].id);
                            }}
                            className={clsx(
                                "px-6 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300",
                                activeDay === day
                                    ? "bg-dn-navy text-white shadow-lg scale-105"
                                    : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-200"
                            )}
                        >
                            {day}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:h-175">

                    {/* Left: Options Selection */}
                    <div className="col-span-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar max-h-100 lg:max-h-none">
                        {activeTourOptions.map((option) => (
                            <motion.div
                                key={option.id}
                                layoutId={option.id}
                                onClick={() => setSelectedOptionId(option.id)}
                                className={clsx(
                                    "p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2",
                                    selectedOptionId === option.id
                                        ? "bg-white border-dn-orange shadow-xl relative overflow-hidden"
                                        : "bg-white/50 border-transparent hover:bg-white hover:shadow-md"
                                )}
                            >
                                {selectedOptionId === option.id && (
                                    <div className="absolute top-0 right-0 p-2 bg-dn-orange rounded-bl-xl">
                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                    </div>
                                )}
                                <h3 className={clsx("font-bold text-xl mb-2", selectedOptionId === option.id ? "text-dn-navy" : "text-gray-500")}>
                                    {option.name}
                                </h3>
                                <p className="text-sm text-gray-500">{option.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right: Map */}
                    <div className="col-span-1 lg:col-span-2 relative rounded-[40px] overflow-hidden shadow-2xl border border-white/20 h-125 lg:h-full">


                        <div className="w-full h-full">
                            <TourMap locations={activeOption.locations} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TourSection;
