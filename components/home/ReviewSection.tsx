"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Star, MessageSquare } from "lucide-react";
import Button from "../ui/Button";

interface Review {
    id: string;
    name: string;
    rating: number;
    tags: string[];
    message: string;
}

const fallbackReviews = [
    { id: "1", name: "Sarah Jenkins", rating: 5, tags: ["Friendly", "Adventure"], message: "The best tour guide we could ask for! Took us to hidden waterfalls we never would have found alone." },
    { id: "2", name: "Mike T.", rating: 5, tags: ["Safe Travel", "Local Expert"], message: "Felt incredibly safe and well taken care of. 10/10 recommendation." },
    { id: "3", name: "Emily & John", rating: 4, tags: ["Comfortable", "Flexible"], message: "Loved how flexible the itinerary was. We changed plans mid-trip and it was no problem." },
    { id: "4", name: "David L.", rating: 5, tags: ["Trustworthy", "Fun"], message: "Driving was excellent, very smooth. Great conversation and food tips!" },
];

const ReviewSection = () => {
    const [formOpen, setFormOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [reviews, setReviews] = useState<Review[]>(fallbackReviews);
    const [formData, setFormData] = useState({ name: "", rating: 5, message: "", tags: [] as string[] });

    const availableTags = ["Friendly", "Adventure", "Safe Travel", "Local Expert", "Comfortable", "Flexible", "Trustworthy", "Fun", "Professional", "Punctual"];

    useEffect(() => {
        // eslint-disable-next-line react-hooks/immutability
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const res = await fetch('/api/reviews');
            const data = await res.json();
            if (data && data.length > 0) {
                setReviews(data);
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            console.log("Using fallback reviews");
        }
    };

    const toggleTag = (tag: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.includes(tag) 
                ? prev.tags.filter(t => t !== tag)
                : [...prev.tags, tag].slice(0, 3) // Max 3 tags
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        
        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    rating: formData.rating,
                    message: formData.message,
                    tags: formData.tags
                })
            });
            
            if (res.ok) {
                setSubmitted(true);
                setFormData({ name: "", rating: 5, message: "", tags: [] });
                setTimeout(() => {
                    setFormOpen(false);
                    setSubmitted(false);
                }, 3000);
            } else {
                const error = await res.json();
                alert("Error: " + error.error);
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Failed to submit review. Please try again.");
        }
        
        setSubmitting(false);
    };

    return (
        <section id="reviews" className="py-20 md:py-28 bg-[#F8FAFC] relative overflow-hidden scroll-mt-20 border-t border-slate-200/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 space-y-3">
                    <span className="text-xs uppercase tracking-widest font-bold text-[#0D9488] bg-[#0D9488]/10 px-4 py-1.5 rounded-full inline-block">
                        Verified Traveler Feedback
                    </span>
                    <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#0F172A]">
                        Stories from <span className="text-[#FF6A2A]">Travelers</span>
                    </h2>
                    <p className="text-slate-600 max-w-xl mx-auto text-base md:text-lg">
                        Genuine feedback from international visitors who explored Sri Lanka with DN Tours Ahungalla.
                    </p>
                </div>

                {/* Form */}
                {formOpen && (
                    <div className="mb-12 p-8 bg-dn-bg rounded-3xl border border-gray-100 shadow-inner animate-in fade-in slide-in-from-top-4">
                        {submitted ? (
                            <div className="text-center py-8">
                                <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Star fill="currentColor" />
                                </div>
                                <h3 className="text-2xl font-bold text-dn-navy">Thank You!</h3>
                                <p className="text-gray-600">Your review has been submitted and is pending approval.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
                                <h3 className="text-xl font-bold mb-4">Share your experience</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input 
                                        type="text" 
                                        placeholder="Your Name" 
                                        required 
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-dn-orange/50" 
                                    />
                                    <select 
                                        value={formData.rating}
                                        onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-dn-orange/50"
                                        aria-label="Select rating"
                                    >
                                        <option value="5">5 Stars - Excellent</option>
                                        <option value="4">4 Stars - Good</option>
                                        <option value="3">3 Stars - Average</option>
                                        <option value="2">2 Stars - Below Average</option>
                                        <option value="1">1 Star - Poor</option>
                                    </select>
                                </div>
                                
                                {/* Tags Selection */}
                                <div>
                                    <p className="text-sm text-gray-600 mb-2">Select up to 3 tags that describe your experience:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {availableTags.map(tag => (
                                            <button
                                                key={tag}
                                                type="button"
                                                onClick={() => toggleTag(tag)}
                                                className={`px-3 py-1 rounded-full text-sm transition-all ${
                                                    formData.tags.includes(tag)
                                                        ? "bg-dn-orange text-white"
                                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                }`}
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                <textarea 
                                    rows={4} 
                                    placeholder="Tell us about your experience with DN Tours..." 
                                    required 
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-dn-orange/50"
                                ></textarea>
                                <Button type="submit" variant="primary" className="w-full" disabled={submitting}>
                                    {submitting ? "Submitting..." : "Submit Review"}
                                </Button>
                            </form>
                        )}
                    </div>
                )}

                {/* Slider */}
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    autoplay={{ delay: 7000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                    modules={[Autoplay, Pagination]}
                    className="pb-12"
                >
                    {reviews.map((review) => (
                        <SwiperSlide key={review.id} className="h-full">
                            <div className="h-full p-8 bg-white rounded-3xl border border-[#E5E0D8]/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                                <div>
                                    <div className="flex gap-1 mb-4" aria-label={`${review.rating} out of 5 stars`}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className={i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-slate-600 mb-6 italic text-sm md:text-base leading-relaxed min-h-20">&quot;{review.message}&quot;</p>
                                </div>
                                <div className="flex justify-between items-end pt-4 border-t border-slate-100">
                                    <div>
                                        <p className="font-heading font-bold text-[#0B1B2B]">{review.name}</p>
                                        {review.tags && review.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-2">
                                                {review.tags.map((tag, idx) => (
                                                    <span 
                                                        key={idx} 
                                                        className="text-xs px-2.5 py-0.5 bg-[#E8F5F1] border border-teal-100 rounded-full text-[#0D9488] font-medium"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-[#0D9488]/30">
                                        <MessageSquare size={36} />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Write Review Button */}
                <div className="flex justify-center mt-12">
                    <Button
                        variant="secondary"
                        onClick={() => setFormOpen(!formOpen)}
                    >
                        Write a Review
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default ReviewSection;
