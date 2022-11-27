import { z } from '../config/zod';
declare const createStreamer: z.ZodObject<z.extendShape<{
    email: z.ZodString;
    nick: z.ZodString;
}, {
    firstName: z.ZodString;
    lastName: z.ZodString;
    role: z.ZodLiteral<"streamer">;
}>, "strip", z.ZodTypeAny, {
    nick?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    role?: "streamer";
}, {
    nick?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    role?: "streamer";
}>;
declare const createTipper: z.ZodObject<z.extendShape<{
    email: z.ZodString;
    nick: z.ZodString;
}, {
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    role: z.ZodLiteral<"tipper">;
}>, "strip", z.ZodTypeAny, {
    nick?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    role?: "tipper";
}, {
    nick?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    role?: "tipper";
}>;
export declare namespace UserValidation {
    type CreateStreamer = z.infer<typeof createStreamer>;
    type CreateTipper = z.infer<typeof createTipper>;
    type CreateUser = CreateStreamer | CreateTipper;
}
export declare const userValidation: {
    createTipper: z.ZodObject<z.extendShape<{
        email: z.ZodString;
        nick: z.ZodString;
    }, {
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
        role: z.ZodLiteral<"tipper">;
    }>, "strip", z.ZodTypeAny, {
        nick?: string;
        email?: string;
        firstName?: string;
        lastName?: string;
        role?: "tipper";
    }, {
        nick?: string;
        email?: string;
        firstName?: string;
        lastName?: string;
        role?: "tipper";
    }>;
    createStreamer: z.ZodObject<z.extendShape<{
        email: z.ZodString;
        nick: z.ZodString;
    }, {
        firstName: z.ZodString;
        lastName: z.ZodString;
        role: z.ZodLiteral<"streamer">;
    }>, "strip", z.ZodTypeAny, {
        nick?: string;
        email?: string;
        firstName?: string;
        lastName?: string;
        role?: "streamer";
    }, {
        nick?: string;
        email?: string;
        firstName?: string;
        lastName?: string;
        role?: "streamer";
    }>;
    createHelper: (body: UserValidation.CreateUser) => {
        nick?: string;
        email?: string;
        firstName?: string;
        lastName?: string;
        role?: "streamer";
    } | {
        nick?: string;
        email?: string;
        firstName?: string;
        lastName?: string;
        role?: "tipper";
    };
};
export {};
