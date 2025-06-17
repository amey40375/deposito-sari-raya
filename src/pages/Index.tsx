
import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CompanyListModal from '@/components/CompanyListModal';
import EmployeeListModal from '@/components/EmployeeListModal';
import Footer from '@/components/Footer';

const Index = () => {
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState('');

  const handleDepositScheduleClick = () => {
    setIsCompanyModalOpen(true);
  };

  const handleCompanySelect = (company: string) => {
    setSelectedCompany(company);
    setIsEmployeeModalOpen(true);
  };

  const handleCloseCompanyModal = () => {
    setIsCompanyModalOpen(false);
  };

  const handleCloseEmployeeModal = () => {
    setIsEmployeeModalOpen(false);
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
    </div>
  );
};

export default Index;
