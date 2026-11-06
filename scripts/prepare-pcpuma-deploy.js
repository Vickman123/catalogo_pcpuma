import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const deployDir = path.join(rootDir, 'despliegue_pcpuma');

console.log('🚀 Preparando carpeta optimizada para pcpuma.unam.mx...');

// 1. Ensure target directory exists
if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true, force: true });
}
fs.mkdirSync(deployDir, { recursive: true });

// 2. Recursive copy helper
function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 3. Copy all compiled production assets from dist/ to despliegue_pcpuma/
copyDirSync(distDir, deployDir);

// 4. Create Apache .htaccess configuration
const htaccessContent = `# ==============================================================================
# CONFIGURACIÓN APACHE PARA CATÁLOGO PC PUMA – UNAM (pcpuma.unam.mx)
# ==============================================================================

# 1. HABILITAR TIPOS MIME PARA MODELOS 3D Y FUENTES
<IfModule mod_mime.c>
  AddType model/gltf-binary .glb
  AddType model/gltf+json .gltf
  AddType image/svg+xml .svg .svgz
  AddType font/woff2 .woff2
  AddType font/woff .woff
</IfModule>

# 2. PERMITIR CABECERAS CORS PARA MODELOS 3D Y FUENTES
<IfModule mod_headers.c>
  <FilesMatch "\\.(glb|gltf|woff2|woff|ttf|svg)$">
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, OPTIONS"
  </FilesMatch>
</IfModule>

# 3. COMPRESIÓN GZIP / BROTLI PARA MEJOR VELOCIDAD DE CARGA
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css
  AddOutputFilterByType DEFLATE application/javascript application/x-javascript application/json
  AddOutputFilterByType DEFLATE image/svg+xml
  AddOutputFilterByType DEFLATE model/gltf-binary model/gltf+json
</IfModule>

# 4. POLÍTICAS DE CACHÉ DEL NAVEGADOR
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresDefault "access plus 1 month"

  # HTML sin caché para reflejar actualizaciones inmediatamente
  ExpiresByType text/html "access plus 0 seconds"

  # Archivos estáticos con hash/versión
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/svg+xml "access plus 1 month"
  ExpiresByType model/gltf-binary "access plus 1 month"
  ExpiresByType model/gltf+json "access plus 1 month"
</IfModule>

# 5. REESCRITURA DE RUTAS PARA SINGLE PAGE APPLICATION (SPA)
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . index.html [L]
</IfModule>
`;
fs.writeFileSync(path.join(deployDir, '.htaccess'), htaccessContent, 'utf8');

// 5. Create Nginx configuration snippet
const nginxContent = `# ==============================================================================
# CONFIGURACIÓN NGINX PARA CATÁLOGO PC PUMA – UNAM (pcpuma.unam.mx)
# ==============================================================================
# Copia o incluye este bloque dentro de tu bloque 'server { ... }'

location / {
    root /var/www/pcpuma; # Cambiar a la ruta donde copies los archivos
    index index.html;
    try_files $uri $uri/ /index.html;

    # Compresión gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript image/svg+xml model/gltf-binary model/gltf+json;
    gzip_min_length 1000;
}

# Tipos MIME y caché para modelos 3D
location ~* \\.(glb|gltf)$ {
    types {
        model/gltf-binary glb;
        model/gltf+json   gltf;
    }
    add_header Access-Control-Allow-Origin "*";
    add_header Cache-Control "public, max-age=2592000";
}

# Caché prolongada para assets versionados
location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff2|woff)$ {
    add_header Cache-Control "public, max-age=31536000, immutable";
}

# index.html sin caché para recibir actualizaciones de inmediato
location = /index.html {
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
`;
fs.writeFileSync(path.join(deployDir, 'nginx.conf'), nginxContent, 'utf8');

// 6. Create IIS web.config
const webConfigContent = `<?xml version="1.0" encoding="UTF-8"?>
<!-- ======================================================================= -->
<!-- CONFIGURACIÓN MICROSOFT IIS (WINDOWS SERVER) PARA pcpuma.unam.mx       -->
<!-- ======================================================================= -->
<configuration>
  <system.webServer>
    <staticContent>
      <!-- Asegurar soporte para modelos 3D GLB/GLTF -->
      <remove fileExtension=".glb" />
      <mimeMap fileExtension=".glb" mimeType="model/gltf-binary" />
      <remove fileExtension=".gltf" />
      <mimeMap fileExtension=".gltf" mimeType="model/gltf+json" />
      <remove fileExtension=".woff2" />
      <mimeMap fileExtension=".woff2" mimeType="font/woff2" />
    </staticContent>
    <rewrite>
      <rules>
        <rule name="SPA Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/index.html" />
        </rule>
      </rules>
    </rewrite>
    <httpProtocol>
      <customHeaders>
        <add name="Access-Control-Allow-Origin" value="*" />
      </customHeaders>
    </httpProtocol>
  </system.webServer>
</configuration>
`;
fs.writeFileSync(path.join(deployDir, 'web.config'), webConfigContent, 'utf8');

