# Consultorio Dra. Edith Henker — Frontend

## Descripción General

Aplicación web frontend desarrollada en Angular para el Consultorio Odontológico de la Dra. Edith Henker. Permite a los pacientes conocer el consultorio y sus servicios odontológicos, registrarse e iniciar sesión, y agendar citas reales conectadas al backend. El frontend consume una API REST (Node.js + Express + MongoDB) que gestiona usuarios, servicios y citas.

Este proyecto corresponde al Módulo 3 (Frontend en Angular) del bootcamp BIT (Build, Innovate, Transform), y se conecta con el backend desarrollado en el Módulo 2: [Backend del Consultorio](https://github.com/DanielHenker/Backend).

Funcionalidades principales:

- Navegación entre las secciones del sitio mediante un menú principal (Inicio, Sobre Nosotros, Servicios, Agendar Cita, Gestionar Servicios, Iniciar Sesión, Registrarse).
- Página "Sobre Nosotros" con la misión, visión, valores y horario de atención del consultorio.
- Listado de servicios odontológicos consumidos desde el backend.
- Registro e inicio de sesión de usuarios, con autenticación mediante JWT.
- Agendamiento de citas real: el usuario autenticado elige un servicio y una fecha/hora, la cita se crea en el backend y queda asociada a su cuenta; puede ver y cancelar sus propias citas.
- Panel de administración de servicios (crear y eliminar servicios odontológicos).
- Diseño de las páginas con HTML, CSS propio y Bootstrap.
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
- El backend del proyecto corriendo (ver [repositorio del backend](https://github.com/DanielHenker/Backend)) para que las secciones de servicios, registro, inicio de sesión y agendamiento de citas funcionen correctamente.

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

🚧 **En desarrollo.** Entrega 2 completada: páginas estáticas diseñadas con HTML, CSS y Bootstrap (incluyendo la nueva página "Sobre Nosotros"), interfaces y environments configurados, y servicios CRUD completos para los tres modelos principales (usuarios, servicios y citas), incluyendo el agendamiento real de citas conectado al backend. Pendiente para próximas entregas: protección de rutas por rol (por ejemplo, restringir el panel de administración de servicios solo a personal autorizado).