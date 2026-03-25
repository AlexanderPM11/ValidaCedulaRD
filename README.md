# Validador de Cédula RD 🇩🇴

Una Aplicación Web Progresiva (PWA) e-ficiente, segura y moderna para validar números de cédula de la República Dominicana.

![Licencia](https://img.shields.io/badge/license-MIT-blue.svg)
![PWA](https://img.shields.io/badge/PWA-Ready-orange.svg)
![Offline](https://img.shields.io/badge/Offline-Support-green.svg)

## ✨ Características

-   **Validación en Tiempo Real**: Comprueba la validez de una cédula mientras escribes.
-   **Algoritmo Oficial**: Implementa el algoritmo de Luhn (Módulo 10) específico para la JCE.
-   **Soporte PWA**: Instálalo en tu móvil o escritorio como una aplicación nativa.
-   **Funcionamiento Offline**: Una vez cargado, funciona sin necesidad de internet.
-   **Privacidad Total**: Todo el procesamiento ocurre localmente en tu navegador. Los datos nunca salen de tu dispositivo.
-   **Desglose del Cálculo**: Visualiza paso a paso cómo se obtiene el dígito verificador.
-   **Historial Local**: Acceso rápido a las últimas 5 verificaciones realizadas.
-   **Diseño Premium**: Interfaz minimalista con soporte automático para modo oscuro.

## 🚀 Cómo Empezar

### Requisitos
Solo necesitas un navegador web moderno (Chrome, Edge, Safari, Firefox).

### Ejecución Local
Para disfrutar de todas las funciones de PWA (instalación y caché), se recomienda usar un servidor local:

1.  Clona el repositorio:
    ```bash
    git clone https://github.com/AlexanderPM11/ValidaCedulaRD.git
    ```
2.  Entra en la carpeta:
    ```bash
    cd ValidaCedulaRD
    ```
3.  Inicia un servidor (ejemplo con `serve`):
    ```bash
    npx serve .
    ```
4.  Abre `http://localhost:3000` en tu navegador.

### Despliegue con Docker (VPS)
Si deseas desplegarlo en tu propio servidor usando Docker:

1.  Construye e inicia el contenedor:
    ```bash
    docker-compose up -d
    ```
2.  La app estará disponible en el puerto `8080`.

## 🛠️ Tecnologías

-   **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (ES6+).
-   **PWA**: Web App Manifest, Service Workers.
-   **UI/UX**: SweetAlert2 para diálogos y notificaciones premium.

## 🧠 El Algoritmo
El sistema utiliza el método de validación oficial:
1.  Multiplica los primeros 10 dígitos alternadamente por 1 y 2.
2.  Si un resultado es > 9, suma sus dígitos.
3.  Suma todos los resultados finales.
4.  El dígito verificador es la diferencia entre esa suma y el siguiente múltiplo de 10.

## ✒️ Autor
Desarrollado con ❤️ por **[apolanco.com](https://apolanco.com)**.

## 📄 Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
