import Web3 from 'web3'

async function LoadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    return window.web3
  }
}
export default LoadWeb3
