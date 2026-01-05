import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { newsData, categoryColors } from "@/data/newsData";

const Berita = () => {
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
            <div className="grid gap-8">
              {newsData.map((news, index) => (
                <Link key={news.id} to={`/berita/${news.id}`}>
                  <Card
                    className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-up cursor-pointer"
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
