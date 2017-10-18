import { Type } from 'llvm-node';

/**
 * @external {llvm.Type} http://llvm.org/doxygen/classllvm_1_1Type.html
 */

/**
 * @typedef {Object} LLVMPrimitives
 * @property {llvm.Type} int8
 * @property {llvm.Type} int16
 * @property {llvm.Type} int32
 * @property {llvm.Type} int64
 * @property {llvm.Type} double
 */

/**
 * Returns an object of LLVM primitives.
 *
 * @param {llvm.LLVMContext} context - LLVM context
 * @return {LLVMPrimitives} the object.
 */
export default function LLEstablishPrimitives(context) {
    return {
        int8: Type.getInt8Ty(context),
        int16: Type.getInt16Ty(context),
        int32: Type.getInt32Ty(context),
        int64: Type.getInt64Ty(context),
        double: Type.getDoubleTy(context),
    }
}
