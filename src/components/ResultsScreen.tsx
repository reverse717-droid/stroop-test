import { SessionResult } from '../types';

interface Props {
  result: SessionResult;
  onRestart: () => void;
  onHistory: () => void;
}

export function ResultsScreen({ result, onRestart, onHistory }: Props) {
  return (
    <div className="screen results-screen">
      <h1>Результаты</h1>

      <div className="results-grid">
        <div className="result-card">
          <span className="label">Всего стимулов</span>
          <span className="value">{result.totalStimuli}</span>
        </div>
        <div className="result-card">
          <span className="label">Правильных</span>
          <span className="value correct">{result.correctCount}</span>
        </div>
        <div className="result-card">
          <span className="label">Ошибок</span>
          <span className="value error">{result.errorCount}</span>
        </div>
        <div className="result-card">
          <span className="label">Точность</span>
          <span className="value">{result.accuracyPercent}%</span>
        </div>
        <div className="result-card">
          <span className="label">Среднее RT</span>
          <span className="value">{result.averageRT} мс</span>
        </div>
        <div className="result-card">
          <span className="label">RT конгруэнтных</span>
          <span className="value">{result.averageCongruentRT} мс</span>
        </div>
        <div className="result-card">
          <span className="label">RT неконгруэнтных</span>
          <span className="value">{result.averageIncongruentRT} мс</span>
        </div>
        <div className="result-card highlight">
          <span className="label">Индекс интерференции</span>
          <span className="value">{result.interferenceIndex} мс</span>
        </div>
      </div>

      <div className="buttons-row">
        <button className="primary-btn" onClick={onRestart}>
          Пройти ещё раз
        </button>
        <button className="secondary-btn" onClick={onHistory}>
          История
        </button>
      </div>
    </div>
  );
}
