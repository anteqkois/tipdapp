"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var tipUI = _1.Prisma.validator()({
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
