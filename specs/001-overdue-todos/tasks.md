# Tasks: Overdue Todo Indicators

**Input**: Design documents from `/specs/001-overdue-todos/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: No new project setup needed — this feature modifies existing files only. Proceed directly to user stories.

---

## Phase 2: User Story 1 - Visual Overdue Indicator on Todo Cards (Priority: P1)

**Goal**: Todo cards with past due dates display a visual overdue indicator (danger-colored due date, "Overdue" label, CSS class)

**Independent Test**: Create a todo with a past due date, verify the TodoCard renders with the `overdue` CSS class and "Overdue" text label

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T001 [P] [US1] Add overdue indicator test: TodoCard renders with `overdue` class and "Overdue" label when todo has past due date and is not completed — in `packages/frontend/src/components/__tests__/TodoCard.test.js`
- [ ] T002 [P] [US1] Add non-overdue test: TodoCard does NOT render overdue indicator when todo has future due date — in `packages/frontend/src/components/__tests__/TodoCard.test.js`
- [ ] T003 [P] [US1] Add no-date test: TodoCard does NOT render overdue indicator when todo has no due date — in `packages/frontend/src/components/__tests__/TodoCard.test.js`
- [ ] T004 [P] [US1] Add today-date test: TodoCard does NOT render overdue indicator when todo due date is today — in `packages/frontend/src/components/__tests__/TodoCard.test.js`

### Implementation for User Story 1

- [ ] T005 [P] [US1] Add `.overdue` CSS styles to `packages/frontend/src/App.css` — danger-colored border/text using existing CSS custom properties
- [ ] T006 [US1] Modify `packages/frontend/src/components/TodoList.js` — compute overdue status for each todo and pass `isOverdue` prop to TodoCard
- [ ] T007 [US1] Modify `packages/frontend/src/components/TodoCard.js` — accept `isOverdue` prop, apply `overdue` CSS class, display "Overdue" label next to due date

**Checkpoint**: At this point, individual todo cards should visually indicate overdue status. Verify by running `npm test --workspace=packages/frontend`.

---

## Phase 3: User Story 2 - Completed Todos Do Not Show Overdue (Priority: P2)

**Goal**: Completed todos never display the overdue indicator even if their due date has passed

**Independent Test**: Create a completed todo with a past due date, verify no overdue indicator is shown

### Tests for User Story 2

- [ ] T008 [P] [US2] Add completed-todo test: TodoCard does NOT render overdue indicator when todo is completed with past due date — in `packages/frontend/src/components/__tests__/TodoCard.test.js`
- [ ] T009 [P] [US2] Add toggle test in TodoList: unchecking a completed overdue todo should show the overdue indicator — in `packages/frontend/src/components/__tests__/TodoList.test.js`

### Implementation for User Story 2

- [ ] T010 [US2] Verify overdue logic in TodoList.js excludes completed todos (`todo.completed === false && dueDate < today`) — this should already be handled by the `isOverdue` computation from Phase 2

**Checkpoint**: Completed todos with past due dates should NOT show overdue. Verify with tests.

---

## Phase 4: User Story 3 - Overdue Count in App Header (Priority: P3)

**Goal**: App header displays a count of overdue todos for at-a-glance awareness

**Independent Test**: Create multiple overdue todos, verify the header shows the correct count

### Tests for User Story 3

- [ ] T011 [P] [US3] Add overdue count test: App renders "{count} overdue" text in header when overdue todos exist — in `packages/frontend/src/__tests__/App.test.js`
- [ ] T012 [P] [US3] Add zero-overdue test: App does NOT render overdue count when no overdue todos — in `packages/frontend/src/__tests__/App.test.js`

### Implementation for User Story 3

- [ ] T013 [US3] Modify `packages/frontend/src/App.js` — compute overdue count from todos state, display "{count} overdue" text near header when count > 0, styled with danger color
- [ ] T014 [P] [US3] Add overdue count CSS styles to `packages/frontend/src/App.css` — styling for the overdue count text

**Checkpoint**: App header shows overdue count. All three user stories are now functional.

---

## Phase 5: Polish & Validation

**Purpose**: Final validation and cleanup

- [ ] T015 Run full test suite: `npm test` from project root — ensure all existing and new tests pass
- [ ] T016 Verify "overdue" text appears (case-insensitive) in all three required files: `App.js`, `TodoCard.js`, `TodoList.js`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 2 (US1)**: No dependencies — can start immediately (no setup phase needed)
- **Phase 3 (US2)**: Depends on Phase 2 (US1) overdue logic being in place
- **Phase 4 (US3)**: Can run in parallel with Phase 3 (different files: App.js vs TodoCard/TodoList)
- **Phase 5 (Polish)**: Depends on all user stories being complete

### Parallel Opportunities

- T001-T004 (US1 tests) can all run in parallel
- T005 (CSS) can run in parallel with T006/T007 (component changes)
- T008-T009 (US2 tests) can run in parallel
- T011-T012 (US3 tests) can run in parallel
- Phase 3 and Phase 4 can run in parallel (different files)

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Write TodoCard overdue tests (T001-T004) — verify they fail
2. Add CSS styles (T005) and component logic (T006, T007)
3. **STOP and VALIDATE**: Run tests, verify overdue indicators work

### Incremental Delivery

1. US1: Overdue visual indicators on cards → Test → Validate
2. US2: Confirm completed todos excluded → Test → Validate
3. US3: Add header count → Test → Validate
4. Final: Run full test suite, verify all pass

---

## Notes

- All changes are frontend-only — no backend modifications needed
- The word "overdue" must appear in App.js, TodoCard.js, and TodoList.js (validation requirement)
- Use existing CSS custom properties (`--color-danger`) for consistent theming
- Overdue = `dueDate < today && completed === false` (strictly before today, using local date)
