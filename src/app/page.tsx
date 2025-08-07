import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight">
              Documentation Site
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A modern, GitBook-like documentation site that automatically generates 
              navigation from Markdown files with GitHub Flavored Markdown support.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/docs">
                Browse Documentation
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            <Card>
              <CardHeader>
                <CardTitle>Automatic Navigation</CardTitle>
                <CardDescription>
                  Files are automatically added to the sidebar based on folder structure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Simply add .md files to the content/docs folder and they'll appear 
                  in the navigation automatically.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>GitHub Flavored Markdown</CardTitle>
                <CardDescription>
                  Full support for tables, code blocks, task lists, and more
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Write documentation using familiar Markdown syntax with 
                  GitHub-style extensions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Copy Code Blocks</CardTitle>
                <CardDescription>
                  Code blocks automatically include copy buttons for easy use
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Linux commands and code snippets can be copied with a single click.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 p-6 bg-muted rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <div className="text-left max-w-2xl mx-auto space-y-2">
              <p className="text-sm text-muted-foreground">
                1. Add your Markdown files to the <code className="bg-background px-1 py-0.5 rounded">content/docs</code> folder
              </p>
              <p className="text-sm text-muted-foreground">
                2. Organize files in subfolders to create menu sections
              </p>
              <p className="text-sm text-muted-foreground">
                3. Use standard Markdown syntax - the site handles the rest!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
