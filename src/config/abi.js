const ABI = [
  {
    inputs: [
      { internalType: 'bytes', name: 'leaf', type: 'bytes' },
      {
        internalType: 'bytes32[]',
        name: 'merklePath',
        type: 'bytes32[]'
      }
    ],
    name: 'legacyLower',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'erc20Address',
        type: 'address'
      },
      { internalType: 'bytes', name: 't2PublicKey', type: 'bytes' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'lift',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: '_to', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'bytes', name: '_data', type: 'bytes' }
    ],
    name: 'send',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'proof',
        type: 'bytes'
      }
    ],
    name: 'claimLower',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]

export default ABI
