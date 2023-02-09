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
declare const create: z.ZodObject<{
    symbol: z.ZodString;
    name: z.ZodString;
    address: z.ZodString;
    userAddress: z.ZodString;
    chainId: z.ZodNumber;
    txHash: z.ZodString;
}, "strip", z.ZodTypeAny, {
    symbol: string;
    name: string;
    address: string;
    txHash: string;
    userAddress: string;
    chainId: number;
}, {
    symbol: string;
    name: string;
    address: string;
    txHash: string;
    userAddress: string;
    chainId: number;
}>;
export declare namespace UserTokenValidation {
    type CreateForm = z.infer<typeof createForm>;
    type Create = z.infer<typeof create>;
}
export declare const userTokenValidation: {
    createParse: (data: UserTokenValidation.Create) => {
        symbol: string;
        name: string;
        address: string;
        txHash: string;
        userAddress: string;
        chainId: number;
    };
    createFormParse: (data: UserTokenValidation.CreateForm) => {
        symbol: string;
        name: string;
    };
};
export {};
