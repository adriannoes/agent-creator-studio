import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  toolCalls?: Array<{ name: string; result: string }>;
}

const ChatMessage = ({ role, content, toolCalls }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''} animate-fade-in`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
        isUser ? 'bg-secondary' : 'bg-gradient-to-br from-primary to-accent'
      }`}>
        {isUser ? (
          <User className="w-4 h-4 text-muted-foreground" />
        ) : (
          <Bot className="w-4 h-4 text-primary-foreground" />
        )}
      </div>
      
      <div className={`flex flex-col gap-2 max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`rounded-xl px-4 py-3 ${
          isUser 
            ? 'bg-primary text-primary-foreground' 
            : 'glass'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        </div>

        {toolCalls && toolCalls.length > 0 && (
          <div className="flex flex-col gap-1.5 w-full">
            {toolCalls.map((tool, index) => (
              <div key={index} className="bg-secondary/50 rounded-lg px-3 py-2 font-mono text-xs">
                <span className="text-primary">→</span>
                <span className="text-muted-foreground ml-2">{tool.name}:</span>
                <span className="text-foreground ml-2">{tool.result}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
