import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AppState, Project, NodeData, Connection, Position } from '../types';
import { generateUUID } from '../utils/uuid';

interface AppStore extends AppState {
  // Project actions
  createProject: (title: string, description?: string) => void;
  deleteProject: (projectId: string) => void;
  setCurrentProject: (project: Project | null) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  
  // Node actions
  addNode: (node: Omit<NodeData, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNode: (nodeId: string, updates: Partial<NodeData>) => void;
  deleteNode: (nodeId: string) => void;
  selectNode: (nodeId: string, multi?: boolean) => void;
  deselectAllNodes: () => void;
  
  // Connection actions
  addConnection: (connection: Omit<Connection, 'id'>) => void;
  updateConnection: (connectionId: string, updates: Partial<Connection>) => void;
  deleteConnection: (connectionId: string) => void;
  
  // Canvas actions
  setZoom: (zoom: number) => void;
  setPan: (pan: Position) => void;
  updateViewState: (zoom: number, pan: Position) => void;
  
  // Theme actions
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  
  // UI actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        projects: [],
        currentProject: null,
        isLoading: false,
        error: null,
        
        // Project actions
        createProject: (title: string, description?: string) => {
          const newProject: Project = {
            id: generateUUID(),
            title,
            description,
            nodes: [],
            connections: [],
            viewState: { zoom: 1, pan: { x: 0, y: 0 } },
            theme: 'light',
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          
          set((state) => ({
            projects: [...state.projects, newProject],
            currentProject: newProject,
          }));
        },
        
        deleteProject: (projectId: string) => {
          set((state) => ({
            projects: state.projects.filter(p => p.id !== projectId),
            currentProject: state.currentProject?.id === projectId ? null : state.currentProject,
          }));
        },
        
        setCurrentProject: (project: Project | null) => {
          set({ currentProject: project });
        },
        
        updateProject: (projectId: string, updates: Partial<Project>) => {
          set((state) => ({
            projects: state.projects.map(p => 
              p.id === projectId 
                ? { ...p, ...updates, updatedAt: new Date() }
                : p
            ),
            currentProject: state.currentProject?.id === projectId 
              ? { ...state.currentProject, ...updates, updatedAt: new Date() }
              : state.currentProject,
          }));
        },
        
        // Node actions
        addNode: (nodeData) => {
          const newNode: NodeData = {
            ...nodeData,
            id: generateUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          
          const { currentProject } = get();
          if (!currentProject) return;
          
          const updatedProject = {
            ...currentProject,
            nodes: [...currentProject.nodes, newNode],
            updatedAt: new Date(),
          };
          
          get().updateProject(currentProject.id, updatedProject);
        },
        
        updateNode: (nodeId: string, updates: Partial<NodeData>) => {
          const { currentProject } = get();
          if (!currentProject) return;
          
          const updatedNodes = currentProject.nodes.map(node =>
            node.id === nodeId 
              ? { ...node, ...updates, updatedAt: new Date() }
              : node
          );
          
          get().updateProject(currentProject.id, { nodes: updatedNodes });
        },
        
        deleteNode: (nodeId: string) => {
          const { currentProject } = get();
          if (!currentProject) return;
          
          const updatedNodes = currentProject.nodes.filter(node => node.id !== nodeId);
          const updatedConnections = currentProject.connections.filter(
            conn => conn.sourceNodeId !== nodeId && conn.targetNodeId !== nodeId
          );
          
          get().updateProject(currentProject.id, { 
            nodes: updatedNodes,
            connections: updatedConnections 
          });
        },
        
        selectNode: (nodeId: string, multi = false) => {
          const { currentProject } = get();
          if (!currentProject) return;
          
          const updatedNodes = currentProject.nodes.map(node => ({
            ...node,
            isSelected: multi 
              ? node.id === nodeId ? !node.isSelected : node.isSelected
              : node.id === nodeId
          }));
          
          get().updateProject(currentProject.id, { nodes: updatedNodes });
        },
        
        deselectAllNodes: () => {
          const { currentProject } = get();
          if (!currentProject) return;
          
          const updatedNodes = currentProject.nodes.map(node => ({
            ...node,
            isSelected: false
          }));
          
          get().updateProject(currentProject.id, { nodes: updatedNodes });
        },
        
        // Connection actions
        addConnection: (connectionData) => {
          const newConnection: Connection = {
            ...connectionData,
            id: generateUUID(),
          };
          
          const { currentProject } = get();
          if (!currentProject) return;
          
          const updatedProject = {
            ...currentProject,
            connections: [...currentProject.connections, newConnection],
            updatedAt: new Date(),
          };
          
          get().updateProject(currentProject.id, updatedProject);
        },
        
        updateConnection: (connectionId: string, updates: Partial<Connection>) => {
          const { currentProject } = get();
          if (!currentProject) return;
          
          const updatedConnections = currentProject.connections.map(conn =>
            conn.id === connectionId ? { ...conn, ...updates } : conn
          );
          
          get().updateProject(currentProject.id, { connections: updatedConnections });
        },
        
        deleteConnection: (connectionId: string) => {
          const { currentProject } = get();
          if (!currentProject) return;
          
          const updatedConnections = currentProject.connections.filter(
            conn => conn.id !== connectionId
          );
          
          get().updateProject(currentProject.id, { connections: updatedConnections });
        },
        
        // Canvas actions
        setZoom: (zoom: number) => {
          const { currentProject } = get();
          if (!currentProject) return;
          
          get().updateProject(currentProject.id, {
            viewState: { ...currentProject.viewState, zoom }
          });
        },
        
        setPan: (pan: Position) => {
          const { currentProject } = get();
          if (!currentProject) return;
          
          get().updateProject(currentProject.id, {
            viewState: { ...currentProject.viewState, pan }
          });
        },
        
        updateViewState: (zoom: number, pan: Position) => {
          const { currentProject } = get();
          if (!currentProject) return;
          
          get().updateProject(currentProject.id, {
            viewState: { zoom, pan }
          });
        },
        
        // Theme actions
        toggleTheme: () => {
          const { currentProject } = get();
          if (!currentProject) return;
          
          const newTheme = currentProject.theme === 'light' ? 'dark' : 'light';
          get().updateProject(currentProject.id, { theme: newTheme });
        },
        
        setTheme: (theme: 'light' | 'dark') => {
          const { currentProject } = get();
          if (!currentProject) return;
          
          get().updateProject(currentProject.id, { theme });
        },
        
        // UI actions
        setLoading: (loading: boolean) => {
          set({ isLoading: loading });
        },
        
        setError: (error: string | null) => {
          set({ error });
        },
      }),
      {
        name: 'mindcanvas-storage',
        partialize: (state) => ({
          projects: state.projects,
          currentProject: state.currentProject,
        }),
      }
    ),
    {
      name: 'mindcanvas-store',
    }
  )
);
