"use client";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Location {
    id: string;
    name: string;
    lat: number;
    lng: number;
    image: string;
}

const FitBounds = ({ locations }: { locations: Location[] }) => {
    const map = useMap();
    useEffect(() => {
        if (locations.length > 0) {
            const bounds = L.latLngBounds(locations.map(l => [l.lat, l.lng]));
            map.flyToBounds(bounds, { padding: [100, 100], duration: 1.5 });
        }
    }, [locations, map]);
    return null;
};

const LeafletMap = ({ locations }: { locations: Location[] }) => {
    return (
        <MapContainer
            center={[7.8731, 80.7718]}
            zoom={8}
            scrollWheelZoom={false}
            className="w-full h-full rounded-2xl md:rounded-[40px] shadow-2xl z-0"
            style={{ background: '#F5F7FA' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />

            <FitBounds locations={locations} />

            {locations.map((loc) => {
                const customIcon = L.divIcon({
                    className: "bg-transparent",
                    html: `
                <div style="
                    width: 100%; 
                    height: 100%; 
                    border-radius: 9999px; 
                    border: 4px solid white; 
                    overflow: hidden; 
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                    position: relative;
                ">
                    <img src="${loc.image}" style="width: 100%; height: 100%; object-fit: cover;" />
                </div>
            `,
                    iconSize: [56, 56],
                    iconAnchor: [28, 56],
                });

                return (
                    <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={customIcon}>
                        <Tooltip direction="top" offset={[0, -28]} opacity={1} className="bg-white/80! backdrop-blur-md! border-0! shadow-lg! rounded-xl! px-4! py-2! text-dn-navy! font-bold! font-heading">
                            {loc.name}
                        </Tooltip>
                    </Marker>
                )
            })}
        </MapContainer>
    );
};

export default LeafletMap;
