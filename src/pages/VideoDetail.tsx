import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Calendar, ArrowLeft, Eye, ThumbsUp, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const RICK_ROLL_ID = "dQw4w9WgXcQ";

const videoData = [
  {
    id: 1,
    title: "Gotong Royong Bersih Pedukuhan",
    date: "28 Desember 2025",
    views: "1.2K",
    likes: "89",
    description: "Dokumentasi kegiatan gotong royong warga Pedukuhan Nambongan dalam membersihkan lingkungan.",
    fullDescription: `Video dokumentasi lengkap kegiatan gotong royong warga Pedukuhan Nambongan. Kegiatan ini dilaksanakan setiap bulan sebagai tradisi warga untuk menjaga kebersihan lingkungan.

Dalam video ini Anda dapat menyaksikan antusiasme warga dari berbagai RT/RW yang bersama-sama membersihkan selokan, memotong rumput, dan mengumpulkan sampah.

Semangat kebersamaan dan gotong royong menjadi ciri khas warga Pedukuhan Nambongan yang patut dilestarikan.`,
    youtubeId: RICK_ROLL_ID,
  },
  {
    id: 2,
    title: "Musyawarah Pembangunan Desa",
    date: "25 Desember 2025",
    views: "856",
    likes: "67",
    description: "Rekaman musyawarah perencanaan pembangunan pedukuhan untuk tahun depan.",
    fullDescription: `Rekaman lengkap musyawarah perencanaan pembangunan Pedukuhan Nambongan. Acara ini dihadiri oleh seluruh ketua RT/RW, tokoh masyarakat, dan perwakilan warga.

Berbagai usulan program pembangunan dibahas secara demokratis, mulai dari perbaikan infrastruktur hingga program pemberdayaan ekonomi warga.

Hasil musyawarah ini menjadi dasar penyusunan program kerja pedukuhan untuk tahun mendatang.`,
    youtubeId: RICK_ROLL_ID,
  },
  {
    id: 3,
    title: "Festival Budaya Tahunan",
    date: "20 Desember 2025",
    views: "2.5K",
    likes: "234",
    description: "Keseruan festival budaya tahunan Pedukuhan Nambongan dengan berbagai penampilan seni.",
    fullDescription: `Dokumentasi festival budaya tahunan Pedukuhan Nambongan yang menampilkan berbagai kesenian tradisional.

Dalam video ini Anda dapat menyaksikan pertunjukan tari tradisional, musik gamelan, dan berbagai atraksi budaya lainnya yang memukau.

Festival ini menjadi ajang pelestarian budaya sekaligus promosi wisata pedukuhan.`,
    youtubeId: RICK_ROLL_ID,
  },
  {
    id: 4,
    title: "Posyandu Balita Rutin",
    date: "15 Desember 2025",
    views: "432",
    likes: "45",
    description: "Kegiatan posyandu untuk memantau tumbuh kembang balita di pedukuhan.",
    fullDescription: `Video dokumentasi kegiatan posyandu balita rutin yang dilaksanakan setiap bulan di Pedukuhan Nambongan.

Para kader posyandu dengan sigap melayani ibu-ibu yang membawa anak-anaknya untuk ditimbang dan diukur. Kegiatan ini sangat penting untuk memantau tumbuh kembang balita.

Selain penimbangan, juga dilakukan pemberian vitamin dan penyuluhan kesehatan.`,
    youtubeId: RICK_ROLL_ID,
  },
  {
    id: 5,
    title: "Pelatihan UMKM Warga",
    date: "10 Desember 2025",
    views: "678",
    likes: "56",
    description: "Pelatihan kewirausahaan untuk meningkatkan ekonomi warga pedukuhan.",
    fullDescription: `Dokumentasi pelatihan UMKM yang diselenggarakan untuk warga Pedukuhan Nambongan.

Peserta pelatihan belajar berbagai keterampilan kewirausahaan mulai dari pembuatan rencana bisnis, pengelolaan keuangan, hingga strategi pemasaran digital.

Diharapkan setelah pelatihan ini warga dapat mengembangkan usaha dan meningkatkan perekonomian keluarga.`,
    youtubeId: RICK_ROLL_ID,
  },
  {
    id: 6,
    title: "Kerja Bakti Perbaikan Jalan",
    date: "5 Desember 2025",
    views: "543",
    likes: "48",
    description: "Dokumentasi kerja bakti warga dalam memperbaiki jalan desa yang rusak.",
    fullDescription: `Video dokumentasi kerja bakti warga dalam memperbaiki jalan desa di RT 03 yang sempat rusak akibat hujan.

Warga bergotong royong menguruk dan mengaspal jalan sepanjang 200 meter. Semangat kebersamaan terlihat jelas dalam kegiatan ini.

Berkat kerja keras warga, jalan yang sebelumnya berlubang kini sudah nyaman untuk dilalui.`,
    youtubeId: RICK_ROLL_ID,
  },
];

// Related videos (excluding current)
const getRelatedVideos = (currentId: number) => {
  return videoData.filter((v) => v.id !== currentId).slice(0, 3);
};

const VideoDetail = () => {
  const { id } = useParams();
  const video = videoData.find((v) => v.id === Number(id));

  if (!video) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
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

  const relatedVideos = getRelatedVideos(video.id);

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
                  src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=0`}
                  title={video.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Info */}
              <div className="bg-card rounded-xl p-6 shadow-lg">
                <h1 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                  {video.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {video.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    {video.views} tayangan
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ThumbsUp className="w-4 h-4" />
                    {video.likes} suka
                  </div>
                </div>

                <div className="flex gap-3 mb-6">
                  <Button variant="outline" size="sm">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Suka
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Bagikan
                  </Button>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-foreground mb-3">Deskripsi</h3>
                  <div className="text-muted-foreground space-y-3">
                    {video.fullDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Related Videos */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-foreground mb-4">Video Lainnya</h3>
              <div className="space-y-4">
                {relatedVideos.map((related, index) => (
                  <Link key={related.id} to={`/video/${related.id}`}>
                    <Card 
                      className="overflow-hidden hover:shadow-md transition-all duration-300 animate-fade-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex gap-3 p-3">
                        <div className="w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                          <img
                            src={`https://img.youtube.com/vi/${related.youtubeId}/mqdefault.jpg`}
                            alt={related.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground text-sm line-clamp-2 mb-1">
                            {related.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {related.views} tayangan
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {related.date}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default VideoDetail;
