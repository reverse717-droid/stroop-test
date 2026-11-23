import { ColorName, Stimulus } from '../types';

const COLORS: ColorName[] = ['red', 'blue', 'green', 'yellow'];

/**
 * Генерирует массив стимулов для теста.
 * Примерно 50/50 конгруэнтных и неконгруэнтных.
 * Соседние стимулы не одинаковые.
 */
export function generateStimuli(count: number = 30): Stimulus[] {
  const stimuli: Stimulus[] = [];
  let prevWord: ColorName | null = null;
  let prevColor: ColorName | null = null;

  for (let i = 0; i < count; i++) {
    let word: ColorName;
    let color: ColorName;
    let isCongruent: boolean;

    // Пытаемся избежать повторения подряд
    do {
      // С вероятностью ~50% делаем конгруэнтный
      isCongruent = Math.random() < 0.5;

      word = COLORS[Math.floor(Math.random() * COLORS.length)];

      if (isCongruent) {
        color = word;
      } else {
        // Выбираем другой цвет
        const otherColors = COLORS.filter((c) => c !== word);
        color = otherColors[Math.floor(Math.random() * otherColors.length)];
      }
    } while (
      (word === prevWord && color === prevColor) || // полностью одинаковый
      (i > 0 && Math.random() < 0.3 && word === prevWord) // иногда избегаем одинакового слова
    );

    stimuli.push({
      id: i,
      word,
      color,
      isCongruent,
    });

    prevWord = word;
    prevColor = color;
  }

  return stimuli;
}

/** Проверка правильности ответа */
export function isAnswerCorrect(stimulus: Stimulus, selectedColor: ColorName): boolean {
  return stimulus.color === selectedColor;
}
