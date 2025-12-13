import { Button } from "@/components/ui/button";
import { Bot, Github, Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg">AgentKit</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Features
          </a>
          <a href="#playground" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Playground
          </a>
          <a href="#docs" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Docs
          </a>
          <a href="#examples" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Examples
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <Github className="w-5 h-5" />
          </Button>
          <Button variant="hero" size="sm">
            Get Started
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-border/50 animate-slide-up">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors py-2">
              Features
            </a>
            <a href="#playground" className="text-muted-foreground hover:text-foreground transition-colors py-2">
              Playground
            </a>
            <a href="#docs" className="text-muted-foreground hover:text-foreground transition-colors py-2">
              Docs
            </a>
            <a href="#examples" className="text-muted-foreground hover:text-foreground transition-colors py-2">
              Examples
            </a>
            <Button variant="hero" className="mt-2">
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
