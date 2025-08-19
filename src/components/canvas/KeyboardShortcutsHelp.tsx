import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/design-system';

interface KeyboardShortcut {
  keys: string;
  description: string;
}

interface KeyboardShortcutsHelpProps {
  shortcuts: KeyboardShortcut[];
  className?: string;
}

const KeyboardShortcutsHelp: React.FC<KeyboardShortcutsHelpProps> = ({
  shortcuts,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div className={`bg-surface/80 backdrop-blur-md rounded-lg shadow-md border border-border/50 ${className}`}>
      <Button
        variant="outline"
        size="sm"
        className="w-full flex items-center justify-between p-2"
        onClick={toggleExpanded}
        aria-expanded={isExpanded}
        aria-controls="keyboard-shortcuts-panel"
      >
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Keyboard Shortcuts
        </div>
        <svg 
          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id="keyboard-shortcuts-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-3 text-sm space-y-2" role="list" aria-label="Keyboard shortcuts">
              {shortcuts.map((shortcut, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center" 
                  role="listitem"
                >
                  <span className="text-text/70">{shortcut.description}</span>
                  <kbd className="px-2 py-0.5 rounded bg-surface-variant/30 border border-border/50 text-xs font-mono">
                    {shortcut.keys}
                  </kbd>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KeyboardShortcutsHelp;
