import GeneratorPayloadSource from '~/Generator/Payload/GeneratorPayloadSource';

/**
 * Manager class for a generator instance
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
