import * as dotenv from 'dotenv'
import { ethers } from 'ethers'
import { Token, ChainId } from 'quickswap-sdk'
import { findBestPathExactTokenAToTokenB, findBestPathTokenAToExactTokenB, BestPathOptions } from '../src/index.js'

dotenv.config()

jest.setTimeout(75000)

describe('Best Path', () => {
  let tokenA: Token, tokenB: Token
  let provider: any

  beforeAll(() => {
    provider = new ethers.providers.JsonRpcProvider(process.env.POLYGON_URL ?? '')

    tokenA = new Token(
      ChainId.MATIC,
      '0xb33EaAd8d922B1083446DC23f610c2567fB5180f',
      18,
      'UNI',
      'Uniswap'
    )

    tokenB = new Token(
      ChainId.MATIC,
      '0xeDd6cA8A4202d4a36611e2fff109648c4863ae19',
      18,
      'MAHA',
      'MahaDAO'
    )
  })

  test('should compute best path for exact token A to token B', async () => {
    const path = await findBestPathExactTokenAToTokenB(tokenA, tokenB, '1000000000000000000', provider)

    expect(path[0]).toEqual(tokenA.address)
    expect(path[path.length - 1]).toEqual(tokenB.address)
  })

  test('should compute best path for token A to exact token B', async () => {
    const path = await findBestPathTokenAToExactTokenB(tokenA, tokenB, '1000000000000000000', provider)

    expect(path[0]).toEqual(tokenA.address)
    expect(path[path.length - 1]).toEqual(tokenB.address)
  })

  test('should add another token to the base tokens', async () => {
    const additionalBases = [{
      address: '0xDBf31dF14B66535aF65AaC99C32e9eA844e14501',
      symbol: 'renBTC',
      name: 'renBTC',
      decimals: 8
    }]

    const opts: BestPathOptions = {
      additionalBases
    }

    const path = await findBestPathExactTokenAToTokenB(tokenA, tokenB, '1000000000000000000', provider, opts)

    expect(path[0]).toEqual(tokenA.address)
    expect(path[path.length - 1]).toEqual(tokenB.address)
  })

  test('should explicitly specify base tokens', async () => {
    const bases = [{
      address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
      symbol: 'WETH',
      name: 'WETH',
      decimals: 18
    }]

    const opts: BestPathOptions = {
      bases
    }

    const path = await findBestPathExactTokenAToTokenB(tokenA, tokenB, '1000000000000000000', provider, opts)

    expect(path).toEqual([
      tokenA.address,
      bases[0].address,
      tokenB.address
    ])
  })
})
