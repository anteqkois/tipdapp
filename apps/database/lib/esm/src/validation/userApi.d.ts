import { Request, Response } from 'express';
import { z } from '../config/zod';
import { UserSession } from '../types';
declare const findByNick: {
    query: z.ZodObject<{
        include: z.ZodEffects<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"avatar">, z.ZodLiteral<"streamer">, z.ZodLiteral<"tips">, z.ZodLiteral<"userToken">]>, "many">, Record<"streamer" | "userToken" | "tips" | "avatar", boolean>, ("streamer" | "userToken" | "tips" | "avatar")[]>;
    }, "strip", z.ZodTypeAny, {
        include: Record<"streamer" | "userToken" | "tips" | "avatar", boolean>;
    }, {
        include: ("streamer" | "userToken" | "tips" | "avatar")[];
    }>;
    params: z.ZodObject<{
        nick: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        nick: string;
    }, {
        nick: string;
    }>;
};
declare const find: {
    query: z.ZodObject<{
        nick: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodString>;
        include: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"avatar">, z.ZodLiteral<"streamer">, z.ZodLiteral<"tips">, z.ZodLiteral<"userToken">]>, "many">, Record<"streamer" | "userToken" | "tips" | "avatar", boolean>, ("streamer" | "userToken" | "tips" | "avatar")[]>>;
    }, "strip", z.ZodTypeAny, {
        include?: Record<"streamer" | "userToken" | "tips" | "avatar", boolean> | undefined;
        address?: string | undefined;
        nick?: string | undefined;
    }, {
        include?: ("streamer" | "userToken" | "tips" | "avatar")[] | undefined;
        address?: string | undefined;
        nick?: string | undefined;
    }>;
};
export declare namespace UserApi {
    namespace FindByNick {
        type Query = z.input<typeof findByNick.query>;
        type Params = z.input<typeof findByNick.params>;
    }
    namespace Find {
        type Query = z.input<typeof find.query>;
    }
    namespace Validate {
        type Body = z.input<typeof find.query>;
        type ResBody = {
            message: string;
        };
        type Req = Request<{}, {}, Body, {}>;
        type Res = Response<ResBody>;
    }
    namespace Create {
        const reqShape: {
            body: z.ZodObject<{
                address: z.ZodString;
                email: z.ZodString;
                nick: z.ZodString;
                firstName: z.ZodString;
                lastName: z.ZodString;
                roles: z.ZodArray<z.ZodUnion<[z.ZodLiteral<"charity">, z.ZodLiteral<"streamer">]>, "many">;
            }, "strip", z.ZodTypeAny, {
                address: string;
                nick: string;
                email: string;
                firstName: string;
                lastName: string;
                roles: ("streamer" | "charity")[];
            }, {
                address: string;
                nick: string;
                email: string;
                firstName: string;
                lastName: string;
                roles: ("streamer" | "charity")[];
            }>;
        };
        export type Body = z.input<typeof reqShape.body>;
        export type ResBody = {
            user: UserSession;
        };
        export type Req = Request<{}, {}, Body, {}>;
        export type Res = Response<ResBody>;
        export {};
    }
}
export declare const userApi: {
    findByNick: {
        query: z.ZodObject<{
            include: z.ZodEffects<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"avatar">, z.ZodLiteral<"streamer">, z.ZodLiteral<"tips">, z.ZodLiteral<"userToken">]>, "many">, Record<"streamer" | "userToken" | "tips" | "avatar", boolean>, ("streamer" | "userToken" | "tips" | "avatar")[]>;
        }, "strip", z.ZodTypeAny, {
            include: Record<"streamer" | "userToken" | "tips" | "avatar", boolean>;
        }, {
            include: ("streamer" | "userToken" | "tips" | "avatar")[];
        }>;
        params: z.ZodObject<{
            nick: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            nick: string;
        }, {
            nick: string;
        }>;
    };
    find: {
        query: z.ZodObject<{
            nick: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodString>;
            include: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"avatar">, z.ZodLiteral<"streamer">, z.ZodLiteral<"tips">, z.ZodLiteral<"userToken">]>, "many">, Record<"streamer" | "userToken" | "tips" | "avatar", boolean>, ("streamer" | "userToken" | "tips" | "avatar")[]>>;
        }, "strip", z.ZodTypeAny, {
            include?: Record<"streamer" | "userToken" | "tips" | "avatar", boolean> | undefined;
            address?: string | undefined;
            nick?: string | undefined;
        }, {
            include?: ("streamer" | "userToken" | "tips" | "avatar")[] | undefined;
            address?: string | undefined;
            nick?: string | undefined;
        }>;
    };
    validate: z.ZodObject<{
        body: z.ZodObject<{
            email: z.ZodString;
            nick: z.ZodString;
            firstName: z.ZodString;
            lastName: z.ZodString;
            roles: z.ZodArray<z.ZodUnion<[z.ZodLiteral<"charity">, z.ZodLiteral<"streamer">]>, "many">;
        }, "strip", z.ZodTypeAny, {
            nick: string;
            email: string;
            firstName: string;
            lastName: string;
            roles: ("streamer" | "charity")[];
        }, {
            nick: string;
            email: string;
            firstName: string;
            lastName: string;
            roles: ("streamer" | "charity")[];
        }>;
    }, "strip", z.ZodTypeAny, {
        body: {
            nick: string;
            email: string;
            firstName: string;
            lastName: string;
            roles: ("streamer" | "charity")[];
        };
    }, {
        body: {
            nick: string;
            email: string;
            firstName: string;
            lastName: string;
            roles: ("streamer" | "charity")[];
        };
    }>;
    create: z.ZodObject<{
        body: z.ZodObject<{
            address: z.ZodString;
            email: z.ZodString;
            nick: z.ZodString;
            firstName: z.ZodString;
            lastName: z.ZodString;
            roles: z.ZodArray<z.ZodUnion<[z.ZodLiteral<"charity">, z.ZodLiteral<"streamer">]>, "many">;
        }, "strip", z.ZodTypeAny, {
            address: string;
            nick: string;
            email: string;
            firstName: string;
            lastName: string;
            roles: ("streamer" | "charity")[];
        }, {
            address: string;
            nick: string;
            email: string;
            firstName: string;
            lastName: string;
            roles: ("streamer" | "charity")[];
        }>;
    }, "strip", z.ZodTypeAny, {
        body: {
            address: string;
            nick: string;
            email: string;
            firstName: string;
            lastName: string;
            roles: ("streamer" | "charity")[];
        };
    }, {
        body: {
            address: string;
            nick: string;
            email: string;
            firstName: string;
            lastName: string;
            roles: ("streamer" | "charity")[];
        };
    }>;
};
export {};
