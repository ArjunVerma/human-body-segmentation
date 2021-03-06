/**
    * @license
    * Copyright 2019 Google LLC. All Rights Reserved.
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    * http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    * =============================================================================
    */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tensorflow/tfjs-core'), require('@tensorflow/tfjs-converter')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tensorflow/tfjs-core', '@tensorflow/tfjs-converter'], factory) :
    (factory((global.bodyPix = {}),global.tf,global.tf));
}(this, (function (exports,tf,tfconv) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var mobileNet100Architecture = [
        ['conv2d', 2],
        ['separableConv', 1],
        ['separableConv', 2],
        ['separableConv', 1],
        ['separableConv', 2],
        ['separableConv', 1],
        ['separableConv', 2],
        ['separableConv', 1],
        ['separableConv', 1],
        ['separableConv', 1],
        ['separableConv', 1],
        ['separableConv', 1],
        ['separableConv', 2],
        ['separableConv', 1]
    ];
    var mobileNet75Architecture = [
        ['conv2d', 2],
        ['separableConv', 1],
        ['separableConv', 2],
        ['separableConv', 1],
        ['separableConv', 2],
        ['separableConv', 1],
        ['separableConv', 2],
        ['separableConv', 1],
        ['separableConv', 1],
        ['separableConv', 1],
        ['separableConv', 1],
        ['separableConv', 1],
        ['separableConv', 1],
        ['separableConv', 1]
    ];
    var mobileNet50Architecture = [
        ['conv2d', 2],
        ['separableConv', 1],
        ['separableConv', 2],
        ['separableConv', 1],
        ['separableConv', 2],
        ['separableConv', 1],
        ['separableConv', 2],
        ['separableConv', 1],
        ['separableConv', 1],
        ['separableConv', 1],
        ['separableConv', 1],
        ['separableConv', 1],
        ['separableConv', 1],
        ['separableConv', 1]
    ];
    var mobileNet25Architecture = mobileNet50Architecture;
    var VALID_OUTPUT_STRIDES = [8, 16, 32];
    function assertValidOutputStride(outputStride) {
        tf.util.assert(typeof outputStride === 'number', function () { return 'outputStride is not a number'; });
        tf.util.assert(VALID_OUTPUT_STRIDES.indexOf(outputStride) >= 0, function () { return "outputStride of " + outputStride + " is invalid. " +
            "It must be either 8, 16, or 32"; });
    }
    var mobileNetArchitectures = {
        100: mobileNet100Architecture,
        75: mobileNet75Architecture,
        50: mobileNet50Architecture,
        25: mobileNet25Architecture
    };
    function toOutputStridedLayers(convolutionDefinition, outputStride) {
        var currentStride = 1;
        var rate = 1;
        return convolutionDefinition.map(function (_a, blockId) {
            var convType = _a[0], stride = _a[1];
            var layerStride, layerRate;
            if (currentStride === outputStride) {
                layerStride = 1;
                layerRate = rate;
                rate *= stride;
            }
            else {
                layerStride = stride;
                layerRate = 1;
                currentStride *= stride;
            }
            return {
                blockId: blockId,
                convType: convType,
                stride: layerStride,
                rate: layerRate,
                outputStride: currentStride
            };
        });
    }
    var MobileNet = (function () {
        function MobileNet(modelWeights, convolutionDefinitions) {
            this.PREPROCESS_DIVISOR = tf.scalar(255.0 / 2);
            this.ONE = tf.scalar(1.0);
            this.modelWeights = modelWeights;
            this.convolutionDefinitions = convolutionDefinitions;
        }
        MobileNet.prototype.predict = function (input, outputStride) {
            var _this = this;
            var normalized = tf.div(input.toFloat(), this.PREPROCESS_DIVISOR);
            var preprocessedInput = tf.sub(normalized, this.ONE);
            var layers = toOutputStridedLayers(this.convolutionDefinitions, outputStride);
            return layers.reduce(function (previousLayer, _a) {
                var blockId = _a.blockId, stride = _a.stride, convType = _a.convType, rate = _a.rate;
                if (convType === 'conv2d') {
                    return _this.conv(previousLayer, stride, blockId);
                }
                else if (convType === 'separableConv') {
                    return _this.separableConv(previousLayer, stride, blockId, rate);
                }
                else {
                    throw Error("Unknown conv type of " + convType);
                }
            }, preprocessedInput);
        };
        MobileNet.prototype.convToOutput = function (mobileNetOutput, outputLayerName) {
            return mobileNetOutput.conv2d(this.weights(outputLayerName), 1, 'same')
                .add(this.convBias(outputLayerName, false));
        };
        MobileNet.prototype.conv = function (inputs, stride, blockId) {
            var weights = this.weights("Conv2d_" + String(blockId));
            var a = inputs.conv2d(weights, stride, 'same');
            var b = a.add(this.convBias("Conv2d_" + String(blockId)));
            return b.clipByValue(0, 6);
        };
        MobileNet.prototype.separableConv = function (inputs, stride, blockID, dilations) {
            if (dilations === void 0) { dilations = 1; }
            var dwLayer = "Conv2d_" + String(blockID) + "_depthwise";
            var pwLayer = "Conv2d_" + String(blockID) + "_pointwise";
            var x1 = inputs
                .depthwiseConv2D(this.depthwiseWeights(dwLayer), stride, 'same', 'NHWC', dilations)
                .add(this.depthwiseBias(dwLayer))
                .clipByValue(0, 6);
            var x2 = x1.conv2d(this.weights(pwLayer), [1, 1], 'same')
                .add(this.convBias(pwLayer))
                .clipByValue(0, 6);
            return x2;
        };
        MobileNet.prototype.weights = function (layerName) {
            return this.modelWeights.weights(layerName);
        };
        MobileNet.prototype.convBias = function (layerName, doublePrefix) {
            if (doublePrefix === void 0) { doublePrefix = true; }
            return this.modelWeights.convBias(layerName, doublePrefix);
        };
        MobileNet.prototype.depthwiseBias = function (layerName) {
            return this.modelWeights.depthwiseBias(layerName);
        };
        MobileNet.prototype.depthwiseWeights = function (layerName) {
            return this.modelWeights.depthwiseWeights(layerName);
        };
        MobileNet.prototype.dispose = function () {
            this.modelWeights.dispose();
        };
        return MobileNet;
    }());

    var BASE_URL = 'https://storage.googleapis.com/tfjs-models/savedmodel/';
    var checkpoints = {
        1.0: {
            url: BASE_URL + 'posenet_mobilenet_100_partmap/',
            architecture: mobileNetArchitectures[100]
        },
        0.75: {
            url: BASE_URL + 'posenet_mobilenet_075_partmap/',
            architecture: mobileNetArchitectures[75]
        },
        0.5: {
            url: BASE_URL + 'posenet_mobilenet_050_partmap/',
            architecture: mobileNetArchitectures[50]
        },
        0.25: {
            url: BASE_URL + 'posenet_mobilenet_025_partmap/',
            architecture: mobileNetArchitectures[25]
        }
    };

    function toFlattenedOneHotPartMap(partHeatmapScores) {
        var _a = partHeatmapScores.shape, numParts = _a[2];
        var partMapLocations = partHeatmapScores.argMax(2);
        var partMapFlattened = partMapLocations.reshape([-1]);
        return tf.oneHot(partMapFlattened, numParts);
    }
    function clipByMask2d(image, mask) {
        return image.mul(mask);
    }
    function toMask(segmentScores, threshold) {
        return tf.tidy(function () {
            return segmentScores.greater(tf.scalar(threshold)).toInt();
        });
    }
    function decodePartSegmentation(segmentationMask, partHeatmapScores) {
        var _a = partHeatmapScores.shape, partMapHeight = _a[0], partMapWidth = _a[1], numParts = _a[2];
        return tf.tidy(function () {
            var flattenedMap = toFlattenedOneHotPartMap(partHeatmapScores);
            var partNumbers = tf.range(0, numParts, 1, 'int32').expandDims(1);
            var partMapFlattened = flattenedMap.matMul(partNumbers).toInt();
            var partMap = partMapFlattened.reshape([partMapHeight, partMapWidth]);
            var partMapShiftedUpForClipping = partMap.add(tf.scalar(1, 'int32'));
            return clipByMask2d(partMapShiftedUpForClipping, segmentationMask)
                .sub(tf.scalar(1, 'int32'));
        });
    }

    var ModelWeights = (function () {
        function ModelWeights(graphModel) {
            this.graphModel = graphModel;
        }
        ModelWeights.prototype.weights = function (layerName) {
            return this.getVariable("MobilenetV1/" + layerName + "/weights");
        };
        ModelWeights.prototype.convBias = function (layerName, doublePrefix) {
            if (doublePrefix === void 0) { doublePrefix = true; }
            return this.getVariable("MobilenetV1/" + layerName + "/Conv2D_bias");
        };
        ModelWeights.prototype.depthwiseBias = function (layerName) {
            return this.getVariable("MobilenetV1/" + layerName + "/depthwise_bias");
        };
        ModelWeights.prototype.depthwiseWeights = function (layerName) {
            return this.getVariable("MobilenetV1/" + layerName + "/depthwise_weights");
        };
        ModelWeights.prototype.getVariable = function (name) {
            return this.graphModel.weights["" + name][0];
        };
        ModelWeights.prototype.dispose = function () {
            this.graphModel.dispose();
        };
        return ModelWeights;
    }());

    function toInputTensor(input) {
        return input instanceof tf.Tensor ? input : tf.browser.fromPixels(input);
    }
    function resizeAndPadTo(imageTensor, _a, flipHorizontal) {
        var targetH = _a[0], targetW = _a[1];
        if (flipHorizontal === void 0) { flipHorizontal = false; }
        var _b = imageTensor.shape, height = _b[0], width = _b[1];
        var targetAspect = targetW / targetH;
        var aspect = width / height;
        var resizeW;
        var resizeH;
        var padL;
        var padR;
        var padT;
        var padB;
        if (aspect > targetAspect) {
            resizeW = targetW;
            resizeH = Math.ceil(resizeW / aspect);
            var padHeight = targetH - resizeH;
            padL = 0;
            padR = 0;
            padT = Math.floor(padHeight / 2);
            padB = targetH - (resizeH + padT);
        }
        else {
            resizeH = targetH;
            resizeW = Math.ceil(targetH * aspect);
            var padWidth = targetW - resizeW;
            padL = Math.floor(padWidth / 2);
            padR = targetW - (resizeW + padL);
            padT = 0;
            padB = 0;
        }
        var resizedAndPadded = tf.tidy(function () {
            var resized;
            if (flipHorizontal) {
                resized = imageTensor.reverse(1).resizeBilinear([resizeH, resizeW]);
            }
            else {
                resized = imageTensor.resizeBilinear([resizeH, resizeW]);
            }
            var padded = tf.pad3d(resized, [[padT, padB], [padL, padR], [0, 0]]);
            return padded;
        });
        return { resizedAndPadded: resizedAndPadded, paddedBy: [[padT, padB], [padL, padR]] };
    }
    function scaleAndCropToInputTensorShape(tensor, _a, _b, _c) {
        var inputTensorHeight = _a[0], inputTensorWidth = _a[1];
        var resizedAndPaddedHeight = _b[0], resizedAndPaddedWidth = _b[1];
        var _d = _c[0], padT = _d[0], padB = _d[1], _e = _c[1], padL = _e[0], padR = _e[1];
        return tf.tidy(function () {
            var inResizedAndPaddedSize = tensor.resizeBilinear([resizedAndPaddedHeight, resizedAndPaddedWidth], true);
            return removePaddingAndResizeBack(inResizedAndPaddedSize, [inputTensorHeight, inputTensorWidth], [[padT, padB], [padL, padR]]);
        });
    }
    function removePaddingAndResizeBack(resizedAndPadded, _a, _b) {
        var originalHeight = _a[0], originalWidth = _a[1];
        var _c = _b[0], padT = _c[0], padB = _c[1], _d = _b[1], padL = _d[0], padR = _d[1];
        var _e = resizedAndPadded.shape, height = _e[0], width = _e[1];
        var cropH = height - (padT + padB);
        var cropW = width - (padL + padR);
        return tf.tidy(function () {
            var withPaddingRemoved = tf.slice3d(resizedAndPadded, [padT, padL, 0], [cropH, cropW, resizedAndPadded.shape[2]]);
            var atOriginalSize = withPaddingRemoved.resizeBilinear([originalHeight, originalWidth], true);
            return atOriginalSize;
        });
    }

    var _this = undefined;
    var segmentationModelImageDimensions = [353, 257];
    var BodyPix = (function () {
        function BodyPix(mobileNet) {
            this.mobileNet = mobileNet;
        }
        BodyPix.prototype.predictForSegmentation = function (input, outputStride) {
            var _this = this;
            if (outputStride === void 0) { outputStride = 16; }
            assertValidOutputStride(outputStride);
            return tf.tidy(function () {
                var mobileNetOutput = _this.mobileNet.predict(input, outputStride);
                return _this.mobileNet.convToOutput(mobileNetOutput, 'segment_2')
                    .sigmoid();
            });
        };
        BodyPix.prototype.predictForPartMap = function (input, outputStride) {
            var _this = this;
            if (outputStride === void 0) { outputStride = 16; }
            assertValidOutputStride(outputStride);
            return tf.tidy(function () {
                var mobileNetOutput = _this.mobileNet.predict(input, outputStride);
                var segments = _this.mobileNet.convToOutput(mobileNetOutput, 'segment_2');
                var partHeatmaps = _this.mobileNet.convToOutput(mobileNetOutput, 'part_heatmap_2');
                return {
                    segmentScores: segments.sigmoid(),
                    partHeatmapScores: partHeatmaps.sigmoid()
                };
            });
        };
        BodyPix.prototype.estimatePersonSegmentationActivation = function (input, outputStride, segmentationThreshold) {
            var _this = this;
            if (outputStride === void 0) { outputStride = 16; }
            if (segmentationThreshold === void 0) { segmentationThreshold = 0.5; }
            assertValidOutputStride(outputStride);
            return tf.tidy(function () {
                var imageTensor = toInputTensor(input);
                var _a = resizeAndPadTo(imageTensor, segmentationModelImageDimensions), resizedAndPadded = _a.resizedAndPadded, paddedBy = _a.paddedBy;
                var segmentScores = _this.predictForSegmentation(resizedAndPadded, outputStride);
                var _b = resizedAndPadded.shape, resizedHeight = _b[0], resizedWidth = _b[1];
                var _c = imageTensor.shape, height = _c[0], width = _c[1];
                var scaledSegmentScores = scaleAndCropToInputTensorShape(segmentScores, [height, width], [resizedHeight, resizedWidth], paddedBy);
                return toMask(scaledSegmentScores.squeeze(), segmentationThreshold);
            });
        };
        BodyPix.prototype.estimatePersonSegmentation = function (input, outputStride, segmentationThreshold) {
            if (outputStride === void 0) { outputStride = 16; }
            if (segmentationThreshold === void 0) { segmentationThreshold = 0.5; }
            return __awaiter(this, void 0, void 0, function () {
                var segmentation, _a, height, width, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            segmentation = this.estimatePersonSegmentationActivation(input, outputStride, segmentationThreshold);
                            _a = segmentation.shape, height = _a[0], width = _a[1];
                            return [4, segmentation.data()];
                        case 1:
                            result = _b.sent();
                            segmentation.dispose();
                            return [2, { height: height, width: width, data: result }];
                    }
                });
            });
        };
        BodyPix.prototype.estimatePartSegmentationActivation = function (input, outputStride, segmentationThreshold) {
            var _this = this;
            if (outputStride === void 0) { outputStride = 16; }
            if (segmentationThreshold === void 0) { segmentationThreshold = 0.5; }
            assertValidOutputStride(outputStride);
            return tf.tidy(function () {
                var imageTensor = toInputTensor(input);
                var _a = resizeAndPadTo(imageTensor, segmentationModelImageDimensions), resizedAndPadded = _a.resizedAndPadded, paddedBy = _a.paddedBy;
                var _b = _this.predictForPartMap(resizedAndPadded, outputStride), segmentScores = _b.segmentScores, partHeatmapScores = _b.partHeatmapScores;
                var _c = resizedAndPadded.shape, resizedHeight = _c[0], resizedWidth = _c[1];
                var _d = imageTensor.shape, height = _d[0], width = _d[1];
                var scaledSegmentScores = scaleAndCropToInputTensorShape(segmentScores, [height, width], [resizedHeight, resizedWidth], paddedBy);
                var scaledPartHeatmapScore = scaleAndCropToInputTensorShape(partHeatmapScores, [height, width], [resizedHeight, resizedWidth], paddedBy);
                var segmentationMask = toMask(scaledSegmentScores.squeeze(), segmentationThreshold);
                return decodePartSegmentation(segmentationMask, scaledPartHeatmapScore);
            });
        };
        BodyPix.prototype.estimatePartSegmentation = function (input, outputStride, segmentationThreshold) {
            if (outputStride === void 0) { outputStride = 16; }
            if (segmentationThreshold === void 0) { segmentationThreshold = 0.5; }
            return __awaiter(this, void 0, void 0, function () {
                var partSegmentation, _a, height, width, data;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            partSegmentation = this.estimatePartSegmentationActivation(input, outputStride, segmentationThreshold);
                            _a = partSegmentation.shape, height = _a[0], width = _a[1];
                            return [4, partSegmentation.data()];
                        case 1:
                            data = _b.sent();
                            partSegmentation.dispose();
                            return [2, { height: height, width: width, data: data }];
                    }
                });
            });
        };
        BodyPix.prototype.dispose = function () {
            this.mobileNet.dispose();
        };
        return BodyPix;
    }());
    function load(multiplier) {
        if (multiplier === void 0) { multiplier = 0.75; }
        return __awaiter(this, void 0, void 0, function () {
            var possibleMultipliers, mobileNet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (tf == null) {
                            throw new Error("Cannot find TensorFlow.js. If you are using a <script> tag, please " +
                                "also include @tensorflow/tfjs on the page before using this model.");
                        }
                        possibleMultipliers = Object.keys(checkpoints);
                        tf.util.assert(typeof multiplier === 'number', function () { return "got multiplier type of " + typeof multiplier + " when it should be a " +
                            "number."; });
                        tf.util.assert(possibleMultipliers.indexOf(multiplier.toString()) >= 0, function () { return "invalid multiplier value of " + multiplier +
                            ".  No checkpoint exists for that " +
                            ("multiplier. Must be one of " + possibleMultipliers.join(',') + "."); });
                        return [4, mobilenetLoader.load(multiplier)];
                    case 1:
                        mobileNet = _a.sent();
                        return [2, new BodyPix(mobileNet)];
                }
            });
        });
    }
    var mobilenetLoader = {
        load: function (multiplier) { return __awaiter(_this, void 0, void 0, function () {
            var checkpoint, baseUrl, model, weights;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        checkpoint = checkpoints[multiplier];
                        baseUrl = checkpoint.url;
                        return [4, tfconv.loadGraphModel(baseUrl + "model.json")];
                    case 1:
                        model = _a.sent();
                        weights = new ModelWeights(model);
                        return [2, new MobileNet(weights, checkpoint.architecture)];
                }
            });
        }); }
    };

    function cpuBlur(canvas, image, blur) {
        var ctx = canvas.getContext('2d');
        var sum = 0;
        var delta = 5;
        var alphaLeft = 1 / (2 * Math.PI * delta * delta);
        var step = blur < 3 ? 1 : 2;
        for (var y = -blur; y <= blur; y += step) {
            for (var x = -blur; x <= blur; x += step) {
                var weight = alphaLeft * Math.exp(-(x * x + y * y) / (2 * delta * delta));
                sum += weight;
            }
        }
        for (var y = -blur; y <= blur; y += step) {
            for (var x = -blur; x <= blur; x += step) {
                ctx.globalAlpha = alphaLeft *
                    Math.exp(-(x * x + y * y) / (2 * delta * delta)) / sum * blur;
                ctx.drawImage(image, x, y);
            }
        }
        ctx.globalAlpha = 1;
    }

    var offScreenCanvases = {};
    function isSafari() {
        return (/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
    }
    function assertSameDimensions(_a, _b, nameA, nameB) {
        var widthA = _a.width, heightA = _a.height;
        var widthB = _b.width, heightB = _b.height;
        if (widthA !== widthB || heightA !== heightB) {
            throw new Error("error: dimensions must match. " + nameA + " has dimensions " + widthA + "x" + heightA + ", " + nameB + " has dimensions " + widthB + "x" + heightB);
        }
    }
    function flipCanvasHorizontal(canvas) {
        var ctx = canvas.getContext('2d');
        ctx.scale(-1, 1);
        ctx.translate(-canvas.width, 0);
    }
    function drawWithCompositing(ctx, image, compositOperation) {
        ctx.globalCompositeOperation = compositOperation;
        ctx.drawImage(image, 0, 0);
    }
    function createOffScreenCanvas() {
        var offScreenCanvas = document.createElement('canvas');
        return offScreenCanvas;
    }
    function ensureOffscreenCanvasCreated(id) {
        if (!offScreenCanvases[id]) {
            offScreenCanvases[id] = createOffScreenCanvas();
        }
        return offScreenCanvases[id];
    }
    function drawAndBlurImageOnCanvas(image, blurAmount, canvas) {
        var height = image.height, width = image.width;
        var ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        ctx.clearRect(0, 0, width, height);
        ctx.save();
        if (isSafari()) {
            cpuBlur(canvas, image, blurAmount);
        }
        else {
            ctx.filter = "blur(" + blurAmount + "px)";
            ctx.drawImage(image, 0, 0, width, height);
        }
        ctx.restore();
    }
    function drawAndBlurImageOnOffScreenCanvas(image, blurAmount, offscreenCanvasName) {
        var canvas = ensureOffscreenCanvasCreated(offscreenCanvasName);
        if (blurAmount === 0) {
            renderImageToCanvas(image, canvas);
        }
        else {
            drawAndBlurImageOnCanvas(image, blurAmount, canvas);
        }
        return canvas;
    }
    function renderImageToCanvas(image, canvas) {
        var width = image.width, height = image.height;
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, width, height);
    }
    function renderImageDataToCanvas(image, canvas) {
        canvas.width = image.width;
        canvas.height = image.height;
        var ctx = canvas.getContext('2d');
        ctx.putImageData(image, 0, 0);
    }
    function renderImageDataToOffScreenCanvas(image, canvasName) {
        var canvas = ensureOffscreenCanvasCreated(canvasName);
        renderImageDataToCanvas(image, canvas);
        return canvas;
    }
    function toMaskImageData(segmentation, maskBackground) {
        if (maskBackground === void 0) { maskBackground = true; }
        var width = segmentation.width, height = segmentation.height, data = segmentation.data;
        var bytes = new Uint8ClampedArray(width * height * 4);
        for (var i = 0; i < height * width; ++i) {
            var shouldMask = maskBackground ? 1 - data[i] : data[i];
            var alpha = shouldMask * 255;
            var j = i * 4;
            bytes[j + 0] = 0;
            bytes[j + 1] = 0;
            bytes[j + 2] = 0;
            bytes[j + 3] = Math.round(alpha);
        }
        return new ImageData(bytes, width, height);
    }
    function toColoredPartImageData(partSegmentation, partColors) {
        var width = partSegmentation.width, height = partSegmentation.height, data = partSegmentation.data;
        var bytes = new Uint8ClampedArray(width * height * 4);
        for (var i = 0; i < height * width; ++i) {
            var partId = Math.round(data[i]);
            var j = i * 4;
            if (partId === -1) {
                bytes[j + 0] = 255;
                bytes[j + 1] = 255;
                bytes[j + 2] = 255;
                bytes[j + 3] = 255;
            }
            else {
                var color = partColors[partId];
                if (!color) {
                    throw new Error("No color could be found for part id " + partId);
                }
                bytes[j + 0] = color[0];
                bytes[j + 1] = color[1];
                bytes[j + 2] = color[2];
                bytes[j + 3] = 255;
            }
        }
        return new ImageData(bytes, width, height);
    }
    var CANVAS_NAMES = {
        blurred: 'blurred',
        blurredMask: 'blurred-mask',
        mask: 'mask',
        lowresPartMask: 'lowres-part-mask',
    };
    function drawMask(canvas, image, maskImage, maskOpacity, maskBlurAmount, flipHorizontal) {
        if (maskOpacity === void 0) { maskOpacity = 0.7; }
        if (maskBlurAmount === void 0) { maskBlurAmount = 0; }
        if (flipHorizontal === void 0) { flipHorizontal = false; }
        assertSameDimensions(image, maskImage, 'image', 'mask');
        var mask = renderImageDataToOffScreenCanvas(maskImage, CANVAS_NAMES.mask);
        var blurredMask = drawAndBlurImageOnOffScreenCanvas(mask, maskBlurAmount, CANVAS_NAMES.blurredMask);
        canvas.width = blurredMask.width;
        canvas.height = blurredMask.height;
        var ctx = canvas.getContext('2d');
        ctx.save();
        if (flipHorizontal) {
            flipCanvasHorizontal(canvas);
        }
        ctx.drawImage(image, 0, 0);
        ctx.globalAlpha = maskOpacity;
        ctx.drawImage(blurredMask, 0, 0);
        ctx.restore();
    }
    function drawPixelatedMask(canvas, image, maskImage, maskOpacity, maskBlurAmount, flipHorizontal, pixelCellWidth) {
        if (maskOpacity === void 0) { maskOpacity = 0.7; }
        if (maskBlurAmount === void 0) { maskBlurAmount = 0; }
        if (flipHorizontal === void 0) { flipHorizontal = false; }
        if (pixelCellWidth === void 0) { pixelCellWidth = 10.0; }
        assertSameDimensions(image, maskImage, 'image', 'mask');
        var mask = renderImageDataToOffScreenCanvas(maskImage, CANVAS_NAMES.mask);
        var blurredMask = drawAndBlurImageOnOffScreenCanvas(mask, maskBlurAmount, CANVAS_NAMES.blurredMask);
        canvas.width = blurredMask.width;
        canvas.height = blurredMask.height;
        var ctx = canvas.getContext('2d');
        ctx.save();
        if (flipHorizontal) {
            flipCanvasHorizontal(canvas);
        }
        var offscreenCanvas = ensureOffscreenCanvasCreated(CANVAS_NAMES.lowresPartMask);
        var offscreenCanvasCtx = offscreenCanvas.getContext('2d');
        offscreenCanvas.width = blurredMask.width * (1.0 / pixelCellWidth);
        offscreenCanvas.height = blurredMask.height * (1.0 / pixelCellWidth);
        offscreenCanvasCtx.drawImage(blurredMask, 0, 0, blurredMask.width, blurredMask.height, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(offscreenCanvas, 0, 0, offscreenCanvas.width, offscreenCanvas.height, 0, 0, canvas.width, canvas.height);
        for (var i = 0; i < offscreenCanvas.width; i++) {
            ctx.beginPath();
            ctx.strokeStyle = '#ffffff';
            ctx.moveTo(pixelCellWidth * i, 0);
            ctx.lineTo(pixelCellWidth * i, canvas.height);
            ctx.stroke();
        }
        for (var i = 0; i < offscreenCanvas.height; i++) {
            ctx.beginPath();
            ctx.strokeStyle = '#ffffff';
            ctx.moveTo(0, pixelCellWidth * i);
            ctx.lineTo(canvas.width, pixelCellWidth * i);
            ctx.stroke();
        }
        ctx.globalAlpha = 1.0 - maskOpacity;
        ctx.drawImage(image, 0, 0);
        ctx.restore();
    }
    function createPersonMask(segmentation, edgeBlurAmount) {
        var maskBackground = false;
        var backgroundMaskImage = toMaskImageData(segmentation, maskBackground);
        var backgroundMask = renderImageDataToOffScreenCanvas(backgroundMaskImage, CANVAS_NAMES.mask);
        if (edgeBlurAmount === 0) {
            return backgroundMask;
        }
        else {
            return drawAndBlurImageOnOffScreenCanvas(backgroundMask, edgeBlurAmount, CANVAS_NAMES.blurredMask);
        }
    }
    function drawBokehEffect(canvas, image, personSegmentation, backgroundBlurAmount, edgeBlurAmount, flipHorizontal) {
        if (backgroundBlurAmount === void 0) { backgroundBlurAmount = 3; }
        if (edgeBlurAmount === void 0) { edgeBlurAmount = 3; }
        if (flipHorizontal === void 0) { flipHorizontal = false; }
        assertSameDimensions(image, personSegmentation, 'image', 'segmentation');
        var blurredImage = drawAndBlurImageOnOffScreenCanvas(image, backgroundBlurAmount, CANVAS_NAMES.blurred);
        var personMask = createPersonMask(personSegmentation, edgeBlurAmount);
        var ctx = canvas.getContext('2d');
        ctx.save();
        if (flipHorizontal) {
            flipCanvasHorizontal(canvas);
        }
        ctx.drawImage(image, 0, 0);
        drawWithCompositing(ctx, personMask, 'destination-in');
        drawWithCompositing(ctx, blurredImage, 'destination-over');
        ctx.restore();
    }

    var partChannels = [
        'leftFace', 'rightFace', 'rightUpperLegFront',
        'rightLowerLegBack', 'rightUpperLegBack', 'leftLowerLegFront',
        'leftUpperLegFront', 'leftUpperLegBack', 'leftLowerLegBack',
        'rightFeet', 'rightLowerLegFront', 'leftFeet',
        'torsoFront', 'torsoBack', 'rightUpperArmFront',
        'rightUpperArmBack', 'rightLowerArmBack', 'leftLowerArmFront',
        'leftUpperArmFront', 'leftUpperArmBack', 'leftLowerArmBack',
        'rightHand', 'rightLowerArmFront', 'leftHand'
    ];

    exports.BodyPix = BodyPix;
    exports.load = load;
    exports.checkpoints = checkpoints;
    exports.decodePartSegmentation = decodePartSegmentation;
    exports.toMask = toMask;
    exports.drawBokehEffect = drawBokehEffect;
    exports.drawMask = drawMask;
    exports.drawPixelatedMask = drawPixelatedMask;
    exports.toColoredPartImageData = toColoredPartImageData;
    exports.toMaskImageData = toMaskImageData;
    exports.partChannels = partChannels;
    exports.resizeAndPadTo = resizeAndPadTo;
    exports.scaleAndCropToInputTensorShape = scaleAndCropToInputTensorShape;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
