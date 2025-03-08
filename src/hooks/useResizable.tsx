
import { useState, useCallback, useEffect } from 'react';

interface UseResizableOptions {
  initialSize?: number;
  minSize?: number;
  maxSize?: number;
  direction?: 'horizontal' | 'vertical';
  storageKey?: string;
}

export function useResizable({
  initialSize = 50,
  minSize = 20,
  maxSize = 80,
  direction = 'horizontal',
  storageKey,
}: UseResizableOptions = {}) {
  // Try to get stored size from localStorage if a storageKey is provided
  const getInitialSize = useCallback(() => {
    if (storageKey) {
      const storedSize = localStorage.getItem(storageKey);
      if (storedSize) {
        const parsed = parseFloat(storedSize);
        if (!isNaN(parsed)) {
          return Math.max(minSize, Math.min(maxSize, parsed));
        }
      }
    }
    return initialSize;
  }, [initialSize, minSize, maxSize, storageKey]);

  const [size, setSize] = useState<number>(getInitialSize);
  const [isResizing, setIsResizing] = useState(false);

  // Store size in localStorage when it changes
  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, size.toString());
    }
  }, [size, storageKey]);

  const handleResizeStart = useCallback(() => {
    setIsResizing(true);
    document.body.style.cursor = direction === 'horizontal' ? 'ew-resize' : 'ns-resize';
  }, [direction]);

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
    document.body.style.cursor = '';
  }, []);

  const handleResize = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!isResizing) return;

      const clientPosition = 'touches' in event 
        ? event.touches[0].clientX || event.touches[0].clientY
        : direction === 'horizontal' ? event.clientX : event.clientY;
      
      const containerSize = direction === 'horizontal' 
        ? window.innerWidth 
        : window.innerHeight;
      
      const newSize = (clientPosition / containerSize) * 100;
      
      // Clamp the size between minSize and maxSize
      const clampedSize = Math.max(minSize, Math.min(maxSize, newSize));
      setSize(clampedSize);
    },
    [isResizing, direction, minSize, maxSize]
  );

  // Set up and clean up event listeners
  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('touchmove', handleResize);
      window.addEventListener('mouseup', handleResizeEnd);
      window.addEventListener('touchend', handleResizeEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('touchmove', handleResize);
      window.removeEventListener('mouseup', handleResizeEnd);
      window.removeEventListener('touchend', handleResizeEnd);
    };
  }, [isResizing, handleResize, handleResizeEnd]);

  return {
    size,
    isResizing,
    handleResizeStart,
    handleResizeEnd,
    setSize,
  };
}
