import Node from '@/ExecutionGraph/Node/Node';
import i from '@/Serializer/SerializationInfo';

/**
 * Chains or composes two functions. Manages independent successive
 * AtomicGraphs.
 *
 * @implements {IndexableNode}
 * @extends Node
 */
export default class Chain extends Node {
    static _ssi = 1;
    
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
        return `\u001B[1;36m[\u001B[0m ${this.chainOrder.join(", ")} \u001B[1;36m]\u001B[0m`;
    }
    
    /**
     * Serializes
     * @param {Serialize} serializer - serializer
     */
    serialize(serializer) {
        serializer.writeOne(i.NODE);
        serializer.writeOne(i.T_CHAIN);
        serializer.writeOne(i.EXIT);
    }
    
    /** @override */
    *atomicGraphs() {
        yield* this.chainOrder;
    }
}
