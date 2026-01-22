import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Calendar, ArrowLeft, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { fetchNewsDetail, type NewsDetail } from "@/lib/newsApi";

const placeholderImage =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop";

const categoryColors: Record<string, string> = {
  Kegiatan: "bg-primary/10 text-primary",
  Pemerintahan: "bg-blue-100 text-blue-700",
  Kesehatan: "bg-red-100 text-red-700",
  Ekonomi: "bg-amber-100 text-amber-700",
  Budaya: "bg-purple-100 text-purple-700",
  Infrastruktur: "bg-emerald-100 text-emerald-700",
};

function formatDate(dateString: string) {
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return dateString; // fallback kalau bukan ISO
  return d.toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const BeritaDetail = () => {
  const [news, setNews] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const data = await fetchNewsDetail(id);
        setNews(data);
      } catch (e: any) {
        setErr(e?.message || "Gagal memuat berita");
        setNews(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <p className="text-muted-foreground">Memuat berita...</p>
        </div>
      </Layout>
    );
  }

  if (err || !news) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {err || "Berita tidak ditemukan"}
          </h1>
          <Link to="/berita">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Berita
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Image (sementara pakai placeholder) */}
      <div className="relative h-[40vh] md:h-[50vh]">
        <img
          src={placeholderImage}
          alt={news.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto -mt-32 relative z-10">
            <Link to="/berita">
              <Button variant="outline" size="sm" className="mb-6 bg-background">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
            </Link>

            <div className="bg-card rounded-2xl shadow-xl p-6 md:p-10 animate-fade-up">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                    categoryColors[news.category] || "bg-muted text-muted-foreground"
                  }`}
                >
                  <Tag className="w-3.5 h-3.5 inline mr-1.5" />
                  {news.category}
                </span>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {formatDate(news.date)}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                {news.title}
              </h1>

              {/* Excerpt */}
              {news.excerpt && (
                <p className="text-base md:text-lg text-muted-foreground mb-6">
                  {news.excerpt}
                </p>
              )}

              {/* Content */}
              <div className="prose prose-lg max-w-none text-muted-foreground">
                {(news.content || "")
                  .split("\n\n")
                  .filter(Boolean)
                  .map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BeritaDetail;
