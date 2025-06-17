
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
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-900 mb-4">
            Daftar Perusahaan Terdaftar
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Cari nama perusahaan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>

          {/* Company List */}
          <div className="overflow-y-auto max-h-96">
            <div className="space-y-2">
              {filteredCompanies.map((company, index) => (
                <div
                  key={index}
                  onClick={() => handleCompanyClick(company)}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all duration-200 banking-shadow"
                >
                  <Building2 className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-blue-900">{company}</div>
                    <div className="text-sm text-gray-600">
                      {index + 1 === 1 ? "1.859 karyawan terdaftar" : `${Math.floor(Math.random() * 500) + 100} karyawan terdaftar`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {filteredCompanies.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Tidak ada perusahaan yang sesuai dengan pencarian Anda.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyListModal;
