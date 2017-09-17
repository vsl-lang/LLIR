/**
 * Represents a branch; this means this manages both a condition and it's
 * resulting expression.
 */
export default class Branch {
    /**
     * Creates a branch
     * @param {AtomicGraph} condition - condition where the branch should
     *                                evaluate
     * @param {AtomicGraph} graph - graph to evaluate if the condition passes.
     */
    constructor(condition, graph) {
        /**
         * Condition to be evaluated to see if the branch should evaluate.
         * @type {AtomicGraph}
         */
        this.condition = condition;
        
        /**
         * Expression to be evaluated when condition passes.
         * @type {AtomicGraph}
         */
        this.graph = graph;
    }
    
    /**
     * Converts to string representation
     * @return {string} debuggable string
     */
    toString() {
        return `${this.condition} (na%; ${this.graph})`;
    }
}
