import * as dotenv from 'dotenv'
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import ArtifactERC20 from '@uniswap/v2-core/build/IERC20.json'
import { findBestPathExactTokenAToTokenB, findBestPathTokenAToExactTokenB } from '../src/wrappers/web3.js'

dotenv.config()

jest.setTimeout(75000)

describe('Best Path - Web3', () => {
  let tokenA: Contract, tokenB: Contract
  let provider: any

  beforeAll(() => {
    const web3 = new Web3(process.env.POLYGON_URL ?? '')
    provider = web3.currentProvider

    tokenA = new web3.eth.Contract(ArtifactERC20.abi as AbiItem[], '0xb33EaAd8d922B1083446DC23f610c2567fB5180f')

    tokenB = new web3.eth.Contract(ArtifactERC20.abi as AbiItem[], '0xeDd6cA8A4202d4a36611e2fff109648c4863ae19')
  })

  test('should compute best path for exact token A to token B', async () => {
    const path = await findBestPathExactTokenAToTokenB(tokenA, tokenB, '1000000000000000000', provider)

    expect(path[0]).toEqual(tokenA.options.address)
    expect(path[path.length - 1]).toEqual(tokenB.options.address)
  })

  test('should compute best path for token A to exact token B', async () => {
    const path = await findBestPathTokenAToExactTokenB(tokenA, tokenB, '1000000000000000000', provider)

    expect(path[0]).toEqual(tokenA.options.address)
    expect(path[path.length - 1]).toEqual(tokenB.options.address)
  })
})
