import React from 'react';

interface FooterProps {
  onNavigateAdmin?: () => void;
  isProposal?: boolean;
}

const BASE = import.meta.env.BASE_URL;

export const Footer: React.FC<FooterProps> = ({
  onNavigateAdmin,
  isProposal = false,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-20 border-t border-slate-800">
      <div className="h-1 w-full bg-gradient-to-r from-[#002B7A] via-[#CFA02C] to-[#002B7A]"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-white p-1 flex items-center justify-center shadow-xs overflow-hidden border border-slate-700">
            <img
              src={`${BASE}images/pc-puma-logo.png`}
              alt="Logo PC PUMA"
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <span className="font-semibold text-white tracking-wide">
              {isProposal ? 'Programa PC PUMA – Propuesta de Equipamiento' : 'Catálogo Tecnológico PC PUMA'}
            </span>
            <span className="text-slate-500 mx-2">•</span>
            <span className="text-slate-400">Universidad Nacional Autónoma de México</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-500">
          <span>
            © {new Date().getFullYear()} PC PUMA – UNAM. Modelos 3D y especificaciones de referencia técnica.
          </span>
          {!isProposal && onNavigateAdmin && (
            <>
              <span>•</span>
              <button
                onClick={onNavigateAdmin}
                className="hover:text-slate-300 transition-colors underline cursor-pointer"
              >
                Panel de Propuestas (/admin)
              </button>
            </>
          )}
        </div>
      </div>
    </footer>
  );
};
