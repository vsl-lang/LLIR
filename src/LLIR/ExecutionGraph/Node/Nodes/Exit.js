import Node from '@/ExecutionGraph/Node/Node';
import i from '@/Serializer/SerializationInfo';

/**
 * Represents an Exit ($E_x$) node of an execution graph. This is a transparent
 * node which interfaces with a {@link PayloadInteractor} and the
 * {@link ExecutionGraph} to watch payload changes and ensure exit merging for
 * similar domains. Graph overlap is a more complex topic which should not break
 * symmetry which is described in the LLIR paper.
 */
export default class Exit extends Node {
    /** @override */
    init() {
        this.interactor = null;
        
        /** @private */
        this.depth = 0;
    }
    
    /**
     * Obtains matching (symmetric) exit node.
     * @return {?Exit} symmetric exit node, null if not found
     */
    getSymmetricEntry() {
        return this.getImmediateAtomicParent().entry;
    }
    
    /**
     * Converts to string representation
     * @return {string} debuggable string
     */
    toString() {
        return `Exit`;
    }
    
    /**
     * Serializes
     * @param {Serialize} serializer - serializer
     */
    serialize(serializer) {
        serializer.writeOne(i.NODE);
        serializer.writeOne(i.T_EXIT);
        serializer.writeOne(i.DATA_01);
        serializer.writeOne(i.TYPE_04);
        serializer.writeInt(this.depth);
        serializer.writeOne(i.EXIT);
    }
}
