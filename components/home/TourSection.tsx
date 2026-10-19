"use client";
import React, { useState } from "react";
import TourMap from "./TourMap";
import clsx from "clsx";

// Sample Data using placeholder images from UI folder
const tours = {
  "One Day": [
    {
      id: "1d-1",
      name: "Sigiriya Tour",
      description: "Ancient rock fortress with stunning frescoes and panoramic views.",
      locations: [
        { id: "sig1", name: "Sigiriya Rock Fortress", lat: 7.9570, lng: 80.7603, image: "/images/ui/98.jpeg" }
      ]
    },

    {
      id: "1d-2",
      name: "Kandy Tour",
      description: "Cultural capital with the sacred Temple of the Tooth Relic.",
      locations: [
        { id: "kan1", name: "Temple of the Tooth Relic", lat: 7.2936, lng: 80.6414, image: "/images/ui/45.jpg" }
      ]
    },

    {
      id: "1d-3",
      name: "Ella Tour",
      description: "Breathtaking landscapes, tea estates, and scenic train rides.",
      locations: [
        { id: "ella1", name: "Nine Arch Bridge", lat: 6.8667, lng: 81.0466, image: "/images/ui/97.jpeg" }
      ]
    },

    {
      id: "1d-4",
      name: "Galle Fort Tour",
      description: "UNESCO World Heritage Dutch colonial fortress by the sea.",
      locations: [
        { id: "galle1", name: "Galle Dutch Fort", lat: 6.0328, lng: 80.2168, image: "/images/ui/1a.webp" },
        { id: "galle2", name: "Galle Lighthouse", lat: 6.0241, lng: 80.2189, image: "/images/ui/35.jpeg" }
      ]
    },

    {
      id: "1d-5",
      name: "Yala Safari Tour",
      description: "Premier wildlife park with leopards, elephants, and diverse fauna.",
      locations: [
        { id: "yala1", name: "Yala National Park", lat: 6.3667, lng: 81.5167, image: "/images/ui/42.jpg" }
      ]
    },

    {
      id: "1d-6",
      name: "Udawalawe Safari Tour",
      description: "Close encounters with elephants in their natural habitat.",
      locations: [
        { id: "u1", name: "Udawalawe National Park", lat: 6.4240, lng: 80.8880, image: "/images/ui/7c.jpg" }
      ]
    },

    {
      id: "1d-7",
      name: "Sinharaja Rainforest Tour",
      description: "UNESCO World Heritage tropical rainforest with endemic species.",
      locations: [
        { id: "sin1", name: "Sinharaja Forest Reserve", lat: 6.4031, lng: 80.4911, image: "/images/ui/41.jpg" }
      ]
    },

    {
      id: "1d-8",
      name: "Mirissa Beach Tour",
      description: "Pristine beaches and whale watching in the Indian Ocean.",
      locations: [
        { id: "mir1", name: "Mirissa Beach", lat: 5.9467, lng: 80.4575, image: "/images/ui/95.jpg" }
      ]
    },

    {
      id: "1d-9",
      name: "Hikkaduwa Beach Tour",
      description: "Vibrant beach town with coral reefs and water sports.",
      locations: [
        { id: "hik1", name: "Hikkaduwa Beach", lat: 6.1400, lng: 80.1000, image: "/images/ui/70.jpg" }
      ]
    },

    {
      id: "1d-10",
      name: "Bentota Tour",
      description: "Beach resort town with water sports and river safaris.",
      locations: [
        { id: "ben1", name: "Bentota Beach", lat: 6.4256, lng: 79.9951, image: "/images/ui/R.jpg" }
      ]
    },

    {
      id: "1d-11",
      name: "Colombo City Tour",
      description: "Vibrant capital with colonial heritage and modern attractions.",
      locations: [
        { id: "col1", name: "Colombo City", lat: 6.9271, lng: 79.8612, image: "/images/ui/62.png" }
      ]
    },

    {
      id: "1d-12",
      name: "Hambantota Tour",
      description: "Southern coastal town with port, wildlife, and beaches.",
      locations: [
        { id: "ham1", name: "Hambantota Port", lat: 6.1245, lng: 81.1185, image: "/images/ui/55.jpg" }
      ]
    },

    {
      id: "1d-13",
      name: "Dambulla Cave Temple Tour",
      description: "Ancient Buddhist cave complex with stunning murals and statues.",
      locations: [
        { id: "dam1", name: "Dambulla Cave Temple", lat: 7.8567, lng: 80.6497, image: "/images/ui/46.jpg" }
      ]
    },

    {
      id: "1d-14",
      name: "Pidurangala Rock Tour",
      description: "Ancient rock temple with spectacular views of Sigiriya.",
      locations: [
        { id: "pid1", name: "Pidurangala Rock", lat: 7.9647, lng: 80.7561, image: "/images/ui/r1.jpg" }
      ]
    },

    {
      id: "1d-15",
      name: "Madu Ganga River Safari",
      description: "Mangrove wetland ecosystem with rich biodiversity.",
      locations: [
        { id: "mad1", name: "Madu River", lat: 6.3049, lng: 80.0775, image: "/images/ui/4d.jpg" }
      ]
    },

    {
      id: "1d-16",
      name: "Whale Watching Tour",
      description: "Experience majestic blue whales and dolphins.",
      locations: [
        { id: "whale1", name: "Mirissa Whale Watching", lat: 5.9467, lng: 80.4575, image: "/images/ui/6d.webp" }
      ]
    },

    {
      id: "1d-17",
      name: "Hill Country Tour",
      description: "Scenic tea plantations and cool mountain climate.",
      locations: [
        { id: "hill1", name: "Tea Plantation", lat: 6.9500, lng: 80.7800, image: "/images/ui/h1.jpg" } 
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
    const [selectedLocationId, setSelectedLocationId] = useState<string | undefined>(undefined);

    const activeTourOptions = tours[activeDay as keyof typeof tours];
    const activeOption = activeTourOptions.find(o => o.id === selectedOptionId) || activeTourOptions[0];

    const stopsList = activeOption.locations.map(l => l.name).join(", ");
    const whatsappMessage = encodeURIComponent(
        `Hello DN Tours! I am interested in booking the "${activeOption.name}" (${activeDay}) itinerary covering ${stopsList}. Please share details and availability.`
    );

    return (
        <section id="tours" className="py-20 md:py-28 bg-white relative scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="text-xs uppercase tracking-widest font-bold text-[#0D9488] bg-[#0D9488]/10 px-4 py-1.5 rounded-full inline-block mb-3">
                        Tailored Sri Lanka Journeys
                    </span>
                    <h2 className="font-heading font-bold text-3xl md:text-5xl text-[#0F172A] mb-4">
                        Tailored Sri Lanka <span className="text-[#FF6A2A]">Journeys</span>
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
                        Select a duration to explore curated itineraries, or plan a flexible custom route with your dedicated private driver from Ahungalla.
                    </p>
                </div>

                {/* Day Tabs */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
                    {days.map((day) => (
                        <button
                            key={day}
                            onClick={() => {
                                setActiveDay(day);
                                const firstOption = tours[day as keyof typeof tours][0];
                                setSelectedOptionId(firstOption.id);
                                setSelectedLocationId(firstOption.locations[0]?.id);
                            }}
                            className={clsx(
                                "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer",
                                activeDay === day
                                    ? "bg-[#0D9488] text-white shadow-md scale-105"
                                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                            )}
                        >
                            {day}
                        </button>
                    ))}
                </div>

                {/* Main Tour Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Options Selection */}
                    <div className="col-span-1 space-y-4">
                        <div className="space-y-4 max-h-120 overflow-y-auto pr-2 custom-scrollbar">
                            {activeTourOptions.map((option) => (
                                <div
                                    key={option.id}
                                    onClick={() => {
                                        setSelectedOptionId(option.id);
                                        setSelectedLocationId(option.locations[0]?.id);
                                    }}
                                    className={clsx(
                                        "p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2",
                                        selectedOptionId === option.id
                                            ? "bg-white border-[#0D9488] shadow-lg relative overflow-hidden"
                                            : "bg-white/80 border-transparent hover:bg-white hover:shadow-md"
                                    )}
                                >
                                    {selectedOptionId === option.id && (
                                        <div className="absolute top-0 right-0 p-2 bg-[#0D9488] rounded-bl-xl">
                                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                        </div>
                                    )}
                                    <h3 className={clsx("font-bold text-lg mb-2", selectedOptionId === option.id ? "text-dn-navy" : "text-gray-700")}>
                                        {option.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 leading-relaxed mb-3">{option.description}</p>
                                    <div className="flex items-center gap-2 text-xs font-semibold text-dn-orange">
                                        <span>{option.locations.length} Key Stops Included</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Action Box for Selected Tour */}
                        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-md space-y-3">
                            <h4 className="font-heading font-bold text-sm text-dn-navy">
                                Book or Inquire About This Itinerary
                            </h4>
                            <p className="text-xs text-gray-500">
                                Pricing is customized based on vehicle type and passenger count. No upfront payment required to discuss plans.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-2 pt-2">
                                <a
                                    href={`https://api.whatsapp.com/send/?phone=94779452473&text=${whatsappMessage}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1"
                                >
                                    <button className="w-full py-2.5 px-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs">
                                        <span>Enquire on WhatsApp</span>
                                    </button>
                                </a>
                                <a
                                    href="/contact"
                                    className="flex-1"
                                >
                                    <button className="w-full py-2.5 px-4 rounded-xl bg-dn-navy hover:bg-dn-navy/90 text-white font-bold text-xs transition-colors text-center shadow-xs">
                                        Customize Route
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right: Map View with Fallback and List */}
                    <div className="col-span-1 lg:col-span-2 space-y-4">
                        <div className="relative rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl border border-white/20 h-96 lg:h-125 bg-gray-100">
                            <TourMap
                                locations={activeOption.locations}
                                activeLocationId={selectedLocationId}
                                onSelectLocation={setSelectedLocationId}
                            />
                        </div>


                        {/* Alternative List-based Destination Selection (Accessible & Mobile-friendly) */}
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                            <h4 className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-3">
                                Itinerary Stops ({activeOption.locations.length} Places):
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {activeOption.locations.map((loc, idx) => (
                                    <div
                                        key={loc.id}
                                        onClick={() => setSelectedLocationId(loc.id)}
                                        className={clsx(
                                            "flex items-center gap-3 p-2.5 rounded-xl border text-left cursor-pointer transition-all",
                                            selectedLocationId === loc.id
                                                ? "border-dn-orange bg-dn-orange/5 shadow-xs"
                                                : "border-gray-100 hover:border-gray-200 bg-gray-50/50"
                                        )}
                                    >
                                        <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-dn-navy relative">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold text-dn-navy truncate">{idx + 1}. {loc.name}</p>
                                            <p className="text-[10px] text-gray-500">Tap to inspect</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TourSection;

