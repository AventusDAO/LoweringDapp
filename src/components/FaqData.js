const ENVIRONMENT_NAME = window?.appConfig?.ENVIRONMENT_NAME
const COMPANY_NAME = window?.appConfig?.COMPANY_NAME
const EVM_NETWORK_NAME = window?.appConfig?.EVM_NETWORK_NAME

const FAQ = [
  {
    question: 'What is Lowering?',
    answer: `Lowering is the process of migrating your tokens from the ${ENVIRONMENT_NAME} to ${EVM_NETWORK_NAME}.`
  },
  {
    question: 'Where can I find a walkthrough on using this dApp?',
    answer: "There's a walkthrough of the dApp here: ",
    link: 'https://youtu.be/Mju8UbzpMyI'
  },
  {
    question: 'How can I use this as a programmer?',
    answer:
      "We've prepared a video that will walk you through using this as a programmer.",
    link: 'https://youtu.be/BswBUOhnpB8'
  },
  {
    question: 'How to use this dapp on Mobile',
    answer: `This dapp can be used within mobile crypto wallets that have embedded browsers. For example, MetaMask / Nova Wallet. However, note that the initial lowering operation is Substrate-based and thus cannot be done using an EVM wallet such as Metamask, but Metamask can be used to carryout the claiming transaction once the tokens are ready to be claimed on ${EVM_NETWORK_NAME}. You can see a walkthrough of using it on Mobile here`,
    link: 'https://youtu.be/g96OrRNEUSI'
  },
  {
    question: 'How to use this dapp within the Nova Wallet',
    answer:
      ' Nova Wallet has an embedded browser. Paste the url for this dapp into that browser and carry on with your operations.'
  },
  {
    question: 'How to Claim within the Nova wallet',
    answer:
      'The Nova Wallet supports both Substrate and EVM based wallets. Ensure you are using the correct wallet (address) options within Nova wallet when switching to the Claim operation.'
  },
  {
    question: 'What is an Aventus Web Token (AWT)?',
    answer: `AWT is an extension of JWT. Each AWT is signed with the user's substrate private key, and this signature can be verified using the user's ${COMPANY_NAME} public key. This is designed by Aventus Network.`
  },
  {
    question: 'How long is the Aventus Web Token (AWT) valid for?',
    answer: '10 minutes.'
  },
  {
    question: 'Why do I need to sign to view my balance?',
    answer:
      'This dapp requires an AWT token to authenticate the user for every operation.'
  },
  {
    question: 'Why do I need to sign multiple times to submit a transaction?',
    answer:
      'This Dapp interacts with the chain via the Gateway and each user is authenticated on the Gateway using their unique time-limited Aventus Web Token (AWT). A new token must be generated if the existing token has expired or non-existent.'
  },
  {
    question: 'Why do I need to have Metamask?',
    answer:
      'To ensure we are lowering the right amount of your token with the right amount of decimals, we need to access the smart contract for that token to confirm the decimal number.'
  },
  {
    question: 'What is my FREE balance?',
    answer:
      'FREE balance only applies to your main token balance. This is the portion of your balance that is not locked in any way, for example, locked in staking. You can only lower what is in your FREE balance. To lower your locked tokens, you would need to unlock it and withdraw it to your FREE balance.'
  },
  {
    question: "Why can't I find my transaction to lower my tokens?",
    answer: `The 'Claim' page only shows tokens for transactions that were successful on the ${ENVIRONMENT_NAME} and are yet to be claimed on ${EVM_NETWORK_NAME}.`
  },
  {
    question: 'Not sure what happened to my transaction, how can I query it?',
    answer:
      'Depending on what stage your transaction failed or got stuck at, you will have a different set of data returned to you. For example, you will have your UUID after the transaction has been submitted, and if the transaction has been processed, you will have the transaction hash and a link to the transaction on the block explorer.'
  }
]

export default FAQ
