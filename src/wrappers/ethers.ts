/**
 * Provides an ethers wrapper for native Best Price Path functions.
 */

import { Token, Trade } from 'quickswap-sdk'
import { Contract } from 'ethers'
import { BestPathOptions } from '../options.js'
import * as Base from '../index.js'
import { BEST_PATH_OPTIONS, CHAIN_ID_DEFAULT } from '../constants/defaults.js'

/**
 * Finds the best price path for exactly the amount of tokenA.
 *
 * @param {Contract} tokenA The token in as an instance of ethers.Contract.
 * @param {Contract} tokenB The token out as an instance of ethers.Contract.
 * @param {any} exactTokenA The exact amount of token in. Is converted to a
 * string so number libraries such as BigNumber.js can be used provided there
 * is a toString() method available. Alternatively, provider the amount as a
 * string.
 * @param {any} provider A provider object compatible with the EIP-1193
 * standard.
 * @param {BestPathOptions} opts One or more options for the best path
 * calculation. Overrides the default best path options.
 * @returns An array of token addresses representing the best price path from
 * tokenIn to tokenOut for the exact amount of tokenIn.
 */
export async function findBestPathExactTokenAToTokenB (tokenA: Contract, tokenB: Contract, exactTokenA: any, provider: any, opts: BestPathOptions = {}): Promise<string[]> {
  const uniTokenA: Token = await fromEthersToUniswapToken(tokenA, opts)
  const uniTokenB: Token = await fromEthersToUniswapToken(tokenB, opts)

  return await Base.findBestPathExactTokenAToTokenB(uniTokenA, uniTokenB, exactTokenA, provider, opts)
}

/**
 * Finds one or more best price paths between tokenA and tokenB for an exact
 * amount of tokenA.
 *
 * @param {Contract} tokenA The token in as an instance of ethers.Contract.
 * @param {Contract} tokenB The token out as an instance of ethers.Contract.
 * @param {any} exactTokenA The exact amount of token in. Is converted to a
 * string so number libraries such as BigNumber.js can be used provided there
 * is a toString() method available. Alternatively, provider the amount as a
 * string.
 * @param {any} provider A provider object compatible with the EIP-1193
 * standard.
 * @param {BestPathOptions} opts One or more options for the best path
 * calculation. Overrides the default best path options.
 * @returns A list of one or more best paths, each of which will contain an
 * array of token addresses representing the best price path from tokenB to
 * tokenB for the exact amount of tokenA.
 */
export async function computeExactTokenAToTokenB (tokenA: Contract, tokenB: Contract, exactTokenA: any, provider: any, opts: BestPathOptions = {}): Promise<Trade[]> {
  const uniTokenA: Token = await fromEthersToUniswapToken(tokenA, opts)
  const uniTokenB: Token = await fromEthersToUniswapToken(tokenB, opts)

  return await Base.computeExactTokenAToTokenB(uniTokenA, uniTokenB, exactTokenA, provider, opts)
}

/**
 * Finds the best price path for exactly the amount of tokenB.
 *
 * @param {Contract} tokenA The token in as an instance of ethers.Contract.
 * @param {Contract} tokenB The token out as an instance of ethers.Contract.
 * @param {any} exactTokenB The exact amount of token in. Is converted to a
 * string so number libraries such as BigNumber.js can be used provided there
 * is a toString() method available. Alternatively, provider the amount as a
 * string.
 * @param {any} provider A provider object compatible with the EIP-1193
 * standard.
 * @param {BestPathOptions} opts One or more options for the best path
 * calculation. Overrides the default best path options.
 * @returns An array of token addresses representing the best price path from
 * tokenIn to tokenOut for the exact amount of tokenIn.
 */
export async function findBestPathTokenAToExactTokenB (tokenA: Contract, tokenB: Contract, exactTokenB: any, provider: any, opts: BestPathOptions = {}): Promise<string[]> {
  const uniTokenA: Token = await fromEthersToUniswapToken(tokenA, opts)
  const uniTokenB: Token = await fromEthersToUniswapToken(tokenB, opts)

  return await Base.findBestPathTokenAToExactTokenB(uniTokenA, uniTokenB, exactTokenB, provider, opts)
}

/**
 * Finds one or more best price paths between tokenA and tokenB for an exact
 * amount of tokenB.
 *
 * @param {Contract} tokenA The token in as an instance of ethers.Contract.
 * @param {Contract} tokenB The token out as an instance of ethers.Contract.
 * @param {any} exactTokenB The exact amount of token in. Is converted to a
 * string so number libraries such as BigNumber.js can be used provided there
 * is a toString() method available. Alternatively, provider the amount as a
 * string.
 * @param {any} provider A provider object compatible with the EIP-1193
 * standard.
 * @param {BestPathOptions} opts One or more options for the best path
 * calculation. Overrides the default best path options.
 * @returns A list of one or more best paths, each of which will contain an
 * array of token addresses representing the best price path from tokenA to
 * tokenB for the exact amount of tokenB.
 */
export async function computeTokenAToExactTokenB (tokenA: Contract, tokenB: Contract, exactTokenB: any, provider: any, opts: BestPathOptions = {}): Promise<Trade[]> {
  const uniTokenA: Token = await fromEthersToUniswapToken(tokenA, opts)
  const uniTokenB: Token = await fromEthersToUniswapToken(tokenB, opts)

  return await Base.computeTokenAToExactTokenB(uniTokenA, uniTokenB, exactTokenB, provider, opts)
}

/**
 * Converts an ERC20 token as represented by ethers.Contract to a
 * Uniswap.Token object.
 *
 * @param {Contract} token The token being converted.
 * @param {BestPathOptions} opts One or more options for the best path
 * calculation. Overrides the default best path options.
 * @returns A Uniswap.Token representation of the ERC20 token.
 */
export async function fromEthersToUniswapToken (token: Contract, opts: BestPathOptions = {}): Promise<Token> {
  const options: BestPathOptions = { ...BEST_PATH_OPTIONS, ...opts }

  return new Token(
    options.selectedChainId ?? CHAIN_ID_DEFAULT,
    token.address,
    await token.decimals(),
    await token.symbol(),
    await token.name()
  )
}
