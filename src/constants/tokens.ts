import * as Uniswap from 'quickswap-sdk'

/** @const base tokens for finding best path. The more base tokens the more
    accurate the pricing.
 */
export const BASES: {
  [chainId in Uniswap.ChainId]?: Array<{ address: string, symbol: string, name: string, decimals: number }>;
} = {
  [Uniswap.ChainId.MATIC]: [
    {
      address: '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
      symbol: 'WBTC',
      name: '(PoS) Wrapped BTC',
      decimals: 8
    },
    {
      address: '0x3BA4c387f786bFEE076A58914F5Bd38d668B42c3',
      symbol: 'BNB',
      name: 'BNB (PoS)',
      decimals: 18
    },
    {
      address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      symbol: 'USDC',
      name: 'USD Coin (PoS)',
      decimals: 6
    },
    {
      address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      symbol: 'USDT',
      name: '(PoS) Tether USD',
      decimals: 6
    },
    {
      address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
      symbol: 'WETH',
      name: 'Wrapped Ether',
      decimals: 18
    },
    {
      address: '0x0000000000000000000000000000000000001010',
      symbol: 'MATIC',
      name: 'Matic Token',
      decimals: 18
    }
  ],
  [Uniswap.ChainId.MUMBAI]: [
    {
      address: '0xe11A86849d99F524cAC3E7A0Ec1241828e332C62',
      symbol: 'USDC',
      name: 'USDC',
      decimals: 6
    },
    {
      address: '0x0000000000000000000000000000000000001010',
      symbol: 'MATIC',
      name: 'Matic Token',
      decimals: 18
    }
  ]
}
