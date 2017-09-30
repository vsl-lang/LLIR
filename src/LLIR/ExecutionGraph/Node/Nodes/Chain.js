import Node from '@/ExecutionGraph/Node/Node';
import i from '@/Serializer/SerializationInfo';

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
    
    /**
     * Serializes
     * @param {Serialize} serializer - serializer
     */
    serialize(serializer) {
        serializer.writeOne(i.NODE);
        serializer.writeOne(i.T_CHAIN);
        serializer.writeOne(i.EXIT);
    }
}
