import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Loader2 } from "lucide-react";


const API_URL = import.meta.env.VITE_NEWS_API_BASE_URL;

interface GalleryImage {
  id: string;
  title: string;
  src: string;
  thumbnail: string;
}

const Galeri = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}?route=gallery&action=list`);
      const data = await response.json();

      if (data.ok) {
        setImages(data.data);
      } else {
        setError(data.error || "Gagal memuat galeri");
      }
    } catch (err) {
      console.error("Error fetching gallery:", err);
      setError("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

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

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">Memuat galeri...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={fetchGallery}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                Coba Lagi
              </button>
            </div>
          )}

          {/* Gallery Grid */}
          {!loading && !error && images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
              {images.map((image, index) => (
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
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-primary-foreground font-medium text-sm">
                        {image.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && images.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Belum ada foto di galeri</p>
            </div>
          )}
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
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Galeri;