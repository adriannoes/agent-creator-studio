import { Handle, Position } from '@xyflow/react';
import { Wrench, ChevronDown } from 'lucide-react';

interface ToolNodeProps {
  data: { label?: string };
}

const ToolNode = ({ data }: ToolNodeProps) => {
  return (
    <div className="bg-[hsl(var(--node-tool))] text-black rounded-xl px-4 py-3 shadow-lg min-w-[160px]">
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-black !w-3 !h-3 !border-2 !border-[hsl(var(--node-tool))]"
      />
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="bg-black/20 rounded-lg p-1.5">
            <Wrench className="w-4 h-4" />
          </div>
          <span className="font-semibold text-sm">{data?.label || 'Tool'}</span>
        </div>
        <ChevronDown className="w-4 h-4 opacity-60" />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-black !w-3 !h-3 !border-2 !border-[hsl(var(--node-tool))]"
      />
    </div>
  );
};

export default ToolNode;
