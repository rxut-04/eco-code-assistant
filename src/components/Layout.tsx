
import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { ChatPanel } from './ChatPanel';
import { CodeEditor } from './CodeEditor';
import { cn } from '@/lib/utils';
import { useResizable } from '@/hooks/useResizable';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

interface LayoutProps {
  children?: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMobileView, setIsMobileView] = useState(false);
  const [showChat, setShowChat] = useState(true);
  
  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Toggle chat panel on mobile
  const toggleChat = () => {
    setShowChat(prev => !prev);
  };

  // For mobile view, render either chat or code editor based on state
  if (isMobileView) {
    return (
      <div className="h-screen flex flex-col bg-background">
        <Header onToggleMenu={toggleChat} />
        <main className="flex-1 overflow-hidden">
          {showChat ? (
            <ChatPanel className="h-full" />
          ) : (
            <CodeEditor className="h-full" />
          )}
        </main>
      </div>
    );
  }

  // Desktop view with resizable panels
  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal" className="h-full">
          <Panel 
            defaultSize={30} 
            minSize={20} 
            maxSize={50}
            className="transition-all"
          >
            <ChatPanel className="h-full border-r border-border/50" />
          </Panel>
          
          <PanelResizeHandle className="w-1.5 hover:w-2 bg-border/20 hover:bg-primary/20 transition-all duration-200 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-1 rounded-full"></div>
            </div>
          </PanelResizeHandle>
          
          <Panel defaultSize={70}>
            <CodeEditor className="h-full" />
          </Panel>
        </PanelGroup>
      </main>
    </div>
  );
}
