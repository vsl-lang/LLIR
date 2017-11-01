/**
 * {@link LL} generator watcher element. You can use this to match a graph node
 * and then provide something to generate. Use the map to navigate (triggers) a
 * navigation calling another watcher. You can use {@link GraphMap.fromCursor}
 * to create a new {@link GraphMap} from the cursor.
 *
 * @abstract
 */
export default class LLWatcher {
    
    /**
     * Returns if the watcher should run for the given cursor. By default this
     * always returns `false` (never runs).
     *
     * @param {Cursor} cursor - This cursor is used to check if the watcher
     *                        should be run.
     * @return {boolean} if the watcher should run
     * @abstract
     */
    match(cursor) { return false; }
    
    /**
     * Generates the LL output for the given cursor. You **must** call a new
     * state to continue generation.
     *
     * @param {LLGenerationState} data - Generation data see the class for what
     *                                 info it provides.
     * @abstract
     */
    generate(data) { void 0; }
    
}
