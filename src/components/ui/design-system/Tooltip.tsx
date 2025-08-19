import React, { useState, useRef } from 'react';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const showTooltip = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    setIsVisible(true);
  };

  const hideTooltip = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(false);
    }, 100);
  };

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 translate-x-2 ml-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 translate-y-2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 -translate-x-2 mr-2',
  };

  const arrowClasses = {
    top: 'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full border-t-surface border-x-transparent border-b-0',
    right: 'left-0 top-1/2 transform -translate-y-1/2 -translate-x-full border-r-surface border-y-transparent border-l-0',
    bottom: 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-full border-b-surface border-x-transparent border-t-0',
    left: 'right-0 top-1/2 transform -translate-y-1/2 translate-x-full border-l-surface border-y-transparent border-r-0',
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      
      {isVisible && (
        <div 
          className={`absolute z-tooltip bg-surface text-text text-sm py-1.5 px-3 rounded-md shadow-md ${positionClasses[position]} ${className}`}
          role="tooltip"
        >
          <div className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`} />
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
