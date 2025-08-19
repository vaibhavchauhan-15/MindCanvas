import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  confirmDisabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  confirmDisabled = false,
  size = 'md',
}) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={onClose}
          />
          
          {/* Dialog */}
          <div className="fixed inset-0 flex items-center justify-center z-modal pointer-events-none p-4">
            <motion.div
              className={`bg-card rounded-lg shadow-xl pointer-events-auto w-full ${sizeClasses[size]} overflow-hidden`}
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {/* Header */}
              <div className="p-4 sm:p-6">
                <h3 className="text-h4 font-semibold text-text">{title}</h3>
                {description && (
                  <p className="mt-2 text-muted">{description}</p>
                )}
              </div>
              
              {/* Content */}
              <div className="px-4 sm:px-6 py-2">
                {children}
              </div>
              
              {/* Footer */}
              <div className="p-4 sm:p-6 border-t border-border bg-surface/50 flex justify-end gap-3">
                <Button variant="outline" onClick={onClose}>
                  {cancelLabel}
                </Button>
                {onConfirm && (
                  <Button 
                    onClick={handleConfirm} 
                    disabled={confirmDisabled}
                  >
                    {confirmLabel}
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Dialog;
