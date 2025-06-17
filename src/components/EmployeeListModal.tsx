
import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, Users } from 'lucide-react';

interface Employee {
  nama: string;
  cabang: string;
  tanggalPencairan: string;
}

interface EmployeeListModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
}

const EmployeeListModal: React.FC<EmployeeListModalProps> = ({ isOpen, onClose, companyName }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Employee>('nama');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const itemsPerPage = 50;

  // Generate employee data
  const employees = useMemo(() => {
    const data: Employee[] = [];
    const namaDepan = ['Andi', 'Budi', 'Citra', 'Dini', 'Eko', 'Fitri', 'Gina', 'Hadi', 'Indra', 'Joko', 'Karina', 'Lina', 'Maya', 'Nina', 'Oscar', 'Putri', 'Qori', 'Rudi', 'Sari', 'Tina', 'Umar', 'Vina', 'Wati', 'Xavi', 'Yuni', 'Zara'];
    const namaBelakang = ['Ananda', 'Budiman', 'Cahyani', 'Dermawan', 'Eksanti', 'Firmansyah', 'Gunawan', 'Handayani', 'Indrawati', 'Jatmiko', 'Kartika', 'Lestari', 'Maharani', 'Nugroho', 'Oktaviani', 'Prasetyo', 'Qomariah', 'Rachman', 'Santoso', 'Trianggani', 'Utami', 'Vernanda', 'Wibowo', 'Xenofia', 'Yudhistira', 'Zainal'];
    const cabangList = ['Jakarta Pusat', 'Jakarta Selatan', 'Jakarta Utara', 'Jakarta Barat', 'Jakarta Timur', 'Bandung', 'Surabaya', 'Medan', 'Makassar', 'Palembang', 'Semarang', 'Yogyakarta', 'Denpasar', 'Balikpapan', 'Pontianak'];

    const startDate = new Date('2025-06-27');
    
    for (let i = 0; i < 1859; i++) {
      const nama = `${namaDepan[Math.floor(Math.random() * namaDepan.length)]} ${namaBelakang[Math.floor(Math.random() * namaBelakang.length)]}`;
      const cabang = cabangList[Math.floor(Math.random() * cabangList.length)];
      
      // Calculate date (sequential from start date)
      const dateOffset = Math.floor(i / 10); // Distribute dates over time
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + dateOffset);
      
      // Special entry for July 18, 2025
      if (i === 500) {
        data.push({
          nama: 'Rama Verdianto',
          cabang: 'Bandung',
          tanggalPencairan: '18/07/2025'
        });
      } else if (i === 501) {
        data.push({
          nama: 'Siti Aminah',
          cabang: 'Bandung',
          tanggalPencairan: '18/07/2025'
        });
      } else {
        data.push({
          nama,
          cabang,
          tanggalPencairan: `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()}`
        });
      }
    }
    
    return data;
  }, []);

  // Filter employees
  const filteredEmployees = employees.filter(employee =>
    employee.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.cabang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort employees
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === 'asc') {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  // Paginate employees
  const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = sortedEmployees.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field: keyof Employee) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const getSortIcon = (field: keyof Employee) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4" />;
    return sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-900 mb-2">
            Daftar Karyawan - {companyName}
          </DialogTitle>
          <div className="flex items-center space-x-2 text-gray-600">
            <Users className="w-5 h-5" />
            <span>Total: {filteredEmployees.length} karyawan</span>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Cari nama karyawan atau cabang..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 py-3"
            />
          </div>

          {/* Table */}
          <div className="overflow-y-auto max-h-96 border rounded-lg">
            <table className="w-full">
              <thead className="bg-blue-50 sticky top-0">
                <tr>
                  <th 
                    className="px-6 py-4 text-left font-semibold text-blue-900 cursor-pointer hover:bg-blue-100 transition-colors"
                    onClick={() => handleSort('nama')}
                  >
                    <div className="flex items-center space-x-2">
                      <span>Nama</span>
                      {getSortIcon('nama')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left font-semibold text-blue-900 cursor-pointer hover:bg-blue-100 transition-colors"
                    onClick={() => handleSort('cabang')}
                  >
                    <div className="flex items-center space-x-2">
                      <span>Cabang</span>
                      {getSortIcon('cabang')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left font-semibold text-blue-900 cursor-pointer hover:bg-blue-100 transition-colors"
                    onClick={() => handleSort('tanggalPencairan')}
                  >
                    <div className="flex items-center space-x-2">
                      <span>Tanggal Pencairan</span>
                      {getSortIcon('tanggalPencairan')}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedEmployees.map((employee, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium">{employee.nama}</td>
                    <td className="px-6 py-4 text-gray-700">{employee.cabang}</td>
                    <td className="px-6 py-4 text-gray-700">{employee.tanggalPencairan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, sortedEmployees.length)} dari {sortedEmployees.length} karyawan
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Sebelumnya
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className="w-10"
                    >
                      {page}
                    </Button>
                  );
                })}
                {totalPages > 5 && (
                  <>
                    <span className="text-gray-400">...</span>
                    <Button
                      variant={currentPage === totalPages ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(totalPages)}
                      className="w-10"
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Selanjutnya
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeListModal;
