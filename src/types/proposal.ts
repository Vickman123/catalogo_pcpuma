export interface Proposal {
  id: string; // Random unpredictable identifier, e.g. '8f3a92b7c1d4'
  title: string; // e.g. 'Propuesta de Equipamiento Ligero 2026'
  targetEntity: string; // e.g. 'Facultad de Artes y Diseño'
  description: string; // e.g. 'Equipos sugeridos para aulas y laboratorios digitales'
  equipmentIds: string[]; // IDs from EQUIPMENT_CATALOG, e.g. ['lenovo-chromebook-500e', 'apple-macbook-neo']
  status: 'activa' | 'cerrada';
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

export type ProposalInput = Omit<Proposal, 'id' | 'createdAt' | 'updatedAt'>;
