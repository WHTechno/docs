export const dillContent = {
  id: "dill",
  name: "Dill",
  icon: "🥒",
  network: "testnet",
  chainId: "dill-testnet-1",
  blockHeight: "2,145,482",
  rpcStatus: "✅",
  hardware: {
    cores: 4,
    ram: "16GB",
    storage: "500GB (SSD)",
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

    autoInstall: `source <(curl -s https://itrocket.net/api/testnet/dill/autoinstall/)`,

    syncChecker: `#!/bin/bash
rpc_port=$(grep -m 1 -oP '^laddr = "\\K[^"]*' "$HOME/.dill/config/config.toml" | cut -d ':' -f 3)
while true; do
  local_height=$(curl -s localhost:$rpc_port/status | jq -r '.result.sync_info.latest_block_height')
  network_height=$(curl -s https://dill-rpc.itrocket.net/status | jq -r '.result.sync_info.latest_block_height')
  
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

  generateSetVars: (nodeName: string, walletName: string, port: string) => {
    const moniker = nodeName.trim() || "YOUR_MONIKER_HERE"
    const wallet = walletName.trim() || "wallet"
    return `echo "export WALLET="${wallet}"" >> $HOME/.bash_profile
echo "export MONIKER="${moniker}"" >> $HOME/.bash_profile
echo "export DILL_CHAIN_ID="dill-testnet-1"" >> $HOME/.bash_profile
echo "export DILL_PORT="${port}"" >> $HOME/.bash_profile
source $HOME/.bash_profile`
  },

  generateWalletCommands: (walletName: string) => {
    const wallet = walletName.trim() || "$WALLET"
    return `dilld keys add ${wallet}

# Restore existing wallet
dilld keys add ${wallet} --recover

# List all wallets
dilld keys list

# Delete wallet
dilld keys delete ${wallet}`
  },
}
