/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Share2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Memory {
    id: string;
    user: string;
    location: string;
    avatar: string;
    media: string;
    type: string;
    likes: number;
    caption: string;
    comments: number;
}

// Fallback data
const fallbackMemoryPosts = [
    { id: "1", user: "jessica_travels", location: "Ella, Sri Lanka", avatar: "/images/ui/1.jpeg", media: "/images/ui/2.jpeg", type: "image", likes: 1240, caption: "Morning views like this! 😍 #Ella #SriLanka", comments: 45 },
    { id: "2", user: "david_explores", location: "Sigiriya", avatar: "/images/ui/3.jpeg", media: "/videos/2.mp4", type: "video", likes: 856, caption: "Climbing the Lion Rock was tough but worth it. 💪", comments: 23 },
    { id: "3", user: "family_trip_2024", location: "Mirissa Beach", avatar: "/images/ui/4.jpeg", media: "/images/ui/5.jpeg", type: "image", likes: 2300, caption: "Sunset waves 🌊", comments: 89 },
    { id: "4", user: "wanderlust_couple", location: "Kandy", avatar: "/images/ui/6.jpeg", media: "/images/ui/7.jpeg", type: "image", likes: 540, caption: "Cultural vibes at the Temple of the Tooth.", comments: 12 },
    { id: "5", user: "solo_backpacker", location: "Nuwara Eliya", avatar: "/images/ui/8.jpeg", media: "/videos/3.mp4", type: "video", likes: 120, caption: "Collecting memories, not things.", comments: 5 },
    { id: "6", user: "wild_safari", location: "Yala National Park", avatar: "/images/ui/9.jpeg", media: "/images/ui/10.jpeg", type: "image", likes: 3200, caption: "Leopard spotting! 🐆 #Yala", comments: 156 },
];

