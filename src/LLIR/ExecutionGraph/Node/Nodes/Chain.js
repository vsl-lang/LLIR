import Node from '@/ExecutionGraph/Node/Node';

/**
 * Chains or composes two functions. Manages independent successive
 * AtomicGraphs.
 */
export default class Chain extends Node {
    /** @override */
    init() {
        this.interactor = null;
        
        /** @private */
        this.chainOrder = [];
    }
    
    /**
     * Converts to string representation
     * @return {string} debuggable string
     */
    toString() {
        return `[ ${this.chainOrder.join(", ")} ]`;
    }
}
