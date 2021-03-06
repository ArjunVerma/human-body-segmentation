import * as tf from '@tensorflow/tfjs-core';
export declare type BodyPixInput = ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | tf.Tensor3D;
export declare type PersonSegmentation = {
    data: Uint8Array;
    width: number;
    height: number;
};
export declare type PartSegmentation = {
    data: Int32Array;
    width: number;
    height: number;
};
