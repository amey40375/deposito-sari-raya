
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
  ArrowLeft,
  CheckCircle
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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
  const savingsBalance = 0; // Current savings balance
  const requiredSavingsBalance = depositBalance * 0.015; // 1.5% of deposit

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
      
      // Start progress animation for 15 seconds
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setShowLoading(false);
            
            // Check if savings balance meets requirement
            if (savingsBalance >= requiredSavingsBalance) {
              setShowSuccessModal(true);
            } else {
              setShowErrorModal(true);
            }
            return 100;
          }
          return prev + (100/150); // 15 seconds = 150 * 100ms
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
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const handleCloseError = () => {
    setShowErrorModal(false);
    setCurrentView('home');
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    onClose();
  };

  const renderHomeView = () => (
    <div className="h-screen bg-gray-50">
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
    <div className="h-screen bg-gray-50 overflow-y-auto">
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

      {/* Notification Banner */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mx-4 mt-4 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <Shield className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-800 font-medium">
              Pengiriman Buku Tabungan & ATM Tidak Terlaksana dikarenakan Anda Tidak Memenuhi Syarat Sistem Kami, Silahkan Lakukan Transfer Ke rekening Mana Saja Yang anda Miliki
            </p>
          </div>
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
          <div className="relative">
            <Input
              value={formatCurrency(parseInt(transferData.amount))}
              readOnly
              className="bg-gray-100"
            />
          </div>
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
      </div>
    </div>
  );

  // Return the appropriate view based on isOpen state
  if (!isOpen) {
    return null;
  }

  if (currentView === 'home') {
    return renderHomeView();
  }

  if (currentView === 'transfer') {
    return (
      <>
        {renderTransferView()}
        
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
                disabled={pin.length !== 6}
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
              <h3 className="text-lg font-bold text-blue-900">Mohon Tunggu sebentar</h3>
              <p className="text-sm text-gray-600">Kami sedang mengecek ketersediaan Transfer</p>
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-gray-600">{Math.round(progress)}% selesai</p>
            </div>
          </DialogContent>
        </Dialog>

        {/* Success Modal */}
        <Dialog open={showSuccessModal} onOpenChange={() => {}}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold text-green-600 mb-4">
                <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                Transfer Berhasil!
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800 text-center">
                  Transfer dana sebesar <strong>{formatCurrency(parseInt(transferData.amount))}</strong> berhasil dilakukan ke rekening <strong>{transferData.accountName}</strong>
                </p>
              </div>
              
              <Button 
                onClick={handleCloseSuccess}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Selesai
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Error Modal */}
        <Dialog open={showErrorModal} onOpenChange={() => {}}>
          <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold text-red-600 mb-4">
                📌 Peraturan Transfer Dana dari Deposito
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">1. Tidak Ada Limit Minimal Transfer</h4>
                  <p className="text-gray-700">Pengguna bebas melakukan transfer dari dana deposito ke rekening tabungan tanpa batasan jumlah minimal.</p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-2">2. Saldo Tabungan Wajib Tersisa (Ngendap)</h4>
                  <p className="text-gray-700 mb-2">Setelah proses transfer dilakukan, rekening tabungan wajib menyisakan saldo minimal sebesar 1,5% dari total nilai deposito sebagai dana mengendap.</p>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded p-3">
                    <p className="font-medium text-blue-800 mb-1">Contoh:</p>
                    <p className="text-blue-700 text-xs mb-1">Jika total nilai deposito adalah {formatCurrency(100000000)}, maka:</p>
                    <p className="text-blue-700 text-xs mb-1">• Saldo tabungan harus tersisa minimal {formatCurrency(1500000)}</p>
                    <p className="text-blue-700 text-xs">• Jumlah maksimal yang bisa ditransfer = (Saldo tabungan saat ini - {formatCurrency(1500000)})</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-2">3. Tujuan Peraturan</h4>
                  <p className="text-gray-700">Ketentuan ini diberlakukan untuk menjaga kestabilan saldo pengguna serta mendukung keamanan transaksi berkelanjutan.</p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-2">4. Sistem Otomatis Cek Saldo</h4>
                  <p className="text-gray-700">Sistem akan otomatis menolak permintaan transfer apabila saldo tabungan yang tersisa setelah transfer kurang dari batas minimum 1,5% tersebut.</p>
                </div>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-800">
                  <strong>Saldo tabungan Anda saat ini:</strong> {formatCurrency(savingsBalance)}<br/>
                  <strong>Minimal saldo yang diperlukan:</strong> {formatCurrency(requiredSavingsBalance)}
                </p>
              </div>
              
              <Button 
                onClick={handleCloseError}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white"
              >
                Tutup
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return null;
};

export default BankingApp;
