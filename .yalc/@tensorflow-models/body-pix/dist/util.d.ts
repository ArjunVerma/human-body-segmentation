import * as tf from '@tensorflow/tfjs-core';
import { BodyPixInput } from './types';
export declare function toInputTensor(input: BodyPixInput): tf.Tensor<tf.Rank.R3>;
export declare function resizeAndPadTo(imageTensor: tf.Tensor3D, [targetH, targetW]: [number, number], flipHorizontal?: boolean): {
    resizedAndPadded: tf.Tensor3D;
    paddedBy: [[number, number], [number, number]];
};
export declare function scaleAndCropToInputTensorShape(tensor: tf.Tensor3D, [inputTensorHeight, inputTensorWidth]: [number, number], [resizedAndPaddedHeight, resizedAndPaddedWidth]: [number, number], [[padT, padB], [padL, padR]]: [[number, number], [number, number]]): tf.Tensor3D;
export declare function removePaddingAndResizeBack(resizedAndPadded: tf.Tensor3D, [originalHeight, originalWidth]: [number, number], [[padT, padB], [padL, padR]]: [[number, number], [number, number]]): tf.Tensor3D;
export declare function resize2d(tensor: tf.Tensor2D, resolution: [number, number], nearestNeighbor?: boolean): tf.Tensor2D;
