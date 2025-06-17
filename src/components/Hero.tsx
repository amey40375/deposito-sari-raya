
import React from 'react';
import { Calendar, Shield, Award, TrendingUp } from 'lucide-react';

interface HeroProps {
  onDepositScheduleClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onDepositScheduleClick }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-6">
            Solusi Perbankan
            <span className="block gold-accent">Terpercaya</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Nikmati layanan perbankan digital terdepan dengan keamanan terjamin dan kemudahan akses 24/7 untuk semua kebutuhan finansial Anda.
          </p>
          
          {/* Main CTA Button */}
          <div className="mb-16">
            <button
              onClick={onDepositScheduleClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 rounded-2xl text-2xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 banking-shadow"
            >
              <Calendar className="w-8 h-8 inline-block mr-4" />
              JADWAL PENCAIRAN DEPOSITO
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-8 rounded-2xl banking-shadow hover:shadow-lg transition-shadow">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-3">Keamanan Terjamin</h3>
              <p className="text-gray-600">Sistem keamanan berlapis dengan enkripsi tingkat bank untuk melindungi data dan transaksi Anda.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl banking-shadow hover:shadow-lg transition-shadow">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-3">Layanan Terbaik</h3>
              <p className="text-gray-600">Mendapatkan berbagai penghargaan nasional untuk layanan perbankan digital terbaik.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl banking-shadow hover:shadow-lg transition-shadow">
              <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-3">Pertumbuhan Optimal</h3>
              <p className="text-gray-600">Dapatkan bunga kompetitif dan produk investasi yang menguntungkan untuk masa depan Anda.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
