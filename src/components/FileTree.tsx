
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  ChevronRight, 
  ChevronDown, 
  FileText, 
  Folder,
  PlusCircle,
  FolderOpen
} from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  extension?: string;
  children?: FileItem[];
}

interface FileTreeProps {
  className?: string;
  onSelectFile?: (file: FileItem) => void;
}

// Sample file structure
const initialFiles: FileItem[] = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    children: [
      {
        id: '2',
        name: 'components',
        type: 'folder',
        children: [
          { id: '3', name: 'Header', type: 'file', extension: 'tsx' },
          { id: '4', name: 'Layout', type: 'file', extension: 'tsx' },
          { id: '5', name: 'ChatPanel', type: 'file', extension: 'tsx' },
        ]
      },
      {
        id: '6',
        name: 'pages',
        type: 'folder',
        children: [
          { id: '7', name: 'Index', type: 'file', extension: 'tsx' },
        ]
      },
      { id: '8', name: 'App', type: 'file', extension: 'tsx' },
      { id: '9', name: 'main', type: 'file', extension: 'tsx' },
    ]
  },
  {
    id: '10',
    name: 'public',
    type: 'folder',
    children: [
      { id: '11', name: 'favicon', type: 'file', extension: 'ico' },
    ]
  },
  { id: '12', name: 'package', type: 'file', extension: 'json' },
  { id: '13', name: 'tsconfig', type: 'file', extension: 'json' },
];

export function FileTree({ className, onSelectFile }: FileTreeProps) {
  const [files, setFiles] = useState<FileItem[]>(initialFiles);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    '1': true, // Expand src folder by default
  });
  const [selectedFile, setSelectedFile] = useState<string | null>('3'); // Select Header.tsx by default

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const handleSelectFile = (file: FileItem) => {
    if (file.type === 'file') {
      setSelectedFile(file.id);
      onSelectFile?.(file);
    }
  };

  const renderFiles = (items: FileItem[], level = 0) => {
    return items.map(item => {
      const isFolder = item.type === 'folder';
      const isExpanded = expandedFolders[item.id];
      
      return (
        <div key={item.id} className="animate-fade-in" style={{ animationDelay: `${level * 50}ms` }}>
          <div 
            className={cn(
              "flex items-center py-1.5 px-2 text-sm rounded-md transition-colors cursor-pointer",
              selectedFile === item.id 
                ? "bg-primary/10 text-primary"
                : "hover:bg-muted"
            )}
            style={{ paddingLeft: `${(level * 12) + 8}px` }}
            onClick={() => isFolder ? toggleFolder(item.id) : handleSelectFile(item)}
          >
            {isFolder ? (
              <Button variant="ghost" size="icon" className="h-4 w-4 mr-1.5 p-0">
                {isExpanded ? (
                  <ChevronDown className="h-3.5 w-3.5" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5" />
                )}
              </Button>
            ) : (
              <span className="w-4 mr-1.5" />
            )}
            
            {isFolder ? (
              isExpanded ? (
                <FolderOpen className="h-4 w-4 mr-1.5 text-amber-500" />
              ) : (
                <Folder className="h-4 w-4 mr-1.5 text-amber-500" />
              )
            ) : (
              <FileText className="h-4 w-4 mr-1.5 text-muted-foreground" />
            )}
            
            <span className="truncate">
              {item.name}
              {item.extension && `.${item.extension}`}
            </span>
          </div>
          
          {isFolder && isExpanded && item.children && (
            <div className="mt-1 overflow-hidden">
              {renderFiles(item.children, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className={cn("h-full overflow-y-auto overflow-x-hidden", className)}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/50">
        <h3 className="text-sm font-medium">Files</h3>
        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
          <PlusCircle className="h-4 w-4" />
          <span className="sr-only">New file</span>
        </Button>
      </div>
      <div className="p-2">
        {renderFiles(files)}
      </div>
    </div>
  );
}
