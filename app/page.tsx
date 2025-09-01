import { DocsLayout } from "@/components/docs-layout"
import { DocumentationContent } from "@/components/documentation-content"

export default function HomePage() {
  return (
    <DocsLayout>
      {(projectId: string, activeSection: string) => (
        <DocumentationContent projectId={projectId} activeSection={activeSection} />
      )}
    </DocsLayout>
  )
}
