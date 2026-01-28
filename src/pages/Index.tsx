import { Link } from "react-router-dom";
import { useMemo, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Users, Home, FileText, Image, ArrowRight, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-village.jpg";
import { getRandomGalleryImages, galleryImagess } from "@/data/galleryData";
import { rtRwData, totalKK } from "@/components/VillageMap";
import { fetchNewsList, type NewsListItem } from "@/lib/newsApi";

// Hitung statistik dari data VillageMap
const totalPenduduk = rtRwData.reduce((acc, curr) => acc + curr.jumlahPenduduk, 0);
const totalRTRW = rtRwData.length;

const stats = [
  { icon: Users, label: "Total Penduduk", value: totalPenduduk.toString(), suffix: "jiwa" },
  { icon: Home, label: "Kepala Keluarga", value: totalKK.toString(), suffix: "KK" },
  { icon: FileText, label: "RT/RW", value: `${totalRTRW}/4`, suffix: "unit" },
];

const Index = () => {
  const [latestNews, setLatestNews] = useState<NewsListItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);

  // Ambil 4 gambar galeri secara acak
  const randomGalleryImages = useMemo(() => getRandomGalleryImages(4), []);

  // Fungsi untuk mendapatkan gambar berita
  const getNewsImage = (newsId: string | number, index: number) => {
    const imageIndex = typeof newsId === 'number' 
      ? newsId % galleryImagess.length 
      : index % galleryImagess.length;
    return galleryImagess[imageIndex];
  };

  // Fungsi untuk format tanggal
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Fetch berita dari API
  useEffect(() => {
    (async () => {
      try {
        setLoadingNews(true);
        const data = await fetchNewsList();
        // Sort by date descending and take first 3
        const sorted = [...data].sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });
        setLatestNews(sorted.slice(0, 3));
      } catch (e) {
        console.error("Failed to load news:", e);
        setLatestNews([]);
      } finally {
        setLoadingNews(false);
      }
    })();
  }, []);

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
              Padukuhan Nambongan
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-90">
              Padukuhan yang asri di Desa Tlogoadi, Sleman, Yogyakarta - tempat harmoni antara tradisi dan kemajuan bersemi
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
              Informasi dan kegiatan terkini dari Padukuhan Nambongan
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {loadingNews ? (
              <p className="text-muted-foreground col-span-3 text-center">Memuat berita...</p>
            ) : latestNews.length === 0 ? (
              <p className="text-muted-foreground col-span-3 text-center">Belum ada berita</p>
            ) : (
              latestNews.map((news, index) => {
                const imgSrc = getNewsImage(news.id, index);
                return (
                  <Link key={news.id} to={`/berita/${news.id}`}>
                    <Card
                      className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-up cursor-pointer"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={imgSrc}
                          alt={news.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Calendar className="w-4 h-4" />
                          {formatDate(news.date)}
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                          {news.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {news.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })
            )}
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
              Galeri Padukuhan
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dokumentasi kegiatan dan keindahan Padukuhan Nambongan
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {randomGalleryImages.map((img, index) => (
              <div
                key={img.id}
                className="aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={img.src}
                  alt={img.title}
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
            Kami siap mendengar aspirasi Anda. Sampaikan laporan atau saran untuk kemajuan padukuhan bersama.
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