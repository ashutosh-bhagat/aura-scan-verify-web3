
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, Copy, ExternalLink, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface WalletCardProps {
  walletAddress: string;
  chainId?: string;
  balance?: string;
  network?: string;
}

const WalletCard: React.FC<WalletCardProps> = ({
  walletAddress,
  chainId = "1", // Default to Ethereum Mainnet
  balance = "0.0",
  network = "Ethereum"
}) => {
  const { toast } = useToast();
  
  const shortenAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    });
  };
  
  const openEtherscan = () => {
    let baseUrl = "https://etherscan.io/address/";
    // Different chains have different block explorers
    if (chainId === "137") {
      baseUrl = "https://polygonscan.com/address/";
    } else if (chainId === "56") {
      baseUrl = "https://bscscan.com/address/";
    }
    window.open(`${baseUrl}${walletAddress}`, '_blank');
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Secure Wallet Information
        </CardTitle>
        <CardDescription>
          Details about the verified and decrypted wallet data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 rounded-lg bg-accent/30 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Address</span>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6"
                onClick={copyToClipboard}
              >
                <Copy className="h-3 w-3" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6"
                onClick={openEtherscan}
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <p className="font-mono text-sm font-medium mt-1 break-all">
            {walletAddress}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-accent/30 backdrop-blur-md">
            <span className="text-sm text-muted-foreground">Network</span>
            <p className="font-medium">{network}</p>
          </div>
          
          <div className="p-3 rounded-lg bg-accent/30 backdrop-blur-md">
            <span className="text-sm text-muted-foreground">Balance</span>
            <p className="font-medium">{balance} ETH</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
