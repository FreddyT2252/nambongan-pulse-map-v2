import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { fetchNewsList, type NewsListItem } from "@/lib/newsApi";

const Berita = () => {
  const [newsData, setNewsData] = useState<NewsListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  function parseDateToTime(value: string | Date) {
    const date = value instanceof Date ? value : new Date(value);
    return isNaN(date.getTime()) ? 0 : date.getTime();
  }

  const sortedNews = useMemo(() => {
    return [...newsData].sort((a, b) => parseDateToTime(b.date) - parseDateToTime(a.date));
  }, [newsData]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const data = await fetchNewsList();
        setNewsData(data);
      } catch (e: any) {
        setErr(e?.message || "Gagal memuat berita");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Layout>
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Berita Padukuhan
            </h1>
            <p className="text-lg text-muted-foreground">
              Informasi terbaru seputar kegiatan dan perkembangan Padukuhan Nambongan
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {loading && <p className="text-center text-muted-foreground">Memuat berita...</p>}
            {err && <p className="text-center text-red-600">{err}</p>}

            <div className="grid gap-6">
              {sortedNews.map((news, index) => (
                <Link key={news.id} to={`/berita/${news.id}`}>
                  <Card
                    className="hover:shadow-md transition-all duration-300 animate-fade-up cursor-pointer border-l-4 border-l-primary"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {news.category || "Lainnya"}
                        </span>

                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {formatDate(news.date)}
                        </div>
                      </div>

                      <h2 className="text-2xl font-bold text-foreground mb-2 leading-tight">
                        {news.title}
                      </h2>
                      <p className="text-muted-foreground mb-4 line-clamp-2">{news.excerpt}</p>

                      <Button variant="link" className="p-0 h-auto text-primary font-semibold">
                        Baca Selengkapnya
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Berita;
