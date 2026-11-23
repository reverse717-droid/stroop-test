import { TrialResult, SessionResult } from '../types';

/**
 * Считает средние и индекс интерференции по результатам сессии.
 */
export function calculateSessionResult(trials: TrialResult[]): SessionResult {
  const totalStimuli = trials.length;
  const correctTrials = trials.filter((t) => t.isCorrect);
  const correctCount = correctTrials.length;
  const errorCount = totalStimuli - correctCount;

  // Среднее RT по всем (только правильные? обычно считают все ответы, но классически — правильные)
  // Для простоты и корректности считаем RT только по правильным ответам
  const rts = correctTrials.map((t) => t.reactionTime);
  const averageRT = rts.length > 0 ? rts.reduce((a, b) => a + b, 0) / rts.length : 0;

  const congruentTrials = correctTrials.filter((t) => t.stimulus.isCongruent);
  const incongruentTrials = correctTrials.filter((t) => !t.stimulus.isCongruent);

  const congruentRTs = congruentTrials.map((t) => t.reactionTime);
  const incongruentRTs = incongruentTrials.map((t) => t.reactionTime);

  const averageCongruentRT =
    congruentRTs.length > 0
      ? congruentRTs.reduce((a, b) => a + b, 0) / congruentRTs.length
      : 0;

  const averageIncongruentRT =
    incongruentRTs.length > 0
      ? incongruentRTs.reduce((a, b) => a + b, 0) / incongruentRTs.length
      : 0;

  // Индекс интерференции = RT_неконгр − RT_конгр
  const interferenceIndex = averageIncongruentRT - averageCongruentRT;

  const accuracyPercent = totalStimuli > 0 ? (correctCount / totalStimuli) * 100 : 0;

  return {
    id: Date.now().toString(),
    date: new Date().toLocaleString('ru-RU'),
    totalStimuli,
    correctCount,
    errorCount,
    averageRT: Math.round(averageRT),
    averageCongruentRT: Math.round(averageCongruentRT),
    averageIncongruentRT: Math.round(averageIncongruentRT),
    interferenceIndex: Math.round(interferenceIndex),
    accuracyPercent: Math.round(accuracyPercent * 10) / 10,
    trials,
  };
}
