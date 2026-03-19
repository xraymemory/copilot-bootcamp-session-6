# Feature Specification: Overdue Todo Indicators

**Feature Branch**: `001-overdue-todos`  
**Created**: 2026-03-19  
**Status**: Draft  
**Input**: User description: "Add visual indicators for todos that are past their due date so users can quickly identify overdue items"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visual Overdue Indicator on Todo Cards (Priority: P1)

As a user, I want to see a clear visual indicator on any todo item whose due date has passed so that I can quickly identify which tasks are overdue and need immediate attention.

**Why this priority**: This is the core feature — without visual differentiation of overdue items, the feature has no value. Users need to instantly see which todos are past due.

**Independent Test**: Can be fully tested by creating a todo with a past due date and verifying that the TodoCard renders with overdue styling (red/danger color border or text), delivering immediate visual feedback.

**Acceptance Scenarios**:

1. **Given** a todo exists with a due date in the past and is not completed, **When** the todo list is displayed, **Then** the todo card shows a visual overdue indicator (e.g., red border, overdue badge, or danger-colored due date text).
2. **Given** a todo exists with a due date in the future, **When** the todo list is displayed, **Then** the todo card does NOT show an overdue indicator.
3. **Given** a todo exists with no due date, **When** the todo list is displayed, **Then** the todo card does NOT show an overdue indicator.
4. **Given** a todo exists with today's date as the due date, **When** the todo list is displayed, **Then** the todo card does NOT show an overdue indicator (only strictly past dates are overdue).

---

### User Story 2 - Completed Todos Do Not Show Overdue (Priority: P2)

As a user, I want completed todos to NOT show overdue indicators even if their due date has passed, so that I am not distracted by tasks I have already finished.

**Why this priority**: Important for usability — showing overdue on completed items would create visual noise and confusion, undermining the value of the overdue indicator.

**Independent Test**: Can be tested by creating a completed todo with a past due date and verifying it does not display overdue styling.

**Acceptance Scenarios**:

1. **Given** a todo is marked as completed and has a due date in the past, **When** the todo list is displayed, **Then** the todo card does NOT show an overdue indicator.
2. **Given** a todo is marked as completed and has a due date in the past, **When** the user unchecks (marks incomplete) the todo, **Then** the overdue indicator appears.

---

### User Story 3 - Overdue Count in App Header (Priority: P3)

As a user, I want to see a count of overdue todos in the app header area so that I have a quick summary of how many tasks need urgent attention.

**Why this priority**: Nice-to-have enhancement that provides at-a-glance awareness without scanning the full list. Lower priority because the per-card indicators (P1) already convey overdue status.

**Independent Test**: Can be tested by creating multiple todos with past due dates and verifying the header displays the correct overdue count.

**Acceptance Scenarios**:

1. **Given** there are 3 incomplete todos with past due dates, **When** the app loads, **Then** the header area displays "3 overdue" (or similar text).
2. **Given** there are no overdue todos, **When** the app loads, **Then** no overdue count is displayed in the header.

---

### Edge Cases

- What happens when a todo's due date is exactly midnight of the current day? It should NOT be considered overdue (only strictly before today).
- How does the system handle timezone differences? Use the browser's local date for comparison.
- What happens when a todo's due date is edited from past to future? The overdue indicator should be removed immediately upon re-render.
- What happens when the user's system clock changes (e.g., crossing midnight)? The indicators update on next render/interaction but do not need real-time polling.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST visually distinguish overdue todos (incomplete todos with due dates strictly before today) from non-overdue todos in the TodoCard component.
- **FR-002**: System MUST NOT show overdue indicators on completed todos regardless of due date.
- **FR-003**: System MUST NOT show overdue indicators on todos without a due date.
- **FR-004**: System MUST NOT show overdue indicators on todos whose due date is today or in the future.
- **FR-005**: The overdue visual indicator MUST use the existing danger color from the theme (red) to maintain design consistency.
- **FR-006**: System MUST display an overdue count summary in the App header when there are overdue todos.
- **FR-007**: The overdue determination logic MUST be computed on the frontend using the browser's local date, with no backend changes required.
- **FR-008**: The TodoList component MUST pass overdue status information to TodoCard components.

### Key Entities

- **Todo**: Existing entity with `id`, `title`, `dueDate`, `completed`, `createdAt` fields. The `dueDate` field (ISO date string or null) is used to determine overdue status.
- **Overdue Status**: A derived/computed property — a todo is overdue if `dueDate < today AND completed === false`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can identify overdue todos within 1 second of viewing the todo list (visual indicator is immediately apparent).
- **SC-002**: 100% of incomplete todos with past due dates display the overdue indicator.
- **SC-003**: 0% of completed todos or todos without due dates display the overdue indicator.
- **SC-004**: All existing tests continue to pass after implementation (no regressions).
- **SC-005**: New tests cover overdue indicator rendering for overdue, non-overdue, completed, and no-due-date scenarios.

## Clarifications

The following clarifications were identified during spec review and have been resolved:

### C1: What constitutes "overdue"?
**Question**: Should a todo due today be considered overdue?  
**Resolution**: No. A todo is only overdue if its due date is strictly before today (i.e., `dueDate < today`). A todo due today is still "on time." This uses date-only comparison, ignoring time of day.

### C2: How should overdue be determined across timezones?
**Question**: Should overdue comparison use UTC or local time?  
**Resolution**: Use the browser's local date (`new Date()` with date-only comparison). Since this is a single-user app, the user's local timezone is the correct reference. No server-side overdue computation is needed.

### C3: What visual indicator should be used for overdue?
**Question**: Should it be a badge, border color, text color, icon, or combination?  
**Resolution**: Use a combination approach consistent with the existing design system:
- Add a CSS class `overdue` to the TodoCard container for overdue items
- Display the due date text in the danger color (red from theme)
- Add a small "Overdue" text label next to the due date
- This approach uses existing theme colors and does not require new icons or assets

### C4: Should the backend be modified?
**Question**: Does the backend need an `isOverdue` field or endpoint?  
**Resolution**: No. Overdue is a purely frontend-computed derived state. The backend already provides `dueDate` and `completed` fields, which is sufficient. No backend changes are needed.

### C5: Should overdue indicators update in real-time at midnight?
**Question**: If a user leaves the app open past midnight, should indicators update automatically?  
**Resolution**: No. Indicators are computed on render. They will update on the next user interaction that triggers a re-render (e.g., adding a todo, toggling completion, refreshing the page). Real-time polling or timers are out of scope.

### C6: Where does the overdue count appear in the App?
**Question**: What exactly should the overdue summary in the header look like?  
**Resolution**: Display a simple text like "X overdue" near the app title in a danger/red color. Only show it when there is at least one overdue todo. This is handled in App.js alongside the existing header elements.
