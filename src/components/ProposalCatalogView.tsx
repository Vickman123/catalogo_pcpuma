import React, { useState } from 'react';
import type { Proposal } from '../types/proposal';
import type { Equipment } from '../types/equipment';
import { EQUIPMENT_CATALOG } from '../data/equipmentData';
import { ProductCard } from './ProductCard';
import { ProductDetailView } from './ProductDetailView';
import {
  FileText,
  Lock,
  Building2,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';

interface ProposalCatalogViewProps {
  proposal: Proposal;
}

export const ProposalCatalogView: React.FC<ProposalCatalogViewProps> = ({
  proposal,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Equipment | null>(null);

  // Filter ONLY the equipment in this proposal, preserving catalog ordering
  const proposalEquipment = React.useMemo(() => {
    return EQUIPMENT_CATALOG.filter((eq) =>
      proposal.equipmentIds.includes(eq.id)
    );
  }, [proposal.equipmentIds]);

  const handleOpenDetail = (equipment: Equipment) => {
    setSelectedProduct(equipment);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToProposal = () => {
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If viewing single product 3D details & technical sheet
  if (selectedProduct) {
    return (
      <ProductDetailView
        equipment={selectedProduct}
        onBack={handleBackToProposal}
      />
    );
  }

  // If proposal is closed
  if (proposal.status === 'cerrada') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex p-4 rounded-3xl bg-slate-100 border border-slate-200 text-slate-500 mb-6 shadow-xs">
          <Lock className="w-10 h-10" />
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-wider mb-4 border border-slate-200">
          Propuesta Cerrada
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading mb-4">
          Periodo de Consulta Concluido
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto text-base sm:text-lg mb-8 leading-relaxed">
          Esta propuesta de equipamiento tecnológico asignada a{' '}
          <strong className="text-slate-900">{proposal.targetEntity}</strong> ha sido cerrada por la administración del Programa PC PUMA.
        </p>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 max-w-lg mx-auto text-sm text-slate-600">
          <p className="font-semibold text-slate-800 mb-1">
            {proposal.title}
          </p>
          <p className="text-xs text-slate-500">
            Identificador de propuesta: <span className="font-mono text-slate-700">{proposal.id}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Institutional Hero Banner tailored exclusively for the entity's proposal */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-100 py-12 md:py-16 px-4 md:px-8">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-4">
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#CFA02C]"></span>
            <span className="text-xs font-semibold text-slate-700 tracking-wide">
              Propuesta Exclusiva • Programa PC PUMA UNAM
            </span>
          </div>

          {/* Proposal Target Entity */}
          <div className="flex items-center justify-center gap-2 text-sm font-semibold text-[#002B7A]">
            <Building2 className="w-4 h-4 text-[#CFA02C]" />
            <span>Destinada a: {proposal.targetEntity}</span>
          </div>

          {/* Proposal Main Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-heading leading-tight max-w-3xl mx-auto">
            {proposal.title}
          </h2>

          {/* Proposal Description */}
          {proposal.description && (
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed pt-1">
              {proposal.description}
            </p>
          )}

          {/* Proposal Metadata Summary Pills */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <Layers className="w-3.5 h-3.5 text-[#002B7A]" />
              <span className="font-semibold text-slate-800">
                {proposalEquipment.length}{' '}
                {proposalEquipment.length === 1 ? 'equipo seleccionado' : 'equipos seleccionados'}
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>
                Generada:{' '}
                {new Date(proposal.createdAt).toLocaleDateString('es-MX', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Modelos 3D y Fichas Técnicas Activas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Proposal Products Grid: Reuses EXACT existing ProductCard components */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-8">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-slate-900 font-heading">
              Equipamiento Incluido en la Propuesta
            </h3>
            <span className="text-xs bg-[#002B7A] text-white px-2.5 py-0.5 rounded-full font-semibold">
              {proposalEquipment.length}
            </span>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">
            Selecciona cualquier equipo para rotarlo en 3D e inspeccionar su ficha técnica
          </span>
        </div>

        {/* Product Cards Grid: Identical UI to public catalog */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proposalEquipment.map((equipment) => (
            <ProductCard
              key={equipment.id}
              equipment={equipment}
              onSelect={handleOpenDetail}
              onViewSpecs={handleOpenDetail}
            />
          ))}
        </div>

        {proposalEquipment.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200 p-8">
            <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-base font-semibold text-slate-700">
              Esta propuesta no contiene equipos asignados en este momento.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
