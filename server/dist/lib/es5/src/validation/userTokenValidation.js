"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTokenValidation = void 0;
var zod_1 = require("../config/zod");
var createForm = zod_1.z.object({
    symbol: zod_1.z
        .string()
        .min(2, { message: 'Token symbol must have 2 or more characters.' })
        .max(20, { message: 'Token symbol can be up to 10 characters long.' }),
    name: zod_1.z
        .string()
        .min(1, { message: 'Token name must have 2 or more characters.' })
        .max(20, { message: 'Token name can be up to 20 characters long.' }),
});
var create = createForm.extend({
    address: zod_1.z.string().length(42, { message: 'Wrong token address' }),
    userAddress: zod_1.z.string().length(42, { message: 'Wrong wallet address' }),
    chainId: zod_1.z.number({ required_error: 'ChainId is required' }),
    txHash: zod_1.z.string().length(66, { message: 'Wrong transaction hash' }),
});
var userTokenFormParse = function (data) {
    return (0, zod_1.validationHelper)(data, createForm);
};
var userTokenParse = function (data) {
    return (0, zod_1.validationHelper)(data, create);
};
exports.userTokenValidation = {
    create: create,
    createForm: createForm,
};
