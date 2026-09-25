# Consultorio Dra. Edith Henker — Frontend

## Descripción General

Aplicación web frontend desarrollada en Angular para el Consultorio Odontológico de la Dra. Edith Henker. Permite a los pacientes conocer el consultorio y sus servicios odontológicos, registrarse e iniciar sesión, y agendar citas reales conectadas al backend. El frontend consume una API REST (Node.js + Express + MongoDB) que gestiona usuarios, servicios y citas, con control de acceso por roles entre pacientes y administradores.

Este proyecto corresponde al Módulo 3 (Frontend en Angular) del bootcamp BIT (Build, Innovate, Transform), y se conecta con el backend desarrollado en el Módulo 2: [Backend del Consultorio](https://github.com/DanielHenker/Backend).

Funcionalidades principales:

- Navegación entre las secciones del sitio mediante un menú principal, con menú tipo hamburguesa en dispositivos móviles para una navegación cómoda en pantallas pequeñas.
- Página "Sobre Nosotros" con la misión, visión, valores y horario de atención del consultorio.
- Página de Inicio con una galería de fotos del consultorio (carrusel automático) y secciones propias sobre las especialidades y el proceso de agendamiento.
- Listado de servicios odontológicos consumidos desde el backend.
- Registro (con nombre, correo, contraseña y teléfono de contacto obligatorio, para que el consultorio pueda confirmar citas por llamada) e inicio de sesión de usuarios, con autenticación mediante JWT y notificaciones mediante SweetAlert2.
- Agendamiento de citas real: el usuario autenticado elige un servicio y una fecha/hora, la cita se crea en el backend y queda asociada a su cuenta; puede ver y cancelar sus propias citas.
- **Control de acceso por roles**: las secciones de administración (gestión de servicios y pacientes) están protegidas mediante un guard de ruta y solo son visibles y accesibles para usuarios con rol de administrador; la protección real se aplica también del lado del backend.
- Panel de administración de servicios (crear, editar y eliminar servicios odontológicos).
- Panel de administración de pacientes: listado con nombre, correo y teléfono de cada paciente registrado.
- Confirmación antes de cerrar sesión, para evitar cierres accidentales.
- Identidad visual propia: paleta de colores, logo y favicon basados en la marca real del consultorio.
- Diseño responsivo de las páginas con HTML, CSS propio y Bootstrap.
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

## Estructura del proyecto

```
proyecto_Front/
├── angular.json
├── package.json
├── public/
│   ├── favicon.ico
│   ├── logo-henker.png
│   └── gallery/                # fotos del carrusel de Inicio
└── src/
    └── app/
        ├── app.config.ts       # registro del interceptor de autenticación
        ├── app.routes.ts       # rutas, incluyendo las protegidas con adminGuard
        ├── components/
        │   └── navbar/         # menú de navegación, con versión hamburguesa en móvil
        ├── guards/
        │   └── admin.guard.ts  # bloquea rutas de administración a quien no sea admin
        ├── interceptors/
        │   └── auth.interceptor.ts  # agrega el token JWT a cada petición
        ├── interfaces/
        ├── services/
        │   ├── login.ts        # login, token, y detección del rol del usuario
        │   ├── products.ts
        │   └── users.ts
        └── pages/
            ├── home/           # Inicio: galería de fotos y contenido propio
            ├── about-us/       # Sobre Nosotros
            ├── services/       # Listado de servicios
            ├── citas/          # Agendamiento de citas
            ├── forms/          # Iniciar sesión
            ├── register/       # Registro (incluye teléfono obligatorio)
            ├── products/       # Administración de servicios (solo admin)
            ├── patients/       # Administración de pacientes (solo admin)
            └── not-found/      # Página 404
```

## Estado del Proyecto

🚧 **En desarrollo.** Entrega actual: sitio completo con páginas estáticas y dinámicas (Inicio con galería, Sobre Nosotros, Servicios, Agendar Cita), autenticación con JWT, agendamiento real de citas conectado al backend, y **control de acceso por roles** ya implementado (guard de ruta en el frontend + validación de rol directamente en el backend), con paneles de administración de servicios y pacientes. Incluye además identidad visual propia (logo, paleta de colores y favicon del consultorio real) y un menú de navegación responsivo para dispositivos móviles.
