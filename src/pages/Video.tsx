import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Calendar } from "lucide-react";

// Rick Roll sebagai placeholder
const RICK_ROLL_ID = "dQw4w9WgXcQ";

const videoData = [
  {
    id: 1,
    title: "Gotong Royong Bersih Pedukuhan",
    date: "28 Desember 2025",
    description: "Dokumentasi kegiatan gotong royong warga Pedukuhan Nambongan dalam membersihkan lingkungan.",
    youtubeId: RICK_ROLL_ID,
  },
  {
    id: 2,
    title: "Musyawarah Pembangunan Desa",
    date: "25 Desember 2025",
    description: "Rekaman musyawarah perencanaan pembangunan pedukuhan untuk tahun depan.",
    youtubeId: RICK_ROLL_ID,
  },
  {
    id: 3,
    title: "Festival Budaya Tahunan",
    date: "20 Desember 2025",
    description: "Keseruan festival budaya tahunan Pedukuhan Nambongan dengan berbagai penampilan seni.",
    youtubeId: RICK_ROLL_ID,
  },
  {
    id: 4,
    title: "Posyandu Balita Rutin",
    date: "15 Desember 2025",
    description: "Kegiatan posyandu untuk memantau tumbuh kembang balita di pedukuhan.",
    youtubeId: RICK_ROLL_ID,
  },
  {
    id: 5,
    title: "Pelatihan UMKM Warga",
    date: "10 Desember 2025",
    description: "Pelatihan kewirausahaan untuk meningkatkan ekonomi warga pedukuhan.",
    youtubeId: RICK_ROLL_ID,
  },
  {
    id: 6,
    title: "Kerja Bakti Perbaikan Jalan",
    date: "5 Desember 2025",
    description: "Dokumentasi kerja bakti warga dalam memperbaiki jalan desa yang rusak.",
    youtubeId: RICK_ROLL_ID,
  },
];

const Video = () => {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {videoData.map((video, index) => (
              <Link key={video.id} to={`/video/${video.id}`}>
                <Card
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-up cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-video relative group">
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
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
                      {video.date}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
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
        </div>
      </section>
    </Layout>
  );
};

export default Video;
