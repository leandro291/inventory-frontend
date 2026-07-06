# Sistema de Gestión de Inventarios - Frontend

Aplicación web para la gestión de inventarios, productos, categorías, empresas, repositorios, roles, proveedores y movimientos.

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
