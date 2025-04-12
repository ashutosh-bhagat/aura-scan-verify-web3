import React, { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import QRCodeScanner from '@/components/QRCodeScanner';
import VerificationResult from '@/components/VerificationResult';
import WalletCard from '@/components/WalletCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { decryptData } from '@/utils/crypto';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
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

  const handleScanSuccess = async (data: string) => {
    // Parse the QR code data
    console.log("QR Scan result:", data);
    
    try {
      setScannedAddress(data);
      // Keep isScanning true until we process the scanned data
      // setIsScanning(false); - We'll let the QRCodeScanner component handle this
      
      // Attempt to verify and decrypt the data
      verifyWallet(data);
      
      toast({
        title: "QR Code Detected",
        description: "Processing wallet verification...",
      });
    } catch (error) {
      console.error("Error processing QR code:", error);
      setVerificationError("Invalid QR code format. Please try again.");
      setIsVerifying(false);
      
      toast({
        title: "Scan Error",
        description: "Failed to process the QR code. Please try again.",
        variant: "destructive",
      });
    }
  };

  const verifyWallet = async (encryptedData: string) => {
    setIsVerifying(true);
    setVerificationError(null);
    
    try {
      // This is where we would integrate the AES decryption
      // In a real app, this would decrypt with a provided key or key from env
      // For demo purposes, we're simulating decryption
      
      setTimeout(() => {
        try {
          // Only after verification is complete, we'll stop the camera
          setIsScanning(false);
          
          // Simulate decryption of the wallet data
          // In production, use the actual decryptData function with proper key
          const decryptionKey = "your-secret-key"; // This would come from your secure backend
          
          // Simulate successful decryption and parsing
          const isAuthorized = Math.random() > 0.3; // Simulate 70% success rate
          
          if (isAuthorized) {
            // Simulate successfully decrypted data
            setUserData({
              name: "Alex Blockchain",
              walletAddress: "0x" + Math.random().toString(16).slice(2, 42),
              status: 'authorized',
              additionalInfo: {
                "Registration Date": "2023-11-15",
                "Membership": "Gold",
                "Event Access": "All Areas",
                "Token Balance": "250 AURA"
              }
            });
            
            toast({
              title: "Verification Successful",
              description: "Wallet has been verified and authorized.",
            });
          } else {
            setUserData({
              name: "Unknown User",
              walletAddress: "0x" + Math.random().toString(16).slice(2, 42),
              status: 'unauthorized'
            });
            
            toast({
              title: "Verification Failed",
              description: "This wallet is not authorized.",
              variant: "destructive",
            });
          }
          
          setIsVerifying(false);
        } catch (error) {
          console.error("Decryption error:", error);
          setVerificationError("Failed to decrypt the data. Invalid format or encryption key.");
          setIsVerifying(false);
          
          toast({
            title: "Decryption Error",
            description: "Could not decrypt the QR code data.",
            variant: "destructive",
          });
        }
      }, 3000);
    } catch (error) {
      console.error("Verification error:", error);
      setVerificationError("Failed to verify the wallet address. Please try again.");
      setIsVerifying(false);
      
      toast({
        title: "Verification Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetScan = () => {
    setScannedAddress(null);
    setUserData(null);
    setVerificationError(null);
    setIsVerifying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80 text-foreground">
      <Header />
      
      <main className="container px-4 py-8 max-w-4xl mx-auto">
        {!scannedAddress ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gradient mb-2">
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
                onClick={() => {
                  resetScan();
                  setIsScanning(true); // Automatically start scanning again
                }}
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
                <WalletCard walletAddress={userData.walletAddress} />
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
