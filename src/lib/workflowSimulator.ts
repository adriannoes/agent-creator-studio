import { Node, Edge } from '@xyflow/react';

export type SimulationStatus = 'idle' | 'running' | 'paused' | 'completed' | 'error';
export type NodeStatus = 'pending' | 'running' | 'completed' | 'error';

export interface SimulationStep {
  nodeId: string;
  nodeType: string;
  nodeLabel: string;
  status: NodeStatus;
  output?: string;
  timestamp: Date;
}

export interface SimulationState {
  status: SimulationStatus;
  currentNodeId: string | null;
  steps: SimulationStep[];
  nodeStatuses: Map<string, NodeStatus>;
  finalOutput: string | null;
  error: string | null;
}

interface SimulatorCallbacks {
  onNodeEnter: (nodeId: string) => void;
  onNodeComplete: (nodeId: string, output: string) => void;
  onStepAdded: (step: SimulationStep) => void;
  onComplete: (finalOutput: string) => void;
  onError: (error: string) => void;
}

export class WorkflowSimulator {
  private nodes: Node[];
  private edges: Edge[];
  private state: SimulationState;
  private callbacks: SimulatorCallbacks;
  private stepDelay: number;
  private isPaused: boolean = false;
  private abortController: AbortController | null = null;

  constructor(
    nodes: Node[],
    edges: Edge[],
    callbacks: SimulatorCallbacks,
    stepDelay: number = 1000
  ) {
    this.nodes = nodes;
    this.edges = edges;
    this.callbacks = callbacks;
    this.stepDelay = stepDelay;
    this.state = this.createInitialState();
  }

  private createInitialState(): SimulationState {
    const nodeStatuses = new Map<string, NodeStatus>();
    this.nodes.forEach(node => nodeStatuses.set(node.id, 'pending'));
    
    return {
      status: 'idle',
      currentNodeId: null,
      steps: [],
      nodeStatuses,
      finalOutput: null,
      error: null,
    };
  }

  private findStartNode(): Node | undefined {
    return this.nodes.find(n => n.type === 'start');
  }

  private findNextNodes(currentNodeId: string): Node[] {
    const outgoingEdges = this.edges.filter(e => e.source === currentNodeId);
    return outgoingEdges
      .map(e => this.nodes.find(n => n.id === e.target))
      .filter(Boolean) as Node[];
  }

  private async simulateNode(node: Node, input: string): Promise<string> {
    const label = node.data?.label as string || node.type || 'Unknown';
    
    // Simulate different behaviors based on node type
    switch (node.type) {
      case 'start':
        return `Workflow started with input: "${input}"`;
      
      case 'agent':
        await this.delay(this.stepDelay);
        return `Agent "${label}" processed input and generated response: "I understand you need help with: ${input}. Here's my assistance..."`;
      
      case 'tool':
        await this.delay(this.stepDelay * 0.7);
        return `Tool "${label}" executed successfully. Result: { "status": "success", "data": "processed" }`;
      
      case 'condition':
        await this.delay(this.stepDelay * 0.5);
        const result = Math.random() > 0.3; // 70% chance of true
        return `Condition "${label}" evaluated to: ${result}`;
      
      case 'guardrail':
        await this.delay(this.stepDelay * 0.5);
        return `Guardrail "${label}" check passed. Input validated successfully.`;
      
      case 'note':
        return `Note: ${label}`;
      
      case 'end':
        return `Workflow completed successfully.`;
      
      default:
        return `Node "${label}" processed.`;
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(resolve, ms);
      
      if (this.abortController) {
        this.abortController.signal.addEventListener('abort', () => {
          clearTimeout(timeout);
          reject(new Error('Simulation aborted'));
        });
      }
    });
  }

  async start(userInput: string): Promise<void> {
    this.state = this.createInitialState();
    this.state.status = 'running';
    this.isPaused = false;
    this.abortController = new AbortController();

    const startNode = this.findStartNode();
    if (!startNode) {
      this.state.status = 'error';
      this.state.error = 'No start node found';
      this.callbacks.onError('No start node found in the workflow');
      return;
    }

    try {
      await this.processNode(startNode, userInput);
    } catch (error) {
      if ((error as Error).message !== 'Simulation aborted') {
        this.state.status = 'error';
        this.state.error = (error as Error).message;
        this.callbacks.onError((error as Error).message);
      }
    }
  }

  private async processNode(node: Node, input: string): Promise<void> {
    // Wait if paused
    while (this.isPaused) {
      await this.delay(100);
    }

    // Set current node
    this.state.currentNodeId = node.id;
    this.state.nodeStatuses.set(node.id, 'running');
    this.callbacks.onNodeEnter(node.id);

    // Create step
    const step: SimulationStep = {
      nodeId: node.id,
      nodeType: node.type || 'unknown',
      nodeLabel: node.data?.label as string || node.type || 'Unknown',
      status: 'running',
      timestamp: new Date(),
    };
    this.state.steps.push(step);
    this.callbacks.onStepAdded(step);

    // Simulate node processing
    const output = await this.simulateNode(node, input);
    
    // Update step with output
    step.status = 'completed';
    step.output = output;
    this.state.nodeStatuses.set(node.id, 'completed');
    this.callbacks.onNodeComplete(node.id, output);

    // Check if this is the end node
    if (node.type === 'end') {
      this.state.status = 'completed';
      this.state.finalOutput = output;
      this.callbacks.onComplete(output);
      return;
    }

    // Find and process next nodes
    const nextNodes = this.findNextNodes(node.id);
    
    if (nextNodes.length === 0 && node.type !== 'end') {
      // No more nodes, complete the workflow
      this.state.status = 'completed';
      this.state.finalOutput = output;
      this.callbacks.onComplete(output);
      return;
    }

    // Process next nodes sequentially (for simplicity)
    for (const nextNode of nextNodes) {
      await this.processNode(nextNode, output);
    }
  }

  pause(): void {
    this.isPaused = true;
    this.state.status = 'paused';
  }

  resume(): void {
    this.isPaused = false;
    this.state.status = 'running';
  }

  stop(): void {
    this.abortController?.abort();
    this.state = this.createInitialState();
  }

  reset(): void {
    this.stop();
  }

  getState(): SimulationState {
    return { ...this.state };
  }

  getNodeStatus(nodeId: string): NodeStatus {
    return this.state.nodeStatuses.get(nodeId) || 'pending';
  }
}
