# Guía Oficial de Despliegue en pcpuma.unam.mx
**Programa PC PUMA – Universidad Nacional Autónoma de México (UNAM)**

Esta carpeta contiene la versión optimizada para producción del **Catálogo de Equipamiento Tecnológico de PC PUMA** con visor 3D interactivo y módulo de propuestas personalizadas.

---

## 📁 Estructura del Despliegue

```
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
```

---

## 🌐 Opciones de Despliegue en pcpuma.unam.mx

El proyecto utiliza **rutas relativas universales (`./`)**, lo que permite desplegarlo en cualquiera de los siguientes escenarios sin necesidad de recompilar:

1. **En la raíz del dominio:** `https://pcpuma.unam.mx/`
2. **En un subdominio:** `https://catalogo.pcpuma.unam.mx/`
3. **En un subdirectorio:** `https://pcpuma.unam.mx/catalogo/` o `https://pcpuma.unam.mx/equipamiento/`

---

## 🛠️ Instrucciones Paso a Paso por Tipo de Servidor

### Opción A: Servidor Apache / cPanel / Linux (Recomendado UNAM)

1. Sube todo el contenido de la carpeta `despliegue_pcpuma/` al directorio público del servidor (usualmente `public_html/`, `html/` o `/var/www/html/pcpuma/`).
2. Verifica que el archivo **`.htaccess`** se haya transferido (en algunos sistemas los archivos que inician con punto están ocultos).
3. **Importante:** El archivo `.htaccess` incluido ya cuenta con:
   - Tipo MIME `model/gltf-binary` para los archivos `.glb`.
   - Soporte de compresión Gzip/Deflate.
   - Regla de reescritura para rutas SPA (`/admin` y `/propuesta/:id`).
   - Cabeceras de caché óptimas.

---

### Opción B: Servidor Nginx (Linux)

1. Copia los archivos de `despliegue_pcpuma/` a tu directorio web (ejemplo: `/var/www/pcpuma/`).
2. Abre la configuración de tu sitio en Nginx (`/etc/nginx/sites-available/pcpuma.conf`).
3. Agrega o adapta las directivas provistas en el archivo `nginx.conf`:
   ```nginx
   location / {
       root /var/www/pcpuma;
       index index.html;
       try_files $uri $uri/ /index.html;
   }

   location ~* \.(glb|gltf)$ {
       types {
           model/gltf-binary glb;
           model/gltf+json   gltf;
       }
       add_header Access-Control-Allow-Origin "*";
   }
   ```
4. Ejecuta `nginx -t` y recarga con `systemctl reload nginx`.

---

### Opción C: Microsoft IIS (Windows Server)

1. Copia el contenido de la carpeta al directorio físico del sitio en IIS (ejemplo: `C:\inetpub\wwwroot\pcpuma`).
2. El archivo **`web.config`** incluido registrará automáticamente la extensión `.glb` como tipo MIME `model/gltf-binary` y configurará la reescritura de URL.
3. Asegúrate de tener instalado el módulo oficial **URL Rewrite** de IIS.

---

## ⚠️ Verificación Crítica: Modelos 3D (.glb)

Para que los modelos 3D giren y carguen en los navegadores de los usuarios, el servidor web **DEBE entregar los archivos `.glb` con el encabezado:**
```http
Content-Type: model/gltf-binary
```
Tanto el archivo `.htaccess`, como `nginx.conf` y `web.config` ya lo configuran automáticamente.

---

## 🔗 Rutas del Sistema

Una vez desplegado en `pcpuma.unam.mx`, las rutas disponibles serán:

* **Catálogo Público:** `https://pcpuma.unam.mx/`
* **Panel de Propuestas (Administrador):** `https://pcpuma.unam.mx/#/admin/propuestas` (o `/admin`)
* **Propuestas Privadas para Entidades:** `https://pcpuma.unam.mx/#/propuesta/[ID_ALEATORIO]` (o `/propuesta/[ID_ALEATORIO]`)
