'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { CodeBlock } from './CodeBlock';
import { cn } from '@/lib/utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn('prose prose-neutral dark:prose-invert max-w-none', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          code({ className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : undefined;
            const inline = !match;
            
            if (!inline && children) {
              return (
                <CodeBlock
                  language={language}
                  className={className}
                >
                  {String(children).replace(/\n$/, '')}
                </CodeBlock>
              );
            }
            
            return (
              <code className={cn('bg-muted px-1 py-0.5 rounded text-sm', className)} {...props}>
                {children}
              </code>
            );
          },
          pre({ children }) {
            return <>{children}</>;
          },
          h1({ children }) {
            return (
              <h1 className="text-4xl font-bold tracking-tight mb-6 pb-2 border-b border-border">
                {children}
              </h1>
            );
          },
          h2({ children }) {
            return (
              <h2 className="text-3xl font-semibold tracking-tight mb-4 mt-8 pb-2 border-b border-border">
                {children}
              </h2>
            );
          },
          h3({ children }) {
            return (
              <h3 className="text-2xl font-semibold tracking-tight mb-3 mt-6">
                {children}
              </h3>
            );
          },
          h4({ children }) {
            return (
              <h4 className="text-xl font-semibold tracking-tight mb-2 mt-4">
                {children}
              </h4>
            );
          },
          h5({ children }) {
            return (
              <h5 className="text-lg font-semibold tracking-tight mb-2 mt-4">
                {children}
              </h5>
            );
          },
          h6({ children }) {
            return (
              <h6 className="text-base font-semibold tracking-tight mb-2 mt-4">
                {children}
              </h6>
            );
          },
          p({ children }) {
            return <p className="mb-4 leading-7">{children}</p>;
          },
          ul({ children }) {
            return <ul className="mb-4 ml-6 list-disc space-y-1">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="mb-4 ml-6 list-decimal space-y-1">{children}</ol>;
          },
          li({ children }) {
            return <li className="leading-7">{children}</li>;
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                {children}
              </blockquote>
            );
          },
          table({ children }) {
            return (
              <div className="my-6 overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }) {
            return <thead className="bg-muted">{children}</thead>;
          },
          tbody({ children }) {
            return <tbody>{children}</tbody>;
          },
          tr({ children }) {
            return <tr className="border-b border-border">{children}</tr>;
          },
          th({ children }) {
            return (
              <th className="border border-border px-4 py-2 text-left font-semibold">
                {children}
              </th>
            );
          },
          td({ children }) {
            return <td className="border border-border px-4 py-2">{children}</td>;
          },
          a({ href, children }) {
            return (
              <a
                href={href}
                className="text-primary hover:text-primary/80 underline underline-offset-4"
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {children}
              </a>
            );
          },
          img({ src, alt }) {
            return (
              <img
                src={src}
                alt={alt}
                className="max-w-full h-auto rounded-lg border border-border my-4"
              />
            );
          },
          hr() {
            return <hr className="my-8 border-border" />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
