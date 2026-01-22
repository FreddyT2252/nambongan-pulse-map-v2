import React, { useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import LocationPickerMap from "@/components/LocationPickerMap";
import { MapPin, Send, Camera, X } from "lucide-react";

// ===== CONSTANTS =====
const MAX_PHOTOS = 5;
const MAX_PHOTO_SIZE_MB = 5;

// ===== TYPES =====
type FormData = {
  nama: string;
  telepon: string;
  kategori: string;
  deskripsi: string;
};

type Location = {
  lat: number;
  lng: number;
};

type EncodedPhoto = {
  name: string;
  type: string;
  base64: string;
};

type LaporanPayload = {
  nama: string;
  telepon: string;
  kategori: string;
  deskripsi: string;
  lat: string | number;
  lng: string | number;
  photos: EncodedPhoto[];
};

type ApiResponse = {
  ok: boolean;
  id?: string;
  error?: string;
};

// ===== UTILITIES =====
const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1] || "";
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

// ===== COMPONENT =====
const Laporan: React.FC = () => {
  // ===== ENVIRONMENT VARIABLES =====
  const API_BASE = (import.meta.env.VITE_NEWS_API_BASE_URL as string) || "";
  const API_TOKEN = (import.meta.env.VITE_NEWS_API_TOKEN as string) || "";

  const LAPORAN_POST_URL = useMemo(() => {
    if (!API_BASE) return "";
    const tokenPart = API_TOKEN ? `&token=${encodeURIComponent(API_TOKEN)}` : "";
    return `${API_BASE}?route=laporan${tokenPart}`;
  }, [API_BASE, API_TOKEN]);

  // ===== STATE =====
  const [formData, setFormData] = useState<FormData>({
    nama: "",
    telepon: "",
    kategori: "",
    deskripsi: "",
  });

  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [location, setLocation] = useState<Location | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // ===== CATEGORIES =====
  const categories: string[] = [
    "Infrastruktur",
    "Lingkungan",
    "Keamanan",
    "Pelayanan Publik",
    "Sosial",
    "Lainnya",
  ];

  // ===== HANDLERS =====
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const incoming: File[] = Array.from(files);

    // Validasi: limit jumlah foto
    if (photos.length + incoming.length > MAX_PHOTOS) {
      toast.error(`Maksimal ${MAX_PHOTOS} foto.`);
      e.target.value = "";
      return;
    }

    // Validasi: limit size per foto
    const tooBig = incoming.find(
      (f) => f.size > MAX_PHOTO_SIZE_MB * 1024 * 1024
    );
    if (tooBig) {
      toast.error(`Ukuran foto maksimal ${MAX_PHOTO_SIZE_MB}MB per file.`);
      e.target.value = "";
      return;
    }

    // Update photos state
    setPhotos((prev) => [...prev, ...incoming]);

    // Generate previews
    incoming.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    // Reset input agar file yang sama bisa diupload lagi
    e.target.value = "";
  };

  const removePhoto = (index: number): void => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLocationSelect = (lat: number, lng: number): void => {
    setLocation({ lat, lng });
  };

  const validateEnv = (): boolean => {
    if (!API_BASE) {
      toast.error("API base URL belum diisi", {
        description:
          "Isi VITE_NEWS_API_BASE_URL di .env lalu restart Vite dev server.",
      });
      return false;
    }

    if (!API_TOKEN) {
      toast.warning("API token kosong", {
        description:
          "Boleh jalan, tapi lebih aman isi VITE_NEWS_API_TOKEN untuk cegah spam.",
      });
    }

    if (!LAPORAN_POST_URL) {
      toast.error("URL laporan tidak valid");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateEnv()) return;

    if (!formData.nama || !formData.deskripsi) {
      toast.error("Mohon lengkapi nama dan deskripsi laporan");
      return;
    }

    setIsSubmitting(true);

    try {
      // Encode foto ke base64
      const encodedPhotos: EncodedPhoto[] = await Promise.all(
        photos.map(async (p) => ({
          name: p.name,
          type: p.type || "image/jpeg",
          base64: await fileToBase64(p),
        }))
      );

      const payload: LaporanPayload = {
        nama: formData.nama,
        telepon: formData.telepon,
        kategori: formData.kategori,
        deskripsi: formData.deskripsi,
        lat: location?.lat ?? "",
        lng: location?.lng ?? "",
        photos: encodedPhotos,
      };

      const res = await fetch(LAPORAN_POST_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Apps Script kadang response JSON sebagai text
      const text = await res.text();
      let json: ApiResponse;

      try {
        json = JSON.parse(text);
      } catch {
        throw new Error("Response server tidak valid.");
      }

      if (!json?.ok) {
        throw new Error(json?.error || "Gagal mengirim laporan");
      }

      toast.success("Laporan berhasil dikirim!", {
        description: `ID Laporan: ${json.id || "Unknown"}`,
      });

      // Reset form
      setFormData({ nama: "", telepon: "", kategori: "", deskripsi: "" });
      setPhotos([]);
      setPhotoPreviews([]);
      setLocation(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Silakan coba lagi";
      toast.error("Gagal mengirim laporan", {
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ===== RENDER =====
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Laporan Warga
            </h1>
            <p className="text-lg text-muted-foreground">
              Sampaikan keluhan, saran, atau aspirasi Anda untuk kemajuan Pedukuhan Nambongan
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Form Laporan</CardTitle>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Informasi Pelapor */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nama">Nama Lengkap *</Label>
                      <Input
                        id="nama"
                        name="nama"
                        value={formData.nama}
                        onChange={handleInputChange}
                        placeholder="Masukkan nama lengkap"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telepon">Nomor Telepon</Label>
                      <Input
                        id="telepon"
                        name="telepon"
                        type="tel"
                        value={formData.telepon}
                        onChange={handleInputChange}
                        placeholder="08xxxxxxxxxx"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Kategori */}
                  <div className="space-y-2">
                    <Label htmlFor="kategori">Kategori Laporan</Label>
                    <select
                      id="kategori"
                      name="kategori"
                      value={formData.kategori}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Pilih Kategori</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Deskripsi */}
                  <div className="space-y-2">
                    <Label htmlFor="deskripsi">Deskripsi Laporan *</Label>
                    <Textarea
                      id="deskripsi"
                      name="deskripsi"
                      value={formData.deskripsi}
                      onChange={handleInputChange}
                      placeholder="Jelaskan laporan Anda secara detail..."
                      rows={5}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Upload Foto */}
                  <div className="space-y-2">
                    <Label>Foto Pendukung (Opsional)</Label>

                    <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                      <input
                        type="file"
                        id="photos"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoChange}
                        className="hidden"
                        disabled={isSubmitting}
                      />

                      <label
                        htmlFor="photos"
                        className={`cursor-pointer flex flex-col items-center gap-2 ${
                          isSubmitting ? "opacity-50 pointer-events-none" : ""
                        }`}
                      >
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Camera className="w-6 h-6 text-primary" />
                        </div>

                        <p className="text-sm text-muted-foreground">
                          Klik untuk mengunggah foto (maks {MAX_PHOTOS} foto)
                        </p>

                        <p className="text-xs text-muted-foreground">
                          Format: JPG, PNG (Maks. {MAX_PHOTO_SIZE_MB}MB per foto)
                        </p>
                      </label>
                    </div>

                    {/* Photo Previews */}
                    {photoPreviews.length > 0 && (
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-4">
                        {photoPreviews.map((preview, index) => (
                          <div key={index} className="relative group aspect-square">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removePhoto(index)}
                              disabled={isSubmitting}
                              className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                              aria-label={`Hapus foto ${index + 1}`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Lokasi */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      Tandai Lokasi (Opsional)
                    </Label>

                    <LocationPickerMap
                      onLocationSelect={handleLocationSelect}
                      selectedLocation={location}
                      className="h-[300px]"
                    />

                    {location && (
                      <p className="text-sm text-muted-foreground">
                        Koordinat: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Kirim Laporan
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Laporan;