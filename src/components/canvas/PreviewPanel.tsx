import { useState, useCallback, useRef } from 'react';
import { Node, Edge } from '@xyflow/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Play, Pause, RotateCcw, X, CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { WorkflowSimulator, SimulationStep, SimulationStatus, NodeStatus } from '@/lib/workflowSimulator';

interface PreviewPanelProps {
  open: boolean;
  onClose: () => void;
  nodes: Node[];
  edges: Edge[];
  onNodeStatusChange: (statuses: Map<string, NodeStatus>) => void;
  onCurrentNodeChange: (nodeId: string | null) => void;
}

const PreviewPanel = ({
  open,
  onClose,
  nodes,
  edges,
  onNodeStatusChange,
  onCurrentNodeChange,
}: PreviewPanelProps) => {
  const [userInput, setUserInput] = useState('Hello, how can you help me?');
  const [status, setStatus] = useState<SimulationStatus>('idle');
  const [steps, setSteps] = useState<SimulationStep[]>([]);
  const [finalOutput, setFinalOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const simulatorRef = useRef<WorkflowSimulator | null>(null);

  const handleStart = useCallback(() => {
    setSteps([]);
    setFinalOutput(null);
    setError(null);
    setStatus('running');

    const nodeStatuses = new Map<string, NodeStatus>();
    nodes.forEach(n => nodeStatuses.set(n.id, 'pending'));
    onNodeStatusChange(nodeStatuses);

    const simulator = new WorkflowSimulator(
      nodes,
      edges,
      {
        onNodeEnter: (nodeId) => {
          onCurrentNodeChange(nodeId);
          const newStatuses = new Map(simulatorRef.current?.getState().nodeStatuses);
          onNodeStatusChange(newStatuses);
        },
        onNodeComplete: (nodeId, output) => {
          const newStatuses = new Map(simulatorRef.current?.getState().nodeStatuses);
          onNodeStatusChange(newStatuses);
        },
        onStepAdded: (step) => {
          setSteps(prev => [...prev, step]);
        },
        onComplete: (output) => {
          setStatus('completed');
          setFinalOutput(output);
          onCurrentNodeChange(null);
        },
        onError: (err) => {
          setStatus('error');
          setError(err);
          onCurrentNodeChange(null);
        },
      },
      800
    );

    simulatorRef.current = simulator;
    simulator.start(userInput);
  }, [nodes, edges, userInput, onNodeStatusChange, onCurrentNodeChange]);

  const handlePause = useCallback(() => {
    if (status === 'running') {
      simulatorRef.current?.pause();
      setStatus('paused');
    } else if (status === 'paused') {
      simulatorRef.current?.resume();
      setStatus('running');
    }
  }, [status]);

  const handleReset = useCallback(() => {
    simulatorRef.current?.reset();
    setStatus('idle');
    setSteps([]);
    setFinalOutput(null);
    setError(null);
    onCurrentNodeChange(null);
    
    const nodeStatuses = new Map<string, NodeStatus>();
    nodes.forEach(n => nodeStatuses.set(n.id, 'pending'));
    onNodeStatusChange(nodeStatuses);
  }, [nodes, onNodeStatusChange, onCurrentNodeChange]);

  const getStepIcon = (step: SimulationStep) => {
    switch (step.status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'running':
        return <Loader2 className="w-4 h-4 text-primary animate-spin" />;
      case 'error':
        return <Circle className="w-4 h-4 text-destructive" />;
      default:
        return <Circle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  if (!open) return null;

  return (
    <div className="absolute right-4 top-20 bottom-4 w-96 bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="font-semibold ml-2">Simulation Preview</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Input Section */}
      <div className="p-4 border-b border-border">
        <label className="text-sm text-muted-foreground mb-2 block">User Input</label>
        <Input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter a message to test..."
          disabled={status === 'running'}
          className="bg-background"
        />
        
        <div className="flex gap-2 mt-3">
          <Button
            onClick={handleStart}
            disabled={status === 'running' || !userInput.trim()}
            className="flex-1 gap-2"
            size="sm"
          >
            <Play className="w-4 h-4" />
            {status === 'idle' ? 'Run' : 'Restart'}
          </Button>
          <Button
            variant="outline"
            onClick={handlePause}
            disabled={status !== 'running' && status !== 'paused'}
            size="sm"
            className="gap-2"
          >
            <Pause className="w-4 h-4" />
            {status === 'paused' ? 'Resume' : 'Pause'}
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={status === 'idle'}
            size="sm"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Execution Log */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="px-4 py-2 border-b border-border">
          <span className="text-sm font-medium text-muted-foreground">Execution Log</span>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-3">
            {steps.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Click "Run" to start the simulation
              </p>
            ) : (
              steps.map((step, index) => (
                <div
                  key={`${step.nodeId}-${index}`}
                  className={`p-3 rounded-lg border ${
                    step.status === 'running'
                      ? 'border-primary bg-primary/10'
                      : step.status === 'completed'
                      ? 'border-green-500/30 bg-green-500/5'
                      : 'border-border bg-muted/30'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {getStepIcon(step)}
                    <span className="font-medium text-sm">{step.nodeLabel}</span>
                    <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded-full">
                      {step.nodeType}
                    </span>
                  </div>
                  {step.output && (
                    <p className="text-xs text-muted-foreground mt-2 pl-6 leading-relaxed">
                      {step.output}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Output Section */}
      {(finalOutput || error) && (
        <div className="p-4 border-t border-border bg-muted/30">
          <span className="text-sm font-medium block mb-2">
            {error ? 'Error' : 'Final Output'}
          </span>
          <div
            className={`p-3 rounded-lg text-sm ${
              error
                ? 'bg-destructive/10 border border-destructive/30 text-destructive'
                : 'bg-green-500/10 border border-green-500/30 text-foreground'
            }`}
          >
            {error || finalOutput}
          </div>
        </div>
      )}

      {/* Status Bar */}
      <div className="px-4 py-2 border-t border-border bg-muted/50 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Status: <span className="font-medium capitalize">{status}</span>
        </span>
        <span className="text-xs text-muted-foreground">
          Steps: {steps.length}
        </span>
      </div>
    </div>
  );
};

export default PreviewPanel;
