import { z } from '../config/zod';
import { Role } from '../types';
var createUser = z.object({
    email: z.string().email(),
    nick: z.string().min(2, { message: 'Nick must have 2 or more characters.' }),
});
var createStreamer = createUser.merge(z.object({
    firstName: z
        .string()
        .min(3, { message: 'First name must have 3 or more characters.' }),
    lastName: z
        .string()
        .min(3, { message: 'Last name must have 3 or more characters.' }),
    role: z.literal(Role.streamer),
}));
var createTipper = createUser.merge(z.object({
    firstName: z
        .string()
        .min(3, { message: 'First name must have 3 or more characters.' })
        .optional(),
    lastName: z
        .string()
        .min(3, { message: 'Last name must have 3 or more characters.' })
        .optional(),
    role: z.literal(Role.tipper),
}));
var createHelper = function (body) {
    if (body.role === 'streamer') {
        return createStreamer.parse(body);
    }
    else {
        return createTipper.parse(body);
    }
};
export var userValidation = {
    createTipper: createTipper,
    createStreamer: createStreamer,
    createHelper: createHelper,
};
