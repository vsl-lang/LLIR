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
    static BRANCH = 0x1A;
    
    static NODE = 0x20;
    
    static T_ENTRY = 0x21;
    static T_EXIT = 0x22;
    static T_RECURSION = 0x23;
    
    static T_CONDITIONAL = 0x2A;
    static T_CHAIN = 0x2B;
    
    static ID_FALLTHROUGH = 0xD0;
    static ID_BRANCHES = 0xD1;
    static ID_CONDITION = 0xDA;
    static ID_EXPRESSION = 0xDB;
    
    static PAYLOAD_01 = 0xA0;
    
    static DATA_01 = 0xB0;
    static DATA_02 = 0xB1;
    static DATA_03 = 0xB2;
    static DATA_04 = 0xB3;
    
    static TYPE_01 = 0xC1; // 8-bit uint8 (id eg fallthrough)
    static TYPE_04 = 0xC0; // integer (4-bit)
    static TYPE_F1 = 0xCA; // F1 = 0x1X (ie graph, subgraph,etc.)
    static TYPE_F2 = 0xCB; // G2 = 0x2X (ie node)
    static TYPE_FE = 0xCE; // follow by [TYPE_01, uint32 len, TYPE_F1 values]
    static TYPE_FF = 0xCF; // end by 0x00 (ie string)
    
    static EXIT = 0xF1;
    
    constructor() {
        /** @private */
        this.buffer = Buffer.alloc(5);
        
        /** @private */
        this.pos = 0;
    }
    
    /** @private */
    resize() {
        const RESIZE_FACTOR = 1.5;
        let oldBuffer = this.buffer;
        this.buffer = Buffer.allocUnsafe(~~(oldBuffer.length * RESIZE_FACTOR));
        let end = oldBuffer.copy(this.buffer);
        while (end < this.buffer.length) this.buffer[end++] = 0;
    }
    
    /** @private */
    writeOne(byte) {
        while (this.buffer.length <= this.pos) this.resize();
        
        this.buffer.writeUInt8(byte, this.pos, true)
        this.pos++;
    }
    
    /** @private */
    writeInt(int) {
        while (this.buffer.length <= this.pos + 4) this.resize();
        
        this.buffer.writeUInt32LE(int, this.pos, true);
        this.pos += 4;
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
         this.writeOne(Serialize.DATA_01);
         this.writeOne(Serialize.TYPE_04);
         this.writeInt(node.depth);
     }
     
     /**
      * Serializes chain
      * @param {Chain} node - chian node
      */
     serializeChain(node) {
         this.writeOne(Serialize.T_CHAIN);
     }
     
     /**
      * Serializes recursion
      * @param {Recursion} node - recursion node
      */
     serializeRecursion(node) {
         this.writeOne(Serialize.T_RECURSION);
         this.writeOne(Serialize.DATA_01);
         this.writeOne(Serialize.TYPE_04);
         this.writeInt(node.depth);
     }
     
     /**
      * Serializes Conditional
      *
      * 01) fallthrough
      * 01) atomic graph
      * 02) branches
      *
      * @param {Conditional} node - conditional node
      */
     serializeConditional(node) {
         this.writeOne(Serialize.T_CONDITIONAL);
         
         // Write fallthrough
         this.writeOne(Serialize.DATA_01);
         this.writeOne(Serialize.TYPE_01);
         this.writeOne(Serialize.ID_FALLTHROUGH);
         this.writeOne(Serialize.DATA_02);
         this.writeOne(Serialize.TYPE_F1);
         this.serializeAtomicGraph(node.fallthrough);
         
         // Write branches
         this.writeOne(Serialize.DATA_03);
         this.writeOne(Serialize.TYPE_FE);
         this.writeOne(Serialize.ID_BRANCHES);
         this.writeInt(node.branches.size);
         for (let branch of node.branches)
            this.serializeBranch(branch);
     }
     
     /**
      * Serializes Conditional
      *
      * 01) condition
      * 02) value (atomic graph)
      * 03) expresssion
      * 04) value (atomic graph)
      *
      * @param {branch} branch - branch node
      */
     serializeBranch(branch) {
         this.writeOne(Serialize.BRANCH);
         
         this.writeOne(Serialize.DATA_01);
         this.writeOne(Serialize.TYPE_01);
         this.writeOne(Serialize.ID_CONDITION);
         this.writeOne(Serialize.DATA_02);
         this.writeOne(Serialize.TYPE_F1);
         this.serializeAtomicGraph(branch.condition);
         
         this.writeOne(Serialize.DATA_03);
         this.writeOne(Serialize.TYPE_01);
         this.writeOne(Serialize.ID_EXPRESSION);
         this.writeOne(Serialize.DATA_04);
         this.writeOne(Serialize.TYPE_F1);
         this.serializeAtomicGraph(branch.graph);
         
         this.writeOne(Serialize.EXIT);
     }
}
