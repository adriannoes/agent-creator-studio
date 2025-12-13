import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bot, Thermometer, Hash, Cpu } from "lucide-react";

interface AgentConfigProps {
  systemPrompt: string;
  onSystemPromptChange: (value: string) => void;
  model: string;
  onModelChange: (value: string) => void;
  temperature: number;
  onTemperatureChange: (value: number) => void;
  maxTokens: number;
  onMaxTokensChange: (value: number) => void;
}

const models = [
  { value: "gpt-4-turbo", label: "GPT-4 Turbo", provider: "OpenAI" },
  { value: "gpt-4o", label: "GPT-4o", provider: "OpenAI" },
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo", provider: "OpenAI" },
  { value: "claude-3-opus", label: "Claude 3 Opus", provider: "Anthropic" },
  { value: "claude-3-sonnet", label: "Claude 3 Sonnet", provider: "Anthropic" },
  { value: "claude-3-haiku", label: "Claude 3 Haiku", provider: "Anthropic" },
  { value: "gemini-pro", label: "Gemini Pro", provider: "Google" },
  { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro", provider: "Google" },
];

const AgentConfig = ({
  systemPrompt,
  onSystemPromptChange,
  model,
  onModelChange,
  temperature,
  onTemperatureChange,
  maxTokens,
  onMaxTokensChange,
}: AgentConfigProps) => {
  return (
    <div className="space-y-5">
      {/* System Prompt */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-primary" />
          <Label htmlFor="system-prompt" className="text-sm font-medium">
            System Prompt
          </Label>
        </div>
        <Textarea
          id="system-prompt"
          placeholder="You are a helpful assistant..."
          value={systemPrompt}
          onChange={(e) => onSystemPromptChange(e.target.value)}
          className="min-h-[100px] bg-secondary/50 border-border/50 resize-none text-sm font-mono"
        />
      </div>

      {/* Model Selection */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-primary" />
          <Label htmlFor="model" className="text-sm font-medium">
            Model
          </Label>
        </div>
        <Select value={model} onValueChange={onModelChange}>
          <SelectTrigger className="bg-secondary/50 border-border/50">
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            {models.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                <div className="flex items-center gap-2">
                  <span>{m.label}</span>
                  <span className="text-xs text-muted-foreground">
                    ({m.provider})
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Temperature */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-primary" />
            <Label className="text-sm font-medium">Temperature</Label>
          </div>
          <span className="text-sm font-mono text-muted-foreground">
            {temperature.toFixed(2)}
          </span>
        </div>
        <Slider
          value={[temperature]}
          onValueChange={([val]) => onTemperatureChange(val)}
          max={2}
          min={0}
          step={0.01}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Precise</span>
          <span>Creative</span>
        </div>
      </div>

      {/* Max Tokens */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-primary" />
            <Label className="text-sm font-medium">Max Tokens</Label>
          </div>
          <span className="text-sm font-mono text-muted-foreground">
            {maxTokens.toLocaleString()}
          </span>
        </div>
        <Slider
          value={[maxTokens]}
          onValueChange={([val]) => onMaxTokensChange(val)}
          max={8192}
          min={256}
          step={256}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>256</span>
          <span>8,192</span>
        </div>
      </div>
    </div>
  );
};

export default AgentConfig;
