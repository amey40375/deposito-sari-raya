
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, Building2 } from 'lucide-react';

interface CompanyListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompanySelect: (company: string) => void;
}

const companies = [
  "The Trans Luxury Hotel's Indonesia",
  "PT. Mega Sentosa Utama",
  "CV. Sumber Jaya Makmur",
  "PT. Nusantara Abadi Group",
  "PT. Sinar Mas Berkah",
  "PT. Global Tekno Mandiri",
  "PT. Berkah Mulia Sejahtera",
  "PT. Surya Inti Prima",
  "CV. Maju Lancar Bersama",
  "PT. Karya Abadi Jaya"
];

const CompanyListModal: React.FC<CompanyListModalProps> = ({ isOpen, onClose, onCompanySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompanies = companies.filter(company =>
    company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCompanyClick = (company: string) => {
    onCompanySelect(company);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[70vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-blue-900 mb-3">
            Daftar Perusahaan Terdaftar
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Cari nama perusahaan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 py-2 text-sm"
            />
          </div>

          {/* Company List */}
          <div className="overflow-y-auto max-h-80">
            <div className="space-y-2">
              {filteredCompanies.map((company, index) => (
                <div
                  key={index}
                  onClick={() => handleCompanyClick(company)}
                  className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all duration-200 banking-shadow"
                >
                  <Building2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-blue-900 text-sm">{company}</div>
                    <div className="text-xs text-gray-600">
                      {index + 1 === 1 ? "1.859 karyawan terdaftar" : `${Math.floor(Math.random() * 500) + 100} karyawan terdaftar`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {filteredCompanies.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              <Building2 className="w-10 h-10 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">Tidak ada perusahaan yang sesuai dengan pencarian Anda.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyListModal;
