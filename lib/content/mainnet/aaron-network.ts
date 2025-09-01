import type { ProjectContent } from "../types"

export const aaronNetworkContent: ProjectContent = {
  id: "aaron",
  name: "Aaron Network",
  icon: "🅰️",
  network: "mainnet",

  networkInfo: {
    chainId: "aaron-1",
    blockHeight: "11,145,482",
    rpcStatus: "✅",
    description:
      "Aaron Network is a decentralized platform offering secure messaging and address reputation tools, inspired by Aaron Swartz, to enhance communication and transparency in blockchain.",
  },

  hardware: {
    cores: 8,
    ram: "32GB",
    storage: "1TB (NVME)",
  },

  endpoints: {
    rpc: ["https://rpc-aaronnetwork.sychonix.com"],
    api: ["https://api-aaronnetwork.sychonix.com"],
    grpc: ["https://grpc-aaronnetwork.sychonix.com"],
  },

  overview: {
    description:
      "Aaron Network is a decentralized platform offering secure messaging and address reputation tools, inspired by Aaron Swartz, to enhance communication and transparency in blockchain.",
    features: [
      "Secure messaging system",
      "Address reputation tools",
      "Enhanced blockchain communication",
      "Transparency-focused design",
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

    autoInstall: `source <(curl -s https://itrocket.net/api/mainnet/aaron/autoinstall/)`,

    manualSteps: [
      {
        title: "Download and build binaries",
        commands: `cd $HOME
rm -rf aaron
git clone https://github.com/aaronnetwork/aaron.git
cd aaron
git checkout v1.0.0
make build
mkdir -p $HOME/.aaron/cosmovisor/genesis/bin
mv build/aarond $HOME/.aaron/cosmovisor/genesis/bin/
rm -rf build`,
      },
      {
        title: "Create application symlinks",
        commands: `sudo ln -s $HOME/.aaron/cosmovisor/genesis/bin/aarond /usr/local/bin/aarond`,
      },
      {
        title: "Initialize the node",
        commands: `aarond config chain-id aaron-1
aarond config keyring-backend test
aarond config node tcp://localhost:26657
aarond init $MONIKER --chain-id aaron-1`,
      },
      {
        title: "Download genesis and addrbook",
        commands: `wget -O $HOME/.aaron/config/genesis.json https://testnet-files.itrocket.net/aaron/genesis.json
wget -O $HOME/.aaron/config/addrbook.json https://testnet-files.itrocket.net/aaron/addrbook.json`,
      },
    ],

    syncChecker: `#!/bin/bash
rpc_port=$(grep -m 1 -oP '^laddr = "\\K[^"]*' "$HOME/.aaron/config/config.toml" | cut -d ':' -f 3)
while true; do
  local_height=$(curl -s localhost:$rpc_port/status | jq -r '.result.sync_info.latest_block_height')
  network_height=$(curl -s https://aaron-rpc.itrocket.net/status | jq -r '.result.sync_info.latest_block_height')
  
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
    version: "v1.0.1",
    height: "11200000",
    commands: `cd $HOME
rm -rf aaron
git clone https://github.com/aaronnetwork/aaron.git
cd aaron
git checkout v1.0.1
make build
$HOME/.aaron/cosmovisor/current/bin/aarond version --long | grep -E "(version|commit)"
cp build/aarond $HOME/.aaron/cosmovisor/current/bin/
sudo systemctl restart aarond && sudo journalctl -u aarond -f`,
    backupCommands: `cp $HOME/.aaron/data/priv_validator_state.json $HOME/.aaron/priv_validator_state.json.backup
aarond tendermint unsafe-reset-all --home $HOME/.aaron`,
  },

  sync: {
    stateSync: `sudo systemctl stop aarond
cp $HOME/.aaron/data/priv_validator_state.json $HOME/.aaron/priv_validator_state.json.backup
aarond tendermint unsafe-reset-all --home $HOME/.aaron

STATE_SYNC_RPC=https://aaron-rpc.itrocket.net:443
STATE_SYNC_PEER=d5519e378247dfb61dfe90652d1fe3e2b3005a5b@aaron-rpc.itrocket.net:26656
LATEST_HEIGHT=$(curl -s $STATE_SYNC_RPC/block | jq -r .result.block.header.height)
SYNC_BLOCK_HEIGHT=$(($LATEST_HEIGHT - 1000))
SYNC_BLOCK_HASH=$(curl -s "$STATE_SYNC_RPC/block?height=$SYNC_BLOCK_HEIGHT" | jq -r .result.block_id.hash)

sed -i \\
  -e "s|^enable *=.*|enable = true|" \\
  -e "s|^rpc_servers *=.*|rpc_servers = \\"$STATE_SYNC_RPC,$STATE_SYNC_RPC\\"|" \\
  -e "s|^trust_height *=.*|trust_height = $SYNC_BLOCK_HEIGHT|" \\
  -e "s|^trust_hash *=.*|trust_hash = \\"$SYNC_BLOCK_HASH\\"|" \\
  -e "s|^persistent_peers *=.*|persistent_peers = \\"$STATE_SYNC_PEER\\"|" \\
  $HOME/.aaron/config/config.toml

mv $HOME/.aaron/priv_validator_state.json.backup $HOME/.aaron/data/priv_validator_state.json
sudo systemctl start aarond && sudo journalctl -u aarond -f`,

    snapshot: {
      url: "https://testnet-files.itrocket.net/aaron/snap_aaron.tar.lz4",
      commands: `sudo systemctl stop aarond
cp $HOME/.aaron/data/priv_validator_state.json $HOME/.aaron/priv_validator_state.json.backup
rm -rf $HOME/.aaron/data
curl -o - -L https://testnet-files.itrocket.net/aaron/snap_aaron.tar.lz4 | lz4 -c -d - | tar -x -C $HOME/.aaron
mv $HOME/.aaron/priv_validator_state.json.backup $HOME/.aaron/data/priv_validator_state.json
sudo systemctl restart aarond && sudo journalctl -u aarond -f`,
    },

    addrbook: `wget -O $HOME/.aaron/config/addrbook.json https://testnet-files.itrocket.net/aaron/addrbook.json
sudo systemctl restart aarond && sudo journalctl -u aarond -f`,
  },

  publicApi: {
    rpcEndpoints: ["https://rpc-aaronnetwork.sychonix.com"],
    apiEndpoints: ["https://api-aaronnetwork.sychonix.com"],
    grpcEndpoints: ["https://grpc-aaronnetwork.sychonix.com"],
    peers: ["d5519e378247dfb61dfe90652d1fe3e2b3005a5b@aaron-rpc.itrocket.net:26656"],
    seeds: ["8542cd7e6bf9d260fef543bc49e59be5a3fa9074@seed.publicnode.com:26656"],
  },

  cliCheatsheet: {
    walletCommands: `# Create wallet
aarond keys add wallet

# Restore wallet
aarond keys add wallet --recover

# List wallets
aarond keys list

# Delete wallet
aarond keys delete wallet

# Export wallet to file
aarond keys export wallet

# Import wallet from file
aarond keys import wallet wallet.backup

# Query wallet balance
aarond q bank balances $(aarond keys show wallet -a)`,

    validatorCommands: `# Create validator
aarond tx staking create-validator \\
--amount 1000000uaaron \\
--from wallet \\
--commission-rate 0.1 \\
--commission-max-rate 0.2 \\
--commission-max-change-rate 0.01 \\
--min-self-delegation 1 \\
--pubkey $(aarond tendermint show-validator) \\
--moniker "test" \\
--identity "" \\
--website "" \\
--details "I love blockchain ❤️" \\
--chain-id aaron-1 \\
--gas auto --gas-adjustment 1.5 \\
-y

# Edit validator
aarond tx staking edit-validator \\
--new-moniker "test" \\
--identity "" \\
--website "" \\
--details "I love blockchain ❤️" \\
--from wallet \\
--chain-id aaron-1 \\
--gas auto --gas-adjustment 1.5 \\
-y

# Unjail validator
aarond tx slashing unjail --from wallet --chain-id aaron-1 --gas auto --gas-adjustment 1.5 -y

# Jail reason
aarond query slashing signing-info $(aarond tendermint show-validator)

# List all active validators
aarond q staking validators -oj --limit=3000 | jq '.validators[] | select(.status=="BOND_STATUS_BONDED")' | jq -r '(.tokens|tonumber/pow(10; 6)|floor|tostring) + " \\t " + .description.moniker' | sort -gr | nl

# List all inactive validators
aarond q staking validators -oj --limit=3000 | jq '.validators[] | select(.status=="BOND_STATUS_UNBONDED")' | jq -r '(.tokens|tonumber/pow(10; 6)|floor|tostring) + " \\t " + .description.moniker' | sort -gr | nl`,

    governanceCommands: `# List all proposals
aarond query gov proposals

# View proposal by ID
aarond query gov proposal 1

# Vote 'Yes'
aarond tx gov vote 1 yes --from wallet --chain-id aaron-1 --gas auto --gas-adjustment 1.5 -y

# Vote 'No'
aarond tx gov vote 1 no --from wallet --chain-id aaron-1 --gas auto --gas-adjustment 1.5 -y

# Vote 'Abstain'
aarond tx gov vote 1 abstain --from wallet --chain-id aaron-1 --gas auto --gas-adjustment 1.5 -y

# Vote 'NoWithVeto'
aarond tx gov vote 1 NoWithVeto --from wallet --chain-id aaron-1 --gas auto --gas-adjustment 1.5 -y`,

    utilityCommands: `# Update ports
export CUSTOM_PORT=110
sed -i -e "s%^proxy_app = \\"tcp://127.0.0.1:26658\\"%proxy_app = \\"tcp://127.0.0.1:\${CUSTOM_PORT}58\\"%; s%^laddr = \\"tcp://127.0.0.1:26657\\"%laddr = \\"tcp://127.0.0.1:\${CUSTOM_PORT}57\\"%; s%^pprof_laddr = \\"localhost:6060\\"%pprof_laddr = \\"localhost:\${CUSTOM_PORT}60\\"%; s%^laddr = \\"tcp://0.0.0.0:26656\\"%laddr = \\"tcp://0.0.0.0:\${CUSTOM_PORT}56\\"%; s%^prometheus_listen_addr = \\":26660\\"%prometheus_listen_addr = \\":\${CUSTOM_PORT}66\\"%" $HOME/.aaron/config/config.toml
sed -i -e "s%^address = \\"tcp://0.0.0.0:1317\\"%address = \\"tcp://0.0.0.0:\${CUSTOM_PORT}17\\"%; s%^address = \\":8080\\"%address = \\":\${CUSTOM_PORT}80\\"%; s%^address = \\"0.0.0.0:9090\\"%address = \\"0.0.0.0:\${CUSTOM_PORT}90\\"%; s%^address = \\"0.0.0.0:9091\\"%address = \\"0.0.0.0:\${CUSTOM_PORT}91\\"%" $HOME/.aaron/config/app.toml

# Update Indexer
sed -i -e 's|^indexer *=.*|indexer = "null"|' $HOME/.aaron/config/config.toml

# Update pruning
sed -i -e 's|^pruning *=.*|pruning = "custom"|' $HOME/.aaron/config/app.toml
sed -i -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' $HOME/.aaron/config/app.toml
sed -i -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' $HOME/.aaron/config/app.toml
sed -i -e 's|^pruning-interval *=.*|pruning-interval = "19"|' $HOME/.aaron/config/app.toml

# Set minimum gas price
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \\"0uaaron\\"|" $HOME/.aaron/config/app.toml

# Enable prometheus
sed -i -e "s/prometheus = false/prometheus = true/" $HOME/.aaron/config/config.toml

# Reset chain data
aarond tendermint unsafe-reset-all --keep-addr-book --home $HOME/.aaron

# Remove node
cd $HOME
sudo systemctl stop aarond
sudo systemctl disable aarond
sudo rm /etc/systemd/system/aarond.service
sudo systemctl daemon-reload
rm -f $(which aarond)
rm -rf $HOME/.aaron
rm -rf $HOME/aaron`,
  },

  generateSetVars: (nodeName: string, walletName: string, port: string) => {
    const moniker = nodeName.trim() || "YOUR_MONIKER_HERE"
    const wallet = walletName.trim() || "wallet"
    return `echo "export WALLET="${wallet}"" >> $HOME/.bash_profile
echo "export MONIKER="${moniker}"" >> $HOME/.bash_profile
echo "export AARON_CHAIN_ID="aaron-1"" >> $HOME/.bash_profile
echo "export AARON_PORT="${port}"" >> $HOME/.bash_profile
source $HOME/.bash_profile`
  },

  generateWalletCommands: (walletName: string) => {
    const wallet = walletName.trim() || "$WALLET"
    return `aarond keys add ${wallet}

# Restore existing wallet
aarond keys add ${wallet} --recover

# List all wallets
aarond keys list

# Delete wallet
aarond keys delete ${wallet}`
  },
}
