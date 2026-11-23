interface Props {
  current: number;
  total: number;
}

export function Progress({ current, total }: Props) {
  return (
    <div className="progress">
      {current + 1} / {total}
    </div>
  );
}
