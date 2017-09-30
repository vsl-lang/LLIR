import GeneratorPayload from '~/Generator/Payload/GeneratorPayload';

export default class GeneratorPayloadSource {
    /**
     * Creates a generator payload. Don't use directly use
     * {@link GeneratorBase#payloadSource} instance to create one of these.
     * 
     * @param {GeneratorBase} generator - generator source.
     */
    constructor(generator) {
        /** @private */
        this.generator = generator;
    }
    
    /**
     * Returns the payload source emitter for this payload instance. an
     * object/function to be passed to {@link GraphBuilder#setPayloadSource}.
     * @type {any}
     */
    get sourceEmitter() {
        return (node) =>
            new GeneratorPayload(this.generator);
    }
}