"use client";
import React, { useState, useEffect, useCallback } from "react";
import { 
    Eye, EyeOff, Trash2, Check, X, Upload, Video, Image as ImageIcon, 
    Star, MessageSquare, Heart, MapPin, Clock, RefreshCw, Search,
    LayoutDashboard, Film, ChevronDown, LogOut, Bell,
    MoreVertical, Play, Pause, ChevronRight,
    Plus, CheckCircle2, XCircle, AlertCircle, Sparkles
} from "lucide-react";
import Image from "next/image";

// Types
interface Review {
    id: string;
    name: string;
    rating: number;
    message: string;
    tags: string[];
    status: string;
    created_at: string;
    avatar_url?: string;
}

interface Memory {
    id: string;
    caption: string;
    location: string;
    type: string;
    likes_count: number;
    comments_count: number;
    created_at: string;
    users?: { name: string };
    memory_media?: { media_url: string; media_type: string }[];
}

interface VibeVideo {
    id: string;
    title: string;
    video_url: string;
    duration: number;
    is_active: boolean;
    order_index: number;
    created_at: string;
}

// Animation wrapper component
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
    <div 
        className={`animate-fadeIn ${className}`}
        style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
        {children}
    </div>
);

// Stats Card Component
const StatCard = ({ icon: Icon, label, value, color, delay }: { 
    icon: React.ElementType; label: string; value: number | string; color: string; delay: number 
}) => (
    <FadeIn delay={delay} className="group">
        <div className="relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-transparent to-current opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" style={{ color }} />
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 shadow-lg" style={{ background: `linear-gradient(135deg, ${color}40, ${color}20)` }}>
                <Icon className="w-7 h-7" style={{ color }} />
            </div>
            <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
            <div className="flex items-end gap-2">
                <p className="text-3xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    </FadeIn>
);

