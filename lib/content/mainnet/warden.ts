import type { ProjectContent } from "../types"

export const wardenContent: ProjectContent = {
  id: "warden",
  name: "Warden Protocol",
  icon: "https://pbs.twimg.com/profile_images/1904848026742484992/nO3RP237_400x400.jpg", // Update with actual Warden logo
  network: "testnet",

  networkInfo: {
    chainId: "chiado_10010-1",
    blockHeight: "4,627,913",
    rpcStatus: "✅",
    description:
      "Warden Protocol is a blockchain for intent-driven applications and on-chain privacy. This guide details node installation and CLI usage for Testnet.",
  },

  hardware: {
    cores: 4,
    ram: "8GB",
    storage: "200GB (SSD)",
  },

  endpoints: {
    rpc: ["https://warden-testnet-rpc.itrocket.net"],
    api: ["https://warden-testnet-api.itrocket.net"],
    grpc: ["warden-testnet-grpc.itrocket.net:443"],
  },

  overview: {
    description:
      "Installation and operation guide for Warden Protocol Testnet node. Includes step-by-step installation, configuration, and CLI reference for wallet, validator, and token operations.",
    features: [
      "Testnet node setup",
      "Validator and wallet CLI commands",
      "Custom port configuration",
      "Governance and token management",
      "Genesis and addrbook download",
      "Service management",
      "Peer and seed configuration",
      "Pruning and indexing options",
    ],
  },

  installation: {
    dependencies: `sudo apt update && sudo apt upgrade -y
sudo apt install curl git wget htop tmux build-essential jq make lz4 gcc unzip -y`,

    goVersion: "1.23.1",
    goInstall: `cd $HOME
VER="1.23.1"
wget "https://golang.org/dl/go$VER.linux-amd64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$VER.linux-amd64.tar.gz"
rm "go$VER.linux-amd64.tar.gz"
[ ! -f ~/.bash_profile ] && touch ~/.bash_profile
echo "export PATH=$PATH:/usr/local/go/bin:~/go/bin" >> ~/.bash_profile
source $HOME/.bash_profile
[ ! -d ~/go/bin ] && mkdir -p ~/go/bin`,

    autoInstall: `source <(curl -s https://itrocket.net/api/testnet/warden/autoinstall/)`,

    manualSteps: [
      {
        title: "Set environment variables",
        commands: `echo "export WALLET="wallet"" >> $HOME/.bash_profile
echo "export MONIKER="test"" >> $HOME/.bash_profile
echo "export WARDEN_CHAIN_ID="chiado_10010-1"" >> $HOME/.bash_profile
echo "export WARDEN_PORT="18"" >> $HOME/.bash_profile
source $HOME/.bash_profile`,
      },
      {
        title: "Download and install binary",
        commands: `cd $HOME
rm -rf bin
mkdir bin && cd bin
wget -O wardend https://github.com/warden-protocol/wardenprotocol/releases/download/v0.6.3/wardend-0.6.3-linux-amd64
chmod +x wardend
mv $HOME/bin/wardend $HOME/go/bin`,
      },
      {
        title: "Initialize the node",
        commands: `wardend init $MONIKER
sed -i -e "s|^node *=.*|node = \"tcp://localhost:${WARDEN_PORT}657\"|" $HOME/.warden/config/client.toml`,
      },
      {
        title: "Download genesis and addrbook",
        commands: `wget -O $HOME/.warden/config/genesis.json https://server-2.itrocket.net/testnet/warden/genesis.json
wget -O $HOME/.warden/config/addrbook.json https://server-2.itrocket.net/testnet/warden/addrbook.json`,
      },
      {
        title: "Configure seeds and peers",
        commands: `SEEDS="8288657cb2ba075f600911685670517d18f54f3b@warden-testnet-seed.itrocket.net:18656"
PEERS="b14f35c07c1b2e58c4a1c1727c89a5933739eeea@warden-testnet-peer.itrocket.net:18656,e851e59b5fac272f76ccdcbf6cb84ab3d2b070ea@65.108.230.113:21406,cbb9b891cf1427c453bc91a7977b6b2f6257c724@65.109.78.246:22656,73a865805db875019306049cf9bc83a05180ff80@57.128.193.18:20145,72eab3bdc718ab3f353ec044c490daca6d9a321b@[2a01:4f8:110:4265::5]:26656,29dfeed0f7933111c5452a1af4ca67b2fe4346f5@198.27.80.53:26656,9c367f5483788fee259ca0ec05cf7d4bceca41c3@38.242.153.161:26656,8a2624792884eb8135ae7b11b739688388fa2e55@65.109.83.40:27356,56f46b5a7fd2c5cdc24d8964cc8d3ec12ee6cc4e@138.201.62.254:27356,8a3bde424363d40264f5ea7fc4626108472cd9fd@65.108.227.207:16656,4f721cf7df1ae8833f2c41437e25d8b188a2b3be@65.109.75.155:11956,4c54d61784741680d7398367a47c42b6ff32ae7e@38.242.249.55:18656,fa9955b398952c4a1b73f53ca649fd4e9cad9c81@65.108.74.113:11956,2f99ac7e72cc8c1f951e027d6088b8a920163237@65.109.111.234:18656,3f59e02ff9372caf39186b2ed3e74e328d3f4ca8@65.108.14.235:11956,bee9e9daec3ca13b7961115790db642f84e1c277@37.27.97.16:26656,de9e8c44039e240ff31cbf976a0d4d673d4e4734@188.165.213.192:26656,3571bdcc38d70fae8fd042cd83988df4119da4b9@152.53.121.42:27656,2d2c7af1c2d28408f437aef3d034087f40b85401@52.51.132.79:26656,fafe2a395aeb33726cae1daf882941f02d2b9706@144.76.78.89:27656,8a46610d69921c1031ea536cd5dca0a2979cf1b2@168.119.10.134:29479,2fc6797fef33de3d19fafef85a6d651f15007901@23.88.5.169:26656"
sed -i -e "/^\[p2p\]/,/^\[/{s/^[[:space:]]*seeds *=.*/seeds = \"$SEEDS\"/}" \
       -e "/^\[p2p\]/,/^\[/{s/^[[:space:]]*persistent_peers *=.*/persistent_peers = \"$PEERS\"/}" $HOME/.warden/config/config.toml`,
      },
      {
        title: "Configure custom ports",
        commands: `sed -i.bak -e "s%:1317%:${WARDEN_PORT}317%g;
s%:8080%:${WARDEN_PORT}080%g;
s%:9090%:${WARDEN_PORT}090%g;
s%:9091%:${WARDEN_PORT}091%g;
s%:8545%:${WARDEN_PORT}545%g;
s%:8546%:${WARDEN_PORT}546%g;
s%:6065%:${WARDEN_PORT}065%g" $HOME/.warden/config/app.toml

sed -i.bak -e "s%:26658%:${WARDEN_PORT}658%g;
s%:26657%:${WARDEN_PORT}657%g;
s%:6060%:${WARDEN_PORT}060%g;
s%:26656%:${WARDEN_PORT}656%g;
s%^external_address = \"\"%external_address = \"$(wget -qO- eth0.me):${WARDEN_PORT}656\"%;
s%:26660%:${WARDEN_PORT}660%g" $HOME/.warden/config/config.toml`,
      },
      {
        title: "Configure pruning and other settings",
        commands: `sed -i -e "s/^pruning *=.*/pruning = \"custom\"/" $HOME/.warden/config/app.toml 
sed -i -e "s/^pruning-keep-recent *=.*/pruning-keep-recent = \"100\"/" $HOME/.warden/config/app.toml
sed -i -e "s/^pruning-interval *=.*/pruning-interval = \"19\"/" $HOME/.warden/config/app.toml

sed -i 's|minimum-gas-prices =.*|minimum-gas-prices = "25000000award"|g' $HOME/.warden/config/app.toml
sed -i -e "s/prometheus = false/prometheus = true/" $HOME/.warden/config/config.toml
sed -i -e "s/^indexer *=.*/indexer = \"null\"/" $HOME/.warden/config/config.toml`,
      },
      {
        title: "Create systemd service",
        commands: `sudo tee /etc/systemd/system/wardend.service > /dev/null <<EOF
[Unit]
Description=Warden node
After=network-online.target
[Service]
User=$USER
WorkingDirectory=$HOME/.warden
ExecStart=$(which wardend) start --home $HOME/.warden
Restart=on-failure
RestartSec=5
LimitNOFILE=65535
[Install]
WantedBy=multi-user.target
EOF`,
      },
      {
        title: "Reset and download snapshot",
        commands: `wardend tendermint unsafe-reset-all --home $HOME/.warden
if curl -s --head curl https://server-2.itrocket.net/testnet/warden/warden_2025-09-02_4627913_snap.tar.lz4 | head -n 1 | grep "200" > /dev/null; then
  curl https://server-2.itrocket.net/testnet/warden/warden_2025-09-02_4627913_snap.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.warden
else
  echo "no snapshot found"
fi`,
      },
      {
        title: "Enable and start service",
        commands: `sudo systemctl daemon-reload
sudo systemctl enable wardend
sudo systemctl restart wardend && sudo journalctl -u wardend -fo cat`,
      },
    ],

    syncChecker: `#!/bin/bash
rpc_port=$(grep -m 1 -oP '^laddr = "\\K[^"]*' "$HOME/.warden/config/config.toml" | cut -d ':' -f 3)
while true; do
  local_height=$(curl -s localhost:$rpc_port/status | jq -r '.result.sync_info.latest_block_height')
  network_height=$(curl -s https://warden-testnet-rpc.itrocket.net/status | jq -r '.result.sync_info.latest_block_height')
  
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
    version: "v0.6.3",
    height: "4630000",
    commands: `cd $HOME
rm -rf bin
mkdir bin && cd bin
wget -O wardend https://github.com/warden-protocol/wardenprotocol/releases/download/v0.6.3/wardend-0.6.3-linux-amd64
chmod +x wardend
sudo mv $HOME/bin/wardend $(which wardend)
sudo systemctl restart wardend && sudo journalctl -u wardend -f`,
    backupCommands: `cp $HOME/.warden/data/priv_validator_state.json $HOME/.warden/priv_validator_state.json.backup
wardend tendermint unsafe-reset-all --home $HOME/.warden`,
  },

  sync: {
    stateSync: `sudo systemctl stop wardend

cp $HOME/.warden/data/priv_validator_state.json $HOME/.warden/priv_validator_state.json.backup
wardend tendermint unsafe-reset-all --home $HOME/.warden

peers="b14f35c07c1b2e58c4a1c1727c89a5933739eeea@warden-testnet-peer.itrocket.net:18656,e851e59b5fac272f76ccdcbf6cb84ab3d2b070ea@65.108.230.113:21406,cbb9b891cf1427c453bc91a7977b6b2f6257c724@65.109.78.246:22656,73a865805db875019306049cf9bc83a05180ff80@57.128.193.18:20145,72eab3bdc718ab3f353ec044c490daca6d9a321b@[2a01:4f8:110:4265::5]:26656,29dfeed0f7933111c5452a1af4ca67b2fe4346f5@198.27.80.53:26656,9c367f5483788fee259ca0ec05cf7d4bceca41c3@38.242.153.161:26656,8a2624792884eb8135ae7b11b739688388fa2e55@65.109.83.40:27356,56f46b5a7fd2c5cdc24d8964cc8d3ec12ee6cc4e@138.201.62.254:27356,8a3bde424363d40264f5ea7fc4626108472cd9fd@65.108.227.207:16656,4f721cf7df1ae8833f2c41437e25d8b188a2b3be@65.109.75.155:11956,4c54d61784741680d7398367a47c42b6ff32ae7e@38.242.249.55:18656,fa9955b398952c4a1b73f53ca649fd4e9cad9c81@65.108.74.113:11956,2f99ac7e72cc8c1f951e027d6088b8a920163237@65.109.111.234:18656,3f59e02ff9372caf39186b2ed3e74e328d3f4ca8@65.108.14.235:11956,bee9e9daec3ca13b7961115790db642f84e1c277@37.27.97.16:26656,de9e8c44039e240ff31cbf976a0d4d673d4e4734@188.165.213.192:26656,3571bdcc38d70fae8fd042cd83988df4119da4b9@152.53.121.42:27656,2d2c7af1c2d28408f437aef3d034087f40b85401@52.51.132.79:26656,fafe2a395aeb33726cae1daf882941f02d2b9706@144.76.78.89:27656,8a46610d69921c1031ea536cd5dca0a2979cf1b2@168.119.10.134:29479,2fc6797fef33de3d19fafef85a6d651f15007901@23.88.5.169:26656"  
SNAP_RPC="https://warden-testnet-rpc.itrocket.net:443"

sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$peers\"/" $HOME/.warden/config/config.toml 

LATEST_HEIGHT=$(curl -s $SNAP_RPC/block | jq -r .result.block.header.height);
BLOCK_HEIGHT=$((LATEST_HEIGHT - 2000));
TRUST_HASH=$(curl -s "$SNAP_RPC/block?height=$BLOCK_HEIGHT" | jq -r .result.block_id.hash) 

echo $LATEST_HEIGHT $BLOCK_HEIGHT $TRUST_HASH && sleep 2

sed -i.bak -E "s|^(enable[[:space:]]+=[[:space:]]+).*$|\1true| ;
s|^(rpc_servers[[:space:]]+=[[:space:]]+).*$|\1\"$SNAP_RPC,$SNAP_RPC\"| ;
s|^(trust_height[[:space:]]+=[[:space:]]+).*$|\1$BLOCK_HEIGHT| ;
s|^(trust_hash[[:space:]]+=[[:space:]]+).*$|\1\"$TRUST_HASH\"| ;
s|^(seeds[[:space:]]+=[[:space:]]+).*$|\1\"\"|" $HOME/.warden/config/config.toml

mv $HOME/.warden/priv_validator_state.json.backup $HOME/.warden/data/priv_validator_state.json

sudo systemctl restart wardend && sudo journalctl -u wardend -fo cat`,

    snapshot: {
      url: "https://server-2.itrocket.net/testnet/warden/warden_2025-09-02_4627913_snap.tar.lz4",
      commands: `sudo systemctl stop wardend
cp $HOME/.warden/data/priv_validator_state.json $HOME/.warden/priv_validator_state.json.backup
rm -rf $HOME/.warden/data $HOME/.warden/wasm
curl https://server-2.itrocket.net/testnet/warden/warden_2025-09-02_4627913_snap.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.warden
mv $HOME/.warden/priv_validator_state.json.backup $HOME/.warden/data/priv_validator_state.json
sudo systemctl restart wardend && sudo journalctl -u wardend -f`,
    },
  },

  publicApi: {
    rpcEndpoints: ["https://warden-testnet-rpc.itrocket.net"],
    apiEndpoints: ["https://warden-testnet-api.itrocket.net"],
    grpcEndpoints: ["warden-testnet-grpc.itrocket.net:443"],
    peers: [
      "b14f35c07c1b2e58c4a1c1727c89a5933739eeea@warden-testnet-peer.itrocket.net:18656",
    ],
    seeds: ["8288657cb2ba075f600911685670517d18f54f3b@warden-testnet-seed.itrocket.net:18656"],
  },

  cliCheatsheet: {
    walletCommands: `# Add New Wallet
wardend keys add $WALLET

# Restore existing wallet
wardend keys add $WALLET --recover

# List All Wallets
wardend keys list

# Delete wallet
wardend keys delete $WALLET

# Check Balance
wardend q bank balances $WALLET_ADDRESS

# Export Key (save to wallet.backup)
wardend keys export $WALLET

# View EVM Private Key
wardend keys unsafe-export-eth-key $WALLET

# Import Key (restore from wallet.backup)
wardend keys import $WALLET wallet.backup`,

    validatorCommands: `# Create New Validator
wardend tx staking create-validator \\
--amount 1000000award \\
--from $WALLET \\
--commission-rate 0.1 \\
--commission-max-rate 0.2 \\
--commission-max-change-rate 0.01 \\
--min-self-delegation 1 \\
--pubkey $(wardend tendermint show-validator) \\
--moniker "$MONIKER" \\
--identity "" \\
--details "I love blockchain ❤️" \\
--chain-id chiado_10010-1 \\
--gas auto --gas-adjustment 1.6 --fees 250000000000000award \\
-y

# Edit Existing Validator
wardend tx staking edit-validator \\
--commission-rate 0.1 \\
--new-moniker "$MONIKER" \\
--identity "" \\
--details "I love blockchain ❤️" \\
--from $WALLET \\
--chain-id chiado_10010-1 \\
--gas auto --gas-adjustment 1.6 --fees 250000000000000award \\
-y

# Validator info
wardend status 2>&1 | jq

# Validator Details
wardend q staking validator $(wardend keys show $WALLET --bech val -a)

# Unjail validator
wardend tx slashing unjail --from $WALLET --chain-id chiado_10010-1 --gas auto --gas-adjustment 1.6 --fees 250000000000000award -y`,

    governanceCommands: `# Create New Text Proposal
wardend tx gov submit-proposal \\
--title "" \\
--description "" \\
--deposit 1000000award \\
--type Text \\
--from $WALLET \\
--gas auto --gas-adjustment 1.6 --fees 250000000000000award \\
-y

# Proposals List
wardend query gov proposals

# View proposal
wardend query gov proposal 1

# Vote
wardend tx gov vote 1 yes --from $WALLET --chain-id chiado_10010-1 --gas auto --gas-adjustment 1.6 --fees 250000000000000award -y`,

    utilityCommands: `# Service operations
sudo journalctl -u wardend -fo cat
sudo systemctl start wardend
sudo systemctl stop wardend
sudo systemctl restart wardend
sudo systemctl status wardend
sudo systemctl daemon-reload
sudo systemctl enable wardend
sudo systemctl disable wardend

# Node info
wardend status 2>&1 | jq

# Your node peer
echo $(wardend tendermint show-node-id)'@'$(wget -qO- eth0.me)':'$(cat $HOME/.warden/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')

# Token operations
wardend tx distribution withdraw-all-rewards --from $WALLET --chain-id chiado_10010-1 --gas auto --gas-adjustment 1.6 --fees 250000000000000award
wardend tx distribution withdraw-rewards $VALOPER_ADDRESS --from $WALLET --commission --chain-id chiado_10010-1 --gas auto --gas-adjustment 1.6 --fees 250000000000000award -y
wardend tx staking delegate $(wardend keys show $WALLET --bech val -a) 1000000award --from $WALLET --chain-id chiado_10010-1 --gas auto --gas-adjustment 1.6 --fees 250000000000000award -y
wardend tx staking redelegate $VALOPER_ADDRESS <TO_VALOPER_ADDRESS> 1000000award --from $WALLET --chain-id chiado_10010-1 --gas auto --gas-adjustment 1.6 --fees 250000000000000award -y
wardend tx staking unbond $(wardend keys show $WALLET --bech val -a) 1000000award --from $WALLET --chain-id chiado_10010-1 --gas auto --gas-adjustment 1.6 --fees 250000000000000award -y
wardend tx bank send $WALLET_ADDRESS <TO_WALLET_ADDRESS> 1000000award --gas auto --gas-adjustment 1.6 --fees 250000000000000award -y

# Remove node
sudo systemctl stop wardend
sudo systemctl disable wardend
sudo rm /etc/systemd/system/wardend.service
sudo systemctl daemon-reload
rm -f $(which wardend)
rm -rf $HOME/.warden
rm -rf $HOME/bin`,
  },

  generateSetVars: (nodeName: string, walletName: string, port: string) => {
    const moniker = nodeName.trim() || "test"
    const wallet = walletName.trim() || "wallet"
    return `echo "export WALLET="${wallet}"" >> $HOME/.bash_profile
echo "export MONIKER="${moniker}"" >> $HOME/.bash_profile
echo "export WARDEN_CHAIN_ID="chiado_10010-1"" >> $HOME/.bash_profile
echo "export WARDEN_PORT="${port}"" >> $HOME/.bash_profile
source $HOME/.bash_profile`
  },

  generateWalletCommands: (walletName: string) => {
    const wallet = walletName.trim() || "$WALLET"
    return `wardend keys add ${wallet}

# Restore existing wallet
wardend keys add ${wallet} --recover

# List All Wallets
wardend keys list

# Delete wallet
wardend keys delete ${wallet}`
  },
}