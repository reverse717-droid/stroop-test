import { describe, it, expect } from 'vitest';
import { generateStimuli, isAnswerCorrect } from '../utils/generateStimuli';
import { ColorName } from '../types';

const VALID_COLORS: ColorName[] = ['red', 'blue', 'green', 'yellow'];

describe('generateStimuli', () => {
  it('возвращает правильное количество стимулов', () => {
    const stimuli = generateStimuli(30);
    expect(stimuli).toHaveLength(30);

    const stimuli10 = generateStimuli(10);
    expect(stimuli10).toHaveLength(10);
  });

  it('содержит и конгруэнтные, и неконгруэнтные стимулы', () => {
    // Генерируем несколько раз, чтобы быть уверенными
    let hasCongruent = false;
    let hasIncongruent = false;

    for (let i = 0; i < 5; i++) {
      const stimuli = generateStimuli(30);
      if (stimuli.some((s) => s.isCongruent)) hasCongruent = true;
      if (stimuli.some((s) => !s.isCongruent)) hasIncongruent = true;
    }

    expect(hasCongruent).toBe(true);
    expect(hasIncongruent).toBe(true);
  });

  it('не имеет двух полностью одинаковых стимулов подряд', () => {
    const stimuli = generateStimuli(50);

    for (let i = 1; i < stimuli.length; i++) {
      const prev = stimuli[i - 1];
      const curr = stimuli[i];
      const same = prev.word === curr.word && prev.color === curr.color;
      expect(same).toBe(false);
    }
  });

  it('использует только допустимые цвета и слова', () => {
    const stimuli = generateStimuli(40);

    for (const s of stimuli) {
      expect(VALID_COLORS).toContain(s.word);
      expect(VALID_COLORS).toContain(s.color);
      expect(s.isCongruent).toBe(s.word === s.color);
    }
  });
});

describe('isAnswerCorrect', () => {
  it('возвращает true, когда выбран цвет шрифта', () => {
    const stimulus = {
      id: 0,
      word: 'red' as ColorName,
      color: 'blue' as ColorName,
      isCongruent: false,
    };
    expect(isAnswerCorrect(stimulus, 'blue')).toBe(true);
  });

  it('возвращает false, когда выбран неправильный цвет', () => {
    const stimulus = {
      id: 0,
      word: 'red' as ColorName,
      color: 'blue' as ColorName,
      isCongruent: false,
    };
    expect(isAnswerCorrect(stimulus, 'red')).toBe(false);
    expect(isAnswerCorrect(stimulus, 'green')).toBe(false);
  });
});
