import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowRight, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categoryColors } from "@/data/newsData";
import { useEffect, useState } from "react";
import { fetchNewsList, type NewsListItem } from "@/lib/newsApi";
import { galleryImagess } from "@/data/galleryData";

const Berita = () => {
  const [newsData, setNewsData] = useState<NewsListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string | number, boolean>>({});

  function parseDateToTime(value: string | Date) {
    if (value instanceof Date) {
      return value.getTime();
    }

    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      return date.getTime();
    }

    return 0;
  }

  const sortedNews = [...newsData].sort((a, b) => {
    return parseDateToTime(b.date) - parseDateToTime(a.date);
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Function to get image for news item
  const getNewsImage = (newsId: string | number, index: number) => {
    // Try to use news ID if it's a number, otherwise use index
    const imageIndex = typeof newsId === 'number' 
      ? newsId % galleryImagess.length 
      : index % galleryImagess.length;
    
    return galleryImagess[imageIndex];
  };

  const handleImageError = (newsId: string | number) => {
    setImageErrors(prev => ({ ...prev, [newsId]: true }));
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const data = await fetchNewsList();
        setNewsData(data);
      } catch (e: any) {
        setErr(e?.message || "Gagal Memuat berita");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Berita Pedukuhan
            </h1>
            <p className="text-lg text-muted-foreground">
              Informasi terbaru seputar kegiatan dan perkembangan Pedukuhan Nambongan
            </p>
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {loading && <p className="text-muted-foreground">Memuat berita...</p>}
            {err && <p className="text-red-600">{err}</p>}
            <div className="grid gap-8">
              {sortedNews.map((news, index) => {
                const imgSrc = getNewsImage(news.id, index);
                const hasImageError = imageErrors[news.id];

                return (
                  <Link key={news.id} to={`/berita/${news.id}`}>
                    <Card
                      className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-up cursor-pointer"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <div className="aspect-video md:aspect-auto md:h-full bg-muted relative">
                            {hasImageError ? (
                              <div className="w-full h-full flex items-center justify-center">
                                <Image className="w-16 h-16 text-muted-foreground/50" />
                              </div>
                            ) : (
                              <img
                                src={imgSrc}
                                alt={news.title}
                                className="w-full h-full object-cover"
                                onError={() => handleImageError(news.id)}
                                loading="lazy"
                              />
                            )}
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
                              {formatDate(news.date)}
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
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Berita;