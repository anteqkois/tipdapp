import { Tipper } from '@prisma/client';
import { Request, Response } from 'express';
import { z } from '../config/zod';
export declare namespace TipperApi {
    namespace Find {
        const reqShape: {
            query: z.ZodObject<{
                nick: z.ZodOptional<z.ZodString>;
                address: z.ZodOptional<z.ZodString>;
                include: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"tips">, z.ZodLiteral<"_count">]>, "many">, Record<"_count" | "tips", boolean>, ("_count" | "tips")[]>>;
            }, "strip", z.ZodTypeAny, {
                include?: Record<"_count" | "tips", boolean> | undefined;
                address?: string | undefined;
                nick?: string | undefined;
            }, {
                include?: ("_count" | "tips")[] | undefined;
                address?: string | undefined;
                nick?: string | undefined;
            }>;
        };
        export type Query = z.input<typeof reqShape.query>;
        export type Req = Request<{}, {}, {}, Query>;
        export type Res = Response<{
            tipper: Tipper;
        }>;
        export {};
    }
    namespace Create {
        const reqShape: {
            body: z.ZodObject<{
                address: z.ZodString;
                nick: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                nick?: string | undefined;
                address: string;
            }, {
                nick?: string | undefined;
                address: string;
            }>;
        };
        export type Body = z.input<typeof reqShape.body>;
        export type ResBody = {
            tipper: Tipper;
        };
        export type Req = Request<{}, {}, Body, {}>;
        export type Res = Response<ResBody>;
        export {};
    }
}
export declare const tipperApi: {
    find: z.ZodObject<{
        query: z.ZodObject<{
            nick: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodString>;
            include: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"tips">, z.ZodLiteral<"_count">]>, "many">, Record<"_count" | "tips", boolean>, ("_count" | "tips")[]>>;
        }, "strip", z.ZodTypeAny, {
            include?: Record<"_count" | "tips", boolean> | undefined;
            address?: string | undefined;
            nick?: string | undefined;
        }, {
            include?: ("_count" | "tips")[] | undefined;
            address?: string | undefined;
            nick?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        query: {
            include?: Record<"_count" | "tips", boolean> | undefined;
            address?: string | undefined;
            nick?: string | undefined;
        };
    }, {
        query: {
            include?: ("_count" | "tips")[] | undefined;
            address?: string | undefined;
            nick?: string | undefined;
        };
    }>;
    create: z.ZodObject<{
        body: z.ZodObject<{
            address: z.ZodString;
            nick: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            nick?: string | undefined;
            address: string;
        }, {
            nick?: string | undefined;
            address: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        body: {
            nick?: string | undefined;
            address: string;
        };
    }, {
        body: {
            nick?: string | undefined;
            address: string;
        };
    }>;
};
