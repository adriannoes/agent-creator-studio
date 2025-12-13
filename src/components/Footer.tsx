import { Bot, Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold">AgentKit</span>
          </div>

          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Documentation</a>
            <a href="#" className="hover:text-foreground transition-colors">Examples</a>
            <a href="#" className="hover:text-foreground transition-colors">Changelog</a>
            <a href="#" className="hover:text-foreground transition-colors">Support</a>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Github className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Twitter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>© 2024 AgentKit. Built with ❤️ for developers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
