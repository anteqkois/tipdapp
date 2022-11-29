import { Prisma } from '.';
var tipUI = Prisma.validator()({
    include: {
        token: {
            select: {
                name: true,
                symbol: true,
            },
        },
        tipper: {
            select: {
                nick: true,
            },
        },
    },
});
