import * as dotenv from 'dotenv'
import { ethers, Contract } from 'ethers'
import ArtifactERC20 from '@uniswap/v2-core/build/IERC20.json'
import { findBestPathExactTokenAToTokenB, findBestPathTokenAToExactTokenB } from '../src/wrappers/ethers.js'

dotenv.config()

jest.setTimeout(75000)

describe('Best Path - Ethers', () => {
  let tokenA: Contract, tokenB: Contract
  let provider: any

  beforeAll(() => {
    provider = new ethers.providers.JsonRpcProvider(process.env.POLYGON_URL ?? '')

    tokenA = new ethers.Contract('0xb33EaAd8d922B1083446DC23f610c2567fB5180f', ArtifactERC20.abi, provider)

    tokenB = new ethers.Contract('0xeDd6cA8A4202d4a36611e2fff109648c4863ae19', ArtifactERC20.abi, provider)
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
})
