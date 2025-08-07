import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAllProjects } from '@/lib/docs';

export default function HomePage() {
  const projects = getAllProjects();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold tracking-tight">
              Documentation Site
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A modern, GitBook-like documentation site that automatically generates 
              navigation from Markdown files with GitHub Flavored Markdown support.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Button asChild size="lg">
                <Link href="/docs">
                  Browse All Documentation
                </Link>
              </Button>
            </div>
          </div>

          {/* Projects Section */}
          {projects.length > 0 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight">Available Projects</h2>
                <p className="text-muted-foreground mt-2">
                  Explore documentation for {projects.length} project{projects.length !== 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card key={project.slug} className="hover:shadow-lg transition-shadow duration-200">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{project.name}</CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {project.fileCount} file{project.fileCount !== 1 ? 's' : ''}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Updated {formatDate(project.lastModified)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <CardDescription className="line-clamp-3">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button asChild size="sm" className="flex-1">
                          <Link href={`/docs/${project.slug}${project.introFile ? `/${project.introFile.replace('.md', '')}` : ''}`}>
                            View Documentation
                          </Link>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/docs/${project.slug}`}>
                            Browse Files
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Features Section */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight">Features</h2>
              <p className="text-muted-foreground mt-2">
                Everything you need for modern documentation
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </div>

          {/* Getting Started Section */}
          <div className="bg-muted rounded-lg p-8">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold">Getting Started</h2>
              <div className="max-w-2xl mx-auto space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Create a new folder in <code className="bg-background px-1 py-0.5 rounded">content/docs/</code> for your project
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Add Markdown files (.md) to your project folder
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    3
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your project will automatically appear as a card on this homepage!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDate(date: Date): string {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return 'today';
  if (diffDays === 2) return 'yesterday';
  if (diffDays <= 7) return `${diffDays - 1} days ago`;
  if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
  if (diffDays <= 365) return `${Math.ceil(diffDays / 30)} months ago`;
  return `${Math.ceil(diffDays / 365)} years ago`;
}
