import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppStore } from '../store';
import { Project } from '../types';
import { Button, ProjectCard, Dialog, Input } from '../components/ui/design-system';
import { ThemeSwitcher } from '../components/ui/theme';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { projects, createProject, deleteProject, setCurrentProject } = useAppStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');

  const handleCreateProject = () => {
    if (newProjectTitle.trim()) {
      createProject(newProjectTitle.trim(), newProjectDescription.trim() || undefined);
      setNewProjectTitle('');
      setNewProjectDescription('');
      setShowCreateModal(false);
      // Navigate to the newly created project
      navigate(`/canvas`);
    }
  };

  const handleOpenProject = (project: Project) => {
    setCurrentProject(project);
    navigate(`/canvas/${project.id}`);
  };

  const handleDeleteProject = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteProject(projectId);
    }
  };

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-h3 font-bold gradient-text">MindCanvas</h1>
          <div className="flex items-center gap-4">
            <a href="/design-system" className="text-sm text-muted hover:text-text underline focus-ring p-1 rounded">
              Design System
            </a>
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-h2 font-bold mb-2">Your Knowledge Maps</h2>
          <p className="text-muted">
            Create and manage your interactive mind maps
          </p>
        </motion.div>

        {/* Create New Project Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Button
            variant="primary"
            size="lg"
            className="flex items-center gap-2"
            onClick={() => setShowCreateModal(true)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Map
          </Button>
        </motion.div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-6 text-muted text-8xl"></div>
            <h3 className="text-h4 font-semibold mb-2">No projects yet</h3>
            <p className="text-muted mb-6">Start by creating your first knowledge map</p>
            <Button onClick={() => setShowCreateModal(true)}>Create New Map</Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                <ProjectCard
                  project={project}
                  onOpen={handleOpenProject}
                  onDelete={handleDeleteProject}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Create Project Dialog */}
      <Dialog
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Knowledge Map"
        description="Give your map a name and optional description to get started."
        confirmLabel="Create Map"
        onConfirm={handleCreateProject}
        confirmDisabled={!newProjectTitle.trim()}
      >
        <div className="space-y-4">
          <Input
            label="Project Title"
            placeholder="Enter a title for your map"
            value={newProjectTitle}
            onChange={(e) => setNewProjectTitle(e.target.value)}
          />
          <Input
            label="Description (optional)"
            placeholder="Describe the purpose of this map"
            value={newProjectDescription}
            onChange={(e) => setNewProjectDescription(e.target.value)}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default Dashboard;
