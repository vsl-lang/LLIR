import LL from '~/Generator/LL/LL';

/**
 * List of default generators which you can use.
 *
 * @typedef {Object} Generator
 * @property {LL} LL - The LL (LLVM) generator (default). Uses concurrent branch
 *                   tracing.
 */
export default { LL };

/**
 * @type {Object}
 * 
 */
export const Options = {};
