import { z } from '../config/zod';
declare const createForm: z.ZodObject<{
    symbol: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    symbol: string;
    name: string;
}, {
    symbol: string;
    name: string;
}>;
declare const create: z.ZodObject<z.extendShape<{
    symbol: z.ZodString;
    name: z.ZodString;
}, {
    address: z.ZodString;
    userAddress: z.ZodString;
    chainId: z.ZodNumber;
    txHash: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    symbol: string;
    address: string;
    name: string;
    chainId: number;
    txHash: string;
    userAddress: string;
}, {
    symbol: string;
    address: string;
    name: string;
    chainId: number;
    txHash: string;
    userAddress: string;
}>;
export declare namespace UserTokenValidation {
    type CreateForm = z.infer<typeof createForm>;
    type Create = z.infer<typeof create>;
}
export declare const userTokenValidation: {
    create: z.ZodObject<z.extendShape<{
        symbol: z.ZodString;
        name: z.ZodString;
    }, {
        address: z.ZodString;
        userAddress: z.ZodString;
        chainId: z.ZodNumber;
        txHash: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        symbol: string;
        address: string;
        name: string;
        chainId: number;
        txHash: string;
        userAddress: string;
    }, {
        symbol: string;
        address: string;
        name: string;
        chainId: number;
        txHash: string;
        userAddress: string;
    }>;
    createForm: z.ZodObject<{
        symbol: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        name: string;
    }, {
        symbol: string;
        name: string;
    }>;
};
export {};
