import React from 'react';
import { motion } from 'framer-motion';
import { Button, Tooltip } from '../ui/design-system';
import { useTheme } from '../ui/theme';

interface CanvasControlsProps {
  onConnect: () => void;
  onDelete: () => void;
  onDuplicate?: () => void;
  onGroup?: () => void;
  onUngroup?: () => void;
  disableConnect?: boolean;
  disableDelete?: boolean;
  disableDuplicate?: boolean;
  disableGroup?: boolean;
  disableUngroup?: boolean;
  className?: string;
}

const CanvasControls: React.FC<CanvasControlsProps> = ({
  onConnect,
  onDelete,
  onDuplicate,
  onGroup,
  onUngroup,
  disableConnect = false,
  disableDelete = false,
  disableDuplicate = false,
  disableGroup = false,
  disableUngroup = false,
  className = '',
}) => {
  const { mode } = useTheme();
  
  const controlsAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.05,
      }
    }
  };
  
  const itemAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 500,
        damping: 25
      }
    }
  };

  return (
    <motion.div 
      className={`py-2 px-3 bg-surface/80 backdrop-blur-md rounded-lg shadow-md border border-border/50 flex items-center gap-2 ${className}`}
      initial="hidden"
      animate="visible"
      variants={controlsAnimation}
      role="toolbar"
      aria-label="Node operations"
    >
      <motion.div variants={itemAnimation}>
        <Tooltip content="Connect nodes (C)" position="bottom">
          <Button
            variant="outline"
            size="sm"
            className="aspect-square p-2"
            onClick={onConnect}
            disabled={disableConnect}
            aria-label="Connect nodes"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </Button>
        </Tooltip>
      </motion.div>

      {onDuplicate && (
        <motion.div variants={itemAnimation}>
          <Tooltip content="Duplicate node (Ctrl+D)" position="bottom">
            <Button
              variant="outline"
              size="sm"
              className="aspect-square p-2"
              onClick={onDuplicate}
              disabled={disableDuplicate}
              aria-label="Duplicate node"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
            </Button>
          </Tooltip>
        </motion.div>
      )}

      <motion.div variants={itemAnimation}>
        <Tooltip content="Delete (Del)" position="bottom">
          <Button
            variant="secondary"
            size="sm"
            className="aspect-square p-2 bg-red-500/20 hover:bg-red-500/30 text-red-500 border-red-500/30"
            onClick={onDelete}
            disabled={disableDelete}
            aria-label="Delete node"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </Button>
        </Tooltip>
      </motion.div>

      {onGroup && (
        <motion.div variants={itemAnimation}>
          <Tooltip content="Group nodes (Ctrl+G)" position="bottom">
            <Button
              variant="outline"
              size="sm"
              className="aspect-square p-2"
              onClick={onGroup}
              disabled={disableGroup}
              aria-label="Group nodes"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </Button>
          </Tooltip>
        </motion.div>
      )}

      {onUngroup && (
        <motion.div variants={itemAnimation}>
          <Tooltip content="Ungroup nodes (Ctrl+Shift+G)" position="bottom">
            <Button
              variant="outline"
              size="sm"
              className="aspect-square p-2"
              onClick={onUngroup}
              disabled={disableUngroup}
              aria-label="Ungroup nodes"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </Tooltip>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CanvasControls;
