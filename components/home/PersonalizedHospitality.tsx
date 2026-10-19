"use client";
import React, { useState } from "react";
import Link from "next/link";
import { 
    HeartHandshake, 
    Palmtree, 
    Compass, 
    Mountain, 
    Car, 
    Binoculars, 
    Users, 
    User, 
    Heart, 
    Clock, 
    Check, 
    MessageCircle, 
    ArrowRight
} from "lucide-react";

interface InterestOption {
    id: string;
    label: string;
    description: string;
    icon: React.ElementType;
}

const interestOptions: InterestOption[] = [
    {
        id: "wildlife",
        label: "Wildlife & Safaris",
        description: "Udawalawe elephants, Yala leopards, Madu river mangroves",
        icon: Binoculars,
    },
    {
        id: "beaches",
        label: "Coastal & Beaches",
        description: "Ahungalla serene coast, Bentota water sports, Mirissa whales",
        icon: Palmtree,
    },
    {
        id: "culture",
        label: "Heritage & Temples",
        description: "Galle Dutch Fort, Kandy Temple of Tooth, Sigiriya rock fortress",
        icon: Compass,
    },
    {
        id: "highlands",
        label: "Scenic Hill Country",
        description: "Nuwara Eliya tea plantations, Ella scenic bridges & waterfalls",
        icon: Mountain,
    },
    {
        id: "transfers",
        label: "Airport & Chauffeur",
        description: "Direct CMB airport transfers & private air-conditioned vehicle",
        icon: Car,
    },
];

const partyOptions = [
    { id: "couple", label: "Couple / Honeymoon", icon: Heart },
    { id: "family", label: "Family with Children", icon: Users },
    { id: "solo", label: "Solo Traveler", icon: User },
    { id: "friends", label: "Small Group / Friends", icon: Users },
];

const durationOptions = [
    { id: "day-trip", label: "Day Excursion (from Ahungalla)" },
    { id: "short", label: "2 - 4 Days Mini Tour" },
    { id: "classic", label: "5 - 7 Days Highlights" },
    { id: "extended", label: "8+ Days Island Discovery" },
];

