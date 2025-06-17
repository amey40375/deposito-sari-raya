
import React from 'react';
import { Building2, User, Search, HelpCircle, Home } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b-2 border-blue-100 banking-shadow sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 banking-gradient rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div className="font-bold text-xl text-blue-900">
              Bank Nasional Indonesia
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="flex items-center space-x-2 text-blue-900 hover:text-blue-700 transition-colors font-medium">
              <Home className="w-4 h-4" />
              <span>Beranda</span>
            </a>
            <a href="#" className="text-blue-900 hover:text-blue-700 transition-colors font-medium">
              Produk & Layanan
            </a>
            <a href="#" className="text-blue-900 hover:text-blue-700 transition-colors font-medium">
              Promo
            </a>
            <a href="#" className="flex items-center space-x-2 text-blue-900 hover:text-blue-700 transition-colors font-medium">
              <HelpCircle className="w-4 h-4" />
              <span>Bantuan</span>
            </a>
          </nav>

          {/* Login Button */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium">
              <User className="w-4 h-4" />
              <span>Login Internet Banking</span>
            </button>
            
            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-blue-900">
              <div className="space-y-1">
                <div className="w-5 h-0.5 bg-blue-900"></div>
                <div className="w-5 h-0.5 bg-blue-900"></div>
                <div className="w-5 h-0.5 bg-blue-900"></div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
