import { useState } from 'react';
import { Node, Edge } from '@xyflow/react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check } from 'lucide-react';
import { generatePythonCode, generateTypeScriptCode } from '@/lib/codeGenerator';
import { toast } from 'sonner';

interface CodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nodes: Node[];
  edges: Edge[];
  agentName: string;
}

const CodeModal = ({ open, onOpenChange, nodes, edges, agentName }: CodeModalProps) => {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const pythonCode = generatePythonCode({ nodes, edges, agentName });
  const tsCode = generateTypeScriptCode({ nodes, edges, agentName });

  const handleCopy = async (code: string, tab: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedTab(tab);
    toast.success('Code copied to clipboard');
    setTimeout(() => setCopiedTab(null), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Generated Code - {agentName}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="python" className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <TabsList className="bg-muted">
              <TabsTrigger value="python" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Python
              </TabsTrigger>
              <TabsTrigger value="typescript" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                TypeScript
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="python" className="mt-0">
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="absolute top-3 right-3 z-10 gap-2"
                onClick={() => handleCopy(pythonCode, 'python')}
              >
                {copiedTab === 'python' ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </Button>
              <pre className="bg-[hsl(var(--canvas-bg))] border border-border rounded-lg p-4 overflow-auto max-h-[50vh] text-sm">
                <code className="text-foreground font-mono whitespace-pre">
                  {pythonCode}
                </code>
              </pre>
            </div>
          </TabsContent>

          <TabsContent value="typescript" className="mt-0">
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="absolute top-3 right-3 z-10 gap-2"
                onClick={() => handleCopy(tsCode, 'typescript')}
              >
                {copiedTab === 'typescript' ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </Button>
              <pre className="bg-[hsl(var(--canvas-bg))] border border-border rounded-lg p-4 overflow-auto max-h-[50vh] text-sm">
                <code className="text-foreground font-mono whitespace-pre">
                  {tsCode}
                </code>
              </pre>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> This is a starting template based on your workflow. 
            You'll need to implement the actual tool logic and customize the agent instructions 
            for your specific use case.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CodeModal;
