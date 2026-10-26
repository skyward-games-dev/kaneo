/**
 * Adapted from Kaneo 67e30f8 `apps/web/src/components/home/home-projects.tsx`.
 * The project cards retain the upstream structure; router/data hooks are
 * replaced by controlled selection props and host classes avoid a Tailwind
 * runtime dependency.
 */
export function KaneoNativeProjectNavigation({
  projects = [],
  selectedProjectId = null,
  onSelectProject,
  loading = false,
  error = null,
}) {
  if (loading) {
    return (
      <section aria-label="Projects" className="kaneo-project-list panel">
        <h2>Projects</h2>
        <p aria-label="Loading projects" role="status" className="kaneo-muted">Loading projects.</p>
      </section>
    );
  }

  if (error) {
    return <p role="alert" className="kaneo-error">{error}</p>;
  }

  if (projects.length === 0) {
    return (
      <section aria-label="Projects" className="kaneo-project-list panel">
        <h2>Projects</h2>
        <p className="kaneo-muted">
          No projects are available from the configured workspace adapter.
        </p>
      </section>
    );
  }

  return (
    <nav aria-label="Kaneo projects" className="kaneo-project-list panel">
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => {
          const selected = project.id === selectedProjectId;
          return (
            <li key={project.id}>
              <button
                type="button"
                aria-current={selected ? 'page' : undefined}
                disabled={!onSelectProject}
                onClick={() => onSelectProject?.(project.id)}
                className="kaneo-project-choice"
              >
                <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="kaneo-project-icon">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M3 9h18M8 12v5M12 12v3M16 12v5" />
                </svg>
                <span className="kaneo-record-name">{project.name}</span>
                {typeof project.status === 'string' && project.status.length > 0 ? (
                  <span className="kaneo-status">{project.status}</span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default KaneoNativeProjectNavigation;
