import { useAnimate } from 'framer-motion';
import { Button } from './Button';
import { useState } from 'react';

export interface ControlPanelProps {
  togglePlayerConfig: () => void;
  toggleInventory: () => void;
  toggleMap: () => void;
}

export function ControlPanel({
  togglePlayerConfig,
  toggleInventory,
  toggleMap,
}: ControlPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [controlPanelScope, animate] = useAnimate();

  return (
    <div ref={controlPanelScope} className="fixed flex items-start -right-12">
      <div className="bg-slate-700 rounded-l-md">
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
      <div className="flex flex-col bg-slate-700 rounded-b-md">
        <Button text="⚓" variant="icon" onClick={() => togglePlayerConfig()} />
        <Button text="📦" variant="icon" onClick={() => toggleInventory()} />
        <Button text="📑" variant="icon" />
        <Button text="📌" variant="icon" onClick={() => toggleMap()} />
        <Button text="🔨" variant="icon" />
        <Button text="❓" variant="icon" />
      </div>
    </div>
  );
}
