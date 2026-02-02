"use client";
import React from "react";
import Button from "../ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
    return (
        <section 
            className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-cover bg-center bg-no-repeat bg-dn-navy"
        >
            {/* Background Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover z-0"
                style={{ display: 'block' }}
            >
                <source src="/videos/hero.mp4" type="video/mp4" />
            </video>

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
                <motion.h1
                    className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight drop-shadow-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Discover the Soul of <br />
                    <span className="text-dn-orange">Sri Lanka</span>
                </motion.h1>

                <motion.p
                    className="font-body text-gray-100 text-lg md:text-xl max-w-2xl mb-10 text-shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    Embark on a journey beyond the ordinary. Experience the culture, nature, and warmth of our island paradise with tours designed for you.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                    <Link href="#tours">
                        <Button variant="primary" size="lg" className="min-w-40">Explore Tours</Button>
                    </Link>
                    <Link href="/contact">
                        <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-dn-navy min-w-40">
                            Contact Us
                        </Button>
                    </Link>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                onClick={() => {
                    const nextSection = document.getElementById('experience');
                    nextSection?.scrollIntoView({ behavior: 'smooth' });
                }}
            >
                <div className="w-7.5 h-12.5 border-2 border-white/50 rounded-full flex justify-center p-2 backdrop-blur-sm">
                    <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
