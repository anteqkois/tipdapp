import { z } from '../config/zod';
declare const findByAffixUrl: {
    params: z.ZodObject<{
        affixUrl: z.ZodString;
        role: z.ZodNativeEnum<{
            streamer: "streamer";
            charity: "charity";
            shop: "shop";
            tipper: "tipper";
        }>;
    }, "strip", z.ZodTypeAny, {
        role: "streamer" | "charity" | "shop" | "tipper";
        affixUrl: string;
    }, {
        role: "streamer" | "charity" | "shop" | "tipper";
        affixUrl: string;
    }>;
    query: z.ZodOptional<z.ZodObject<{
        include: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"baner">, z.ZodLiteral<"streamer">]>, "many">, Record<"streamer" | "baner", boolean>, ("streamer" | "baner")[]>>;
    }, "strip", z.ZodTypeAny, {
        include?: Record<"streamer" | "baner", boolean> | undefined;
    }, {
        include?: ("streamer" | "baner")[] | undefined;
    }>>;
};
declare const find: {
    query: z.ZodObject<{
        nick: z.ZodString;
        include: z.ZodEffects<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"baner">, z.ZodLiteral<"streamer">]>, "many">, Record<"streamer" | "baner", boolean>, ("streamer" | "baner")[]>;
    }, "strip", z.ZodTypeAny, {
        include: Record<"streamer" | "baner", boolean>;
        nick: string;
    }, {
        include: ("streamer" | "baner")[];
        nick: string;
    }>;
};
declare const update: {
    body: z.ZodObject<{
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
};
export declare namespace PageApi {
    namespace FindByAffixUrl {
        type Query = z.input<typeof findByAffixUrl.query>;
        type Params = z.input<typeof findByAffixUrl.params>;
    }
    namespace Find {
        type Query = z.input<typeof find.query>;
    }
    namespace Update {
        type Body = z.input<typeof update.body>;
    }
}
export declare const pageApi: {
    findByAffixUrl: {
        params: z.ZodObject<{
            affixUrl: z.ZodString;
            role: z.ZodNativeEnum<{
                streamer: "streamer";
                charity: "charity";
                shop: "shop";
                tipper: "tipper";
            }>;
        }, "strip", z.ZodTypeAny, {
            role: "streamer" | "charity" | "shop" | "tipper";
            affixUrl: string;
        }, {
            role: "streamer" | "charity" | "shop" | "tipper";
            affixUrl: string;
        }>;
        query: z.ZodOptional<z.ZodObject<{
            include: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"baner">, z.ZodLiteral<"streamer">]>, "many">, Record<"streamer" | "baner", boolean>, ("streamer" | "baner")[]>>;
        }, "strip", z.ZodTypeAny, {
            include?: Record<"streamer" | "baner", boolean> | undefined;
        }, {
            include?: ("streamer" | "baner")[] | undefined;
        }>>;
    };
    find: {
        query: z.ZodObject<{
            nick: z.ZodString;
            include: z.ZodEffects<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"baner">, z.ZodLiteral<"streamer">]>, "many">, Record<"streamer" | "baner", boolean>, ("streamer" | "baner")[]>;
        }, "strip", z.ZodTypeAny, {
            include: Record<"streamer" | "baner", boolean>;
            nick: string;
        }, {
            include: ("streamer" | "baner")[];
            nick: string;
        }>;
    };
    update: {
        body: z.ZodObject<{
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
    };
};
export {};
