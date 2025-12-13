import { 
  Cpu, 
  Layers, 
  Lock, 
  Repeat, 
  Terminal, 
  Workflow,
  Brain,
  Database
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Multi-Model Support",
    description: "Connect to OpenAI, Anthropic, Google, or any LLM provider with a unified interface."
  },
  {
    icon: Workflow,
    title: "Agent Orchestration",
    description: "Chain multiple agents together for complex multi-step workflows and tasks."
  },
  {
    icon: Terminal,
    title: "Custom Tools",
    description: "Define any function as a tool with automatic schema generation and validation."
  },
  {
    icon: Database,
    title: "Persistent Memory",
    description: "Built-in vector storage for long-term memory and contextual retrieval."
  },
  {
    icon: Repeat,
    title: "Streaming & Async",
    description: "Real-time streaming responses with full async/await support throughout."
  },
  {
    icon: Layers,
    title: "Middleware Pipeline",
    description: "Add logging, caching, rate limiting, and custom logic with middleware."
  },
  {
    icon: Lock,
    title: "Built-in Guardrails",
    description: "Content filtering, token limits, and safety checks out of the box."
  },
  {
    icon: Cpu,
    title: "Edge Ready",
    description: "Deploy to Vercel, Cloudflare Workers, or any edge runtime."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to build
            <span className="gradient-text block">production-ready agents</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A comprehensive toolkit designed for developers who want to ship AI-powered applications fast.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group glass rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
