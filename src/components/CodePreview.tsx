import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CodePreviewProps {
  code: string;
  language?: string;
}

const CodePreview = ({ code, language = "typescript" }: CodePreviewProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/50">
        <span className="text-xs text-muted-foreground font-mono">{language}</span>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCopy}>
          {copied ? (
            <Check className="w-3.5 h-3.5 text-primary" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono text-muted-foreground">
          {code.split('\n').map((line, i) => (
            <div key={i} className="flex">
              <span className="w-8 text-muted-foreground/50 select-none text-right pr-4">
                {i + 1}
              </span>
              <span className="text-foreground">{line}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
};

export default CodePreview;