// Review Card Component
const ReviewCard = ({ review, onApprove, onReject, onDelete, delay }: {
    review: Review; onApprove: () => void; onReject: () => void; onDelete: () => void; delay: number;
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showActions, setShowActions] = useState(false);

    const statusConfig = {
        pending: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', icon: AlertCircle },
        approved: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', icon: CheckCircle2 },
        rejected: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', icon: XCircle }
    };

    const status = statusConfig[review.status as keyof typeof statusConfig] || statusConfig.pending;
    const StatusIcon = status.icon;

    return (
        <FadeIn delay={delay}>
            <div className={`group relative bg-white/80 backdrop-blur-xl rounded-2xl border ${review.status === 'pending' ? 'border-amber-200 ring-2 ring-amber-100' : 'border-gray-100'} shadow-lg hover:shadow-xl transition-all duration-500`}>
                {/* Pending Badge */}
                {review.status === 'pending' && (
                    <div className="absolute -top-3 -right-3 z-10">
                        <span className="flex items-center gap-1 px-3 py-1.5 bg-linear-to-r from-amber-400 to-orange-400 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                            <Sparkles className="w-3 h-3" /> New Review
                        </span>
                    </div>
                )}

                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-14 h-14 rounded-full bg-linear-to-br from-dn-orange to-amber-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                    {review.name.charAt(0).toUpperCase()}
                                </div>
                                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${status.bg} ${status.border} border-2 flex items-center justify-center`}>
                                    <StatusIcon className={`w-3 h-3 ${status.text}`} />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">{review.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} 
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-400">
                                        {new Date(review.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <button 
                                onClick={() => setShowActions(!showActions)}
                                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                            >
                                <MoreVertical className="w-5 h-5 text-gray-400" />
                            </button>
                            
                            {showActions && (
                                <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 min-w-40 z-20">
                                    {review.status === 'pending' && (
                                        <>
                                            <button onClick={() => { onApprove(); setShowActions(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-emerald-50 text-emerald-600 transition-colors">
                                                <Check className="w-4 h-4" /> Approve
                                            </button>
                                            <button onClick={() => { onReject(); setShowActions(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-red-600 transition-colors">
                                                <X className="w-4 h-4" /> Reject
                                            </button>
                                        </>
                                    )}
                                    <button onClick={() => { onDelete(); setShowActions(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-red-600 transition-colors">
                                        <Trash2 className="w-4 h-4" /> Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Tags */}
                    {review.tags && review.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {review.tags.map((tag, idx) => (
                                <span key={idx} className="px-3 py-1.5 bg-linear-to-r from-dn-navy/5 to-dn-ocean/5 text-dn-navy text-xs font-medium rounded-full border border-dn-navy/10">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Message */}
                    <p className={`text-gray-600 leading-relaxed ${!isExpanded && 'line-clamp-3'}`}>
                        {review.message}
                    </p>
                    {review.message.length > 150 && (
                        <button 
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-dn-orange font-medium text-sm mt-2 hover:underline flex items-center gap-1"
                        >
                            {isExpanded ? 'Show less' : 'Read more'} 
                            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                    )}

                    {/* Quick Actions for Pending */}
                    {review.status === 'pending' && (
                        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                            <button
                                onClick={onApprove}
                                className="flex-1 flex items-center justify-center gap-2 py-3 bg-linear-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <Check className="w-5 h-5" /> Approve
                            </button>
                            <button
                                onClick={onReject}
                                className="flex-1 flex items-center justify-center gap-2 py-3 bg-linear-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <X className="w-5 h-5" /> Reject
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </FadeIn>
    );
};

// Memory Card Component
const MemoryCard = ({ memory, onDelete, delay }: { memory: Memory; onDelete: () => void; delay: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    const mediaUrl = memory.memory_media?.[0]?.media_url;
    const mediaType = memory.memory_media?.[0]?.media_type;

    return (
        <FadeIn delay={delay}>
            <div 
                className="group relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Media */}
                <div className="aspect-square relative bg-linear-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {mediaUrl ? (
                        mediaType === "image" ? (
                            <Image 
                                src={mediaUrl} 
                                alt={memory.caption} 
                                fill 
                                className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`} 
                            />
                        ) : (
                            <video 
                                src={mediaUrl} 
                                className="w-full h-full object-cover"
                                muted
                                loop
                                playsInline
                                onMouseEnter={(e) => e.currentTarget.play()}
                                onMouseLeave={(e) => e.currentTarget.pause()}
                            />
                        )
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="w-16 h-16 text-gray-300" />
                        </div>
                    )}

                    {/* Overlay */}
                    <div className={`absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-white font-bold text-lg mb-1">{memory.users?.name || "Anonymous"}</p>
                            <p className="text-white/80 text-sm flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {memory.location}
                            </p>
                        </div>
                    </div>

                    {/* Media Type Badge */}
                    {mediaType === 'video' && (
                        <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg flex items-center gap-1">
                            <Play className="w-3 h-3 text-white fill-white" />
                            <span className="text-white text-xs font-medium">Video</span>
                        </div>
                    )}

                    {/* Delete Button */}
                    <button
                        onClick={onDelete}
                        className={`absolute top-3 right-3 p-2 bg-red-500 text-white rounded-xl transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'} hover:bg-red-600 hover:scale-110`}
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4">
                    <p className="text-gray-700 text-sm line-clamp-2 mb-3">{memory.caption}</p>
                    <div className="flex items-center justify-between text-gray-400 text-sm">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4 text-red-400 fill-red-400" /> {memory.likes_count}
                            </span>
                            <span className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" /> {memory.comments_count}
                            </span>
                        </div>
                        <span className="text-xs">
                            {new Date(memory.created_at).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>
        </FadeIn>
    );
};

