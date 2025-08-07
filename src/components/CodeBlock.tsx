'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  children: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ children, language, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  return (
    <div className="relative group">
      <pre
        className={cn(
          'bg-muted rounded-lg p-4 overflow-x-auto text-sm',
          'border border-border',
          className
        )}
      >
        <code className={language ? `language-${language}` : undefined}>
          {children}
        </code>
      </pre>
      
      <button
        onClick={handleCopy}
        className={cn(
          'absolute top-2 right-2 px-3 py-1 text-xs',
          'bg-background border border-border rounded shadow-sm',
          'hover:bg-accent hover:text-accent-foreground',
          'transition-all duration-200',
          'opacity-0 group-hover:opacity-100',
          'focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring',
          copied && 'bg-primary text-primary-foreground'
        )}
        aria-label="Copy code to clipboard"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}
