import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button, Input } from '../ui/design-system';
import { useTheme } from '../ui/theme';

interface CanvasSidebarProps {
  nodes: Array<{ id: string; data: { title?: string; label?: string; content?: string }; position: { x: number; y: number } }>;
  onNodeSelect: (nodeId: string) => void;
  onSidebarClose?: () => void;
  onExport?: () => void;
  onImport?: () => void;
  className?: string;
}

const CanvasSidebar: React.FC<CanvasSidebarProps> = ({
  nodes,
  onNodeSelect,
  onSidebarClose,
  onExport,
  onImport,
  className = '',
}) => {
  const { mode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'nodes' | 'settings'>('nodes');
  
  const sidebarAnimation = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      }
    },
    exit: { 
      opacity: 0, 
      x: -40,
      transition: {
        duration: 0.2
      }
    }
  };
  
  const tabAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.2,
        duration: 0.3 
      }
    }
  };

  const filteredNodes = nodes.filter(node => {
    const nodeTitle = node.data.title || node.data.label || '';
    return nodeTitle.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <motion.aside
      className={`w-64 bg-surface border-r border-border/50 h-full flex flex-col ${className}`}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={sidebarAnimation}
      role="complementary"
      aria-label="Canvas sidebar"
    >
      <div className="p-4 border-b border-border/50 flex items-center justify-between">
        <h2 className="text-lg font-medium text-text">Mind Canvas</h2>
        {onSidebarClose && (
          <Button
            variant="outline"
            size="sm"
            className="p-1"
            onClick={onSidebarClose}
            aria-label="Close sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        )}
      </div>
      
      <div className="flex border-b border-border/50">
        <button
          className={`flex-1 py-2 px-4 text-sm font-medium ${
            activeTab === 'nodes' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-text hover:text-primary'
          }`}
          onClick={() => setActiveTab('nodes')}
          aria-selected={activeTab === 'nodes'}
          role="tab"
          id="nodes-tab"
          aria-controls="nodes-panel"
        >
          Nodes
        </button>
        <button
          className={`flex-1 py-2 px-4 text-sm font-medium ${
            activeTab === 'settings' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-text hover:text-primary'
          }`}
          onClick={() => setActiveTab('settings')}
          aria-selected={activeTab === 'settings'}
          role="tab"
          id="settings-tab"
          aria-controls="settings-panel"
        >
          Settings
        </button>
      </div>
      
      <div className="p-3">
        <Input
          type="text"
          placeholder="Search nodes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
          aria-label="Search nodes"
        />
      </div>
      
      <AnimatePresence mode="wait">
        {activeTab === 'nodes' ? (
          <motion.div
            key="nodes"
            variants={tabAnimation}
            initial="hidden"
            animate="visible"
            className="flex-1 overflow-y-auto p-3"
            role="tabpanel"
            id="nodes-panel"
            aria-labelledby="nodes-tab"
          >
            {filteredNodes.length > 0 ? (
              <ul className="space-y-2">
                {filteredNodes.map((node) => (
                  <li key={node.id}>
                    <button
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-primary/10 focus:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
                      onClick={() => onNodeSelect(node.id)}
                      aria-label={`Select node: ${node.data.label}`}
                    >
                      <div className="font-medium text-text truncate">{node.data.title || node.data.label || 'Untitled'}</div>
                      <div className="text-xs text-text/70">
                        ID: {node.id.substring(0, 8)}...
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 text-text/70">
                {searchTerm ? 'No nodes match your search' : 'No nodes in canvas'}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="settings"
            variants={tabAnimation}
            initial="hidden"
            animate="visible"
            className="flex-1 overflow-y-auto p-3"
            role="tabpanel"
            id="settings-panel"
            aria-labelledby="settings-tab"
          >
            <Card className="p-4 mb-3">
              <h3 className="text-sm font-medium mb-3">Canvas Actions</h3>
              <div className="space-y-2">
                {onExport && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={onExport}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Export Canvas
                  </Button>
                )}
                {onImport && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={onImport}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Import Canvas
                  </Button>
                )}
              </div>
            </Card>
            
            <Card className="p-4">
              <h3 className="text-sm font-medium mb-3">Canvas Information</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-text/70">Total Nodes:</span>
                  <span className="font-medium">{nodes.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text/70">Created:</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text/70">Last Modified:</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};

export default CanvasSidebar;
