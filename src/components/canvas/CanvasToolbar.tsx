import React from 'react';
import { motion } from 'framer-motion';
import { Button, Tooltip } from '../ui/design-system';
import { useTheme } from '../ui/theme';

interface CanvasToolbarProps {
  onAddNode: () => void;
  onSave: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onResetView?: () => void;
  className?: string;
}

const CanvasToolbar: React.FC<CanvasToolbarProps> = ({
  onAddNode,
  onSave,
  onUndo,
  onRedo,
  onZoomIn,
  onZoomOut,
  onResetView,
  className = '',
}) => {
  const { mode } = useTheme();
  
  const toolbarAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
      }
    }
  };
  
  const itemAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className={`py-2 px-3 bg-surface/80 backdrop-blur-md rounded-lg shadow-md border border-border/50 flex items-center gap-2 ${className}`}
      initial="hidden"
      animate="visible"
      variants={toolbarAnimation}
      role="toolbar"
      aria-label="Canvas editing toolbar"
    >
      <motion.div variants={itemAnimation}>
        <Tooltip content="Add new node (N)" position="bottom">
          <Button
            variant="primary"
            size="sm"
            className="aspect-square p-2"
            onClick={onAddNode}
            aria-label="Add new node"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </Button>
        </Tooltip>
      </motion.div>

      <motion.div variants={itemAnimation}>
        <Tooltip content="Save canvas (Ctrl+S)" position="bottom">
          <Button
            variant="outline"
            size="sm"
            className="aspect-square p-2"
            onClick={onSave}
            aria-label="Save canvas"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
          </Button>
        </Tooltip>
      </motion.div>

      <div className="h-6 w-px bg-border/50 mx-1"></div>

      {onUndo && (
        <motion.div variants={itemAnimation}>
          <Tooltip content="Undo (Ctrl+Z)" position="bottom">
            <Button
              variant="outline"
              size="sm"
              className="aspect-square p-2"
              onClick={onUndo}
              aria-label="Undo"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Button>
          </Tooltip>
        </motion.div>
      )}

      {onRedo && (
        <motion.div variants={itemAnimation}>
          <Tooltip content="Redo (Ctrl+Y)" position="bottom">
            <Button
              variant="outline"
              size="sm"
              className="aspect-square p-2"
              onClick={onRedo}
              aria-label="Redo"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </Tooltip>
        </motion.div>
      )}

      <div className="h-6 w-px bg-border/50 mx-1"></div>

      {onZoomIn && (
        <motion.div variants={itemAnimation}>
          <Tooltip content="Zoom in (Ctrl++)" position="bottom">
            <Button
              variant="outline"
              size="sm"
              className="aspect-square p-2"
              onClick={onZoomIn}
              aria-label="Zoom in"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </Button>
          </Tooltip>
        </motion.div>
      )}

      {onZoomOut && (
        <motion.div variants={itemAnimation}>
          <Tooltip content="Zoom out (Ctrl+-)" position="bottom">
            <Button
              variant="outline"
              size="sm"
              className="aspect-square p-2"
              onClick={onZoomOut}
              aria-label="Zoom out"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
              </svg>
            </Button>
          </Tooltip>
        </motion.div>
      )}

      {onResetView && (
        <motion.div variants={itemAnimation}>
          <Tooltip content="Reset view (Ctrl+0)" position="bottom">
            <Button
              variant="outline"
              size="sm"
              className="aspect-square p-2"
              onClick={onResetView}
              aria-label="Reset view"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
            </Button>
          </Tooltip>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CanvasToolbar;
