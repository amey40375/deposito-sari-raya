import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, Users, Calendar, CreditCard, User, Clock, AlertTriangle, Check, ArrowRight, Shield, CheckCircle } from 'lucide-react';

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

interface EmployeeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeName: string;
}

const EmployeeDetailModal: React.FC<EmployeeDetailModalProps> = ({ isOpen, onClose, employeeName }) => {
  const isConfirmedEmployee = employeeName === 'Rama Verdianto A/n Siti Aminah' || employeeName === 'Siti Aminah';

  const handleEmployeeClick = () => {
    console.log('Employee clicked:', employeeName);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
        <DialogHeader className="text-center border-b border-blue-200 pb-4">
          <DialogTitle className="text-2xl font-bold text-blue-900 mb-2">
            Detail Deposito Karyawan
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-2">
          {isConfirmedEmployee ? (
            <Alert className="border-green-500 bg-green-50">
              <Check className="h-5 w-5 text-green-600" />
              <AlertDescription className="text-green-800 text-sm leading-relaxed">
                <strong>KONFIRMASI:</strong> Nomor Antrian Telah Dikonfirmasi dan Bermaterai
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="border-red-500 bg-red-50 animate-pulse">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <AlertDescription className="text-red-800 text-sm leading-relaxed">
                <strong>PERINGATAN:</strong> Anda Belum Mengonfirmasi Jadwal Ini dan Untuk tetap Menetapkan Jadwal ini Silahkan Datang ke Kantor BRI Pusat Jawa Barat Apabila Anda Mengabaikan Tindakan Ini Maka Jadwal Tidak akan Tetap dan Masih Bisa Di Klaim Oleh Orang Lain, Selambat lambatnya Pada Hari Selasa, 23 Juni 2025 Mohon untuk Tidak Mengabaikan Tindakan ini
              </AlertDescription>
            </Alert>
          )}

          <div 
            className="text-center bg-blue-900 text-white p-4 rounded-lg shadow-lg cursor-pointer hover:bg-blue-800 transition-colors" 
            onClick={handleEmployeeClick}
          >
            <p className="text-xl font-bold text-yellow-300 mb-1">NOMOR ANTRIAN</p>
            <p className="text-4xl font-bold">3885-BA</p>
            {isConfirmedEmployee && (
              <p className="text-sm text-blue-200 mt-2">Klik untuk melanjutkan</p>
            )}
          </div>

          <div className="bg-white border border-blue-200 rounded-lg p-4 shadow-sm">
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-blue-600" />
                <div>
                  <span className="font-semibold text-gray-700">Nama Karyawan:</span>
                  <span className="ml-2 font-bold text-blue-900">RAMA VERDIANTO</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-green-600" />
                <div>
                  <span className="font-semibold text-gray-700">Status Deposito:</span>
                  <span className="ml-2 font-bold text-green-600">Aktif</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-purple-600" />
                <div>
                  <span className="font-semibold text-gray-700">Nama Wakil/Kuasa:</span>
                  <span className="ml-2 font-bold text-purple-900">SITI AMINAH</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-orange-600" />
                <div>
                  <span className="font-semibold text-gray-700">Tanggal Pencairan:</span>
                  <span className="ml-2 font-bold text-orange-900">30 JULI 2025</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="space-y-2">
              <div>
                <span className="font-semibold text-gray-700">Nominal Pencairan:</span>
                <p className="text-2xl font-bold text-green-700">Rp 200.350.000,-</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Terhitung:</span>
                <p className="font-medium text-green-800 italic">Dua Ratus Juta Tigaratus Lima Puluh Ribu Rupiah</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-blue-800 leading-relaxed">
              Maka Dari Itu terimakasih Sudah Bersabar Untuk Menunggu Karena Kami Mencairkan Deposito Sesuai Dengan Nomor Antrian Yang anda dapatkan,
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-bold text-yellow-800 mb-3 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              JADWAL UNTUK ANDA:
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-white rounded border-l-4 border-yellow-500">
                <Calendar className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">27 Juli 2025</p>
                  <p className="text-sm text-gray-700">Buku Rekening & ATM Akan Tiba Di Alamat Ibu Siti Aminah</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-white rounded border-l-4 border-green-500">
                <Clock className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">30 Juli 2025 - Pukul 08.00 WIB</p>
                  <p className="text-sm text-gray-700">DANA Deposito Anda Sudah Masuk Ke Rekening</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const EmployeeListModal: React.FC<EmployeeListModalProps> = ({ isOpen, onClose, companyName }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Employee>('nama');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const itemsPerPage = 50;

  const employees = useMemo(() => {
    const data: Employee[] = [];
    const namaDepan = ['Agus', 'Bayu', 'Citra', 'Dewi', 'Eko', 'Fitri', 'Gani', 'Hani', 'Indra', 'Joko', 'Kirana', 'Lina', 'Maya', 'Nina', 'Omar', 'Putri', 'Qori', 'Rudi', 'Sari', 'Tina', 'Umar', 'Vera', 'Wati', 'Xenia', 'Yuni', 'Zahra', 'Abdul', 'Bela', 'Candra', 'Dika', 'Erlangga', 'Fauzi', 'Gilang', 'Hendra', 'Irwan', 'Jihan', 'Krisna', 'Lukman', 'Melani', 'Nanda', 'Olivia', 'Pandu', 'Qila', 'Rizki', 'Sinta', 'Taufik', 'Ulfa', 'Vicky', 'Wahyu', 'Xara', 'Yoga', 'Zulfa'];
    const namaBelakang = ['Ananda', 'Budiman', 'Cahyani', 'Dermawan', 'Eksanti', 'Firmansyah', 'Gunawan', 'Handayani', 'Indrawati', 'Jatmiko', 'Kartika', 'Lestari', 'Maharani', 'Nugroho', 'Oktaviani', 'Prasetyo', 'Qomariah', 'Rachman', 'Santoso', 'Trianggani', 'Utami', 'Vernanda', 'Wibowo', 'Xenofia', 'Yudhistira', 'Zainal', 'Adriansyah', 'Bintang', 'Celestine', 'Darmawan', 'Efendi', 'Fadhilah', 'Gustomo', 'Harahap', 'Iskandar', 'Juliana', 'Kurniawan', 'Larasati', 'Maulana', 'Nursyah', 'Oktavianto', 'Permana', 'Qurnia', 'Ramadhan', 'Sukamto', 'Tirtayasa', 'Uswatun', 'Verdiana', 'Widodo', 'Xaverius', 'Yusrina', 'Zulkarnain'];
    const cabangList = ['Jakarta Pusat', 'Jakarta Selatan', 'Jakarta Utara', 'Jakarta Barat', 'Jakarta Timur', 'Bandung', 'Surabaya', 'Medan', 'Makassar', 'Palembang', 'Semarang', 'Yogyakarta', 'Denpasar', 'Balikpapan', 'Pontianak'];

    const startDate = new Date('2025-06-27');
    
    for (let i = 0; i < 1859; i++) {
      const nama = `${namaDepan[Math.floor(Math.random() * namaDepan.length)]} ${namaBelakang[Math.floor(Math.random() * namaBelakang.length)]}`;
      const cabang = cabangList[Math.floor(Math.random() * cabangList.length)];
      
      const dateOffset = Math.floor(i / 10);
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + dateOffset);
      
      if (i === 500) {
        data.push({
          nama: 'Rama Verdianto A/n Siti Aminah',
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

  const filteredEmployees = employees.filter(employee =>
    employee.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.cabang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === 'asc') {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

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
    if (sortField !== field) return <ArrowUpDown className="w-3 h-3" />;
    return sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEmployeeClick = (employeeName: string) => {
    console.log('Employee clicked in list:', employeeName);
    if (employeeName === 'Rama Verdianto A/n Siti Aminah' || employeeName === 'Siti Aminah') {
      setSelectedEmployee(employeeName);
      setDetailModalOpen(true);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-blue-900 mb-2">
              Daftar Karyawan - {companyName}
            </DialogTitle>
            <div className="flex items-center space-x-2 text-gray-600 text-xs">
              <Users className="w-3 h-3" />
              <span>Total: {filteredEmployees.length} karyawan</span>
            </div>
          </DialogHeader>
          
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
              <Input
                type="text"
                placeholder="Cari nama karyawan atau cabang..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-7 py-1 text-xs h-8"
              />
            </div>

            <div className="overflow-y-auto max-h-80 border rounded-md">
              <table className="w-full text-xs">
                <thead className="bg-blue-50 sticky top-0">
                  <tr>
                    <th 
                      className="px-2 py-2 text-left font-semibold text-blue-900 cursor-pointer hover:bg-blue-100 transition-colors text-xs"
                      onClick={() => handleSort('nama')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Nama</span>
                        {getSortIcon('nama')}
                      </div>
                    </th>
                    <th 
                      className="px-2 py-2 text-left font-semibold text-blue-900 cursor-pointer hover:bg-blue-100 transition-colors text-xs"
                      onClick={() => handleSort('cabang')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Cabang</span>
                        {getSortIcon('cabang')}
                      </div>
                    </th>
                    <th 
                      className="px-2 py-2 text-left font-semibold text-blue-900 cursor-pointer hover:bg-blue-100 transition-colors text-xs"
                      onClick={() => handleSort('tanggalPencairan')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Tanggal Pencairan</span>
                        {getSortIcon('tanggalPencairan')}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedEmployees.map((employee, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                      <td 
                        className={`px-2 py-1 font-medium text-xs ${
                          (employee.nama === 'Rama Verdianto A/n Siti Aminah' || employee.nama === 'Siti Aminah') 
                            ? 'cursor-pointer text-blue-600 hover:text-blue-800 hover:underline' 
                            : ''
                        }`}
                        onClick={() => handleEmployeeClick(employee.nama)}
                      >
                        {employee.nama}
                      </td>
                      <td className="px-2 py-1 text-gray-700 text-xs">{employee.cabang}</td>
                      <td className="px-2 py-1 text-gray-700 text-xs">{employee.tanggalPencairan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="text-gray-600">
                Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, sortedEmployees.length)} dari {sortedEmployees.length} karyawan
              </div>
              
              <div className="flex items-center space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="text-xs h-7 px-2"
                >
                  <ChevronLeft className="w-3 h-3" />
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
                        className="w-6 h-7 text-xs"
                      >
                        {page}
                      </Button>
                    );
                  })}
                  {totalPages > 5 && (
                    <>
                      <span className="text-gray-400 text-xs">...</span>
                      <Button
                        variant={currentPage === totalPages ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(totalPages)}
                        className="w-6 h-7 text-xs"
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
                  className="text-xs h-7 px-2"
                >
                  Selanjutnya
                  <ChevronRight className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <EmployeeDetailModal 
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        employeeName={selectedEmployee}
      />
    </>
  );
};

export default EmployeeListModal;
