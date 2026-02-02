"use client";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./Map/LeafletMap"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-dn-ocean/5 animate-pulse rounded-[40px] flex items-center justify-center">
            <p className="text-gray-400 font-medium">Loading Map...</p>
        </div>
    )
});

export default LeafletMap;
