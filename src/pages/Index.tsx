import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Users, Home, FileText, Image, ArrowRight, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-village.jpg";

const stats = [
  { icon: Users, label: "Total Penduduk", value: "1,148", suffix: "jiwa" },
  { icon: Home, label: "Kepala Keluarga", value: "285", suffix: "KK" },
  { icon: FileText, label: "RT/RW", value: "6", suffix: "unit" },
];

const latestNews = [
  {
    id: 1,
    title: "Gotong Royong Bersih Pedukuhan",
    date: "28 Des 2025",
    excerpt: "Warga Pedukuhan Nambongan mengadakan kegiatan gotong royong membersihkan lingkungan...",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Musyawarah Perencanaan Pembangunan",
    date: "25 Des 2025",
    excerpt: "Pedukuhan Nambongan mengadakan musyawarah untuk merencanakan pembangunan tahun depan...",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Posyandu Balita Rutin",
    date: "20 Des 2025",
    excerpt: "Kegiatan posyandu balita dilaksanakan setiap bulan untuk memantau tumbuh kembang anak...",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground">
          <div className="animate-fade-up">
            <p className="text-lg md:text-xl mb-4 opacity-90 font-medium">Selamat Datang di</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Pedukuhan Nambongan
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-90">
              Pedukuhan yang asri di Desa Tlogoadi, Sleman, Yogyakarta - tempat harmoni antara tradisi dan kemajuan bersemi
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tentang">
                <Button variant="hero" size="xl">
                  Jelajahi Desa
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/laporan">
                <Button variant="outline" size="xl" className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  Buat Laporan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card relative -mt-20 z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="card-elevated border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Berita Terbaru
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Informasi dan kegiatan terkini dari Pedukuhan Nambongan
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {latestNews.map((news, index) => (
              <Card
                key={news.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    {news.date}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {news.excerpt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/berita">
              <Button variant="outline" size="lg">
                Lihat Semua Berita
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Galeri Pedukuhan
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dokumentasi kegiatan dan keindahan Pedukuhan Nambongan
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[
              "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=400&fit=crop",
            ].map((img, index) => (
              <div
                key={index}
                className="aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={img}
                  alt={`Galeri ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/galeri">
              <Button variant="outline" size="lg">
                <Image className="w-4 h-4" />
                Lihat Galeri Lengkap
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ada Keluhan atau Saran?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Kami siap mendengar aspirasi Anda. Sampaikan laporan atau saran untuk kemajuan pedukuhan bersama.
          </p>
          <Link to="/laporan">
            <Button variant="hero" size="xl">
              <FileText className="w-5 h-5" />
              Buat Laporan
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
