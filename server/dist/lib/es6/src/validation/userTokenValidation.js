import { validationHelper, z } from '../config/zod';
var createForm = z.object({
    symbol: z
        .string()
        .min(2, { message: 'Token symbol must have 2 or more characters.' })
        .max(20, { message: 'Token symbol can be up to 10 characters long.' }),
    name: z
        .string()
        .min(1, { message: 'Token name must have 2 or more characters.' })
        .max(20, { message: 'Token name can be up to 20 characters long.' }),
});
var create = createForm.extend({
    address: z.string().length(42, { message: 'Wrong token address' }),
    userAddress: z.string().length(42, { message: 'Wrong wallet address' }),
    chainId: z.number({ required_error: 'ChainId is required' }),
    txHash: z.string().length(66, { message: 'Wrong transaction hash' }),
});
var userTokenFormParse = function (data) {
    return validationHelper(data, createForm);
};
var userTokenParse = function (data) {
    return validationHelper(data, create);
};
export var userTokenValidation = {
    create: create,
    createForm: createForm,
};
