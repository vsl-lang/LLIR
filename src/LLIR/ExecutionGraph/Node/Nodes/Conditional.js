import Node from '@/ExecutionGraph/Node/Node';

/**
 * Conditinal intrinsic. You can specify various fallthrough contrasts which
 * represent the branch's probably density. This is analgous to a $\varsigma$
 * primitive as defined in Conditional Branching. This has a
 * {@link PayloadInteractor} object and offers a {@link ConditionalAnalysis}
 * for the branches given provided payload.
 */
export default class Conditional extends Node {
    /** @override */
    init() {
        this.interactor = null;
        this.branches = new Set();
    }
    
    /**
     * Propogates fallthrough and payload constraints between entry and exit.
     * @private
     */
    propogateDomainConstraint() {
        
    }
    
    /**
     * Converts to string representation
     * @return {string} debuggable string
     */
    toString() {
        return `{ ${[...this.branches].join(", ")} }`;
    }
}
