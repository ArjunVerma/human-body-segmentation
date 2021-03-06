import * as tfconv from '@tensorflow/tfjs-converter';
import * as tf from '@tensorflow/tfjs-core';
export declare class ModelWeights {
    private graphModel;
    constructor(graphModel: tfconv.GraphModel);
    weights(layerName: string): tf.Tensor<tf.Rank.R4>;
    convBias(layerName: string, doublePrefix?: boolean): tf.Tensor<tf.Rank.R1>;
    depthwiseBias(layerName: string): tf.Tensor<tf.Rank.R1>;
    depthwiseWeights(layerName: string): tf.Tensor<tf.Rank.R4>;
    private getVariable;
    dispose(): void;
}
