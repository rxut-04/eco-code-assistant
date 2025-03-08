
import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface PreviewProps {
  className?: string;
  isLoading?: boolean;
}

export function Preview({ className, isLoading = false }: PreviewProps) {
  return (
    <div className={cn("h-full bg-background relative", className)}>
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
            <p className="text-sm text-muted-foreground">Loading preview...</p>
          </div>
        </div>
      ) : (
        <div className="h-full w-full flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-2xl mx-auto">
            <header className="w-full p-4 flex justify-between items-center bg-card rounded-lg shadow-sm mb-6">
              <h1 className="text-2xl font-bold">Eco-Code Assistant</h1>
              <div className="space-x-2">
                <button className="px-4 py-2 rounded-md border border-border text-sm">Login</button>
                <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm">Get Started</button>
              </div>
            </header>
            
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Welcome to Your Project</h2>
              <p className="text-muted-foreground mb-4">
                This is a live preview of your application. As you make changes to your code,
                the preview will update automatically.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-muted p-4 rounded-md flex flex-col items-center justify-center text-center">
                  <h3 className="text-lg font-medium mb-2">Features</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore all the amazing features of this application.
                  </p>
                </div>
                <div className="bg-muted p-4 rounded-md flex flex-col items-center justify-center text-center">
                  <h3 className="text-lg font-medium mb-2">Documentation</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn how to use and customize this application.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
