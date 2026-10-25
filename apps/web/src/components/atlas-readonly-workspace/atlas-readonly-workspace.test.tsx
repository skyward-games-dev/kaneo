import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { KaneoNativeProjectNavigation } from './KaneoNativeProjectNavigation';
import { KaneoNativeReadOnlyBoard } from './KaneoNativeReadOnlyBoard';

describe('Atlas read-only workspace presentation', () => {
  it('keeps project selection controlled and exposes accessible loading and empty states', () => {
    const onSelectProject = vi.fn();
    const { rerender } = render(
      <KaneoNativeProjectNavigation
        projects={[{ id: 'project-1', name: 'Sprite pipeline' }]}
        selectedProjectId={null}
        onSelectProject={onSelectProject}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Sprite pipeline' }));
    expect(onSelectProject).toHaveBeenCalledWith('project-1');

    rerender(<KaneoNativeProjectNavigation loading />);
    expect(screen.getByRole('status', { name: 'Loading projects' })).toBeTruthy();
    rerender(<KaneoNativeProjectNavigation projects={[]} />);
    expect(screen.getByText(/No projects are available/i)).toBeTruthy();
  });

  it('renders columns and empty lanes without enabling unsupported task mutations', () => {
    const onOpenTaskContext = vi.fn();
    const board = {
      columns: [
        { renderKey: 'read-only-column-0', slug: 'doing', order: 0, tasks: [{ id: 'task-1', title: 'Review tiles', priority: 'high' }] },
        { renderKey: 'read-only-column-1', slug: 'empty', order: 1, tasks: [] },
      ],
      plannedTasks: [],
      archivedTasks: [],
    };
    const { rerender } = render(<KaneoNativeReadOnlyBoard board={board} projectId="project-1" />);
    expect(screen.getByRole('region', { name: 'doing, 1 tasks' })).toBeTruthy();
    expect(screen.getByRole('region', { name: 'empty, 0 tasks' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Open task Review tiles' }).disabled).toBe(true);

    rerender(<KaneoNativeReadOnlyBoard board={board} projectId="project-1" onOpenTaskContext={onOpenTaskContext} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open task Review tiles' }));
    expect(onOpenTaskContext).toHaveBeenCalledWith({ projectId: 'project-1', taskId: 'task-1' });
  });
});
