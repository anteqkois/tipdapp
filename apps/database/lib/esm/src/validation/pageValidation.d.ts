import { z } from '../config/zod';
export declare const update: z.ZodObject<{
    affixUrl: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    tokenAddresses: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    description?: string | undefined;
    affixUrl?: string | undefined;
    tokenAddresses: string[];
}, {
    description?: string | undefined;
    affixUrl?: string | undefined;
    tokenAddresses: string[];
}>;
export declare namespace PageValidation {
    type Update = z.infer<typeof update>;
}
export declare const pageValidation: {
    updateParse: (data: PageValidation.Update) => {
        description?: string | undefined;
        affixUrl?: string | undefined;
        tokenAddresses: string[];
    };
};
