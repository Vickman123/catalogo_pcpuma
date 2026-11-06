import React from 'react';
import type { Equipment } from '../types/equipment';
import { COMPARISON_FIELDS } from '../data/equipmentData';
import { Scale, ArrowLeft, Check, Printer, Sparkles, Eye } from 'lucide-react';

interface EquipmentComparatorProps {
  allEquipment: Equipment[];
  selectedEquipmentIds: string[];
  onToggleEquipment: (id: string) => void;
  onViewProduct: (equipment: Equipment) => void;
  onBackToCatalog: () => void;
}

export const EquipmentComparator: React.FC<EquipmentComparatorProps> = ({
  allEquipment,
  selectedEquipmentIds,
  onToggleEquipment,
  onViewProduct,
  onBackToCatalog,
}) => {
  // If fewer than 2 selected, default to all equipment so user immediately sees Lenovo vs Apple
  const activeIds =
    selectedEquipmentIds.length >= 2
      ? selectedEquipmentIds
      : allEquipment.map((e) => e.id);

  const comparedList = allEquipment.filter((e) => activeIds.includes(e.id));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <button
            onClick={onBackToCatalog}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#002B7A] transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Regresar al catálogo</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#002B7A] text-white">
              <Scale className="w-6 h-6 text-[#CFA02C]" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
                Comparador Técnico de Equipos PC PUMA
              </h2>
              <p className="text-xs md:text-sm text-slate-500">
                Análisis comparativo técnico y funcional de equipamiento institucional UNAM
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Imprimir tabla comparativa</span>
          </button>
        </div>
      </div>

      {/* Selector Pills: Choose which devices to compare */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Equipos en la comparativa ({comparedList.length}):
        </span>
        <div className="flex flex-wrap gap-2">
          {allEquipment.map((eq) => {
            const isChecked = activeIds.includes(eq.id);
            return (
              <button
                key={eq.id}
                onClick={() => onToggleEquipment(eq.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border ${
                  isChecked
                    ? 'bg-[#002B7A] text-white border-[#002B7A] shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${
                    isChecked ? 'bg-[#CFA02C] text-slate-900' : 'border border-slate-300'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>
                  {eq.brand} {eq.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Responsive Comparison Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            {/* Header: Products Cards in Table Header */}
            <thead>
              <tr className="border-b-2 border-slate-200 bg-slate-50/60">
                <th className="p-4 md:p-6 w-1/4 font-bold text-slate-500 uppercase tracking-wider text-xs border-r border-slate-200 align-top">
                  Especificación
                </th>
                {comparedList.map((eq) => (
                  <th key={eq.id} className="p-4 md:p-6 w-1/3 align-top border-r last:border-r-0 border-slate-200">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-white">
                          {eq.brand}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">
                          {eq.modelFileSize}
                        </span>
                      </div>

                      <div className="h-28 w-full bg-slate-100/70 rounded-xl p-2 flex items-center justify-center overflow-hidden border border-slate-200/60">
                        <img
                          src={eq.imagePath}
                          alt={eq.commercialName}
                          className="max-h-full max-w-full object-contain drop-shadow-sm"
                        />
                      </div>

                      <div>
                        <h4 className="text-base md:text-lg font-bold text-slate-900 font-heading">
                          {eq.commercialName}
                        </h4>
                        <span className="text-xs text-[#002B7A] font-medium block">
                          {eq.category}
                        </span>
                      </div>

                      <button
                        onClick={() => onViewProduct(eq)}
                        className="w-full py-2 px-3 rounded-xl bg-[#002B7A] hover:bg-[#001B4E] text-white text-xs font-semibold shadow-2xs transition-all flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Ver en 3D y ficha</span>
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Comparison Rows */}
            <tbody className="divide-y divide-slate-100">
              {COMPARISON_FIELDS.map((field, rowIdx) => {
                const values = comparedList.map((eq) => field.get(eq));
                // Check if all values are different to subtly tint row
                const isDifferent = new Set(values).size > 1;

                return (
                  <tr
                    key={field.key}
                    className={`hover:bg-slate-50/70 transition-colors ${
                      rowIdx % 2 === 1 ? 'bg-slate-50/30' : 'bg-white'
                    }`}
                  >
                    <td className="p-4 md:p-5 font-bold text-slate-700 border-r border-slate-200 bg-slate-50/40">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#002B7A]"></span>
                        <span>{field.label}</span>
                      </div>
                    </td>

                    {comparedList.map((eq) => {
                      const val = field.get(eq);
                      return (
                        <td
                          key={eq.id}
                          className="p-4 md:p-5 text-slate-800 border-r last:border-r-0 border-slate-100 leading-relaxed font-normal"
                        >
                          <div className="flex items-start gap-2">
                            {isDifferent && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#CFA02C] shrink-0 mt-1.5"></span>
                            )}
                            <span>{val}</span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Impartial Institutional Note */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 flex items-start gap-3 text-xs text-slate-600">
        <Sparkles className="w-5 h-5 text-[#CFA02C] shrink-0 mt-0.5" />
        <div>
          <h5 className="font-bold text-slate-800 mb-0.5">
            Criterios de Selección Tecnológica PC PUMA
          </h5>
          <p className="leading-relaxed">
            Ambos equipos cubren requerimientos académicos universitarios específicos: la <strong>Lenovo Chromebook 500e</strong> ofrece máxima portabilidad, resistencia física contra caídas y versatilidad táctil para actividades formativas generales y ofimática; mientras que la <strong>Apple MacBook Neo</strong> proporciona aceleración gráfica y cálculo unificado para proyectos de artes, diseño, ingeniería y computación especializada.
          </p>
        </div>
      </div>
    </div>
  );
};
