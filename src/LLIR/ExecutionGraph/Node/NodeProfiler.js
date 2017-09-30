import { Chain, Conditional } from '@/ExecutionGraph/Node/Nodes/*';

/**
 * Provides information about a node. This includes capabilities of the node and
 * what type it is.
 */
export default class NodeProfiler {
    /**
     * Profiles the node provided.
     * @param {Node} node - node to profile
     */
    constructor(node) {
        this._node = node;
    }
    
    /**
     * Determines if a node implements the {@link IndexableNode} interface.
     * @type {boolean}
     */
    get supportsSuccessiveIndexing() {
        return this._node.constructor._ssi === 1;
    }
}
