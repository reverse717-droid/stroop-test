/** Возможные цвета */
export type ColorName = 'red' | 'blue' | 'green' | 'yellow';

/** Один стимул */
export interface Stimulus {
  id: number;
  word: ColorName;      // слово (что написано)
  color: ColorName;     // цвет шрифта
  isCongruent: boolean; // совпадает ли слово с цветом
}

/** Ответ пользователя на один стимул */
export interface TrialResult {
  stimulus: Stimulus;
  selectedColor: ColorName;
  isCorrect: boolean;
  reactionTime: number; // в миллисекундах
}

/** Итоги одной сессии */
export interface SessionResult {
  id: string;
  date: string;
  totalStimuli: number;
  correctCount: number;
  errorCount: number;
  averageRT: number;
  averageCongruentRT: number;
  averageIncongruentRT: number;
  interferenceIndex: number;
  accuracyPercent: number;
  trials: TrialResult[];
}

/** Экраны приложения */
export type Screen = 'start' | 'test' | 'results' | 'history';
