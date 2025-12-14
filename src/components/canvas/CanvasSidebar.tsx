import { useState } from 'react';
import { Search, Play, Square, Bot, Wrench, GitBranch, StickyNote, Shield, ChevronDown, ChevronRight, Database, RefreshCw, UserCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface NodeType {
  type: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

interface Category {
  name: string;
  nodes: NodeType[];
}

const categories: Category[] = [
  {
    name: 'Basic',
    nodes: [
      { type: 'start', label: 'Start', icon: <Play className="w-4 h-4" />, color: 'hsl(var(--node-start))' },
      { type: 'end', label: 'End', icon: <Square className="w-4 h-4" />, color: 'hsl(var(--node-end))' },
      { type: 'agent', label: 'Agent', icon: <Bot className="w-4 h-4" />, color: 'hsl(var(--node-agent))' },
      { type: 'note', label: 'Note', icon: <StickyNote className="w-4 h-4" />, color: 'hsl(var(--node-note))' },
    ],
  },
  {
    name: 'Tools',
    nodes: [
      { type: 'tool', label: 'Function', icon: <Wrench className="w-4 h-4" />, color: 'hsl(var(--node-tool))' },
      { type: 'guardrail', label: 'Guardrail', icon: <Shield className="w-4 h-4" />, color: 'hsl(var(--node-guardrail))' },
    ],
  },
  {
    name: 'Logic',
    nodes: [
      { type: 'condition', label: 'Condition', icon: <GitBranch className="w-4 h-4" />, color: 'hsl(var(--node-condition))' },
      { type: 'tool', label: 'While', icon: <RefreshCw className="w-4 h-4" />, color: 'hsl(var(--node-logic))' },
      { type: 'tool', label: 'Human Approval', icon: <UserCheck className="w-4 h-4" />, color: 'hsl(var(--node-logic))' },
    ],
  },
  {
    name: 'Data',
    nodes: [
      { type: 'tool', label: 'Transform', icon: <Database className="w-4 h-4" />, color: 'hsl(var(--node-data))' },
    ],
  },
];

const CanvasSidebar = () => {
  const [search, setSearch] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Basic', 'Tools', 'Logic', 'Data']);

  const toggleCategory = (name: string) => {
    setExpandedCategories((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const onDragStart = (event: React.DragEvent, nodeType: string, label: string) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ type: nodeType, label }));
    event.dataTransfer.effectAllowed = 'move';
  };

  const filteredCategories = categories
    .map((cat) => ({
      ...cat,
      nodes: cat.nodes.filter((node) =>
        node.label.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.nodes.length > 0);

  return (
    <div className="w-64 bg-[hsl(var(--canvas-sidebar))] border-r border-border flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Insert node..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-background/50 border-border"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {filteredCategories.map((category) => (
          <div key={category.name} className="mb-2">
            <button
              onClick={() => toggleCategory(category.name)}
              className="flex items-center gap-2 w-full px-2 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {expandedCategories.includes(category.name) ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              {category.name}
            </button>

            {expandedCategories.includes(category.name) && (
              <div className="ml-2 space-y-1">
                {category.nodes.map((node, idx) => (
                  <div
                    key={`${node.type}-${idx}`}
                    draggable
                    onDragStart={(e) => onDragStart(e, node.type, node.label)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-grab hover:bg-muted/50 transition-colors group"
                  >
                    <div
                      className="p-1.5 rounded-md"
                      style={{ backgroundColor: node.color }}
                    >
                      <div className="text-black">{node.icon}</div>
                    </div>
                    <span className="text-sm text-foreground">{node.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CanvasSidebar;
