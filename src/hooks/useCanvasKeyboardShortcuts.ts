import { useCallback, useEffect, useState } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  preventDefault?: boolean;
  action: () => void;
  description: string;
}

export const useCanvasKeyboardShortcuts = (
  shortcuts: KeyboardShortcut[],
  enabled: boolean = true
) => {
  // State to track current pressed keys (for multi-key shortcuts in future)
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  
  // Store the shortcuts in a format that's easy to look up
  const keydownHandler = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;
    
    // Check if any shortcut matches the current key combination
    for (const shortcut of shortcuts) {
      if (
        event.key.toLowerCase() === shortcut.key.toLowerCase() &&
        !!shortcut.ctrlKey === event.ctrlKey &&
        !!shortcut.shiftKey === event.shiftKey &&
        !!shortcut.altKey === event.altKey &&
        !!shortcut.metaKey === event.metaKey
      ) {
        if (shortcut.preventDefault !== false) {
          event.preventDefault();
        }
        shortcut.action();
        return;
      }
    }
  }, [shortcuts, enabled]);
  
  // Track active keys (for showing help overlay and multi-key shortcuts)
  const trackKeyDown = useCallback((event: KeyboardEvent) => {
    setActiveKeys(prev => {
      const updated = new Set(prev);
      updated.add(event.key.toLowerCase());
      return updated;
    });
  }, []);
  
  const trackKeyUp = useCallback((event: KeyboardEvent) => {
    setActiveKeys(prev => {
      const updated = new Set(prev);
      updated.delete(event.key.toLowerCase());
      return updated;
    });
  }, []);
  
  // Set up event listeners
  useEffect(() => {
    if (enabled) {
      window.addEventListener('keydown', keydownHandler);
      window.addEventListener('keydown', trackKeyDown);
      window.addEventListener('keyup', trackKeyUp);
      
      // Clean up when component unmounts or enabled changes
      return () => {
        window.removeEventListener('keydown', keydownHandler);
        window.removeEventListener('keydown', trackKeyDown);
        window.removeEventListener('keyup', trackKeyUp);
      };
    }
  }, [enabled, keydownHandler, trackKeyDown, trackKeyUp]);
  
  // Generate shortcut documentation for accessibility
  const shortcutHelp = shortcuts.map(shortcut => {
    const keys = [];
    if (shortcut.ctrlKey) keys.push('Ctrl');
    if (shortcut.shiftKey) keys.push('Shift');
    if (shortcut.altKey) keys.push('Alt');
    if (shortcut.metaKey) keys.push('Meta');
    keys.push(shortcut.key.toUpperCase());
    
    return {
      keys: keys.join(' + '),
      description: shortcut.description
    };
  });
  
  return {
    activeKeys,
    shortcutHelp
  };
};

// Helper hooks for common canvas operations
export const useCanvasKeyboardControls = (options: {
  onAddNode?: () => void;
  onDelete?: () => void;
  onCopy?: () => void;
  onPaste?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onSave?: () => void;
  onConnect?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onResetView?: () => void;
  enabled?: boolean;
}) => {
  const {
    onAddNode,
    onDelete,
    onCopy,
    onPaste,
    onUndo,
    onRedo,
    onSave,
    onConnect,
    onZoomIn,
    onZoomOut,
    onResetView,
    enabled = true
  } = options;
  
  // Create shortcut configuration
  const shortcuts: KeyboardShortcut[] = [];
  
  if (onAddNode) {
    shortcuts.push({
      key: 'n',
      action: onAddNode,
      description: 'Add new node'
    });
  }
  
  if (onDelete) {
    shortcuts.push({
      key: 'Delete',
      action: onDelete,
      description: 'Delete selected node(s)'
    });
  }
  
  if (onCopy) {
    shortcuts.push({
      key: 'c',
      ctrlKey: true,
      action: onCopy,
      description: 'Copy selected node(s)'
    });
  }
  
  if (onPaste) {
    shortcuts.push({
      key: 'v',
      ctrlKey: true,
      action: onPaste,
      description: 'Paste node(s)'
    });
  }
  
  if (onUndo) {
    shortcuts.push({
      key: 'z',
      ctrlKey: true,
      action: onUndo,
      description: 'Undo last action'
    });
  }
  
  if (onRedo) {
    shortcuts.push({
      key: 'y',
      ctrlKey: true,
      action: onRedo,
      description: 'Redo last action'
    });
  }
  
  if (onSave) {
    shortcuts.push({
      key: 's',
      ctrlKey: true,
      action: onSave,
      description: 'Save canvas'
    });
  }
  
  if (onConnect) {
    shortcuts.push({
      key: 'c',
      action: onConnect,
      description: 'Connect selected nodes'
    });
  }
  
  if (onZoomIn) {
    shortcuts.push({
      key: '+',
      ctrlKey: true,
      action: onZoomIn,
      description: 'Zoom in'
    });
    // Also support '=' key for zoom in (common on US keyboards)
    shortcuts.push({
      key: '=',
      ctrlKey: true,
      action: onZoomIn,
      description: 'Zoom in'
    });
  }
  
  if (onZoomOut) {
    shortcuts.push({
      key: '-',
      ctrlKey: true,
      action: onZoomOut,
      description: 'Zoom out'
    });
  }
  
  if (onResetView) {
    shortcuts.push({
      key: '0',
      ctrlKey: true,
      action: onResetView,
      description: 'Reset view'
    });
  }
  
  return useCanvasKeyboardShortcuts(shortcuts, enabled);
};
