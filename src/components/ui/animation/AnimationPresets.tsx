import { MotionProps, Variants } from 'framer-motion';

/**
 * Standard animation presets for consistent motion across the application
 */
export const AnimationPresets = {
  // Page transitions
  page: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  } as Variants,
  
  // Page transitions with slide
  pageSlide: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 }
    }
  } as Variants,
  
  // Fade in
  fadeIn: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  } as Variants,
  
  // Fade in up
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1,
      y: 0,
      transition: { 
        type: 'spring' as const, 
        stiffness: 300, 
        damping: 30
      }
    }
  } as Variants,
  
  // Fade in scale
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
      opacity: 1,
      scale: 1,
      transition: { 
        type: 'spring' as const, 
        stiffness: 500, 
        damping: 30
      }
    }
  } as Variants,
  
  // Scale on hover
  scaleHover: {
    whileHover: { 
      scale: 1.05,
      transition: { 
        type: 'spring' as const, 
        stiffness: 400, 
        damping: 10
      }
    }
  } as Variants,
  
  // Modal/dialog
  modal: {
    initial: { opacity: 0, scale: 0.9, y: 10 },
    animate: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        type: 'spring' as const, 
        stiffness: 500, 
        damping: 30
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.15 }
    }
  } as Variants,
  
  // Staggered list items
  list: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  } as Variants,
  
  // List item
  listItem: {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1,
      y: 0,
      transition: { 
        type: 'spring' as const, 
        stiffness: 500, 
        damping: 30
      }
    }
  } as Variants,
  
  // Toolbar with staggered items
  toolbar: {
    initial: { opacity: 0, y: -10 },
    animate: { 
      opacity: 1,
      y: 0,
      transition: { 
        type: 'spring' as const, 
        stiffness: 500, 
        damping: 30,
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    }
  } as Variants,
  
  // Toolbar item
  toolbarItem: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { 
      opacity: 1,
      scale: 1,
      transition: { 
        type: 'spring' as const, 
        stiffness: 500, 
        damping: 30
      }
    }
  } as Variants,
  
  // Card
  card: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1,
      y: 0,
      transition: { 
        type: 'spring' as const, 
        stiffness: 500, 
        damping: 30
      }
    },
    whileHover: { 
      y: -5,
      transition: { 
        type: 'spring' as const, 
        stiffness: 500, 
        damping: 10
      }
    }
  } as Variants,
  
  // Button hover
  buttonHover: {
    whileHover: { 
      scale: 1.05,
      transition: { 
        type: 'spring' as const, 
        stiffness: 500, 
        damping: 10
      }
    },
    whileTap: { 
      scale: 0.95
    }
  } as Variants,
  
  // Sidebar
  sidebar: {
    initial: { opacity: 0, x: -40 },
    animate: { 
      opacity: 1,
      x: 0,
      transition: { 
        type: 'spring' as const, 
        stiffness: 300, 
        damping: 30
      }
    },
    exit: { 
      opacity: 0,
      x: -40,
      transition: { duration: 0.2 }
    }
  } as Variants,
  
  // Drawer from right
  drawerRight: {
    initial: { opacity: 0, x: 40 },
    animate: { 
      opacity: 1,
      x: 0,
      transition: { 
        type: 'spring' as const, 
        stiffness: 300, 
        damping: 30
      }
    },
    exit: { 
      opacity: 0,
      x: 40,
      transition: { duration: 0.2 }
    }
  } as Variants,
};

/**
 * Helper function to combine animation presets with component-specific props
 */
export const combineAnimations = (
  presetName: keyof typeof AnimationPresets,
  customProps?: MotionProps
): MotionProps => {
  const preset = AnimationPresets[presetName];
  return {
    ...customProps,
    variants: preset,
    initial: "initial",
    animate: "animate",
    exit: "exit",
    ...(preset.whileHover && { whileHover: "whileHover" }),
    ...(preset.whileTap && { whileTap: "whileTap" }),
  };
};

export default AnimationPresets;
