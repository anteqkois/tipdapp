"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationHelper = void 0;
var zod_1 = require("zod");
__exportStar(require("zod"), exports);
var validationHelper = function (data, validation) {
    var errors = {};
    try {
        validation.parse(data);
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            error.issues.forEach(function (zodError) {
                errors[zodError.path[0]] = zodError.message;
            });
        }
        else {
            console.log(error);
        }
    }
    return errors;
};
exports.validationHelper = validationHelper;
