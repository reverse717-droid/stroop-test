import { ColorName, Stimulus } from '../types';
import { StimulusDisplay } from './StimulusDisplay';
import { ColorButtons } from './ColorButtons';
import { Timer } from './Timer';
import { Progress } from './Progress';

interface Props {
  stimulus: Stimulus;
  currentIndex: number;
  total: number;
  liveRT: number;
  isLocked: boolean;
  onAnswer: (color: ColorName) => void;
}

export function TestScreen({
  stimulus,
  currentIndex,
  total,
  liveRT,
  isLocked,
  onAnswer,
}: Props) {
  return (
    <div className="screen test-screen">
      <Progress current={currentIndex} total={total} />
      <Timer ms={liveRT} />
      <StimulusDisplay word={stimulus.word} color={stimulus.color} />
      <ColorButtons onSelect={onAnswer} disabled={isLocked} />
    </div>
  );
}
