import Node from '@/ExecutionGraph/Node/Node';
import AtomicGraph from '@/ExecutionGraph/AtomicGraph';
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
    
    constructor() { super() }
    
    /** @override */
    init() {
        this.interactor = null;
        
        /** @private */
        this.chainOrder = [];
        
        /**
         * The global constraint (linkned to the chain's parent) which all
         * subchains are connected to.
         * @type {AtomicGraph}
         */
        this.globalConstraint = new AtomicGraph();
    }
    
    /**
     * Pushes a subgraph to the end of the execution order.
     * @param {AtomicGraph} graph - Atomic graph to append to chain.
     */
    pushEventGraph(graph) {
        this.chainOrder.push(graph);
        graph.setSupergraph(this.globalConstraint);
    }
    
    /** @private */
    didSetAtomicParent() {
        let atomicParent = this.getImmediateAtomicParent();
        if (atomicParent !== null) {
            this.globalConstraint.setSupergraph(atomicParent);
        }
    }
    
    /** @override */
    *atomicGraphs() {
        yield* this.chainOrder;
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
}
