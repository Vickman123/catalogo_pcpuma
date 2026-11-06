import { useState, useMemo } from 'react';
import { EQUIPMENT_CATALOG } from './data/equipmentData';
import type { Equipment } from './types/equipment';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { ProductDetailView } from './components/ProductDetailView';
import { Footer } from './components/Footer';
import { Search } from 'lucide-react';

export function App() {
  const [view, setView] = useState<'catalog' | 'detail'>('catalog');
  const [selectedProduct, setSelectedProduct] = useState<Equipment | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Handle open 3D detail view
  const handleOpenDetail = (equipment: Equipment) => {
    setSelectedProduct(equipment);
    setView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered equipment list
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
        (selectedCategory === 'laptops' && item.id.includes('laptop')) ||
        (selectedCategory === 'chromebook' && item.id.includes('chromebook')) ||
        (selectedCategory === 'macbook' && item.id.includes('macbook')) ||
        (selectedCategory === 'tablets' && item.id.includes('ipad')) ||
        (selectedCategory === 'locker' && item.id.includes('locker'));

      return matchSearch && matchCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* Institutional Top Header */}
      <Header
        activeView={view}
        onNavigate={() => {
          setView('catalog');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* VIEW 1: PRODUCT CATALOG */}
        {view === 'catalog' && (
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
                    onClick={() => setSelectedCategory('laptops')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === 'laptops'
                        ? 'bg-[#002B7A] text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Laptops Windows (EC-04 / EC-05 / EC-06)
                  </button>

                  <button
                    onClick={() => setSelectedCategory('chromebook')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === 'chromebook'
                        ? 'bg-[#002B7A] text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Chromebook Estándar EC-01
                  </button>

                  <button
                    onClick={() => setSelectedCategory('macbook')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === 'macbook'
                        ? 'bg-[#002B7A] text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    MacBook Neo EC-03
                  </button>

                  <button
                    onClick={() => setSelectedCategory('tablets')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === 'tablets'
                        ? 'bg-[#002B7A] text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    iPads y Tablets (ET-01 / ET-02)
                  </button>

                  <button
                    onClick={() => setSelectedCategory('locker')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === 'locker'
                        ? 'bg-[#002B7A] text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Lockers LC-01
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

        {/* VIEW 2: PRODUCT 3D DETAIL VIEW */}
        {view === 'detail' && selectedProduct && (
          <ProductDetailView
            equipment={selectedProduct}
            onBack={() => setView('catalog')}
            onSelectOtherEquipment={(id) => {
              const other = EQUIPMENT_CATALOG.find((e) => e.id === id);
              if (other) {
                setSelectedProduct(other);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            allEquipment={EQUIPMENT_CATALOG}
          />
        )}
      </main>

      {/* Institutional Footer */}
      <Footer />
    </div>
  );
}

export default App;
