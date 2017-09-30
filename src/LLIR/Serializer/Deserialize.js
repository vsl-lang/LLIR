import * as Nodes from '@/ExecutionGraph/Node/Nodes';
import Node from '@/ExecutionGraph/Node/Node';
import i from '@/Serializer/SerializationInfo';

/**
 * Deserializes a packed LLIR binary (from {@link Serialize} or rel. classes).
 */
export default class Deserialize {
    /**
     * Creates new empty deserializer
     */
    constructor() {
        /** @private */
        this.obj = null;
    }
    
    /**
     * Returns the deserialized graph
     * @return {Object} Might be an `ExecutionGraph` but depends on serializer.
     */
    getValue() {
        return this.obj;
    }
}
