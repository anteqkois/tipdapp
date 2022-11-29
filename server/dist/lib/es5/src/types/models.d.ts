import { Prisma, Streamer, Tipper, User } from '.';
export {};
export type UserSession = (User & {
    streamer: Streamer | null;
}) | (User & {
    tipper: Tipper | null;
});
export type DecodedUser = {
    address: string;
    nick: string;
    roles: string[];
};
declare const tipUI: {
    include: {
        token: {
            select: {
                name: true;
                symbol: true;
            };
        };
        tipper: {
            select: {
                nick: true;
            };
        };
    };
};
export type TipUI = Prisma.TipGetPayload<typeof tipUI>;
