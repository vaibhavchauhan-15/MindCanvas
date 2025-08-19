import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ReactFlow, {
  Background,
  Connection,
  Edge,
  Node,
  NodeTypes,
  Panel,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useAppStore } from '../store';
import { useCanvasKeyboardControls } from '../hooks/useCanvasKeyboardShortcuts';
import { useCanvasAnimations } from '../hooks/useCanvasAnimations';
import CanvasToolbar from '../components/canvas/CanvasToolbar';
import CanvasSidebar from '../components/canvas/CanvasSidebar';
import CanvasControls from '../components/canvas/CanvasControls';
import MindNode from '../components/nodes/MindNode';
import NodeEditDialog from '../components/nodes/NodeEditDialog';
import { Button, Dialog } from '../components/ui/design-system';
import KeyboardShortcutsHelp from '../components/canvas/KeyboardShortcutsHelp';
import { useTheme } from '../components/ui/theme';

// Additional imports...
const nodeTypes: NodeTypes = {
  mindNode: MindNode,
};

const Canvas: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { mode } = useTheme();
  const { 
    currentProject, 
    projects, 
    setCurrentProject, 
    addNode, 
    updateNodePosition,
    updateConnection,
    deleteNode,
    deleteConnection
  } = useAppStore();

  // ReactFlow states
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Get ReactFlow instance for programmatic control
  const reactFlowInstance = useReactFlow();

  // Get animation presets
  const { uiAnimations, viewAnimations } = useCanvasAnimations();

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
        type: 'mindNode',
        position: node.position,
        data: {
          title: node.title,
          content: node.content,
          color: node.color || (mode === 'dark' ? '#3b82f6' : '#2563eb'),
        },
        // Pass accessibility attributes and data-testid
        dragHandle: '.node-drag-handle',
      }));
      setNodes(flowNodes);

      const flowEdges: Edge[] = currentProject.connections.map(conn => ({
        id: conn.id,
        source: conn.sourceNodeId,
        target: conn.targetNodeId,
        label: conn.label,
        // Use CSS variables to respect the theme
        style: { 
          stroke: conn.color || 'var(--color-primary)', 
          strokeWidth: 2,
        },
        animated: conn.animated || false,
        // Add accessibility attributes
        ariaLabel: `Connection from ${conn.sourceNodeId} to ${conn.targetNodeId}${conn.label ? ': ' + conn.label : ''}`,
      }));
      setEdges(flowEdges);
    }
  }, [currentProject, setNodes, setEdges, mode]);

  // Handle node selection
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  // Handle edge selection
  const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    setSelectedEdge(edge);
  }, []);

  // Clear selection when clicking on the canvas
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setSelectedEdge(null);
  }, []);

  // Handle connection creation
  const onConnect = useCallback(
    (params: Connection) => {
      // Create a unique ID for the connection
      const newConnection = {
        id: `edge-${Date.now()}`,
        sourceNodeId: params.source || '',
        targetNodeId: params.target || '',
        label: '',
        color: 'var(--color-primary)',
        animated: false,
      };
      
      if (currentProject) {
        // Update app store
        updateConnection(newConnection);
        // Update the edges state
        setEdges((eds) => addEdge({
          ...params,
          id: newConnection.id,
          style: { stroke: 'var(--color-primary)', strokeWidth: 2 },
        }, eds));
      }
    },
    [currentProject, setEdges, updateConnection]
  );

  // Handle node position updates
  const onNodeDragStop = useCallback(
    (event: React.MouseEvent, node: Node) => {
      if (currentProject) {
        updateNodePosition(node.id, node.position);
      }
    },
    [currentProject, updateNodePosition]
  );

  // Handle adding a new node
  const handleAddNode = useCallback(() => {
    if (currentProject) {
      // Get the current viewport to add the node in a visible area
      const { x, y, zoom } = reactFlowInstance.getViewport();
      
      // Calculate a visible position based on the viewport
      const position = {
        x: (-x + window.innerWidth / 2 - 100) / zoom,
        y: (-y + window.innerHeight / 2 - 100) / zoom,
      };
      
      const newNodeData = {
        type: 'note' as const,
        position,
        size: { width: 200, height: 100 },
        title: 'New Note',
        content: 'Click to edit...',
        color: mode === 'dark' ? '#3b82f6' : '#2563eb',
      };
      
      addNode(newNodeData);
    }
  }, [currentProject, addNode, reactFlowInstance, mode]);

  // Handle deleting a node or edge
  const handleDelete = useCallback(() => {
    if (selectedNode) {
      deleteNode(selectedNode.id);
      setSelectedNode(null);
    } else if (selectedEdge) {
      deleteConnection(selectedEdge.id);
      setSelectedEdge(null);
    }
  }, [selectedNode, selectedEdge, deleteNode, deleteConnection]);

  // Handle zooming in
  const handleZoomIn = useCallback(() => {
    const { zoom } = reactFlowInstance.getViewport();
    reactFlowInstance.setViewport({ 
      ...reactFlowInstance.getViewport(),
      zoom: zoom + 0.2
    });
  }, [reactFlowInstance]);
  
  // Handle zooming out
  const handleZoomOut = useCallback(() => {
    const { zoom } = reactFlowInstance.getViewport();
    reactFlowInstance.setViewport({ 
      ...reactFlowInstance.getViewport(),
      zoom: Math.max(0.2, zoom - 0.2)
    });
  }, [reactFlowInstance]);
  
  // Handle resetting the view
  const handleResetView = useCallback(() => {
    reactFlowInstance.fitView({ duration: 800 });
  }, [reactFlowInstance]);

  // Handle saving the canvas
  const handleSave = useCallback(() => {
    // For now, just show a success message
    // In a real implementation, we would trigger a save operation in the store
    console.log('Canvas saved successfully!');
  }, []);

  // Set up keyboard shortcuts
  const { shortcutHelp } = useCanvasKeyboardControls({
    onAddNode: handleAddNode,
    onDelete: handleDelete,
    onZoomIn: handleZoomIn,
    onZoomOut: handleZoomOut,
    onResetView: handleResetView,
    onSave: handleSave,
    enabled: true,
  });

  // Handle node edit dialog
  const handleEditNode = useCallback(() => {
    if (selectedNode) {
      setIsEditDialogOpen(true);
    }
  }, [selectedNode]);

  // Handle node edit completion
  const handleEditComplete = useCallback((data: { title: string; content: string; color: string }) => {
    if (selectedNode && currentProject) {
      // Update the node in the app store
      // This would require adding a new function to the store
      console.log('Node updated:', { id: selectedNode.id, ...data });
      
      // Close the dialog
      setIsEditDialogOpen(false);
    }
  }, [selectedNode, currentProject]);

  if (!currentProject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-xl font-semibold text-text">
            Project not found
          </h2>
          <Button
            variant="primary"
            size="md"
            className="mt-4"
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between p-4 bg-surface/90 backdrop-blur-xl border-b border-border/50"
        initial="initial"
        animate="animate"
        variants={uiAnimations.toolbar}
      >
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="p-2 aspect-square"
            onClick={() => navigate('/dashboard')}
            aria-label="Back to dashboard"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-text">
              {currentProject?.title || "Untitled Project"}
            </h1>
            {currentProject?.description && (
              <p className="text-sm text-text/70">
                {currentProject.description}
              </p>
            )}
          </div>
        </div>
        
        {/* Toggle sidebar button */}
        <Button
          variant="outline"
          size="sm"
          className="mr-2"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label={isSidebarOpen ? "Hide sidebar" : "Show sidebar"}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={isSidebarOpen 
                ? "M4 6h16M4 12h10M4 18h16" 
                : "M4 6h16M4 12h16M4 18h16"} 
            />
          </svg>
        </Button>
      </motion.div>

      {/* Canvas Container */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <CanvasSidebar
              nodes={nodes.map(node => ({
                id: node.id,
                data: {
                  title: node.data.title,
                  content: node.data.content
                },
                position: node.position
              }))}
              onNodeSelect={(nodeId) => {
                const node = nodes.find(n => n.id === nodeId);
                if (node) {
                  setSelectedNode(node);
                  // Center the view on the selected node
                  reactFlowInstance.setCenter(node.position.x, node.position.y, { duration: 800 });
                }
              }}
              onSidebarClose={() => setIsSidebarOpen(false)}
              onExport={() => console.log('Export')}
              onImport={() => console.log('Import')}
            />
          )}
        </AnimatePresence>
        
        {/* Main Flow Area */}
        <motion.div
          className="flex-1 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            onPaneClick={onPaneClick}
            onConnect={onConnect}
            onNodeDragStop={onNodeDragStop}
            defaultViewport={{
              x: currentProject?.viewState?.pan?.x || 0,
              y: currentProject?.viewState?.pan?.y || 0,
              zoom: currentProject?.viewState?.zoom || 1
            }}
            fitView
            className="bg-background/50 dark:bg-background-dark/80"
            proOptions={{ hideAttribution: true }}
          >
            <Background color="var(--color-primary)" gap={20} size={1} className="opacity-10" />
            
            {/* Toolbar Panel */}
            <Panel position="top-center" className="mt-4">
              <CanvasToolbar
                onAddNode={handleAddNode}
                onSave={handleSave}
                onUndo={() => console.log('Undo')}
                onRedo={() => console.log('Redo')}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onResetView={handleResetView}
              />
            </Panel>
            
            {/* Node Controls Panel - Shown only when a node is selected */}
            <AnimatePresence>
              {selectedNode && (
                <Panel position="bottom-center" className="mb-4">
                  <CanvasControls
                    onConnect={() => console.log('Connect')}
                    onDelete={handleDelete}
                    onDuplicate={() => console.log('Duplicate')}
                    onGroup={() => console.log('Group')}
                    onUngroup={() => console.log('Ungroup')}
                    disableConnect={!selectedNode}
                    disableDelete={!selectedNode && !selectedEdge}
                  />
                </Panel>
              )}
            </AnimatePresence>
            
            {/* Help Panel */}
            <Panel position="bottom-right" className="mr-4 mb-4">
              <KeyboardShortcutsHelp shortcuts={shortcutHelp} />
            </Panel>
          </ReactFlow>

          {/* Node Edit Dialog */}
          <Dialog
            isOpen={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
            title="Edit Node"
          >
            {selectedNode && (
              <NodeEditDialog
                initialTitle={selectedNode.data.title || ''}
                initialContent={selectedNode.data.content || ''}
                initialColor={selectedNode.data.color || '#3b82f6'}
                onSave={handleEditComplete}
                onCancel={() => setIsEditDialogOpen(false)}
              />
            )}
          </Dialog>
        </motion.div>
      </div>
    </div>
  );
};

export default Canvas;
