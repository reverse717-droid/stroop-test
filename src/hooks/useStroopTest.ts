import { useState, useCallback, useRef } from 'react';
import { ColorName, Stimulus, TrialResult, SessionResult, Screen } from '../types';
import { generateStimuli, isAnswerCorrect } from '../utils/generateStimuli';
import { calculateSessionResult } from '../utils/calculateResults';
import { saveSession } from '../utils/storage';

const TOTAL_STIMULI = 30;

export function useStroopTest() {
  const [screen, setScreen] = useState<Screen>('start');
  const [stimuli, setStimuli] = useState<Stimulus[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trials, setTrials] = useState<TrialResult[]>([]);
  const [sessionResult, setSessionResult] = useState<SessionResult | null>(null);
  const [isLocked, setIsLocked] = useState(false); // защита от двойных кликов
  const [liveRT, setLiveRT] = useState(0);

  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);

  // Запуск теста
  const startTest = useCallback(() => {
    const newStimuli = generateStimuli(TOTAL_STIMULI);
    setStimuli(newStimuli);
    setCurrentIndex(0);
    setTrials([]);
    setSessionResult(null);
    setScreen('test');
    setIsLocked(false);

    // Запускаем таймер для первого стимула
    startTimeRef.current = performance.now();
    if (timerRef.current) cancelAnimationFrame(timerRef.current);

    const updateRT = () => {
      setLiveRT(Math.round(performance.now() - startTimeRef.current));
      timerRef.current = requestAnimationFrame(updateRT);
    };
    timerRef.current = requestAnimationFrame(updateRT);
  }, []);

  // Обработка ответа
  const handleAnswer = useCallback(
    (selectedColor: ColorName) => {
      if (isLocked || screen !== 'test') return;

      setIsLocked(true); // блокируем повторные клики

      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
        timerRef.current = null;
      }

      const reactionTime = Math.round(performance.now() - startTimeRef.current);
      const currentStimulus = stimuli[currentIndex];
      const isCorrect = isAnswerCorrect(currentStimulus, selectedColor);

      const trial: TrialResult = {
        stimulus: currentStimulus,
        selectedColor,
        isCorrect,
        reactionTime,
      };

      const newTrials = [...trials, trial];
      setTrials(newTrials);

      const nextIndex = currentIndex + 1;

      if (nextIndex >= stimuli.length) {
        // Тест закончен
        const result = calculateSessionResult(newTrials);
        setSessionResult(result);
        saveSession(result);
        setScreen('results');
        setIsLocked(false);
      } else {
        // Следующий стимул с небольшой задержкой
        setTimeout(() => {
          setCurrentIndex(nextIndex);
          startTimeRef.current = performance.now();
          setLiveRT(0);
          setIsLocked(false);

          const updateRT = () => {
            setLiveRT(Math.round(performance.now() - startTimeRef.current));
            timerRef.current = requestAnimationFrame(updateRT);
          };
          timerRef.current = requestAnimationFrame(updateRT);
        }, 350);
      }
    },
    [isLocked, screen, stimuli, currentIndex, trials]
  );

  const goToHistory = useCallback(() => setScreen('history'), []);
  const goToStart = useCallback(() => setScreen('start'), []);
  const goToResults = useCallback(() => setScreen('results'), []);

  return {
    screen,
    stimuli,
    currentIndex,
    trials,
    sessionResult,
    liveRT,
    isLocked,
    totalStimuli: TOTAL_STIMULI,
    startTest,
    handleAnswer,
    goToHistory,
    goToStart,
    goToResults,
  };
}
