# CLAUDE.md - Guidelines for Claude Code

## Critical Rules

**NEVER add comments in generated code.** Code must be clean, direct, and comment-free.

## Project

Enterprise monorepo with Clean Architecture: pnpm + Turborepo + NestJS 11 + Next.js 16 + React 19 + MongoDB.

## Common Commands

```bash
pnpm install      # Install dependencies
pnpm build        # Full build
pnpm dev          # Development
pnpm db:start     # Start MongoDB (Docker)
```

## Project Structure

```
apps/
  api/            # NestJS (port 3001)
  web/            # Next.js (port 3000)
  admin/          # Next.js (port 3002)

packages/
  domain/         # Entities and interfaces
  application/    # Use cases
  infrastructure/ # Mongoose repositories
  contracts/      # OpenAPI spec
  ui/             # React components
  shared/         # Utilities
```

## Clean Architecture Rules

1. `domain` has NO external dependencies
2. `application` depends ONLY on `domain`
3. `infrastructure` implements `domain` interfaces
4. NestJS is an entry adapter (no business logic)
5. Mongoose ONLY in `infrastructure`
6. Nest DTOs ONLY in `apps/api`
7. Shared UI does NOT access API or domain

## Code Conventions

- Strict TypeScript
- **No comments in code** (this is mandatory)
- ESLint + Prettier configured
- Imports sorted alphabetically
- Clean, self-documenting code

## API Architecture

```
Controller → UseCase → Repository → MongoDB
```

- Controllers: orchestration only, no logic
- UseCases: business logic
- Repository: interface in domain, implementation in infrastructure

## Frontend Data Flow

```
OpenAPI (contracts) → Orval → Generated Client → Next.js
```

To regenerate clients: `pnpm generate:api`

## Database

- MongoDB in Docker
- Schemas in `packages/infrastructure`
- Mappers to convert Document ↔ Entity

## Important Notes

- Packages build before apps (Turborepo handles order)
- Packages use CommonJS for NestJS compatibility
- Next.js apps have separate ESLint config (.eslintrc.js)
