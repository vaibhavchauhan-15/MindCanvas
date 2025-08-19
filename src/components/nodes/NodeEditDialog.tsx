import React, { useState } from 'react';
import { Button, Input } from '../ui/design-system';
import { useTheme } from '../ui/theme';

interface NodeEditDialogProps {
  initialTitle: string;
  initialContent: string;
  initialColor?: string;
  onSave: (data: { title: string; content: string; color: string }) => void;
  onCancel: () => void;
}

const NodeEditDialog: React.FC<NodeEditDialogProps> = ({
  initialTitle,
  initialContent,
  initialColor = '#3b82f6',
  onSave,
  onCancel,
}) => {
  const { mode } = useTheme();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [color, setColor] = useState(initialColor);

  const colorOptions = [
    { label: 'Blue', value: mode === 'dark' ? '#3b82f6' : '#2563eb' },
    { label: 'Green', value: mode === 'dark' ? '#10b981' : '#059669' },
    { label: 'Purple', value: mode === 'dark' ? '#8b5cf6' : '#7c3aed' },
    { label: 'Red', value: mode === 'dark' ? '#ef4444' : '#dc2626' },
    { label: 'Amber', value: mode === 'dark' ? '#f59e0b' : '#d97706' },
    { label: 'Pink', value: mode === 'dark' ? '#ec4899' : '#db2777' },
  ];

  const handleSave = () => {
    if (title.trim()) {
      onSave({
        title: title.trim(),
        content: content.trim(),
        color,
      });
    }
  };

  return (
    <div className="space-y-4 p-2">
      <Input
        label="Title"
        placeholder="Node title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-required="true"
      />
      
      <div>
        <label htmlFor="node-content" className="block text-sm font-medium text-text mb-1">
          Content
        </label>
        <textarea
          id="node-content"
          className="w-full px-4 py-2 bg-surface border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px]"
          placeholder="Node content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          aria-label="Node content"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-text mb-1">
          Node Color
        </label>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`w-8 h-8 rounded-full transition-transform ${
                color === option.value ? 'ring-2 ring-offset-2 ring-primary scale-110' : ''
              }`}
              style={{ backgroundColor: option.value }}
              onClick={() => setColor(option.value)}
              aria-label={`Set color to ${option.label}`}
              aria-pressed={color === option.value}
            />
          ))}
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSave}
          disabled={!title.trim()}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default NodeEditDialog;
