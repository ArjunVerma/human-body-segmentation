import { PartSegmentation, PersonSegmentation } from './types';
declare type ImageType = HTMLImageElement | HTMLVideoElement | HTMLCanvasElement;
export declare function toMaskImageData(segmentation: PersonSegmentation, maskBackground?: boolean): ImageData;
export declare function toColoredPartImageData(partSegmentation: PartSegmentation, partColors: Array<[number, number, number]>): ImageData;
export declare function drawMask(canvas: HTMLCanvasElement, image: ImageType, maskImage: ImageData, maskOpacity?: number, maskBlurAmount?: number, flipHorizontal?: boolean): void;
export declare function drawPixelatedMask(canvas: HTMLCanvasElement, image: ImageType, maskImage: ImageData, maskOpacity?: number, maskBlurAmount?: number, flipHorizontal?: boolean, pixelCellWidth?: number): void;
export declare function drawBokehEffect(canvas: HTMLCanvasElement, image: ImageType, personSegmentation: PersonSegmentation, backgroundBlurAmount?: number, edgeBlurAmount?: number, flipHorizontal?: boolean): void;
export {};
