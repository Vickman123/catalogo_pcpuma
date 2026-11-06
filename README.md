# Catálogo Interactivo de Equipamiento Tecnológico PC PUMA – UNAM

Plataforma web profesional e interactiva para la consulta de equipamiento tecnológico del programa **PC PUMA** de la **Universidad Nacional Autónoma de México (UNAM)**.

Permite explorar los dispositivos mediante **modelos 3D interactivos en tiempo real**, consultar fichas técnicas institucionales estructuradas y realizar comparaciones técnicas detalladas.

---

## 🚀 Características Principales

- **Visor 3D en Tiempo Real (Three.js & WebGL):**
  - Rotación 360° horizontal y vertical con inercia suave (`damping`).
  - Zoom óptico continuo y botones de acercamiento/alejamiento.
  - Vistas de cámara rápidas (*Perspectiva*, *Frente*, *Teclado*, *Perfil*).
  - Rotación automática pausada dinámicamente ante interacción del usuario.
  - Modo pantalla completa con soporte de tecla `Esc`.
  - Modo de inspección de geometría (*Wireframe*).
  - Indicador de carga con progreso de descarga por bytes.
- **Fichas Técnicas Institucionales Estructuradas:**
  - Tablas técnicas de 2 columnas conforme al formato de anexos de adquisición de PC PUMA.
  - 12 categorías técnicas completas (General, Procesador, Memoria, Almacenamiento, Pantalla, Gráficos, Conectividad, Audio/Cámara, Batería, Diseño, Seguridad y Accesorios).
  - Pestaña de requisitos para préstamo a estudiantes y software institucional UNAM precargado.
- **Comparador Dinámico de Equipos:**
  - Análisis técnico lado a lado (*Lenovo Chromebook 500e vs. Apple MacBook Neo*).
  - Resaltado visual de diferencias técnicas.
  - Función de exportación / impresión de reporte.
- **Identidad Institucional UNAM:**
  - Diseño minimalista inspirado en la experiencia de producto de Apple combinado con la identidad oficial de la UNAM (Azul `#002B7A`, Oro `#CFA02C`).
  - 100% responsivo para computadoras de escritorio, laptops, tablets y smartphones.

---

## 💻 Equipos Iniciales en el Catálogo

1. **Lenovo Chromebook 500e 2-in-1 (11.6", MediaTek):**
   - Procesador MediaTek MT8183 Octa-Core.
   - Pantalla táctil HD IPS con bisagra de 360° y cristal Corning Gorilla Glass.
   - Certificación de grado militar MIL-STD-810G y teclado resistente a derrames.
   - ChromeOS integrado con Google Workspace UNAM.
2. **Apple MacBook Neo (Apple Silicon):**
   - Chip Apple Silicon con arquitectura de memoria unificada.
   - Pantalla Liquid Retina con amplia gama de color P3 (500 nits).
   - Chasis unibody de aluminio 100% reciclado y conectividad Thunderbolt / MagSafe 3.
   - macOS con suite de herramientas de desarrollo, artes visuales y cómputo científico.

---

## 🛠️ Stack Tecnológico

- **Frontend:** React 19 + TypeScript
- **Bundler & Dev Server:** Vite 8
- **3D & Renderizado:** Three.js, OrbitControls, GLTFLoader
- **Estilos:** Tailwind CSS v4
- **Iconografía:** Lucide React

---

## 📦 Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Vickman123/catalogo_pcpuma.git
   cd catalogo_pcpuma
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173/](http://localhost:5173/) en tu navegador.

4. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 🏛️ Créditos y Reconocimientos Institucionales

- **Institución:** Universidad Nacional Autónoma de México (UNAM)
- **Dependencia:** Dirección General de Cómputo y de Tecnologías de Información y Comunicación (DGTIC)
- **Programa:** PC PUMA – Conectividad y Cómputo Móvil Universitario
