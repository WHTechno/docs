import type { ProjectContent } from "../types"

export const bitbadgesContent: ProjectContent = {
  id: "bitbadges",
  name: "BitBadges",
  icon: "https://pbs.twimg.com/profile_images/1948901739765084160/RdCGkJt4_400x400.jpg",
  network: "mainnet",

  networkInfo: {
    chainId: "bitbadges-1",
    blockHeight: "8,234,567",
    rpcStatus: "✅",
    description:
      "BitBadges is a Cosmos-SDK blockchain enabling no-code tokenization with multi-chain NFTs, time-based credentials, transfer controls, and off-chain integrations for authentication, subscriptions, and token-gated experiences.",
  },

  hardware: {
    cores: 4,
    ram: "16GB",
    storage: "500GB (SSD)",
  },

  endpoints: {
    rpc: ["https://rpc-bitbadges.vinjan.xyz"],
    api: ["https://api-bitbadges.sychonix.com"],
    grpc: ["https://grpc-bitbadges.sychonix.com"],
  },

  overview: {
    description:
      "BitBadges is a Cosmos-SDK blockchain enabling no-code tokenization with multi-chain NFTs, time-based credentials, transfer controls, and off-chain integrations for authentication, subscriptions, and token-gated experiences.",
    features: [
      "No-code tokenization platform",
      "Multi-chain NFT support",
      "Time-based credentials",
      "Transfer controls and restrictions",
      "Off-chain integrations",
      "Token-gated experiences",
    ],
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

    autoInstall: `source <(curl -s https://itrocket.net/api/mainnet/bitbadges/autoinstall/)`,

    manualSteps: [
      {
        title: "Download and build binaries",
        commands: `cd $HOME
rm -rf bitbadgeschain
git clone https://github.com/BitBadges/bitbadgeschain.git
cd bitbadgeschain
git checkout v1.0-betanet
make build
mkdir -p $HOME/.bitbadgeschain/cosmovisor/genesis/bin
mv build/bitbadgeschaind $HOME/.bitbadgeschain/cosmovisor/genesis/bin/
rm -rf build`,
      },
      {
        title: "Create application symlinks",
        commands: `sudo ln -s $HOME/.bitbadgeschain/cosmovisor/genesis/bin/bitbadgeschaind /usr/local/bin/bitbadgeschaind`,
      },
      {
        title: "Initialize the node",
        commands: `bitbadgeschaind config chain-id bitbadges-1
bitbadgeschaind config keyring-backend test
bitbadgeschaind config node tcp://localhost:26657
bitbadgeschaind init $MONIKER --chain-id bitbadges-1`,
      },
      {
        title: "Download genesis and addrbook",
        commands: `wget -O $HOME/.bitbadgeschain/config/genesis.json https://testnet-files.itrocket.net/bitbadges/genesis.json
wget -O $HOME/.bitbadgeschain/config/addrbook.json https://testnet-files.itrocket.net/bitbadges/addrbook.json`,
      },
    ],

    syncChecker: `#!/bin/bash
rpc_port=$(grep -m 1 -oP '^laddr = "\\K[^"]*' "$HOME/.bitbadgeschain/config/config.toml" | cut -d ':' -f 3)
while true; do
  local_height=$(curl -s localhost:$rpc_port/status | jq -r '.result.sync_info.latest_block_height')
  network_height=$(curl -s https://bitbadges-rpc.itrocket.net/status | jq -r '.result.sync_info.latest_block_height')
  
  if ! [[ "$local_height" =~ ^[0-9]+$ ]] || ! [[ "$network_height" =~ ^[0-9]+$ ]]; then
    echo -e "\\033[1;31mError: Invalid block height data. Retrying...\\033[0m"
    sleep 5
    continue
  fi
  
  blocks_left=$((network_height - local_height))
  if [ "$blocks_left" -lt 0 ]; then
    blocks_left=0
  fi
  
  echo -e "\\033[1;33mNode Height:\\033[1;34m $local_height\\033[0m \\033[1;33m| Network Height:\\033[1;36m $network_height\\033[0m \\033[1;33m| Blocks Left:\\033[1;31m $blocks_left\\033[0m"
  
  sleep 5
done`,
  },

  upgrade: {
    version: "v1.0.1-betanet",
    height: "8300000",
    commands: `cd $HOME
rm -rf bitbadgeschain
git clone https://github.com/BitBadges/bitbadgeschain.git
cd bitbadgeschain
git checkout v1.0.1-betanet
make build
$HOME/.bitbadgeschain/cosmovisor/current/bin/bitbadgeschaind version --long | grep -E "(version|commit)"
cp build/bitbadgeschaind $HOME/.bitbadgeschain/cosmovisor/current/bin/
sudo systemctl restart bitbadgeschaind && sudo journalctl -u bitbadgeschaind -f`,
    backupCommands: `cp $HOME/.bitbadgeschain/data/priv_validator_state.json $HOME/.bitbadgeschain/priv_validator_state.json.backup
bitbadgeschaind tendermint unsafe-reset-all --home $HOME/.bitbadgeschain`,
  },

  sync: {
    stateSync: `sudo systemctl stop bitbadgeschaind
cp $HOME/.bitbadgeschain/data/priv_validator_state.json $HOME/.bitbadgeschain/priv_validator_state.json.backup
bitbadgeschaind tendermint unsafe-reset-all --home $HOME/.bitbadgeschain

STATE_SYNC_RPC=https://bitbadges-rpc.itrocket.net:443
STATE_SYNC_PEER=d5519e378247dfb61dfe90652d1fe3e2b3005a5b@bitbadges-rpc.itrocket.net:26656
LATEST_HEIGHT=$(curl -s $STATE_SYNC_RPC/block | jq -r .result.block.header.height)
SYNC_BLOCK_HEIGHT=$(($LATEST_HEIGHT - 1000))
SYNC_BLOCK_HASH=$(curl -s "$STATE_SYNC_RPC/block?height=$SYNC_BLOCK_HEIGHT" | jq -r .result.block_id.hash)

sed -i \\
  -e "s|^enable *=.*|enable = true|" \\
  -e "s|^rpc_servers *=.*|rpc_servers = \\"$STATE_SYNC_RPC,$STATE_SYNC_RPC\\"|" \\
  -e "s|^trust_height *=.*|trust_height = $SYNC_BLOCK_HEIGHT|" \\
  -e "s|^trust_hash *=.*|trust_hash = \\"$SYNC_BLOCK_HASH\\"|" \\
  -e "s|^persistent_peers *=.*|persistent_peers = \\"$STATE_SYNC_PEER\\"|" \\
  $HOME/.bitbadgeschain/config/config.toml

mv $HOME/.bitbadgeschain/priv_validator_state.json.backup $HOME/.bitbadgeschain/data/priv_validator_state.json
sudo systemctl start bitbadgeschaind && sudo journalctl -u bitbadgeschaind -f`,

    snapshot: {
      url: "https://testnet-files.itrocket.net/bitbadges/snap_bitbadges.tar.lz4",
      commands: `sudo systemctl stop bitbadgeschaind
cp $HOME/.bitbadgeschain/data/priv_validator_state.json $HOME/.bitbadgeschain/priv_validator_state.json.backup
rm -rf $HOME/.bitbadgeschain/data
curl -o - -L https://testnet-files.itrocket.net/bitbadges/snap_bitbadges.tar.lz4 | lz4 -c -d - | tar -x -C $HOME/.bitbadgeschain
mv $HOME/.bitbadgeschain/priv_validator_state.json.backup $HOME/.bitbadgeschain/data/priv_validator_state.json
sudo systemctl restart bitbadgeschaind && sudo journalctl -u bitbadgeschaind -f`,
    },
  },

  publicApi: {
    rpcEndpoints: ["https://lcd.bitbadges.io"],
    apiEndpoints: ["https://api-bitbadges.sychonix.com"],
    grpcEndpoints: ["https://grpc-bitbadges.sychonix.com"],
    peers: ["d5519e378247dfb61dfe90652d1fe3e2b3005a5b@bitbadges-rpc.itrocket.net:26656"],
    seeds: ["8542cd7e6bf9d260fef543bc49e59be5a3fa9074@seed.publicnode.com:26656"],
  },

  cliCheatsheet: {
    walletCommands: `# Create wallet
bitbadgeschaind keys add wallet

# Restore wallet
bitbadgeschaind keys add wallet --recover

# List wallets
bitbadgeschaind keys list

# Delete wallet
bitbadgeschaind keys delete wallet

# Export wallet to file
bitbadgeschaind keys export wallet

# Import wallet from file
bitbadgeschaind keys import wallet wallet.backup

# Query wallet balance
bitbadgeschaind q bank balances $(bitbadgeschaind keys show wallet -a)`,

    validatorCommands: `# Create validator
bitbadgeschaind tx staking create-validator \\
--amount 1000000ubadge \\
--from wallet \\
--commission-rate 0.1 \\
--commission-max-rate 0.2 \\
--commission-max-change-rate 0.01 \\
--min-self-delegation 1 \\
--pubkey $(bitbadgeschaind tendermint show-validator) \\
--moniker "test" \\
--identity "" \\
--website "" \\
--details "I love blockchain ❤️" \\
--chain-id bitbadges-1 \\
--gas auto --gas-adjustment 1.5 \\
-y`,

    governanceCommands: `# List all proposals
bitbadgeschaind query gov proposals

# View proposal by ID
bitbadgeschaind query gov proposal 1

# Vote 'Yes'
bitbadgeschaind tx gov vote 1 yes --from wallet --chain-id bitbadges-1 --gas auto --gas-adjustment 1.5 -y`,

    utilityCommands: `# Update Indexer
sed -i -e 's|^indexer *=.*|indexer = "null"|' $HOME/.bitbadgeschain/config/config.toml

# Update pruning
sed -i -e 's|^pruning *=.*|pruning = "custom"|' $HOME/.bitbadgeschain/config/app.toml
sed -i -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' $HOME/.bitbadgeschain/config/app.toml

# Set minimum gas price
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \\"0ubadge\\"|" $HOME/.bitbadgeschain/config/app.toml

# Remove node
cd $HOME
sudo systemctl stop bitbadgeschaind
sudo systemctl disable bitbadgeschaind
sudo rm /etc/systemd/system/bitbadgeschaind.service
sudo systemctl daemon-reload
rm -f $(which bitbadgeschaind)
rm -rf $HOME/.bitbadgeschain
rm -rf $HOME/bitbadgeschain`,
  },

  generateSetVars: (nodeName: string, walletName: string, port: string) => {
    const moniker = nodeName.trim() || "YOUR_MONIKER_HERE"
    const wallet = walletName.trim() || "wallet"
    return `echo "export WALLET="${wallet}"" >> $HOME/.bash_profile
echo "export MONIKER="${moniker}"" >> $HOME/.bash_profile
echo "export BITBADGES_CHAIN_ID="bitbadges-1"" >> $HOME/.bash_profile
echo "export BITBADGES_PORT="${port}"" >> $HOME/.bash_profile
source $HOME/.bash_profile`
  },

  generateWalletCommands: (walletName: string) => {
    const wallet = walletName.trim() || "$WALLET"
    return `bitbadgeschaind keys add ${wallet}

# Restore existing wallet
bitbadgeschaind keys add ${wallet} --recover

# List all wallets
bitbadgeschaind keys list

# Delete wallet
bitbadgeschaind keys delete ${wallet}`
  },
}