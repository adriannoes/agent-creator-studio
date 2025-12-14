import { Handle, Position } from '@xyflow/react';
import { Shield, ChevronDown } from 'lucide-react';

interface GuardrailNodeProps {
  data: { label?: string };
}

const GuardrailNode = ({ data }: GuardrailNodeProps) => {
  return (
    <div className="bg-[hsl(var(--node-guardrail))] text-white rounded-xl px-4 py-3 shadow-lg min-w-[160px]">
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-white !w-3 !h-3 !border-2 !border-[hsl(var(--node-guardrail))]"
      />
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 rounded-lg p-1.5">
            <Shield className="w-4 h-4" />
          </div>
          <span className="font-semibold text-sm">{data?.label || 'Guardrail'}</span>
        </div>
        <ChevronDown className="w-4 h-4 opacity-60" />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-white !w-3 !h-3 !border-2 !border-[hsl(var(--node-guardrail))]"
      />
    </div>
  );
};

export default GuardrailNode;
