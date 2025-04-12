
import React, { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import QRCodeScanner from '@/components/QRCodeScanner';
import VerificationResult from '@/components/VerificationResult';
import WalletCard from '@/components/WalletCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [scannedAddress, setScannedAddress] = useState<string | null>(null);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [userData, setUserData] = useState<{
    name: string;
    walletAddress: string;
    status: 'authorized' | 'unauthorized' | 'pending';
    additionalInfo?: {
      [key: string]: string;
    };
  } | null>(null);

  const handleScanSuccess = (data: string) => {
    // Parse the QR code data (expected format: ethereum:0xAddress)
    console.log("QR Scan result:", data);
    
    let address = data;
    if (data.startsWith('ethereum:')) {
      address = data.substring(9);
    }
    
    setScannedAddress(address);
    setIsScanning(false);
    
    // Simulate verification process
    verifyWallet(address);
  };

  const verifyWallet = (address: string) => {
    setIsVerifying(true);
    setVerificationError(null);
    
    // Simulate API call to the backend
    setTimeout(() => {
      try {
        // This is a simulation - in real app, make API call to your backend
        const isAuthorized = Math.random() > 0.3; // 70% chance of success for demo
        
        if (isAuthorized) {
          setUserData({
            name: "Alex Blockchain",
            walletAddress: address,
            status: 'authorized',
            additionalInfo: {
              "Registration Date": "2023-11-15",
              "Membership": "Gold",
              "Event Access": "All Areas",
              "Token Balance": "250 AURA"
            }
          });
        } else {
          setUserData({
            name: "Unknown User",
            walletAddress: address,
            status: 'unauthorized'
          });
        }
        
        setIsVerifying(false);
      } catch (error) {
        console.error("Verification error:", error);
        setVerificationError("Failed to verify the wallet address. Please try again.");
        setIsVerifying(false);
      }
    }, 3000);
  };

  const resetScan = () => {
    setScannedAddress(null);
    setUserData(null);
    setVerificationError(null);
    setIsVerifying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent to-background">
      <Header />
      
      <main className="container px-4 py-8 max-w-4xl mx-auto">
        {!scannedAddress ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold gradient-text mb-2">
                Aura Scan Verification
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Scan a QR code to verify wallet authorization status. Authorized users will see their account details.
              </p>
            </div>
            
            <QRCodeScanner 
              onScanSuccess={handleScanSuccess}
              isScanning={isScanning}
              setIsScanning={setIsScanning}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center mb-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-1" 
                onClick={resetScan}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Scanner
              </Button>
            </div>
            
            <VerificationResult 
              userData={userData}
              isVerifying={isVerifying} 
              error={verificationError}
            />
            
            {userData && userData.status === 'authorized' && scannedAddress && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <WalletCard walletAddress={scannedAddress} />
              </motion.div>
            )}
          </motion.div>
        )}
      </main>
      
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© 2025 Aura Scan Verification System</p>
      </footer>
      
      <Toaster />
    </div>
  );
};

export default Index;
