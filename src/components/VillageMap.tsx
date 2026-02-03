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
  jumlahPenduduk: number;
  lakilaki: number;
  perempuan: number;
}

// Data RT/RW Padukuhan Nambongan, Desa Tlogoadi, Mlati, Sleman, Yogyakarta
// Koordinat sekitar Desa Tlogoadi: -7.7318, 110.3320
const rtRwData: RTRWData[] = [
  {
    id: "rt01-rw30",
    name: "RT 01 / RW 30",
    position: [-7.7310, 110.3315],
    jumlahPenduduk: 158,
    lakilaki: 78,
    perempuan: 80,
  },
  {
    id: "rt02-rw30",
    name: "RT 02 / RW 30",
    position: [-7.7320, 110.3328],
    jumlahPenduduk: 182,
    lakilaki: 93,
    perempuan: 89,
  },
  {
    id: "rt03-rw31",
    name: "RT 03 / RW 31",
    position: [-7.7305, 110.3340],
    jumlahPenduduk: 130,
    lakilaki: 61,
    perempuan: 69,
  },
  {
    id: "rt04-rw31",
    name: "RT 04 / RW 31",
    position: [-7.7315, 110.3352],
    jumlahPenduduk: 133,
    lakilaki: 59,
    perempuan: 74,
  },
  {
    id: "rt05-rw32",
    name: "RT 05 / RW 32",
    position: [-7.7328, 110.3305],
    jumlahPenduduk: 151,
    lakilaki: 67,
    perempuan: 84,
  },
  {
    id: "rt06-rw32",
    name: "RT 06 / RW 32",
    position: [-7.7338, 110.3318],
    jumlahPenduduk: 147,
    lakilaki: 68,
    perempuan: 79,
  },
  {
    id: "rt07-rw35",
    name: "RT 07 / RW 35",
    position: [-7.7325, 110.3365],
    jumlahPenduduk: 143,
    lakilaki: 69,
    perempuan: 74,
  },
  {
    id: "rt08-rw35",
    name: "RT 08 / RW 35",
    position: [-7.7335, 110.3378],
    jumlahPenduduk: 187,
    lakilaki: 101,
    perempuan: 86,
  },
];

// Total KK untuk seluruh Padukuhan Nambongan
const totalKK = 434;

// Tanggal pembaruan data terakhir
const lastUpdated = "15 Januari 2026";

// Center of Padukuhan Nambongan, Desa Tlogoadi, Mlati, Sleman, Yogyakarta
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

export { VillageMap, rtRwData, totalKK, lastUpdated };
export default VillageMap;