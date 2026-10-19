"use client";
import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { generateFAQSchema } from "@/lib/seo";

export const homeFAQs = [
    {
        question: "What are the best places to visit near Ahungalla?",
        answer: "Top attractions near Ahungalla include the Madu River mangrove boat safari in Balapitiya (10 minutes away), Kosgoda Sea Turtle Conservation Project (5 minutes away), Bentota beach and water sports (15 minutes), Brief Garden by Bevis Bawa, and the historic Galle Dutch Fort (approx. 45 minutes along the southern coastal expressway)."
    },
    {
        question: "What private tours are available from Ahungalla?",
        answer: "DN Tours offers both full-day excursions and multi-day island itineraries originating from Ahungalla hotels and villas. Popular day trips include Galle Fort & Southern Coast, Udawalawe National Park Elephant Safari, and Kandy Temple of the Tooth. Multi-day tours cover Sigiriya, Ella, Nuwara Eliya tea hills, and Yala National Park."
    },
    {
        question: "Can I arrange an airport transfer to or from Ahungalla?",
        answer: "Yes. We provide dedicated private airport transfers between Bandaranaike International Airport (CMB) in Katunayake and Ahungalla, Bentota, or surrounding coastal resorts. Travel takes approximately 1.5 to 2 hours via the Southern Expressway in a comfortable, air-conditioned vehicle with luggage assistance."
    },
    {
        question: "How can I customize a Sri Lanka tour itinerary?",
        answer: "Every tour with DN Tours is completely flexible. You can share your desired stops, travel dates, and pace via WhatsApp (+94 77 945 2473) or our contact form. We will recommend realistic routing, driving times, and stops without charging any itinerary planning fees."
    },
    {
        question: "What is typically included in a private tour with DN Tours?",
        answer: "Our private tour packages typically include a dedicated, air-conditioned vehicle, fuel, highway tolls, parking charges, and an experienced English-speaking private driver-guide. Driver accommodation and meals are covered on multi-day itineraries. Entrance tickets to monuments and wildlife safari jeeps can be paid directly or bundled upon request."
    },
    {
        question: "How can I enquire about tour availability and prices?",
        answer: "The quickest way to get an accurate quote is via WhatsApp at +94 77 945 2473, where we reply promptly. You can also submit the website Contact form with your group size and travel dates. Quotes are provided in USD, EUR, GBP, or LKR with no hidden extras."
    },
    {
        question: "Which destinations can be combined into a single day trip?",
        answer: "Convenient day trips from Ahungalla include: (1) Madu River Safari + Kosgoda Turtle Hatchery + Galle Fort; (2) Udawalawe Elephant Safari + Elephant Transit Home; or (3) Kandy Cultural Day Tour including the Temple of the Tooth and Peradeniya Botanical Gardens. Your driver ensures a comfortable pace without rushing."
    },
    {
        question: "How can I contact DN Tours to plan my journey?",
        answer: "You can reach DN Tours directly via WhatsApp (+94 77 945 2473), phone call, or email (da.dinethnawanjana@gmail.com). We are based in Galwehera, Ahungalla (Southern Province, Sri Lanka) and are happy to answer any travel questions before you arrive."
    }
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const faqSchema = generateFAQSchema(homeFAQs);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-20 md:py-28 bg-[#F8FAFC] relative border-t border-slate-200/60">
            {/* Structured Data for SEO / AEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12 space-y-3">
                    <span className="text-xs uppercase tracking-widest font-bold text-[#0D9488] bg-[#0D9488]/10 px-4 py-1.5 rounded-full inline-block">
                        Got Questions?
                    </span>
                    <h2 className="font-heading font-bold text-3xl md:text-5xl text-[#0F172A]">
                        Frequently Asked <span className="text-[#FF6A2A]">Questions</span>
                    </h2>
                    <p className="text-slate-600 text-base md:text-lg">
                        Essential answers for travellers planning private tours, airport transfers, and day excursions in Sri Lanka.
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {homeFAQs.map((faq, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden transition-all duration-300"
                            >
                                <button
                                    onClick={() => toggleFAQ(idx)}
                                    className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 font-heading font-bold text-base md:text-lg text-dn-navy hover:text-dn-orange transition-colors cursor-pointer"
                                    aria-expanded={isOpen}
                                >
                                    <span className="flex items-center gap-3">
                                        <HelpCircle size={18} className="text-dn-orange shrink-0" />
                                        <span>{faq.question}</span>
                                    </span>
                                    <ChevronDown
                                        size={20}
                                        className={`shrink-0 text-gray-400 transition-transform duration-300 ${
                                            isOpen ? "rotate-180 text-dn-orange" : ""
                                        }`}
                                    />
                                </button>

                                {isOpen && (
                                    <div className="px-5 pb-6 md:px-6 pt-0 text-gray-600 text-sm md:text-base leading-relaxed border-t border-gray-100 mt-2 font-body">
                                        <p className="pt-3">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Contact CTA */}
                <div className="mt-12 text-center p-6 bg-white rounded-2xl border border-gray-200 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p>
                        Have a specific question about your upcoming trip to Sri Lanka?
                    </p>
                    <a
                        href="https://api.whatsapp.com/send/?phone=94779452473&text=Hello%20DN%20Tours!%20I%20have%20a%20question%20about%20traveling%20in%20Sri%20Lanka."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold text-xs shrink-0 transition-colors"
                    >
                        <MessageCircle size={16} />
                        Ask via WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
