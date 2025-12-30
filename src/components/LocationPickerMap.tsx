import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface LocationPickerMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  selectedLocation: { lat: number; lng: number } | null;
  className?: string;
}

const LocationPickerMap = ({
  onLocationSelect,
  selectedLocation,
  className = "",
}: LocationPickerMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // Center on Desa Nambongan
  const defaultCenter: [number, number] = [-7.0056, 110.4376];

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView(defaultCenter, 15);
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Handle click events
    map.on("click", (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      
      if (markerRef.current) {
        markerRef.current.setLatLng(e.latlng);
      } else {
        markerRef.current = L.marker(e.latlng).addTo(map);
      }
      
      onLocationSelect(lat, lng);
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markerRef.current = null;
    };
  }, []);

  // Update marker when selectedLocation changes externally
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (selectedLocation) {
      const latlng = L.latLng(selectedLocation.lat, selectedLocation.lng);
      if (markerRef.current) {
        markerRef.current.setLatLng(latlng);
      } else {
        markerRef.current = L.marker(latlng).addTo(mapInstanceRef.current);
      }
    } else if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }
  }, [selectedLocation]);

  return (
    <div className={`rounded-xl overflow-hidden border border-border ${className}`}>
      <div ref={mapRef} style={{ height: "100%", width: "100%", minHeight: "300px" }} />
      <div className="bg-muted px-4 py-2 text-sm text-muted-foreground">
        Klik pada peta untuk menandai lokasi
      </div>
    </div>
  );
};

export default LocationPickerMap;
