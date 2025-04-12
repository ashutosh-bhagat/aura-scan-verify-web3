
import React from 'react';
import { QrCode } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full gradient-bg flex items-center justify-center">
          <QrCode className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Aura Scan</h1>
          <p className="text-xs text-muted-foreground">Web3 Verification System</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
