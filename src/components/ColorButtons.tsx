import { ColorName } from '../types';
import { ColorButton } from './ColorButton';

interface Props {
  onSelect: (color: ColorName) => void;
  disabled?: boolean;
}

const BUTTONS: { color: ColorName; label: string }[] = [
  { color: 'red', label: 'Красный' },
  { color: 'blue', label: 'Синий' },
  { color: 'green', label: 'Зелёный' },
  { color: 'yellow', label: 'Жёлтый' },
];

export function ColorButtons({ onSelect, disabled }: Props) {
  return (
    <div className="color-buttons">
      {BUTTONS.map((btn) => (
        <ColorButton
          key={btn.color}
          color={btn.color}
          label={btn.label}
          onClick={onSelect}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
