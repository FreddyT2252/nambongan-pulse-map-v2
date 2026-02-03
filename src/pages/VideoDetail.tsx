import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Calendar, ArrowLeft, Eye, ThumbsUp, Share2, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useYouTubeVideos, YouTubeVideo } from "@/hooks/useYouTubeVideos";

const API_KEY = 'AIzaSyBVbdCvF5L2SU5Q1CpVwJDNZvHnaf7K6Sg';

interface VideoStats {
  viewCount: string;
  likeCount: string;
}

const VideoDetail = () => {
  const { id } = useParams();
  const { videos, loading: videosLoading } = useYouTubeVideos();
  const [videoStats, setVideoStats] = useState<VideoStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const currentVideo = videos.find((v) => v.videoId === id);
  const relatedVideos = videos.filter((v) => v.videoId !== id).slice(0, 3);

  // Format tanggal
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Format angka (1234 -> 1.2K)
  const formatNumber = (num: string) => {
    const number = parseInt(num);
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M';
    }
    if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'K';
    }
    return number.toString();
  };

  // Fetch video statistics
  useEffect(() => {
    const fetchVideoStats = async () => {
      if (!id) return;

      try {
        setStatsLoading(true);
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${id}&part=statistics`
        );

        if (!response.ok) throw new Error('Gagal mengambil statistik video');

        const data = await response.json();
        if (data.items && data.items.length > 0) {
          const stats = data.items[0].statistics;
          setVideoStats({
            viewCount: stats.viewCount || '0',
            likeCount: stats.likeCount || '0',
          });
        }
      } catch (err) {
        console.error('Error fetching video stats:', err);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchVideoStats();
  }, [id]);

  // Loading state
  if (videosLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Memuat video...</p>
        </div>
      </Layout>
    );
  }

  // Video not found
  if (!currentVideo) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-4">Video tidak ditemukan</h1>
          <Link to="/video">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Video
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/video">
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Video
            </Button>
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Video */}
            <div className="lg:col-span-2 animate-fade-up">
              {/* Video Player */}
              <div className="aspect-video rounded-xl overflow-hidden shadow-xl mb-6">
                <iframe
                  src={`https://www.youtube.com/embed/${currentVideo.videoId}?autoplay=0`}
                  title={currentVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Info */}
              <div className="bg-card rounded-xl p-6 shadow-lg">
                <h1 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                  {currentVideo.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {formatDate(currentVideo.publishedAt)}
                  </div>
                  {videoStats && !statsLoading && (
                    <>
                      <div className="flex items-center gap-1.5">
                        <Eye className="w-4 h-4" />
                        {formatNumber(videoStats.viewCount)} tayangan
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ThumbsUp className="w-4 h-4" />
                        {formatNumber(videoStats.likeCount)} suka
                      </div>
                    </>
                  )}
                </div>

                <div className="flex gap-3 mb-6">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(`https://www.youtube.com/watch?v=${currentVideo.videoId}`, '_blank')}
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Suka
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: currentVideo.title,
                          url: window.location.href
                        });
                      }
                    }}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Bagikan
                  </Button>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-foreground mb-3">Deskripsi</h3>
                  <div className="text-muted-foreground space-y-3 whitespace-pre-line">
                    {currentVideo.description || 'Tidak ada deskripsi'}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Related Videos */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-foreground mb-4">Video Lainnya</h3>
              <div className="space-y-4">
                {relatedVideos.length > 0 ? (
                  relatedVideos.map((related, index) => (
                    <Link key={related.id} to={`/video/${related.videoId}`}>
                      <Card 
                        className="overflow-hidden hover:shadow-md transition-all duration-300 animate-fade-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex gap-3 p-3">
                          <div className="w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                            <img
                              src={related.thumbnailUrl}
                              alt={related.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-foreground text-sm line-clamp-2 mb-1">
                              {related.title}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(related.publishedAt)}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Tidak ada video lain
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default VideoDetail;