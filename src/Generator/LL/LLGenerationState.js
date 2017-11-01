/**
 * A state of generation for {@link LL}. Passed to {@link LLWatcher}s
 */
export default class LLGenerationState {
    /**
     * Only used by {@link LL}. Do not use
     *
     * @param {LL} ll - LL generator instance
     * @param {Cursor} cursor - Cursor to generate
     * @param {WatchMap} state - map for navigation
     * @protected
     */
    constructor(ll, cursor, state) {
        /**
         * LL generator instance.
         * @type {LL}
         */
        this.ll = ll;
        
        /**
         * The matched cursor
         * @type {Cursor}
         */
        this.cursor = cursor;
        
        /**
         * The state for navigation. Using this **will** trigger a new
         * generation. No code should follow this.
         * @type {WatchMap}
         */
        this.state = state;
    }
}
