<h1 align="center">Inventory</h1>
<p align="center">Panel de gestión de inventarios multi-empresa: stock, categorías, proveedores y movimientos.</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Zustand-433E38?style=for-the-badge&logo=react&logoColor=white" alt="Zustand">
</p>

<p align="center">
  <a href="https://inventory-frontend-mu-fawn.vercel.app"><img src="https://img.shields.io/badge/Ver_demo-2F81F7?style=for-the-badge&logo=vercel&logoColor=white" alt="Ver demo"></a>
  <a href="https://github.com/leandro291/inventory_backend"><img src="https://img.shields.io/badge/Backend-000000?style=for-the-badge&logo=flask&logoColor=white" alt="Backend"></a>
</p>

## Tecnologías

- **React 19** con Vite
- **Tailwind CSS v4**
- **React Router v8**
- **Zustand** (manejo de estado)
- **Axios** (peticiones HTTP)
- **Oxlint** (linting)

## Scripts

```bash
npm run dev      # Iniciar servidor de desarrollo
npm run build    # Construir para producción
npm run preview  # Previsualizar build
npm run lint     # Ejecutar linter
```

## Estructura

```
src/
├── app/             # Módulos de la aplicación
│   ├── auth/        # Autenticación (login/register)
│   ├── products/    # Productos
│   ├── categories/  # Categorías
│   ├── inventory/   # Inventario
│   ├── companies/   # Empresas
│   ├── repositories/# Repositorios
│   ├── roles/       # Roles
│   ├── suppliers/   # Proveedores
│   └── movements/   # Movimientos
├── common/          # Componentes, layouts y constantes compartidas
├── features/pages/  # Stores y componentes específicos
└── router/          # Configuración de rutas
```

## Variables de entorno

| Variable       | Descripción                     |
|----------------|---------------------------------|
| `VITE_API_URL` | URL base de la API (backend)    |

## Despliegue

Configurado para Vercel con rewrites SPA.
