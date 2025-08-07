import { getDocContent, getAllDocSlugs, docExists } from '@/lib/docs';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface DocsPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function DocsSlugPage({ params }: DocsPageProps) {
  const { slug } = await params;
  
  // Get the document content
  const docContent = getDocContent(slug);
  
  if (!docContent) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <MarkdownRenderer content={docContent.content} />
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = getAllDocSlugs();
  return slugs.map(({ params }) => ({
    slug: params.slug,
  }));
}

export async function generateMetadata({ params }: DocsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const docContent = getDocContent(slug);
  
  if (!docContent) {
    return {
      title: 'Page Not Found',
      description: 'The requested documentation page could not be found.',
    };
  }

  return {
    title: `${docContent.title} | Documentation`,
    description: `Documentation for ${docContent.title}`,
  };
}
