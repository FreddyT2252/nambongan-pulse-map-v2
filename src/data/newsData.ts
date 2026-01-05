// Placeholder image untuk berita
const placeholderImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop";

export const newsData = [
  {
    id: 1,
    title: "Gotong Royong Bersih Pedukuhan",
    date: "28 Desember 2025",
    category: "Kegiatan",
    excerpt: "Warga Pedukuhan Nambongan mengadakan kegiatan gotong royong membersihkan lingkungan. Kegiatan ini diikuti oleh seluruh warga dari berbagai RT/RW.",
    content: "Kegiatan gotong royong ini merupakan tradisi rutin yang dilaksanakan setiap bulan...",
    image: placeholderImage,
  },
  {
    id: 2,
    title: "Musyawarah Perencanaan Pembangunan Pedukuhan",
    date: "25 Desember 2025",
    category: "Pemerintahan",
    excerpt: "Pedukuhan Nambongan mengadakan musyawarah untuk merencanakan pembangunan tahun depan. Berbagai usulan dari warga ditampung.",
    content: "Musyawarah pedukuhan tahun ini membahas berbagai program prioritas...",
    image: placeholderImage,
  },
  {
    id: 3,
    title: "Posyandu Balita Rutin Bulanan",
    date: "20 Desember 2025",
    category: "Kesehatan",
    excerpt: "Kegiatan posyandu balita dilaksanakan setiap bulan untuk memantau tumbuh kembang anak. Ibu-ibu warga desa antusias mengikuti kegiatan ini.",
    content: "Posyandu merupakan program kesehatan masyarakat yang sangat penting...",
    image: placeholderImage,
  },
  {
    id: 4,
    title: "Pelatihan UMKM untuk Warga Desa",
    date: "15 Desember 2025",
    category: "Ekonomi",
    excerpt: "Pemerintah desa bekerja sama dengan Dinas Koperasi mengadakan pelatihan kewirausahaan untuk warga. Peserta diajarkan cara mengelola usaha kecil.",
    content: "Pelatihan ini bertujuan meningkatkan kemampuan ekonomi warga desa...",
    image: placeholderImage,
  },
  {
    id: 5,
    title: "Perbaikan Jalan Desa RT 03",
    date: "10 Desember 2025",
    category: "Infrastruktur",
    excerpt: "Pemerintah desa telah menyelesaikan perbaikan jalan di RT 03 yang sempat rusak akibat hujan deras. Warga kini dapat beraktivitas dengan nyaman.",
    content: "Perbaikan jalan ini menggunakan dana desa yang telah dialokasikan...",
    image: placeholderImage,
  },
  {
    id: 6,
    title: "Festival Budaya Pedukuhan Nambongan",
    date: "5 Desember 2025",
    category: "Budaya",
    excerpt: "Pedukuhan Nambongan menggelar festival budaya tahunan yang menampilkan berbagai kesenian tradisional. Acara ini menarik banyak pengunjung.",
    content: "Festival budaya menjadi ajang pelestarian tradisi dan budaya lokal...",
    image: placeholderImage,
  },
];

export const categoryColors: Record<string, string> = {
  Kegiatan: "bg-primary/10 text-primary",
  Pemerintahan: "bg-blue-100 text-blue-700",
  Kesehatan: "bg-red-100 text-red-700",
  Ekonomi: "bg-amber-100 text-amber-700",
  Infrastruktur: "bg-slate-100 text-slate-700",
  Budaya: "bg-purple-100 text-purple-700",
};
