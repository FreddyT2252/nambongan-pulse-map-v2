import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
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

const LocationMarker = ({
  onLocationSelect,
  selectedLocation,
}: {
  onLocationSelect: (lat: number, lng: number) => void;
  selectedLocation: { lat: number; lng: number } | null;
}) => {
  const [position, setPosition] = useState<L.LatLng | null>(
    selectedLocation ? new L.LatLng(selectedLocation.lat, selectedLocation.lng) : null
  );

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  useEffect(() => {
    if (selectedLocation) {
      setPosition(new L.LatLng(selectedLocation.lat, selectedLocation.lng));
    }
  }, [selectedLocation]);

  return position === null ? null : <Marker position={position} />;
};

const LocationPickerMap = ({
  onLocationSelect,
  selectedLocation,
  className = "",
}: LocationPickerMapProps) => {
  // Center on Desa Nambongan
  const defaultCenter: [number, number] = [-7.0056, 110.4376];

  return (
    <div className={`rounded-xl overflow-hidden border border-border ${className}`}>
      <MapContainer
        center={defaultCenter}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", minHeight: "300px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          onLocationSelect={onLocationSelect}
          selectedLocation={selectedLocation}
        />
      </MapContainer>
      <div className="bg-muted px-4 py-2 text-sm text-muted-foreground">
        Klik pada peta untuk menandai lokasi
      </div>
    </div>
  );
};

export default LocationPickerMap;
