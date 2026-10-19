"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Location {
    id: string;
    name: string;
    lat: number;
    lng: number;
    image: string;
    description?: string;
}

const FitBounds = ({ locations }: { locations: Location[] }) => {
    const map = useMap();
    useEffect(() => {
        if (locations.length > 0) {
            const bounds = L.latLngBounds(locations.map(l => [l.lat, l.lng]));
            map.flyToBounds(bounds, { padding: [60, 60], maxZoom: 12, duration: 1.2 });
        }
    }, [locations, map]);
    return null;
};

interface LeafletMapProps {
    locations: Location[];
    activeLocationId?: string;
    onSelectLocation?: (locationId: string) => void;
}

const DEFAULT_TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const DEFAULT_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors';

const LeafletMap = ({ locations, activeLocationId, onSelectLocation }: LeafletMapProps) => {
    const [hasError, setHasError] = useState(false);
    const [, setTileErrorCount] = useState(0);

    const handleTileError = () => {
        setTileErrorCount(prev => {
            const next = prev + 1;
            if (next > 10) setHasError(true);
            return next;
        });
    };
    const tileUrl = process.env.NEXT_PUBLIC_MAP_TILE_URL || DEFAULT_TILE_URL;
    const tileAttribution = process.env.NEXT_PUBLIC_MAP_ATTRIBUTION || DEFAULT_ATTRIBUTION;

    if (hasError) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-dn-ocean/5 rounded-2xl md:rounded-[40px] text-center">
                <div className="w-12 h-12 rounded-full bg-dn-orange/10 flex items-center justify-center text-dn-orange mb-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <h4 className="font-heading font-bold text-lg text-dn-navy mb-1">Sri Lanka Itinerary Overview</h4>
                <p className="text-sm text-gray-500 max-w-md mb-4">
                    Map preview is temporarily unavailable. You can view all stops in the itinerary list on the left.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                    {locations.map((loc) => (
                        <span key={loc.id} className="text-xs bg-white text-dn-navy px-3 py-1.5 rounded-full shadow-xs border border-gray-100 font-medium">
                            {loc.name}
                        </span>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <MapContainer
            center={[7.8731, 80.7718]}
            zoom={8}
            scrollWheelZoom={false}
            className="w-full h-full rounded-2xl md:rounded-[40px] shadow-2xl z-0"
            style={{ background: '#F5F7FA', minHeight: '340px' }}
        >
            <TileLayer
                attribution={tileAttribution}
                url={tileUrl}
                maxZoom={19}
                eventHandlers={{
                    tileerror: handleTileError
                }}
            />

            <FitBounds locations={locations} />

            {locations.map((loc) => {
                const isActive = activeLocationId === loc.id;
                const customIcon = L.divIcon({
                    className: "bg-transparent",
                    html: `
                        <div style="
                            width: 100%; 
                            height: 100%; 
                            border-radius: 9999px; 
                            border: ${isActive ? '4px solid #F5A623' : '3px solid white'}; 
                            overflow: hidden; 
                            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.25);
                            position: relative;
                            background: #0A2540;
                        ">
                            <img src="${loc.image}" alt="${loc.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'" />
                        </div>
                    `,
                    iconSize: isActive ? [64, 64] : [52, 52],
                    iconAnchor: isActive ? [32, 64] : [26, 52],
                });

                return (
                    <Marker
                        key={loc.id}
                        position={[loc.lat, loc.lng]}
                        icon={customIcon}
                        eventHandlers={{
                            click: () => {
                                if (onSelectLocation) onSelectLocation(loc.id);
                            }
                        }}
                    >
                        <Tooltip
                            direction="top"
                            offset={[0, -28]}
                            opacity={1}
                            className="bg-white/95! backdrop-blur-md! border border-gray-100! shadow-xl! rounded-xl! px-3! py-1.5! text-dn-navy! font-bold! text-xs! font-heading"
                        >
                            {loc.name}
                        </Tooltip>
                        <Popup className="dn-tour-popup">
                            <div className="p-1 max-w-xs text-left">
                                <h5 className="font-heading font-bold text-sm text-dn-navy mb-1">{loc.name}</h5>
                                {loc.description && (
                                    <p className="text-xs text-gray-600 mb-2 leading-relaxed">{loc.description}</p>
                                )}
                                <a
                                    href={`https://api.whatsapp.com/send/?phone=94779452473&text=${encodeURIComponent(`Hello DN Tours! I would like to include ${loc.name} in my Sri Lanka tour itinerary.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-dn-orange font-bold hover:underline inline-flex items-center gap-1"
                                >
                                    Inquire About This Stop →
                                </a>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default LeafletMap;
