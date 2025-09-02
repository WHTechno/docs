"use client"

import type { ReactNode } from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Book, Search, Menu, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ThemeToggle } from "@/components/theme-toggle"

interface DocsLayoutContextValue {
  projectId: string
  activeSection: string
  setActiveSection: (section: string) => void
}

const DocsLayoutContext = createContext<DocsLayoutContextValue | undefined>(undefined)

export function useDocsLayout() {
  const ctx = useContext(DocsLayoutContext)
  if (!ctx) throw new Error("useDocsLayout must be used within DocsLayout")
  return ctx
}

interface DocsLayoutProps {
  children: ReactNode
}

const projects = {
  mainnet: [
    { id: "aaron", name: "Aaron Network", icon: "https://pbs.twimg.com/profile_images/1805893951280332800/mhxevRzA_400x400.jpg" },
    { id: "axone", name: "Axone", icon: "https://pbs.twimg.com/profile_images/1841523650043772928/EeZIYE7B_400x400.jpg" },
    { id: "bitbadges", name: "Bitbadges", icon: "https://pbs.twimg.com/profile_images/1948901739765084160/RdCGkJt4_400x400.jpg" },
  ],
  testnet: [
    { id: "airchains", name: "Airchains", icon: "https://cdn-icons-png.flaticon.com/512/5968/5968517.png" },
    { id: "atomone-test", name: "AtomOne", icon: "https://cdn-icons-png.flaticon.com/512/5968/5968535.png" },
  ],
}

const navigationItems = [
  { title: "Network Overview", section: "overview", icon: "▶" },
  { title: "Installation", section: "installation", icon: "▶" },
  { title: "Upgrade", section: "upgrade", icon: "▶" },
  { title: "Sync", section: "sync", icon: "▶" },
  { title: "Public API", section: "public-api", icon: "▶" },
  { title: "CLI Cheatsheet", section: "cli-cheatsheet", icon: "▶" },
]

export function DocsLayout({ children }: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProject, setSelectedProject] = useState(() => projects.mainnet[0])
  const [projectSelectorOpen, setProjectSelectorOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("installation")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleProjectChange = (project: (typeof projects.mainnet)[0]) => {
    setSelectedProject(project)
    setProjectSelectorOpen(false)
  }

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    setSidebarOpen(false)
  }

  const contextValue = {
    projectId: selectedProject.id,
    activeSection,
    setActiveSection,
  }

  return (
    <DocsLayoutContext.Provider value={contextValue}>
      <div className="min-h-screen bg-background transition-colors duration-300">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 transition-all duration-200">
          <div className="container flex h-16 items-center">
            <Button
              variant="ghost"
              size="sm"
              className="mr-2 px-0 text-base hover:bg-accent/50 focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden transition-colors duration-200"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
            <div className="mr-4 hidden md:flex">
              <a className="mr-6 flex items-center space-x-2 group" href="/">
                <Book className="h-6 w-6 text-primary transition-transform duration-200 group-hover:scale-110" />
                <span className="hidden font-bold sm:inline-block text-foreground">Documentation</span>
              </a>
            </div>
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <div className="w-full flex-1 md:w-auto md:flex-none">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2" />
                  <Input
                    type="search"
                    placeholder="Search documentation..."
                    className="pl-10 h-10 bg-muted/50 border-border/50 focus:border-primary/50 focus:bg-background transition-all duration-200 md:w-[300px] lg:w-[400px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              {mounted && (
                <div className="flex items-center space-x-2">
                  <ThemeToggle />
                </div>
              )}
            </div>
          </div>
        </header>
        <div className="container flex-1 items-start md:grid md:grid-cols-[260px_minmax(0,1fr)] md:gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12">
          {/* Sidebar */}
          <aside
            className={cn(
              "fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full shrink-0 md:sticky md:block transition-all duration-300",
              sidebarOpen && "block animate-slide-in",
            )}
          >
            <div className="h-full py-8 pr-6">
              <ScrollArea className="h-full w-full">
                <div className="space-y-6">
                  <Button
                    variant="outline"
                    className="w-full justify-between h-12 px-4 border-2 border-border/50 hover:border-primary/50 bg-card/50 hover:bg-card transition-all duration-200 hover:shadow-sm"
                    onClick={() => setProjectSelectorOpen(true)}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={selectedProject.icon}
                        alt={selectedProject.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="font-semibold text-sm">{selectedProject.name}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                  </Button>
                  <div className="space-y-2 pt-2">
                    {navigationItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleSectionChange(item.section)}
                        className={cn(
                          "w-full flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 hover:translate-x-1 text-left",
                          activeSection === item.section
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                        )}
                      >
                        <span className="text-xs">{item.icon}</span>
                        <span>{item.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </div>
          </aside>
          {/* Main Content */}
          <main className="relative py-8 lg:py-10">
            <div className="mx-auto w-full min-w-0 animate-fade-in">
              {children}
            </div>
          </main>
        </div>
        <Dialog open={projectSelectorOpen} onOpenChange={setProjectSelectorOpen}>
          <DialogContent className="max-w-3xl max-h-[85vh] p-0 animate-scale-in">
            <DialogHeader className="p-6 pb-4 border-b border-border">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Select Project
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setProjectSelectorOpen(false)}
                  className="hover:bg-accent/50 transition-colors duration-200"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>
            <ScrollArea className="max-h-[65vh] px-6 pb-6">
              <div className="space-y-8">
                {/* Mainnet Section */}
                <div>
                  <h3 className="text-lg font-bold mb-4 text-foreground flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Mainnet</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {projects.mainnet.map((project) => (
                      <Button
                        key={project.id}
                        variant="outline"
                        className="h-14 justify-start space-x-3 hover:bg-accent/50 bg-card/30 border-border/50 hover:border-primary/30 transition-all duration-200 hover:shadow-sm hover:scale-[1.02]"
                        onClick={() => handleProjectChange(project)}
                      >
                        <img
                          src={project.icon}
                          alt={project.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="font-semibold">{project.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                {/* Testnet Section */}
                <div>
                  <h3 className="text-lg font-bold mb-4 text-foreground flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Testnet</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {projects.testnet.map((project) => (
                      <Button
                        key={project.id}
                        variant="outline"
                        className="h-14 justify-start space-x-3 hover:bg-accent/50 bg-card/30 border-border/50 hover:border-primary/30 transition-all duration-200 hover:shadow-sm hover:scale-[1.02]"
                        onClick={() => handleProjectChange(project)}
                      >
                        <img
                          src={project.icon}
                          alt={project.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="font-semibold">{project.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 top-16 z-20 bg-background/80 backdrop-blur-sm md:hidden animate-fade-in"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {/* Footer */}
        <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
          <div className="container py-6">
            <div className="flex items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Powered by <span className="font-semibold text-foreground">WHTech</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </DocsLayoutContext.Provider>
  )
}