# Read-only workspace view provenance

- Upstream repository: `https://github.com/usekaneo/kaneo.git`
- Source commit: `67e30f8f81e13c2d7123641cb199102b834a97a6`
- Root license: `LICENSE` at repository root, MIT, copyright 2024 Andrej Acevski.

The project navigation component is adapted from `apps/web/src/components/home/home-projects.tsx` (SHA-256 `A2B31DF7037E504A32518777C9D716CE35C2E6F0BD16C51CECE021DEB98FA4E4`). The board presentation is adapted from these pinned sources:

- `apps/web/src/components/kanban-board/index.tsx` (`FE82D243AC8BDAD4BFC8B7EC344DB025401837AE479C201F7D384CA09B6DA999`)
- `apps/web/src/components/kanban-board/column/index.tsx` (`70F30CBB90FC818C5321CCD09BAE94CD33CFB8C8D7B9EE756BCB45C55F3AD47D`)
- `apps/web/src/components/kanban-board/task-card/index.tsx` (`1E72BD7F6EF5E45407F8FC1C30070F6792A2A3FEF0E5DB25D25D3E58BA2A9F96`)
- `apps/web/src/components/kanban-board/task-card/task-card-content.tsx` (`4B06297E781B535A12670AEE23A9841ECFEF4C93DC2594D376A0E99BE7D7B205`)

These components keep the responsive project-card and Kanban presentation structure while replacing route/data hooks with props. The board is intentionally read-only: drag/drop, queries, stores, mutation hooks, provider calls, destructive actions, and context menus are not included. A caller may provide `onOpenTaskContext({projectId, taskId})`; without it, task cards are disabled. The Atlas session/adapter boundary and error policy stay in the Atlas application, outside this upstream component package.
