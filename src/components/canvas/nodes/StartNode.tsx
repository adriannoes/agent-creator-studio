import { Handle, Position } from '@xyflow/react';
import { Play } from 'lucide-react';

interface StartNodeProps {
  data: { label?: string };
}

const StartNode = ({ data }: StartNodeProps) => {
  return (
    <div className="flex items-center gap-2 bg-[hsl(var(--node-start))] text-white rounded-full px-4 py-2 shadow-lg min-w-[80px] justify-center">
      <Play className="w-4 h-4 fill-current" />
      <span className="font-medium text-sm">{data?.label || 'Start'}</span>
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-white !w-3 !h-3 !border-2 !border-[hsl(var(--node-start))]"
      />
    </div>
  );
};

export default StartNode;