// Video Card Component
const VideoCard = ({ video, onToggle, onDelete, delay }: { 
    video: VibeVideo; onToggle: () => void; onDelete: () => void; delay: number 
}) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <FadeIn delay={delay}>
            <div className="group relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
                {/* Video */}
                <div className="aspect-9/16 relative bg-linear-to-br from-gray-900 to-gray-800 overflow-hidden">
                    <video 
                        src={video.video_url} 
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onClick={(e) => {
                            if (e.currentTarget.paused) e.currentTarget.play();
                            else e.currentTarget.pause();
                        }}
                    />

                    {/* Play/Pause Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        {isPlaying ? (
                            <Pause className="w-16 h-16 text-white/90" />
                        ) : (
                            <Play className="w-16 h-16 text-white/90 fill-white/90" />
                        )}
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg flex items-center gap-1">
                        <Clock className="w-3 h-3 text-white" />
                        <span className="text-white text-xs font-medium">{video.duration}s</span>
                    </div>

                    {/* Active Badge */}
                    <div className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-bold ${video.is_active ? 'bg-emerald-500 text-white' : 'bg-gray-500 text-white'}`}>
                        {video.is_active ? 'Active' : 'Inactive'}
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-3 line-clamp-1">{video.title}</h3>
                    <div className="flex gap-2">
                        <button
                            onClick={onToggle}
                            className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                                video.is_active 
                                    ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {video.is_active ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                            onClick={onDelete}
                            className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </FadeIn>
    );
};

// Modern Modal Component
const Modal = ({ isOpen, onClose, title, children }: { 
    isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode 
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden animate-slideUp">
                {/* Header */}
                <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                    <h3 className="font-bold text-xl text-gray-900">{title}</h3>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                    {children}
                </div>
            </div>
        </div>
    );
};

// Main Admin Dashboard
export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [activeTab, setActiveTab] = useState<"overview" | "reviews" | "memories" | "videos">("overview");
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("all");
    
    // Data states
    const [reviews, setReviews] = useState<Review[]>([]);
    const [memories, setMemories] = useState<Memory[]>([]);
    const [vibeVideos, setVibeVideos] = useState<VibeVideo[]>([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    
    // Upload states
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadType, setUploadType] = useState<"review" | "memory" | "video">("review");
    const [uploading, setUploading] = useState(false);
    
    // Form states
    const [newReview, setNewReview] = useState({ name: "", rating: 5, message: "", tags: [] as string[] });
    const [newMemory, setNewMemory] = useState({ userName: "", caption: "", location: "", mediaFiles: [] as File[] });
    const [newVideo, setNewVideo] = useState({ title: "", videoFile: null as File | null });

    // Available tags for reviews
    const availableTags = ["Amazing Guide", "Great Value", "Beautiful Views", "Friendly Service", "Well Organized", "Memorable Experience", "Cultural Immersion", "Adventurous", "Family Friendly", "Highly Recommend"];

    const loadReviews = useCallback(async () => {
        try {
            const response = await fetch('/api/admin/reviews');
            const data = await response.json();
            if (response.ok) setReviews(data);
        } catch (error) {
            console.error('Error loading reviews:', error);
        }
    }, []);

    const loadMemories = useCallback(async () => {
        try {
            const response = await fetch('/api/memories');
            const data = await response.json();
            if (response.ok) setMemories(data);
        } catch (error) {
            console.error('Error loading memories:', error);
        }
    }, []);

    const loadVibeVideos = useCallback(async () => {
        try {
            const response = await fetch('/api/admin/vibe-videos');
            const data = await response.json();
            if (response.ok) setVibeVideos(data);
        } catch (error) {
            console.error('Error loading videos:', error);
        }
    }, []);

    const loadData = useCallback(async () => {
        setLoading(true);
        await Promise.all([loadReviews(), loadMemories(), loadVibeVideos()]);
        setLoading(false);
    }, [loadReviews, loadMemories, loadVibeVideos]);

    // Check authentication
    useEffect(() => {
        const authStatus = localStorage.getItem("adminAuth");
        if (authStatus === "true") {
            setIsAuthenticated(true);
            loadData();
        }
    }, [loadData]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === process.env.NEXT_PUBLIC_ADMIN_EMAIL || email === "admin@dntours.lk") {
            if (password === "DNTours@Admin2026") {
                setIsAuthenticated(true);
                localStorage.setItem("adminAuth", "true");
                loadData();
            } else {
                alert("Invalid password");
            }
        } else {
            alert("Invalid email");
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("adminAuth");
    };

    const refreshData = async () => {
        setRefreshing(true);
        await loadData();
        setTimeout(() => setRefreshing(false), 500);
    };

    // Review actions
    const approveReview = async (id: string) => {
        await fetch('/api/reviews', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status: "approved" })
        });
        loadReviews();
    };

    const rejectReview = async (id: string) => {
        await fetch('/api/reviews', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status: "rejected" })
        });
        loadReviews();
    };

    const deleteReview = async (id: string) => {
        if (confirm("Are you sure you want to delete this review?")) {
            await fetch(`/api/reviews?id=${id}`, { method: 'DELETE' });
            loadReviews();
        }
    };

    const deleteMemory = async (id: string) => {
        if (confirm("Are you sure you want to delete this memory?")) {
            await fetch(`/api/memories?id=${id}`, { method: 'DELETE' });
            loadMemories();
        }
    };

    const deleteVideo = async (id: string) => {
        if (confirm("Are you sure you want to delete this video?")) {
            await fetch(`/api/vibe-videos?id=${id}`, { method: 'DELETE' });
            loadVibeVideos();
        }
    };

    const toggleVideoActive = async (id: string, isActive: boolean) => {
        await fetch('/api/vibe-videos', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, is_active: !isActive })
        });
        loadVibeVideos();
    };

    // Upload handlers
    const handleUploadReview = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);
        
        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newReview.name,
                    rating: newReview.rating,
                    message: newReview.message,
                    tags: newReview.tags,
                    status: "approved"
                })
            });
            
            const result = await response.json();
            
            if (!response.ok) throw new Error(result.error);
            
            setNewReview({ name: "", rating: 5, message: "", tags: [] });
            setShowUploadModal(false);
            loadReviews();
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            alert("Error uploading review: " + errorMessage);
        }
        
        setUploading(false);
    };

    const handleUploadMemory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newMemory.mediaFiles.length === 0) {
            alert("Please select at least one image or video");
            return;
        }
        
        setUploading(true);
        
        try {
            // Create memory with user via API
            const memoryResponse = await fetch('/api/memories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userName: newMemory.userName,
                    caption: newMemory.caption,
                    location: newMemory.location,
                    type: newMemory.mediaFiles[0].type.startsWith("video") ? "video" : "image"
                })
            });
            
            if (!memoryResponse.ok) {
                const result = await memoryResponse.json();
                throw new Error(result.error || 'Failed to create memory');
            }
            
            const memoryData = await memoryResponse.json();
            
            // Upload media files
            for (let i = 0; i < newMemory.mediaFiles.length; i++) {
                const file = newMemory.mediaFiles[i];
                const fileExt = file.name.split('.').pop();
                const fileName = `${memoryData.id}_${i}.${fileExt}`;
                
                // Upload file to storage via API
                const formData = new FormData();
                formData.append('file', file);
                formData.append('bucket', 'memories');
                formData.append('fileName', fileName);
                
                const uploadResponse = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                });
                
                const uploadResult = await uploadResponse.json();
                if (!uploadResponse.ok) throw new Error(uploadResult.error);
                
                // Insert media record via API
                const mediaResponse = await fetch('/api/memory-media', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        memory_id: memoryData.id,
                        media_url: uploadResult.publicUrl,
                        media_type: file.type.startsWith("video") ? "video" : "image",
                        order_index: i
                    })
                });
                
                if (!mediaResponse.ok) {
                    const result = await mediaResponse.json();
                    throw new Error(result.error || 'Failed to save media');
                }
            }
            
            setNewMemory({ userName: "", caption: "", location: "", mediaFiles: [] });
            setShowUploadModal(false);
            loadMemories();
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            alert("Error uploading memory: " + errorMessage);
        }
        
        setUploading(false);
    };

    const handleUploadVideo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newVideo.videoFile) {
            alert("Please select a video file");
            return;
        }
        
        setUploading(true);
        
        try {
            const fileExt = newVideo.videoFile.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            
            // Use API route for upload
            const formData = new FormData();
            formData.append('file', newVideo.videoFile);
            formData.append('bucket', 'vibe-videos');
            formData.append('fileName', fileName);
            
            const uploadResponse = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            
            const uploadResult = await uploadResponse.json();
            if (!uploadResponse.ok) throw new Error(uploadResult.error);
            
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.src = URL.createObjectURL(newVideo.videoFile);
            
            await new Promise((resolve) => {
                video.onloadedmetadata = resolve;
            });
            
            const duration = Math.round(video.duration);
            
            // Insert video record into database via API
            const dbResponse = await fetch('/api/admin/vibe-videos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: newVideo.title,
                    video_url: uploadResult.publicUrl,
                    duration: duration,
                    is_active: true,
                    order_index: vibeVideos.length
                })
            });
            
            if (!dbResponse.ok) {
                const dbResult = await dbResponse.json();
                throw new Error(dbResult.error || 'Failed to save video to database');
            }
            
            setNewVideo({ title: "", videoFile: null });
            setShowUploadModal(false);
            loadVibeVideos();
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            alert("Error uploading video: " + errorMessage);
        }
        
        setUploading(false);
    };

    const toggleTag = (tag: string) => {
        setNewReview(prev => ({
            ...prev,
            tags: prev.tags.includes(tag) 
                ? prev.tags.filter(t => t !== tag)
                : prev.tags.length < 3 ? [...prev.tags, tag] : prev.tags
        }));
    };

    // Filtered reviews
    const filteredReviews = reviews.filter(review => {
        const matchesSearch = review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            review.message.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === "all" || review.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    // Stats
    const pendingReviews = reviews.filter(r => r.status === "pending").length;
    const approvedReviews = reviews.filter(r => r.status === "approved").length;
    const activeVideos = vibeVideos.filter(v => v.is_active).length;

    // Login Page
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-linear-to-br from-dn-navy via-dn-ocean to-cyan-600 flex items-center justify-center p-4 relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-dn-orange/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-[600px] bg-gradient-to-r from-cyan-500/10 to-dn-orange/10 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 w-full max-w-md">
                    {/* Logo & Title */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl mb-6 shadow-2xl">
                            <LayoutDashboard className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="font-heading font-bold text-4xl text-white mb-2">Welcome Back</h1>
                        <p className="text-white/60">Sign in to DN Tours Admin Dashboard</p>
                    </div>

                    {/* Login Card */}
                    <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-white/80 mb-3">Email Address</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-5 py-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-dn-orange/50 focus:border-transparent transition-all"
                                        placeholder="admin@dntours.lk"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-white/80 mb-3">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-5 py-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-dn-orange/50 focus:border-transparent transition-all pr-12"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-dn-orange to-amber-500 text-white font-bold rounded-2xl shadow-lg shadow-dn-orange/30 hover:shadow-xl hover:shadow-dn-orange/40 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                Sign In to Dashboard
                            </button>
                        </form>
                    </div>

                    <p className="text-center text-white/40 text-sm mt-6">
                        DN Tours © 2026. All rights reserved.
                    </p>
                </div>
            </div>
        );
    }

    // Dashboard
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
            {/* Add custom animations */}
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
                .animate-slideUp { animation: slideUp 0.4s ease-out; }
            `}</style>

            {/* Sidebar */}
            <aside className="fixed left-0 top-0 bottom-0 w-72 bg-white/80 backdrop-blur-xl border-r border-gray-100 z-40 hidden lg:block">
                {/* Logo */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-dn-orange to-amber-400 rounded-2xl flex items-center justify-center shadow-lg shadow-dn-orange/30">
                            <span className="text-white font-bold text-xl">DN</span>
                        </div>
                        <div>
                            <h1 className="font-bold text-gray-900">DN Tours</h1>
                            <p className="text-xs text-gray-400">Admin Dashboard</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="p-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-3">Main Menu</p>
                    {[
                        { id: "overview", label: "Overview", icon: LayoutDashboard },
                        { id: "reviews", label: "Reviews", icon: Star, badge: pendingReviews },
                        { id: "memories", label: "Memories", icon: ImageIcon },
                        { id: "videos", label: "Vibe Videos", icon: Film }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id as "overview" | "reviews" | "memories" | "videos")}
                            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl mb-1 transition-all duration-300 ${
                                activeTab === item.id
                                    ? "bg-gradient-to-r from-dn-orange to-amber-400 text-white shadow-lg shadow-dn-orange/30"
                                    : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                            {item.badge !== undefined && item.badge > 0 && (
                                <span className={`ml-auto px-2.5 py-1 rounded-full text-xs font-bold ${
                                    activeTab === item.id ? "bg-white/20 text-white" : "bg-amber-100 text-amber-600"
                                }`}>
                                    {item.badge}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                {/* Quick Actions */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-72 min-h-screen">
                {/* Top Bar */}
                <header className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-gray-100 z-30">
                    <div className="px-6 lg:px-8 py-4 flex items-center justify-between">
                        {/* Mobile Menu */}
                        <div className="lg:hidden flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-dn-orange to-amber-400 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold">DN</span>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="hidden md:flex flex-1 max-w-xl">
                            <div className="relative w-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search reviews, memories..."
                                    className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-dn-orange/50 transition-all"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={refreshData}
                                className={`p-3 hover:bg-gray-100 rounded-xl transition-colors ${refreshing ? 'animate-spin' : ''}`}
                            >
                                <RefreshCw className="w-5 h-5 text-gray-500" />
                            </button>
                            <button className="relative p-3 hover:bg-gray-100 rounded-xl transition-colors">
                                <Bell className="w-5 h-5 text-gray-500" />
                                {pendingReviews > 0 && (
                                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full" />
                                )}
                            </button>
                            <div className="w-10 h-10 bg-gradient-to-br from-dn-navy to-dn-ocean rounded-xl flex items-center justify-center text-white font-bold">
                                A
                            </div>
                        </div>
                    </div>

                    {/* Mobile Tabs */}
                    <div className="lg:hidden px-4 pb-4 flex gap-2 overflow-x-auto">
                        {[
                            { id: "overview", label: "Overview", icon: LayoutDashboard },
                            { id: "reviews", label: "Reviews", icon: Star },
                            { id: "memories", label: "Memories", icon: ImageIcon },
                            { id: "videos", label: "Videos", icon: Film }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id as "overview" | "reviews" | "memories" | "videos")}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                                    activeTab === item.id
                                        ? "bg-dn-orange text-white"
                                        : "bg-gray-100 text-gray-600"
                                }`}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </button>
                        ))}
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-6 lg:p-8">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-32">
                            <div className="w-16 h-16 border-4 border-dn-orange/30 border-t-dn-orange rounded-full animate-spin" />
                            <p className="mt-4 text-gray-500 font-medium">Loading dashboard...</p>
                        </div>
                    ) : (
                        <>
                            {/* Overview Tab */}
                            {activeTab === "overview" && (
                                <div className="space-y-8">
                                    {/* Page Header */}
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div>
                                            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                                            <p className="text-gray-500 mt-1">Welcome back! Here&apos;s what&apos;s happening today.</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => { setUploadType("review"); setShowUploadModal(true); }}
                                                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-dn-orange to-amber-400 text-white rounded-xl font-semibold shadow-lg shadow-dn-orange/30 hover:shadow-xl hover:shadow-dn-orange/40 transition-all duration-300 hover:-translate-y-0.5"
                                            >
                                                <Plus className="w-5 h-5" /> Add Content
                                            </button>
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                        <StatCard icon={AlertCircle} label="Pending Reviews" value={pendingReviews} color="#f59e0b" delay={0} />
                                        <StatCard icon={CheckCircle2} label="Approved Reviews" value={approvedReviews} color="#10b981" delay={100} />
                                        <StatCard icon={ImageIcon} label="Total Memories" value={memories.length} color="#6366f1" delay={200} />
                                        <StatCard icon={Film} label="Active Videos" value={activeVideos} color="#ec4899" delay={300} />
                                    </div>

                                    {/* Recent Activity */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        {/* Recent Reviews */}
                                        <FadeIn delay={400}>
                                            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100 p-6">
                                                <div className="flex items-center justify-between mb-6">
                                                    <h2 className="font-bold text-lg text-gray-900">Recent Reviews</h2>
                                                    <button onClick={() => setActiveTab("reviews")} className="text-dn-orange font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                                        View All <ChevronRight className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <div className="space-y-4">
                                                    {reviews.slice(0, 3).map((review) => (
                                                        <div key={review.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                                            <div className="w-12 h-12 bg-gradient-to-br from-dn-orange/20 to-amber-100 rounded-full flex items-center justify-center text-dn-orange font-bold">
                                                                {review.name.charAt(0)}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-semibold text-gray-900 truncate">{review.name}</p>
                                                                <p className="text-sm text-gray-500 truncate">{review.message}</p>
                                                            </div>
                                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                                review.status === 'pending' ? 'bg-amber-100 text-amber-600' :
                                                                review.status === 'approved' ? 'bg-emerald-100 text-emerald-600' :
                                                                'bg-red-100 text-red-600'
                                                            }`}>
                                                                {review.status}
                                                            </span>
                                                        </div>
                                                    ))}
                                                    {reviews.length === 0 && (
                                                        <p className="text-center text-gray-400 py-8">No reviews yet</p>
                                                    )}
                                                </div>
                                            </div>
                                        </FadeIn>

                                        {/* Quick Actions */}
                                        <FadeIn delay={500}>
                                            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100 p-6">
                                                <h2 className="font-bold text-lg text-gray-900 mb-6">Quick Actions</h2>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {[
                                                        { label: "Add Review", icon: Star, color: "from-amber-400 to-orange-400", onClick: () => { setUploadType("review"); setShowUploadModal(true); } },
                                                        { label: "Add Memory", icon: ImageIcon, color: "from-indigo-400 to-purple-400", onClick: () => { setUploadType("memory"); setShowUploadModal(true); } },
                                                        { label: "Add Video", icon: Film, color: "from-pink-400 to-rose-400", onClick: () => { setUploadType("video"); setShowUploadModal(true); } },
                                                        { label: "Refresh Data", icon: RefreshCw, color: "from-emerald-400 to-teal-400", onClick: refreshData }
                                                    ].map((action, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={action.onClick}
                                                            className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-gray-50 hover:bg-gradient-to-br hover:from-white hover:to-gray-50 border border-transparent hover:border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
                                                        >
                                                            <div className={`w-14 h-14 bg-linear-to-br ${action.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                                                <action.icon className="w-7 h-7 text-white" />
                                                            </div>
                                                            <span className="font-semibold text-gray-700">{action.label}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </FadeIn>
                                    </div>
                                </div>
                            )}

                            {/* Reviews Tab */}
                            {activeTab === "reviews" && (
                                <div className="space-y-6">
                                    {/* Header */}
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div>
                                            <h1 className="text-3xl font-bold text-gray-900">Customer Reviews</h1>
                                            <p className="text-gray-500 mt-1">Manage and moderate customer feedback</p>
                                        </div>
                                        <button
                                            onClick={() => { setUploadType("review"); setShowUploadModal(true); }}
                                            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-dn-orange to-amber-400 text-white rounded-xl font-semibold shadow-lg shadow-dn-orange/30 hover:shadow-xl transition-all"
                                        >
                                            <Plus className="w-5 h-5" /> Add Review
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <div className="flex flex-wrap gap-3">
                                        {(["all", "pending", "approved", "rejected"] as const).map((status) => (
                                            <button
                                                key={status}
                                                onClick={() => setFilterStatus(status)}
                                                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                                                    filterStatus === status
                                                        ? "bg-dn-navy text-white shadow-lg"
                                                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                                                }`}
                                            >
                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                                {status === "pending" && pendingReviews > 0 && (
                                                    <span className="ml-2 px-2 py-0.5 bg-amber-400 text-white text-xs rounded-full">
                                                        {pendingReviews}
                                                    </span>
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Reviews Grid */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {filteredReviews.map((review, idx) => (
                                            <ReviewCard
                                                key={review.id}
                                                review={review}
                                                onApprove={() => approveReview(review.id)}
                                                onReject={() => rejectReview(review.id)}
                                                onDelete={() => deleteReview(review.id)}
                                                delay={idx * 50}
                                            />
                                        ))}
                                    </div>

                                    {filteredReviews.length === 0 && (
                                        <div className="text-center py-20">
                                            <Star className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                                            <p className="text-gray-400 font-medium">No reviews found</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Memories Tab */}
                            {activeTab === "memories" && (
                                <div className="space-y-6">
                                    {/* Header */}
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div>
                                            <h1 className="text-3xl font-bold text-gray-900">DN Your Memory</h1>
                                            <p className="text-gray-500 mt-1">User-submitted travel memories</p>
                                        </div>
                                        <button
                                            onClick={() => { setUploadType("memory"); setShowUploadModal(true); }}
                                            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl transition-all"
                                        >
                                            <Plus className="w-5 h-5" /> Add Memory
                                        </button>
                                    </div>

                                    {/* Memories Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {memories.map((memory, idx) => (
                                            <MemoryCard
                                                key={memory.id}
                                                memory={memory}
                                                onDelete={() => deleteMemory(memory.id)}
                                                delay={idx * 50}
                                            />
                                        ))}
                                    </div>

                                    {memories.length === 0 && (
                                        <div className="text-center py-20">
                                            <ImageIcon className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                                            <p className="text-gray-400 font-medium">No memories yet</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Videos Tab */}
                            {activeTab === "videos" && (
                                <div className="space-y-6">
                                    {/* Header */}
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div>
                                            <h1 className="text-3xl font-bold text-gray-900">Feel the Vibe Videos</h1>
                                            <p className="text-gray-500 mt-1">Manage short-form travel videos</p>
                                        </div>
                                        <button
                                            onClick={() => { setUploadType("video"); setShowUploadModal(true); }}
                                            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold shadow-lg shadow-pink-500/30 hover:shadow-xl transition-all"
                                        >
                                            <Plus className="w-5 h-5" /> Add Video
                                        </button>
                                    </div>

                                    {/* Videos Grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                        {vibeVideos.map((video, idx) => (
                                            <VideoCard
                                                key={video.id}
                                                video={video}
                                                onToggle={() => toggleVideoActive(video.id, video.is_active)}
                                                onDelete={() => deleteVideo(video.id)}
                                                delay={idx * 50}
                                            />
                                        ))}
                                    </div>

                                    {vibeVideos.length === 0 && (
                                        <div className="text-center py-20">
                                            <Film className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                                            <p className="text-gray-400 font-medium">No videos yet</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            {/* Upload Modal */}
            <Modal
                isOpen={showUploadModal}
                onClose={() => setShowUploadModal(false)}
                title={uploadType === "review" ? "Add New Review" : uploadType === "memory" ? "Add New Memory" : "Add New Video"}
            >
                {/* Review Form */}
                {uploadType === "review" && (
                    <form onSubmit={handleUploadReview} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Customer Name</label>
                            <input
                                type="text"
                                value={newReview.name}
                                onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                                className="w-full px-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-dn-orange/50 focus:border-transparent transition-all"
                                placeholder="Enter customer name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setNewReview({...newReview, rating: star})}
                                        className={`p-3 rounded-xl transition-all ${
                                            star <= newReview.rating
                                                ? "bg-amber-100 text-amber-500"
                                                : "bg-gray-100 text-gray-300 hover:bg-gray-200"
                                        }`}
                                    >
                                        <Star className={`w-6 h-6 ${star <= newReview.rating ? "fill-current" : ""}`} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Tags (Select up to 3)</label>
                            <div className="flex flex-wrap gap-2">
                                {availableTags.map((tag) => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => toggleTag(tag)}
                                        className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                                            newReview.tags.includes(tag)
                                                ? "bg-dn-orange text-white shadow-lg shadow-dn-orange/30"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Review Message</label>
                            <textarea
                                value={newReview.message}
                                onChange={(e) => setNewReview({...newReview, message: e.target.value})}
                                className="w-full px-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-dn-orange/50 focus:border-transparent transition-all min-h-[120px] resize-none"
                                placeholder="Write the review message..."
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={uploading}
                            className="w-full py-4 bg-gradient-to-r from-dn-orange to-amber-400 text-white font-bold rounded-xl shadow-lg shadow-dn-orange/30 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {uploading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <RefreshCw className="w-5 h-5 animate-spin" /> Uploading...
                                </span>
                            ) : (
                                "Add Review"
                            )}
                        </button>
                    </form>
                )}

                {/* Memory Form */}
                {uploadType === "memory" && (
                    <form onSubmit={handleUploadMemory} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">User Name</label>
                            <input
                                type="text"
                                value={newMemory.userName}
                                onChange={(e) => setNewMemory({...newMemory, userName: e.target.value})}
                                className="w-full px-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all"
                                placeholder="Enter user name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={newMemory.location}
                                    onChange={(e) => setNewMemory({...newMemory, location: e.target.value})}
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all"
                                    placeholder="e.g., Sigiriya, Sri Lanka"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Caption</label>
                            <textarea
                                value={newMemory.caption}
                                onChange={(e) => setNewMemory({...newMemory, caption: e.target.value})}
                                className="w-full px-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all min-h-[100px] resize-none"
                                placeholder="Write a caption for this memory..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Media</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,video/*"
                                    onChange={(e) => {
                                        const files = Array.from(e.target.files || []);
                                        setNewMemory({...newMemory, mediaFiles: files});
                                    }}
                                    className="hidden"
                                    id="memory-upload"
                                    required
                                />
                                <label
                                    htmlFor="memory-upload"
                                    className="flex flex-col items-center gap-3 p-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 hover:border-indigo-400 cursor-pointer transition-colors"
                                >
                                    <Upload className="w-10 h-10 text-gray-400" />
                                    <span className="text-gray-500 text-sm">Click to upload images or video</span>
                                    <span className="text-gray-400 text-xs">Max 6 images or 1 video</span>
                                </label>
                            </div>
                            {newMemory.mediaFiles.length > 0 && (
                                <p className="mt-2 text-sm text-indigo-600 font-medium">
                                    ✓ {newMemory.mediaFiles.length} file(s) selected
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={uploading}
                            className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {uploading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <RefreshCw className="w-5 h-5 animate-spin" /> Uploading...
                                </span>
                            ) : (
                                "Add Memory"
                            )}
                        </button>
                    </form>
                )}

                {/* Video Form */}
                {uploadType === "video" && (
                    <form onSubmit={handleUploadVideo} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Video Title</label>
                            <input
                                type="text"
                                value={newVideo.title}
                                onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
                                className="w-full px-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all"
                                placeholder="Enter video title"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Video</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0] || null;
                                        setNewVideo({...newVideo, videoFile: file});
                                    }}
                                    className="hidden"
                                    id="video-upload"
                                    required
                                />
                                <label
                                    htmlFor="video-upload"
                                    className="flex flex-col items-center gap-3 p-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 hover:border-pink-400 cursor-pointer transition-colors"
                                >
                                    <Video className="w-10 h-10 text-gray-400" />
                                    <span className="text-gray-500 text-sm">Click to upload video</span>
                                    <span className="text-gray-400 text-xs">Recommended: 15 seconds or less</span>
                                </label>
                            </div>
                            {newVideo.videoFile && (
                                <p className="mt-2 text-sm text-pink-600 font-medium">
                                    ✓ {newVideo.videoFile.name}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={uploading}
                            className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl shadow-lg shadow-pink-500/30 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {uploading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <RefreshCw className="w-5 h-5 animate-spin" /> Uploading...
                                </span>
                            ) : (
                                "Add Video"
                            )}
                        </button>
                    </form>
                )}
            </Modal>
        </div>
    );
}
