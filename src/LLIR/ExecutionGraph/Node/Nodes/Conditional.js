import Node from '@/ExecutionGraph/Node/Node';
import Branch from '@/ExecutionGraph/Branch';
import AtomicGraph from '@/ExecutionGraph/AtomicGraph';
import i from '@/Serializer/SerializationInfo';

/**
 * Conditinal intrinsic. You can specify various fallthrough contrasts which
 * represent the branch's probably density. This is analgous to a $\varsigma$
 * primitive as defined in Conditional Branching. This has a
 * {@link PayloadInteractor} object and offers a {@link ConditionalAnalysis}
 * for the branches given provided payload.
 *
 * @implements {IndexableNode}
 * @extends Node
 */
export default class Conditional extends Node {
    static _ssi = 1;
    
    /** @override */
    init() {
        this.interactor = null;
        
        /** @private */
        this.branches = new Set();
        
        /** @private */
        this.globalConstraint = new AtomicGraph();
        
        /** @private */
        this.fallthrough = new AtomicGraph();
        this.addedGraph(this.fallthrough);
    }
    
    /** @override */
    didSetAtomicParent() {
        let atomicParent = this.getImmediateAtomicParent();
        if (atomicParent !== null) {
            this.globalConstraint.setSupergraph(atomicParent);
        }
    }
    
    /**
     * Called when a subgraph is added
     * @param {AtomicGraph} graph - added graph
     * @private
     */
    addedGraph(graph) {
        graph.setSupergraph(this.globalConstraint);
    }
    
    /**
     * Creates an {@link AtomicGraph} and adds that as a branch given an
     * {@link AtomicGraph} for the condition.
     *
     * @param {AtomicGraph} condition - The condition for the atomic graph's
     *                                choice.
     * @return {?AtomicGraph} A setup atomic graph for the if's condition. Null
     *                        if setup fails. This would be because the
     *                        condition is already owned by another class.
     */
    branch(condition) {
        // Set the condition's supergraph to this
        if (condition.setSupergraph(this) === false) return null;
        
        let graph = new AtomicGraph();
        graph.setSupergraph(this);
        
        this.branches.add(
            new Branch(condition, graph)
        );
        
        return graph;
    }
    
    /**
     * Sets a custom atomic graph for the fallthrough (aka else condition).
     * @param {AtomicGraph} fallthrough - Fallthrough graph to evaluate.
     */
    setFallthrough(fallthrough) {
        this.fallthrough.setAtom(fallthrough);
    }
    
    /**
     * Converts to string representation
     * @return {string} debuggable string
     */
    toString() {
        return `\u001B[1;36m{\u001B[0m ${[...this.branches, this.fallthrough].join("\u001B[1;36m,\u001B[0m ")} \u001B[1;36m}\u001B[0m`;
    }
    
    /** @override */
    *atomicGraphs() {
        for (let branch of this.branches) {
            yield branch.condition;
            yield branch.graph;
        }
        
        yield this.fallthrough;
    }
    
    /**
     * Serializes
     * @param {Serialize} serializer - serializer
     */
    serialize(serializer) {
        serializer.writeOne(i.NODE);
        serializer.writeOne(i.T_CONDITIONAL);
        serializer.writeOne(i.EXIT);
    }
}
