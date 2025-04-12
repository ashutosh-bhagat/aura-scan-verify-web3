
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, QrCode, ScanLine, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface QRCodeScannerProps {
  onScanSuccess: (data: string) => void;
  isScanning: boolean;
  setIsScanning: (scanning: boolean) => void;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onScanSuccess, isScanning, setIsScanning }) => {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scannerReady, setScannerReady] = useState(false);
  const scanIntervalRef = useRef<number | null>(null);

  const startCamera = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast({
          title: "Camera Access Error",
          description: "Your browser doesn't support camera access or it's restricted.",
          variant: "destructive",
        });
        return;
      }

      const constraints = {
        video: { facingMode: "environment" }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          setScannerReady(true);
        };
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: "Camera Access Error",
        description: "Unable to access your camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setScannerReady(false);
    }
  };

  const scanQRCode = () => {
    if (!canvasRef.current || !videoRef.current || !scannerReady) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    
    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    try {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // You would typically use a QR code library here like jsQR
      // This is a simplified placeholder for demo purposes
      // In a real app, implement proper QR code detection with jsQR or similar library
      
      // Simulate QR detection (in real app, replace with actual QR detection)
      // Normally you would do: const code = jsQR(imageData.data, width, height)
      
      // For demo purposes we'll use a timeout to simulate successful detection
      setTimeout(() => {
        if (Math.random() > 0.3 && isScanning) { // 70% chance of "successful" detection
          const simulatedQRData = `ethereum:0x${Math.random().toString(16).slice(2, 42)}`;
          onScanSuccess(simulatedQRData);
        }
      }, 2000);
    } catch (error) {
      console.error("QR scanning error:", error);
    }
  };

  useEffect(() => {
    if (isScanning && scannerReady) {
      // Start scanning
      scanIntervalRef.current = window.setInterval(scanQRCode, 500) as unknown as number;
    } else {
      // Stop scanning
      if (scanIntervalRef.current !== null) {
        clearInterval(scanIntervalRef.current);
        scanIntervalRef.current = null;
      }
    }
    
    return () => {
      if (scanIntervalRef.current !== null) {
        clearInterval(scanIntervalRef.current);
      }
    };
  }, [isScanning, scannerReady]);

  useEffect(() => {
    if (isScanning) {
      startCamera();
    } else {
      stopCamera();
    }
    
    return () => {
      stopCamera();
    };
  }, [isScanning]);

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-6 w-6 text-primary" />
          QR Code Scanner
        </CardTitle>
        <CardDescription>
          {isScanning 
            ? "Position the QR code within the camera view" 
            : "Start the scanner to verify a wallet"}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 relative">
        {isScanning ? (
          <>
            <div className="relative aspect-[4/3] bg-black overflow-hidden rounded-md">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 pointer-events-none border-2 border-primary/50 rounded-md">
                <div className="absolute inset-0 border-2 border-dashed border-primary/80 rounded-md animate-pulse"></div>
                <ScanLine className="absolute top-0 left-1/2 transform -translate-x-1/2 text-primary w-full h-1 animate-bounce" />
              </div>
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </>
        ) : (
          <div className="aspect-[4/3] bg-muted rounded-md flex flex-col items-center justify-center p-6">
            <Camera className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-center text-muted-foreground">
              Camera is currently inactive. Start the scanner to begin verification.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between p-4">
        <Button 
          variant="outline" 
          onClick={() => {
            if (isScanning) {
              setIsScanning(false);
            } else {
              setIsScanning(true);
            }
          }}
        >
          {isScanning ? "Stop Scanning" : "Start Scanning"}
        </Button>
        
        {isScanning && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => {
              stopCamera();
              setTimeout(() => startCamera(), 500);
            }}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QRCodeScanner;
