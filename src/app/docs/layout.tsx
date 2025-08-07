import { getDocsTree } from '@/lib/docs';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import type { DocItem } from '@/lib/docs';

function DocsSidebarContent() {
  const docsTree = getDocsTree();

  const renderDocItem = (item: DocItem, level: number = 0) => {
    if (item.isDirectory && item.children) {
      return (
        <SidebarGroup key={item.slug.join('/')}>
          <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {item.children.map((child) => renderDocItem(child, level + 1))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      );
    }

    if (level > 0) {
      return (
        <SidebarMenuSubItem key={item.slug.join('/')}>
          <SidebarMenuSubButton asChild>
            <Link href={`/docs/${item.slug.join('/')}`}>
              {item.title}
            </Link>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      );
    }

    return (
      <SidebarMenuItem key={item.slug.join('/')}>
        <SidebarMenuButton asChild>
          <Link href={`/docs/${item.slug.join('/')}`}>
            {item.title}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <h2 className="text-lg font-semibold">Documentation</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {docsTree.map((item) => renderDocItem(item))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DocsSidebarContent />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4" />
            <h1 className="text-lg font-semibold">Documentation</h1>
          </header>
          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
