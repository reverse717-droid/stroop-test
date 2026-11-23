import { useStroopTest } from './hooks/useStroopTest';
import { StartScreen } from './components/StartScreen';
import { TestScreen } from './components/TestScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { HistoryScreen } from './components/HistoryScreen';
import './App.css';

function App() {
  const {
    screen,
    stimuli,
    currentIndex,
    sessionResult,
    liveRT,
    isLocked,
    totalStimuli,
    startTest,
    handleAnswer,
    goToHistory,
    goToStart,
  } = useStroopTest();

  return (
    <div className="app">
      {screen === 'start' && <StartScreen onStart={startTest} />}

      {screen === 'test' && stimuli[currentIndex] && (
        <TestScreen
          stimulus={stimuli[currentIndex]}
          currentIndex={currentIndex}
          total={totalStimuli}
          liveRT={liveRT}
          isLocked={isLocked}
          onAnswer={handleAnswer}
        />
      )}

      {screen === 'results' && sessionResult && (
        <ResultsScreen
          result={sessionResult}
          onRestart={startTest}
          onHistory={goToHistory}
        />
      )}

      {screen === 'history' && <HistoryScreen onBack={goToStart} />}
    </div>
  );
}

export default App;
