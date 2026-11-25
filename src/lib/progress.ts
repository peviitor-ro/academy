/**
 * Progresul utilizatorului. Componentele folosesc doar aceasta interfata,
 * nu `localStorage` direct, ca sa putem inlocui implementarea cu un API
 * cand va exista un backend cu conturi.
 */
export interface ProgressStore {
  isDone(id: string): boolean;
  markDone(id: string): void;
  markUndone(id: string): void;
  getDone(): string[];
}

// Cheie versionata: daca se schimba formatul, se incrementeaza versiunea.
const STORAGE_KEY = 'academy:progress:v1';

export class LocalStorageProgressStore implements ProgressStore {
  private read(): Set<string> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      return new Set(Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : []);
    } catch {
      // localStorage indisponibil sau JSON corupt: pornim de la zero.
      return new Set();
    }
  }

  private write(ids: Set<string>): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
    } catch {
      // Spatiu plin sau mod privat: progresul nu se salveaza, dar pagina merge in continuare.
    }
  }

  isDone(id: string): boolean {
    return this.read().has(id);
  }

  markDone(id: string): void {
    const ids = this.read();
    ids.add(id);
    this.write(ids);
  }

  markUndone(id: string): void {
    const ids = this.read();
    ids.delete(id);
    this.write(ids);
  }

  getDone(): string[] {
    return [...this.read()];
  }
}

export const progressStore: ProgressStore = new LocalStorageProgressStore();
