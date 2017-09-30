import { Conditional, NoOp } from '@/ExecutionGraph/Node/Nodes/*';

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
     * Sets a default payload generator for a node.
     *
     * @param {func(node: Node): any} payloadSource - function returning payload
     * for a node.
     */
    setPayloadSource(payloadSource) {
        this.payloadMake = payloadSource;
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
        let conditional = new Conditional(null);
        
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
