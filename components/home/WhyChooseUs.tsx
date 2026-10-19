import React from "react";
import { ShieldCheck, Smile, Lock, MapPin, Calendar, Heart } from "lucide-react";

const features = [
    { icon: ShieldCheck, title: "Trustworthy Guides", desc: "Licensed & experienced professionals committed to excellence." },
    { icon: Smile, title: "Friendly Service", desc: "We treat you like family, ensuring a warm and welcoming vibe." },
    { icon: Lock, title: "Safe Travel", desc: "Your safety is our top priority, with well-maintained vehicles and support." },
    { icon: MapPin, title: "Local Expertise", desc: "Access to hidden gems and authentic experiences only locals know." },
    { icon: Calendar, title: "Stress-Free Planning", desc: "We handle all the details so you can relax and enjoy the ride." },
    { icon: Heart, title: "Passion Driven", desc: "We love showing the beauty of our country to the world." },
];

const WhyChooseUs = () => {
    return (
        <section id="why-choose-us" className="py-20 md:py-28 bg-white relative overflow-hidden scroll-mt-20 border-t border-slate-200/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 space-y-3">
                    <span className="text-xs uppercase tracking-widest font-bold text-[#0D9488] bg-[#0D9488]/10 px-4 py-1.5 rounded-full inline-block">
                        Why Travel With Us
                    </span>
                    <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#0F172A]">
                        Why Choose <span className="text-[#FF6A2A]">DN Tours</span>?
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
                        We go the extra mile to ensure your Sri Lankan journey is safe, authentic, and seamless in every way.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-8 rounded-3xl bg-white border border-[#E5E0D8]/80 shadow-xs hover:shadow-md hover:border-[#0D9488]/40 transition-all duration-300 group flex flex-col justify-between"
                        >
                            <div>
                                <div className="w-14 h-14 bg-[#0D9488]/10 rounded-2xl flex items-center justify-center mb-6 text-[#0D9488] group-hover:scale-110 group-hover:bg-[#0D9488] group-hover:text-white transition-all duration-300">
                                    <feature.icon size={28} />
                                </div>
                                <h3 className="font-heading font-bold text-xl text-[#0B1B2B] mb-2">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm md:text-base">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
