"use client";
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import clsx from "clsx";
import type { Swiper as SwiperType } from "swiper";
import { Volume2, VolumeX } from "lucide-react";

// Fallback videos
const fallbackVideoFiles = [
    "/videos/2.mp4", "/videos/3.mp4", "/videos/4.mp4",
    "/videos/5.mp4", "/videos/6.mp4", "/videos/7.mp4",
    "/videos/8.mp4", "/videos/9.mp4", "/videos/10.mp4",
    "/videos/11.mp4", "/videos/12.mp4", "/videos/13.mp4",
    "/videos/14.mp4", "/videos/15.mp4", "/videos/16.mp4", 
    "/videos/17.mp4", "/videos/18.mp4","/videos/19.mp4", 
    "/videos/20.mp4"
];

interface VibeVideo {
    id: string;
    title: string;
    video_url: string;
    duration: number;
}

const TikTokFeed = () => {
    const swiperRef = useRef<SwiperType | null>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [videoFiles, setVideoFiles] = useState<string[]>(fallbackVideoFiles);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/immutability
        fetchVibeVideos();
    }, []);

    const fetchVibeVideos = async () => {
        try {
            const res = await fetch('/api/vibe-videos');
            const data = await res.json();
            if (data && data.length > 0) {
                const videoUrls = data.map((video: VibeVideo) => video.video_url);
                setVideoFiles(videoUrls);
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            console.log("Using fallback videos");
        }
    };

    const handleVideoEnd = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };

    const toggleMute = () => setIsMuted(!isMuted);

    return (
        <section id="experience" className="py-20 bg-dn-navy overflow-hidden relative">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-dn-ocean/20 via-dn-navy to-dn-navy z-0 pointer-events-none"></div>

            <div className="relative z-10 text-center mb-8 px-4">
                <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-2">
                    Feel the <span className="text-dn-orange">Vibe</span>
                </h2>
                <p className="text-gray-400 font-body">Swipe to explore the moments</p>

                <button
                    onClick={toggleMute}
                    className="mt-4 px-4 py-2 rounded-full glass inline-flex items-center gap-2 text-white text-sm hover:bg-white/10 transition"
                >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    {isMuted ? "Unmute Videos" : "Mute Videos"}
                </button>
            </div>

            <div className="relative z-10 w-full max-w-full">
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 150,
                        modifier: 2.5,
                        slideShadows: false,
                    }}
                    mousewheel={{ forceToAxis: true }}
                    modules={[EffectCoverflow, Mousewheel]}
                    className="tiktok-swiper py-10 w-full"
                    onSwiper={(swiper) => swiperRef.current = swiper}
                >
                    {videoFiles.map((src, index) => (
                        <SwiperSlide key={index} className="!w-[300px] !h-[533px] sm:!w-[360px] sm:!h-[640px]">
                            {/* 9:16 Aspect Ratio approx */}
                            {({ isActive }) => (
                                <VideoCard
                                    src={src}
                                    isActive={isActive}
                                    onEnded={handleVideoEnd}
                                    isMuted={isMuted}
                                />
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Styles for Swiper Container to allow overflow visible for effect */}
            <style jsx global>{`
              .tiktok-swiper {
                  overflow: visible !important;
              }
              .tiktok-swiper .swiper-wrapper {
                  align-items: center;
              }
            `}</style>
        </section>
    );
}

const VideoCard = ({ src, isActive, onEnded, isMuted }: { src: string, isActive: boolean, onEnded: () => void, isMuted: boolean }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (isActive) {
            const playPromise = videoRef.current?.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Autoplay prevented:", error);
                });
            }
            if (videoRef.current) videoRef.current.currentTime = 0;
        } else {
            videoRef.current?.pause();
        }
    }, [isActive]);

    return (
        <div className={clsx(
            "w-full h-full relative bg-black rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 border-4",
            isActive ? "scale-100 border-dn-orange/50 shadow-dn-orange/20" : "scale-90 border-transparent opacity-40 blur-[2px]"
        )}>
            <video
                ref={videoRef}
                src={src}
                className="w-full h-full object-cover"
                muted={isMuted}
                playsInline
                preload={isActive ? "auto" : "metadata"}
                onEnded={onEnded}
            />
            {/* Gradient Overlay for text readability if we add text later */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />
        </div>
    )
}

export default TikTokFeed;
