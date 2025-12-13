import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(160_84%_39%/0.1),transparent_50%)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(220_15%_18%/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(220_15%_18%/0.3)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Build intelligent agents in minutes</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-slide-up">
            The framework for
            <span className="block gradient-text">AI Agents</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            AgentKit provides everything you need to build, deploy, and scale AI agents with custom tools, memory, and reasoning capabilities.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button variant="hero" size="lg" className="w-full sm:w-auto">
              Start Building
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              View Documentation
            </Button>
          </div>

          {/* Feature cards */}
          <div className="grid md:grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="glass rounded-xl p-6 text-left hover:border-primary/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Optimized execution engine with parallel tool calls and streaming responses.
              </p>
            </div>

            <div className="glass rounded-xl p-6 text-left hover:border-primary/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Custom Tools</h3>
              <p className="text-sm text-muted-foreground">
                Define custom functions and APIs that your agent can use to accomplish tasks.
              </p>
            </div>

            <div className="glass rounded-xl p-6 text-left hover:border-primary/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-sm text-muted-foreground">
                Built-in guardrails, rate limiting, and comprehensive error handling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
