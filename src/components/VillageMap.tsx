import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom icon for RT/RW markers
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface RTRWData {
  id: string;
  name: string;
  position: [number, number];
  kepalaKeluarga: number;
  jumlahPenduduk: number;
  lakilaki: number;
  perempuan: number;
}

// Data RT/RW Desa Nambongan (contoh koordinat)
const rtRwData: RTRWData[] = [
  {
    id: "rt01-rw01",
    name: "RT 01 / RW 01",
    position: [-7.0051, 110.4381],
    kepalaKeluarga: 45,
    jumlahPenduduk: 180,
    lakilaki: 92,
    perempuan: 88,
  },
  {
    id: "rt02-rw01",
    name: "RT 02 / RW 01",
    position: [-7.0061, 110.4391],
    kepalaKeluarga: 52,
    jumlahPenduduk: 210,
    lakilaki: 105,
    perempuan: 105,
  },
  {
    id: "rt03-rw01",
    name: "RT 03 / RW 01",
    position: [-7.0041, 110.4401],
    kepalaKeluarga: 38,
    jumlahPenduduk: 155,
    lakilaki: 80,
    perempuan: 75,
  },
  {
    id: "rt01-rw02",
    name: "RT 01 / RW 02",
    position: [-7.0071, 110.4371],
    kepalaKeluarga: 60,
    jumlahPenduduk: 240,
    lakilaki: 122,
    perempuan: 118,
  },
  {
    id: "rt02-rw02",
    name: "RT 02 / RW 02",
    position: [-7.0081, 110.4361],
    kepalaKeluarga: 48,
    jumlahPenduduk: 195,
    lakilaki: 98,
    perempuan: 97,
  },
  {
    id: "rt03-rw02",
    name: "RT 03 / RW 02",
    position: [-7.0031, 110.4351],
    kepalaKeluarga: 42,
    jumlahPenduduk: 168,
    lakilaki: 85,
    perempuan: 83,
  },
];

// Center of the village (approximate)
const villageCenter: [number, number] = [-7.0056, 110.4376];

const SetViewOnCenter = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 15);
  }, [center, map]);
  return null;
};

interface VillageMapProps {
  className?: string;
}

const VillageMap = ({ className = "" }: VillageMapProps) => {
  return (
    <div className={`rounded-xl overflow-hidden shadow-lg ${className}`}>
      <MapContainer
        center={villageCenter}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", minHeight: "400px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SetViewOnCenter center={villageCenter} />
        {rtRwData.map((data) => (
          <Marker key={data.id} position={data.position} icon={customIcon}>
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-lg text-primary mb-2">{data.name}</h3>
                <div className="space-y-1 text-sm">
                  <p className="flex justify-between">
                    <span className="text-muted-foreground">Kepala Keluarga:</span>
                    <span className="font-semibold">{data.kepalaKeluarga} KK</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-muted-foreground">Total Penduduk:</span>
                    <span className="font-semibold">{data.jumlahPenduduk} jiwa</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-muted-foreground">Laki-laki:</span>
                    <span className="font-semibold">{data.lakilaki} jiwa</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-muted-foreground">Perempuan:</span>
                    <span className="font-semibold">{data.perempuan} jiwa</span>
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export { VillageMap, rtRwData };
export default VillageMap;
