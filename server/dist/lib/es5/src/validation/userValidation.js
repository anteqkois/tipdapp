"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
var zod_1 = require("../config/zod");
var types_1 = require("../types");
var createUser = zod_1.z.object({
    email: zod_1.z.string().email(),
    nick: zod_1.z.string().min(2, { message: 'Nick must have 2 or more characters.' }),
});
var createStreamer = createUser.merge(zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(3, { message: 'First name must have 3 or more characters.' }),
    lastName: zod_1.z
        .string()
        .min(3, { message: 'Last name must have 3 or more characters.' }),
    role: zod_1.z.literal(types_1.Role.streamer),
}));
var createTipper = createUser.merge(zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(3, { message: 'First name must have 3 or more characters.' })
        .optional(),
    lastName: zod_1.z
        .string()
        .min(3, { message: 'Last name must have 3 or more characters.' })
        .optional(),
    role: zod_1.z.literal(types_1.Role.tipper),
}));
var createHelper = function (body) {
    if (body.role === 'streamer') {
        return createStreamer.parse(body);
    }
    else {
        return createTipper.parse(body);
    }
};
exports.userValidation = {
    createTipper: createTipper,
    createStreamer: createStreamer,
    createHelper: createHelper,
};
