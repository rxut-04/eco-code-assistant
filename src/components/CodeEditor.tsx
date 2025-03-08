
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { FileTree } from './FileTree';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Preview } from './Preview';
import {
  Code,
  Eye,
  Loader2,
  Split,
  Terminal,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface CodeEditorProps {
  className?: string;
}

export function CodeEditor({ className }: CodeEditorProps) {
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('code');
  const [isLoading, setIsLoading] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);

  // Mock code snippet
  const codeSnippet = `import React from 'react';
import { Button } from '@/components/ui/button';

function Header() {
  return (
    <header className="w-full p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Eco-Code Assistant</h1>
      <div className="space-x-2">
        <Button variant="outline">Login</Button>
        <Button>Get Started</Button>
      </div>
    </header>
  );
}

export default Header;`;

  const handleRunCode = () => {
    setIsBuilding(true);
    
    // Simulate a build process
    setTimeout(() => {
      setIsBuilding(false);
      setActiveTab('preview');
      setIsLoading(true);
      
      // Simulate loading the preview
      setTimeout(() => {
        setIsLoading(false);
      }, 1200);
    }, 1500);
  };

  return (
    <div className={cn("h-full flex flex-col bg-editor", className)}>
      <div className="flex items-center justify-between p-2 border-b border-border/50">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-between w-full">
            <TabsList className="h-8 p-1 bg-muted/50">
              <TabsTrigger 
                value="code" 
                className="h-6 px-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <Code className="h-4 w-4 mr-1.5" />
                <span className="text-xs">Code</span>
              </TabsTrigger>
              <TabsTrigger 
                value="preview" 
                className="h-6 px-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <Eye className="h-4 w-4 mr-1.5" />
                <span className="text-xs">Preview</span>
              </TabsTrigger>
              <TabsTrigger 
                value="split" 
                className="h-6 px-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <Split className="h-4 w-4 mr-1.5" />
                <span className="text-xs">Split</span>
              </TabsTrigger>
              <TabsTrigger 
                value="console" 
                className="h-6 px-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <Terminal className="h-4 w-4 mr-1.5" />
                <span className="text-xs">Console</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-xs rounded-lg mr-1"
                onClick={handleRunCode}
                disabled={isBuilding}
              >
                {isBuilding ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                    <span>Building...</span>
                  </>
                ) : (
                  <>
                    <span>▶</span>
                    <span className="ml-1.5">Run</span>
                  </>
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsFullWidth(!isFullWidth)}
              >
                {isFullWidth ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="mt-2">
            <TabsContent value="code" className="mt-0">
              <div className="flex h-[calc(100vh-10rem)]">
                <div className={cn(
                  "border-r border-border/50 bg-muted/30 transition-all",
                  isFullWidth ? "w-0 opacity-0" : "w-52 opacity-100"
                )}>
                  {!isFullWidth && <FileTree />}
                </div>
                <div className="flex-1 overflow-auto font-mono p-4 bg-editor text-sm">
                  <pre className="whitespace-pre-wrap">{codeSnippet}</pre>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="mt-0 h-[calc(100vh-10rem)]">
              <Preview isLoading={isLoading} />
            </TabsContent>
            
            <TabsContent value="split" className="mt-0">
              <div className="flex h-[calc(100vh-10rem)]">
                <div className="flex-1 overflow-auto font-mono p-4 bg-editor text-sm border-r border-border/50">
                  <pre className="whitespace-pre-wrap">{codeSnippet}</pre>
                </div>
                <div className="flex-1">
                  <Preview isLoading={isLoading} />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="console" className="mt-0">
              <div className="h-[calc(100vh-10rem)] bg-black text-green-400 p-4 font-mono text-sm overflow-auto">
                <div className="space-y-1">
                  <p>Starting development server...</p>
                  <p>✓ Compiled successfully!</p>
                  <p>Local: http://localhost:3000</p>
                  <p>Network: http://192.168.1.5:3000</p>
                  <p className="text-yellow-300">Warning: React version not specified in dependencies.</p>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
