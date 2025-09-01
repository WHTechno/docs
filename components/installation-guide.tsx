"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CodeBlock } from "@/components/code-block"
import { FormBox } from "@/components/form-box"
import { AlertCircle } from "lucide-react"
import { getProjectContent, type ProjectContent } from "@/lib/content"

interface InstallationGuideProps {
  projectId?: string
}

export function InstallationGuide({ projectId = "aaron" }: InstallationGuideProps) {
  const [nodeName, setNodeName] = useState("")
  const [walletName, setWalletName] = useState("")
  const [customPort, setCustomPort] = useState("26657")
  const [content, setContent] = useState<ProjectContent | null>(null)

  useEffect(() => {
    const projectContent = getProjectContent(projectId)
    setContent(projectContent)
  }, [projectId])

  if (!content) {
    return <div>Loading project content...</div>
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="text-xs capitalize">
            {content.network}
          </Badge>
          <Badge variant="outline" className="text-xs">
            Chain ID: {content.chainId}
          </Badge>
          <Badge variant="outline" className="text-xs">
            Block Height: {content.blockHeight}
          </Badge>
          <Badge variant="outline" className="text-xs">
            RPC Status: {content.rpcStatus}
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Manual Installation</h1>
        <p className="text-lg text-muted-foreground">
          Official documentation - Recommended hardware: {content.hardware.cores} Cores, {content.hardware.ram} RAM,{" "}
          {content.hardware.storage}
        </p>
      </div>

      <Separator />

      {/* Installation Steps */}
      <div className="space-y-6">
        {/* Step 1: Install dependencies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                1
              </span>
              <span>Install dependencies, if needed</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CodeBlock language="bash" code={content.installation.dependencies} />
          </CardContent>
        </Card>

        {/* Step 2: Node Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                2
              </span>
              <span>Node Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormBox title="Node Name" description="Enter your node name">
              <div className="space-y-2">
                <Label htmlFor="node-name">Node Name</Label>
                <Input
                  id="node-name"
                  placeholder="custom_node"
                  value={nodeName}
                  onChange={(e) => setNodeName(e.target.value)}
                  className="font-mono"
                />
                {nodeName && (
                  <p className="text-xs text-muted-foreground">
                    Will be used as: <code className="bg-muted px-1 rounded">{nodeName}</code>
                  </p>
                )}
              </div>
            </FormBox>

            <FormBox title="Wallet Configuration" description="Configure your wallet name">
              <div className="space-y-2">
                <Label htmlFor="wallet-name">Wallet Name</Label>
                <Input
                  id="wallet-name"
                  placeholder="wallet"
                  value={walletName}
                  onChange={(e) => setWalletName(e.target.value)}
                  className="font-mono"
                />
                {walletName && (
                  <p className="text-xs text-muted-foreground">
                    Wallet will be created as: <code className="bg-muted px-1 rounded">{walletName}</code>
                  </p>
                )}
              </div>
            </FormBox>

            <FormBox title="Port Configuration" description="Configure your node ports">
              <div className="space-y-2">
                <Label htmlFor="port">Port</Label>
                <Input
                  id="port"
                  value={customPort}
                  onChange={(e) => setCustomPort(e.target.value)}
                  className="font-mono"
                />
              </div>
            </FormBox>
          </CardContent>
        </Card>

        {/* Step 3: Install Go */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                3
              </span>
              <span>Install Go, if needed</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CodeBlock language="bash" code={content.installation.goInstall} />
          </CardContent>
        </Card>

        {/* Step 4: Set vars */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                4
              </span>
              <span>Set vars</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CodeBlock language="bash" code={content.generateSetVars(nodeName, walletName, customPort)} />
          </CardContent>
        </Card>

        {/* Automatic Installation */}
        <Separator />

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Automatic Installation</CardTitle>
            <CardDescription>Pruning: custom 100/0/19 | Indexer: null</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock language="bash" code={content.installation.autoInstall} />
          </CardContent>
        </Card>

        {/* Create wallet */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create wallet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                To create a new wallet, use the following command. Don't forget to save the mnemonic phrase in a safe
                place!
              </p>
            </div>

            <CodeBlock language="bash" code={content.generateWalletCommands(walletName)} />

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-4 border border-amber-200 dark:border-amber-800">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                    Save your wallet and validator address
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    Before creating a validator, you need to fund your wallet and check balance
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Node Sync Status Checker */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Node Sync Status Checker</CardTitle>
          </CardHeader>
          <CardContent>
            <CodeBlock language="bash" code={content.installation.syncChecker} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
