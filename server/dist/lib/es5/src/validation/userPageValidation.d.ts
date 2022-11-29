import { z } from '../config/zod';
declare const create: z.ZodObject<{
    url: z.ZodString;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    description: string;
    url: string;
}, {
    description: string;
    url: string;
}>;
export declare namespace UserPageValidation {
    type Create = z.infer<typeof create>;
}
export declare const userPageValidation: {
    create: z.ZodObject<{
        url: z.ZodString;
        description: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        description: string;
        url: string;
    }, {
        description: string;
        url: string;
    }>;
};
export {};
