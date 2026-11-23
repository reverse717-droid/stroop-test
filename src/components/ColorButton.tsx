import { ColorName } from '../types';

interface Props {
  color: ColorName;
  label: string;
  onClick: (color: ColorName) => void;
  disabled?: boolean;
}

const colorMap: Record<ColorName, string> = {
  red: '#e74c3c',
  blue: '#3498db',
  green: '#2ecc71',
  yellow: '#f1c40f',
};

export function ColorButton({ color, label, onClick, disabled }: Props) {
  return (
    <button
      className="color-btn"
      style={{ backgroundColor: colorMap[color] }}
      onClick={() => onClick(color)}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
