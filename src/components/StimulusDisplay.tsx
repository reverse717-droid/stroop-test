import { ColorName } from '../types';

interface Props {
  word: ColorName;
  color: ColorName;
}

const wordLabels: Record<ColorName, string> = {
  red: 'КРАСНЫЙ',
  blue: 'СИНИЙ',
  green: 'ЗЕЛЁНЫЙ',
  yellow: 'ЖЁЛТЫЙ',
};

const colorMap: Record<ColorName, string> = {
  red: '#e74c3c',
  blue: '#3498db',
  green: '#2ecc71',
  yellow: '#f1c40f',
};

export function StimulusDisplay({ word, color }: Props) {
  return (
    <div className="stimulus" style={{ color: colorMap[color] }}>
      {wordLabels[word]}
    </div>
  );
}
