import { getDocContent } from '@/lib/docs';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { notFound } from 'next/navigation';

export default function DocsPage() {
  // Try to load the introduction.md file
  const introContent = getDocContent(['introduction']);
  
  if (!introContent) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Documentation</h1>
          <p className="text-xl text-muted-foreground">
            Welcome to our documentation site
          </p>
        </div>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p>
            This documentation site automatically generates navigation from Markdown files 
            in the <code>content/docs</code> folder.
          </p>
          
          <h2>Getting Started</h2>
          <p>
            To add new documentation:
          </p>
          <ol>
            <li>Create a new <code>.md</code> file in the <code>content/docs</code> folder</li>
            <li>The file will automatically appear in the navigation</li>
            <li>Use standard Markdown syntax with GitHub Flavored Markdown support</li>
          </ol>
          
          <h2>Features</h2>
          <ul>
            <li><strong>Automatic Navigation</strong>: Files are automatically added to the sidebar based on folder structure</li>
            <li><strong>GitHub Flavored Markdown</strong>: Full support for tables, code blocks, and more</li>
            <li><strong>Copy Code Blocks</strong>: Code blocks have automatic copy buttons</li>
            <li><strong>Responsive Design</strong>: Works on all devices</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <MarkdownRenderer content={introContent.content} />
    </div>
  );
}

export const metadata = {
  title: 'Documentation',
  description: 'Browse our comprehensive documentation',
};
