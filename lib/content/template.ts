import type { ProjectContent } from "./types"

// Template for creating new project content
export const projectTemplate: ProjectContent = {
  id: "project-id",
  name: "Project Name",
  icon: "🔗", // Use appropriate emoji or icon
  network: "mainnet", // or "testnet"

  networkInfo: {
    chainId: "chain-id-1",
    blockHeight: "1,000,000",
    rpcStatus: "✅", // or "❌" or "⚠️"
    description: "Brief description of the blockchain project and its purpose.",
  },

  hardware: {
    cores: 4, // Minimum CPU cores
    ram: "16GB", // Minimum RAM
    storage: "500GB (SSD)", // Minimum storage
  },

  endpoints: {
    rpc: ["https://rpc-project.example.com"],
    api: ["https://api-project.example.com"],
    grpc: ["https://grpc-project.example.com"], // Optional
  },

  overview: {
    description: "Detailed description of the project, its features, and use cases.",
    features: ["Feature 1", "Feature 2", "Feature 3"],
  },

  installation: {
    dependencies: `sudo apt update && sudo apt upgrade -y
sudo apt install curl build-essential git wget jq make gcc tmux chrony -y`,

    goVersion: "1.21.3",
    goInstall: `cd $HOME
VER="1.21.3"
wget "https://golang.org/dl/go$VER.linux-amd64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$VER.linux-amd64.tar.gz"
rm "go$VER.linux-amd64.tar.gz"
[ ! -f ~/.bash_profile ] && touch ~/.bash_profile
echo "export PATH=$PATH:/usr/local/go/bin:~/go/bin" >> ~/.bash_profile
source $HOME/.bash_profile
[ ! -d ~/go/bin ] && mkdir -p ~/go/bin`,

    autoInstall: `source <(curl -s https://example.com/autoinstall/)`,

    manualSteps: [
      {
        title: "Download and build binaries",
        commands: `cd $HOME
rm -rf project-repo
git clone https://github.com/project/repo.git
cd project-repo
git checkout v1.0.0
make build`,
      },
    ],

    syncChecker: `#!/bin/bash
# Sync checker script for monitoring node synchronization
rpc_port=$(grep -m 1 -oP '^laddr = "\\K[^"]*' "$HOME/.project/config/config.toml" | cut -d ':' -f 3)
while true; do
  local_height=$(curl -s localhost:$rpc_port/status | jq -r '.result.sync_info.latest_block_height')
  network_height=$(curl -s https://rpc-project.example.com/status | jq -r '.result.sync_info.latest_block_height')
  
  echo -e "\\033[1;33mNode Height:\\033[1;34m $local_height\\033[0m \\033[1;33m| Network Height:\\033[1;36m $network_height\\033[0m"
  sleep 5
done`,
  },

  upgrade: {
    version: "v1.0.1",
    height: "1100000",
    commands: `# Upgrade commands here`,
    backupCommands: `# Backup commands here`,
  },

  sync: {
    stateSync: `# State sync commands here`,
    snapshot: {
      url: "https://snapshots.example.com/snapshot.tar.lz4",
      commands: `# Snapshot restore commands here`,
    },
  },

  publicApi: {
    rpcEndpoints: ["https://rpc-project.example.com"],
    apiEndpoints: ["https://api-project.example.com"],
    grpcEndpoints: ["https://grpc-project.example.com"],
    peers: ["peer@example.com:26656"],
    seeds: ["seed@example.com:26656"],
  },

  cliCheatsheet: {
    walletCommands: `# Wallet management commands`,
    validatorCommands: `# Validator management commands`,
    governanceCommands: `# Governance commands`,
    utilityCommands: `# Utility commands`,
  },

  generateSetVars: (nodeName: string, walletName: string, port: string) => {
    const moniker = nodeName.trim() || "YOUR_MONIKER_HERE"
    const wallet = walletName.trim() || "wallet"
    return `echo "export WALLET="${wallet}"" >> $HOME/.bash_profile
echo "export MONIKER="${moniker}"" >> $HOME/.bash_profile
echo "export CHAIN_ID="chain-id-1"" >> $HOME/.bash_profile
echo "export PORT="${port}"" >> $HOME/.bash_profile
source $HOME/.bash_profile`
  },

  generateWalletCommands: (walletName: string) => {
    const wallet = walletName.trim() || "$WALLET"
    return `projectd keys add ${wallet}

# Restore existing wallet
projectd keys add ${wallet} --recover

# List all wallets
projectd keys list

# Delete wallet
projectd keys delete ${wallet}`
  },
}
