import * as tf from '@tensorflow/tfjs-core';
import { MobileNet, MobileNetMultiplier, OutputStride } from './mobilenet';
import { BodyPixInput, PartSegmentation, PersonSegmentation } from './types';
export declare class BodyPix {
    mobileNet: MobileNet;
    constructor(mobileNet: MobileNet);
    predictForSegmentation(input: tf.Tensor3D, outputStride?: OutputStride): tf.Tensor3D;
    predictForPartMap(input: tf.Tensor3D, outputStride?: OutputStride): {
        segmentScores: tf.Tensor3D;
        partHeatmapScores: tf.Tensor3D;
    };
    estimatePersonSegmentationActivation(input: BodyPixInput, outputStride?: OutputStride, segmentationThreshold?: number): tf.Tensor2D;
    estimatePersonSegmentation(input: BodyPixInput, outputStride?: OutputStride, segmentationThreshold?: number): Promise<PersonSegmentation>;
    estimatePartSegmentationActivation(input: BodyPixInput, outputStride?: OutputStride, segmentationThreshold?: number): tf.Tensor2D;
    estimatePartSegmentation(input: BodyPixInput, outputStride?: OutputStride, segmentationThreshold?: number): Promise<PartSegmentation>;
    dispose(): void;
}
export declare function load(multiplier?: MobileNetMultiplier): Promise<BodyPix>;
export declare const mobilenetLoader: {
    load: (multiplier: MobileNetMultiplier) => Promise<MobileNet>;
};
