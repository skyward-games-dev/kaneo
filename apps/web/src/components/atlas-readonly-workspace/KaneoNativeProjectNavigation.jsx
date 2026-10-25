import { FolderKanban } from 'lucide-react';

/**
 * Adapted from Kaneo 67e30f8 `apps/web/src/components/home/home-projects.tsx`.
 * The project cards and responsive grid retain the upstream structure/classes;
 * router/data hooks are replaced by controlled selection props.
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
      <section aria-label="Projects" className="flex flex-col gap-3">
        <h2 className="font-heading font-semibold text-foreground text-base">Projects</h2>
        <div aria-label="Loading projects" role="status" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="h-24 animate-pulse rounded-lg border border-border bg-muted/40" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return <p role="alert" className="text-muted-foreground text-sm">{error}</p>;
  }

  if (projects.length === 0) {
    return (
      <section aria-label="Projects" className="flex flex-col gap-3">
        <h2 className="font-heading font-semibold text-foreground text-base">Projects</h2>
        <p className="rounded-lg border border-border bg-card p-5 text-muted-foreground text-sm">
          No projects are available from the configured workspace adapter.
        </p>
      </section>
    );
  }

  return (
    <nav aria-label="Kaneo projects" className="flex flex-col gap-3">
      <h2 className="font-heading font-semibold text-foreground text-base">Projects</h2>
      <ul className="grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const selected = project.id === selectedProjectId;
          return (
            <li key={project.id}>
              <button
                type="button"
                aria-current={selected ? 'page' : undefined}
                disabled={!onSelectProject}
                onClick={() => onSelectProject?.(project.id)}
                className={`flex min-h-16 w-full items-center gap-2 rounded-lg border border-border p-3.5 text-left outline-none transition-colors hover:bg-accent/40 focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-default disabled:opacity-80 ${selected ? 'bg-accent/40' : ''}`}
              >
                <FolderKanban aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
                <span className="min-w-0 flex-1 truncate font-medium text-foreground text-sm">{project.name}</span>
                {typeof project.status === 'string' && project.status.length > 0 ? (
                  <span className="max-w-28 truncate text-muted-foreground text-xs">{project.status}</span>
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
