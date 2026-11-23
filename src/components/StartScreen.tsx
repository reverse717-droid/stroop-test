interface Props {
  onStart: () => void;
}

export function StartScreen({ onStart }: Props) {
  return (
    <div className="screen start-screen">
      <h1>Stroop-тест</h1>
      <p className="instruction">
        Называй <strong>цвет шрифта</strong>, игнорируя значение слова.
      </p>
      <p className="hint">
        Например: если написано «СИНИЙ» красным цветом — выбирай «Красный».
      </p>
      <button className="primary-btn" onClick={onStart}>
        Начать тест
      </button>
    </div>
  );
}
