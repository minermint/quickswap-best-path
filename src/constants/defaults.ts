import { ChainId } from 'quickswap-sdk'
import { BestPathOptions } from '../options.js'

/** @const The default chain id (Polygon).
    @type {number}
    @default
 */
export const CHAIN_ID_DEFAULT: number = ChainId.MATIC

/** @const The maximum number of hops to make when converting one token to
    another.
    @type {number}
    @default
 */
export const MAX_HOPS_DEFAULT: number = 3

/** @const The maximum number of results to retrieve when finding the "best
    path".
    @type {number}
    @default
 */
export const MAX_NUM_RESULTS_DEFAULT: number = 1

/** @const A default list of best path options
    @type {BestPathOptions}
    @default
 */
export const BEST_PATH_OPTIONS: BestPathOptions = {
  selectedChainId: CHAIN_ID_DEFAULT,
  maxHops: MAX_HOPS_DEFAULT,
  maxNumResults: MAX_NUM_RESULTS_DEFAULT
}