// 7. Create INSTRUCCIONES_DESPLIEGUE.md
const readmeContent = `# Guía Oficial de Despliegue en pcpuma.unam.mx
**Programa PC PUMA – Universidad Nacional Autónoma de México (UNAM)**

Esta carpeta contiene la versión optimizada para producción del **Catálogo de Equipamiento Tecnológico de PC PUMA** con visor 3D interactivo y módulo de propuestas personalizadas.

---

## 📁 Estructura del Despliegue

\`\`\`
despliegue_pcpuma/
├── index.html                   # Punto de entrada principal (rutas relativas universales)
├── assets/                      # Bundles optimizados y minificados de JavaScript y CSS
├── images/                      # Logotipos oficiales e imágenes de los equipos
├── models/                      # Modelos 3D (.glb) interactivos en tiempo real
├── .htaccess                    # Configuración optimizada para servidores Apache
├── nginx.conf                   # Plantilla de configuración para servidores Nginx
├── web.config                   # Configuración para servidores Windows Server / IIS
├── 404.html                     # Fallback para Single Page Application
└── INSTRUCCIONES_DESPLIEGUE.md  # Esta guía
\`\`\`

---

## 🌐 Opciones de Despliegue en pcpuma.unam.mx

El proyecto utiliza **rutas relativas universales (\`./\`)**, lo que permite desplegarlo en cualquiera de los siguientes escenarios sin necesidad de recompilar:

1. **En la raíz del dominio:** \`https://pcpuma.unam.mx/\`
2. **En un subdominio:** \`https://catalogo.pcpuma.unam.mx/\`
3. **En un subdirectorio:** \`https://pcpuma.unam.mx/catalogo/\` o \`https://pcpuma.unam.mx/equipamiento/\`

---

## 🛠️ Instrucciones Paso a Paso por Tipo de Servidor

### Opción A: Servidor Apache / cPanel / Linux (Recomendado UNAM)

1. Sube todo el contenido de la carpeta \`despliegue_pcpuma/\` al directorio público del servidor (usualmente \`public_html/\`, \`html/\` o \`/var/www/html/pcpuma/\`).
2. Verifica que el archivo **\`.htaccess\`** se haya transferido (en algunos sistemas los archivos que inician con punto están ocultos).
3. **Importante:** El archivo \`.htaccess\` incluido ya cuenta con:
   - Tipo MIME \`model/gltf-binary\` para los archivos \`.glb\`.
   - Soporte de compresión Gzip/Deflate.
   - Regla de reescritura para rutas SPA (\`/admin\` y \`/propuesta/:id\`).
   - Cabeceras de caché óptimas.

---

### Opción B: Servidor Nginx (Linux)

1. Copia los archivos de \`despliegue_pcpuma/\` a tu directorio web (ejemplo: \`/var/www/pcpuma/\`).
2. Abre la configuración de tu sitio en Nginx (\`/etc/nginx/sites-available/pcpuma.conf\`).
3. Agrega o adapta las directivas provistas en el archivo \`nginx.conf\`:
   \`\`\`nginx
   location / {
       root /var/www/pcpuma;
       index index.html;
       try_files $uri $uri/ /index.html;
   }

   location ~* \\.(glb|gltf)$ {
       types {
           model/gltf-binary glb;
           model/gltf+json   gltf;
       }
       add_header Access-Control-Allow-Origin "*";
   }
   \`\`\`
4. Ejecuta \`nginx -t\` y recarga con \`systemctl reload nginx\`.

---

### Opción C: Microsoft IIS (Windows Server)

1. Copia el contenido de la carpeta al directorio físico del sitio en IIS (ejemplo: \`C:\\inetpub\\wwwroot\\pcpuma\`).
2. El archivo **\`web.config\`** incluido registrará automáticamente la extensión \`.glb\` como tipo MIME \`model/gltf-binary\` y configurará la reescritura de URL.
3. Asegúrate de tener instalado el módulo oficial **URL Rewrite** de IIS.

---

## ⚠️ Verificación Crítica: Modelos 3D (.glb)

Para que los modelos 3D giren y carguen en los navegadores de los usuarios, el servidor web **DEBE entregar los archivos \`.glb\` con el encabezado:**
\`\`\`http
Content-Type: model/gltf-binary
\`\`\`
Tanto el archivo \`.htaccess\`, como \`nginx.conf\` y \`web.config\` ya lo configuran automáticamente.

---

## 🔗 Rutas del Sistema

Una vez desplegado en \`pcpuma.unam.mx\`, las rutas disponibles serán:

* **Catálogo Público:** \`https://pcpuma.unam.mx/\`
* **Panel de Propuestas (Administrador):** \`https://pcpuma.unam.mx/#/admin/propuestas\` (o \`/admin\`)
* **Propuestas Privadas para Entidades:** \`https://pcpuma.unam.mx/#/propuesta/[ID_ALEATORIO]\` (o \`/propuesta/[ID_ALEATORIO]\`)
`;
fs.writeFileSync(path.join(deployDir, 'INSTRUCCIONES_DESPLIEGUE.md'), readmeContent, 'utf8');

console.log('✅ Carpeta despliegue_pcpuma creada exitosamente con todos sus recursos y configuraciones.');
