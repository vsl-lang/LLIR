/**
 * @typedef {Object} SerializationInfo
 * @property {uint8[]} SIGNATURE - LLIR file signature
 * @property {uint8} START_MASK - Mask to match the start of a start node's
 *                               entry byte
 * @property {uint8} GRAPH - Entry byte for a graph node
 * @property {uint8} SUBGRAPH_TYPE - Entry byte for an abstract subgraph node
 * @property {uint8} SUBGRAPH - Entry byte for a subgraph node
 * @property {uint8} EXTERNAL_GRAPH - References an external function.
 * @property {uint8} ATOMIC_GRAPH - Entry byte for an atomic graph node
 * @property {uint8} BRANCH - Entry byte for a branch node
 *
 * @property {uint8} NODE - Entry byte for a node.
 *
 * @property {uint8} T_ENTRY - Node type for entry node
 * @property {uint8} T_EXIT - Node type for exit node
 * @property {uint8} T_RECURSION - Node type for recursion node
 *
 * @property {uint8} T_NOOP - Node type for a no-op node.
 * @property {uint8} T_CHAIN - Node type for chain node
 * @property {uint8} T_CONDITIONAL - Node type for conditional node
 *
 * @property {uint8} T_UNK Unknown node type falls back to {@link Node}
 * @property {uint8} T_UDT follow by a null-delimited string specifying the type
 *                         of the node to deserialize. By default {@link Node}
 *                         uses this with `static uidname`
 *
 * @property {uint8} ID_FALLTHROUGH - Represents the id-tag for a fallthrough
 *                                  spec on a data byte set.
 * @property {uint8} ID_BRANCHES - Represents the id-tag for a branch spec on a
 *                               data byte set.
 * @property {uint8} ID_CONDITION - Represents the id-tag for a condition spec
 *                               on a data byte set.
 * @property {uint8} ID_EXPRESSION - Represents the id-tag for a expression spec
 *                               on a data byte set.
 * @property {uint8} ID_UDI - User-defined id-tag for an expression spec. Follow
 *                          by type then a null-delimited string for id.
 *
 * @property {uint8} DATA_01 - Delimits first data node.
 * @property {uint8} DATA_02 - Delimits second data node.
 * @property {uint8} DATA_03 - Delimits third data node.
 * @property {uint8} DATA_04 - Delimits fourth data node.
 * @property {uint8} DATA_05 - Delimits fifth data node.
 *
 * @property {uint8} TYPE_01 - Byte set type node for uint8
 * @property {uint8} TYPE_04 - Byte set type node for uint32
 * @property {uint8} TYPE_F1 - Byte set type node for matching START_MASK
 * @property {uint8} TYPE_F2 - Byte set type node for matching START_MASK
 * @property {uint8} TYPE_FE - Byte set in the form of [TYPE_F1, uint32 len,
 *                           TYPE_F1 values]
 * @property {uint8} TYPE_FF - null-delimited string
 *
 * @property {uint8} EXIT - Represents the closing of a byte set.
 */
export default {
    SIGNATURE: [0x4C, 0x4C, 0x49, 0x52, 0x0A],
    
    START_MASK: 0xF0, // X  & START_MASK > 0
    
    GRAPH: 0x10,
    EXTERNAL_GRAPH: 0x14,
    SUBGRAPH_TYPE: 0x13,
    SUBGRAPH: 0x11,
    ATOMIC_GRAPH: 0x12,
    BRANCH: 0x1A,
    
    NODE: 0x20,
    
    T_ENTRY: 0x21,
    T_EXIT: 0x22,
    T_RECURSION: 0x23,
    
    T_NOOP: 0x2A,
    T_CHAIN: 0x2B,
    T_CONDITIONAL: 0x2C,
    
    T_UDT: 0x2F,
    
    ID_FALLTHROUGH: 0xD0,
    ID_BRANCHES: 0xD1,
    ID_CONDITION: 0xDA,
    ID_EXPRESSION: 0xDB,
    ID_UDI: 0xDF,
    
    PAYLOAD_01: 0xA0,
    
    DATA_01: 0xB0,
    DATA_02: 0xB1,
    DATA_03: 0xB2,
    DATA_04: 0xB3,
    
    TYPE_01: 0xC1, // 8-bit uint8 (id eg fallthrough)
    TYPE_04: 0xC0, // integer (4-byte)
    TYPE_F1: 0xCA, // F1 = 0x1X (ie graph, subgraph,etc.)
    TYPE_F2: 0xCB, // G2 = 0x2X (ie node)
    TYPE_FE: 0xCE, // follow by [TYPE_01, uint32 len, TYPE_F1 values]
    TYPE_FF: 0xCF, // end by 0x00 (ie string)
    
    EXIT: 1
}
