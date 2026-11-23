import { SessionResult } from '../types';

const STORAGE_KEY = 'stroop-test-history';

/** Получить всю историю */
export function getHistory(): SessionResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SessionResult[];
  } catch {
    return [];
  }
}

/** Сохранить новую сессию в историю */
export function saveSession(session: SessionResult): void {
  const history = getHistory();
  history.unshift(session); // новые сверху
  // Ограничиваем историю 50 записями
  const limited = history.slice(0, 50);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
}

/** Очистить историю */
export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}
