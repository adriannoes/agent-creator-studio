import { useCallback, useState, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
  ReactFlowInstance,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { nodeTypes } from './nodes';
import CanvasSidebar from './CanvasSidebar';
import CanvasToolbar from './CanvasToolbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Code, Play, Pencil } from 'lucide-react';

const initialNodes: Node[] = [
  {
    id: 'start-1',
    type: 'start',
    position: { x: 100, y: 200 },
    data: { label: 'Start' },
  },
];

const initialEdges: Edge[] = [];

const AgentCanvas = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [mode, setMode] = useState<'pan' | 'select'>('select');
  const [agentName, setAgentName] = useState('My Agent');
  const [isEditingName, setIsEditingName] = useState(false);

  // History for undo/redo
  const [history, setHistory] = useState<{ nodes: Node[]; edges: Edge[] }[]>([{ nodes: initialNodes, edges: initialEdges }]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const saveToHistory = useCallback((newNodes: Node[], newEdges: Edge[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ nodes: newNodes, edges: newEdges });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdges = addEdge(
        {
          ...params,
          style: { stroke: 'hsl(var(--muted-foreground))', strokeWidth: 2 },
          animated: true,
        },
        edges
      );
      setEdges(newEdges);
      saveToHistory(nodes, newEdges);
    },
    [edges, nodes, setEdges, saveToHistory]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const data = event.dataTransfer.getData('application/reactflow');
      if (!data || !reactFlowInstance || !reactFlowWrapper.current) return;

      const { type, label } = JSON.parse(data);
      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { label },
      };

      const newNodes = [...nodes, newNode];
      setNodes(newNodes);
      saveToHistory(newNodes, edges);
    },
    [reactFlowInstance, nodes, edges, setNodes, saveToHistory]
  );

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setNodes(history[newIndex].nodes);
      setEdges(history[newIndex].edges);
    }
  }, [historyIndex, history, setNodes, setEdges]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setNodes(history[newIndex].nodes);
      setEdges(history[newIndex].edges);
    }
  }, [historyIndex, history, setNodes, setEdges]);

  return (
    <div className="flex h-screen bg-[hsl(var(--canvas-bg))]">
      <CanvasSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-14 border-b border-border flex items-center justify-between px-4 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            {isEditingName ? (
              <Input
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                onBlur={() => setIsEditingName(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                className="w-48 h-8 text-lg font-semibold bg-background"
                autoFocus
              />
            ) : (
              <button
                onClick={() => setIsEditingName(true)}
                className="flex items-center gap-2 text-lg font-semibold hover:text-primary transition-colors"
              >
                {agentName}
                <Pencil className="w-4 h-4 opacity-50" />
              </button>
            )}
            <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
              v1.0
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Code className="w-4 h-4" />
              Code
            </Button>
            <Button size="sm" className="gap-2">
              <Play className="w-4 h-4" />
              Preview
            </Button>
          </div>
        </div>

        {/* Canvas */}
        <div ref={reactFlowWrapper} className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            panOnDrag={mode === 'pan'}
            selectionOnDrag={mode === 'select'}
            colorMode="dark"
            fitView
            defaultEdgeOptions={{
              style: { stroke: 'hsl(var(--muted-foreground))', strokeWidth: 2 },
              animated: true,
            }}
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={20}
              size={1}
              color="hsl(var(--canvas-grid))"
            />
            <Controls className="!bg-card !border-border !shadow-lg [&>button]:!bg-card [&>button]:!border-border [&>button]:!text-foreground [&>button:hover]:!bg-muted" />
            <MiniMap
              className="!bg-card !border-border"
              nodeColor={(node) => {
                switch (node.type) {
                  case 'start': return 'hsl(142, 76%, 36%)';
                  case 'end': return 'hsl(220, 10%, 40%)';
                  case 'agent': return 'hsl(43, 89%, 60%)';
                  case 'tool': return 'hsl(142, 69%, 58%)';
                  case 'condition': return 'hsl(24, 85%, 60%)';
                  case 'note': return 'hsl(174, 58%, 39%)';
                  case 'guardrail': return 'hsl(199, 89%, 48%)';
                  default: return 'hsl(var(--muted))';
                }
              }}
            />
          </ReactFlow>

          <CanvasToolbar
            mode={mode}
            onModeChange={setMode}
            onUndo={handleUndo}
            onRedo={handleRedo}
            canUndo={historyIndex > 0}
            canRedo={historyIndex < history.length - 1}
          />
        </div>
      </div>
    </div>
  );
};

export default AgentCanvas;
