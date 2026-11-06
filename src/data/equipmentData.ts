import type { Equipment } from '../types/equipment';

const BASE = import.meta.env.BASE_URL;

export const EQUIPMENT_CATALOG: Equipment[] = [
  {
    id: 'lenovo-chromebook-500e',
    slug: 'chromebook-estandar-pc-puma-ec-01-2026',
    brand: 'Multimarca',
    name: 'Chromebook Estándar - PC Puma EC-01(2026)',
    commercialName: 'Chromebook Estándar - PC Puma EC-01(2026)',
    category: 'Convertible 2-en-1',
    subCategory: 'Estándar Técnico Multimarca',
    tagline: 'Estándar técnico multimarca (Lenovo, ASUS, HP, etc.) convertible 2-en-1 con pantalla táctil.',
    description: 'Clasificación y estándar técnico institucional independiente de fabricante. Contempla equipos convertibles 2-en-1 de múltiples marcas homologadas (como Lenovo, ASUS, HP, entre otras) que cumplan con la arquitectura base: procesador de 8 núcleos, 8 GB de memoria RAM LPDDR5X, pantalla táctil de 11.6 pulgadas con rotación en 360 grados y sistema ChromeOS. Unidad de referencia técnica y visual en catálogo: Lenovo Chromebook 500e.',
    imagePath: `${BASE}images/chromebook-500e.jpg`,
    model3dPath: `${BASE}models/Chromebook.glb`,
    modelFileSize: '420 KB',
    badges: ['Estándar Multimarca', 'Lenovo • ASUS • HP', 'Convertible 360°', '8 GB LPDDR5X', 'Ref: Lenovo 500e'],
    quickSpecs: {
      screen: '11.6" HD (1366 × 768) IPS Táctil 10 puntos',
      processor: 'MediaTek Kompanio 540 (8 núcleos: 2 Cortex-A78 + 6 Cortex-A55)',
      ram: '8 GB LPDDR5X-6400 (integrada)',
      storage: '64 GB UFS 2.2',
      batteryLife: 'Batería 50 Wh (Cargador USB-C 65 W)',
      weight: '1.29 kg',
      os: 'ChromeOS',
    },
    sections: [
      {
        id: 'identificacion',
        title: 'Identificación y Homologación',
        items: [
          { label: 'Clasificación técnica', value: 'Chromebook Estándar - PC Puma EC-01(2026)' },
          { label: 'Fabricante', value: 'Multimarca (Lenovo, ASUS, HP y fabricantes homologados)' },
          { label: 'Modelo de referencia técnica', value: 'Lenovo Chromebook 500e 2-in-1 (11.6” MediaTek)' },
          { label: 'Identificador del equipo', value: 'PC-PUMA-EC-01(2026)' },
          { label: 'Tipo de equipo', value: 'Computadora portátil convertible 2-en-1 para uso educativo e institucional' },
          { label: 'Sistema operativo', value: 'ChromeOS' },
        ],
      },
      {
        id: 'procesamiento',
        title: 'Procesamiento y Gráficos',
        items: [
          { label: 'Procesador', value: 'MediaTek Kompanio 540 (ARM, 8 núcleos: 2 Cortex-A78 + 6 Cortex-A55)' },
          { label: 'Gráficos', value: 'GPU integrada ARM Mali-G57 MC2' },
        ],
      },
      {
        id: 'memoria_almacenamiento',
        title: 'Memoria y Almacenamiento',
        items: [
          { label: 'Memoria RAM', value: '8 GB LPDDR5X-6400 integrada' },
          { label: 'Almacenamiento interno', value: '64 GB UFS 2.2' },
        ],
      },
      {
        id: 'pantalla',
        title: 'Pantalla',
        items: [
          { label: 'Tamaño', value: '11.6 pulgadas' },
          { label: 'Resolución', value: '1366 × 768 (HD)' },
          { label: 'Tecnología', value: 'IPS, LED, táctil, multitáctil de 10 puntos' },
          { label: 'Brillo', value: '250 nits' },
          { label: 'Frecuencia de actualización', value: '60 Hz' },
          { label: 'Relación de aspecto', value: '16:9' },
        ],
      },
      {
        id: 'diseno',
        title: 'Diseño y Formato',
        items: [
          { label: 'Formato / bisagra', value: 'Convertible 360°; modos portátil, tienda, soporte y tableta' },
          { label: 'Lápiz digital', value: 'Lápiz digital integrado compatible (estilo Lenovo Integrated Pen o equivalente homologado)' },
        ],
      },
      {
        id: 'entrada',
        title: 'Entrada y Control',
        items: [
          { label: 'Teclado', value: 'Integrado, resistente a derrames; sin retroiluminación' },
          { label: 'Trackpad', value: 'Panel táctil integrado' },
        ],
      },
      {
        id: 'camara_audio',
        title: 'Cámara y Audio',
        items: [
          { label: 'Cámara frontal', value: 'HD 720p con obturador de privacidad' },
          { label: 'Cámara posterior', value: '5 MP' },
          { label: 'Micrófonos', value: 'Arreglo de micrófonos integrado' },
          { label: 'Bocinas', value: 'Estéreo 2 × 2 W, Waves MaxxAudio' },
        ],
      },
      {
        id: 'conectividad',
        title: 'Conectividad y Red',
        items: [
          { label: 'Wi-Fi', value: 'Wi-Fi integrado de alta velocidad' },
          { label: 'Bluetooth', value: 'Bluetooth integrado' },
        ],
      },
      {
        id: 'puertos',
        title: 'Puertos e Interfaces',
        items: [
          { label: 'USB-C', value: 'USB-C con datos, carga y DisplayPort' },
          { label: 'USB-A', value: 'Sí' },
          { label: 'HDMI', value: 'Sí' },
          { label: 'Audio 3.5 mm', value: 'Sí' },
        ],
      },
      {
        id: 'seguridad',
        title: 'Seguridad',
        items: [
          { label: 'Seguridad física', value: 'Ranura Kensington Nano Security Slot' },
        ],
      },
      {
        id: 'bateria',
        title: 'Batería y Energía',
        items: [
          { label: 'Capacidad de batería', value: '50 Wh' },
          { label: 'Adaptador de corriente', value: 'USB-C 65 W' },
        ],
      },
      {
        id: 'dimensiones',
        title: 'Dimensiones y Peso',
        items: [
          { label: 'Dimensiones', value: '289.7 × 212 × 20.33 mm' },
          { label: 'Peso', value: '1.29 kg' },
        ],
      },
      {
        id: 'administracion_garantia',
        title: 'Administración y Garantía',
        items: [
          { label: 'Administración institucional', value: 'Compatible con Google Admin Console, Chrome Education Upgrade (CEU) y Zero Touch Enrollment' },
          { label: 'Actualizaciones', value: 'Periodo de actualizaciones automáticas según ciclo de soporte de Google' },
          { label: 'Garantía', value: '1 año de garantía con fabricante' },
        ],
      },
    ],
    loanAvailability: {
      status: 'disponible',
      locations: ['Módulos PC PUMA en Bibliotecas y Facultades'],
      targetAudience: 'Comunidad universitaria y estudiantes con credencial vigente',
      requirements: [
        'Identificación oficial o credencial vigente',
        'Registro en el módulo correspondiente',
        'Firma de uso de equipo de cómputo',
      ],
      includedSoftware: [
        'ChromeOS con actualizaciones automáticas de seguridad',
        'Navegador Google Chrome y suite de ofimática web',
        'Compatibilidad nativa con servicios en la nube',
      ],
    },
  },
  {
    id: 'apple-macbook-neo',
    slug: 'macbook-neo-pc-puma-ec-03-2026',
    brand: 'Apple',
    name: 'MacBook Neo - PC Puma EC-03(2026)',
    commercialName: 'MacBook Neo - PC Puma EC-03(2026)',
    category: 'Computadora Portátil',
    subCategory: 'Cómputo Profesional y Multimedia',
    tagline: 'Computadora portátil con chip Apple A18 Pro y pantalla Liquid Retina de 13 pulgadas.',
    description: 'Computadora portátil premium en formato clamshell con procesador Apple A18 Pro de 6 núcleos, 8 GB de memoria unificada, almacenamiento SSD de 256 GB y pantalla Liquid Retina de alta resolución de 500 nits con soporte para Wi-Fi 6E y Bluetooth 6.',
    imagePath: `${BASE}images/macbook-neo.jpg`,
    model3dPath: `${BASE}models/macbook_neo.glb`,
    modelFileSize: '25.9 MB',
    badges: ['Apple A18 Pro', 'Liquid Retina 13"', '8 GB Unificada', '256 GB SSD', 'Wi-Fi 6E + BT 6'],
    quickSpecs: {
      screen: '13" Liquid Retina (2408 × 1506) IPS 500 nits',
      processor: 'Apple A18 Pro (6 núcleos: 2 rendimiento + 4 eficiencia)',
      ram: '8 GB de memoria unificada',
      storage: '256 GB SSD',
      batteryLife: 'Batería 36.5 Wh (Adaptador USB-C)',
      weight: '1.23 kg',
      os: 'macOS',
    },
    sections: [
      {
        id: 'identificacion',
        title: 'Identificación',
        items: [
          { label: 'Marca', value: 'Apple' },
          { label: 'Modelo', value: 'MacBook Neo' },
          { label: 'Nombre en catálogo', value: 'MacBook Neo - PC Puma EC-03(2026)' },
          { label: 'Configuración solicitada', value: '8 GB de memoria / 256 GB SSD' },
          { label: 'Identificador del equipo', value: 'PC-PUMA-EC-03(2026)' },
          { label: 'Tipo de equipo', value: 'Computadora portátil' },
          { label: 'Sistema operativo', value: 'macOS' },
        ],
      },
      {
        id: 'procesamiento',
        title: 'Procesamiento y Gráficos',
        items: [
          { label: 'Procesador', value: 'Apple A18 Pro' },
          { label: 'CPU', value: '6 núcleos: 2 de rendimiento y 4 de eficiencia' },
          { label: 'Gráficos', value: 'GPU integrada Apple de 5 núcleos' },
        ],
      },
      {
        id: 'memoria_almacenamiento',
        title: 'Memoria y Almacenamiento',
        items: [
          { label: 'Memoria RAM', value: '8 GB de memoria unificada' },
          { label: 'Almacenamiento interno', value: '256 GB SSD' },
        ],
      },
      {
        id: 'pantalla',
        title: 'Pantalla',
        items: [
          { label: 'Tamaño', value: '13 pulgadas' },
          { label: 'Resolución', value: '2408 × 1506 píxeles' },
          { label: 'Tecnología', value: 'Liquid Retina, IPS, retroiluminación LED' },
          { label: 'Brillo', value: '500 nits' },
          { label: 'Frecuencia de actualización', value: '60 Hz' },
        ],
      },
      {
        id: 'diseno',
        title: 'Diseño y Formato',
        items: [
          { label: 'Formato', value: 'Diseño portátil tipo clamshell' },
          { label: 'Color', value: 'Gris Espacial / Plata' },
        ],
      },
      {
        id: 'entrada',
        title: 'Entrada y Control',
        items: [
          { label: 'Teclado', value: 'Magic Keyboard integrado' },
          { label: 'Trackpad', value: 'Trackpad Multi-Touch' },
        ],
      },
      {
        id: 'camara_audio',
        title: 'Cámara y Audio',
        items: [
          { label: 'Cámara', value: 'FaceTime HD 1080p' },
          { label: 'Micrófonos', value: 'Micrófonos integrados' },
          { label: 'Bocinas', value: 'Sistema de sonido integrado' },
        ],
      },
      {
        id: 'conectividad',
        title: 'Conectividad y Red',
        items: [
          { label: 'Wi-Fi', value: 'Wi-Fi 6E' },
          { label: 'Bluetooth', value: 'Bluetooth 6' },
        ],
      },
      {
        id: 'puertos',
        title: 'Puertos e Interfaces',
        items: [
          { label: 'USB-C', value: '2 puertos USB-C' },
          { label: 'USB-A', value: 'No' },
          { label: 'HDMI', value: 'No' },
          { label: 'Audio 3.5 mm', value: 'Sí' },
        ],
      },
      {
        id: 'bateria',
        title: 'Batería y Energía',
        items: [
          { label: 'Capacidad de batería', value: '36.5 Wh' },
          { label: 'Adaptador de corriente', value: 'Adaptador de corriente USB-C' },
        ],
      },
      {
        id: 'dimensiones',
        title: 'Dimensiones y Peso',
        items: [
          { label: 'Dimensiones', value: '297.5 × 206.4 × 12.7 mm' },
          { label: 'Peso', value: '1.23 kg' },
        ],
      },
      {
        id: 'administracion_garantia',
        title: 'Administración y Garantía',
        items: [
          { label: 'Administración institucional', value: 'Enrolamiento a través de Apple School Manager en la unidad organizativa de la UNAM' },
          { label: 'Actualizaciones', value: 'Actualizaciones de macOS sujetas al ciclo de compatibilidad de Apple' },
          { label: 'Garantía', value: '1 año de garantía con fabricante' },
        ],
      },
    ],
    loanAvailability: {
      status: 'disponible',
      locations: ['Módulos de Cómputo Especializado'],
      targetAudience: 'Estudiantes, docentes y comunidad universitaria',
      requirements: [
        'Identificación oficial o credencial vigente',
        'Registro en el módulo correspondiente',
        'Firma de uso de equipo de cómputo',
      ],
      includedSoftware: [
        'macOS con herramientas esenciales',
        'Navegador Safari y suite de productividad',
        'Compatibilidad nativa con servicios y herramientas de desarrollo',
      ],
    },
  },
  {
    id: 'locker-autoprestamo-pcpuma',
    slug: 'locker-autoprestamo-pc-puma-lc-01-2026',
    brand: 'PC PUMA',
    name: 'Locker de Autopréstamo - PC Puma LC-01(2026)',
    commercialName: 'Locker de Autopréstamo - PC Puma LC-01(2026)',
    category: 'Infraestructura y Autoservicio',
    subCategory: 'Módulo de Autopréstamo y Carga',
    tagline: 'Contenedor inteligente de autoservicio para resguardo, préstamo y recarga simultánea de 20 laptops.',
    description: 'Estación de autoservicio automatizada para el préstamo, resguardo y carga eléctrica de equipos de cómputo portátiles PC PUMA. Fabricado en lámina de acero calibre 18 con acabado en pintura electrostática y base PTR calibre 14. Dispone de 20 ranuras independientes con alimentación regulada por PDU, conexión Ethernet y ventanas para visualización interior.',
    imagePath: `${BASE}images/locker-autoprestamo.png`,
    model3dPath: `${BASE}models/Locker.glb`,
    modelFileSize: '435 KB',
    technicalDiagramImage: `${BASE}images/locker-plano-tecnico.png`,
    technicalDiagramTitle: 'Plano Técnico de Dimensiones, Materiales y Requerimientos',
    badges: ['Autoservicio 24/7', 'Capacidad 20 Laptops', 'Acero Calibre 18', 'PDU 127V / 15A', 'Ethernet'],
    quickSpecs: {
      screen: '20 ranuras (3 × 40 × 26 cm c/u)',
      processor: 'Control con temporizador de carga',
      ram: 'Capacidad para 20 laptops simultáneas',
      storage: '20 tomas PDU reguladas (127V / 15A)',
      batteryLife: 'Conexión eléctrica regulada 127 V, 15 A',
      weight: 'Lámina acero cal. 18 • Base PTR cal. 14',
      os: 'Red Ethernet e interfaz de autoservicio',
    },
    sections: [
      {
        id: 'identificacion',
        title: 'Identificación y Función',
        items: [
          { label: 'Nombre del producto', value: 'Locker PC Puma' },
          { label: 'Identificador del equipo', value: 'PC-PUMA-LC-01(2026)' },
          { label: 'Nombre en catálogo', value: 'Locker de Autopréstamo - PC Puma LC-01(2026)' },
          { label: 'Categoría', value: 'Infraestructura tecnológica y autoservicio' },
          { label: 'Tipo de equipo', value: 'Contenedor tipo locker para resguardo y carga de equipos de cómputo portátiles' },
          { label: 'Aplicación', value: 'Préstamo y almacenamiento de computadoras portátiles mediante interfaz de autoservicio' },
        ],
      },
      {
        id: 'capacidad_dimensiones',
        title: 'Capacidad y Dimensiones',
        items: [
          { label: 'Capacidad', value: '20 equipos de cómputo tipo laptop' },
          { label: 'Dimensiones exteriores', value: '167.70 cm alto × 80.00 cm ancho × 42.70 cm fondo' },
          { label: 'Dimensiones mínimas de cada ranura', value: '3 cm alto × 40 cm fondo × 26 cm ancho' },
          { label: 'Ventanas', value: 'Ventanas en las puertas para visualizar el interior de los compartimentos' },
        ],
      },
      {
        id: 'fabricacion_acabado',
        title: 'Materiales y Fabricación',
        items: [
          { label: 'Material de fabricación', value: 'Lámina de acero calibre 18' },
          { label: 'Acabado', value: 'Pintura electrostática de alta resistencia' },
          { label: 'Color', value: 'Azul y gris, conforme al diseño oficial PC Puma' },
          { label: 'Base estructural', value: 'PTR calibre 14' },
        ],
      },
      {
        id: 'distribucion_electrica',
        title: 'Alimentación Eléctrica y Control',
        items: [
          { label: 'Distribución eléctrica', value: '20 tomas de corriente independientes mediante PDU' },
          { label: 'Alimentación eléctrica', value: 'Conexión eléctrica regulada de 127 V, 15 A (según plano de diseño)' },
          { label: 'Sistema de alimentación', value: 'Cable de uso rudo y conexión eléctrica para los equipos' },
          { label: 'Control eléctrico', value: 'Interruptor general y sistema de temporizador para programación de carga' },
        ],
      },
      {
        id: 'conectividad_control',
        title: 'Conectividad y Gestión',
        items: [
          { label: 'Conectividad', value: 'Conexión de red Ethernet' },
          { label: 'Interfaz de usuario', value: 'Pantalla digital de terminal de autoservicio y teclado de autenticación' },
          { label: 'Sistema operativo de terminal', value: 'Sistema de control y autopréstamo institucional PC PUMA' },
        ],
      },
      {
        id: 'garantia',
        title: 'Garantía y Soporte',
        items: [
          { label: 'Garantía', value: 'Un año en todas sus partes, conforme a la cotización' },
        ],
      },
    ],
    loanAvailability: {
      status: 'disponible',
      locations: ['Facultades, Escuelas y Bibliotecas Universitarias'],
      targetAudience: 'Comunidad universitaria UNAM con credencial vigente',
      requirements: [
        'Credencial física vigente de la UNAM',
        'Autenticación en la pantalla táctil / lector del locker',
        'Aceptación de préstamo en autoservicio',
      ],
      includedSoftware: [
        'Interfaz interactiva de autoservicio PC PUMA',
        'Validación en tiempo real con sistema de conectividad',
        'Sistema de temporización y control de carga eléctrica regulada',
      ],
    },
  },
];

