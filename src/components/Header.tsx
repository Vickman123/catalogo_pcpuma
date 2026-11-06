import React from 'react';
import { Laptop, Scale, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeView: 'catalog' | 'detail' | 'comparator';
  onNavigate: (view: 'catalog' | 'comparator') => void;
  selectedCount?: number;
}

const BASE = import.meta.env.BASE_URL;

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onNavigate,
  selectedCount = 0,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Institutional Bar */}
      <div className="bg-[#002B7A] text-white text-xs py-1.5 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-wider uppercase text-[11px] text-[#CFA02C]">
              UNAM
            </span>
            <span className="text-white/40">•</span>
            <span className="text-white/90 text-[11px] font-normal hidden sm:inline">
              Universidad Nacional Autónoma de México
            </span>
            <span className="text-white/40 hidden sm:inline">•</span>
            <span className="text-white/80 text-[11px]">
              Programa PC PUMA
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-white/80">
            <span className="hidden md:inline-flex items-center gap-1 text-[#FBF4E4]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#CFA02C]" />
              Equipamiento Oficial Homologado
            </span>
            <span className="bg-white/15 px-2 py-0.5 rounded text-[10px] font-mono tracking-wide">
              Ciclo 2026-2027
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
        {/* Brand / Logo Section */}
        <div 
          onClick={() => onNavigate('catalog')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          {/* Official PC PUMA Logo */}
          <div className="relative h-11 w-11 md:h-12 md:w-12 rounded-xl bg-white border border-slate-200/90 p-1 shadow-xs group-hover:border-[#002B7A]/40 group-hover:shadow transition-all flex items-center justify-center overflow-hidden">
            <img
              src={`${BASE}images/pc-puma-logo.png`}
              alt="Logo Oficial PC PUMA"
              className="h-full w-full object-contain"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 font-heading leading-tight group-hover:text-[#002B7A] transition-colors">
                Catálogo Tecnológico PC PUMA
              </h1>
              <span className="bg-amber-100/80 text-[#A67C1E] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-amber-200 hidden sm:inline">
                Visor 3D
              </span>
            </div>
            <p className="text-xs text-slate-500 font-normal">
              Explora la tecnología que impulsa el aprendizaje universitario
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onNavigate('catalog')}
            className={`px-3.5 py-2 rounded-xl text-xs md:text-sm font-medium transition-all flex items-center gap-2 ${
              activeView === 'catalog' || activeView === 'detail'
                ? 'bg-[#002B7A] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Laptop className="w-4 h-4" />
            <span>Catálogo</span>
          </button>

          <button
            onClick={() => onNavigate('comparator')}
            className={`px-3.5 py-2 rounded-xl text-xs md:text-sm font-medium transition-all flex items-center gap-2 relative ${
              activeView === 'comparator'
                ? 'bg-[#002B7A] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Comparador</span>
            {selectedCount > 0 && (
              <span className="ml-0.5 bg-[#CFA02C] text-slate-900 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {selectedCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
