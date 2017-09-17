import * as Nodes from '@/ExecutionGraph/Node/Nodes';
import Node from '@/ExecutionGraph/Node/Node';

/**
 * Serializes a static execution graph.
 */
export default class Serialize {
    static SIGNATURE = [0x4C, 0x4C, 0x49, 0x52, 0x0A];
    
    static START_MASK = 0xF0; // X  & START_MASK > 0
    
    static GRAPH = 0x10;
    static SUBGRAPH = 0x11;
    static ATOMIC_GRAPH = 0x12;
    
    static NODE = 0x20;
    
    static T_ENTRY = 0x21;
    static T_EXIT = 0x22;
    static T_RECURSION = 0x23;
    
    static T_CONDITIONAL = 0x2A;
    static T_CHAIN = 0x2B;
    
    static EXIT = 0xF1;
    
    constructor() {
        /** @private */
        this.buffer = Buffer.alloc(5);
        
        /** @private */
        this.pos = 0;
    }
    
    /** @private */
    writeOne(byte) {
        if (this.buffer.length <= this.pos) {
            const RESIZE_FACTOR = 1.5;
            let oldBuffer = this.buffer;
            this.buffer = Buffer.allocUnsafe(~~(oldBuffer.length * RESIZE_FACTOR));
            let end = oldBuffer.copy(this.buffer);
            while (end < this.buffer.length) this.buffer[end++] = 0;
        }
        
        this.buffer.writeUInt8(byte, this.pos, true)
        this.pos++;
    }
    
    /** @private */
    write(bytes) {
        for (let i = 0; i < bytes.length; i++) this.writeOne(bytes[i]);
    }
    
    /**
     * Begins serializing an execution graph.
     * @param  {ExecutionGraph} graph Graph to serialize
     */
    serializeGraph(graph) {
        this.write(Serialize.SIGNATURE);
        this.writeOne(Serialize.GRAPH);
        
        this.serializeSubgraph(graph.main, 0x00);
        
        this.writeOne(Serialize.EXIT);
    }
    
    /**
     * Begins serializing a subgraph
     * @param  {Subgraph} graph Graph to serialize
     * @param  {number} id Subgraph id (uint8)
     */
     serializeSubgraph(subgraph, id) {
         const mask = ~Serialize.START_MASK;
         this.writeOne(Serialize.SUBGRAPH);
         this.writeOne(id << 4 & mask | id & mask); // Move 2nd half-byte over
         
         this.serializeAtomicGraph(subgraph.body);
         
         this.writeOne(Serialize.EXIT);
     }
     
     /**
      * Begins serializing an atomic
      * @param  {AtomicGraph} graph Graph to serialize
      * @param  {number} id Subgraph id (uint8)
      */
     serializeAtomicGraph(graph) {
         let atom = graph.getAtom();
         
         if (atom !== null) {
             this.writeOne(Serialize.ATOMIC_GRAPH);
             this.serializeNode(graph.entry);
             this.serializeNode(atom);
             this.serializeNode(graph.exit);
             this.serializeNode(graph.recursionEntry);
             this.writeOne(Serialize.EXIT);
         }
     }
     
     /**
      * Serializes a node, this will decide which type of node it is and
      * serialize depending on it.
      * @param {Node} node - node to serialize
      */
     serializeNode(node) {
         this.writeOne(Serialize.NODE);
         
         switch (node.constructor) {
             case Nodes.Chain:       return this.serializeChain(node);
             case Nodes.Conditional: return this.serializeConditional(node);
             case Nodes.Entry:       return this.serializeEntry(node);
             case Nodes.Exit:        return this.serializeExit(node);
             case Nodes.Recursion:   return this.serializeRecursion(node);
             case Node:
                throw new TypeError(`abstract node found in graph`);
             default:
                throw new TypeError(`unexpected node type ${node ? node.constructor.name : node}`)
         }
         
         this.writeOne(Serialize.EXIT);
     }
     
     /**
      * Serializes Entry
      * @param {Entry} node - entry node
      */
     serializeEntry(node) {
         this.writeOne(Serialize.T_ENTRY);
     }
     
     /**
      * Serializes Exit
      * @param {Exit} node - exit node
      */
     serializeExit(node) {
         this.writeOne(Serialize.T_EXIT);
     }
     
     /**
      * Serializes recursion
      * @param {Recursion} node - recursion node
      */
     serializeRecursion(node) {
         this.writeOne(Serialize.T_RECURSION);
     }
     
     /**
      * Serializes Conditional
      * @param {Conditional} node - conditional node
      */
     serializeConditional(node) {
         this.writeOne(Serialize.T_CONDITIONAL);
     }
}
