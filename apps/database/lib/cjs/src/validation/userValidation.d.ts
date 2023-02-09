import { Role, User } from '@prisma/client';
import { z } from '../config/zod';
declare const createStreamer: z.ZodObject<{
    nick: z.ZodString;
    email: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    roles: z.ZodTuple<[z.ZodLiteral<"streamer">], null>;
}, "strip", z.ZodTypeAny, {
    nick: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: ["streamer"];
}, {
    nick: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: ["streamer"];
}>;
export declare namespace UserValidation {
    type CreateStreamer = z.infer<typeof createStreamer>;
    type CreateUser = Omit<CreateStreamer, 'roles'> & {
        roles: Role[];
    };
}
export declare const userValidation: {
    createParse: (body: UserValidation.CreateUser) => {
        nick: string;
        email: string;
        firstName: string;
        lastName: string;
        roles: ["streamer"];
    };
    type: (body: Pick<User, 'roles'>) => "streamer" | undefined;
};
export {};
