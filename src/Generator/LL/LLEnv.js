import arch from 'arch';

/**
 * Stores information about the environment being compiler to. This includes
 * things such as int-size. You can use {@link LLEnv.default} to create a new
 * instance using defaults.
 */
export default class LLEnv {
    /**
     * Creates with specified info
     * @param {number} width - width of pointer address. (e.g. 64 for 64-bit).
     *                       Keep in range 16 <= n < 128
     */
    constructor(width) {
        /**
         * Width of pointer address. (e.g. 64 for 64-bit)
         * @type {number}
         */
        this.width = width;
    }
    
    /**
     * Returns the int size that would be used.
     * @type {number}
     */
    get intSize() {
        switch (this.width) {
            case 64:
            case 32: return 32;
            case 16: return 16;
            default: return Math.pow(Math.sqrt(this.width) | 0, 2);
        }
    }
    
    /**
     * Returns the integer type to use
     * @param {LL} ll - LL generator for integer type.
     * @return {llvm.IntegerType}
     */
    intType(ll) {
        return ll.types.int[this.intSize];
    }
    
    /**
     * Returns environment set to system defaults.
     * @type {LLEnv} enviroment, modifiable, set to system defaults.
     */
    static get default() {
        let width = arch() === 'x64' ? 64 : 32;
        return new LLEnv(
            width
        );
    }
}
