"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPageValidation = void 0;
var zod_1 = require("../config/zod");
var create = zod_1.z.object({
    url: zod_1.z
        .string()
        .min(3, { message: 'Url page must have 3 or more characters.' })
        .max(30, { message: 'Url can be up to 20 characters long.' }),
    description: zod_1.z
        .string()
        .min(20, { message: 'Description page must have 20 or more characters.' })
        .max(200, { message: 'Url can be up to 200 characters long.' }),
});
var userPageFormParse = function (data) {
    return (0, zod_1.validationHelper)(data, create);
};
exports.userPageValidation = {
    create: create,
};
