import GeneratorPayloadSource from '~/Generator/Payload/GeneratorPayloadSource';
import WatchMap from '~/Generator/WatchMap';

/**
 * Manager class for a generator instance
 * @implements {WatchStateDelegate}
 * @abstract
 */
export default class GeneratorBase {
    /**
     * Unique instance id of generator. Used for tracking generators.
     * @type {string}
     */
    static instanceId = null;
    
    /**
     * Returns payload source, use this for creating payloads.
     *
     * @type {GeneratorPayloadSource}
     */
    get payloadSource() {
        return this._payloadSource ||
            (this._payloadSource = new GeneratorPayloadSource(this));
    }
    
    /**
     * This takes a node and generates it. You can track state by
     * interacting with the `state` WatchMap. This is called on each context
     * shift.
     *
     * @param {Cursor} cursor the inital cursor for the generator
     * @param {WatchMap} state Map for navigation of state.
     * @protected
     * @abstract
     */
    generate(cursor, state) { void 0; }
    
    /**
     * Called before interaction (or a context shift) to a new node.
     * @param {Cursor} cursor The node (not graph) of the context being shifted
     *                        to.
     */
    interact(cursor) {
        this.generate(cursor, this.state);
    }
    
    /**
     * Can only call once, sets the {@link ExecutionGraph} for the generator.
     * This **will** begin generation immediately.
     *
     * @param {executionGraph} executionGraph - Execution graph to set.
     * @return {boolean} `true` if set, `false` if not (already set).
     */
    setGraph(executionGraph) {
        if (this._state !== null) return false;
        this._state = new WatchMap(executionGraph);
        this._state.setDelegate(this);
        
        this.interact(this._state.getCursor());
        
        return true;
    }
    
    /** @private */
    _state = null;
    
    /** @private */
    _payloadSource = null;
    
    /**
     * Weak bindings of attached payload objects
     *
     * @type {WeakMap<number, GeneratorPayload>}
     * @readonly
     */
    payloadStore = new WeakMap();
    
    /**
     * Payload counter.
     *
     * @type {number}
     * @readonly
     */
    payloadCount = 0;
    
}
