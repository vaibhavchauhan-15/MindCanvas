import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { motion } from 'framer-motion';

interface MindNodeData {
  title: string;
  content?: string;
  color?: string;
}

const MindNode: React.FC<NodeProps<MindNodeData>> = ({ data, selected }) => {
  const nodeColor = data.color || 'primary';
  
  return (
    <motion.div
      className={`relative p-1 rounded-2xl shadow-md node-shadow transition-all duration-200 bg-card border-2 ${
        selected ? `border-${nodeColor}` : 'border-border/50'
      }`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      aria-selected={selected}
      role="treeitem"
    >
      <div className="p-3 rounded-xl">
        <h3 className="text-h6 font-semibold text-text" title={data.title}>
          {data.title}
        </h3>
        {data.content && (
          <p className="text-sm text-muted mt-1 line-clamp-3" title={data.content}>
            {data.content}
          </p>
        )}
      </div>
      
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-3 h-3 bg-surface border-2 border-primary" 
        aria-label="Input connection point"
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-3 h-3 bg-surface border-2 border-primary" 
        aria-label="Output connection point"
      />
    </motion.div>
  );
};

export default memo(MindNode);
