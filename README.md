# Monorepo Enterprise - Notes CRUD

Monorepo enterprise con Clean Architecture usando pnpm workspaces + Turborepo.

## Stack

- **Monorepo:** pnpm workspaces + Turborepo
- **Backend:** NestJS + Swagger
- **Frontend:** Next.js 15 (App Router)
- **Database:** MongoDB + Mongoose
- **API Client:** Orval
- **Language:** TypeScript
- **Linting:** ESLint + Prettier

## Estructura

```
apps/
  api/            # NestJS API (puerto 3001)
  web/            # Next.js CRUD básico (puerto 3000)
  admin/          # Next.js CRUD completo (puerto 3002)

packages/
  domain/         # Entidades e interfaces (sin dependencias)
  application/    # Casos de uso
  infrastructure/ # Implementaciones (Mongoose)
  contracts/      # OpenAPI spec
  ui/             # Componentes React compartidos
  shared/         # Utilidades compartidas
```

## Requisitos

- Node.js >= 20
- pnpm >= 9
- Docker (para MongoDB)

## Instalación

```bash
pnpm install
```

## Desarrollo

```bash
# Iniciar MongoDB
pnpm db:start

# Iniciar todos los servicios
pnpm dev
```

## URLs

| Servicio | URL |
|----------|-----|
| API | http://localhost:3001 |
| Swagger | http://localhost:3001/api |
| Web | http://localhost:3000 |
| Admin | http://localhost:3002 |

## Scripts

```bash
pnpm dev          # Desarrollo
pnpm build        # Build producción
pnpm lint         # Linting
pnpm lint:fix     # Fix linting
pnpm format       # Formatear código
pnpm format:check # Verificar formato
pnpm check        # Lint + format check
pnpm generate:api # Regenerar clientes API (Orval)
pnpm db:start     # Iniciar MongoDB
pnpm db:stop      # Detener MongoDB
```

## Clean Architecture

```
Request → Controller → UseCase → Repository → MongoDB
                ↓
             OpenAPI
                ↓
              Orval
                ↓
          Next.js (web/admin)
```

### Reglas

- `domain` no depende de nada
- `application` depende solo de `domain`
- `infrastructure` implementa interfaces del `domain`
- NestJS es solo un adaptador de entrada
- Mongoose vive solo en `infrastructure`
- UI compartida no depende de API ni dominio

## API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /notes | Crear nota |
| GET | /notes | Listar notas |
| GET | /notes/:id | Obtener nota |
| PUT | /notes/:id | Actualizar nota |
| DELETE | /notes/:id | Eliminar nota |

## Entidad Note

```typescript
{
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
```
