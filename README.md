# Validador de Cédula RD 🇩🇴

Una Aplicación Web Progresiva (PWA) moderna, rápida y segura diseñada para validar la estructura de los números de la **Cédula de Identidad y Electoral** de la República Dominicana de forma offline y con total privacidad.

---

[![Licencia](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![PWA](https://img.shields.io/badge/PWA-Ready-orange.svg?style=for-the-badge)](manifest.json)
[![Docker](https://img.shields.io/badge/Docker-Enabled-blue.svg?style=for-the-badge&logo=docker)](docker-compose.yml)
[![Dokploy](https://img.shields.io/badge/Deploy%20on-Dokploy-purple.svg?style=for-the-badge)](https://dokploy.com)

---

## ⚡ Características

*   **Validación en Tiempo Real**: Comprueba de manera instantánea si una cédula es válida mientras escribes (con autoformato `000-0000000-0`).
*   **Algoritmo de Luhn (Módulo 10)**: Implementa la lógica de verificación oficial establecida por la Junta Central Electoral (JCE).
*   **Paso a Paso Interactivo**: Te permite inspeccionar detalladamente las multiplicaciones y sumas que determinan el dígito verificador.
*   **Privacidad Absoluta**: Todo el procesamiento se realiza localmente en el navegador. Ningún dato sensible sale de tu dispositivo.
*   **Soporte Offline Completo**: Diseñado como una PWA con un Service Worker que permite su uso completo sin conexión a internet.
*   **Historial Reciente**: Guarda las últimas 5 consultas en el `localStorage` para un acceso rápido.
*   **Interfaz Premium**: Diseño visualmente pulido con soporte para modo oscuro automático.

---

## 🚀 Despliegue en Dokploy

[Dokploy](https://dokploy.com) es una herramienta excelente y ligera para desplegar aplicaciones utilizando Docker de forma autohospedada.

Para desplegar este proyecto en tu panel de Dokploy, sigue estos pasos:

### 1. Crear una Aplicación en Dokploy
1. Inicia sesión en tu panel de **Dokploy**.
2. Ve al panel de proyectos y crea uno nuevo o selecciona uno existente.
3. Haz clic en **Create Service** y selecciona **Compose**.

### 2. Configurar el Repositorio de Git
1. Conecta tu repositorio de GitHub / GitLab donde está subido este proyecto:
   * **Repository**: `https://github.com/tu-usuario/ValidaCedulaRD`
   * **Branch**: `main` o la rama por defecto.
2. Si prefieres usar Docker directamente en Dokploy sin Compose, también puedes crear una **Multi-file Application** seleccionando la opción de **Dockerfile**.

### 3. Configurar Variables de Entorno (`.env`)
En Dokploy, dentro de la pestaña **Environment** de tu aplicación Compose, agrega la variable para el puerto:
*   `PORT`: `80` (o el puerto interno que desees exponer al proxy reverso).

> [!NOTE]
> Por defecto, el archivo [docker-compose.yml](file:///c:/Projects/Personal/Programacion/ValidaCedulaRD/docker-compose.yml) está configurado para mapear el puerto desde la variable de entorno `${PORT:-8080}` hacia el puerto `80` del contenedor Nginx.

### 4. Configurar el Dominio y SSL
1. Dirígete a la pestaña **Domains** en Dokploy.
2. Añade tu dominio o subdominio personalizado (ejemplo: `cedula.tudominio.com`).
3. Apunta el puerto del dominio al puerto correspondiente (si usas Compose, Dokploy se encargará de enlazar el contenedor mediante Traefik).
4. Activa la opción de **SSL (HTTPS)** para generar un certificado Let's Encrypt de forma automática y gratuita.

---

## 💻 Ejecución Local

### Opción A: Con Docker Compose (Recomendado)

Asegúrate de tener instalados Docker y Docker Compose en tu máquina.

1.  Copia el archivo de ejemplo de variables de entorno:
    ```bash
    cp .env.example .env
    ```
2.  Levanta el contenedor:
    ```bash
    docker-compose up -d --build
    ```
3.  La aplicación estará lista para usarse en: [http://localhost:8080](http://localhost:8080).

### Opción B: Servidor Local de Node (npx)

Ideal para desarrollo rápido sin contenedores.

1.  Clona el repositorio e ingresa a la carpeta:
    ```bash
    git clone https://github.com/AlexanderPM11/ValidaCedulaRD.git
    cd ValidaCedulaRD
    ```
2.  Inicia un servidor estático rápido:
    ```bash
    npx serve .
    ```
3.  Abre la URL que te provea la consola (normalmente `http://localhost:3000`).

---

## 🛠️ Estructura del Proyecto

*   `[index.html](file:///c:/Projects/Personal/Programacion/ValidaCedulaRD/index.html)`: Estructura HTML semántica y metadatos SEO/PWA.
*   `[style.css](file:///c:/Projects/Personal/Programacion/ValidaCedulaRD/style.css)`: Estilos visuales en CSS nativo (Vanilla) con diseño responsive.
*   `[app.js](file:///c:/Projects/Personal/Programacion/ValidaCedulaRD/app.js)`: Lógica principal del algoritmo de Luhn e interacción con el DOM.
*   `[service-worker.js](file:///c:/Projects/Personal/Programacion/ValidaCedulaRD/service-worker.js)`: Cachea los recursos esenciales para habilitar el uso offline.
*   `[manifest.json](file:///c:/Projects/Personal/Programacion/ValidaCedulaRD/manifest.json)`: Metadatos para transformar la aplicación web en una PWA instalable.
*   `[Dockerfile](file:///c:/Projects/Personal/Programacion/ValidaCedulaRD/Dockerfile)`: Imagen mínima basada en Alpine Nginx para servir el sitio estático.

---

## 🧠 ¿Cómo funciona el Algoritmo?

La cédula dominicana de 11 dígitos se valida mediante el algoritmo de Luhn (Módulo 10):

1.  Se toman los primeros **10 dígitos**.
2.  Se multiplican alternadamente por **1 y 2**, de derecha a izquierda o de izquierda a derecha según el estándar JCE (empezando por 1 para el primer dígito, 2 para el segundo, etc.).
3.  Si el resultado de alguna multiplicación es de dos dígitos (ej: `6 x 2 = 12`), estos se suman entre sí (`1 + 2 = 3`).
4.  Se realiza la sumatoria de todos los números resultantes.
5.  Se calcula el residuo de la suma al dividir por 10 (`suma % 10`).
6.  El dígito verificador es la cantidad que falta para alcanzar la siguiente decena (es decir: `(10 - residuo) % 10`).
7.  Se compara este resultado con el **11vo dígito** de la cédula original. Si coinciden, la cédula es estructuralmente válida.

---

## ✒️ Autor y Licencia

Desarrollado con ❤️ por **[apolanco.com](https://apolanco.com)**.

Este proyecto se encuentra bajo la Licencia **MIT**. Consulta el archivo `LICENSE` para más detalles.
