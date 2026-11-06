import React from 'react';
import type { Equipment } from '../types/equipment';
import {
  Eye,
  FileText,
  Scale,
  Check,
  Cpu,
  Monitor,
  Battery,
  HardDrive,
  Layers,
  Sparkles,
} from 'lucide-react';

interface ProductCardProps {
  equipment: Equipment;
  onSelect: (equipment: Equipment) => void;
  onViewSpecs: (equipment: Equipment) => void;
  isCompared: boolean;
  onToggleCompare: (equipment: Equipment) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  equipment,
  onSelect,
  onViewSpecs,
  isCompared,
  onToggleCompare,
}) => {
  const isApple = equipment.brand.toLowerCase() === 'apple';

  return (
    <div className="group relative bg-white rounded-3xl border border-slate-200 hover:border-[#002B7A]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Card Header Media Canvas Preview Box */}
      <div className="relative h-60 w-full bg-gradient-to-b from-slate-50 to-slate-100/70 p-6 flex items-center justify-center border-b border-slate-100 overflow-hidden cursor-pointer"
        onClick={() => onSelect(equipment)}
      >
        {/* Subtle grid pattern in preview background */}
        <div className="absolute inset-0 opacity-[0.35] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* 3D Interactive Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-xs font-semibold text-[#002B7A] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#CFA02C]" />
            <span>Modelo 3D Interactivo</span>
          </div>
        </div>

        {/* Brand Pill */}
        <div className="absolute top-4 right-4 z-10">
          <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-lg bg-slate-900 text-white shadow-xs">
            {equipment.brand}
          </span>
        </div>

        {/* Visual Mock / Dynamic 3D Thumbnail representation */}
        <div className="relative w-full h-full flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <div className="relative flex flex-col items-center justify-center">
            {isApple ? (
              /* Apple MacBook Neo Conceptual Silhouette */
              <div className="w-48 h-32 relative flex flex-col items-center justify-center">
                {/* Screen Lid */}
                <div className="w-44 h-28 rounded-t-xl bg-gradient-to-b from-slate-800 to-slate-950 p-2 shadow-2xl border-2 border-slate-700/80 flex flex-col items-center justify-center relative">
                  <div className="w-full h-full rounded-lg bg-gradient-to-tr from-indigo-950 via-slate-900 to-cyan-950 flex items-center justify-center relative overflow-hidden">
                    <div className="w-16 h-16 rounded-full bg-cyan-400/20 blur-xl"></div>
                    <div className="text-[10px] font-mono tracking-widest text-cyan-300 font-medium">macOS Liquid</div>
                  </div>
                  {/* Subtle Apple Notch */}
                  <div className="absolute top-2 w-6 h-1 bg-black rounded-b"></div>
                </div>
                {/* Base */}
                <div className="w-52 h-3.5 bg-gradient-to-b from-slate-300 via-slate-400 to-slate-600 rounded-b-md shadow-lg border-t border-slate-400/50 flex justify-center">
                  <div className="w-12 h-1 bg-slate-500 rounded-b-xs"></div>
                </div>
                {/* Contact shadow */}
                <div className="w-44 h-3 bg-black/20 blur-md rounded-full mt-1"></div>
              </div>
            ) : (
              /* Lenovo Chromebook 500e 2-in-1 Silhouette */
              <div className="w-48 h-32 relative flex flex-col items-center justify-center">
                {/* Screen Lid */}
                <div className="w-40 h-28 rounded-t-xl bg-gradient-to-b from-zinc-800 to-zinc-950 p-2.5 shadow-2xl border-2 border-zinc-700 flex flex-col items-center justify-center relative">
                  <div className="w-full h-full rounded bg-gradient-to-tr from-sky-900 via-slate-900 to-blue-900 flex flex-col items-center justify-center relative">
                    <span className="text-[9px] font-semibold text-sky-200">ChromeOS 360°</span>
                    <span className="text-[8px] text-zinc-400">Touch IPS 11.6"</span>
                  </div>
                  {/* Lenovo Rubber Bumper Corner hints */}
                  <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-zinc-900 border border-zinc-600 rounded-tl-md"></div>
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-zinc-900 border border-zinc-600 rounded-tr-md"></div>
                </div>
                {/* Base with 360 Hinge accent */}
                <div className="w-46 h-4 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-b-lg border-t-2 border-zinc-600 shadow-xl flex items-center justify-between px-3">
                  <span className="w-3 h-1 bg-zinc-500 rounded"></span>
                  <div className="w-8 h-1 bg-zinc-600 rounded"></div>
                  <span className="w-3 h-1 bg-zinc-500 rounded"></span>
                </div>
                {/* Contact shadow */}
                <div className="w-36 h-3 bg-black/25 blur-md rounded-full mt-1"></div>
              </div>
            )}

            {/* Quick 360 Hover Pill */}
            <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center gap-2 text-white font-medium text-xs">
              <Eye className="w-4 h-4 text-[#CFA02C]" />
              <span>Clic para abrir visor 3D</span>
            </div>
          </div>
        </div>

        {/* File Size Tag */}
        <div className="absolute bottom-3 right-4">
          <span className="text-[10px] text-slate-500 bg-white/80 px-2 py-0.5 rounded border border-slate-200 font-mono">
            GLB: {equipment.modelFileSize}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Status */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold text-[#002B7A] uppercase tracking-wider">
              {equipment.category}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Disponible PC PUMA
            </span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onSelect(equipment)}
            className="text-xl font-bold text-slate-900 font-heading mb-2 group-hover:text-[#002B7A] transition-colors cursor-pointer"
          >
            {equipment.commercialName}
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-600 line-clamp-2 mb-5 leading-relaxed">
            {equipment.description}
          </p>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 gap-2.5 mb-6 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <Monitor className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate" title={equipment.quickSpecs.screen}>
                {equipment.quickSpecs.screen}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-700">
              <Cpu className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate" title={equipment.quickSpecs.processor}>
                {equipment.quickSpecs.processor}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-700">
              <HardDrive className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate" title={`${equipment.quickSpecs.ram} • ${equipment.quickSpecs.storage}`}>
                {equipment.quickSpecs.ram} RAM
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-700">
              <Battery className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate" title={equipment.quickSpecs.batteryLife}>
                {equipment.quickSpecs.batteryLife}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 border-t border-slate-100 flex flex-col gap-2.5">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelect(equipment)}
              className="w-full py-2.5 px-3 rounded-xl bg-[#002B7A] hover:bg-[#001B4E] text-white text-xs font-semibold shadow-xs hover:shadow transition-all flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Explorar equipo</span>
            </button>

            <button
              onClick={() => onViewSpecs(equipment)}
              className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Ficha técnica</span>
            </button>
          </div>

          {/* Compare toggle button */}
          <button
            onClick={() => onToggleCompare(equipment)}
            className={`w-full py-1.5 px-3 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-2 ${
              isCompared
                ? 'bg-[#CFA02C]/15 text-[#8F6813] border border-[#CFA02C]/40 font-semibold'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-transparent'
            }`}
          >
            {isCompared ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#8F6813]" />
                <span>En lista de comparación</span>
              </>
            ) : (
              <>
                <Scale className="w-3.5 h-3.5" />
                <span>Agregar a comparador</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
