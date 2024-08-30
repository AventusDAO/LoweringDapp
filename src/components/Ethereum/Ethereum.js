import React, { useEffect, useContext } from 'react'
import { stateContext } from '../../Contexts/Context'
import { NotConnected } from './NotConnected'
import { ConnectToEthereum } from './ConnectToEthereum'

function Ethereum() {
  const {
    loadWeb3,
    ethereumAccount,
    setEthereumAccount,
    setMetamaskNetworkId,
    NETWORK_ID,
    metamaskNetworkId,
    setEVM_NETWORK_NAME
  } = useContext(stateContext)

  // check if the user has changed the network or account on metamask and reload the window.
  useEffect(() => {
    if (loadWeb3) {
      loadWeb3.currentProvider.on('chainChanged', () => {
        window.location.reload()
      })
      loadWeb3.currentProvider.on('accountsChanged', () => {
        window.location.reload()
      })
    }
  }, [
    ethereumAccount,
    setMetamaskNetworkId,
    metamaskNetworkId,
    loadWeb3,
    setEthereumAccount,
    setEVM_NETWORK_NAME,
    NETWORK_ID
  ])

  if (ethereumAccount && metamaskNetworkId) {
    return <ConnectToEthereum />
  } else {
    return <NotConnected />
  }
}

export default Ethereum
