import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Calendar, ArrowLeft, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

const placeholderImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop";

const newsData = [
  {
    id: 1,
    title: "Gotong Royong Bersih Pedukuhan",
    date: "28 Desember 2025",
    category: "Kegiatan",
    author: "Admin Pedukuhan",
    excerpt: "Warga Pedukuhan Nambongan mengadakan kegiatan gotong royong membersihkan lingkungan.",
    content: `Kegiatan gotong royong ini merupakan tradisi rutin yang dilaksanakan setiap bulan oleh warga Pedukuhan Nambongan. Acara dimulai pukul 07.00 WIB dan diikuti oleh seluruh warga dari berbagai RT/RW.

Dalam kegiatan ini, warga bersama-sama membersihkan selokan, memotong rumput liar, dan mengumpulkan sampah di sekitar lingkungan. Kegiatan ini tidak hanya bertujuan untuk menjaga kebersihan, tetapi juga mempererat tali silaturahmi antar warga.

Kepala Pedukuhan, Bapak Surono, menyampaikan apresiasi kepada seluruh warga yang telah berpartisipasi. "Semangat gotong royong ini harus terus kita jaga sebagai warisan budaya leluhur kita," ujarnya.

Setelah kegiatan bersih-bersih, warga juga menikmati hidangan sederhana yang telah disiapkan oleh ibu-ibu PKK. Acara ditutup dengan doa bersama untuk keselamatan dan kesejahteraan warga pedukuhan.`,
    image: placeholderImage,
  },
  {
    id: 2,
    title: "Musyawarah Perencanaan Pembangunan Pedukuhan",
    date: "25 Desember 2025",
    category: "Pemerintahan",
    author: "Sekretaris Pedukuhan",
    excerpt: "Pedukuhan Nambongan mengadakan musyawarah untuk merencanakan pembangunan tahun depan.",
    content: `Musyawarah pedukuhan tahun ini membahas berbagai program prioritas pembangunan untuk tahun mendatang. Acara dihadiri oleh seluruh ketua RT/RW, tokoh masyarakat, dan perwakilan warga.

Beberapa program yang diusulkan antara lain perbaikan jalan gang, pembangunan balai warga, dan program pemberdayaan ekonomi untuk UMKM. Seluruh usulan akan dikompilasi dan diajukan ke pemerintah desa.

Forum musyawarah berjalan dengan lancar dan demokratis. Setiap warga diberi kesempatan untuk menyampaikan aspirasinya. Hasil musyawarah akan menjadi dasar penyusunan program kerja pedukuhan tahun depan.`,
    image: placeholderImage,
  },
  {
    id: 3,
    title: "Posyandu Balita Rutin Bulanan",
    date: "20 Desember 2025",
    category: "Kesehatan",
    author: "Kader Posyandu",
    excerpt: "Kegiatan posyandu balita dilaksanakan setiap bulan untuk memantau tumbuh kembang anak.",
    content: `Posyandu merupakan program kesehatan masyarakat yang sangat penting untuk memantau tumbuh kembang balita. Kegiatan ini dilaksanakan setiap bulan di balai pedukuhan.

Pada kegiatan bulan ini, tercatat sebanyak 45 balita yang hadir untuk ditimbang dan diukur tinggi badannya. Para kader posyandu dengan sigap melayani ibu-ibu yang membawa anaknya.

Selain penimbangan, juga dilakukan imunisasi dan pemberian vitamin A untuk balita. Bidan desa juga memberikan penyuluhan tentang gizi seimbang untuk anak.`,
    image: placeholderImage,
  },
  {
    id: 4,
    title: "Pelatihan UMKM untuk Warga Desa",
    date: "15 Desember 2025",
    category: "Ekonomi",
    author: "Admin Pedukuhan",
    excerpt: "Pemerintah desa bekerja sama dengan Dinas Koperasi mengadakan pelatihan kewirausahaan.",
    content: `Pelatihan ini bertujuan meningkatkan kemampuan ekonomi warga desa melalui pengembangan usaha kecil menengah. Peserta diajarkan cara mengelola usaha kecil dan pemasaran produk.

Materi yang disampaikan meliputi pembuatan rencana bisnis, pengelolaan keuangan sederhana, dan strategi pemasaran digital. Peserta juga diberi kesempatan untuk praktek langsung.

Diharapkan setelah pelatihan ini, warga dapat mengembangkan usaha sendiri dan meningkatkan pendapatan keluarga.`,
    image: placeholderImage,
  },
  {
    id: 5,
    title: "Perbaikan Jalan Desa RT 03",
    date: "10 Desember 2025",
    category: "Infrastruktur",
    author: "Ketua RT 03",
    excerpt: "Pemerintah desa telah menyelesaikan perbaikan jalan di RT 03 yang sempat rusak.",
    content: `Perbaikan jalan ini menggunakan dana desa yang telah dialokasikan untuk pembangunan infrastruktur. Jalan sepanjang 200 meter telah diaspal dengan baik.

Warga RT 03 sangat bersyukur dengan selesainya perbaikan jalan ini. Sebelumnya, jalan tersebut berlubang dan becek saat hujan, menyulitkan warga untuk beraktivitas.

Kepala Desa berharap pembangunan infrastruktur akan terus berlanjut untuk meningkatkan kualitas hidup warga.`,
    image: placeholderImage,
  },
  {
    id: 6,
    title: "Festival Budaya Pedukuhan Nambongan",
    date: "5 Desember 2025",
    category: "Budaya",
    author: "Panitia Festival",
    excerpt: "Pedukuhan Nambongan menggelar festival budaya tahunan yang menampilkan berbagai kesenian tradisional.",
    content: `Festival budaya menjadi ajang pelestarian tradisi dan budaya lokal yang sangat dinantikan setiap tahunnya. Acara ini menampilkan berbagai kesenian tradisional seperti tari, musik gamelan, dan pertunjukan wayang.

Ribuan pengunjung dari berbagai daerah datang untuk menyaksikan festival ini. Selain pertunjukan seni, juga ada pameran kuliner tradisional dan kerajinan tangan khas daerah.

Festival ini diharapkan dapat terus menjadi wadah pelestarian budaya sekaligus promosi wisata pedukuhan.`,
    image: placeholderImage,
  },
];

const categoryColors: Record<string, string> = {
  Kegiatan: "bg-primary/10 text-primary",
  Pemerintahan: "bg-blue-100 text-blue-700",
  Kesehatan: "bg-red-100 text-red-700",
  Ekonomi: "bg-amber-100 text-amber-700",
  Infrastruktur: "bg-slate-100 text-slate-700",
  Budaya: "bg-purple-100 text-purple-700",
};

const BeritaDetail = () => {
  const { id } = useParams();
  const news = newsData.find((n) => n.id === Number(id));

  if (!news) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Berita tidak ditemukan</h1>
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
      {/* Hero Image */}
      <div className="relative h-[40vh] md:h-[50vh]">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto -mt-32 relative z-10">
            {/* Back Button */}
            <Link to="/berita">
              <Button variant="outline" size="sm" className="mb-6 bg-background">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
            </Link>

            {/* Article Card */}
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
                  {news.date}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  {news.author}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                {news.title}
              </h1>

              {/* Content */}
              <div className="prose prose-lg max-w-none text-muted-foreground">
                {news.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Share Section */}
              <div className="mt-10 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">Bagikan berita ini:</p>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm">
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm">
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm">
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BeritaDetail;
