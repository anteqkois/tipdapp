import {
  Page,
  Prisma,
  Role,
  Streamer,
  Tip,
  Tipper,
  Token,
  User,
  UserToken,
} from '@prisma/client';
import { PartialExcept } from '.';

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

//TODO! Create helper to cast from UserSessionExpanded to specific User
export type UserSession = PartialExcept<
  Prisma.UserGetPayload<typeof user>,
  [Role, 'userToken']
>;

export type DecodedUser = Pick<
  User,
  'address' | 'nick' | 'roles' | 'activeRole'
> & { ip: string };

export const mockDecodedUser: DecodedUser = {
  address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  nick: 'anteqkois',
  ip: '120.00.00.01',
  // roles: ['tipper'],
  roles: ['tipper', 'streamer'],
  activeRole: 'streamer',
};

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

export type NestedUser = FullModelType<User>;
export type NestedUserToken = FullModelType<UserToken>;
export type NestedPage = FullModelType<Page>;
export type NestedStreamer = FullModelType<Streamer>;
export type NestedTipper = FullModelType<Tipper>;
export type NestedTip = FullModelType<Tip>;
export type NestedToken = FullModelType<Token>;

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

export type TipUI = Prisma.TipGetPayload<typeof tipUI>;
