import { useEffect, useRef } from "react";
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

// Data RT/RW Pedukuhan Nambongan, Desa Tlogoadi, Mlati, Sleman, Yogyakarta
// Koordinat sekitar Desa Tlogoadi: -7.7318, 110.3320
const rtRwData: RTRWData[] = [
  {
    id: "rt01-rw01",
    name: "RT 01 / RW 01",
    position: [-7.7310, 110.3315],
    kepalaKeluarga: 35,
    jumlahPenduduk: 142,
    lakilaki: 72,
    perempuan: 70,
  },
  {
    id: "rt02-rw01",
    name: "RT 02 / RW 01",
    position: [-7.7320, 110.3328],
    kepalaKeluarga: 40,
    jumlahPenduduk: 165,
    lakilaki: 85,
    perempuan: 80,
  },
  {
    id: "rt01-rw02",
    name: "RT 01 / RW 02",
    position: [-7.7305, 110.3340],
    kepalaKeluarga: 38,
    jumlahPenduduk: 155,
    lakilaki: 78,
    perempuan: 77,
  },
  {
    id: "rt02-rw02",
    name: "RT 02 / RW 02",
    position: [-7.7315, 110.3352],
    kepalaKeluarga: 42,
    jumlahPenduduk: 170,
    lakilaki: 88,
    perempuan: 82,
  },
  {
    id: "rt01-rw03",
    name: "RT 01 / RW 03",
    position: [-7.7328, 110.3305],
    kepalaKeluarga: 45,
    jumlahPenduduk: 180,
    lakilaki: 92,
    perempuan: 88,
  },
  {
    id: "rt02-rw03",
    name: "RT 02 / RW 03",
    position: [-7.7338, 110.3318],
    kepalaKeluarga: 36,
    jumlahPenduduk: 148,
    lakilaki: 75,
    perempuan: 73,
  },
  {
    id: "rt01-rw04",
    name: "RT 01 / RW 04",
    position: [-7.7325, 110.3365],
    kepalaKeluarga: 50,
    jumlahPenduduk: 200,
    lakilaki: 102,
    perempuan: 98,
  },
  {
    id: "rt02-rw04",
    name: "RT 02 / RW 04",
    position: [-7.7335, 110.3378],
    kepalaKeluarga: 48,
    jumlahPenduduk: 195,
    lakilaki: 100,
    perempuan: 95,
  },
];

// Center of Pedukuhan Nambongan, Desa Tlogoadi, Mlati, Sleman, Yogyakarta
const villageCenter: [number, number] = [-7.7318, 110.3340];

interface VillageMapProps {
  className?: string;
}

const VillageMap = ({ className = "" }: VillageMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView(villageCenter, 15);
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add markers for each RT/RW
    rtRwData.forEach((data) => {
      const marker = L.marker(data.position, { icon: customIcon }).addTo(map);
      
      const popupContent = `
        <div style="padding: 8px; min-width: 200px;">
          <h3 style="font-weight: bold; font-size: 16px; color: #2d5016; margin-bottom: 8px;">${data.name}</h3>
          <div style="font-size: 14px; line-height: 1.6;">
            <p style="display: flex; justify-content: space-between; margin: 4px 0;">
              <span style="color: #666;">Kepala Keluarga:</span>
              <span style="font-weight: 600;">${data.kepalaKeluarga} KK</span>
            </p>
            <p style="display: flex; justify-content: space-between; margin: 4px 0;">
              <span style="color: #666;">Total Penduduk:</span>
              <span style="font-weight: 600;">${data.jumlahPenduduk} jiwa</span>
            </p>
            <p style="display: flex; justify-content: space-between; margin: 4px 0;">
              <span style="color: #666;">Laki-laki:</span>
              <span style="font-weight: 600;">${data.lakilaki} jiwa</span>
            </p>
            <p style="display: flex; justify-content: space-between; margin: 4px 0;">
              <span style="color: #666;">Perempuan:</span>
              <span style="font-weight: 600;">${data.perempuan} jiwa</span>
            </p>
          </div>
        </div>
      `;
      
      marker.bindPopup(popupContent);
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div className={`rounded-xl overflow-hidden shadow-lg relative z-0 ${className}`}>
      <div ref={mapRef} style={{ height: "100%", width: "100%", minHeight: "400px" }} />
    </div>
  );
};

export { VillageMap, rtRwData };
export default VillageMap;
