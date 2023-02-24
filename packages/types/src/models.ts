import {
  Page,
  Prisma,
  Role,
  Streamer,
  Tip,
  Tipper,
  Token,
  User,
  UserToken as UserTokenDB,
} from '@tipdapp/prisma/types';
import { Address, Hash } from './crypto';
import { ModifyObjectKey, PartialExcept } from './utils';

const user = Prisma.validator<Prisma.UserArgs>()({
  include: {
    avatar: true,
    userToken: true,
    streamer: {
      include: {
        page: true,
      },
    },
  },
});

type UserSession = ModifyObjectKey<
  PartialExcept<Prisma.UserGetPayload<typeof user>, [Role, 'userToken']>,
  { address: Address; userToken: UserToken; streamer: NestedStreamer }
>;

type UserToken = ModifyObjectKey<
  UserTokenDB,
  { address: Address; txHash: Hash }
>;

type ValueOf<T> = T[keyof T];
type PickByValue<T, V extends T[keyof T]> = {
  [K in Exclude<
    keyof T,
    ValueOf<{ [P in keyof T]: T[P] extends V ? never : P }>
  >]: T[K];
};
type KeyOfValue<T, V extends T[keyof T]> = keyof PickByValue<T, V>;
type PickValueByKey<T, K> = K extends keyof T ? T[K] : never;

interface ModelMap {
  User: User;
  UserToken: UserToken;
  Page: Page;
  Streamer: Streamer;
  Tipper: Tipper;
  Tip: Tip;
  Token: Token;
}
interface SelectMap {
  User: Prisma.UserSelect;
  UserToken: Prisma.UserTokenSelect;
  Page: Prisma.PageSelect;
  Streamer: Prisma.StreamerSelect;
  Tipper: Prisma.TipperSelect;
  Tip: Prisma.TipSelect;
  Token: Prisma.TokenSelect;
}
interface PayloadMap<S extends string | number | symbol> {
  User: Prisma.UserGetPayload<{ select: { [K in S]: true } }>;
  UserToken: Prisma.UserTokenGetPayload<{ select: { [K in S]: true } }>;
  Page: Prisma.PageGetPayload<{ select: { [K in S]: true } }>;
  Streamer: Prisma.StreamerGetPayload<{ select: { [K in S]: true } }>;
  Tipper: Prisma.TipperGetPayload<{ select: { [K in S]: true } }>;
  Tip: Prisma.TipGetPayload<{ select: { [K in S]: true } }>;
  Token: Prisma.TokenGetPayload<{ select: { [K in S]: true } }>;
}
type FullModelType<
  M extends ValueOf<ModelMap>,
  N = KeyOfValue<ModelMap, M>,
  S = Required<PickValueByKey<SelectMap, N>>
> = PickValueByKey<PayloadMap<keyof S>, N>;

type NestedUser = FullModelType<User>;
type NestedUserToken = FullModelType<UserToken>;
type NestedPage = FullModelType<Page>;
type NestedStreamer = FullModelType<Streamer>;
type NestedTipper = FullModelType<Tipper>;
type NestedTip = FullModelType<Tip>;
type NestedToken = FullModelType<Token>;

const tipUI = Prisma.validator<Prisma.TipArgs>()({
  include: {
    token: {
      select: {
        name: true,
        symbol: true,
        address: true,
      },
    },
    tipper: {
      select: {
        nick: true,
      },
    },
  },
});

type TipUI = Prisma.TipGetPayload<typeof tipUI>;

export type {
  UserSession,
  NestedUser,
  NestedUserToken,
  NestedPage,
  NestedStreamer,
  NestedTipper,
  NestedTip,
  NestedToken,
  TipUI,
  UserToken,
};
