
import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CompanyListModal from '@/components/CompanyListModal';
import EmployeeListModal from '@/components/EmployeeListModal';
import Footer from '@/components/Footer';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Shield } from 'lucide-react';
import BankingApp from '@/components/BankingApp';

const Index = () => {
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [showPinModal, setShowPinModal] = useState(false);
  const [showBankingApp, setShowBankingApp] = useState(false);
  const [pin, setPin] = useState('');
  const { toast } = useToast();

  const handleDepositScheduleClick = () => {
    setIsCompanyModalOpen(true);
  };

  const handleCompanySelect = (company: string) => {
    console.log('Company selected:', company);
    if (company === "The Trans Luxury Hotel's Indonesia") {
      console.log('Opening PIN modal for Trans Luxury Hotel');
      setIsCompanyModalOpen(false);
      setShowPinModal(true);
    } else {
      setSelectedCompany(company);
      setIsCompanyModalOpen(false);
      setIsEmployeeModalOpen(true);
    }
  };

  const handleCloseCompanyModal = () => {
    setIsCompanyModalOpen(false);
  };

  const handleCloseEmployeeModal = () => {
    setIsEmployeeModalOpen(false);
  };

  const handlePinSubmit = () => {
    console.log('PIN submit clicked, PIN:', pin);
    if (pin === '112233') {
      console.log('Correct PIN, opening banking app');
      setShowPinModal(false);
      setPin('');
      
      // Small delay then open banking app
      setTimeout(() => {
        console.log('Opening banking app');
        setShowBankingApp(true);
      }, 100);
    } else {
      toast({
        title: "PIN Salah",
        description: "Masukkan PIN yang benar",
        variant: "destructive"
      });
    }
  };

  const handleCloseBankingApp = () => {
    console.log('Closing banking app');
    setShowBankingApp(false);
    setPin('');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero onDepositScheduleClick={handleDepositScheduleClick} />
      <Footer />
      
      <CompanyListModal
        isOpen={isCompanyModalOpen}
        onClose={handleCloseCompanyModal}
        onCompanySelect={handleCompanySelect}
      />
      
      <EmployeeListModal
        isOpen={isEmployeeModalOpen}
        onClose={handleCloseEmployeeModal}
        companyName={selectedCompany}
      />

      {/* PIN Modal */}
      <Dialog open={showPinModal} onOpenChange={setShowPinModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-blue-900">
              <Shield className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              Masukkan PIN
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
              MASUK APLIKASI
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Banking App */}
      <BankingApp 
        isOpen={showBankingApp}
        onClose={handleCloseBankingApp}
      />
    </div>
  );
};

export default Index;
