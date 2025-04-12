
import React, { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import QRCodeScanner from '@/components/QRCodeScanner';
import VerificationResult from '@/components/VerificationResult';
import WalletCard from '@/components/WalletCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Wallet, Shield, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

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
    <div className="min-h-screen bg-[#0f1123] text-white">
      <Header />
      
      <main className="container px-4 py-8 max-w-6xl mx-auto">
        {!scannedAddress ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12 py-16">
              <h1 className="text-5xl font-bold mb-6 text-gradient">
                <span className="text-[#4169E1]">Decentralized</span> <span className="text-[#bf5af2]">Identity</span>
                <br />
                <span className="text-[#bf5af2]">Verification</span> <span className="text-[#4169E1]">Platform</span>
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
                Secure, private, and blockchain-powered identity verification for 
                the Web3 ecosystem.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                <Card className="bg-[#151836] border-[#252850] hover:border-[#4169E1] transition-colors">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 bg-[#2a2d4a] rounded-xl flex items-center justify-center mb-4">
                      <Wallet className="h-6 w-6 text-[#bf5af2]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Connect Wallet</h3>
                    <p className="text-gray-400 text-sm mb-6">
                      Securely connect your Solana wallet to begin the verification process.
                    </p>
                    <Button className="bg-[#252850] hover:bg-[#303366] text-white">
                      <Wallet className="h-4 w-4 mr-2" /> Connect
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-[#151836] border-[#252850] hover:border-[#4169E1] transition-colors">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 bg-[#2a2d4a] rounded-xl flex items-center justify-center mb-4">
                      <UserCheck className="h-6 w-6 text-[#4169E1]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Verify Identity</h3>
                    <p className="text-gray-400 text-sm mb-6">
                      Submit your information and complete biometric verification.
                    </p>
                    <Button 
                      variant="outline" 
                      className="bg-transparent border-[#4169E1] text-[#4169E1] hover:bg-[#4169E1] hover:text-white"
                      onClick={() => setIsScanning(true)}
                    >
                      Start Verification <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-[#151836] border-[#252850] hover:border-[#4169E1] transition-colors">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 bg-[#2a2d4a] rounded-xl flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6 text-[#10B981]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Access Dashboard</h3>
                    <p className="text-gray-400 text-sm mb-6">
                      View your verification status and manage your digital identity.
                    </p>
                    <Button variant="outline" className="bg-transparent border-[#10B981] text-[#10B981] hover:bg-[#10B981] hover:text-white">
                      Go to Dashboard <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {isScanning && (
              <QRCodeScanner 
                onScanSuccess={handleScanSuccess}
                isScanning={isScanning}
                setIsScanning={setIsScanning}
              />
            )}
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
                className="gap-1 text-gray-400 hover:text-white" 
                onClick={resetScan}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
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
      
      <footer className="py-6 text-center text-sm text-gray-500">
        <p>© 2025 AuraChain Identity Verification Platform</p>
      </footer>
      
      <Toaster />
    </div>
  );
};

export default Index;
