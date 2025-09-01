"use client"

import { useDocsLayout } from "@/components/docs-layout"
import { DocumentationContent } from "@/components/documentation-content"

export function DocsContentWrapper() {
  const { projectId, activeSection } = useDocsLayout()
  return <DocumentationContent projectId={projectId} activeSection={activeSection} />
}