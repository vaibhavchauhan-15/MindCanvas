import { Variants } from 'framer-motion';

// Animation presets for consistent motion across the application
export const useCanvasAnimations = () => {
  // Node animations - used when nodes are added, focused, or interacted with
  const nodeAnimations: Record<string, Variants> = {
    // For newly created nodes
    creation: {
      initial: { 
        opacity: 0, 
        scale: 0.8,
        y: 20
      },
      animate: { 
        opacity: 1, 
        scale: 1,
        y: 0,
        transition: {
          type: 'spring',
          stiffness: 500,
          damping: 30
        }
      },
      exit: { 
        opacity: 0, 
        scale: 0.8,
        transition: { 
          duration: 0.2 
        }
      }
    },
    
    // For nodes that are being focused/selected
    focus: {
      initial: {},
      animate: { 
        scale: 1.02,
        boxShadow: '0 0 0 2px var(--color-primary)',
        transition: {
          scale: {
            type: 'spring',
            stiffness: 700,
            damping: 30
          },
          boxShadow: {
            duration: 0.2
          }
        }
      },
      exit: { 
        scale: 1,
        boxShadow: '0 0 0 0px var(--color-primary)',
        transition: {
          duration: 0.2
        }
      }
    },
    
    // For hovering over nodes
    hover: {
      initial: {},
      whileHover: { 
        scale: 1.01,
        transition: {
          type: 'spring',
          stiffness: 700,
          damping: 30
        }
      }
    },
    
    // For dragging nodes
    drag: {
      initial: {},
      whileDrag: { 
        scale: 1.02,
        transition: {
          type: 'spring',
          stiffness: 700,
          damping: 30
        }
      }
    }
  };
  
  // Edge/connector animations
  const edgeAnimations: Record<string, Variants> = {
    // For newly created connections
    creation: {
      initial: { 
        opacity: 0,
        pathLength: 0
      },
      animate: { 
        opacity: 1,
        pathLength: 1,
        transition: {
          opacity: { duration: 0.2 },
          pathLength: { 
            type: 'spring',
            stiffness: 400,
            damping: 40
          }
        }
      },
      exit: { 
        opacity: 0,
        transition: { 
          duration: 0.1 
        }
      }
    },
    
    // For focused/selected connections
    focus: {
      initial: {},
      animate: { 
        strokeWidth: 3,
        transition: {
          duration: 0.2
        }
      },
      exit: { 
        strokeWidth: 1.5,
        transition: {
          duration: 0.2
        }
      }
    }
  };
  
  // UI component animations for the canvas interface
  const uiAnimations: Record<string, Variants> = {
    // For panels and modals
    panel: {
      initial: { 
        opacity: 0,
        y: 10
      },
      animate: { 
        opacity: 1,
        y: 0,
        transition: {
          type: 'spring',
          stiffness: 500,
          damping: 30
        }
      },
      exit: { 
        opacity: 0,
        y: 10,
        transition: { 
          duration: 0.2 
        }
      }
    },
    
    // For toolbars and controls
    toolbar: {
      initial: { 
        opacity: 0,
        y: -10
      },
      animate: { 
        opacity: 1,
        y: 0,
        transition: {
          type: 'spring',
          stiffness: 500,
          damping: 30,
          staggerChildren: 0.05,
          delayChildren: 0.1
        }
      },
      exit: { 
        opacity: 0,
        y: -10,
        transition: { 
          duration: 0.2 
        }
      }
    },
    
    // For toolbar items (staggered children)
    toolbarItem: {
      initial: { 
        opacity: 0,
        scale: 0.9
      },
      animate: { 
        opacity: 1,
        scale: 1,
        transition: {
          type: 'spring',
          stiffness: 500,
          damping: 30
        }
      },
      exit: { 
        opacity: 0,
        scale: 0.9,
        transition: { 
          duration: 0.1 
        }
      }
    },
    
    // For sidebar or panel content
    content: {
      initial: { 
        opacity: 0,
        x: -20
      },
      animate: { 
        opacity: 1,
        x: 0,
        transition: {
          type: 'spring',
          stiffness: 500,
          damping: 30,
          staggerChildren: 0.1,
          delayChildren: 0.2
        }
      },
      exit: { 
        opacity: 0,
        x: -20,
        transition: { 
          duration: 0.2 
        }
      }
    },
    
    // For content items within panels (staggered children)
    contentItem: {
      initial: { 
        opacity: 0,
        y: 10
      },
      animate: { 
        opacity: 1,
        y: 0,
        transition: {
          type: 'spring',
          stiffness: 500,
          damping: 30
        }
      },
      exit: { 
        opacity: 0,
        y: 10,
        transition: { 
          duration: 0.1 
        }
      }
    }
  };
  
  // Canvas view animations (pan, zoom)
  const viewAnimations = {
    // Smooth zoom
    zoom: (scale: number) => ({
      scale,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }),
    
    // Smooth pan
    pan: (x: number, y: number) => ({
      x,
      y,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }),
    
    // Reset view
    reset: {
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };
  
  return {
    nodeAnimations,
    edgeAnimations,
    uiAnimations,
    viewAnimations
  };
};
