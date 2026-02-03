import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Calendar, Loader2, AlertCircle } from "lucide-react";
import { useYouTubeVideos } from "@/hooks/useYouTubeVideos";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Video = () => {
  const { videos, loading, error } = useYouTubeVideos();

  // Format tanggal ke bahasa Indonesia
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Video Kegiatan
            </h1>
            <p className="text-lg text-muted-foreground">
              Dokumentasi video kegiatan masyarakat Pedukuhan Nambongan
            </p>
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Memuat video...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <Alert variant="destructive" className="max-w-2xl mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error}. Silakan coba lagi nanti.
              </AlertDescription>
            </Alert>
          )}

          {/* Videos Grid */}
          {!loading && !error && videos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {videos.map((video, index) => (
                <Link key={video.id} to={`/video/${video.videoId}`}>
                  <Card
                    className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-up cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="aspect-video relative group">
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                        <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-7 h-7 text-primary-foreground fill-current ml-1" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="w-4 h-4" />
                        {formatDate(video.publishedAt)}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {video.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && videos.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                Belum ada video yang tersedia
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Video;