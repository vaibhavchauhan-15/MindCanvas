import React, { useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  Viewport,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useAppStore } from '../store';

const Canvas: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { currentProject, projects, setCurrentProject, addNode } = useAppStore();
  
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Load project on mount
  useEffect(() => {
    if (projectId) {
      const project = projects.find(p => p.id === projectId);
      if (project) {
        setCurrentProject(project);
      } else {
        navigate('/dashboard');
      }
    } else if (!currentProject) {
      navigate('/dashboard');
    }
  }, [projectId, projects, currentProject, setCurrentProject, navigate]);

  // Convert project nodes to ReactFlow nodes
  useEffect(() => {
    if (currentProject) {
      const flowNodes: Node[] = currentProject.nodes.map(node => ({
        id: node.id,
        type: 'default',
        position: node.position,
        data: {
          label: (
            <div className="px-4 py-2 bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="font-semibold text-gray-800">{node.title}</div>
              {node.content && (
                <div className="text-sm text-gray-600 mt-1">{node.content}</div>
              )}
            </div>
          ),
        },
      }));
      setNodes(flowNodes);

      const flowEdges: Edge[] = currentProject.connections.map(conn => ({
        id: conn.id,
        source: conn.sourceNodeId,
        target: conn.targetNodeId,
        label: conn.label,
        style: { stroke: conn.color || '#3b82f6' },
        animated: conn.animated || false,
      }));
      setEdges(flowEdges);
    }
  }, [currentProject, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleAddNode = () => {
    if (currentProject) {
      const newNodeData = {
        type: 'note' as const,
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        size: { width: 200, height: 100 },
        title: 'New Note',
        content: 'Click to edit...',
      };
      addNode(newNodeData);
    }
  };

  if (!currentProject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Project not found
          </h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between p-4 bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-white/20 dark:hover:bg-gray-800/20 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {currentProject?.title || "Untitled Project"}
            </h1>
            {currentProject?.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {currentProject.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAddNode}
            className="px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Node
          </button>
        </div>
      </motion.div>

      {/* Canvas */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          defaultViewport={{
            x: currentProject?.viewState?.pan?.x || 0,
            y: currentProject?.viewState?.pan?.y || 0,
            zoom: currentProject?.viewState?.zoom || 1
          }}
          fitView
          className="bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900"
        >
          <Controls className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/20" />
          <Background color="#3b82f6" gap={20} size={1} className="opacity-20" />
        </ReactFlow>
      </motion.div>
    </div>
  );
};

export default Canvas;
