import { useState, useEffect } from 'react';

const API_KEY = 'AIzaSyBVbdCvF5L2SU5Q1CpVwJDNZvHnaf7K6Sg';
const CHANNEL_ID = 'UCsOfYBmbWNUkvRErTvCR1vQ';
const MAX_RESULTS = 12; // Maksimal 12 video

export interface YouTubeVideo {
  id: string;
  videoId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  channelTitle: string;
}

export const useYouTubeVideos = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=${MAX_RESULTS}&type=video`
        );

        if (!response.ok) {
          throw new Error('Gagal mengambil data video');
        }

        const data = await response.json();

        const formattedVideos: YouTubeVideo[] = data.items.map((item: any) => ({
          id: item.id.videoId,
          videoId: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnailUrl: item.snippet.thumbnails.high.url,
          publishedAt: item.snippet.publishedAt,
          channelTitle: item.snippet.channelTitle,
        }));

        setVideos(formattedVideos);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
        console.error('Error fetching YouTube videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();

    // Auto refresh setiap 5 menit (opsional)
    const interval = setInterval(fetchVideos, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return { videos, loading, error };
};