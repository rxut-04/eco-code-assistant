
import React from 'react';
import { Button } from '@/components/ui/button';
import { Github, Zap, Upload, Database, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
  onToggleMenu?: () => void;
}

export function Header({ className, onToggleMenu }: HeaderProps) {
  return (
    <header className={cn(
      "w-full h-12 glass border-b border-border/50 flex items-center justify-between px-4",
      "animate-slide-down",
      className
    )}>
      <div className="flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleMenu}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <div className="flex items-center space-x-1 select-none">
          <Zap className="h-5 w-5 text-primary animate-pulse-subtle" />
          <span className="text-sm font-medium">Eco-Code Assistant</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-1">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs h-8 px-2 rounded-lg"
        >
          <span className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5 animate-pulse-subtle"></span>
            <span>Read Only</span>
          </span>
        </Button>
        
        <div className="hidden md:flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs h-8 px-2.5 rounded-lg"
          >
            <Database className="mr-1.5 h-3.5 w-3.5" />
            <span>Supabase</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs h-8 px-2.5 rounded-lg"
          >
            <Github className="mr-1.5 h-3.5 w-3.5" />
            <span>GitHub</span>
          </Button>
          
          <Button 
            variant="primary" 
            size="sm" 
            className="text-xs h-8 px-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Upload className="mr-1.5 h-3.5 w-3.5" />
            <span>Publish</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
