interface Props {
  ms: number;
}

export function Timer({ ms }: Props) {
  return (
    <div className="timer">
      {ms} мс
    </div>
  );
}
