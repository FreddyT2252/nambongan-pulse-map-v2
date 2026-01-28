import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Info Pedukuhan */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold">Padukuhan Nambongan</h3>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Padukuhan Nambongan terletak di Desa Tlogoadi, Kecamatan Mlati, 
              Kabupaten Sleman, DIY. Dikenal dengan keramahan warganya dan keindahan alamnya.
            </p>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak Kami</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Phone className="w-4 h-4" />
                <span>(024) 1234-5678</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Mail className="w-4 h-4" />
                <span>desa.nambongan@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Clock className="w-4 h-4" />
                <span>Senin - Jumat: 08.00 - 16.00 WIB</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tautan Cepat</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Beranda
              </Link>
              <Link to="/tentang" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Tentang
              </Link>
              <Link to="/berita" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Berita
              </Link>
              <Link to="/galeri" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Galeri
              </Link>
              <Link to="/laporan" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Laporan
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Pedukuhan Nambongan, Desa Tlogoadi. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
