
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Send, User, Bot, Copy, Check } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatPanelProps {
  className?: string;
}

export function ChatPanel({ className }: ChatPanelProps) {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI coding assistant. How can I help you with your project today?',
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [copying, setCopying] = useState<string | null>(null);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I understand you want to work on your code. What specific feature or bug would you like help with?',
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };
  
  const handleCopy = (id: string) => {
    const message = messages.find(m => m.id === id);
    if (message) {
      navigator.clipboard.writeText(message.content);
      setCopying(id);
      setTimeout(() => setCopying(null), 2000);
    }
  };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={cn(
              "flex gap-3 animate-scale-in",
              message.sender === 'user' ? "justify-end" : "justify-start"
            )}
          >
            {message.sender === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-primary" />
              </div>
            )}
            
            <div className={cn(
              "relative group rounded-2xl px-4 py-2 max-w-[85%] text-sm",
              message.sender === 'user' 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted"
            )}>
              <p className="whitespace-pre-wrap">{message.content}</p>
              
              {message.sender === 'assistant' && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-background shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleCopy(message.id)}
                >
                  {copying === message.id ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              )}
            </div>
            
            {message.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-primary" />
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-border/50">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <Input
            className="flex-1 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-primary"
            placeholder="Ask for coding help..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button 
            type="submit" 
            size="icon" 
            className="h-10 w-10 rounded-full bg-primary text-primary-foreground"
            disabled={!inputValue.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
