import React, { useState } from 'react';
import type { Equipment } from '../types/equipment';
import { ModelViewer3D } from './ModelViewer3D';
import {
  ArrowLeft,
  Scale,
  Printer,
  Share2,
  Check,
  CheckCircle2,
  Cpu,
  MapPin,
  FileCheck,
  Building,
  Sliders,
  Image as ImageIcon,
  Box,
} from 'lucide-react';

interface ProductDetailViewProps {
  equipment: Equipment;
  onBack: () => void;
  onCompare: (equipment: Equipment) => void;
  isCompared: boolean;
  onSelectOtherEquipment?: (equipmentId: string) => void;
  allEquipment: Equipment[];
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  equipment,
  onBack,
  onCompare,
  isCompared,
  onSelectOtherEquipment,
  allEquipment,
}) => {
  const [activeTab, setActiveTab] = useState<'specs' | 'loan'>('specs');
  const [mediaMode, setMediaMode] = useState<'3d' | 'photo'>('3d');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Filter sections if user clicks section chips
  const displayedSections =
    filterCategory === 'all'
      ? equipment.sections
      : equipment.sections.filter((s) => s.id === filterCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
      {/* Top Breadcrumb & Switcher Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#002B7A] transition-colors group"
        >
          <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-[#002B7A] group-hover:text-white transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span>Volver al catálogo principal</span>
        </button>

        {/* Switch to other available equipment quickly */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Cambiar equipo:</span>
          <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl">
            {allEquipment.map((eq) => (
              <button
                key={eq.id}
                onClick={() => onSelectOtherEquipment && onSelectOtherEquipment(eq.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  eq.id === equipment.id
                    ? 'bg-white text-[#002B7A] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {eq.brand} {eq.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Media Viewer (Sticky on Desktop) */}
        <div className="lg:col-span-6 xl:col-span-7 lg:sticky lg:top-24 space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              {/* Media Switcher: 3D vs Photo */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setMediaMode('3d')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    mediaMode === '3d'
                      ? 'bg-[#002B7A] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>Modelo 3D (360°)</span>
                </button>
                <button
                  onClick={() => setMediaMode('photo')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    mediaMode === 'photo'
                      ? 'bg-[#002B7A] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Fotografía Real</span>
                </button>
              </div>

              <span className="text-xs font-mono text-slate-500">
                {mediaMode === '3d' ? 'Archivo GLB • Three.js' : 'Foto Oficial de Referencia'}
              </span>
            </div>

            {/* Viewer Display */}
            {mediaMode === '3d' ? (
              <>
                <ModelViewer3D
                  modelPath={equipment.model3dPath}
                  modelName={equipment.name}
                  fileSize={equipment.modelFileSize}
                  brand={equipment.brand}
                />

                {/* Quick 3D Interaction Guide Cards */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                    <span className="block text-[11px] font-bold text-slate-700">Girar 360°</span>
                    <span className="text-[10px] text-slate-500">Arrastra con el ratón o desliza</span>
                  </div>
                  <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                    <span className="block text-[11px] font-bold text-slate-700">Zoom Óptico</span>
                    <span className="text-[10px] text-slate-500">Usa la rueda o los botones +/-</span>
                  </div>
                  <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                    <span className="block text-[11px] font-bold text-slate-700">Vistas Rápidas</span>
                    <span className="text-[10px] text-slate-500">Frente, teclado, perfil</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="relative w-full h-[460px] md:h-[540px] lg:h-[600px] rounded-2xl overflow-hidden border border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100/50 flex flex-col items-center justify-center p-6 shadow-sm">
                <img
                  src={equipment.imagePath}
                  alt={equipment.commercialName}
                  className="max-h-[85%] max-w-full object-contain drop-shadow-xl rounded-xl transition-transform hover:scale-105 duration-300"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span>Fotografía Oficial de Referencia PC PUMA</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Product Information & Institutional Specs */}
        <div className="lg:col-span-6 xl:col-span-5 space-y-6">
          {/* Header Info Block */}
          <div className="bg-white p-6 md:p-7 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-lg bg-[#002B7A] text-white">
                  {equipment.brand}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {equipment.category}
                </span>
              </div>

              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Equipo Oficial PC PUMA
              </span>
            </div>

            {/* Commercial Name */}
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading tracking-tight leading-tight">
                {equipment.commercialName}
              </h2>
              <p className="text-sm font-medium text-[#002B7A] mt-1">
                {equipment.tagline}
              </p>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {equipment.description}
            </p>

            {/* Key Highlights Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Pantalla
                </span>
                <span className="text-xs font-bold text-slate-800 line-clamp-1" title={equipment.quickSpecs.screen}>
                  {equipment.quickSpecs.screen}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Procesador
                </span>
                <span className="text-xs font-bold text-slate-800 line-clamp-1" title={equipment.quickSpecs.processor}>
                  {equipment.quickSpecs.processor}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Memoria RAM
                </span>
                <span className="text-xs font-bold text-slate-800">
                  {equipment.quickSpecs.ram}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Almacenamiento
                </span>
                <span className="text-xs font-bold text-slate-800 line-clamp-1" title={equipment.quickSpecs.storage}>
                  {equipment.quickSpecs.storage}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Autonomía
                </span>
                <span className="text-xs font-bold text-slate-800">
                  {equipment.quickSpecs.batteryLife}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Peso
                </span>
                <span className="text-xs font-bold text-slate-800">
                  {equipment.quickSpecs.weight}
                </span>
              </div>
            </div>

            {/* Quick Actions (Compare, Print, Share) */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <button
                onClick={() => onCompare(equipment)}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-xs ${
                  isCompared
                    ? 'bg-[#CFA02C] text-slate-900 font-bold'
                    : 'bg-[#002B7A] hover:bg-[#001B4E] text-white'
                }`}
              >
                {isCompared ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Seleccionado para comparar</span>
                  </>
                ) : (
                  <>
                    <Scale className="w-4 h-4" />
                    <span>Comparar este equipo</span>
                  </>
                )}
              </button>

              <button
                onClick={handlePrint}
                title="Imprimir ficha técnica"
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition-all"
              >
                <Printer className="w-4 h-4" />
              </button>

              <button
                onClick={handleShare}
                title="Copiar enlace"
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition-all relative"
              >
                <Share2 className="w-4 h-4" />
                {copiedNotification && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap">
                    ¡Enlace copiado!
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Institutional Specifications & Availability Tabs */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
            {/* Tab Selector */}
            <div className="flex border-b border-slate-200 bg-slate-50/70 p-1.5 gap-1.5">
              <button
                onClick={() => setActiveTab('specs')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'specs'
                    ? 'bg-white text-[#002B7A] shadow-xs border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Ficha Técnica Completa ({equipment.sections.length} secciones)</span>
              </button>

              <button
                onClick={() => setActiveTab('loan')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'loan'
                    ? 'bg-white text-[#002B7A] shadow-xs border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Préstamo y Software PC PUMA</span>
              </button>
            </div>

            {/* TAB CONTENT 1: Structured Institutional 2-Column Tables */}
            {activeTab === 'specs' && (
              <div className="p-6 space-y-6">
                {/* Category Filter Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                  <button
                    onClick={() => setFilterCategory('all')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      filterCategory === 'all'
                        ? 'bg-[#002B7A] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Todas las categorías
                  </button>
                  {equipment.sections.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => setFilterCategory(sec.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                        filterCategory === sec.id
                          ? 'bg-[#002B7A] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {sec.title}
                    </button>
                  ))}
                </div>

                {/* Section Tables */}
                <div className="space-y-6">
                  {displayedSections.map((section) => (
                    <div
                      key={section.id}
                      className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs"
                    >
                      {/* Table Section Header */}
                      <div className="bg-slate-100/90 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                        <h4 className="text-xs font-bold tracking-wider text-[#002B7A] uppercase flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#CFA02C]"></span>
                          {section.title}
                        </h4>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {section.items.length} especificaciones
                        </span>
                      </div>

                      {/* 2-Column Table */}
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 text-[11px]">
                            <th className="py-2 px-4 font-semibold w-2/5 border-r border-slate-200">
                              Característica
                            </th>
                            <th className="py-2 px-4 font-semibold w-3/5">
                              Especificación técnica
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {section.items.map((item, idx) => (
                            <tr
                              key={idx}
                              className={`hover:bg-slate-50/80 transition-colors ${
                                idx % 2 === 1 ? 'bg-slate-50/30' : 'bg-white'
                              }`}
                            >
                              <td className="py-2.5 px-4 font-medium text-slate-700 border-r border-slate-100">
                                {item.label}
                              </td>
                              <td className="py-2.5 px-4 text-slate-900 font-normal">
                                {item.value || (
                                  <span className="text-slate-400 italic">
                                    Información no disponible
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: PC PUMA Loan and UNAM Requirements */}
            {activeTab === 'loan' && (
              <div className="p-6 space-y-6">
                {/* Requirements */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-[#002B7A] uppercase tracking-wider flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-[#CFA02C]" />
                    Requisitos para Préstamo Universitario
                  </h4>
                  <ul className="space-y-2">
                    {equipment.loanAvailability.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Software Included */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-[#002B7A] uppercase tracking-wider flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-[#CFA02C]" />
                    Software y Configuración Institucional UNAM
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {equipment.loanAvailability.includedSoftware.map((sw, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#002B7A]"></span>
                        <span>{sw}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Locations */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-[#002B7A] uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#CFA02C]" />
                    Módulos PC PUMA donde se encuentra disponible
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {equipment.loanAvailability.locations.map((loc, i) => (
                      <span
                        key={i}
                        className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200"
                      >
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
