
import React from 'react';
import { Building2, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-900" />
              </div>
              <div className="font-bold text-xl">Bank Nasional Indonesia</div>
            </div>
            <p className="text-blue-200">
              Bank terpercaya yang melayani Indonesia dengan komitmen memberikan solusi finansial terbaik untuk semua.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-blue-200 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-6 h-6 text-blue-200 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-blue-200 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="w-6 h-6 text-blue-200 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Layanan</h3>
            <ul className="space-y-2 text-blue-200">
              <li><a href="#" className="hover:text-white transition-colors">Tabungan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Deposito</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kredit</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Investasi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Asuransi</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-4">Bantuan</h3>
            <ul className="space-y-2 text-blue-200">
              <li><a href="#" className="hover:text-white transition-colors">Pusat Bantuan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hubungi Kami</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Lokasi Cabang</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pengaduan</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Kontak</h3>
            <div className="space-y-3 text-blue-200">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5" />
                <span>14017</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5" />
                <span>info@banknasional.co.id</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1" />
                <span>Jl. Sudirman No. 1, Jakarta Pusat 10110</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
          <p>&copy; 2024 Bank Nasional Indonesia. Semua hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
