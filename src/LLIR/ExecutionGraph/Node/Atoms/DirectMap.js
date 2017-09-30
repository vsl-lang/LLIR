import Node from '@/LLIR/ExecutionGraph/Node/Node';
/**
 * Represents a simple continous domain -> codomain mapping node.
 */
export default class DirectMap extends Node {
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
    
    /** */
    toString() {
        return `(${this.operation.name})`;
    }
}
