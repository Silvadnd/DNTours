import React from "react";
import { ShieldCheck, Smile, Lock, MapPin, Calendar, Heart } from "lucide-react";

const features = [
    { icon: ShieldCheck, title: "Trustworthy Guides", desc: "Licensed & experienced professionals committed to excellence." },
    { icon: Smile, title: "Friendly Service", desc: "We treat you like family, ensuring a warm and welcomging vibe." },
    { icon: Lock, title: "Safe Travel", desc: "Your safety is our top priority, with well-maintained vehicles and support." },
    { icon: MapPin, title: "Local Expertise", desc: "Access to hidden gems and authentic experiences only locals know." },
    { icon: Calendar, title: "Stress-Free Planning", desc: "We handle all the details so you can relax and enjoy the ride." },
    { icon: Heart, title: "Passion Driven", desc: "We love showing the beauty of our country to the world." },
];

const WhyChooseUs = () => {
    return (
        <section className="py-20 bg-dn-navy text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">Why Choose <span className="text-dn-orange">DN Tours</span>?</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">We go the extra mile to ensure your Sri Lankan adventure is perfect in every way.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-8 rounded-3xl bg-white/5 border border-dn-navy hover:bg-white/10 transition-colors group">
                            <div className="w-14 h-14 bg-dn-orange/20 rounded-2xl flex items-center justify-center mb-6 text-dn-orange group-hover:scale-110 transition-transform">
                                <feature.icon size={32} />
                            </div>
                            <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
