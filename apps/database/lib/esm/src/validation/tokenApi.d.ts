import { Token } from '@prisma/client';
import { z } from '../config/zod';
declare const find: {
    query: z.ZodObject<{
        chainId: z.ZodOptional<z.ZodNumber>;
        symbol: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        symbol?: string | undefined;
        name?: string | undefined;
        chainId?: number | undefined;
    }, {
        symbol?: string | undefined;
        name?: string | undefined;
        chainId?: number | undefined;
    }>;
};
export declare namespace TokenApi {
    namespace Find {
        type Query = z.input<typeof find.query>;
        type Response = {
            tokens: Token[];
        };
    }
}
export declare const tokenApi: {
    find: {
        query: z.ZodObject<{
            chainId: z.ZodOptional<z.ZodNumber>;
            symbol: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            symbol?: string | undefined;
            name?: string | undefined;
            chainId?: number | undefined;
        }, {
            symbol?: string | undefined;
            name?: string | undefined;
            chainId?: number | undefined;
        }>;
    };
};
export {};
