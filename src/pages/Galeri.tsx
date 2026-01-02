import { useState } from "react";
import Layout from "@/components/Layout";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

// Placeholder images dengan variasi minimal
const placeholder1 = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop";
const placeholder2 = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop";

const galleryImages = [
  { id: 1, src: placeholder1, title: "Kegiatan Gotong Royong", category: "Kegiatan" },
  { id: 2, src: placeholder2, title: "Pemberdayaan Masyarakat", category: "Sosial" },
  { id: 3, src: placeholder1, title: "Kegiatan Warga", category: "Sosial" },
  { id: 4, src: placeholder2, title: "Posyandu Balita", category: "Kesehatan" },
  { id: 5, src: placeholder1, title: "Bersih Desa", category: "Kegiatan" },
  { id: 6, src: placeholder2, title: "Musyawarah Desa", category: "Pemerintahan" },
  { id: 7, src: placeholder1, title: "Festival Budaya", category: "Budaya" },
  { id: 8, src: placeholder2, title: "Pelatihan UMKM", category: "Ekonomi" },
  { id: 9, src: placeholder1, title: "Pelayanan Kesehatan", category: "Kesehatan" },
  { id: 10, src: placeholder2, title: "Pembangunan Infrastruktur", category: "Infrastruktur" },
  { id: 11, src: placeholder1, title: "Pemandangan Desa", category: "Alam" },
  { id: 12, src: placeholder2, title: "Sawah Desa", category: "Alam" },
];

const categories = ["Semua", "Kegiatan", "Sosial", "Kesehatan", "Pemerintahan", "Budaya", "Ekonomi", "Infrastruktur", "Alam"];

const Galeri = () => {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredImages = activeCategory === "Semua"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Galeri Pedukuhan
            </h1>
            <p className="text-lg text-muted-foreground">
              Dokumentasi kegiatan dan keindahan Pedukuhan Nambongan
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-primary-foreground font-medium text-sm">
                      {image.title}
                    </p>
                    <p className="text-primary-foreground/70 text-xs">
                      {image.category}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background/95 backdrop-blur-sm">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-foreground/20 hover:bg-foreground/30 transition-colors"
          >
            <X className="w-5 h-5 text-primary-foreground" />
          </button>
          {selectedImage && (
            <div>
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground">{selectedImage.title}</h3>
                <p className="text-muted-foreground">{selectedImage.category}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Galeri;
