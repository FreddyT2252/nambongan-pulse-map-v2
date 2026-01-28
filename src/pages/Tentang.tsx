import Layout from "@/components/Layout";
import VillageMap, { rtRwData, totalKK, lastUpdated } from "@/components/VillageMap";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Home, MapPin, User, Calendar } from "lucide-react";

// Perhitungan statistik - KK diambil dari VillageMap
const totalStats = {
  totalPenduduk: rtRwData.reduce((acc, curr) => acc + curr.jumlahPenduduk, 0),
  totalKK: totalKK,
  totalLakilaki: rtRwData.reduce((acc, curr) => acc + curr.lakilaki, 0),
  totalPerempuan: rtRwData.reduce((acc, curr) => acc + curr.perempuan, 0),
};

const Tentang = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Tentang Padukuhan Nambongan
            </h1>
            <p className="text-lg text-muted-foreground">
              Mengenal lebih dekat Padukuhan Nambongan, Desa Tlogoadi, Sleman, Yogyakarta
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Profil Padukuhan</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Padukuhan Nambongan adalah sebuah padukuhan yang terletak di Desa Tlogoadi, 
                Kecamatan Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta. 
                Padukuhan ini dikenal dengan keindahan alamnya yang asri, sawah-sawah hijau 
                yang membentang luas, serta masyarakat yang ramah dan gotong royong.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Dengan visi "Mewujudkan Padukuhan Nambongan yang Maju, Mandiri, dan Sejahtera", 
                warga padukuhan terus berupaya meningkatkan kualitas hidup masyarakat 
                melalui berbagai program pembangunan dan pemberdayaan.
              </p>
            </div>

            {/* Stats Cards - KK Total Padukuhan */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{totalStats.totalPenduduk}</p>
                  <p className="text-sm text-muted-foreground">Total Penduduk</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Home className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{totalStats.totalKK}</p>
                  <p className="text-sm text-muted-foreground">Kepala Keluarga</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{totalStats.totalLakilaki}</p>
                  <p className="text-sm text-muted-foreground">Laki-laki</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-3">
                    <User className="w-6 h-6 text-pink-600" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{totalStats.totalPerempuan}</p>
                  <p className="text-sm text-muted-foreground">Perempuan</p>
                </CardContent>
              </Card>
            </div>

            {/* Last Updated Info */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-16 bg-muted/30 rounded-lg py-3 px-4">
              <Calendar className="w-4 h-4" />
              <span>Diperbarui terakhir pada <span className="font-semibold text-foreground">{lastUpdated}</span></span>
            </div>

            {/* Map Section
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-primary" />
                Peta Lokasi dan Data RT/RW
              </h2>
              <p className="text-muted-foreground mb-6">
                Klik pada marker di peta untuk melihat informasi detail jumlah penduduk tiap RT/RW
              </p>
              <VillageMap className="h-[500px]" />
            </div> */}

            {/* RT/RW Table - Urutan: RT/RW, Laki-Laki, Perempuan, Total */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Data Penduduk per RT/RW</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary text-primary-foreground">
                      <th className="px-4 py-3 text-left font-semibold">RT/RW</th>
                      <th className="px-4 py-3 text-center font-semibold">Laki-laki</th>
                      <th className="px-4 py-3 text-center font-semibold">Perempuan</th>
                      <th className="px-4 py-3 text-center font-semibold">Total Penduduk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rtRwData.map((data, index) => (
                      <tr
                        key={data.id}
                        className={`${
                          index % 2 === 0 ? "bg-card" : "bg-muted/50"
                        } hover:bg-primary/5 transition-colors`}
                      >
                        <td className="px-4 py-3 font-medium">{data.name}</td>
                        <td className="px-4 py-3 text-center">{data.lakilaki}</td>
                        <td className="px-4 py-3 text-center">{data.perempuan}</td>
                        <td className="px-4 py-3 text-center font-semibold">{data.jumlahPenduduk} jiwa</td>
                      </tr>
                    ))}
                    {/* Baris Total di Tabel tanpa Kolom KK */}
                    <tr className="bg-primary/10 font-bold">
                      <td className="px-4 py-3">Total</td>
                      <td className="px-4 py-3 text-center">{totalStats.totalLakilaki}</td>
                      <td className="px-4 py-3 text-center">{totalStats.totalPerempuan}</td>
                      <td className="px-4 py-3 text-center">{totalStats.totalPenduduk} jiwa</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Tentang;