import { Conditional } from '@/ExecutionGraph/Node/Nodes/*';

/**
 * Factory class for building graph nodes for {@link ExecutionGraph}s.
 */
export default class GraphBuilder {
    constructor(executionGraph) {
        /** @private */
        this.graph = executionGraph;
    }
    
    /**
     * Creates a conditional branch
     *
     * @param {AtomicGraph[]} [branches=[]] - An array of atomic graphs
     *                                      representing branches, you can
     *                                      modify this later. Or leave this
     *                                      empty if you want to setup your own,
     *                                      more complex branching info.
     * @return {Conditional} a conditional branch node set up for the given
     *                       execution graph.
     */
    conditional(branches = []) {
        return new Conditional(null);
    }
}
