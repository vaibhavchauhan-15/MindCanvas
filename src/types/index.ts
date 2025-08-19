export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface NodeData {
  id: string;
  type: NodeType;
  position: Position;
  size: Size;
  title: string;
  content: string;
  color?: string;
  isSelected?: boolean;
  isEditing?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type NodeType = 'note' | 'task' | 'media' | 'chart';

export interface TaskNodeData extends NodeData {
  type: 'task';
  isCompleted: boolean;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
}

export interface MediaNodeData extends NodeData {
  type: 'media';
  mediaUrl: string;
  mediaType: 'image' | 'video';
  caption?: string;
}

export interface ChartNodeData extends NodeData {
  type: 'chart';
  chartType: 'bar' | 'line' | 'pie' | 'doughnut';
  chartData: any; // Will be defined based on chart library
}

export interface Connection {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  label?: string;
  color?: string;
  style?: 'solid' | 'dashed' | 'dotted';
  animated?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  nodes: NodeData[];
  connections: Connection[];
  viewState: {
    zoom: number;
    pan: Position;
  };
  theme: 'light' | 'dark';
  createdAt: Date;
  updatedAt: Date;
}

export interface AppState {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  error: string | null;
}

export interface CanvasState {
  nodes: NodeData[];
  connections: Connection[];
  selectedNodes: string[];
  selectedConnections: string[];
  zoom: number;
  pan: Position;
  isDragging: boolean;
  isConnecting: boolean;
  dragStart?: Position;
  tempConnection?: {
    sourceNodeId: string;
    currentPosition: Position;
  };
}
