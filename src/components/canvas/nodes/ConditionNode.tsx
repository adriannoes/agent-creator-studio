import { Handle, Position } from '@xyflow/react';
import { GitBranch, ChevronDown } from 'lucide-react';

interface ConditionNodeProps {
  data: { label?: string };
}

const ConditionNode = ({ data }: ConditionNodeProps) => {
  return (
    <div className="bg-[hsl(var(--node-condition))] text-black rounded-xl px-4 py-3 shadow-lg min-w-[160px]">
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-black !w-3 !h-3 !border-2 !border-[hsl(var(--node-condition))]"
      />
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="bg-black/20 rounded-lg p-1.5">
            <GitBranch className="w-4 h-4" />
          </div>
          <span className="font-semibold text-sm">{data?.label || 'Condition'}</span>
        </div>
        <ChevronDown className="w-4 h-4 opacity-60" />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="true"
        style={{ top: '30%' }}
        className="!bg-black !w-3 !h-3 !border-2 !border-[hsl(var(--node-condition))]"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="false"
        style={{ top: '70%' }}
        className="!bg-black !w-3 !h-3 !border-2 !border-[hsl(var(--node-condition))]"
      />
    </div>
  );
};

export default ConditionNode;
