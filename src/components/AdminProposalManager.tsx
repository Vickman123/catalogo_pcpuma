import React, { useState, useEffect, useMemo } from 'react';
import type { Proposal, ProposalInput } from '../types/proposal';
import { EQUIPMENT_CATALOG } from '../data/equipmentData';
import {
  getProposals,
  createProposal,
  updateProposal,
  toggleProposalStatus,
  deleteProposal,
  getCleanProposalUrl,
  generateShortUrl,
} from '../services/proposalService';
import {
  Plus,
  Copy,
  Check,
  ExternalLink,
  Edit2,
  Trash2,
  Lock,
  Unlock,
  Search,
  Building2,
  Layers,
  ArrowLeft,
  X,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Link,
  Loader2,
} from 'lucide-react';

interface AdminProposalManagerProps {
  onBackToCatalog: () => void;
  onOpenProposal: (proposalId: string) => void;
}

export const AdminProposalManager: React.FC<AdminProposalManagerProps> = ({
  onBackToCatalog,
  onOpenProposal,
}) => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'activa' | 'cerrada'>('all');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProposalId, setEditingProposalId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isShorteningId, setIsShorteningId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState<string>('');
  const [formEntity, setFormEntity] = useState<string>('');
  const [formDescription, setFormDescription] = useState<string>('');
  const [formStatus, setFormStatus] = useState<'activa' | 'cerrada'>('activa');
  const [formSelectedEquipmentIds, setFormSelectedEquipmentIds] = useState<string[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  // Newly created proposal modal for copying link
  const [newlyCreatedProposal, setNewlyCreatedProposal] = useState<Proposal | null>(null);

  // Load proposals
  const reloadProposals = () => {
    const list = getProposals();
    setProposals([...list]);
  };

  useEffect(() => {
    reloadProposals();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Filtered list
  const filteredProposals = useMemo(() => {
    return proposals.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.targetEntity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus =
        statusFilter === 'all' || p.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [proposals, searchQuery, statusFilter]);

  // Open modal to create
  const handleOpenCreateModal = () => {
    setEditingProposalId(null);
    setFormTitle('');
    setFormEntity('');
    setFormDescription('');
    setFormStatus('activa');
    setFormSelectedEquipmentIds([]);
    setFormError(null);
    setIsModalOpen(true);
  };

  // Open modal to edit
  const handleOpenEditModal = (proposal: Proposal) => {
    setEditingProposalId(proposal.id);
    setFormTitle(proposal.title);
    setFormEntity(proposal.targetEntity);
    setFormDescription(proposal.description);
    setFormStatus(proposal.status);
    setFormSelectedEquipmentIds([...proposal.equipmentIds]);
    setFormError(null);
    setIsModalOpen(true);
  };

  // Toggle selection of equipment item in form
  const handleToggleEquipment = (eqId: string) => {
    setFormSelectedEquipmentIds((prev) =>
      prev.includes(eqId) ? prev.filter((id) => id !== eqId) : [...prev, eqId]
    );
  };

  // Select all or clear
  const handleSelectAllEquipment = () => {
    setFormSelectedEquipmentIds(EQUIPMENT_CATALOG.map((e) => e.id));
  };
  const handleClearEquipment = () => {
    setFormSelectedEquipmentIds([]);
  };

  // Save proposal (create or update)
  const handleSaveProposal = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle.trim()) {
      setFormError('Por favor ingresa un título para la propuesta.');
      return;
    }
    if (!formEntity.trim()) {
      setFormError('Por favor especifica la entidad de la UNAM destinataria.');
      return;
    }
    if (formSelectedEquipmentIds.length === 0) {
      setFormError('Debes seleccionar al menos un equipo del catálogo para incluir en la propuesta.');
      return;
    }

    const input: ProposalInput = {
      title: formTitle,
      targetEntity: formEntity,
      description: formDescription,
      equipmentIds: formSelectedEquipmentIds,
      status: formStatus,
    };

    if (editingProposalId) {
      updateProposal(editingProposalId, input);
      showToast('Propuesta actualizada correctamente');
      setIsModalOpen(false);
      reloadProposals();
    } else {
      const created = createProposal(input);
      reloadProposals();
      setIsModalOpen(false);
      setNewlyCreatedProposal(created);
    }
  };

  // Toggle status
  const handleToggleStatus = (id: string) => {
    toggleProposalStatus(id);
    reloadProposals();
    showToast('Estado de la propuesta actualizado');
  };

  // Delete proposal
  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`¿Estás seguro de eliminar la propuesta "${title}"? Esta acción no se puede deshacer.`)) {
      deleteProposal(id);
      reloadProposals();
      showToast('Propuesta eliminada correctamente');
    }
  };

  const copyTextToClipboard = async (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  };

  // Copy clean institutional URL (e.g. https://domain/#/propuesta/8f3a92b7c1d4)
  const handleCopyLink = async (proposal: Proposal) => {
    const url = getCleanProposalUrl(proposal.id);
    try {
      await copyTextToClipboard(url);
      setCopiedId(proposal.id);
      showToast('¡Enlace institucional copiado!');
      setTimeout(() => setCopiedId(null), 2500);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
      showToast('No se pudo copiar automáticamente.');
    }
  };

  // Generate & copy short URL (TinyURL / is.gd)
  const handleCopyShortUrl = async (proposal: Proposal) => {
    setIsShorteningId(proposal.id);
    try {
      const short = await generateShortUrl(proposal);
      await copyTextToClipboard(short);
      setCopiedId(proposal.id + '-short');
      reloadProposals();
      showToast('¡Enlace corto copiado para compartir!');
      setTimeout(() => setCopiedId(null), 2500);
    } catch (err) {
      console.error('Error shortening URL:', err);
      const clean = getCleanProposalUrl(proposal.id);
      await copyTextToClipboard(clean);
      showToast('Enlace institucional copiado.');
    } finally {
      setIsShorteningId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-700 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Bar */}
      <div className="bg-[#002B7A] text-white py-3 px-4 md:px-8 border-b border-blue-900 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="p-1 rounded bg-[#CFA02C] text-slate-950 font-black text-xs">
              ADMIN
            </span>
            <span className="font-bold text-sm tracking-wide text-white">
              Panel de Gestión de Propuestas Personalizadas
            </span>
            <span className="text-white/40 hidden sm:inline">•</span>
            <span className="text-xs text-white/80 hidden sm:inline">
              Programa PC PUMA UNAM
            </span>
          </div>

          <button
            onClick={onBackToCatalog}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al Catálogo Público</span>
          </button>
        </div>
      </div>

      {/* Main Admin Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 space-y-6">
        {/* Header & Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Propuestas de Equipamiento
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Crea enlaces privados para compartir únicamente los equipos seleccionados con facultades, escuelas e institutos de la UNAM.
            </p>
          </div>

          <button
            onClick={handleOpenCreateModal}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#002B7A] hover:bg-[#002261] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Propuesta</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por entidad, título o ID..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs md:text-sm rounded-xl border border-slate-200 focus:border-[#002B7A] focus:outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === 'all'
                  ? 'bg-[#002B7A] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Todas ({proposals.length})
            </button>

            <button
              onClick={() => setStatusFilter('activa')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === 'activa'
                  ? 'bg-[#002B7A] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Activas ({proposals.filter((p) => p.status === 'activa').length})
            </button>

            <button
              onClick={() => setStatusFilter('cerrada')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === 'cerrada'
                  ? 'bg-[#002B7A] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Cerradas ({proposals.filter((p) => p.status === 'cerrada').length})
            </button>
          </div>
        </div>

        {/* Proposals Table / Cards */}
        <div className="space-y-4">
          {filteredProposals.map((proposal) => {
            const selectedEquipments = EQUIPMENT_CATALOG.filter((e) =>
              proposal.equipmentIds.includes(e.id)
            );

            return (
              <div
                key={proposal.id}
                className="bg-white rounded-3xl border border-slate-200 p-5 md:p-6 shadow-xs hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Left side: Information */}
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                        proposal.status === 'activa'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          proposal.status === 'activa' ? 'bg-emerald-500' : 'bg-slate-400'
                        }`}
                      ></span>
                      {proposal.status === 'activa' ? 'Activa' : 'Cerrada'}
                    </span>

                    <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md border border-slate-200">
                      ID: {proposal.id}
                    </span>

                    <span className="text-xs text-slate-400">
                      Creada el{' '}
                      {new Date(proposal.createdAt).toLocaleDateString('es-MX', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                      {proposal.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#002B7A] mt-0.5">
                      <Building2 className="w-3.5 h-3.5 text-[#CFA02C]" />
                      <span>{proposal.targetEntity}</span>
                    </div>
                  </div>

                  {proposal.description && (
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {proposal.description}
                    </p>
                  )}

                  {/* Selected Equipment Chips */}
                  <div className="pt-1">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>
                        {selectedEquipments.length}{' '}
                        {selectedEquipments.length === 1 ? 'equipo incluido' : 'equipos incluidos'}:
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedEquipments.map((eq) => (
                        <span
                          key={eq.id}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700"
                        >
                          <img
                            src={eq.imagePath}
                            alt=""
                            className="w-3.5 h-3.5 object-contain"
                          />
                          <span>{eq.commercialName}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side: Action Buttons */}
                <div className="flex flex-wrap lg:flex-col items-stretch justify-end gap-2 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100 min-w-[220px]">
                  {/* Clean Institutional Link Button */}
                  <button
                    onClick={() => handleCopyLink(proposal)}
                    className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-all"
                    title={getCleanProposalUrl(proposal.id)}
                  >
                    {copiedId === proposal.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>¡Enlace Institucional Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Link className="w-3.5 h-3.5 text-[#CFA02C]" />
                        <span>Copiar Enlace Institucional</span>
                      </>
                    )}
                  </button>

                  {/* Short Link Button (TinyURL) */}
                  <button
                    onClick={() => handleCopyShortUrl(proposal)}
                    disabled={isShorteningId === proposal.id}
                    className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold transition-all disabled:opacity-50"
                    title={proposal.shortUrl || 'Generar link corto vía TinyURL'}
                  >
                    {isShorteningId === proposal.id ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-700" />
                        <span>Generando enlace corto...</span>
                      </>
                    ) : copiedId === proposal.id + '-short' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>¡Enlace Corto Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5 text-amber-600" />
                        <span>
                          {proposal.shortUrl ? 'Copiar Enlace Corto' : '⚡ Generar Enlace Corto'}
                        </span>
                      </>
                    )}
                  </button>

                  {/* View as entity */}
                  <button
                    onClick={() => onOpenProposal(proposal.id)}
                    className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-[#002B7A]/10 hover:bg-[#002B7A]/20 text-[#002B7A] text-xs font-bold transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Ver como Entidad</span>
                  </button>

                  <div className="flex items-center gap-2 w-full pt-1">
                    {/* Toggle Status (Close / Open) */}
                    <button
                      onClick={() => handleToggleStatus(proposal.id)}
                      title={proposal.status === 'activa' ? 'Cerrar propuesta' : 'Reactivar propuesta'}
                      className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        proposal.status === 'activa'
                          ? 'border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100'
                          : 'border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                      }`}
                    >
                      {proposal.status === 'activa' ? (
                        <>
                          <Lock className="w-3 h-3" />
                          <span>Cerrar</span>
                        </>
                      ) : (
                        <>
                          <Unlock className="w-3 h-3" />
                          <span>Reactivar</span>
                        </>
                      )}
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => handleOpenEditModal(proposal)}
                      title="Editar propuesta"
                      className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-[#002B7A] transition-all"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(proposal.id, proposal.title)}
                      title="Eliminar propuesta"
                      className="p-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredProposals.length === 0 && (
            <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-4">
              <Layers className="w-12 h-12 text-slate-300 mx-auto" />
              <div>
                <h4 className="text-base font-bold text-slate-800">
                  No se encontraron propuestas
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  {searchQuery || statusFilter !== 'all'
                    ? 'No hay propuestas que coincidan con los criterios de búsqueda o filtro seleccionados.'
                    : 'Aún no has creado ninguna propuesta de equipamiento. Haz clic en "Nueva Propuesta" para comenzar.'}
                </p>
              </div>
              <button
                onClick={handleOpenCreateModal}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#002B7A] text-white text-xs font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Crear mi primera propuesta</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CREATE / EDIT PROPOSAL MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-fade-in">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#002B7A] text-[#CFA02C]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading">
                    {editingProposalId ? 'Editar Propuesta de Equipamiento' : 'Nueva Propuesta de Equipamiento'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Selecciona los equipos del catálogo que deseas compartir exclusivamente con la entidad
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSaveProposal} className="overflow-y-auto p-6 space-y-6 flex-1">
              {formError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                  {formError}
                </div>
              )}

              {/* Title & Entity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 tracking-wide">
                    Título de la propuesta *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Ej. Propuesta de Renovación Laboratorios 2026"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#002B7A] focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 tracking-wide">
                    Entidad de la UNAM destinataria *
                  </label>
                  <input
                    type="text"
                    required
                    value={formEntity}
                    onChange={(e) => setFormEntity(e.target.value)}
                    placeholder="Ej. Facultad de Artes y Diseño / CCH Sur"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#002B7A] focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 tracking-wide">
                  Descripción o justificación técnica (opcional)
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Detalla las características pedagógicas, técnicas o de conectividad consideradas para esta selección..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#002B7A] focus:outline-none transition-all"
                />
              </div>

              {/* Status Toggle in edit mode */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-xs font-bold text-slate-800">Estado de la propuesta:</span>
                  <p className="text-[11px] text-slate-500">
                    Las propuestas activas son consultables por la entidad. Al cerrar, la entidad ve un aviso de fin de periodo.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setFormStatus('activa')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      formStatus === 'activa'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Activa
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormStatus('cerrada')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      formStatus === 'cerrada'
                        ? 'bg-slate-700 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Cerrada
                  </button>
                </div>
              </div>

              {/* Equipment Multi-Selector Grid */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-bold text-slate-800 tracking-wide">
                      Seleccionar equipos del catálogo ({formSelectedEquipmentIds.length} de {EQUIPMENT_CATALOG.length} seleccionados) *
                    </label>
                    <p className="text-[11px] text-slate-500">
                      Solo los equipos marcados estarán visibles en el enlace privado de la entidad.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={handleSelectAllEquipment}
                      className="text-[#002B7A] hover:underline"
                    >
                      Todos
                    </button>
                    <span className="text-slate-300">|</span>
                    <button
                      type="button"
                      onClick={handleClearEquipment}
                      className="text-slate-500 hover:underline"
                    >
                      Limpiar
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-72 overflow-y-auto p-1 border border-slate-200 rounded-2xl bg-slate-50/50">
                  {EQUIPMENT_CATALOG.map((eq) => {
                    const isSelected = formSelectedEquipmentIds.includes(eq.id);

                    return (
                      <div
                        key={eq.id}
                        onClick={() => handleToggleEquipment(eq.id)}
                        className={`p-3 rounded-xl border cursor-pointer select-none transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'bg-white border-[#002B7A] shadow-xs ring-2 ring-[#002B7A]/10'
                            : 'bg-white/80 border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-colors ${
                            isSelected
                              ? 'bg-[#002B7A] border-[#002B7A] text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>

                        <img
                          src={eq.imagePath}
                          alt={eq.commercialName}
                          className="w-10 h-10 object-contain shrink-0"
                        />

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {eq.commercialName}
                          </p>
                          <p className="text-[10px] text-slate-500 truncate">
                            {eq.category}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#002B7A] hover:bg-[#002261] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
                >
                  {editingProposalId ? 'Guardar Cambios' : 'Generar Propuesta y Enlace'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NEWLY CREATED PROPOSAL SHARE LINK MODAL */}
      {newlyCreatedProposal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-center space-y-5 animate-fade-in">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-xs">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                ¡Propuesta Creada Exitosamente!
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading mt-3">
                {newlyCreatedProposal.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Destinada a: <strong className="text-slate-900">{newlyCreatedProposal.targetEntity}</strong> • {newlyCreatedProposal.equipmentIds.length} equipos incluidos
              </p>
            </div>

            {/* Unique Link Boxes */}
            <div className="space-y-3 text-left">
              {/* Option 1: Clean Institutional Link */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Link className="w-3 h-3 text-[#002B7A]" />
                    <span>Enlace Institucional Limpio (Recomendado):</span>
                  </label>
                  <span className="text-[10px] text-slate-500 font-mono">Dominio oficial</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={getCleanProposalUrl(newlyCreatedProposal.id)}
                    className="w-full bg-white border border-slate-200 px-3 py-2 text-xs font-mono rounded-xl text-slate-800 select-all focus:outline-none"
                  />
                  <button
                    onClick={() => handleCopyLink(newlyCreatedProposal)}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shrink-0 flex items-center gap-1.5"
                  >
                    {copiedId === newlyCreatedProposal.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#CFA02C]" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Option 2: Shortened Link (TinyURL / is.gd) */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-amber-600" />
                    <span>Enlace Ultra Corto (Ideal para WhatsApp y Oficios):</span>
                  </label>
                  <span className="text-[10px] text-amber-700 font-semibold">Portabilidad total</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={newlyCreatedProposal.shortUrl || 'Generar link corto con 1 clic...'}
                    className="w-full bg-white border border-amber-200 px-3 py-2 text-xs font-mono rounded-xl text-slate-800 select-all focus:outline-none"
                  />
                  <button
                    onClick={() => handleCopyShortUrl(newlyCreatedProposal)}
                    disabled={isShorteningId === newlyCreatedProposal.id}
                    className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shrink-0 flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {isShorteningId === newlyCreatedProposal.id ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Acortando...</span>
                      </>
                    ) : copiedId === newlyCreatedProposal.id + '-short' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5" />
                        <span>{newlyCreatedProposal.shortUrl ? 'Copiar Corto' : '⚡ Generar Corto'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 pt-1">
                Ambos enlaces son privados y permiten a la entidad consultar directamente los {newlyCreatedProposal.equipmentIds.length} equipos asignados en 3D sin iniciar sesión.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onOpenProposal(newlyCreatedProposal.id)}
                className="px-4 py-2.5 rounded-xl bg-[#002B7A]/10 text-[#002B7A] hover:bg-[#002B7A]/20 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Ver cómo lo verá la Entidad</span>
              </button>
              <button
                onClick={() => setNewlyCreatedProposal(null)}
                className="px-5 py-2.5 rounded-xl bg-[#002B7A] text-white hover:bg-[#002261] text-xs font-bold transition-all shadow-xs"
              >
                Entendido / Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
