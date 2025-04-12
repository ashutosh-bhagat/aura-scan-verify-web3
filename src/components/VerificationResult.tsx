
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface UserData {
  name: string;
  walletAddress: string;
  status: 'authorized' | 'unauthorized' | 'pending';
  avatarUrl?: string;
  additionalInfo?: {
    [key: string]: string;
  };
}

interface VerificationResultProps {
  userData: UserData | null;
  isVerifying: boolean;
  error: string | null;
}

const VerificationResult: React.FC<VerificationResultProps> = ({ 
  userData, 
  isVerifying,
  error
}) => {
  if (isVerifying) {
    return (
      <Card className="w-full max-w-md mx-auto glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            Verifying QR Code
          </CardTitle>
          <CardDescription>
            Please wait while we decrypt and verify the data...
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={65} className="w-full" />
          <p className="text-sm text-muted-foreground text-center">
            Decrypting secure data...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto glass-card border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            Verification Error
          </CardTitle>
          <CardDescription>
            There was a problem with the verification process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {error}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`w-full max-w-md mx-auto glass-card ${
        userData.status === 'authorized' ? 'border-green-500/50' : 'border-red-500/50'
      }`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {userData.status === 'authorized' ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Verification Successful</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  <span>Verification Failed</span>
                </>
              )}
            </CardTitle>
            <Badge variant={userData.status === 'authorized' ? 'default' : 'destructive'}>
              {userData.status === 'authorized' ? 'Authorized' : 'Unauthorized'}
            </Badge>
          </div>
          <CardDescription>
            {userData.status === 'authorized' 
              ? 'The encrypted data has been successfully verified and decrypted.' 
              : 'The encrypted data verification failed.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-lg">
              {userData.avatarUrl ? (
                <img src={userData.avatarUrl} alt={userData.name} className="h-full w-full rounded-full object-cover" />
              ) : (
                userData.name.charAt(0)
              )}
            </div>
            <div>
              <p className="font-medium">{userData.name}</p>
              <p className="text-sm text-muted-foreground truncate max-w-[260px]">
                {userData.walletAddress}
              </p>
            </div>
          </div>

          {userData.status === 'authorized' && userData.additionalInfo && (
            <div className="mt-4 border rounded-lg p-3 bg-accent/50">
              <h4 className="text-sm font-medium mb-2">Additional Information</h4>
              <div className="space-y-1">
                {Object.entries(userData.additionalInfo).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-3 text-sm">
                    <span className="text-muted-foreground">{key}:</span>
                    <span className="col-span-2 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default VerificationResult;
