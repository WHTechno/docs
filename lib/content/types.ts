export interface NetworkInfo {
  chainId: string
  blockHeight: string
  rpcStatus: string
  description: string
}

export interface HardwareRequirements {
  cores: number
  ram: string
  storage: string
}

export interface EndpointInfo {
  rpc: string[]
  api: string[]
  grpc?: string[]
}

export interface ProjectContent {
  id: string
  name: string
  icon: string
  network: "mainnet" | "testnet"
  networkInfo: NetworkInfo
  hardware: HardwareRequirements
  endpoints: EndpointInfo

  // Content sections
  overview: {
    description: string
    features?: string[]
  }

  installation: {
    dependencies: string
    goVersion: string
    goInstall: string
    autoInstall: string
    manualSteps?: {
      title: string
      commands: string
    }[]
    syncChecker: string
  }

  upgrade?: {
    version: string
    height: string
    commands: string
    backupCommands?: string
  }

  sync?: {
    stateSync: string
    snapshot?: {
      url: string
      commands: string
    }
    addrbook?: string
  }

  publicApi: {
    rpcEndpoints: string[]
    apiEndpoints: string[]
    grpcEndpoints?: string[]
    peers?: string[]
    seeds?: string[]
  }

  cliCheatsheet: {
    walletCommands: string
    validatorCommands?: string
    governanceCommands?: string
    utilityCommands?: string
  }

  // Dynamic content generators
  generateSetVars: (nodeName: string, walletName: string, port: string) => string
  generateWalletCommands: (walletName: string) => string
}
