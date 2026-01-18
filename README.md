# Enterprise Monorepo - Notes CRUD

Enterprise monorepo with Clean Architecture using pnpm workspaces + Turborepo.

## Stack

- **Monorepo:** pnpm workspaces + Turborepo
- **Backend:** NestJS 11 + Swagger
- **Frontend:** Next.js 16 (App Router)
- **UI:** React 19
- **Database:** MongoDB + Mongoose
- **API Client:** Orval
- **Language:** TypeScript
- **Linting:** ESLint + Prettier

## Structure

```
apps/
  api/            # NestJS API (port 3001)
  web/            # Next.js basic CRUD (port 3000)
  admin/          # Next.js full CRUD (port 3002)

packages/
  domain/         # Entities and interfaces (no dependencies)
  application/    # Use cases
  infrastructure/ # Implementations (Mongoose)
  contracts/      # OpenAPI spec
  ui/             # Shared React components
  shared/         # Shared utilities
```

## Requirements

- Node.js >= 20
- pnpm >= 9
- Docker (for MongoDB)

## Installation

```bash
pnpm install
```

## Development

```bash
# Start MongoDB
pnpm db:start

# Start all services
pnpm dev
```

## URLs

| Service | URL |
|---------|-----|
| API | http://localhost:3001 |
| Swagger | http://localhost:3001/api |
| Web | http://localhost:3000 |
| Admin | http://localhost:3002 |

## Scripts

```bash
pnpm dev          # Development
pnpm build        # Production build
pnpm lint         # Linting
pnpm lint:fix     # Fix linting
pnpm format       # Format code
pnpm format:check # Check formatting
pnpm check        # Lint + format check
pnpm generate:api # Regenerate API clients (Orval)
pnpm db:start     # Start MongoDB
pnpm db:stop      # Stop MongoDB
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

### Rules

- `domain` has no external dependencies
- `application` depends only on `domain`
- `infrastructure` implements `domain` interfaces
- NestJS is just an entry adapter
- Mongoose lives only in `infrastructure`
- Shared UI has no API or domain dependencies

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | /notes | Create note |
| GET | /notes | List notes |
| GET | /notes/:id | Get note |
| PUT | /notes/:id | Update note |
| DELETE | /notes/:id | Delete note |

## Note Entity

```typescript
{
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
```
