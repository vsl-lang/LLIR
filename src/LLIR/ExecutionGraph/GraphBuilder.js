import { Chain, Conditional, NoOp } from '@/ExecutionGraph/Node/Nodes/*';
import AtomicGraph from '@/ExecutionGraph/AtomicGraph';
import ExternalSubgraph from '@/ExecutionGraph/ExternalSubgraph';

/**
 * Factory class for building graph nodes for {@link ExecutionGraph}s.
 */
export default class GraphBuilder {
    constructor(executionGraph) {
        /** @private */
        this.graph = executionGraph;
        
        /** @private */
        this.payloadMake = null;
    }
    
    /**
     * Creates an external subgraph.
     * @param {string} name - Name of subgraph (external & internal)
     * @param {FunctionType} type - Function type describing graph
     * @return {ExternalSubgraph} You can pretty much discard this
     */
    externalSubgraph(name, type) {
        let subgraph = new ExternalSubgraph(
            this.graph,
            name,
            type
        );
        
        this.graph.subgraphs.add(subgraph);
        
        return subgraph;
    }
    
    /**
     * Sets a default payload generator for a node.
     *
     * @param {func(node: Node): any} payloadSource - function returning payload
     * for a node.
     */
    setPayloadSource(payloadSource) {
        this.payloadMake = payloadSource;
    }
    
    /**
     * Creates an {@link AtomicGraph} wrapper for a node.
     *
     * @param {Node} node - If this sets an offset domain that will be
     *                    propogated.
     * @return {AtomicGraph}
     */
    wrapAtomic(node) {
        let graph = new AtomicGraph();
        graph.setAtom(node);
        return graph;
    }
    
    /**
     * Craetes a chain statement.
     *
     * @param {AtomicGraph[]} graphs - A list of atomic graphs which will
     *                               execute in order as part of the chain.
     * @return {Chain}
     */
    chain(graphs) {
        let chain = new Chain();
        
        for (let i = 0; i < graphs.length; i++) {
            chain.pushEventGraph(graphs[i]);
        }
        
        this.finishNode(chain);
        return chain;
    }
    
    /**
     * Creates a conditional branch
     *
     * @param {Branch[]} [branches=[]] - An array of atomic graphs representing
     *                                 branches, you can modify this later. Or
     *                                 leave this empty if you want to setup
     *                                 your own, more complex branching info.
     * @return {?Conditional} a conditional branch node set up for the given
     *                        execution graph. This will be `null` if the
     *                        branch is not compatible with branch exists.
     */
    conditional(branches = []) {
        let conditional = new Conditional();
        
        for (let i = 0; i < branches.length; i++) {
            let branch = conditional.branch(branches[i].condition);
            let result = branch.setFromGraph(branches.setSubgraph)
        }
        
        this.finishNode(conditional);
        return conditional;
    }
    
    /** @private */
    finishNode(node) {
        if (node instanceof NoOp) node.setPlaceholder(false);
        if (this.payloadMake === null) return;
        node.setInitialPaylaod(this.payloadMake(node));
    }
}
