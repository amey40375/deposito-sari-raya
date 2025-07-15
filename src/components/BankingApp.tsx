
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeftRight, 
  CreditCard, 
  Wallet, 
  PiggyBank, 
  Shield, 
  ArrowRight,
  Home,
  User,
  Settings,
  History,
  Phone,
  Building2,
  ArrowLeft
} from 'lucide-react';

interface BankingAppProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TransferData {
  accountNumber: string;
  amount: string;
  accountName: string;
  bank: string;
}

const banks = [
  "Bank Central Asia (BCA)",
  "Bank Mandiri",
  "Bank Negara Indonesia (BNI)",
  "Bank Rakyat Indonesia (BRI)",
  "Bank Tabungan Negara (BTN)",
  "Bank Danamon",
  "Bank CIMB Niaga",
  "Bank Permata",
  "Bank Maybank Indonesia",
  "Bank OCBC NISP",
  "Bank Panin",
  "Bank UOB Indonesia",
  "Bank Mega",
  "Bank Bukopin",
  "Bank Sinarmas"
];

const BankingApp: React.FC<BankingAppProps> = ({ isOpen, onClose }) => {
  console.log('BankingApp rendered with isOpen:', isOpen);
  
  const [currentView, setCurrentView] = useState<'home' | 'transfer'>('home');
  const [showPinModal, setShowPinModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [transferData, setTransferData] = useState<TransferData>({
    accountNumber: '',
    amount: '200350000',
    accountName: '',
    bank: ''
  });
  const [pin, setPin] = useState('');
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const depositBalance = 200350000;
  const savingsBalance = 0;

  const handleTransferClick = () => {
    console.log('Transfer clicked');
    setCurrentView('transfer');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setTransferData({
      accountNumber: '',
      amount: '200350000',
      accountName: '',
      bank: ''
    });
  };

  const handleContinue = () => {
    if (!transferData.accountNumber || !transferData.accountName || !transferData.bank) {
      return;
    }
    setShowPinModal(true);
  };

  const handlePinSubmit = () => {
    console.log('PIN submitted:', pin);
    if (pin === '112233') {
      setShowPinModal(false);
      setShowLoading(true);
      setProgress(0);
      
      // Start progress animation for 1 minute
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setShowLoading(false);
            setShowErrorModal(true);
            return 100;
          }
          return prev + (100/600); // 60 seconds = 600 * 100ms
        });
      }, 100);
    } else {
      toast({
        title: "PIN Salah",
        description: "Masukkan PIN yang benar",
        variant: "destructive"
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleCloseError = () => {
    setShowErrorModal(false);
    onClose();
  };

  const renderHomeView = () => (
    <div className="h-full bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">BRI Deposit Mobile</h1>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        <p className="text-blue-100 text-sm mt-1">Selamat datang, SITI AMINAH</p>
      </div>

      {/* Balance Cards */}
      <div className="p-4 space-y-3">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <PiggyBank className="w-5 h-5" />
              <span className="text-sm font-medium">Saldo Deposito</span>
            </div>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(depositBalance)}</p>
          <p className="text-green-100 text-xs">Deposito Aktif</p>
        </div>

        <div className="bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Wallet className="w-5 h-5" />
              <span className="text-sm font-medium">Saldo Tabungan</span>
            </div>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(savingsBalance)}</p>
          <p className="text-gray-200 text-xs">Tabungan Reguler</p>
        </div>
      </div>

      {/* Menu */}
      <div className="p-4">
        <h3 className="text-gray-700 font-semibold mb-3">Menu Utama</h3>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={handleTransferClick}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center hover:bg-blue-100 transition-colors"
          >
            <ArrowLeftRight className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <span className="text-blue-600 font-medium text-sm">Transfer</span>
          </button>
          
          <button className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
            <CreditCard className="w-6 h-6 text-gray-600 mx-auto mb-2" />
            <span className="text-gray-600 font-medium text-sm">Tarik Tunai</span>
          </button>
          
          <button className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
            <History className="w-6 h-6 text-gray-600 mx-auto mb-2" />
            <span className="text-gray-600 font-medium text-sm">Riwayat</span>
          </button>
          
          <button className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
            <Phone className="w-6 h-6 text-gray-600 mx-auto mb-2" />
            <span className="text-gray-600 font-medium text-sm">Bantuan</span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
        <div className="flex justify-around">
          <button className="flex flex-col items-center p-2 text-blue-600">
            <Home className="w-5 h-5 mb-1" />
            <span className="text-xs">Beranda</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-400">
            <ArrowLeftRight className="w-5 h-5 mb-1" />
            <span className="text-xs">Transfer</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-400">
            <User className="w-5 h-5 mb-1" />
            <span className="text-xs">Profil</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-400">
            <Settings className="w-5 h-5 mb-1" />
            <span className="text-xs">Lainnya</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderTransferView = () => (
    <div className="h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <button onClick={handleBackToHome} className="flex items-center space-x-2">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Kembali</span>
          </button>
          <h1 className="text-lg font-bold">Transfer Dana</h1>
          <div className="w-16"></div>
        </div>
      </div>

      {/* Transfer Form */}
      <div className="p-4 space-y-4 pb-20">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nomor Rekening Tujuan
          </label>
          <Input
            value={transferData.accountNumber}
            onChange={(e) => setTransferData({...transferData, accountNumber: e.target.value})}
            placeholder="Masukkan nomor rekening"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bank Tujuan
          </label>
          <Select value={transferData.bank} onValueChange={(value) => setTransferData({...transferData, bank: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih bank tujuan" />
            </SelectTrigger>
            <SelectContent>
              {banks.map((bank) => (
                <SelectItem key={bank} value={bank}>
                  {bank}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nominal Transfer
          </label>
          <Input
            value={transferData.amount}
            onChange={(e) => setTransferData({...transferData, amount: e.target.value})}
            placeholder="Masukkan nominal"
            type="number"
            disabled
          />
          <p className="text-xs text-gray-500 mt-1">*Sesuai saldo deposito</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Pemilik Rekening
          </label>
          <Input
            value={transferData.accountName}
            onChange={(e) => setTransferData({...transferData, accountName: e.target.value})}
            placeholder="Masukkan nama pemilik rekening"
          />
        </div>
        
        <Button 
          onClick={handleContinue}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={!transferData.accountNumber || !transferData.accountName || !transferData.bank}
        >
          Lanjutkan
        </Button>

        {/* Transfer Regulations */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-bold text-blue-900 mb-3">Peraturan Transfer Dana dari Deposito</h3>
          
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-blue-800">1. Tidak Ada Limit Minimal Transfer</h4>
              <p>Pengguna bebas melakukan transfer dari dana deposito ke rekening tabungan tanpa batasan jumlah minimal.</p>
            </div>

            <div>
              <h4 className="font-semibold text-blue-800">2. Saldo Tabungan Wajib Tersisa (Ngendap)</h4>
              <p>Setelah proses transfer dilakukan, rekening tabungan wajib menyisakan saldo minimal sebesar 1,5% dari total nilai deposito sebagai dana mengendap.</p>
              
              <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                <p className="font-medium">Contoh:</p>
                <p>Jika total nilai deposito adalah Rp100.000.000, maka:</p>
                <p>• Saldo tabungan harus tersisa minimal Rp1.500.000</p>
                <p>• Jumlah maksimal yang bisa ditransfer = (Saldo tabungan saat ini - Rp1.500.000)</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-blue-800">3. Tujuan Peraturan</h4>
              <p>Ketentuan ini diberlakukan untuk menjaga kestabilan saldo pengguna serta mendukung keamanan transaksi berkelanjutan.</p>
            </div>

            <div>
              <h4 className="font-semibold text-blue-800">4. Sistem Otomatis Cek Saldo</h4>
              <p>Sistem akan otomatis menolak permintaan transfer apabila saldo tabungan yang tersisa setelah transfer kurang dari batas minimum 1,5% tersebut.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  console.log('BankingApp about to render, isOpen:', isOpen);

  // KETIKA TRANSFER VIEW, TAMPILKAN SEBAGAI HALAMAN PENUH, BUKAN DIALOG
  if (isOpen && currentView === 'transfer') {
    return (
      <div className="fixed inset-0 z-50 bg-gray-50">
        {renderTransferView()}
      </div>
    );
  }

  // UNTUK HOME VIEW, GUNAKAN DIALOG
  if (isOpen && currentView === 'home') {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-sm max-h-[90vh] p-0">
          {renderHomeView()}
        </DialogContent>
      </Dialog>
    );
  }

  // JIKA TIDAK OPEN, RETURN NULL
  return (
    <>
      {/* PIN Modal */}
      <Dialog open={showPinModal} onOpenChange={setShowPinModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-blue-900">
              <Shield className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              Masukkan PIN Transaksi
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Masukkan PIN 6 digit"
                maxLength={6}
                className="text-center text-lg font-mono"
              />
            </div>
            
            <Button 
              onClick={handlePinSubmit}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
              disabled={pin !== '112233'}
            >
              TRANSFER SEKARANG
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Loading Modal */}
      <Dialog open={showLoading} onOpenChange={() => {}}>
        <DialogContent className="max-w-sm">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-blue-600 animate-pulse" />
            </div>
            <h3 className="text-lg font-bold text-blue-900">Sedang Memproses Transfer Anda</h3>
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-gray-600">{Math.round(progress)}% selesai</p>
            <p className="text-xs text-gray-500">Mohon tunggu, proses sedang berlangsung...</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Error Modal */}
      <Dialog open={showErrorModal} onOpenChange={() => {}}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-red-600 mb-4">
              Transfer Tidak Berhasil
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800 leading-relaxed">
                <strong>Mohon Maaf</strong> Proses Transfer Belum Berhasil Dikarenakan Anda Belum Mematuhi Peraturan Kami, Karena kami Periksa Bahwa Anda Tidak Memiliki Saldo Tabungan, Karena Aturan Yang Berlaku Bahwasannya Anda Menarik DANA Deposito Minimal Anda Memiliki Saldo Tabungan Sebesar 1,5% Dari Nominal Deposito Anda.
              </p>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                <strong>Minimal Saldo Tabungan yang Diperlukan:</strong><br/>
                {formatCurrency(depositBalance * 0.015)}
              </p>
            </div>
            
            <Button 
              onClick={handleCloseError}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BankingApp;
