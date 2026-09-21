# App instalable (abre sin señal)

Esta carpeta es la **misma app**, empaquetada para instalarse en el teléfono
como una aplicación (PWA). Los datos siguen viviendo en tu Google Sheet: la app
le habla a Apps Script por internet cuando hay señal y guarda todo en el
teléfono cuando no hay.

Qué gana el equipo:

- **Abre sin señal.** Una vez instalada, arranca desde el teléfono aunque no
  haya datos ni Wi‑Fi, con la última ruta descargada.
- **Entra sin señal.** Si ya entró antes desde ese teléfono con señal, el
  usuario y PIN se aceptan sin conexión.
- **No depende de la pestaña de Chrome.** Es una app con su ícono; Android no
  la "descarga" como a una pestaña vieja.
- **Sesión de 7 días** (antes 6 horas).

## 1. Publicar la carpeta en GitHub Pages (una sola vez, ~10 minutos)

1. Crea una cuenta en https://github.com si no tienes.
2. Arriba a la derecha, **+ → New repository**. Nombre: `bombon-app`.
   Déjalo **Public** (GitHub Pages gratis lo requiere; el código no contiene
   contraseñas: el PIN se valida en Apps Script). **Create repository**.
3. En la página del repositorio nuevo, **uploading an existing file** (o
   *Add file → Upload files*). Arrastra **todo el contenido de esta carpeta**
   `pwa/` (index.html, config.js, sw.js, manifest.webmanifest, los dos íconos
   y .nojekyll). Abajo, **Commit changes**.
4. **Settings → Pages**. En *Build and deployment → Source* elige
   **Deploy from a branch**; *Branch*: `main`, carpeta `/ (root)`. **Save**.
5. Espera 1–2 minutos y recarga. Arriba aparece la dirección, tipo
   `https://TU-USUARIO.github.io/bombon-app/`. Esa es la URL de la app.

## 2. Revisar la dirección del servidor

Abre `config.js`. Trae la URL `/exec` de tu implementación actual de Apps
Script. Si algún día vuelves a implementar el proyecto con **otra** URL,
cambia esa línea y vuelve a subir `config.js`.

En Apps Script, la implementación debe seguir siendo *Ejecutar como: yo* y
*Quién tiene acceso: **Cualquier usuario***. Ya está así (por eso el login
funciona sin cuenta de Google).

## 3. Instalarla en cada teléfono

1. Abre la URL de GitHub Pages en **Chrome** del teléfono (con señal).
2. Menú ⋮ → **Agregar a pantalla de inicio** (o el aviso "Instalar app").
3. Abre la app desde el ícono nuevo y entra con usuario y PIN **con señal**
   una primera vez. A partir de ahí, abre y entra sin señal.
4. Acepta el permiso de ubicación cuando lo pida.

En iPhone: Safari → Compartir → **Añadir a pantalla de inicio**.

## 4. Cuando entregue una versión nueva

Cada versión trae una carpeta `pwa/` nueva. Sube de nuevo **index.html** y
**sw.js** al repositorio (los demás archivos casi nunca cambian; `config.js`
no lo pises si lo editaste). Los teléfonos reciben la versión sola: al abrir
la app con señal avisa "Hay una versión nueva, cierra y vuelve a abrir".

Apps Script se actualiza como siempre: pegar `Codigo.gs` + `Index.html` y
**Nueva versión** de la implementación. La URL `/exec` no cambia si editas
la implementación existente en vez de crear una nueva.

## Qué pasa sin señal, exactamente

| Situación | Resultado |
|---|---|
| Abrir la app | Abre. Muestra la última ruta descargada si es de hoy. Si no hay ruta de hoy guardada, avisa: hay que abrir con señal una vez al día. |
| Entrar con usuario y PIN | Acepta si ese usuario ya entró antes desde ese teléfono. |
| Check-in, inventario, precios, fotos, cerrar visita | Todo funciona. Queda en el teléfono como *Por subir*. |
| Vuelve la señal | Sube solo, visita por visita y foto por foto. |
| Mi día, Mis clientes | Necesitan señal (se calculan en el servidor). |
| Administrador (panel, monitoreo, cartera) | Necesita señal. |

La URL de Apps Script (`/exec`) sigue funcionando igual que hasta ahora; la app
instalada es una segunda puerta al mismo sistema.