export const COMPARISON_FIELDS = [
  { key: 'category', label: 'Tipo de equipo', get: (e: Equipment) => e.sections.find(s => s.id === 'identificacion')?.items.find(i => i.label === 'Tipo de equipo' || i.label === 'Categoría')?.value || e.category },
  { key: 'brand', label: 'Fabricante / Marca', get: (e: Equipment) => e.sections.find(s => s.id === 'identificacion')?.items.find(i => i.label === 'Fabricante' || i.label === 'Marca')?.value || e.brand },
  { key: 'capacity', label: 'Capacidad de resguardo', get: (e: Equipment) => e.sections.find(s => s.id === 'capacidad_dimensiones')?.items.find(i => i.label === 'Capacidad')?.value || '1 equipo de usuario' },
  { key: 'refModel', label: 'Modelo / Referencia técnica', get: (e: Equipment) => e.sections.find(s => s.id === 'identificacion')?.items.find(i => i.label.includes('referencia') || i.label === 'Modelo')?.value || e.name },
  { key: 'processor', label: 'Procesamiento / Control', get: (e: Equipment) => e.sections.find(s => s.id === 'procesamiento')?.items.find(i => i.label === 'Procesador')?.value || (e.id.includes('locker') ? 'Sistema de control y temporizador de carga' : e.quickSpecs.processor) },
  { key: 'ram', label: 'Capacidad / Memoria', get: (e: Equipment) => e.sections.find(s => s.id === 'memoria_almacenamiento')?.items.find(i => i.label === 'Memoria RAM')?.value || (e.id.includes('locker') ? '20 compartimentos para laptop' : e.quickSpecs.ram) },
  { key: 'power', label: 'Alimentación y Energía', get: (e: Equipment) => e.sections.find(s => s.id === 'bateria' || s.id === 'distribucion_electrica')?.items.find(i => i.label.includes('Alimentación') || i.label.includes('Capacidad'))?.value || e.quickSpecs.batteryLife },
  { key: 'connectivity', label: 'Conectividad', get: (e: Equipment) => e.sections.find(s => s.id === 'conectividad' || s.id === 'conectividad_control')?.items.find(i => i.label === 'Conectividad' || i.label === 'Wi-Fi')?.value || 'Ethernet / Inalámbrica' },
  { key: 'dimensions', label: 'Dimensiones exteriores', get: (e: Equipment) => e.sections.find(s => s.id === 'dimensiones' || s.id === 'capacidad_dimensiones')?.items.find(i => i.label.includes('Dimensiones'))?.value || '' },
  { key: 'materials', label: 'Materiales y Acabado', get: (e: Equipment) => e.sections.find(s => s.id === 'fabricacion_acabado' || s.id === 'diseno')?.items.find(i => i.label.includes('Material') || i.label.includes('Formato'))?.value || 'Estructura metálica' },
  { key: 'warranty', label: 'Garantía', get: (e: Equipment) => e.sections.find(s => s.id === 'garantia' || s.id === 'administracion_garantia')?.items.find(i => i.label === 'Garantía')?.value || '1 año' },
];
