/**
 * The implementation for a {@link WatchState}'s parent.
 *
 * @extends {GraphMap}
 * @interface
 */
export default class WatchStateDelegate {
    /**
     * Called before interaction (or a context shift) to a new node.
     * @param {Node} node The node (not graph) of the context being shifted to.
     */
    interact(node) { void 0; }
}