const PersonalizedHospitality = () => {
    const [selectedInterests, setSelectedInterests] = useState<string[]>(["wildlife", "beaches"]);
    const [selectedParty, setSelectedParty] = useState<string>("couple");
    const [selectedDuration, setSelectedDuration] = useState<string>("classic");

    const toggleInterest = (id: string) => {
        setSelectedInterests((prev) =>
            prev.includes(id)
                ? prev.length > 1
                    ? prev.filter((item) => item !== id)
                    : prev // Keep at least one selected
                : [...prev, id]
        );
    };

    // Build the dynamic WhatsApp message based on selections
    const selectedInterestLabels = interestOptions
        .filter((opt) => selectedInterests.includes(opt.id))
        .map((opt) => opt.label)
        .join(", ");

    const partyLabel = partyOptions.find((p) => p.id === selectedParty)?.label || "Travelers";
    const durationLabel = durationOptions.find((d) => d.id === selectedDuration)?.label || "Custom Duration";

    const customEnquiryMessage = encodeURIComponent(
        `Hello DN Tours! I am planning a trip to Sri Lanka for a ${partyLabel} for ${durationLabel}. We are particularly interested in: ${selectedInterestLabels}. Could you help customize an itinerary for us?`
    );

    const whatsappLink = `https://api.whatsapp.com/send/?phone=94779452473&text=${customEnquiryMessage}`;

    return (
        <section id="personalized-hospitality" className="py-20 md:py-28 bg-white relative overflow-hidden scroll-mt-20 border-t border-slate-200/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
                    <span className="text-xs uppercase tracking-widest font-bold text-[#0D9488] bg-[#0D9488]/10 px-4 py-1.5 rounded-full inline-flex items-center gap-2">
                        <HeartHandshake size={14} />
                        Personalized Sri Lankan Hospitality
                    </span>
                    <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#0F172A]">
                        Tailor Your Island <span className="text-[#FF6A2A]">Journey</span>
                    </h2>
                    <p className="text-slate-600 text-base md:text-lg">
                        Select your travel preferences below. Our local Ahungalla team will prepare an authentic, flexible itinerary crafted precisely around your pace.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Interactive Selection Column */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Step 1: Interests */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D8]/80 shadow-xs space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-heading font-bold text-lg sm:text-xl text-[#0B1B2B] flex items-center gap-2">
                                    <span className="w-7 h-7 rounded-full bg-[#0D9488] text-white text-xs font-bold flex items-center justify-center">1</span>
                                    What interests you most in Sri Lanka?
                                </h3>
                                <span className="text-xs text-slate-500 font-medium">Select one or more</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                {interestOptions.map((option) => {
                                    const isSelected = selectedInterests.includes(option.id);
                                    const Icon = option.icon;
                                    return (
                                        <button
                                            key={option.id}
                                            type="button"
                                            onClick={() => toggleInterest(option.id)}
                                            className={`p-4 rounded-2xl text-left transition-all duration-200 border cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:ring-offset-1 flex items-start gap-3.5 ${
                                                isSelected
                                                    ? "bg-[#E8F5F1] border-[#0D9488] shadow-xs"
                                                    : "bg-[#FAF9F6] border-slate-200/80 hover:bg-slate-50 hover:border-slate-300"
                                            }`}
                                            aria-pressed={isSelected}
                                        >
                                            <div
                                                className={`p-2.5 rounded-xl shrink-0 transition-colors ${
                                                    isSelected ? "bg-[#0D9488] text-white" : "bg-white text-slate-600 border border-slate-200"
                                                }`}
                                            >
                                                <Icon size={18} />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center justify-between gap-1">
                                                    <p className={`font-heading font-bold text-sm ${isSelected ? "text-[#0D9488]" : "text-[#0B1B2B]"}`}>
                                                        {option.label}
                                                    </p>
                                                    {isSelected && <Check size={14} className="text-[#0D9488] shrink-0" />}
                                                </div>
                                                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                                                    {option.description}
                                                </p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Step 2: Travel Party Style */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D8]/80 shadow-xs space-y-4">
                            <h3 className="font-heading font-bold text-lg sm:text-xl text-[#0B1B2B] flex items-center gap-2">
                                <span className="w-7 h-7 rounded-full bg-[#0D9488] text-white text-xs font-bold flex items-center justify-center">2</span>
                                Who is traveling with you?
                            </h3>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                                {partyOptions.map((party) => {
                                    const isSelected = selectedParty === party.id;
                                    const Icon = party.icon;
                                    return (
                                        <button
                                            key={party.id}
                                            type="button"
                                            onClick={() => setSelectedParty(party.id)}
                                            className={`p-3.5 rounded-2xl text-center transition-all duration-200 border cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:ring-offset-1 flex flex-col items-center gap-2 ${
                                                isSelected
                                                    ? "bg-[#E8F5F1] border-[#0D9488] text-[#0D9488] font-bold shadow-xs"
                                                    : "bg-[#FAF9F6] border-slate-200/80 text-[#0B1B2B] hover:bg-slate-50"
                                            }`}
                                            aria-pressed={isSelected}
                                        >
                                            <div className={`p-2 rounded-xl ${isSelected ? "bg-[#0D9488] text-white" : "bg-white text-slate-600 border border-slate-200"}`}>
                                                <Icon size={16} />
                                            </div>
                                            <span className="text-xs leading-tight font-medium">{party.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Step 3: Duration */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D8]/80 shadow-xs space-y-4">
                            <h3 className="font-heading font-bold text-lg sm:text-xl text-[#0B1B2B] flex items-center gap-2">
                                <span className="w-7 h-7 rounded-full bg-[#0D9488] text-white text-xs font-bold flex items-center justify-center">3</span>
                                How long would you like to explore?
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                {durationOptions.map((duration) => {
                                    const isSelected = selectedDuration === duration.id;
                                    return (
                                        <button
                                            key={duration.id}
                                            type="button"
                                            onClick={() => setSelectedDuration(duration.id)}
                                            className={`p-3.5 rounded-2xl text-left transition-all duration-200 border cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:ring-offset-1 flex items-center justify-between gap-2 ${
                                                isSelected
                                                    ? "bg-[#E8F5F1] border-[#0D9488] text-[#0D9488] font-bold shadow-xs"
                                                    : "bg-[#FAF9F6] border-slate-200/80 text-[#0B1B2B] hover:bg-slate-50 font-medium"
                                            }`}
                                            aria-pressed={isSelected}
                                        >
                                            <span className="text-xs sm:text-sm flex items-center gap-2">
                                                <Clock size={15} className={isSelected ? "text-[#0D9488]" : "text-slate-400"} />
                                                {duration.label}
                                            </span>
                                            {isSelected && <Check size={16} className="text-[#0D9488] shrink-0" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Live Tailored Summary Card */}
                    <div className="lg:col-span-5 sticky top-28">
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] shadow-lg space-y-6 relative overflow-hidden">
                            {/* Decorative badge */}
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div className="flex items-center gap-2 text-[#0D9488] font-heading font-bold text-sm">
                                   
                                    Your Tailored Experience
                                </div>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    Free Customization
                                </span>
                            </div>

                            {/* Summary description */}
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Travel Party &amp; Duration</p>
                                    <p className="font-heading font-bold text-lg text-[#0B1B2B] mt-0.5">
                                        {partyLabel} • {durationLabel}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Selected Highlights</p>
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        {interestOptions
                                            .filter((opt) => selectedInterests.includes(opt.id))
                                            .map((opt) => (
                                                <span
                                                    key={opt.id}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5F1] text-[#0D9488] text-xs font-bold border border-teal-100"
                                                >
                                                    <Check size={12} />
                                                    {opt.label}
                                                </span>
                                            ))}
                                    </div>
                                </div>

                                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-slate-200/80 text-xs text-slate-600 leading-relaxed space-y-1.5">
                                    <p className="font-semibold text-[#0B1B2B]">What DN Tours includes:</p>
                                    <ul className="list-disc list-inside space-y-1 text-slate-500">
                                        <li>Private air-conditioned car or van</li>
                                        <li>Experienced English-speaking local driver-guide</li>
                                        <li>Door-to-door hotel pickup in Ahungalla or airport</li>
                                        <li>100% flexible stops, photo breaks, and pacing</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Direct Action Buttons */}
                            <div className="space-y-3 pt-2">
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                    <MessageCircle size={18} />
                                    Send Details via WhatsApp
                                </a>

                                <div className="grid grid-cols-2 gap-2.5">
                                    <a
                                        href="#tours"
                                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#FAF9F6] hover:bg-slate-100 text-[#0B1B2B] text-xs font-bold border border-slate-200 transition-colors"
                                    >
                                        View Journeys
                                        <ArrowRight size={13} />
                                    </a>
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#0D9488]/10 hover:bg-[#0D9488]/20 text-[#0D9488] text-xs font-bold transition-colors"
                                    >
                                        Send Email Enquiry
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PersonalizedHospitality;
