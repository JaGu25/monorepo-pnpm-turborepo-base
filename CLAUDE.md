# CLAUDE.md - Guía para Claude Code

## Proyecto

Monorepo enterprise con Clean Architecture: pnpm + Turborepo + NestJS + Next.js + MongoDB.

## Comandos Frecuentes

```bash
pnpm install      # Instalar dependencias
pnpm build        # Build completo
pnpm dev          # Desarrollo
pnpm db:start     # Iniciar MongoDB (Docker)
```

## Estructura del Proyecto

```
apps/
  api/            # NestJS (puerto 3001)
  web/            # Next.js (puerto 3000)
  admin/          # Next.js (puerto 3002)

packages/
  domain/         # Entidades e interfaces
  application/    # Use cases
  infrastructure/ # Mongoose repositories
  contracts/      # OpenAPI spec
  ui/             # Componentes React
  shared/         # Utilidades
```

## Reglas de Clean Architecture

1. `domain` NO depende de nada externo
2. `application` depende SOLO de `domain`
3. `infrastructure` implementa interfaces de `domain`
4. NestJS es adaptador de entrada (no lógica de negocio)
5. Mongoose SOLO en `infrastructure`
6. DTOs de Nest SOLO en `apps/api`
7. UI compartida NO accede a API ni dominio

## Convenciones de Código

- TypeScript estricto
- Sin comentarios en el código
- ESLint + Prettier configurados
- Imports ordenados alfabéticamente

## Arquitectura de la API

```
Controller → UseCase → Repository → MongoDB
```

- Controllers: solo orquestan, no lógica
- UseCases: lógica de negocio
- Repository: interfaz en domain, implementación en infrastructure

## Flujo de Datos Frontend

```
OpenAPI (contracts) → Orval → Generated Client → Next.js
```

Para regenerar clientes: `pnpm generate:api`

## Base de Datos

- MongoDB en Docker
- Esquemas en `packages/infrastructure`
- Mappers para convertir Document ↔ Entity

## Notas Importantes

- Build de packages antes de apps (Turborepo maneja orden)
- Los packages usan CommonJS para compatibilidad con NestJS
- Next.js apps tienen ESLint separado (.eslintrc.js)
