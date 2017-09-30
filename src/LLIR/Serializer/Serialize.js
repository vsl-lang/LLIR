import * as Nodes from '@/ExecutionGraph/Node/Nodes';
import Node from '@/ExecutionGraph/Node/Node';
import i from '@/Serializer/SerializationInfo';

/**
 * Serializes a static execution graph.
 */
export default class Serialize {
    
    
    constructor() {
        /** @private */
        this.pos = 0;
        
        /** @private */
        this.buffer = Buffer.alloc(5);
        this.buffer.writeUInt8(i.SIGNATURE, 0, true);
        this.pos++;
    }
    
    /** @private */
    resize() {
        const RESIZE_FACTOR = 1.5;
        let oldBuffer = this.buffer;
        this.buffer = Buffer.allocUnsafe(~~(oldBuffer.length * RESIZE_FACTOR));
        let end = oldBuffer.copy(this.buffer);
        while (end < this.buffer.length) this.buffer[end++] = 0;
    }
    
    /**
     * Writes one byte to output
     * 
     * @param {number} byte - positive integer < 256
     */
    writeOne(byte) {
        while (this.buffer.length <= this.pos) this.resize();
        
        this.buffer.writeUInt8(byte, this.pos, true)
        this.pos++;
    }
    
    /**
     * Writes a 32-bit unsigned integer to output.
     * 
     * @param {number} num - positive integer < 2^32
     */
    writeInt(int) {
        while (this.buffer.length <= this.pos + 4) this.resize();
        
        this.buffer.writeUInt32LE(int, this.pos, true);
        this.pos += 4;
    }
    
    /**
     * Writes an array of bytes
     * 
     * @param {number[]} bytes - array of uint8s
     */
    write(bytes) {
        for (let i = 0; i < bytes.length; i++) this.writeOne(bytes[i]);
    }
}
