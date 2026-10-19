"use client";
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import type { Swiper as SwiperType } from "swiper";
import { Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import SwipeHandMark from "@/components/ui/SwipeHandMark";
import clsx from "clsx";

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
    const [showSwipeHint, setShowSwipeHint] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        let isMounted = true;

        // Auto-dismiss the swipe indicator after 5 seconds
        const timer = setTimeout(() => {
            if (isMounted) {
                setShowSwipeHint(false);
            }
        }, 5000);

        // Fetch videos
        const fetchVideos = async () => {
            try {
                const res = await fetch('/api/vibe-videos');
                const data = await res.json();
                if (isMounted && data && data.length > 0) {
                    const videoUrls = data.map((video: VibeVideo) => video.video_url);
                    setVideoFiles(videoUrls);
                }
            } catch {
                console.log("Using fallback videos");
            }
        };

        fetchVideos();

        return () => {
            isMounted = false;
            clearTimeout(timer);
        };
    }, []);

    const dismissSwipeHint = () => {
        if (showSwipeHint) {
            setShowSwipeHint(false);
        }
    };

    const handleVideoEnd = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };

    const handleSlideChange = (swiper: SwiperType) => {
        setActiveIndex(swiper.activeIndex);
        dismissSwipeHint();
    };

    const toggleMute = () => setIsMuted(!isMuted);

    const slidePrev = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
            dismissSwipeHint();
        }
    };

    const slideNext = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
            dismissSwipeHint();
        }
    };

    return (
        <section
            id="feel-the-vibe"
            className="py-20 md:py-28 bg-[#F8FAFC] overflow-hidden relative scroll-mt-20 border-t border-b border-slate-200/60"
        >
            {/* Subtle brand ambient accents */}
            <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#0D9488]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#0D9488]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 text-center mb-8 px-4">
                <span className="text-xs uppercase tracking-widest font-bold text-[#0D9488] bg-[#0D9488]/10 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-3">
                    Real Moments
                </span>

                <h2 className="font-heading font-bold text-3xl md:text-5xl text-[#0F172A] mb-3">
                    Feel the <span className="text-[#FF6A2A]">Vibe</span>
                </h2>
                <p className="text-slate-600 font-body text-base md:text-lg max-w-xl mx-auto">
                    Short clips from actual journeys across Sri Lanka waterfalls, wildlife, temple bells &amp; coastlines.
                </p>

                {/* Controls Bar */}
                <div className="flex items-center justify-center gap-3 mt-6">
                    <button
                        onClick={slidePrev}
                        disabled={activeIndex === 0}
                        className={clsx(
                            "w-11 h-11 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center transition-all cursor-pointer",
                            activeIndex === 0 ? "opacity-40 cursor-not-allowed text-slate-300" : "text-[#0B1B2B] hover:bg-[#0D9488] hover:text-white hover:border-[#0D9488]"
                        )}
                        aria-label="Previous video"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <button
                        onClick={toggleMute}
                        className="px-5 py-2.5 rounded-full bg-white border border-slate-200 shadow-md inline-flex items-center gap-2 text-[#0B1B2B] text-sm font-semibold hover:bg-slate-50 transition cursor-pointer"
                    >
                        {isMuted ? <VolumeX size={16} className="text-[#FF6A2A]" /> : <Volume2 size={16} className="text-[#0D9488]" />}
                        <span>{isMuted ? "Unmute Sound" : "Mute Sound"}</span>
                    </button>

                    <button
                        onClick={slideNext}
                        disabled={activeIndex === videoFiles.length - 1}
                        className={clsx(
                            "w-11 h-11 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center transition-all cursor-pointer",
                            activeIndex === videoFiles.length - 1 ? "opacity-40 cursor-not-allowed text-slate-300" : "text-[#0B1B2B] hover:bg-[#0D9488] hover:text-white hover:border-[#0D9488]"
                        )}
                        aria-label="Next video"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
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
                        depth: 140,
                        modifier: 2.2,
                        slideShadows: false,
                    }}
                    mousewheel={{ forceToAxis: true }}
                    modules={[EffectCoverflow, Mousewheel]}
                    className="tiktok-swiper py-6 w-full"
                    onSwiper={(swiper) => swiperRef.current = swiper}
                    onSlideChange={handleSlideChange}
                    onTouchStart={dismissSwipeHint}
                    onSliderMove={dismissSwipeHint}
                >
                    {videoFiles.map((src, index) => (
                        <SwiperSlide key={index} className="!w-[280px] !h-[500px] sm:!w-[340px] sm:!h-[600px]">
                            {/* 9:16 Aspect Ratio */}
                            {({ isActive }) => (
                                <VideoCard
                                    src={src}
                                    isActive={isActive}
                                    onEnded={handleVideoEnd}
                                    isMuted={isMuted}
                                    showSwipeIndicator={index === 0 && showSwipeHint}
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
};

const VideoCard = ({
    src,
    isActive,
    onEnded,
    isMuted,
    showSwipeIndicator = false,
}: {
    src: string;
    isActive: boolean;
    onEnded: () => void;
    isMuted: boolean;
    showSwipeIndicator?: boolean;
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (isActive) {
            const playPromise = videoRef.current?.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Autoplay prevented by browser policy
                });
            }
            if (videoRef.current) videoRef.current.currentTime = 0;
        } else {
            videoRef.current?.pause();
        }
    }, [isActive]);

    return (
        <div className={clsx(
            "w-full h-full relative bg-[#0B1B2B] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 border-4",
            isActive ? "scale-100 border-[#0D9488] shadow-[#0D9488]/20" : "scale-90 border-transparent opacity-40 blur-[1px]"
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
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 pointer-events-none" />

            {/* Transparent animated swipe gesture indicator over first video only */}
            <div
                className={clsx(
                    "absolute inset-x-0 top-[55%] -translate-y-1/2 flex items-center justify-center pointer-events-none z-30 transition-opacity duration-700 ease-out text-white",
                    showSwipeIndicator ? "opacity-100" : "opacity-0"
                )}
                aria-hidden="true"
            >
                <SwipeHandMark
                    size={70}
                />
            </div>
        </div>
    );
};

export default TikTokFeed;
