import * as Nodes from '@/ExecutionGraph/Node/Nodes';
import Node from '@/ExecutionGraph/Node/Node';
import i from '@/Serializer/SerializationInfo';

/**
 * Serializes a static execution graph.
 */
export default class Serialize {
    /**
     * New empty serializer
     */
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
     * Wriets a string to output
     * @param {String} str - string
     */
    writeString(str) {
        let totalLen = this.buffer.length + str.length;
        while (this.bufferLen < totalLen) this.resize();
        
        this.buffer.writeString(str, this.pos, 'utf-8')
        this.pos += str.length;
    }
    
    /**
     * Wriets a buffer to output
     * @param {Buffer} buf - buffer
     */
    writeBuffer(buf) {
        let totalLen = this.buffer.length + buf.length;
        while (this.bufferLen < totalLen) this.resize();
        
        buf.copy(this.buffer, this.pos);
        this.pos += buf.length;
    }
    
    /**
     * Writes a 32-bit unsigned integer to output.
     *
     * @param {number} int - positive integer < 2^32
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
