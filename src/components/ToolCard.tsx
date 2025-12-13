import { Switch } from "@/components/ui/switch";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  icon: LucideIcon;
  name: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}

const ToolCard = ({ icon: Icon, name, description, enabled, onToggle }: ToolCardProps) => {
  return (
    <div 
      className={`glass rounded-lg p-4 transition-all duration-200 cursor-pointer hover:border-primary/50 ${
        enabled ? 'border-primary/50 bg-primary/5' : ''
      }`}
      onClick={onToggle}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
            enabled ? 'bg-primary/20' : 'bg-secondary'
          }`}>
            <Icon className={`w-4 h-4 ${enabled ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          <div>
            <h4 className="font-medium text-sm">{name}</h4>
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          </div>
        </div>
        <Switch checked={enabled} onCheckedChange={onToggle} />
      </div>
    </div>
  );
};

export default ToolCard;
