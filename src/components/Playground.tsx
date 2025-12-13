import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Settings, Code, MessageSquare, Search, Calculator, Globe, FileText, Loader2, Wrench, Sliders } from "lucide-react";
import ToolCard from "./ToolCard";
import ChatMessage from "./ChatMessage";
import CodePreview from "./CodePreview";
import AgentConfig from "./AgentConfig";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Tool {
  id: string;
  icon: typeof Search;
  name: string;
  description: string;
  enabled: boolean;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  toolCalls?: Array<{ name: string; result: string }>;
}

const initialTools: Tool[] = [
  { id: "search", icon: Search, name: "Web Search", description: "Search the internet for information", enabled: true },
  { id: "calculator", icon: Calculator, name: "Calculator", description: "Perform mathematical calculations", enabled: true },
  { id: "browser", icon: Globe, name: "Browser", description: "Navigate and extract content from web pages", enabled: false },
  { id: "files", icon: FileText, name: "File System", description: "Read and write files", enabled: false },
];

const sampleMessages: Message[] = [
  { role: "user", content: "What's the current weather in San Francisco and calculate the temperature in Kelvin?" },
  { 
    role: "assistant", 
    content: "I'll search for the current weather in San Francisco and then convert the temperature to Kelvin for you.",
    toolCalls: [
      { name: "web_search", result: "San Francisco: 68°F (20°C), Partly Cloudy" },
      { name: "calculator", result: "20°C + 273.15 = 293.15 K" }
    ]
  },
  { role: "assistant", content: "The current weather in San Francisco is 68°F (20°C) and partly cloudy. In Kelvin, that's approximately **293.15 K**." },
];

const Playground = () => {
  const [tools, setTools] = useState(initialTools);
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Agent configuration state
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a helpful research assistant. Use available tools to find accurate information and provide comprehensive answers."
  );
  const [model, setModel] = useState("gpt-4-turbo");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(4096);
  const [configTab, setConfigTab] = useState<"tools" | "settings">("tools");

  // Generate dynamic code example based on config
  const generateCodeExample = () => {
    const enabledTools = tools.filter(t => t.enabled);
    const toolImports = enabledTools.map(t => `${t.name.replace(' ', '')}Tool`).join(', ');
    const toolInstances = enabledTools.map(t => `    new ${t.name.replace(' ', '')}Tool(),`).join('\n');
    
    return `import { Agent, ${toolImports} } from 'agentkit';

const agent = new Agent({
  name: 'Research Assistant',
  model: '${model}',
  temperature: ${temperature},
  maxTokens: ${maxTokens},
  systemPrompt: \`${systemPrompt}\`,
  tools: [
${toolInstances}
  ],
});

const response = await agent.chat(
  "What's the weather in SF? Convert to Kelvin."
);

console.log(response.content);`;
  };

  const toggleTool = (id: string) => {
    setTools(tools.map(tool => 
      tool.id === id ? { ...tool, enabled: !tool.enabled } : tool
    ));
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content: "I understand your request. Let me help you with that using the available tools.",
        toolCalls: tools.filter(t => t.enabled).slice(0, 2).map(t => ({
          name: t.name.toLowerCase().replace(' ', '_'),
          result: "Processing complete"
        }))
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section id="playground" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(160_84%_39%/0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Interactive <span className="gradient-text">Playground</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Configure tools, test your agent, and see the generated code in real-time.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Configuration Panel */}
          <div className="glass rounded-2xl p-5 lg:col-span-1 max-h-[600px] overflow-hidden flex flex-col">
            {/* Config Tabs */}
            <div className="flex gap-1 p-1 bg-secondary/30 rounded-lg mb-4">
              <button
                onClick={() => setConfigTab("tools")}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  configTab === "tools"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Wrench className="w-4 h-4" />
                Tools
              </button>
              <button
                onClick={() => setConfigTab("settings")}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  configTab === "settings"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sliders className="w-4 h-4" />
                Settings
              </button>
            </div>

            {/* Config Content */}
            <div className="flex-1 overflow-y-auto">
              {configTab === "tools" ? (
                <div className="space-y-3">
                  {tools.map(tool => (
                    <ToolCard
                      key={tool.id}
                      icon={tool.icon}
                      name={tool.name}
                      description={tool.description}
                      enabled={tool.enabled}
                      onToggle={() => toggleTool(tool.id)}
                    />
                  ))}
                </div>
              ) : (
                <AgentConfig
                  systemPrompt={systemPrompt}
                  onSystemPromptChange={setSystemPrompt}
                  model={model}
                  onModelChange={setModel}
                  temperature={temperature}
                  onTemperatureChange={setTemperature}
                  maxTokens={maxTokens}
                  onMaxTokensChange={setMaxTokens}
                />
              )}
            </div>
          </div>

          {/* Chat & Code Panel */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="chat" className="w-full">
              <TabsList className="glass w-full justify-start mb-4 p-1">
                <TabsTrigger value="chat" className="gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Chat
                </TabsTrigger>
                <TabsTrigger value="code" className="gap-2">
                  <Code className="w-4 h-4" />
                  Code
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="mt-0">
                <div className="glass rounded-2xl flex flex-col h-[500px]">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    {messages.map((msg, i) => (
                      <ChatMessage key={i} {...msg} />
                    ))}
                    {isLoading && (
                      <div className="flex gap-3 animate-fade-in">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <Loader2 className="w-4 h-4 text-primary-foreground animate-spin" />
                        </div>
                        <div className="glass rounded-xl px-4 py-3">
                          <p className="text-sm text-muted-foreground">Thinking...</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-border/50">
                    <div className="flex gap-3">
                      <Textarea
                        placeholder="Ask your agent anything..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                          }
                        }}
                        className="min-h-[44px] max-h-32 resize-none bg-secondary/50 border-0"
                      />
                      <Button 
                        variant="hero" 
                        size="icon" 
                        className="shrink-0 h-11 w-11"
                        onClick={handleSend}
                        disabled={isLoading}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="code" className="mt-0">
                <CodePreview code={generateCodeExample()} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Playground;
