import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../../types';
import { Card, Button } from './index';

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
  onDelete: (projectId: string, e: React.MouseEvent) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpen, onDelete }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={() => onOpen(project)}
      className="cursor-pointer"
    >
      <Card className="h-full flex flex-col p-0 overflow-hidden">
        {/* Card Header with Preview */}
        <div className="h-32 bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center p-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 flex items-center justify-center">
            <span className="text-4xl text-primary font-bold">
              {project.title.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
        
        {/* Card Content */}
        <div className="p-4 flex-grow">
          <h3 className="text-h5 font-semibold mb-2 text-text line-clamp-1">
            {project.title}
          </h3>
          {project.description && (
            <p className="text-muted text-sm mb-4 line-clamp-2">
              {project.description}
            </p>
          )}
          
          <div className="flex items-center text-xs text-muted mt-auto">
            <span>
              Created: {new Date(project.createdAt).toLocaleDateString()}
            </span>
            {project.updatedAt && project.updatedAt !== project.createdAt && (
              <span className="ml-4">
                Updated: {new Date(project.updatedAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
        
        {/* Card Actions */}
        <div className="border-t border-border p-3 bg-surface/50 flex justify-between items-center">
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onOpen(project);
            }}
          >
            Open
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="text-error hover:bg-error/10"
            onClick={(e) => onDelete(project.id, e)}
          >
            Delete
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
