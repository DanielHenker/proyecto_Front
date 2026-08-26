# Consultorio Dra. Edith Henker — Frontend

## Descripción General

Aplicación web frontend desarrollada en Angular para el Consultorio Odontológico de la Dra. Edith Henker. Permite a los pacientes conocer los servicios odontológicos ofrecidos, registrarse e iniciar sesión, y agendar citas con la doctora. El frontend consume una API REST (Node.js + Express + MongoDB) que gestiona usuarios, servicios y citas.

Este proyecto corresponde al Módulo 3 (Frontend en Angular) del bootcamp BIT (Build, Innovate, Transform), y se conecta con el backend desarrollado en el Módulo 2: [Backend del Consultorio](https://github.com/DanielHenker/Backend).

Funcionalidades principales:

- Navegación entre las secciones del sitio mediante un menú principal (Inicio, Servicios, Agendar Cita, Iniciar Sesión, Registrarse).
- Listado de servicios odontológicos consumidos desde el backend.
- Registro e inicio de sesión de usuarios, con autenticación mediante JWT.
- Formulario para agendar citas (en desarrollo: actualmente es una interfaz funcional, pendiente de conexión completa con el backend).
- Página de error 404 para rutas no encontradas.

## Autores

- **Daniel Henker** — Desarrollo del frontend.

## Requisitos Previos

- [Node.js](https://nodejs.org/) versión 22.22.3 o superior (o 24.15+/26+).
- npm (incluido con Node.js).
- [Angular CLI](https://angular.dev/tools/cli) instalado globalmente:
  ```
  npm install -g @angular/cli
  ```
- El backend del proyecto corriendo (ver [repositorio del backend](https://github.com/DanielHenker/Backend)) para que las secciones de servicios, registro e inicio de sesión funcionen correctamente.

## Instrucciones de Instalación y Ejecución

1. Clonar el repositorio:
   ```
   git clone https://github.com/DanielHenker/proyecto_Front.git
   cd proyecto_Front
   ```
2. Instalar las dependencias:
   ```
   npm install
   ```
3. Verificar que el backend esté corriendo (por defecto en `http://localhost:3000`, configurable en `src/environments/environment.development.ts`).
4. Levantar el servidor de desarrollo:
   ```
   ng serve
   ```
5. Abrir el navegador en `http://localhost:4200/`.

## Estado del Proyecto

🚧 **En desarrollo.** Entrega 1 (estructura del proyecto, componentes de página y sistema de rutas y navegación) completada. Pendiente para próximas entregas: conectar el formulario de Agendar Cita con el endpoint de citas del backend, y ampliar la gestión de usuarios (edición/eliminación) desde la interfaz.
