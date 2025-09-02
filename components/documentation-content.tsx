"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/code-block"
import { FormBox } from "@/components/form-box"
import { AlertCircle, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProjectContent, type ProjectContent } from "@/lib/content"
import { useBlockHeight } from "@/hooks/use-block-height"

interface DocumentationContentProps {
  projectId?: string
  activeSection?: string
}

export function DocumentationContent({ projectId = "aaron", activeSection = "overview" }: DocumentationContentProps) {
  const [nodeName, setNodeName] = useState("")
  const [walletName, setWalletName] = useState("")
  const [customPort, setCustomPort] = useState("26")
  const [content, setContent] = useState<ProjectContent | null>(null)

  useEffect(() => {
    const projectContent = getProjectContent(projectId)
    setContent(projectContent)
  }, [projectId])

  const { height: liveBlockHeight, loading: blockHeightLoading } = useBlockHeight(projectId)

  if (!content) {
    return <div>Loading project content...</div>
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const renderNetworkOverview = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center text-4xl overflow-hidden">
          {content.icon?.startsWith("http") ? (
            <img
              src={content.icon}
              alt={content.name}
              className="w-full h-full object-cover"
              style={{ borderRadius: "9999px" }}
            />
          ) : (
            <span>{content.icon}</span>
          )}
        </div>
        <h1 className="text-3xl font-bold">{content.name}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{content.overview.description}</p>
      </div>

      <Tabs defaultValue="endpoints" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="endpoints">Public Endpoints</TabsTrigger>
          <TabsTrigger value="network">Network Service</TabsTrigger>
          <TabsTrigger value="explorer">Chain Explorer</TabsTrigger>
        </TabsList>

        <TabsContent value="endpoints" className="space-y-4">
          {content.endpoints.rpc.map((endpoint, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <code className="text-sm">{endpoint}</code>
              <Button size="sm" variant="ghost" onClick={() => copyToClipboard(endpoint)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {content.endpoints.api.map((endpoint, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <code className="text-sm">{endpoint}</code>
              <Button size="sm" variant="ghost" onClick={() => copyToClipboard(endpoint)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {content.endpoints.grpc && (
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              {content.endpoints.grpc.map((endpoint, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <code className="text-sm">{endpoint}</code>
                  <Button size="sm" variant="ghost" onClick={() => copyToClipboard(endpoint)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Network Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Chain ID:</span>
                  <code>{content.networkInfo.chainId}</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Latest Block:</span>
                  <span className={blockHeightLoading ? "animate-pulse" : ""}>{liveBlockHeight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">RPC Status:</span>
                  <span>{content.networkInfo.rpcStatus}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hardware Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CPU:</span>
                  <span>{content.hardware.cores} Cores</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">RAM:</span>
                  <span>{content.hardware.ram}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Storage:</span>
                  <span>{content.hardware.storage}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="explorer">
          <Card>
            <CardHeader>
              <CardTitle>Chain Explorer</CardTitle>
              <CardDescription>Explore blocks, transactions, and network statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Chain Explorer
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )

  const renderInstallation = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="text-xs capitalize">
            {content.network}
          </Badge>
          <Badge variant="outline" className="text-xs">
            Chain ID: {content.networkInfo.chainId}
          </Badge>
          <Badge variant="outline" className="text-xs">
            Latest Block: {liveBlockHeight}
          </Badge>
          <Badge variant="outline" className="text-xs">
            RPC Status: {content.networkInfo.rpcStatus}
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
            <FormBox title="Node Configuration" description="Configure your node and wallet settings">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="node-name" className="text-sm font-medium">
                    Node Name
                  </Label>
                  <Input
                    id="node-name"
                    placeholder="test"
                    value={nodeName}
                    onChange={(e) => setNodeName(e.target.value)}
                    className="h-9 text-sm font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="port" className="text-sm font-medium">
                    Port
                  </Label>
                  <Input
                    id="port"
                    placeholder="47"
                    value={customPort}
                    onChange={(e) => setCustomPort(e.target.value)}
                    className="h-9 text-sm font-mono w-20"
                  />
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor="wallet-name" className="text-sm font-medium">
                  Wallet Name
                </Label>
                <Input
                  id="wallet-name"
                  placeholder="wallet"
                  value={walletName}
                  onChange={(e) => setWalletName(e.target.value)}
                  className="h-9 text-sm font-mono max-w-xs"
                />
              </div>
              {(nodeName || walletName) && (
                <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    Configuration preview:
                    {nodeName && (
                      <>
                        <br />
                        Node: <code className="bg-background px-1 rounded text-xs">{nodeName}</code>
                      </>
                    )}
                    {walletName && (
                      <>
                        <br />
                        Wallet: <code className="bg-background px-1 rounded text-xs">{walletName}</code>
                      </>
                    )}
                    <br />
                    Port: <code className="bg-background px-1 rounded text-xs">{customPort}</code>
                  </p>
                </div>
              )}
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

        {/* Manual Steps */}
        {content.installation.manualSteps &&
          content.installation.manualSteps.map((step, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {5 + index}
                  </span>
                  <span>{step.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="bash" code={step.commands} />
              </CardContent>
            </Card>
          ))}

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

  const renderUpgrade = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Upgrade</h1>
        <p className="text-lg text-muted-foreground">Upgrade your node to the latest version</p>
      </div>

      {content.upgrade && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upgrade to {content.upgrade.version}</CardTitle>
              <CardDescription>Upgrade Height: {content.upgrade.height}</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock language="bash" code={content.upgrade.commands} />
            </CardContent>
          </Card>

          {content.upgrade.backupCommands && (
            <Card>
              <CardHeader>
                <CardTitle>Backup Commands</CardTitle>
                <CardDescription>Run these commands before upgrading</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock language="bash" code={content.upgrade.backupCommands} />
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )

  const renderSync = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Sync</h1>
        <p className="text-lg text-muted-foreground">Synchronize your node with the network</p>
      </div>

      {content.sync && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>State Sync</CardTitle>
              <CardDescription>Fast sync using state sync</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock language="bash" code={content.sync.stateSync} />
            </CardContent>
          </Card>

          {content.sync.snapshot && (
            <Card>
              <CardHeader>
                <CardTitle>Snapshot</CardTitle>
                <CardDescription>Restore from snapshot</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock language="bash" code={content.sync.snapshot.commands} />
              </CardContent>
            </Card>
          )}

          {content.sync.addrbook && (
            <Card>
              <CardHeader>
                <CardTitle>Address Book</CardTitle>
                <CardDescription>Update address book</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock language="bash" code={content.sync.addrbook} />
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )

  const renderPublicApi = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Public API</h1>
        <p className="text-lg text-muted-foreground">Public endpoints and network information</p>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>RPC Endpoints</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {content.publicApi.rpcEndpoints.map((endpoint, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <code className="text-sm">{endpoint}</code>
                <Button size="sm" variant="ghost" onClick={() => copyToClipboard(endpoint)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Endpoints</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {content.publicApi.apiEndpoints.map((endpoint, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <code className="text-sm">{endpoint}</code>
                <Button size="sm" variant="ghost" onClick={() => copyToClipboard(endpoint)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {content.publicApi.grpcEndpoints && (
          <Card>
            <CardHeader>
              <CardTitle>gRPC Endpoints</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {content.publicApi.grpcEndpoints.map((endpoint, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <code className="text-sm">{endpoint}</code>
                  <Button size="sm" variant="ghost" onClick={() => copyToClipboard(endpoint)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {content.publicApi.peers && (
          <Card>
            <CardHeader>
              <CardTitle>Peers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {content.publicApi.peers.map((peer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <code className="text-sm">{peer}</code>
                  <Button size="sm" variant="ghost" onClick={() => copyToClipboard(peer)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {content.publicApi.seeds && (
          <Card>
            <CardHeader>
              <CardTitle>Seeds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {content.publicApi.seeds.map((seed, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <code className="text-sm">{seed}</code>
                  <Button size="sm" variant="ghost" onClick={() => copyToClipboard(seed)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )

  const renderCliCheatsheet = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">CLI Cheatsheet</h1>
        <p className="text-lg text-muted-foreground">Common CLI commands for managing your node</p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Wallet Commands</CardTitle>
          </CardHeader>
          <CardContent>
            <CodeBlock language="bash" code={content.cliCheatsheet.walletCommands} />
          </CardContent>
        </Card>

        {content.cliCheatsheet.validatorCommands && (
          <Card>
            <CardHeader>
              <CardTitle>Validator Commands</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock language="bash" code={content.cliCheatsheet.validatorCommands} />
            </CardContent>
          </Card>
        )}

        {content.cliCheatsheet.governanceCommands && (
          <Card>
            <CardHeader>
              <CardTitle>Governance Commands</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock language="bash" code={content.cliCheatsheet.governanceCommands} />
            </CardContent>
          </Card>
        )}

        {content.cliCheatsheet.utilityCommands && (
          <Card>
            <CardHeader>
              <CardTitle>Utility Commands</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock language="bash" code={content.cliCheatsheet.utilityCommands} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return renderNetworkOverview()
      case "installation":
        return renderInstallation()
      case "upgrade":
        return renderUpgrade()
      case "sync":
        return renderSync()
      case "public-api":
        return renderPublicApi()
      case "cli-cheatsheet":
        return renderCliCheatsheet()
      default:
        return renderNetworkOverview()
    }
  }

  return <div className="min-h-screen">{renderContent()}</div>
}