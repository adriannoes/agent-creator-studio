import { StickyNote } from 'lucide-react';

interface NoteNodeProps {
  data: { label?: string };
}

const NoteNode = ({ data }: NoteNodeProps) => {
  return (
    <div className="bg-[hsl(var(--node-note))] text-white rounded-xl px-4 py-3 shadow-lg min-w-[200px] max-w-[280px]">
      <div className="flex items-start gap-2">
        <StickyNote className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <p className="text-sm leading-relaxed">{data?.label || 'Add a note...'}</p>
      </div>
    </div>
  );
};

export default NoteNode;
