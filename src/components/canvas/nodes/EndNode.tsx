import { Handle, Position } from '@xyflow/react';
import { Square } from 'lucide-react';

interface EndNodeProps {
  data: { label?: string };
}

const EndNode = ({ data }: EndNodeProps) => {
  return (
    <div className="flex items-center gap-2 bg-[hsl(var(--node-end))] text-white rounded-lg px-4 py-2 shadow-lg min-w-[80px] justify-center">
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-white !w-3 !h-3 !border-2 !border-[hsl(var(--node-end))]"
      />
      <Square className="w-4 h-4 fill-current" />
      <span className="font-medium text-sm">{data?.label || 'End'}</span>
    </div>
  );
};

export default EndNode;
