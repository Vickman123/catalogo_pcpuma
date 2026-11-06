import React from 'react';
import type { Equipment } from '../types/equipment';
import {
  Eye,
  FileText,
  Cpu,
  Monitor,
  Battery,
  HardDrive,
  Sparkles,
} from 'lucide-react';

interface ProductCardProps {
  equipment: Equipment;
  onSelect: (equipment: Equipment) => void;
  onViewSpecs: (equipment: Equipment) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  equipment,
  onSelect,
  onViewSpecs,
}) => {
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

        {/* Product Image Representation */}
        <div className="relative w-full h-full flex items-center justify-center p-3 transition-transform duration-300 group-hover:scale-105">
          <img
            src={equipment.imagePath}
            alt={equipment.commercialName}
            className="max-h-48 max-w-full object-contain drop-shadow-md rounded-lg"
            loading="lazy"
          />

          {/* Quick 360 Hover Pill */}
          <div className="absolute inset-0 bg-slate-900/35 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center gap-2 text-white font-medium text-xs">
            <Eye className="w-4 h-4 text-[#CFA02C]" />
            <span>Clic para explorar en 3D</span>
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
        <div className="pt-2 border-t border-slate-100">
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
        </div>
      </div>
    </div>
  );
};
