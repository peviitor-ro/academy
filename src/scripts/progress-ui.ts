import { progressStore } from '../lib/progress';

/** Actualizeaza insemnele "vazut", butoanele si contoarele de serie din pagina curenta. */
function refresh() {
  const done = new Set(progressStore.getDone());

  document.querySelectorAll<HTMLElement>('[data-seen-id]').forEach((el) => {
    el.hidden = !done.has(el.dataset.seenId ?? '');
  });

  document.querySelectorAll<HTMLButtonElement>('[data-progress-button]').forEach((button) => {
    const isDone = done.has(button.dataset.progressButton ?? '');
    button.setAttribute('aria-pressed', String(isDone));
    button.textContent = isDone ? (button.dataset.labelDone ?? '') : (button.dataset.labelTodo ?? '');
  });

  document.querySelectorAll<HTMLElement>('[data-bar-ids]').forEach((bar) => {
    const ids = (bar.dataset.barIds ?? '').split(',').filter(Boolean);
    const count = ids.filter((id) => done.has(id)).length;
    const percent = ids.length ? Math.round((count / ids.length) * 100) : 0;
    bar.setAttribute('aria-valuenow', String(percent));
    const fill = bar.firstElementChild as HTMLElement | null;
    if (fill) fill.style.width = `${percent}%`;
  });

  document.querySelectorAll<HTMLElement>('[data-series-ids]').forEach((el) => {
    const ids = (el.dataset.seriesIds ?? '').split(',').filter(Boolean);
    const count = ids.filter((id) => done.has(id)).length;
    el.textContent = `${count}/${ids.length} ${el.dataset.label ?? ''}`;
  });
}

document.addEventListener('click', (event) => {
  const button = (event.target as Element).closest<HTMLButtonElement>('[data-progress-button]');
  if (!button) return;
  const id = button.dataset.progressButton ?? '';
  if (progressStore.isDone(id)) {
    progressStore.markUndone(id);
  } else {
    progressStore.markDone(id);
  }
  refresh();
});

// Progresul se sincronizeaza intre tab-uri deschise.
window.addEventListener('storage', refresh);
refresh();
