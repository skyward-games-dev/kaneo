/**
 * Read-only extraction of Kaneo 67e30f8's `KanbanBoard`, `Column`, and
 * `TaskCardContent` layout. It preserves the upstream board/column/card class
 * structure while omitting drag, archive, delete, query, and provider actions.
 * See the adjacent MIT LICENSE and PROVENANCE.md before redistributing.
 */
function TaskCard({ task, projectId, onOpenTaskContext }) {
  const open = () => onOpenTaskContext?.({ projectId, taskId: task.id });

  return (
    <button
      type="button"
      data-task-id={task.id}
      aria-label={`Open task ${task.title}`}
      disabled={!onOpenTaskContext}
      onClick={open}
      className="group relative flex w-full flex-col rounded-[10px] border border-board-card-border bg-board-card p-3 text-left shadow-board-card transition-[background-color,border-color,box-shadow,scale] duration-150 ease-out hover:border-board-card-border-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-default disabled:opacity-90"
    >
      <span className="line-clamp-3 break-words font-medium text-[13px] text-board-title leading-[18px]">
        {task.title}
      </span>
      {typeof task.priority === 'string' && task.priority !== 'no-priority' ? (
        <span className="mt-2.5 w-fit rounded-md border border-border px-1.5 py-0.5 text-muted-foreground text-[11px] capitalize">
          {task.priority}
        </span>
      ) : null}
    </button>
  );
}

function BoardColumn({ column, projectId, onOpenTaskContext }) {
  const label = column.slug?.trim() || `Status ${column.order + 1}`;
  return (
    <section
      aria-label={`${label}, ${column.tasks.length} tasks`}
      data-kaneo-board-column={column.renderKey}
      className="group relative flex h-full min-h-0 w-full flex-col rounded-xl bg-board-lane"
    >
      <header className="shrink-0 px-3 pt-1 pr-2 pl-3">
        <div className="flex h-8 items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="truncate font-medium text-[13px] text-board-title leading-5">{label}</span>
            <span className="text-board-id text-xs tabular-nums">{column.tasks.length}</span>
          </div>
        </div>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-1.5 pt-1.5 pb-1.5 [-webkit-overflow-scrolling:touch]">
        <div className="flex flex-col gap-1.5">
          {column.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              projectId={projectId}
              onOpenTaskContext={onOpenTaskContext}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function KaneoNativeReadOnlyBoard({ board, projectId, onOpenTaskContext }) {
  return (
    <div className="flex h-full w-full flex-col" data-kaneo-native-board="readonly">
      <div className="min-h-0 flex-1 overflow-x-auto [-webkit-overflow-scrolling:touch]">
        <div className="flex h-full min-w-max gap-4 px-4 py-4 md:px-5">
          {board.columns.map((column) => (
            <div
              key={column.renderKey}
              className="h-full max-w-96 min-w-[min(20rem,calc(100vw-4.5rem))] flex-1 shrink-0 snap-start"
            >
              <BoardColumn
                column={column}
                projectId={projectId}
                onOpenTaskContext={onOpenTaskContext}
              />
            </div>
          ))}
        </div>
      </div>
      {(board.plannedTasks.length > 0 || board.archivedTasks.length > 0) ? (
        <p className="shrink-0 border-t border-border px-4 py-2 text-muted-foreground text-xs" role="status">
          {board.plannedTasks.length} planned and {board.archivedTasks.length} archived tasks are outside the active board view.
        </p>
      ) : null}
    </div>
  );
}

export default KaneoNativeReadOnlyBoard;
