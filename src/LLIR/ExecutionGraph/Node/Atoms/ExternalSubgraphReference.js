import DirectMap from '@/ExecutionGraph/Node/Atoms/DirectMap';
import Offset from '@/Offset/Offset';

/**
 * Represents a primitive LLVM command (e.g. `add [i32 foo, bar]`).
 * @extends {DirectMap}
 */
export default class ExternalSubgraphReference extends DirectMap {
    static uidname = "llir.externalref";

    /** @override */
    init() {
        super.init();
        this._referencingSubgraph = null;
    }

    /**
     * Sets the subgraph referenced by this subgraph referenced. This uses an
     * external subgraph and will inherit all the appropriate data. You can only
     * set the reference once.
     *
     * @param {string} subgraphName - Name of external subgraph.
     * @return {boolean} `true` if set, `false` if not. Either the graph is
     *                   already set or the graph is not in the execution graph.
     */
    setRefencedSubgraph(subgraphName) {
        const executionGraph = this.getImmediateAtomicParent()
            .getSuperSubgraph()
            .getExecutionGraph();

        const subgraph = executionGraph.subgraphForName(subgraphName);

        if (this._referencingSubgraph !== null || subgraph === null)
            return false;
        else
            this._referencingSubgraph = subgraph;

        return true;
    }
}
