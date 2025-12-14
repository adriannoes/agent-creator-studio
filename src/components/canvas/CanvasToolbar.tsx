import { Hand, MousePointer2, Undo2, Redo2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface CanvasToolbarProps {
  mode: 'pan' | 'select';
  onModeChange: (mode: 'pan' | 'select') => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const CanvasToolbar = ({ mode, onModeChange, onUndo, onRedo, canUndo, canRedo }: CanvasToolbarProps) => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
      <div className="flex items-center gap-1 bg-card/90 backdrop-blur-sm border border-border rounded-xl px-2 py-1.5 shadow-lg">
        <Button
          variant={mode === 'pan' ? 'secondary' : 'ghost'}
          size="icon"
          className="h-8 w-8"
          onClick={() => onModeChange('pan')}
        >
          <Hand className="w-4 h-4" />
        </Button>
        <Button
          variant={mode === 'select' ? 'secondary' : 'ghost'}
          size="icon"
          className="h-8 w-8"
          onClick={() => onModeChange('select')}
        >
          <MousePointer2 className="w-4 h-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onUndo}
          disabled={!canUndo}
        >
          <Undo2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onRedo}
          disabled={!canRedo}
        >
          <Redo2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default CanvasToolbar;
