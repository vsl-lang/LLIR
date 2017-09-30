export default {
    SIGNATURE: [0x4C, 0x4C, 0x49, 0x52, 0x0A],
    
    START_MASK: 0xF0, // X  & START_MASK > 0
    
    GRAPH: 0x10,
    SUBGRAPH: 0x11,
    ATOMIC_GRAPH: 0x12,
    BRANCH: 0x1A,
    
    NODE: 0x20,
    
    T_ENTRY: 0x21,
    T_EXIT: 0x22,
    T_RECURSION: 0x23,
    
    T_CONDITIONAL: 0x2A,
    T_CHAIN: 0x2B,
    
    ID_FALLTHROUGH: 0xD0,
    ID_BRANHCHES: 0xD1,
    ID_CONDITiON: 0xDA,
    ID_EXPRESsION: 0xDB,
    
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