import type { Proposal, ProposalInput } from '../types/proposal';

const STORAGE_KEY = 'pcpuma_proposals_db_v1';

// Seed proposals for initial demonstration if none exist
const SEED_PROPOSALS: Proposal[] = [
  {
    id: '8f3a92b7c1d4',
    title: 'Propuesta de Equipamiento Ligero y Movilidad',
    targetEntity: 'Facultad de Artes y Diseño (FAD)',
    description: 'Selección técnica de computadoras portátiles ligeras de alto rendimiento y tabletas con pantalla multitáctil para proyectos formativos, talleres de diseño y consulta académica.',
    equipmentIds: ['lenovo-chromebook-500e', 'apple-macbook-neo'],
    status: 'activa',
    createdAt: new Date('2026-03-01T10:00:00Z').toISOString(),
    updatedAt: new Date('2026-03-01T10:00:00Z').toISOString(),
  },
  {
    id: '4e29c81a5b6f',
    title: 'Propuesta de Cómputo Especializado y Rendimiento Gráfico',
    targetEntity: 'Facultad de Ingeniería (FI)',
    description: 'Equipos con gráficos dedicados y procesadores de alto rendimiento para proyectos de modelado, simulación numérica y laboratorios de cómputo avanzado.',
    equipmentIds: ['laptop-1-computo-regular', 'laptop-2-computo-especializado'],
    status: 'activa',
    createdAt: new Date('2026-03-02T11:30:00Z').toISOString(),
    updatedAt: new Date('2026-03-02T11:30:00Z').toISOString(),
  },
];

// Generates an unpredictable 12-char hex string (e.g., '8f3a92b7c1d4')
export function generateRandomId(): string {
  const chars = '0123456789abcdef';
  let result = '';
  // Try crypto.getRandomValues if available
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const bytes = new Uint8Array(6);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  }
  for (let i = 0; i < 12; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

// Loads all proposals from storage (seeding if empty)
export function getProposals(): Proposal[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_PROPOSALS));
      return SEED_PROPOSALS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return SEED_PROPOSALS;
    }
    return parsed;
  } catch (err) {
    console.error('Error loading proposals from storage:', err);
    return SEED_PROPOSALS;
  }
}

// Saves full proposals list to storage
function saveProposals(proposals: Proposal[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(proposals));
  } catch (err) {
    console.error('Error saving proposals to storage:', err);
  }
}

// Finds a single proposal by ID
export function getProposalById(id: string): Proposal | null {
  const list = getProposals();
  const found = list.find((p) => p.id.toLowerCase() === id.toLowerCase());
  return found || null;
}

// Creates a new proposal
export function createProposal(input: ProposalInput): Proposal {
  const list = getProposals();
  const now = new Date().toISOString();
  const newProposal: Proposal = {
    id: generateRandomId(),
    title: input.title.trim(),
    targetEntity: input.targetEntity.trim(),
    description: input.description.trim(),
    equipmentIds: input.equipmentIds,
    status: input.status || 'activa',
    createdAt: now,
    updatedAt: now,
  };

  list.unshift(newProposal);
  saveProposals(list);
  return newProposal;
}

// Updates an existing proposal
export function updateProposal(
  id: string,
  input: Partial<ProposalInput>
): Proposal | null {
  const list = getProposals();
  const index = list.findIndex((p) => p.id.toLowerCase() === id.toLowerCase());
  if (index === -1) return null;

  const current = list[index];
  const updated: Proposal = {
    ...current,
    ...input,
    title: input.title !== undefined ? input.title.trim() : current.title,
    targetEntity: input.targetEntity !== undefined ? input.targetEntity.trim() : current.targetEntity,
    description: input.description !== undefined ? input.description.trim() : current.description,
    equipmentIds: input.equipmentIds !== undefined ? input.equipmentIds : current.equipmentIds,
    status: input.status !== undefined ? input.status : current.status,
    updatedAt: new Date().toISOString(),
  };

  list[index] = updated;
  saveProposals(list);
  return updated;
}

// Toggles active/closed status
export function toggleProposalStatus(id: string): Proposal | null {
  const current = getProposalById(id);
  if (!current) return null;
  const newStatus = current.status === 'activa' ? 'cerrada' : 'activa';
  return updateProposal(id, { status: newStatus });
}

// Deletes a proposal
export function deleteProposal(id: string): boolean {
  const list = getProposals();
  const filtered = list.filter((p) => p.id.toLowerCase() !== id.toLowerCase());
  if (filtered.length === list.length) return false;
  saveProposals(filtered);
  return true;
}

// Encodes proposal into a safe token for frictionless cross-device link sharing
export function encodeProposalToken(proposal: Proposal): string {
  try {
    const payload = {
      i: proposal.id,
      t: proposal.title,
      e: proposal.targetEntity,
      d: proposal.description,
      q: proposal.equipmentIds,
      s: proposal.status,
      c: proposal.createdAt,
    };
    const jsonStr = JSON.stringify(payload);
    // Base64 encode UTF-8
    return btoa(encodeURIComponent(jsonStr));
  } catch (err) {
    console.warn('Could not encode proposal token:', err);
    return '';
  }
}

// Decodes proposal token if opened on another device
export function decodeProposalToken(token: string): Proposal | null {
  try {
    const jsonStr = decodeURIComponent(atob(token));
    const payload = JSON.parse(jsonStr);
    if (!payload.i || !Array.isArray(payload.q)) return null;

    return {
      id: payload.i,
      title: payload.t || 'Propuesta Institucional PC PUMA',
      targetEntity: payload.e || 'Entidad Universitaria UNAM',
      description: payload.d || '',
      equipmentIds: payload.q,
      status: payload.s === 'cerrada' ? 'cerrada' : 'activa',
      createdAt: payload.c || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.warn('Could not decode proposal token:', err);
    return null;
  }
}

// Saves an imported proposal from link into local database
export function saveImportedProposal(proposal: Proposal): void {
  const list = getProposals();
  const existingIdx = list.findIndex((p) => p.id === proposal.id);
  if (existingIdx !== -1) {
    list[existingIdx] = proposal;
  } else {
    list.unshift(proposal);
  }
  saveProposals(list);
}

// Generates the full private URL for a proposal
export function getProposalShareUrl(proposal: Proposal): string {
  const origin = window.location.origin;
  const pathname = window.location.pathname.replace(/\/$/, '');
  const token = encodeProposalToken(proposal);

  // Hash route format that works anywhere without server routing configuration
  // E.g. https://domain.com/catalogo_pcpuma/#/propuesta/8f3a92b7c1d4?tk=...
  const tokenParam = token ? `?tk=${token}` : '';
  return `${origin}${pathname}/#/propuesta/${proposal.id}${tokenParam}`;
}
