import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const newsData = [
  {
    id: 1,
    title: "Gotong Royong Bersih Desa",
    date: "28 Desember 2025",
    category: "Kegiatan",
    excerpt: "Warga Desa Nambongan mengadakan kegiatan gotong royong membersihkan lingkungan desa. Kegiatan ini diikuti oleh seluruh warga dari berbagai RT/RW.",
    content: "Kegiatan gotong royong ini merupakan tradisi rutin yang dilaksanakan setiap bulan...",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=500&fit=crop",
  },
  {
    id: 2,
    title: "Musyawarah Perencanaan Pembangunan Desa",
    date: "25 Desember 2025",
    category: "Pemerintahan",
    excerpt: "Desa Nambongan mengadakan musrenbang untuk merencanakan pembangunan tahun depan. Berbagai usulan dari warga ditampung dalam musyawarah ini.",
    content: "Musrenbang desa tahun ini membahas berbagai program prioritas...",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=500&fit=crop",
  },
  {
    id: 3,
    title: "Posyandu Balita Rutin Bulanan",
    date: "20 Desember 2025",
    category: "Kesehatan",
    excerpt: "Kegiatan posyandu balita dilaksanakan setiap bulan untuk memantau tumbuh kembang anak. Ibu-ibu warga desa antusias mengikuti kegiatan ini.",
    content: "Posyandu merupakan program kesehatan masyarakat yang sangat penting...",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop",
  },
  {
    id: 4,
    title: "Pelatihan UMKM untuk Warga Desa",
    date: "15 Desember 2025",
    category: "Ekonomi",
    excerpt: "Pemerintah desa bekerja sama dengan Dinas Koperasi mengadakan pelatihan kewirausahaan untuk warga. Peserta diajarkan cara mengelola usaha kecil.",
    content: "Pelatihan ini bertujuan meningkatkan kemampuan ekonomi warga desa...",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=500&fit=crop",
  },
  {
    id: 5,
    title: "Perbaikan Jalan Desa RT 03",
    date: "10 Desember 2025",
    category: "Infrastruktur",
    excerpt: "Pemerintah desa telah menyelesaikan perbaikan jalan di RT 03 yang sempat rusak akibat hujan deras. Warga kini dapat beraktivitas dengan nyaman.",
    content: "Perbaikan jalan ini menggunakan dana desa yang telah dialokasikan...",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=500&fit=crop",
  },
  {
    id: 6,
    title: "Festival Budaya Desa Nambongan",
    date: "5 Desember 2025",
    category: "Budaya",
    excerpt: "Desa Nambongan menggelar festival budaya tahunan yang menampilkan berbagai kesenian tradisional. Acara ini menarik banyak pengunjung dari luar desa.",
    content: "Festival budaya menjadi ajang pelestarian tradisi dan budaya lokal...",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=500&fit=crop",
  },
];

const categoryColors: Record<string, string> = {
  Kegiatan: "bg-primary/10 text-primary",
  Pemerintahan: "bg-blue-100 text-blue-700",
  Kesehatan: "bg-red-100 text-red-700",
  Ekonomi: "bg-amber-100 text-amber-700",
  Infrastruktur: "bg-slate-100 text-slate-700",
  Budaya: "bg-purple-100 text-purple-700",
};

const Berita = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Berita Desa
            </h1>
            <p className="text-lg text-muted-foreground">
              Informasi terbaru seputar kegiatan dan perkembangan Desa Nambongan
            </p>
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-8">
              {newsData.map((news, index) => (
                <Card
                  key={news.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <div className="aspect-video md:aspect-auto md:h-full">
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <CardContent className="md:w-2/3 p-6">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            categoryColors[news.category] || "bg-muted text-muted-foreground"
                          }`}
                        >
                          {news.category}
                        </span>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {news.date}
                        </div>
                      </div>
                      <h2 className="text-xl font-bold text-foreground mb-3">
                        {news.title}
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        {news.excerpt}
                      </p>
                      <Button variant="link" className="p-0 h-auto text-primary">
                        Baca Selengkapnya
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Berita;
