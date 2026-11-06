import type { Equipment } from '../types/equipment';

const BASE = import.meta.env.BASE_URL;

export const EQUIPMENT_CATALOG: Equipment[] = [
  {
    id: 'lenovo-chromebook-500e',
    slug: 'chromebook-estandar-pc-puma-ec-01-2026',
    brand: 'Lenovo',
    name: 'Chromebook Estándar - PC Puma EC-01(2026)',
    commercialName: 'Chromebook Estándar - PC Puma EC-01(2026)',
    category: 'Convertible 2-en-1',
    subCategory: 'Cómputo Móvil Educativo',
    tagline: 'Computadora portátil convertible 2-en-1 con bisagra de 360° y pantalla táctil HD.',
    description: 'Computadora portátil convertible 2-en-1 diseñada para uso educativo y académico. Equipada con procesador MediaTek Kompanio 540 de 8 núcleos, 8 GB de memoria RAM LPDDR5X y pantalla táctil de 11.6 pulgadas con versatilidad de rotación completa en 360 grados.',
    imagePath: `${BASE}images/chromebook-500e.jpg`,
    model3dPath: `${BASE}models/Chromebook.glb`,
    modelFileSize: '420 KB',
    badges: ['Convertible 360°', 'Pantalla Táctil HD', '8 GB LPDDR5X', 'MediaTek Kompanio 540', 'USB-C + HDMI'],
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
        title: 'Identificación',
        items: [
          { label: 'Marca', value: 'Lenovo' },
          { label: 'Modelo', value: 'Chromebook 500e 2-in-1 (11.6” MediaTek)' },
          { label: 'Nombre en catálogo', value: 'Chromebook Estándar - PC Puma EC-01(2026)' },
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
          { label: 'Lápiz digital', value: 'Lenovo Integrated Pen' },
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
];

export const COMPARISON_FIELDS = [
  { key: 'category', label: 'Tipo de equipo', get: (e: Equipment) => e.sections.find(s => s.id === 'identificacion')?.items.find(i => i.label === 'Tipo de equipo')?.value || e.category },
  { key: 'os', label: 'Sistema operativo', get: (e: Equipment) => e.quickSpecs.os },
  { key: 'processor', label: 'Procesador', get: (e: Equipment) => e.sections.find(s => s.id === 'procesamiento')?.items.find(i => i.label === 'Procesador')?.value || e.quickSpecs.processor },
  { key: 'graphics', label: 'Gráficos', get: (e: Equipment) => e.sections.find(s => s.id === 'procesamiento')?.items.find(i => i.label === 'Gráficos')?.value || 'Integrados' },
  { key: 'ram', label: 'Memoria RAM', get: (e: Equipment) => e.sections.find(s => s.id === 'memoria_almacenamiento')?.items.find(i => i.label === 'Memoria RAM')?.value || e.quickSpecs.ram },
  { key: 'storage', label: 'Almacenamiento interno', get: (e: Equipment) => e.sections.find(s => s.id === 'memoria_almacenamiento')?.items.find(i => i.label === 'Almacenamiento interno')?.value || e.quickSpecs.storage },
  { key: 'screen', label: 'Pantalla', get: (e: Equipment) => `${e.sections.find(s => s.id === 'pantalla')?.items.find(i => i.label === 'Tamaño')?.value || ''} - ${e.sections.find(s => s.id === 'pantalla')?.items.find(i => i.label === 'Resolución')?.value || ''} (${e.sections.find(s => s.id === 'pantalla')?.items.find(i => i.label === 'Tecnología')?.value || ''})` },
  { key: 'brightness', label: 'Brillo de pantalla', get: (e: Equipment) => e.sections.find(s => s.id === 'pantalla')?.items.find(i => i.label === 'Brillo')?.value || 'Información no disponible' },
  { key: 'format', label: 'Formato / Chasis', get: (e: Equipment) => e.sections.find(s => s.id === 'diseno')?.items.find(i => i.label.includes('Formato'))?.value || 'Portátil' },
  { key: 'keyboard', label: 'Teclado y Entrada', get: (e: Equipment) => e.sections.find(s => s.id === 'entrada')?.items.find(i => i.label === 'Teclado')?.value || 'Integrado' },
  { key: 'camera', label: 'Cámara', get: (e: Equipment) => e.sections.find(s => s.id === 'camara_audio')?.items.find(i => i.label.includes('Cámara'))?.value || 'HD' },
  { key: 'wifi', label: 'Conectividad inalámbrica', get: (e: Equipment) => `${e.sections.find(s => s.id === 'conectividad')?.items.find(i => i.label === 'Wi-Fi')?.value || ''} • ${e.sections.find(s => s.id === 'conectividad')?.items.find(i => i.label === 'Bluetooth')?.value || ''}` },
  { key: 'usbc', label: 'Puertos USB-C', get: (e: Equipment) => e.sections.find(s => s.id === 'puertos')?.items.find(i => i.label === 'USB-C')?.value || 'No' },
  { key: 'usba', label: 'Puertos USB-A / HDMI', get: (e: Equipment) => `USB-A: ${e.sections.find(s => s.id === 'puertos')?.items.find(i => i.label === 'USB-A')?.value || 'No'} | HDMI: ${e.sections.find(s => s.id === 'puertos')?.items.find(i => i.label === 'HDMI')?.value || 'No'}` },
  { key: 'battery', label: 'Batería y Energía', get: (e: Equipment) => `${e.sections.find(s => s.id === 'bateria')?.items.find(i => i.label === 'Capacidad de batería')?.value || ''} (${e.sections.find(s => s.id === 'bateria')?.items.find(i => i.label === 'Adaptador de corriente')?.value || ''})` },
  { key: 'dimensions', label: 'Dimensiones', get: (e: Equipment) => e.sections.find(s => s.id === 'dimensiones')?.items.find(i => i.label === 'Dimensiones')?.value || '' },
  { key: 'weight', label: 'Peso', get: (e: Equipment) => e.sections.find(s => s.id === 'dimensiones')?.items.find(i => i.label === 'Peso')?.value || e.quickSpecs.weight },
  { key: 'warranty', label: 'Garantía', get: (e: Equipment) => e.sections.find(s => s.id === 'administracion_garantia')?.items.find(i => i.label === 'Garantía')?.value || '1 año' },
];
