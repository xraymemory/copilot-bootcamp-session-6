# Todo App Constitution

## Core Principles

### I. Component-Based Architecture
The application follows a monorepo structure with clear separation between frontend (React) and backend (Express.js). Each component, service, and module has a single responsibility. UI components are reusable and self-contained. The frontend communicates with the backend exclusively through a defined REST API layer.

### II. Test-First Development
Testing is integral to the development workflow. Target 80%+ code coverage across all packages. Write tests that verify behavior, not implementation details. Follow the Arrange-Act-Assert pattern. Use Jest with React Testing Library for frontend tests and supertest for backend tests. Tests must pass before any code is merged.

### III. Code Quality and Simplicity
Follow DRY, KISS, and SOLID principles. Extract common code into shared utilities. Prefer simple, readable implementations over clever ones. Use camelCase for variables/functions, PascalCase for components/classes, and UPPER_SNAKE_CASE for constants. No unused variables, no console.log in production code, and meaningful error handling throughout.

### IV. Consistent Design System
Follow the Material Design-inspired Halloween theme with an 8px grid spacing system. Support both light and dark modes using CSS custom properties. Use the defined color palette (orange primary, purple accent) consistently. All interactive elements must be keyboard accessible and meet WCAG AA contrast standards.

### V. API-Driven Data Flow
The backend provides a RESTful API with full CRUD operations backed by SQLite. The frontend consumes this API through a dedicated service layer (todoService). All data modifications flow through the API — no direct database access from the frontend. Error states are handled gracefully with user-facing feedback.

## Technology Standards

- **Frontend**: React with functional components and hooks, CSS for styling (no CSS-in-JS), Jest + React Testing Library + MSW for testing
- **Backend**: Node.js with Express.js, SQLite (better-sqlite3) for persistence, Jest + supertest for testing
- **Tooling**: npm workspaces for monorepo management, ESLint for linting, 2-space indentation, LF line endings
- **Dependencies**: Minimize external dependencies; use built-in browser/Node APIs where possible

## Development Workflow

- Use feature branches for all new work (e.g., `feature/`, `001-`)
- Write atomic commits with clear messages explaining the "why"
- All code must pass linting and tests before merging
- Use pull requests for code review
- Follow the established file organization: components in `components/`, services in `services/`, tests colocated in `__tests__/` directories

## Governance

This constitution defines the foundational principles for all development on the Todo App. All contributions must comply with these principles. Changes to the constitution require team discussion and documented rationale.

**Version**: 1.0.0 | **Ratified**: 2026-03-19 | **Last Amended**: 2026-03-19
