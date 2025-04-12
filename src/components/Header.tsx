
import React from 'react';
import { QrCode, Home, LayoutDashboard, Link } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-[#0f1123] text-white">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full gradient-bg flex items-center justify-center">
          <QrCode className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#4169E1]">AuraChain</h1>
          <p className="text-xs text-gray-400">ADVANCED IDENTITY VERIFICATION</p>
        </div>
      </div>
      
      <nav className="hidden md:flex items-center gap-6">
        <RouterLink to="/" className="flex items-center gap-2 text-sm font-medium hover:text-[#4169E1] transition-colors">
          <Home className="h-4 w-4" />
          Home
        </RouterLink>
        <RouterLink to="/" className="flex items-center gap-2 text-sm font-medium hover:text-[#4169E1] transition-colors">
          <QrCode className="h-4 w-4" />
          Verify
        </RouterLink>
        <RouterLink to="/" className="flex items-center gap-2 text-sm font-medium hover:text-[#4169E1] transition-colors">
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </RouterLink>
      </nav>
      
      <button className="bg-[#4169E1] hover:bg-[#3a5ecc] text-white text-sm font-medium px-4 py-2 rounded flex items-center gap-2 transition-colors">
        <Link className="h-4 w-4" />
        Connect
      </button>
    </header>
  );
};

export default Header;
