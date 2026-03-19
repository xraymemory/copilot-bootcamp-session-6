# Implementation Plan: Overdue Todo Indicators

**Branch**: `001-overdue-todos` | **Date**: 2026-03-19 | **Spec**: `specs/001-overdue-todos/spec.md`
**Input**: Feature specification from `/specs/001-overdue-todos/spec.md`

## Summary

Add visual indicators for todos that are past their due date. The implementation is frontend-only: compute overdue status by comparing each todo's `dueDate` against today's local date, apply CSS styling (danger color, "Overdue" label) to overdue TodoCards, and display an overdue count in the App header. No backend changes needed — the API already provides `dueDate` and `completed` fields.

## Technical Context

**Language/Version**: JavaScript (ES6+), React 18, Node.js 16+  
**Primary Dependencies**: React, React DOM, Jest, React Testing Library, MSW (Mock Service Worker)  
**Storage**: SQLite via better-sqlite3 (backend, no changes needed)  
**Testing**: Jest + React Testing Library (frontend), Jest + supertest (backend, no changes needed)  
**Target Platform**: Web browser (desktop-focused)  
**Project Type**: Web application (monorepo with frontend + backend packages)  
**Performance Goals**: Overdue computation must be instantaneous (pure date comparison, no API calls)  
**Constraints**: No new dependencies; use existing theme CSS custom properties for styling  
**Scale/Scope**: 3 frontend files modified (App.js, TodoCard.js, TodoList.js), 3 test files updated, 1 CSS file updated

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Component-Based Architecture | PASS | Changes scoped to existing components (App, TodoList, TodoCard). No new components needed. Single responsibility maintained — overdue is a visual concern within existing card rendering. |
| II. Test-First Development | PASS | Tests will be written/updated for all overdue scenarios (overdue, not overdue, completed, no due date). |
| III. Code Quality and Simplicity | PASS | Simple date comparison utility. Uses existing CSS variables. No over-engineering. |
| IV. Consistent Design System | PASS | Uses existing danger color from theme. Follows 8px grid. Accessible color contrast maintained. |
| V. API-Driven Data Flow | PASS | No API changes. Overdue is a derived frontend state from existing `dueDate` field. |

## Project Structure

### Documentation (this feature)

```text
specs/001-overdue-todos/
├── spec.md              # Feature specification (completed)
├── plan.md              # This file
└── tasks.md             # Task breakdown (next step)
```

### Source Code (repository root)

```text
packages/
├── frontend/
│   └── src/
│       ├── App.js                          # MODIFY: Add overdue count display in header
│       ├── App.css                         # MODIFY: Add overdue-related CSS styles
│       ├── components/
│       │   ├── TodoCard.js                 # MODIFY: Add overdue CSS class and "Overdue" label
│       │   └── TodoList.js                 # MODIFY: Pass overdue status to TodoCard
│       └── __tests__/
│           └── App.test.js                 # MODIFY: Add overdue count tests
│       └── components/
│           └── __tests__/
│               ├── TodoCard.test.js        # MODIFY: Add overdue indicator tests
│               └── TodoList.test.js        # MODIFY: Add overdue propagation tests
└── backend/                                # NO CHANGES
```

**Structure Decision**: Follows the existing monorepo layout. All changes are within `packages/frontend/src/`. No new files or directories needed — only modifications to existing components, styles, and tests.

## Implementation Approach

### Phase 1: Overdue Utility Logic
Create a helper function `isOverdue(todo)` that returns `true` if `todo.dueDate` is before today and `todo.completed` is `false`. This is a pure function with no side effects, easily testable.

### Phase 2: TodoCard Visual Changes
Add an `overdue` CSS class to the TodoCard container when the todo is overdue. Display an "Overdue" text label next to the due date in danger color. Style uses existing `--color-danger` CSS custom property.

### Phase 3: TodoList Integration
In TodoList, compute overdue status for each todo and pass it as a prop to TodoCard. This keeps the overdue logic centralized and the TodoCard purely presentational.

### Phase 4: App Header Count
In App.js, compute the count of overdue todos from the todos state array. Display "{count} overdue" text near the header when count > 0, styled in danger color.

### Phase 5: Testing
Update existing test files to cover:
- TodoCard renders overdue styling when `isOverdue` prop is true
- TodoCard does NOT render overdue styling for completed, future, or no-date todos
- TodoList correctly identifies and passes overdue status
- App header shows overdue count when overdue todos exist
- App header hides overdue count when no overdue todos

## Complexity Tracking

No constitution violations. All changes follow existing patterns and use existing infrastructure.
