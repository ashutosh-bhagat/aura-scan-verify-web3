
import React from 'react';
import { QrCode, ShieldCheck } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full gradient-bg flex items-center justify-center">
          <ShieldCheck className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Aura Scan</h1>
          <p className="text-xs text-gray-400">AES256 QR Verification</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
