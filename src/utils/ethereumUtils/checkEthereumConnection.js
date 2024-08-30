import { networkErrorHandler } from '../errorPopups/walletErrorPopups'
import ABI from '../../config/abi.js'

export default async function checkEthereumConnection({
  web3,
  account,
  setEthereumAccount,
  NETWORK_ID,
  netId,
  setMetamaskNetworkId,
  setBridgeContract,
  setMainTokenContract,
  BRIDGE_CONTRACT_ADDRESS,
  PRIMARY_TOKEN_ADDRESS,
  EVM_NETWORK_NAME,
  isAppPage
}) {
  if (netId === NETWORK_ID) {
    setEthereumAccount(account)
    setMetamaskNetworkId(netId)
    setBridgeContract(new web3.eth.Contract(ABI, BRIDGE_CONTRACT_ADDRESS))
    if (PRIMARY_TOKEN_ADDRESS) {
      setMainTokenContract(new web3.eth.Contract(ABI, PRIMARY_TOKEN_ADDRESS))
    }
  } else {
    if (!isAppPage)
      networkErrorHandler(
        `Please set your EVM network to ${EVM_NETWORK_NAME} on your wallet`
      )
  }
}
