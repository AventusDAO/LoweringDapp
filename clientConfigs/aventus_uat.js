var appConfig = {
  // Aventus lowering dapp DEV/uat config
  ALTERNATE_NETWORK_URL: 'https://lower.testnet.aventus.network/',
  ALTERNATE_NETWORK_NAME: 'Testnet', //leave empty if Testnet is not deployed
  BRIDGE_CONTRACT_ADDRESS: '0x0Dd31348e68b6400bf8BdE84a1AaF733D9fCBf9B',
  BRAND_COLOR: '#5100FF',
  BRAND_COLOR_LIGHT: '#5100FF',
  BRAND_POP_COLOR: 'black',
  COMPANY_NAME: 'Aventus',
  COMPANY_URL: 'https://www.aventus.network/',
  COMPANY_SUPPORT_URL: 'https://www.aventus.network/contact/',
  COMPANY_NAME_WITH_UNDERSCORE: 'Aventus',
  ENVIRONMENT_NAME: 'AvN UAT',
  ETHERSCAN_TOKEN_LINK: 'https://sepolia.etherscan.io/address/',
  ETHERSCAN_TX_LINK: 'https://sepolia.etherscan.io/tx/',
  EVM_NETWORK_NAME: 'Sepolia UAT Testnet',
  EXPLORER_TX_URL: 'https://explorer.dev.aventus.network/transaction/',
  GATEWAY: 'https://gateway.dev.aventus.network/',
  LOWER_DURATION: '12 hours',
  NETWORK_ID: 11155111,
  PRIMARY_TOKEN_ADDRESS: '0x93ba86eCfDDD9CaAAc29bE83aCE5A3188aC47730', //if native token, leave empty
  PRIMARY_TOKEN: 'AVT',
  RELAYER: '5FbUQ2kJWLoqHuSTSNNqBwKwdQnBVe4HF3TeGyu6UoZaryTh',
  SUPPORTS_ENTERPRISE_USERS: true,
  SHOW_BALANCE_PAGE: true,
  SUPPORTED_TOKENS: {
    MAIN_TOKEN: { value: 'AVT', position: '1' },
    ERC20: { value: 'ERC20', position: '0' },
    ERC777: { value: 'ERC777', position: '0' },
    NATIVE: { value: 'ETH', position: '0' }
  }
}
