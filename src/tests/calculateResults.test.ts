import { describe, it, expect } from 'vitest';
import { calculateSessionResult } from '../utils/calculateResults';
import { TrialResult, ColorName } from '../types';

function makeTrial(
  isCorrect: boolean,
  isCongruent: boolean,
  rt: number
): TrialResult {
  return {
    stimulus: {
      id: 0,
      word: isCongruent ? 'red' : 'blue',
      color: 'red',
      isCongruent,
    },
    selectedColor: isCorrect ? 'red' : 'blue',
    isCorrect,
    reactionTime: rt,
  };
}

describe('calculateSessionResult', () => {
  it('правильно считает среднее время реакции', () => {
    const trials: TrialResult[] = [
      makeTrial(true, true, 400),
      makeTrial(true, true, 600),
      makeTrial(false, false, 900), // ошибка — не учитывается в среднем RT
    ];

    const result = calculateSessionResult(trials);

    expect(result.totalStimuli).toBe(3);
    expect(result.correctCount).toBe(2);
    expect(result.errorCount).toBe(1);
    expect(result.averageRT).toBe(500); // (400+600)/2
  });

  it('правильно считает индекс интерференции', () => {
    const trials: TrialResult[] = [
      makeTrial(true, true, 400),  // конгр
      makeTrial(true, true, 500),  // конгр → среднее 450
      makeTrial(true, false, 700), // неконгр
      makeTrial(true, false, 900), // неконгр → среднее 800
    ];

    const result = calculateSessionResult(trials);

    expect(result.averageCongruentRT).toBe(450);
    expect(result.averageIncongruentRT).toBe(800);
    expect(result.interferenceIndex).toBe(350); // 800 - 450
  });

  it('корректно обрабатывает случай без правильных ответов', () => {
    const trials: TrialResult[] = [
      makeTrial(false, true, 500),
      makeTrial(false, false, 600),
    ];

    const result = calculateSessionResult(trials);

    expect(result.correctCount).toBe(0);
    expect(result.errorCount).toBe(2);
    expect(result.averageRT).toBe(0);
    expect(result.averageCongruentRT).toBe(0);
    expect(result.averageIncongruentRT).toBe(0);
    expect(result.interferenceIndex).toBe(0);
    expect(result.accuracyPercent).toBe(0);
  });

  it('корректно обрабатывает пустой массив', () => {
    const result = calculateSessionResult([]);

    expect(result.totalStimuli).toBe(0);
    expect(result.averageRT).toBe(0);
    expect(result.interferenceIndex).toBe(0);
    expect(result.accuracyPercent).toBe(0);
  });

  it('правильно считает процент правильных', () => {
    const trials: TrialResult[] = [
      makeTrial(true, true, 400),
      makeTrial(true, false, 500),
      makeTrial(false, true, 600),
      makeTrial(true, false, 700),
    ];

    const result = calculateSessionResult(trials);
    expect(result.accuracyPercent).toBe(75); // 3/4
  });
});
