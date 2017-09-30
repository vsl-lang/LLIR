import Node from '@/ExecutionGraph/Node/Node';
import i from '@/Serializer/SerializationInfo';

/**
 * Represents an entry ($S$) node of an execution graph. This has implicit
 * domain analysis based upon payload of conditional branches. Use the
 * {@link PayloadInteractor} class to interact with this node's interface for
 * tracking fallthrough etc.
 */
export default class Entry extends Node {
    /** @override */
    init() {
        this.interactor = null;
    }
    
    /**
     * Obtains matching (symmetric) exit node.
     * @return {?Exit} symmetric exit node, null if not found
     */
    getSymmetricExit() {
        return this.getImmediateAtomicParent().exit;
    }
    
    /**
     * Converts to string representation
     * @return {string} debuggable string
     */
    toString() {
        return `Start`;
    }
    
    /**
     * Serializes
     * @param {Serialize} serializer - serializer
     */
    serialize(serializer) {
        serializer.writeOne(i.NODE);
        serializer.writeOne(i.T_ENTRY);
        serializer.writeOne(i.EXIT);
    }
}
