import { useAnimate } from 'framer-motion';
import { Button } from './Button';
import { useState } from 'react';

export interface ControlPanelProps {
  toggleMap: () => void;
}

export function ControlPanel({ toggleMap }: ControlPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [controlPanelScope, animate] = useAnimate();

  return (
    <div ref={controlPanelScope} className="fixed flex items-start -right-12">
      <div className="bg-gray-200">
        <Button
          text={isExpanded ? '⏩' : '⏪'}
          variant="icon"
          onClick={() => {
            animate(controlPanelScope.current, {
              x: isExpanded ? 0 : -48,
              transition: { duration: 0.5 },
            });
            setIsExpanded(!isExpanded);
          }}
        />
      </div>
      <div className="flex flex-col bg-gray-200">
        <Button text="⚓" variant="icon" />
        <Button text="📌" variant="icon" onClick={() => toggleMap()} />
        <Button text="🔨" variant="icon" />
      </div>
    </div>
  );
}
