import { useState, useEffect } from 'react';
import { SessionResult } from '../types';
import { getHistory, clearHistory } from '../utils/storage';

interface Props {
  onBack: () => void;
}

export function HistoryScreen({ onBack }: Props) {
  const [history, setHistory] = useState<SessionResult[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleClear = () => {
    if (confirm('Очистить всю историю?')) {
      clearHistory();
      setHistory([]);
    }
  };

  return (
    <div className="screen history-screen">
      <h1>История попыток</h1>

      {history.length === 0 ? (
        <p className="empty">История пуста</p>
      ) : (
        <div className="history-list">
          {history.map((item) => (
            <div key={item.id} className="history-item">
              <div className="history-date">{item.date}</div>
              <div className="history-stats">
                <span>RT: {item.averageRT} мс</span>
                <span>Ошибок: {item.errorCount}</span>
                <span>Интерф.: {item.interferenceIndex} мс</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="buttons-row">
        <button className="secondary-btn" onClick={onBack}>
          Назад
        </button>
        {history.length > 0 && (
          <button className="danger-btn" onClick={handleClear}>
            Очистить историю
          </button>
        )}
      </div>
    </div>
  );
}
