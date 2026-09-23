# Development Rules & AI Guidelines

## General Code Standards
1. **TypeScript Strict Mode**: Always define explicit interface types for state, props, and service API responses. Avoid `any`.
2. **Component Separation**: Keep business logic, ATS scoring algorithms, and API calls inside `src/services/`. View components in `src/components/` must remain pure presentational components.
3. **No Code Duplication**: Reuse existing utility functions and UI primitives from `src/components/ui/`.
4. **Immutability**: Never mutate state variables directly. Use immutable React updates.

## UI & Styling Rules
1. **Design Token Adherence**: Follow colors and typography specified in `docs/DESIGN.md`.
2. **Responsive Design**: All new screens or modals must be tested at mobile (375px), tablet (768px), and desktop (1440px) breakpoints.
3. **UX Feedback**: Provide loading indicators or pulse skeletons during async operations, toast error notifications for failed API calls, and empty states when arrays are empty.

## Git & Commits
1. Make atomic, small commits.
2. Use conventional commit formatting: `feat:`, `fix:`, `docs:`, `refactor:`, `style:`.
