// Placeholder images dengan variasi minimal
const placeholder1 = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop";
const placeholder2 = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop";

export const galleryImages = [
  { id: 1, src: placeholder1, title: "Kegiatan Gotong Royong" },
  { id: 2, src: placeholder2, title: "Pemberdayaan Masyarakat" },
  { id: 3, src: placeholder1, title: "Kegiatan Warga" },
  { id: 4, src: placeholder2, title: "Posyandu Balita" },
  { id: 5, src: placeholder1, title: "Bersih Desa" },
  { id: 6, src: placeholder2, title: "Musyawarah Desa" },
  { id: 7, src: placeholder1, title: "Festival Budaya" },
  { id: 8, src: placeholder2, title: "Pelatihan UMKM" },
  { id: 9, src: placeholder1, title: "Pelayanan Kesehatan" },
  { id: 10, src: placeholder2, title: "Pembangunan Infrastruktur" },
  { id: 11, src: placeholder1, title: "Pemandangan Desa" },
  { id: 12, src: placeholder2, title: "Sawah Desa" },
];

// Helper function untuk mengambil gambar secara acak
export const getRandomGalleryImages = (count: number) => {
  const shuffled = [...galleryImages].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
