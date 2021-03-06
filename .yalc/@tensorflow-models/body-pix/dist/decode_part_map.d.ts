import * as tf from '@tensorflow/tfjs-core';
export declare function toMask(segmentScores: tf.Tensor2D, threshold: number): tf.Tensor2D;
export declare function decodePartSegmentation(segmentationMask: tf.Tensor2D, partHeatmapScores: tf.Tensor3D): tf.Tensor2D;
