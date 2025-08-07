import fs from 'fs';
import path from 'path';

export interface DocItem {
  title: string;
  slug: string[];
  path: string;
  isDirectory: boolean;
  children?: DocItem[];
}

export interface DocContent {
  content: string;
  title: string;
  slug: string[];
}

const DOCS_PATH = path.join(process.cwd(), 'content', 'docs');

/**
 * Get all documentation file paths recursively
 */
export function getDocPaths(): string[] {
  try {
    const paths: string[] = [];
    
    function walkDir(dir: string, basePath: string = '') {
      const files = fs.readdirSync(dir);
      
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          walkDir(filePath, path.join(basePath, file));
        } else if (file.endsWith('.md')) {
          const relativePath = path.join(basePath, file.replace('.md', ''));
          paths.push(relativePath);
        }
      }
    }
    
    if (fs.existsSync(DOCS_PATH)) {
      walkDir(DOCS_PATH);
    }
    
    return paths;
  } catch (error) {
    console.error('Error getting doc paths:', error);
    return [];
  }
}

/**
 * Get documentation content by slug
 */
export function getDocContent(slug: string[]): DocContent | null {
  try {
    const filePath = path.join(DOCS_PATH, ...slug) + '.md';
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract title from first heading or use filename
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : slug[slug.length - 1].replace(/-/g, ' ');
    
    return {
      content,
      title,
      slug
    };
  } catch (error) {
    console.error('Error getting doc content:', error);
    return null;
  }
}

/**
 * Build hierarchical tree structure for navigation
 */
export function getDocsTree(): DocItem[] {
  try {
    if (!fs.existsSync(DOCS_PATH)) {
      return [];
    }
    
    function buildTree(dir: string, basePath: string[] = []): DocItem[] {
      const items: DocItem[] = [];
      const files = fs.readdirSync(dir);
      
      // Sort files and directories
      files.sort((a, b) => {
        const aPath = path.join(dir, a);
        const bPath = path.join(dir, b);
        const aIsDir = fs.statSync(aPath).isDirectory();
        const bIsDir = fs.statSync(bPath).isDirectory();
        
        // Directories first, then files
        if (aIsDir && !bIsDir) return -1;
        if (!aIsDir && bIsDir) return 1;
        
        // Alphabetical within same type
        return a.localeCompare(b);
      });
      
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        const slug = [...basePath, file.replace('.md', '')];
        
        if (stat.isDirectory()) {
          const children = buildTree(filePath, slug);
          items.push({
            title: formatTitle(file),
            slug,
            path: filePath,
            isDirectory: true,
            children
          });
        } else if (file.endsWith('.md')) {
          // Try to get title from file content
          let title = formatTitle(file.replace('.md', ''));
          try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const titleMatch = content.match(/^#\s+(.+)$/m);
            if (titleMatch) {
              title = titleMatch[1];
            }
          } catch (error) {
            console.error(`Error reading file ${filePath}:`, error);
          }
          
          items.push({
            title,
            slug,
            path: filePath,
            isDirectory: false
          });
        }
      }
      
      return items;
    }
    
    return buildTree(DOCS_PATH);
  } catch (error) {
    console.error('Error building docs tree:', error);
    return [];
  }
}

/**
 * Format filename to readable title
 */
function formatTitle(filename: string): string {
  return filename
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Get all available documentation slugs for static generation
 */
export function getAllDocSlugs(): { params: { slug: string[] } }[] {
  const paths = getDocPaths();
  return paths.map(docPath => ({
    params: {
      slug: docPath.split(path.sep)
    }
  }));
}

/**
 * Check if a documentation file exists
 */
export function docExists(slug: string[]): boolean {
  try {
    const filePath = path.join(DOCS_PATH, ...slug) + '.md';
    return fs.existsSync(filePath);
  } catch (error) {
    console.error('Error checking doc existence:', error);
    return false;
  }
}
