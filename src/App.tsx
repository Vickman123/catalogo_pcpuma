import { useState, useMemo, useEffect, useCallback } from 'react';
import { EQUIPMENT_CATALOG } from './data/equipmentData';
import type { Equipment } from './types/equipment';
import type { Proposal } from './types/proposal';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { ProductDetailView } from './components/ProductDetailView';
import { ProposalCatalogView } from './components/ProposalCatalogView';
import { AdminProposalManager } from './components/AdminProposalManager';
import { Footer } from './components/Footer';
import {
  getProposalById,
  decodeProposalToken,
  saveImportedProposal,
} from './services/proposalService';
import { Search, AlertCircle, ArrowLeft } from 'lucide-react';

const BASE = import.meta.env.BASE_URL;

type RouteState =
  | { type: 'catalog' }
  | { type: 'admin' }
  | { type: 'proposal'; id: string };

function parseCurrentRoute(): RouteState {
  const hash = window.location.hash || '';
  const pathname = window.location.pathname || '';
  const search = window.location.search || '';

  // Check token parameter anywhere in the URL (for cross-device link imports)
  const fullUrl = window.location.href;
  const tokenMatch = fullUrl.match(/[?&]tk=([a-zA-Z0-9+/=%]+)/);
  if (tokenMatch) {
    try {
      const decoded = decodeProposalToken(tokenMatch[1]);
      if (decoded) {
        saveImportedProposal(decoded);
      }
    } catch {
      // Ignore if malformed
    }
  }

  // 1. Check hash routing (#/admin, #/admin/propuestas, #/propuesta/8f3a92b7c1d4)
  if (hash.includes('/admin') || hash === '#admin') {
    return { type: 'admin' };
  }

  const hashPropuestaMatch = hash.match(/#\/?propuesta\/([a-zA-Z0-9_-]+)/);
  if (hashPropuestaMatch) {
    return { type: 'proposal', id: hashPropuestaMatch[1] };
  }

  // 2. Check path routing (/admin, /admin/propuestas, /propuesta/8f3a92b7c1d4)
  if (
    pathname.endsWith('/admin') ||
    pathname.endsWith('/admin/propuestas') ||
    pathname.includes('/admin/')
  ) {
    return { type: 'admin' };
  }

  const pathPropuestaMatch = pathname.match(/\/propuesta\/([a-zA-Z0-9_-]+)/);
  if (pathPropuestaMatch) {
    return { type: 'proposal', id: pathPropuestaMatch[1] };
  }

  // 3. Check query param routing (?admin=true or ?propuesta=8f3a92b7c1d4)
  const params = new URLSearchParams(search);
  if (params.get('admin') === 'true') {
    return { type: 'admin' };
  }
  const propParam = params.get('propuesta') || params.get('p');
  if (propParam) {
    const match = propParam.match(/propuesta\/([a-zA-Z0-9_-]+)/);
    if (match) return { type: 'proposal', id: match[1] };
    if (/^[a-zA-Z0-9_-]+$/.test(propParam)) return { type: 'proposal', id: propParam };
  }

  return { type: 'catalog' };
}

export function App() {
  const [route, setRoute] = useState<RouteState>(() => parseCurrentRoute());
  const [view, setView] = useState<'catalog' | 'detail'>('catalog');
  const [selectedProduct, setSelectedProduct] = useState<Equipment | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Listen to browser navigation (hashchange & popstate)
  useEffect(() => {
    const handleLocationChange = () => {
      const parsed = parseCurrentRoute();
      setRoute(parsed);
      // Reset detail view when route changes
      setView('catalog');
      setSelectedProduct(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Handle open 3D detail view in public catalog
  const handleOpenDetail = (equipment: Equipment) => {
    setSelectedProduct(equipment);
    setView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate between catalog and admin
  const handleNavigate = useCallback((destination: 'catalog' | 'admin') => {
    if (destination === 'admin') {
      window.location.hash = '/admin/propuestas';
      setRoute({ type: 'admin' });
    } else {
      window.location.hash = '';
      setRoute({ type: 'catalog' });
    }
    setView('catalog');
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenProposalFromAdmin = useCallback((proposalId: string) => {
    window.location.hash = `/propuesta/${proposalId}`;
    setRoute({ type: 'proposal', id: proposalId });
    setView('catalog');
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Filtered equipment list for public catalog
  const filteredEquipment = useMemo(() => {
    return EQUIPMENT_CATALOG.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.commercialName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.quickSpecs.processor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory =
        selectedCategory === 'all' ||
        (selectedCategory === 'ligero' && item.category === 'Equipamiento Ligero') ||
        (selectedCategory === 'movil' && item.category === 'Cómputo Móvil') ||
        (selectedCategory === 'tabletas' && item.category === 'Tabletas') ||
        (selectedCategory === 'autoservicio' && item.category === 'Autoservicio e Infraestructura');

      return matchSearch && matchCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Current active proposal if in proposal route
  const currentProposal: Proposal | null = useMemo(() => {
    if (route.type === 'proposal') {
      return getProposalById(route.id);
    }
    return null;
  }, [route]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* Institutional Top Header */}
      <Header
        activeView={
          route.type === 'admin'
            ? 'admin'
            : route.type === 'proposal'
            ? 'proposal'
            : view
        }
        proposalEntity={currentProposal?.targetEntity}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* VIEW A: ADMIN PROPOSAL MANAGER */}
        {route.type === 'admin' && (
          <AdminProposalManager
            onBackToCatalog={() => handleNavigate('catalog')}
            onOpenProposal={handleOpenProposalFromAdmin}
          />
        )}

        {/* VIEW B: PROPOSAL CATALOG VIEW (EXCLUSIVE ENTITY PRIVATE VIEW) */}
        {route.type === 'proposal' && (
          <div>
            {currentProposal ? (
              <ProposalCatalogView proposal={currentProposal} />
            ) : (
              <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
                <div className="w-16 h-16 rounded-3xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                    Propuesta No Encontrada
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
                    El identificador de propuesta solicitado (<span className="font-mono text-slate-800 font-semibold">{route.id}</span>) no existe o el enlace es incorrecto.
                  </p>
                </div>
                <button
                  onClick={() => handleNavigate('catalog')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#002B7A] hover:bg-[#002261] text-white text-xs sm:text-sm font-bold shadow-md transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Ir al Catálogo Público General</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW C: STANDARD PUBLIC PRODUCT CATALOG */}
        {route.type === 'catalog' && view === 'catalog' && (
          <div>
            {/* Hero Section (Apple-style minimalism with UNAM identity) */}
            <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-100 py-12 md:py-20 px-4 md:px-8">
              {/* Subtle background blur accents */}
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none"></div>

              <div className="max-w-7xl mx-auto relative z-10 text-center space-y-5">
                {/* Institutional Pill Tag */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#CFA02C]"></span>
                  <span className="text-xs font-semibold text-slate-700 tracking-wide">
                    Plataforma Oficial de Consulta • UNAM
                  </span>
                </div>

                {/* PC PUMA Official Logo */}
                <div className="flex justify-center items-center pt-1 pb-2">
                  <img
                    src={`${BASE}images/pc-puma-logo.png`}
                    alt="Logo Oficial PC PUMA - Programa de Conectividad Móvil"
                    className="h-20 sm:h-24 md:h-28 w-auto object-contain mix-blend-multiply drop-shadow-xs hover:scale-105 transition-transform"
                  />
                </div>

                {/* Main Hero Title */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 font-heading max-w-4xl mx-auto leading-[1.15]">
                  Catálogo de Equipamiento <span className="text-[#002B7A]">Tecnológico</span>
                </h2>

                {/* Subtitle */}
                <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
                  Explora las características, capacidades y especificaciones técnicas de los equipos tecnológicos disponibles en PC PUMA mediante modelos 3D interactivos en tiempo real.
                </p>
              </div>
            </section>

            {/* Catalog Body & Products Grid */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-8">
              {/* Filter and Search Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-3 md:p-4 rounded-2xl border border-slate-200 shadow-2xs">
                {/* Search Input */}
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar equipo por nombre o procesador..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs md:text-sm rounded-xl border border-slate-200 focus:border-[#002B7A] focus:outline-none transition-all"
                  />
                </div>

                {/* Category Filters */}
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === 'all'
                        ? 'bg-[#002B7A] text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Todos ({EQUIPMENT_CATALOG.length})
                  </button>

                  <button
                    onClick={() => setSelectedCategory('ligero')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === 'ligero'
                        ? 'bg-[#002B7A] text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Equipamiento Ligero ({EQUIPMENT_CATALOG.filter((e) => e.category === 'Equipamiento Ligero').length})
                  </button>

                  <button
                    onClick={() => setSelectedCategory('movil')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === 'movil'
                        ? 'bg-[#002B7A] text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Cómputo Móvil ({EQUIPMENT_CATALOG.filter((e) => e.category === 'Cómputo Móvil').length})
                  </button>

                  <button
                    onClick={() => setSelectedCategory('tabletas')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === 'tabletas'
                        ? 'bg-[#002B7A] text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Tabletas ({EQUIPMENT_CATALOG.filter((e) => e.category === 'Tabletas').length})
                  </button>

                  <button
                    onClick={() => setSelectedCategory('autoservicio')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === 'autoservicio'
                        ? 'bg-[#002B7A] text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Autoservicio e Infraestructura ({EQUIPMENT_CATALOG.filter((e) => e.category === 'Autoservicio e Infraestructura').length})
                  </button>
                </div>
              </div>

              {/* Products Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEquipment.map((equipment) => (
                  <ProductCard
                    key={equipment.id}
                    equipment={equipment}
                    onSelect={handleOpenDetail}
                    onViewSpecs={handleOpenDetail}
                  />
                ))}
              </div>

              {/* Empty state if search finds nothing */}
              {filteredEquipment.length === 0 && (
                <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200 p-8">
                  <p className="text-base font-semibold text-slate-700">
                    No se encontraron equipos que coincidan con la búsqueda.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="mt-3 text-xs font-semibold text-[#002B7A] hover:underline"
                  >
                    Restablecer filtros
                  </button>
                </div>
              )}
            </section>
          </div>
        )}

        {/* VIEW D: PRODUCT 3D DETAIL VIEW IN PUBLIC CATALOG */}
        {route.type === 'catalog' && view === 'detail' && selectedProduct && (
          <ProductDetailView
            equipment={selectedProduct}
            onBack={() => setView('catalog')}
          />
        )}
      </main>

      {/* Institutional Footer */}
      <Footer onNavigateAdmin={() => handleNavigate('admin')} isProposal={route.type === 'proposal'} />
    </div>
  );
}

export default App;

