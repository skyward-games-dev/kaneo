/**
 * Read-only extraction of Kaneo 67e30f8's `KanbanBoard`, `Column`, and
 * `TaskCardContent` layout. It preserves the upstream board/column/card
 * structure while using host classes and omitting drag, archive, delete,
 * query, and provider actions.
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
      className="kaneo-task-row kaneo-task-card"
    >
      <span className="kaneo-record-name">
        {task.title}
      </span>
      {typeof task.priority === 'string' && task.priority !== 'no-priority' ? (
        <span className="kaneo-status kaneo-priority">
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
      className="kaneo-task-board-column"
    >
      <h3 className="kaneo-task-board-heading"><span>{label}</span><span className="kaneo-status-count">{column.tasks.length}</span></h3>
      <ul className="kaneo-task-board-items">
        {column.tasks.map((task) => (
          <li key={task.id}>
            <TaskCard task={task} projectId={projectId} onOpenTaskContext={onOpenTaskContext} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function KaneoNativeReadOnlyBoard({ board, projectId, onOpenTaskContext }) {
  return (
    <div className="kaneo-native-board" data-kaneo-native-board="readonly">
      <div className="kaneo-task-board">
        {board.columns.map((column) => (
          <BoardColumn key={column.renderKey} column={column} projectId={projectId} onOpenTaskContext={onOpenTaskContext} />
        ))}
      </div>
      {(board.plannedTasks.length > 0 || board.archivedTasks.length > 0) ? (
        <p className="kaneo-task-board-note" role="status">
          {board.plannedTasks.length} planned and {board.archivedTasks.length} archived tasks are outside the active board view.
        </p>
      ) : null}
    </div>
  );
}

export default KaneoNativeReadOnlyBoard;
