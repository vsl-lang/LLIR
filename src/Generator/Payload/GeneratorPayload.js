export default class GeneratorPayload {
    constructor(generator) {
        this.trackingId = generator.payloadCount++;
        generator.payloadStore.set(this.trackingId, this);
    }
}