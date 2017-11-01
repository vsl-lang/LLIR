import { Type } from 'llvm-node';

/**
 * @external {llvm.Type} http://llvm.org/doxygen/classllvm_1_1Type.html
 */

/**
 * @external {llvm.IntegerType} http://llvm.org/doxygen/classllvm_1_1IntegerType.html
 */

/**
 * @external {llvm.PointerType} http://llvm.org/doxygen/classllvm_1_1PointerType.html
 */

/** @typedef {llvm.PointerType} LLVMString `i8**` */
/** @typedef {llvm.IntegerType} Int32 `i32` */
/** @typedef {llvm.IntegerType} Int64 `i64` */

/**
 * @typedef {Object} LLVMPrimitives
 * @property {Object} int
 * @property {llvm.IntegerType} int.8
 * @property {llvm.IntegerType} int.16
 * @property {Int32} int.32
 * @property {Int64} int.64
 * @property {LLVMString} string
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
        int: {
            [8]: Type.getInt8Ty(context),
            [16]: Type.getInt16Ty(context),
            [32]: Type.getInt32Ty(context),
            [64]: Type.getInt64Ty(context),
        },
        string: Type.getInt8PtrTy(context),
        double: Type.getDoubleTy(context)
    }
}
