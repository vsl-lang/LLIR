import Node from '@/LLIR/ExecutionGraph/Node/Node';
import i from '@/Serializer/SerializationInfo';

/**
 * Represents a simple continous domain -> codomain mapping node.
 */
export default class DirectMap extends Node {
    static uidname = 'llir.atom';
    
    /** @override */
    init() {
        this.operation = null;
    }
    
    /**
     * Sets the offset domain mapping. Use an {@link Offset} object to describe
     * the movement.
     *
     * @example
     * let map = instance.make.directMap();
     * map.setOffsetDomain(
     *     Offset.linear
     * )
     *
     * @param {Offset} offset - Domain offset
     */
    setOffsetDomain(offset) {
        this.operation = offset;
    }
    
    /** @override */
    toString() {
        return `(${this.operation.name})`;
    }
    
    /** @override */
    serializeNode(serializer) {
        serializer.writeOne(i.DATA_01);
        serializer.writeOne(i.ID_UDI);
        serializer.writeOne(t.TYPE_FF);
        serializer.writeString("offset");
        serializer.writeString(this.operation.id);
    }
}