export default function MemoryPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [memoryPosts, setMemoryPosts] = useState<Memory[]>(fallbackMemoryPosts);
    const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
    const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());
    const [showHeart, setShowHeart] = useState<string | null>(null);
    const [showComments, setShowComments] = useState<string | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [userPhotos, setUserPhotos] = useState<string[]>([]);
    const [showShareMenu, setShowShareMenu] = useState<string | null>(null);

    const fetchMemories = async () => {
        try {
            const res = await fetch('/api/memories');
            const data = await res.json();
            if (data && data.length > 0) {
                const formattedData = data.map((item: { 
                    id: string; 
                    caption: string; 
                    location: string; 
                    type: string;
                    likes_count: number; 
                    comments_count: number; 
                    users?: { name: string; avatar_url?: string }; 
                    memory_media?: Array<{ media_url: string }> 
                }) => ({
                    id: item.id,
                    user: item.users?.name || "Anonymous",
                    location: item.location || "",
                    avatar: item.users?.avatar_url || "/images/logo/DNlogo.png",
                    media: item.memory_media?.[0]?.media_url || "/images/logo/DNlogo.png",
                    type: item.type || "image",
                    likes: item.likes_count || 0,
                    caption: item.caption,
                    comments: item.comments_count || 0
                }));
                setMemoryPosts(formattedData);
            }
        } catch (error: unknown) {
            console.log("Using fallback memories", error);
        }
    };

    useEffect(() => {
        fetchMemories();
    }, []);

    const filteredPosts = memoryPosts.filter(post =>
        post.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleLike = (postId: string) => {
        setLikedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) {
                newSet.delete(postId);
            } else {
                newSet.add(postId);
            }
            return newSet;
        });
    };

    const toggleSave = (postId: string) => {
        setSavedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) {
                newSet.delete(postId);
            } else {
                newSet.add(postId);
            }
            return newSet;
        });
    };

    const handleDoubleTap = (postId: string) => {
        if (!likedPosts.has(postId)) {
            toggleLike(postId);
        }
        setShowHeart(postId);
        setTimeout(() => setShowHeart(null), 1000);
    };

    const handleShare = (platform: string, post: Memory) => {
        const shareUrl = `https://dntours.lk/memory/${post.id}`;
        const shareText = `Check out this amazing moment from ${post.location}! ${post.caption}`;
        
        let url = '';
        switch (platform) {
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
                break;
            case 'twitter':
                url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
                break;
            case 'whatsapp':
                url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
                break;
            case 'linkedin':
                url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
                break;
            case 'copy':
                navigator.clipboard.writeText(shareUrl);
                alert('Link copied to clipboard!');
                setShowShareMenu(null);
                return;
        }
        
        if (url) {
            window.open(url, '_blank', 'width=600,height=400');
            setShowShareMenu(null);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-gray-50">
            <div className="max-w-md mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="font-heading font-bold text-3xl text-dn-navy">DN Your Memory</h1>
                    <p className="text-gray-500 text-sm">Moments captured by our travelers.</p>
                </div>

                {/* Search */}
                <div className="relative mb-8">
                    <input
                        type="text"
                        placeholder="Search by user or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-none shadow-lg focus:outline-none focus:ring-2 focus:ring-dn-orange/50 bg-white"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>

                {/* Feed */}
                <div className="space-y-8">
                    {filteredPosts.map(post => (
                        <div key={post.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden relative border border-gray-200">
                                        <Image src={post.avatar} alt={post.user} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-dn-navy">{post.user}</p>
                                        <p className="text-xs text-gray-500">{post.location}</p>
                                    </div>
                                </div>
                                <MoreHorizontal size={20} className="text-gray-400" />
                            </div>

                            {/* Media with Double Tap */}
                            <div 
                                className="relative aspect-square md:aspect-4/5 bg-black cursor-pointer"
                                onDoubleClick={() => handleDoubleTap(post.id)}
                            >
                                {post.type === "video" ? (
                                    <video
                                        src={post.media}
                                        controls={false}
                                        className="w-full h-full object-cover"
                                        autoPlay={true}
                                        muted={true}
                                        loop
                                        playsInline
                                    />
                                ) : (
                                    <Image src={post.media} alt={post.caption} fill className="object-cover" />
                                )}
                                
                                {/* Double Tap Heart Animation */}
                                <AnimatePresence>
                                    {showHeart === post.id && (
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1.2, opacity: 1 }}
                                            exit={{ scale: 1.5, opacity: 0 }}
                                            transition={{ duration: 0.6 }}
                                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                        >
                                            <Heart size={100} className="text-white fill-white drop-shadow-2xl" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Actions */}
                            <div className="p-4">
                                <div className="flex justify-between mb-3">
                                    <div className="flex gap-4">
                                        <Heart 
                                            size={24} 
                                            className={`cursor-pointer transition-all ${
                                                likedPosts.has(post.id) 
                                                    ? 'text-red-500 fill-red-500' 
                                                    : 'hover:text-red-500'
                                            }`}
                                            onClick={() => toggleLike(post.id)}
                                        />
                                        <MessageCircle 
                                            size={24} 
                                            className="cursor-pointer hover:text-dn-orange transition-colors" 
                                            onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                                        />
                                        <div className="relative">
                                            <Send 
                                                size={24} 
                                                className="cursor-pointer hover:text-dn-orange transition-colors" 
                                                onClick={() => setShowShareMenu(showShareMenu === post.id ? null : post.id)}
                                            />
                                            
                                            {/* Share Menu */}
                                            <AnimatePresence>
                                                {showShareMenu === post.id && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.8, y: -10 }}
                                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                                        exit={{ opacity: 0, scale: 0.8, y: -10 }}
                                                        className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 min-w-60 z-50"
                                                    >
                                                        <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
                                                            <p className="text-xs font-bold text-gray-600">Share to</p>
                                                            <X 
                                                                size={16} 
                                                                className="cursor-pointer text-gray-400 hover:text-gray-600" 
                                                                onClick={() => setShowShareMenu(null)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <button
                                                                onClick={() => handleShare('facebook', post)}
                                                                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors text-left"
                                                            >
                                                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                                                    <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                                                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                                                    </svg>
                                                                </div>
                                                                <span className="text-sm font-medium">Facebook</span>
                                                            </button>
                                                            <button
                                                                onClick={() => handleShare('twitter', post)}
                                                                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-sky-50 transition-colors text-left"
                                                            >
                                                                <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
                                                                    <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                                                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                                                    </svg>
                                                                </div>
                                                                <span className="text-sm font-medium">Twitter</span>
                                                            </button>
                                                            <button
                                                                onClick={() => handleShare('whatsapp', post)}
                                                                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 transition-colors text-left"
                                                            >
                                                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                                                    <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                                                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                                                    </svg>
                                                                </div>
                                                                <span className="text-sm font-medium">WhatsApp</span>
                                                            </button>
                                                            <button
                                                                onClick={() => handleShare('linkedin', post)}
                                                                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors text-left"
                                                            >
                                                                <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                                                                    <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                                                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                                                    </svg>
                                                                </div>
                                                                <span className="text-sm font-medium">LinkedIn</span>
                                                            </button>
                                                            <button
                                                                onClick={() => handleShare('copy', post)}
                                                                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors text-left"
                                                            >
                                                                <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                                                                    <Share2 size={16} color="white" />
                                                                </div>
                                                                <span className="text-sm font-medium">Copy Link</span>
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                    <Bookmark 
                                        size={24} 
                                        className={`cursor-pointer transition-all ${
                                            savedPosts.has(post.id) 
                                                ? 'fill-dn-navy text-dn-navy' 
                                                : 'hover:text-dn-navy'
                                        }`}
                                        onClick={() => toggleSave(post.id)}
                                    />
                                </div>
                                <p className="font-bold text-sm mb-2">
                                    {(post.likes + (likedPosts.has(post.id) ? 1 : 0)).toLocaleString()} likes
                                </p>
                                <p className="text-sm">
                                    <span className="font-bold mr-2">{post.user}</span>
                                    {post.caption}
                                </p>
                                {post.comments > 0 && (
                                    <p 
                                        className="text-xs text-gray-400 mt-2 cursor-pointer hover:text-gray-600"
                                        onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                                    >
                                        View all {post.comments} comments
                                    </p>
                                )}
                                <p className="text-xs text-gray-400 mt-2 uppercase">2 days ago</p>
                                
                                {/* Comment Input */}
                                {showComments === post.id && (
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Add a comment..."
                                                className="flex-1 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-dn-orange/50 text-sm"
                                            />
                                            <button className="px-4 py-2 bg-dn-orange text-white rounded-full text-sm font-semibold hover:bg-dn-orange/90 transition-colors">
                                                Post
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {filteredPosts.length === 0 && (
                        <div className="text-center py-20 text-gray-400">
                            No memories found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
