
/**
 * Client
**/

import * as runtime from '@prisma/client/runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model User
 * 
 */
export type User = {
  address: string
  nick: string
  email: string
  emailVerified: Date | null
  firstName: string | null
  lastName: string | null
  verified: boolean
  createdAt: Date
  updateAt: Date
  allTipsCount: number
  allTipsValue: Prisma.Decimal
  allWithdrawsValue: Prisma.Decimal
  apperanceMode: ApperanceMode
  roles: Role[]
  defaultRole: Role
  refreshTokens: string[]
  avatarId: string | null
}

/**
 * Model Streamer
 * 
 */
export type Streamer = {
  address: string
  tipsCount: number
  tipsValue: Prisma.Decimal
  pageId: string
}

/**
 * Model Tipper
 * 
 */
export type Tipper = {
  address: string
  nick: string
  tipsValue: number
}

/**
 * Model Page
 * 
 */
export type Page = {
  id: string
  affixUrl: string
  description: string | null
  banerId: string | null
}

/**
 * Model Tip
 * 
 */
export type Tip = {
  txHash: string
  amount: Prisma.Decimal
  value: Prisma.Decimal
  message: string
  displayed: boolean
  date: Date
  receivedTokensAmount: Prisma.Decimal
  userRole: Role
  userAddress: string
  userTokenAddress: string
  tokenAddress: string
  tipperAddress: string
}

/**
 * Model UserToken
 * 
 */
export type UserToken = {
  address: string
  symbol: string
  name: string
  chainId: number
  txHash: string
  userAddress: string
}

/**
 * Model Widget
 * 
 */
export type Widget = {
  id: string
  url: string
  songPath: string
  backgroundPath: string
  nickColor: string
  messageColor: string
  valueColor: string
  showTime: number
  filterProfanity: boolean
  voiceMessage: boolean
  streamerAddress: string | null
}

/**
 * Model Token
 * 
 */
export type Token = {
  address: string
  symbol: string
  name: string
  chainId: number
  imageId: string | null
  latestPrice: Prisma.Decimal | null
  priceUpdateAt: Date | null
  streamerAddress: string | null
}

/**
 * Model Withdraw
 * 
 */
export type Withdraw = {
  id: string
  amount: Prisma.Decimal
  date: Date
  txHash: string
  userAddress: string | null
}

/**
 * Model File
 * 
 */
export type File = {
  id: string
  filename: string
  extension: string
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const ApperanceMode: {
  dark: 'dark',
  light: 'light'
};

export type ApperanceMode = (typeof ApperanceMode)[keyof typeof ApperanceMode]


export const Role: {
  streamer: 'streamer',
  charity: 'charity',
  shop: 'shop',
  tipper: 'tipper'
};

export type Role = (typeof Role)[keyof typeof Role]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>;

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;

  /**
   * `prisma.streamer`: Exposes CRUD operations for the **Streamer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Streamers
    * const streamers = await prisma.streamer.findMany()
    * ```
    */
  get streamer(): Prisma.StreamerDelegate<GlobalReject>;

  /**
   * `prisma.tipper`: Exposes CRUD operations for the **Tipper** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tippers
    * const tippers = await prisma.tipper.findMany()
    * ```
    */
  get tipper(): Prisma.TipperDelegate<GlobalReject>;

  /**
   * `prisma.page`: Exposes CRUD operations for the **Page** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pages
    * const pages = await prisma.page.findMany()
    * ```
    */
  get page(): Prisma.PageDelegate<GlobalReject>;

  /**
   * `prisma.tip`: Exposes CRUD operations for the **Tip** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tips
    * const tips = await prisma.tip.findMany()
    * ```
    */
  get tip(): Prisma.TipDelegate<GlobalReject>;

  /**
   * `prisma.userToken`: Exposes CRUD operations for the **UserToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserTokens
    * const userTokens = await prisma.userToken.findMany()
    * ```
    */
  get userToken(): Prisma.UserTokenDelegate<GlobalReject>;

  /**
   * `prisma.widget`: Exposes CRUD operations for the **Widget** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Widgets
    * const widgets = await prisma.widget.findMany()
    * ```
    */
  get widget(): Prisma.WidgetDelegate<GlobalReject>;

  /**
   * `prisma.token`: Exposes CRUD operations for the **Token** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tokens
    * const tokens = await prisma.token.findMany()
    * ```
    */
  get token(): Prisma.TokenDelegate<GlobalReject>;

  /**
   * `prisma.withdraw`: Exposes CRUD operations for the **Withdraw** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Withdraws
    * const withdraws = await prisma.withdraw.findMany()
    * ```
    */
  get withdraw(): Prisma.WithdrawDelegate<GlobalReject>;

  /**
   * `prisma.file`: Exposes CRUD operations for the **File** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Files
    * const files = await prisma.file.findMany()
    * ```
    */
  get file(): Prisma.FileDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export import Metrics = runtime.Metrics
  export import Metric = runtime.Metric
  export import MetricHistogram = runtime.MetricHistogram
  export import MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
   * Extensions
   */
  export type Extension = runtime.Extension 

  /**
   * Prisma Client JS version: 4.5.0
   * Query Engine version: 0362da9eebca54d94c8ef5edd3b2e90af99ba452
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export import FieldRef = runtime.FieldRef

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    User: 'User',
    Streamer: 'Streamer',
    Tipper: 'Tipper',
    Page: 'Page',
    Tip: 'Tip',
    UserToken: 'UserToken',
    Widget: 'Widget',
    Token: 'Token',
    Withdraw: 'Withdraw',
    File: 'File'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    witdraws: number
    tips: number
  }

  export type UserCountOutputTypeSelect = {
    witdraws?: boolean
    tips?: boolean
  }

  export type UserCountOutputTypeGetPayload<
    S extends boolean | null | undefined | UserCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? UserCountOutputType
    : S extends undefined
    ? never
    : S extends UserCountOutputTypeArgs
    ?'include' extends U
    ? UserCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof UserCountOutputType ? UserCountOutputType[P] : never
  } 
    : UserCountOutputType
  : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     * 
    **/
    select?: UserCountOutputTypeSelect | null
  }



  /**
   * Count Type StreamerCountOutputType
   */


  export type StreamerCountOutputType = {
    activeTokens: number
    widgets: number
  }

  export type StreamerCountOutputTypeSelect = {
    activeTokens?: boolean
    widgets?: boolean
  }

  export type StreamerCountOutputTypeGetPayload<
    S extends boolean | null | undefined | StreamerCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? StreamerCountOutputType
    : S extends undefined
    ? never
    : S extends StreamerCountOutputTypeArgs
    ?'include' extends U
    ? StreamerCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof StreamerCountOutputType ? StreamerCountOutputType[P] : never
  } 
    : StreamerCountOutputType
  : StreamerCountOutputType




  // Custom InputTypes

  /**
   * StreamerCountOutputType without action
   */
  export type StreamerCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the StreamerCountOutputType
     * 
    **/
    select?: StreamerCountOutputTypeSelect | null
  }



  /**
   * Count Type TipperCountOutputType
   */


  export type TipperCountOutputType = {
    tips: number
  }

  export type TipperCountOutputTypeSelect = {
    tips?: boolean
  }

  export type TipperCountOutputTypeGetPayload<
    S extends boolean | null | undefined | TipperCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? TipperCountOutputType
    : S extends undefined
    ? never
    : S extends TipperCountOutputTypeArgs
    ?'include' extends U
    ? TipperCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof TipperCountOutputType ? TipperCountOutputType[P] : never
  } 
    : TipperCountOutputType
  : TipperCountOutputType




  // Custom InputTypes

  /**
   * TipperCountOutputType without action
   */
  export type TipperCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the TipperCountOutputType
     * 
    **/
    select?: TipperCountOutputTypeSelect | null
  }



  /**
   * Count Type PageCountOutputType
   */


  export type PageCountOutputType = {
    Streamer: number
  }

  export type PageCountOutputTypeSelect = {
    Streamer?: boolean
  }

  export type PageCountOutputTypeGetPayload<
    S extends boolean | null | undefined | PageCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? PageCountOutputType
    : S extends undefined
    ? never
    : S extends PageCountOutputTypeArgs
    ?'include' extends U
    ? PageCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof PageCountOutputType ? PageCountOutputType[P] : never
  } 
    : PageCountOutputType
  : PageCountOutputType




  // Custom InputTypes

  /**
   * PageCountOutputType without action
   */
  export type PageCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the PageCountOutputType
     * 
    **/
    select?: PageCountOutputTypeSelect | null
  }



  /**
   * Count Type UserTokenCountOutputType
   */


  export type UserTokenCountOutputType = {
    Tip: number
  }

  export type UserTokenCountOutputTypeSelect = {
    Tip?: boolean
  }

  export type UserTokenCountOutputTypeGetPayload<
    S extends boolean | null | undefined | UserTokenCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? UserTokenCountOutputType
    : S extends undefined
    ? never
    : S extends UserTokenCountOutputTypeArgs
    ?'include' extends U
    ? UserTokenCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof UserTokenCountOutputType ? UserTokenCountOutputType[P] : never
  } 
    : UserTokenCountOutputType
  : UserTokenCountOutputType




  // Custom InputTypes

  /**
   * UserTokenCountOutputType without action
   */
  export type UserTokenCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserTokenCountOutputType
     * 
    **/
    select?: UserTokenCountOutputTypeSelect | null
  }



  /**
   * Count Type TokenCountOutputType
   */


  export type TokenCountOutputType = {
    Tip: number
  }

  export type TokenCountOutputTypeSelect = {
    Tip?: boolean
  }

  export type TokenCountOutputTypeGetPayload<
    S extends boolean | null | undefined | TokenCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? TokenCountOutputType
    : S extends undefined
    ? never
    : S extends TokenCountOutputTypeArgs
    ?'include' extends U
    ? TokenCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof TokenCountOutputType ? TokenCountOutputType[P] : never
  } 
    : TokenCountOutputType
  : TokenCountOutputType




  // Custom InputTypes

  /**
   * TokenCountOutputType without action
   */
  export type TokenCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the TokenCountOutputType
     * 
    **/
    select?: TokenCountOutputTypeSelect | null
  }



  /**
   * Count Type FileCountOutputType
   */


  export type FileCountOutputType = {
    User: number
    Token: number
    Page: number
  }

  export type FileCountOutputTypeSelect = {
    User?: boolean
    Token?: boolean
    Page?: boolean
  }

  export type FileCountOutputTypeGetPayload<
    S extends boolean | null | undefined | FileCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? FileCountOutputType
    : S extends undefined
    ? never
    : S extends FileCountOutputTypeArgs
    ?'include' extends U
    ? FileCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof FileCountOutputType ? FileCountOutputType[P] : never
  } 
    : FileCountOutputType
  : FileCountOutputType




  // Custom InputTypes

  /**
   * FileCountOutputType without action
   */
  export type FileCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the FileCountOutputType
     * 
    **/
    select?: FileCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    allTipsCount: number | null
    allTipsValue: Decimal | null
    allWithdrawsValue: Decimal | null
  }

  export type UserSumAggregateOutputType = {
    allTipsCount: number | null
    allTipsValue: Decimal | null
    allWithdrawsValue: Decimal | null
  }

  export type UserMinAggregateOutputType = {
    address: string | null
    nick: string | null
    email: string | null
    emailVerified: Date | null
    firstName: string | null
    lastName: string | null
    verified: boolean | null
    createdAt: Date | null
    updateAt: Date | null
    allTipsCount: number | null
    allTipsValue: Decimal | null
    allWithdrawsValue: Decimal | null
    apperanceMode: ApperanceMode | null
    defaultRole: Role | null
    avatarId: string | null
  }

  export type UserMaxAggregateOutputType = {
    address: string | null
    nick: string | null
    email: string | null
    emailVerified: Date | null
    firstName: string | null
    lastName: string | null
    verified: boolean | null
    createdAt: Date | null
    updateAt: Date | null
    allTipsCount: number | null
    allTipsValue: Decimal | null
    allWithdrawsValue: Decimal | null
    apperanceMode: ApperanceMode | null
    defaultRole: Role | null
    avatarId: string | null
  }

  export type UserCountAggregateOutputType = {
    address: number
    nick: number
    email: number
    emailVerified: number
    firstName: number
    lastName: number
    verified: number
    createdAt: number
    updateAt: number
    allTipsCount: number
    allTipsValue: number
    allWithdrawsValue: number
    apperanceMode: number
    roles: number
    defaultRole: number
    refreshTokens: number
    avatarId: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    allTipsCount?: true
    allTipsValue?: true
    allWithdrawsValue?: true
  }

  export type UserSumAggregateInputType = {
    allTipsCount?: true
    allTipsValue?: true
    allWithdrawsValue?: true
  }

  export type UserMinAggregateInputType = {
    address?: true
    nick?: true
    email?: true
    emailVerified?: true
    firstName?: true
    lastName?: true
    verified?: true
    createdAt?: true
    updateAt?: true
    allTipsCount?: true
    allTipsValue?: true
    allWithdrawsValue?: true
    apperanceMode?: true
    defaultRole?: true
    avatarId?: true
  }

  export type UserMaxAggregateInputType = {
    address?: true
    nick?: true
    email?: true
    emailVerified?: true
    firstName?: true
    lastName?: true
    verified?: true
    createdAt?: true
    updateAt?: true
    allTipsCount?: true
    allTipsValue?: true
    allWithdrawsValue?: true
    apperanceMode?: true
    defaultRole?: true
    avatarId?: true
  }

  export type UserCountAggregateInputType = {
    address?: true
    nick?: true
    email?: true
    emailVerified?: true
    firstName?: true
    lastName?: true
    verified?: true
    createdAt?: true
    updateAt?: true
    allTipsCount?: true
    allTipsValue?: true
    allWithdrawsValue?: true
    apperanceMode?: true
    roles?: true
    defaultRole?: true
    refreshTokens?: true
    avatarId?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: Array<UserScalarFieldEnum>
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    address: string
    nick: string
    email: string
    emailVerified: Date | null
    firstName: string | null
    lastName: string | null
    verified: boolean
    createdAt: Date
    updateAt: Date
    allTipsCount: number
    allTipsValue: Decimal
    allWithdrawsValue: Decimal
    apperanceMode: ApperanceMode
    roles: Role[]
    defaultRole: Role
    refreshTokens: string[]
    avatarId: string | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect = {
    address?: boolean
    nick?: boolean
    email?: boolean
    emailVerified?: boolean
    firstName?: boolean
    lastName?: boolean
    verified?: boolean
    createdAt?: boolean
    updateAt?: boolean
    allTipsCount?: boolean
    allTipsValue?: boolean
    allWithdrawsValue?: boolean
    apperanceMode?: boolean
    roles?: boolean
    defaultRole?: boolean
    refreshTokens?: boolean
    avatar?: boolean | FileArgs
    avatarId?: boolean
    witdraws?: boolean | WithdrawFindManyArgs
    userToken?: boolean | UserTokenArgs
    tips?: boolean | TipFindManyArgs
    streamer?: boolean | StreamerArgs
    tipper?: boolean | TipperArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserInclude = {
    avatar?: boolean | FileArgs
    witdraws?: boolean | WithdrawFindManyArgs
    userToken?: boolean | UserTokenArgs
    tips?: boolean | TipFindManyArgs
    streamer?: boolean | StreamerArgs
    tipper?: boolean | TipperArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserGetPayload<
    S extends boolean | null | undefined | UserArgs,
    U = keyof S
      > = S extends true
        ? User
    : S extends undefined
    ? never
    : S extends UserArgs | UserFindManyArgs
    ?'include' extends U
    ? User  & {
    [P in TrueKeys<S['include']>]:
        P extends 'avatar' ? FileGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
        P extends 'witdraws' ? Array < WithdrawGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'userToken' ? UserTokenGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
        P extends 'tips' ? Array < TipGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'streamer' ? StreamerGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
        P extends 'tipper' ? TipperGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
        P extends '_count' ? UserCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'avatar' ? FileGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
        P extends 'witdraws' ? Array < WithdrawGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'userToken' ? UserTokenGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
        P extends 'tips' ? Array < TipGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'streamer' ? StreamerGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
        P extends 'tipper' ? TipperGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
        P extends '_count' ? UserCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof User ? User[P] : never
  } 
    : User
  : User


  type UserCountArgs = Merge<
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }
  >

  export interface UserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null, null>, Prisma__UserClient<UserGetPayload<T> | null, null>>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null, null>, Prisma__UserClient<UserGetPayload<T> | null, null>>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `address`
     * const userWithAddressOnly = await prisma.user.findMany({ select: { address: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<User>>, PrismaPromise<Array<UserGetPayload<T>>>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Find one User that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    avatar<T extends FileArgs = {}>(args?: Subset<T, FileArgs>): CheckSelect<T, Prisma__FileClient<File | Null>, Prisma__FileClient<FileGetPayload<T> | Null>>;

    witdraws<T extends WithdrawFindManyArgs = {}>(args?: Subset<T, WithdrawFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Withdraw>| Null>, PrismaPromise<Array<WithdrawGetPayload<T>>| Null>>;

    userToken<T extends UserTokenArgs = {}>(args?: Subset<T, UserTokenArgs>): CheckSelect<T, Prisma__UserTokenClient<UserToken | Null>, Prisma__UserTokenClient<UserTokenGetPayload<T> | Null>>;

    tips<T extends TipFindManyArgs = {}>(args?: Subset<T, TipFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Tip>| Null>, PrismaPromise<Array<TipGetPayload<T>>| Null>>;

    streamer<T extends StreamerArgs = {}>(args?: Subset<T, StreamerArgs>): CheckSelect<T, Prisma__StreamerClient<Streamer | Null>, Prisma__StreamerClient<StreamerGetPayload<T> | Null>>;

    tipper<T extends TipperArgs = {}>(args?: Subset<T, TipperArgs>): CheckSelect<T, Prisma__TipperClient<Tipper | Null>, Prisma__TipperClient<TipperGetPayload<T> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * User base type for findUnique actions
   */
  export type UserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }

  /**
   * User: findUnique
   */
  export interface UserFindUniqueArgs extends UserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User: findFirst
   */
  export interface UserFindFirstArgs extends UserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to create a User.
     * 
    **/
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    /**
     * The data used to create many Users.
     * 
    **/
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to update a User.
     * 
    **/
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    /**
     * The data used to update Users.
     * 
    **/
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
     * 
    **/
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     * 
    **/
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter which User to delete.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    /**
     * Filter which Users to delete
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User: findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs = UserFindUniqueArgsBase
      

  /**
   * User: findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs = UserFindFirstArgsBase
      

  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
  }



  /**
   * Model Streamer
   */


  export type AggregateStreamer = {
    _count: StreamerCountAggregateOutputType | null
    _avg: StreamerAvgAggregateOutputType | null
    _sum: StreamerSumAggregateOutputType | null
    _min: StreamerMinAggregateOutputType | null
    _max: StreamerMaxAggregateOutputType | null
  }

  export type StreamerAvgAggregateOutputType = {
    tipsCount: number | null
    tipsValue: Decimal | null
  }

  export type StreamerSumAggregateOutputType = {
    tipsCount: number | null
    tipsValue: Decimal | null
  }

  export type StreamerMinAggregateOutputType = {
    address: string | null
    tipsCount: number | null
    tipsValue: Decimal | null
    pageId: string | null
  }

  export type StreamerMaxAggregateOutputType = {
    address: string | null
    tipsCount: number | null
    tipsValue: Decimal | null
    pageId: string | null
  }

  export type StreamerCountAggregateOutputType = {
    address: number
    tipsCount: number
    tipsValue: number
    pageId: number
    _all: number
  }


  export type StreamerAvgAggregateInputType = {
    tipsCount?: true
    tipsValue?: true
  }

  export type StreamerSumAggregateInputType = {
    tipsCount?: true
    tipsValue?: true
  }

  export type StreamerMinAggregateInputType = {
    address?: true
    tipsCount?: true
    tipsValue?: true
    pageId?: true
  }

  export type StreamerMaxAggregateInputType = {
    address?: true
    tipsCount?: true
    tipsValue?: true
    pageId?: true
  }

  export type StreamerCountAggregateInputType = {
    address?: true
    tipsCount?: true
    tipsValue?: true
    pageId?: true
    _all?: true
  }

  export type StreamerAggregateArgs = {
    /**
     * Filter which Streamer to aggregate.
     * 
    **/
    where?: StreamerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Streamers to fetch.
     * 
    **/
    orderBy?: Enumerable<StreamerOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: StreamerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Streamers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Streamers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Streamers
    **/
    _count?: true | StreamerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StreamerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StreamerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StreamerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StreamerMaxAggregateInputType
  }

  export type GetStreamerAggregateType<T extends StreamerAggregateArgs> = {
        [P in keyof T & keyof AggregateStreamer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStreamer[P]>
      : GetScalarType<T[P], AggregateStreamer[P]>
  }




  export type StreamerGroupByArgs = {
    where?: StreamerWhereInput
    orderBy?: Enumerable<StreamerOrderByWithAggregationInput>
    by: Array<StreamerScalarFieldEnum>
    having?: StreamerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StreamerCountAggregateInputType | true
    _avg?: StreamerAvgAggregateInputType
    _sum?: StreamerSumAggregateInputType
    _min?: StreamerMinAggregateInputType
    _max?: StreamerMaxAggregateInputType
  }


  export type StreamerGroupByOutputType = {
    address: string
    tipsCount: number
    tipsValue: Decimal
    pageId: string
    _count: StreamerCountAggregateOutputType | null
    _avg: StreamerAvgAggregateOutputType | null
    _sum: StreamerSumAggregateOutputType | null
    _min: StreamerMinAggregateOutputType | null
    _max: StreamerMaxAggregateOutputType | null
  }

  type GetStreamerGroupByPayload<T extends StreamerGroupByArgs> = PrismaPromise<
    Array<
      PickArray<StreamerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StreamerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StreamerGroupByOutputType[P]>
            : GetScalarType<T[P], StreamerGroupByOutputType[P]>
        }
      >
    >


  export type StreamerSelect = {
    user?: boolean | UserArgs
    address?: boolean
    tipsCount?: boolean
    tipsValue?: boolean
    page?: boolean | PageArgs
    activeTokens?: boolean | TokenFindManyArgs
    widgets?: boolean | WidgetFindManyArgs
    pageId?: boolean
    _count?: boolean | StreamerCountOutputTypeArgs
  }

  export type StreamerInclude = {
    user?: boolean | UserArgs
    page?: boolean | PageArgs
    activeTokens?: boolean | TokenFindManyArgs
    widgets?: boolean | WidgetFindManyArgs
    _count?: boolean | StreamerCountOutputTypeArgs
  }

  export type StreamerGetPayload<
    S extends boolean | null | undefined | StreamerArgs,
    U = keyof S
      > = S extends true
        ? Streamer
    : S extends undefined
    ? never
    : S extends StreamerArgs | StreamerFindManyArgs
    ?'include' extends U
    ? Streamer  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> :
        P extends 'page' ? PageGetPayload<Exclude<S['include'], undefined | null>[P]> :
        P extends 'activeTokens' ? Array < TokenGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'widgets' ? Array < WidgetGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? StreamerCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> :
        P extends 'page' ? PageGetPayload<Exclude<S['select'], undefined | null>[P]> :
        P extends 'activeTokens' ? Array < TokenGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'widgets' ? Array < WidgetGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? StreamerCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Streamer ? Streamer[P] : never
  } 
    : Streamer
  : Streamer


  type StreamerCountArgs = Merge<
    Omit<StreamerFindManyArgs, 'select' | 'include'> & {
      select?: StreamerCountAggregateInputType | true
    }
  >

  export interface StreamerDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Streamer that matches the filter.
     * @param {StreamerFindUniqueArgs} args - Arguments to find a Streamer
     * @example
     * // Get one Streamer
     * const streamer = await prisma.streamer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends StreamerFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, StreamerFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Streamer'> extends True ? CheckSelect<T, Prisma__StreamerClient<Streamer>, Prisma__StreamerClient<StreamerGetPayload<T>>> : CheckSelect<T, Prisma__StreamerClient<Streamer | null, null>, Prisma__StreamerClient<StreamerGetPayload<T> | null, null>>

    /**
     * Find the first Streamer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamerFindFirstArgs} args - Arguments to find a Streamer
     * @example
     * // Get one Streamer
     * const streamer = await prisma.streamer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends StreamerFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, StreamerFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Streamer'> extends True ? CheckSelect<T, Prisma__StreamerClient<Streamer>, Prisma__StreamerClient<StreamerGetPayload<T>>> : CheckSelect<T, Prisma__StreamerClient<Streamer | null, null>, Prisma__StreamerClient<StreamerGetPayload<T> | null, null>>

    /**
     * Find zero or more Streamers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamerFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Streamers
     * const streamers = await prisma.streamer.findMany()
     * 
     * // Get first 10 Streamers
     * const streamers = await prisma.streamer.findMany({ take: 10 })
     * 
     * // Only select the `address`
     * const streamerWithAddressOnly = await prisma.streamer.findMany({ select: { address: true } })
     * 
    **/
    findMany<T extends StreamerFindManyArgs>(
      args?: SelectSubset<T, StreamerFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Streamer>>, PrismaPromise<Array<StreamerGetPayload<T>>>>

    /**
     * Create a Streamer.
     * @param {StreamerCreateArgs} args - Arguments to create a Streamer.
     * @example
     * // Create one Streamer
     * const Streamer = await prisma.streamer.create({
     *   data: {
     *     // ... data to create a Streamer
     *   }
     * })
     * 
    **/
    create<T extends StreamerCreateArgs>(
      args: SelectSubset<T, StreamerCreateArgs>
    ): CheckSelect<T, Prisma__StreamerClient<Streamer>, Prisma__StreamerClient<StreamerGetPayload<T>>>

    /**
     * Create many Streamers.
     *     @param {StreamerCreateManyArgs} args - Arguments to create many Streamers.
     *     @example
     *     // Create many Streamers
     *     const streamer = await prisma.streamer.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends StreamerCreateManyArgs>(
      args?: SelectSubset<T, StreamerCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Streamer.
     * @param {StreamerDeleteArgs} args - Arguments to delete one Streamer.
     * @example
     * // Delete one Streamer
     * const Streamer = await prisma.streamer.delete({
     *   where: {
     *     // ... filter to delete one Streamer
     *   }
     * })
     * 
    **/
    delete<T extends StreamerDeleteArgs>(
      args: SelectSubset<T, StreamerDeleteArgs>
    ): CheckSelect<T, Prisma__StreamerClient<Streamer>, Prisma__StreamerClient<StreamerGetPayload<T>>>

    /**
     * Update one Streamer.
     * @param {StreamerUpdateArgs} args - Arguments to update one Streamer.
     * @example
     * // Update one Streamer
     * const streamer = await prisma.streamer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends StreamerUpdateArgs>(
      args: SelectSubset<T, StreamerUpdateArgs>
    ): CheckSelect<T, Prisma__StreamerClient<Streamer>, Prisma__StreamerClient<StreamerGetPayload<T>>>

    /**
     * Delete zero or more Streamers.
     * @param {StreamerDeleteManyArgs} args - Arguments to filter Streamers to delete.
     * @example
     * // Delete a few Streamers
     * const { count } = await prisma.streamer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends StreamerDeleteManyArgs>(
      args?: SelectSubset<T, StreamerDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Streamers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Streamers
     * const streamer = await prisma.streamer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends StreamerUpdateManyArgs>(
      args: SelectSubset<T, StreamerUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Streamer.
     * @param {StreamerUpsertArgs} args - Arguments to update or create a Streamer.
     * @example
     * // Update or create a Streamer
     * const streamer = await prisma.streamer.upsert({
     *   create: {
     *     // ... data to create a Streamer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Streamer we want to update
     *   }
     * })
    **/
    upsert<T extends StreamerUpsertArgs>(
      args: SelectSubset<T, StreamerUpsertArgs>
    ): CheckSelect<T, Prisma__StreamerClient<Streamer>, Prisma__StreamerClient<StreamerGetPayload<T>>>

    /**
     * Find one Streamer that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {StreamerFindUniqueOrThrowArgs} args - Arguments to find a Streamer
     * @example
     * // Get one Streamer
     * const streamer = await prisma.streamer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends StreamerFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, StreamerFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__StreamerClient<Streamer>, Prisma__StreamerClient<StreamerGetPayload<T>>>

    /**
     * Find the first Streamer that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamerFindFirstOrThrowArgs} args - Arguments to find a Streamer
     * @example
     * // Get one Streamer
     * const streamer = await prisma.streamer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends StreamerFindFirstOrThrowArgs>(
      args?: SelectSubset<T, StreamerFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__StreamerClient<Streamer>, Prisma__StreamerClient<StreamerGetPayload<T>>>

    /**
     * Count the number of Streamers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamerCountArgs} args - Arguments to filter Streamers to count.
     * @example
     * // Count the number of Streamers
     * const count = await prisma.streamer.count({
     *   where: {
     *     // ... the filter for the Streamers we want to count
     *   }
     * })
    **/
    count<T extends StreamerCountArgs>(
      args?: Subset<T, StreamerCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StreamerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Streamer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StreamerAggregateArgs>(args: Subset<T, StreamerAggregateArgs>): PrismaPromise<GetStreamerAggregateType<T>>

    /**
     * Group by Streamer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StreamerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StreamerGroupByArgs['orderBy'] }
        : { orderBy?: StreamerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StreamerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStreamerGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Streamer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__StreamerClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

    page<T extends PageArgs = {}>(args?: Subset<T, PageArgs>): CheckSelect<T, Prisma__PageClient<Page | Null>, Prisma__PageClient<PageGetPayload<T> | Null>>;

    activeTokens<T extends TokenFindManyArgs = {}>(args?: Subset<T, TokenFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Token>| Null>, PrismaPromise<Array<TokenGetPayload<T>>| Null>>;

    widgets<T extends WidgetFindManyArgs = {}>(args?: Subset<T, WidgetFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Widget>| Null>, PrismaPromise<Array<WidgetGetPayload<T>>| Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Streamer base type for findUnique actions
   */
  export type StreamerFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Streamer
     * 
    **/
    select?: StreamerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: StreamerInclude | null
    /**
     * Filter, which Streamer to fetch.
     * 
    **/
    where: StreamerWhereUniqueInput
  }

  /**
   * Streamer: findUnique
   */
  export interface StreamerFindUniqueArgs extends StreamerFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Streamer base type for findFirst actions
   */
  export type StreamerFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Streamer
     * 
    **/
    select?: StreamerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: StreamerInclude | null
    /**
     * Filter, which Streamer to fetch.
     * 
    **/
    where?: StreamerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Streamers to fetch.
     * 
    **/
    orderBy?: Enumerable<StreamerOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Streamers.
     * 
    **/
    cursor?: StreamerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Streamers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Streamers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Streamers.
     * 
    **/
    distinct?: Enumerable<StreamerScalarFieldEnum>
  }

  /**
   * Streamer: findFirst
   */
  export interface StreamerFindFirstArgs extends StreamerFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Streamer findMany
   */
  export type StreamerFindManyArgs = {
    /**
     * Select specific fields to fetch from the Streamer
     * 
    **/
    select?: StreamerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: StreamerInclude | null
    /**
     * Filter, which Streamers to fetch.
     * 
    **/
    where?: StreamerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Streamers to fetch.
     * 
    **/
    orderBy?: Enumerable<StreamerOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Streamers.
     * 
    **/
    cursor?: StreamerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Streamers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Streamers.
     * 
    **/
    skip?: number
    distinct?: Enumerable<StreamerScalarFieldEnum>
  }


  /**
   * Streamer create
   */
  export type StreamerCreateArgs = {
    /**
     * Select specific fields to fetch from the Streamer
     * 
    **/
    select?: StreamerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: StreamerInclude | null
    /**
     * The data needed to create a Streamer.
     * 
    **/
    data: XOR<StreamerCreateInput, StreamerUncheckedCreateInput>
  }


  /**
   * Streamer createMany
   */
  export type StreamerCreateManyArgs = {
    /**
     * The data used to create many Streamers.
     * 
    **/
    data: Enumerable<StreamerCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Streamer update
   */
  export type StreamerUpdateArgs = {
    /**
     * Select specific fields to fetch from the Streamer
     * 
    **/
    select?: StreamerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: StreamerInclude | null
    /**
     * The data needed to update a Streamer.
     * 
    **/
    data: XOR<StreamerUpdateInput, StreamerUncheckedUpdateInput>
    /**
     * Choose, which Streamer to update.
     * 
    **/
    where: StreamerWhereUniqueInput
  }


  /**
   * Streamer updateMany
   */
  export type StreamerUpdateManyArgs = {
    /**
     * The data used to update Streamers.
     * 
    **/
    data: XOR<StreamerUpdateManyMutationInput, StreamerUncheckedUpdateManyInput>
    /**
     * Filter which Streamers to update
     * 
    **/
    where?: StreamerWhereInput
  }


  /**
   * Streamer upsert
   */
  export type StreamerUpsertArgs = {
    /**
     * Select specific fields to fetch from the Streamer
     * 
    **/
    select?: StreamerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: StreamerInclude | null
    /**
     * The filter to search for the Streamer to update in case it exists.
     * 
    **/
    where: StreamerWhereUniqueInput
    /**
     * In case the Streamer found by the `where` argument doesn't exist, create a new Streamer with this data.
     * 
    **/
    create: XOR<StreamerCreateInput, StreamerUncheckedCreateInput>
    /**
     * In case the Streamer was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<StreamerUpdateInput, StreamerUncheckedUpdateInput>
  }


  /**
   * Streamer delete
   */
  export type StreamerDeleteArgs = {
    /**
     * Select specific fields to fetch from the Streamer
     * 
    **/
    select?: StreamerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: StreamerInclude | null
    /**
     * Filter which Streamer to delete.
     * 
    **/
    where: StreamerWhereUniqueInput
  }


  /**
   * Streamer deleteMany
   */
  export type StreamerDeleteManyArgs = {
    /**
     * Filter which Streamers to delete
     * 
    **/
    where?: StreamerWhereInput
  }


  /**
   * Streamer: findUniqueOrThrow
   */
  export type StreamerFindUniqueOrThrowArgs = StreamerFindUniqueArgsBase
      

  /**
   * Streamer: findFirstOrThrow
   */
  export type StreamerFindFirstOrThrowArgs = StreamerFindFirstArgsBase
      

  /**
   * Streamer without action
   */
  export type StreamerArgs = {
    /**
     * Select specific fields to fetch from the Streamer
     * 
    **/
    select?: StreamerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: StreamerInclude | null
  }



  /**
   * Model Tipper
   */


  export type AggregateTipper = {
    _count: TipperCountAggregateOutputType | null
    _avg: TipperAvgAggregateOutputType | null
    _sum: TipperSumAggregateOutputType | null
    _min: TipperMinAggregateOutputType | null
    _max: TipperMaxAggregateOutputType | null
  }

  export type TipperAvgAggregateOutputType = {
    tipsValue: number | null
  }

  export type TipperSumAggregateOutputType = {
    tipsValue: number | null
  }

  export type TipperMinAggregateOutputType = {
    address: string | null
    nick: string | null
    tipsValue: number | null
  }

  export type TipperMaxAggregateOutputType = {
    address: string | null
    nick: string | null
    tipsValue: number | null
  }

  export type TipperCountAggregateOutputType = {
    address: number
    nick: number
    tipsValue: number
    _all: number
  }


  export type TipperAvgAggregateInputType = {
    tipsValue?: true
  }

  export type TipperSumAggregateInputType = {
    tipsValue?: true
  }

  export type TipperMinAggregateInputType = {
    address?: true
    nick?: true
    tipsValue?: true
  }

  export type TipperMaxAggregateInputType = {
    address?: true
    nick?: true
    tipsValue?: true
  }

  export type TipperCountAggregateInputType = {
    address?: true
    nick?: true
    tipsValue?: true
    _all?: true
  }

  export type TipperAggregateArgs = {
    /**
     * Filter which Tipper to aggregate.
     * 
    **/
    where?: TipperWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tippers to fetch.
     * 
    **/
    orderBy?: Enumerable<TipperOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: TipperWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tippers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tippers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tippers
    **/
    _count?: true | TipperCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TipperAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TipperSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TipperMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TipperMaxAggregateInputType
  }

  export type GetTipperAggregateType<T extends TipperAggregateArgs> = {
        [P in keyof T & keyof AggregateTipper]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTipper[P]>
      : GetScalarType<T[P], AggregateTipper[P]>
  }




  export type TipperGroupByArgs = {
    where?: TipperWhereInput
    orderBy?: Enumerable<TipperOrderByWithAggregationInput>
    by: Array<TipperScalarFieldEnum>
    having?: TipperScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TipperCountAggregateInputType | true
    _avg?: TipperAvgAggregateInputType
    _sum?: TipperSumAggregateInputType
    _min?: TipperMinAggregateInputType
    _max?: TipperMaxAggregateInputType
  }


  export type TipperGroupByOutputType = {
    address: string
    nick: string
    tipsValue: number
    _count: TipperCountAggregateOutputType | null
    _avg: TipperAvgAggregateOutputType | null
    _sum: TipperSumAggregateOutputType | null
    _min: TipperMinAggregateOutputType | null
    _max: TipperMaxAggregateOutputType | null
  }

  type GetTipperGroupByPayload<T extends TipperGroupByArgs> = PrismaPromise<
    Array<
      PickArray<TipperGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TipperGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TipperGroupByOutputType[P]>
            : GetScalarType<T[P], TipperGroupByOutputType[P]>
        }
      >
    >


  export type TipperSelect = {
    user?: boolean | UserArgs
    address?: boolean
    nick?: boolean
    tipsValue?: boolean
    tips?: boolean | TipFindManyArgs
    _count?: boolean | TipperCountOutputTypeArgs
  }

  export type TipperInclude = {
    user?: boolean | UserArgs
    tips?: boolean | TipFindManyArgs
    _count?: boolean | TipperCountOutputTypeArgs
  }

  export type TipperGetPayload<
    S extends boolean | null | undefined | TipperArgs,
    U = keyof S
      > = S extends true
        ? Tipper
    : S extends undefined
    ? never
    : S extends TipperArgs | TipperFindManyArgs
    ?'include' extends U
    ? Tipper  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> :
        P extends 'tips' ? Array < TipGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? TipperCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> :
        P extends 'tips' ? Array < TipGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? TipperCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Tipper ? Tipper[P] : never
  } 
    : Tipper
  : Tipper


  type TipperCountArgs = Merge<
    Omit<TipperFindManyArgs, 'select' | 'include'> & {
      select?: TipperCountAggregateInputType | true
    }
  >

  export interface TipperDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Tipper that matches the filter.
     * @param {TipperFindUniqueArgs} args - Arguments to find a Tipper
     * @example
     * // Get one Tipper
     * const tipper = await prisma.tipper.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TipperFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TipperFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Tipper'> extends True ? CheckSelect<T, Prisma__TipperClient<Tipper>, Prisma__TipperClient<TipperGetPayload<T>>> : CheckSelect<T, Prisma__TipperClient<Tipper | null, null>, Prisma__TipperClient<TipperGetPayload<T> | null, null>>

    /**
     * Find the first Tipper that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipperFindFirstArgs} args - Arguments to find a Tipper
     * @example
     * // Get one Tipper
     * const tipper = await prisma.tipper.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TipperFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TipperFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Tipper'> extends True ? CheckSelect<T, Prisma__TipperClient<Tipper>, Prisma__TipperClient<TipperGetPayload<T>>> : CheckSelect<T, Prisma__TipperClient<Tipper | null, null>, Prisma__TipperClient<TipperGetPayload<T> | null, null>>

    /**
     * Find zero or more Tippers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipperFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tippers
     * const tippers = await prisma.tipper.findMany()
     * 
     * // Get first 10 Tippers
     * const tippers = await prisma.tipper.findMany({ take: 10 })
     * 
     * // Only select the `address`
     * const tipperWithAddressOnly = await prisma.tipper.findMany({ select: { address: true } })
     * 
    **/
    findMany<T extends TipperFindManyArgs>(
      args?: SelectSubset<T, TipperFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Tipper>>, PrismaPromise<Array<TipperGetPayload<T>>>>

    /**
     * Create a Tipper.
     * @param {TipperCreateArgs} args - Arguments to create a Tipper.
     * @example
     * // Create one Tipper
     * const Tipper = await prisma.tipper.create({
     *   data: {
     *     // ... data to create a Tipper
     *   }
     * })
     * 
    **/
    create<T extends TipperCreateArgs>(
      args: SelectSubset<T, TipperCreateArgs>
    ): CheckSelect<T, Prisma__TipperClient<Tipper>, Prisma__TipperClient<TipperGetPayload<T>>>

    /**
     * Create many Tippers.
     *     @param {TipperCreateManyArgs} args - Arguments to create many Tippers.
     *     @example
     *     // Create many Tippers
     *     const tipper = await prisma.tipper.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TipperCreateManyArgs>(
      args?: SelectSubset<T, TipperCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Tipper.
     * @param {TipperDeleteArgs} args - Arguments to delete one Tipper.
     * @example
     * // Delete one Tipper
     * const Tipper = await prisma.tipper.delete({
     *   where: {
     *     // ... filter to delete one Tipper
     *   }
     * })
     * 
    **/
    delete<T extends TipperDeleteArgs>(
      args: SelectSubset<T, TipperDeleteArgs>
    ): CheckSelect<T, Prisma__TipperClient<Tipper>, Prisma__TipperClient<TipperGetPayload<T>>>

    /**
     * Update one Tipper.
     * @param {TipperUpdateArgs} args - Arguments to update one Tipper.
     * @example
     * // Update one Tipper
     * const tipper = await prisma.tipper.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TipperUpdateArgs>(
      args: SelectSubset<T, TipperUpdateArgs>
    ): CheckSelect<T, Prisma__TipperClient<Tipper>, Prisma__TipperClient<TipperGetPayload<T>>>

    /**
     * Delete zero or more Tippers.
     * @param {TipperDeleteManyArgs} args - Arguments to filter Tippers to delete.
     * @example
     * // Delete a few Tippers
     * const { count } = await prisma.tipper.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TipperDeleteManyArgs>(
      args?: SelectSubset<T, TipperDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tippers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipperUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tippers
     * const tipper = await prisma.tipper.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TipperUpdateManyArgs>(
      args: SelectSubset<T, TipperUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Tipper.
     * @param {TipperUpsertArgs} args - Arguments to update or create a Tipper.
     * @example
     * // Update or create a Tipper
     * const tipper = await prisma.tipper.upsert({
     *   create: {
     *     // ... data to create a Tipper
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tipper we want to update
     *   }
     * })
    **/
    upsert<T extends TipperUpsertArgs>(
      args: SelectSubset<T, TipperUpsertArgs>
    ): CheckSelect<T, Prisma__TipperClient<Tipper>, Prisma__TipperClient<TipperGetPayload<T>>>

    /**
     * Find one Tipper that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {TipperFindUniqueOrThrowArgs} args - Arguments to find a Tipper
     * @example
     * // Get one Tipper
     * const tipper = await prisma.tipper.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TipperFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, TipperFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__TipperClient<Tipper>, Prisma__TipperClient<TipperGetPayload<T>>>

    /**
     * Find the first Tipper that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipperFindFirstOrThrowArgs} args - Arguments to find a Tipper
     * @example
     * // Get one Tipper
     * const tipper = await prisma.tipper.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TipperFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TipperFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__TipperClient<Tipper>, Prisma__TipperClient<TipperGetPayload<T>>>

    /**
     * Count the number of Tippers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipperCountArgs} args - Arguments to filter Tippers to count.
     * @example
     * // Count the number of Tippers
     * const count = await prisma.tipper.count({
     *   where: {
     *     // ... the filter for the Tippers we want to count
     *   }
     * })
    **/
    count<T extends TipperCountArgs>(
      args?: Subset<T, TipperCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TipperCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tipper.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipperAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TipperAggregateArgs>(args: Subset<T, TipperAggregateArgs>): PrismaPromise<GetTipperAggregateType<T>>

    /**
     * Group by Tipper.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipperGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TipperGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TipperGroupByArgs['orderBy'] }
        : { orderBy?: TipperGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TipperGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTipperGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Tipper.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TipperClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

    tips<T extends TipFindManyArgs = {}>(args?: Subset<T, TipFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Tip>| Null>, PrismaPromise<Array<TipGetPayload<T>>| Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Tipper base type for findUnique actions
   */
  export type TipperFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Tipper
     * 
    **/
    select?: TipperSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TipperInclude | null
    /**
     * Filter, which Tipper to fetch.
     * 
    **/
    where: TipperWhereUniqueInput
  }

  /**
   * Tipper: findUnique
   */
  export interface TipperFindUniqueArgs extends TipperFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Tipper base type for findFirst actions
   */
  export type TipperFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Tipper
     * 
    **/
    select?: TipperSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TipperInclude | null
    /**
     * Filter, which Tipper to fetch.
     * 
    **/
    where?: TipperWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tippers to fetch.
     * 
    **/
    orderBy?: Enumerable<TipperOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tippers.
     * 
    **/
    cursor?: TipperWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tippers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tippers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tippers.
     * 
    **/
    distinct?: Enumerable<TipperScalarFieldEnum>
  }

  /**
   * Tipper: findFirst
   */
  export interface TipperFindFirstArgs extends TipperFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Tipper findMany
   */
  export type TipperFindManyArgs = {
    /**
     * Select specific fields to fetch from the Tipper
     * 
    **/
    select?: TipperSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TipperInclude | null
    /**
     * Filter, which Tippers to fetch.
     * 
    **/
    where?: TipperWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tippers to fetch.
     * 
    **/
    orderBy?: Enumerable<TipperOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tippers.
     * 
    **/
    cursor?: TipperWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tippers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tippers.
     * 
    **/
    skip?: number
    distinct?: Enumerable<TipperScalarFieldEnum>
  }


  /**
   * Tipper create
   */
  export type TipperCreateArgs = {
    /**
     * Select specific fields to fetch from the Tipper
     * 
    **/
    select?: TipperSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TipperInclude | null
    /**
     * The data needed to create a Tipper.
     * 
    **/
    data: XOR<TipperCreateInput, TipperUncheckedCreateInput>
  }


  /**
   * Tipper createMany
   */
  export type TipperCreateManyArgs = {
    /**
     * The data used to create many Tippers.
     * 
    **/
    data: Enumerable<TipperCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Tipper update
   */
  export type TipperUpdateArgs = {
    /**
     * Select specific fields to fetch from the Tipper
     * 
    **/
    select?: TipperSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TipperInclude | null
    /**
     * The data needed to update a Tipper.
     * 
    **/
    data: XOR<TipperUpdateInput, TipperUncheckedUpdateInput>
    /**
     * Choose, which Tipper to update.
     * 
    **/
    where: TipperWhereUniqueInput
  }


  /**
   * Tipper updateMany
   */
  export type TipperUpdateManyArgs = {
    /**
     * The data used to update Tippers.
     * 
    **/
    data: XOR<TipperUpdateManyMutationInput, TipperUncheckedUpdateManyInput>
    /**
     * Filter which Tippers to update
     * 
    **/
    where?: TipperWhereInput
  }


  /**
   * Tipper upsert
   */
  export type TipperUpsertArgs = {
    /**
     * Select specific fields to fetch from the Tipper
     * 
    **/
    select?: TipperSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TipperInclude | null
    /**
     * The filter to search for the Tipper to update in case it exists.
     * 
    **/
    where: TipperWhereUniqueInput
    /**
     * In case the Tipper found by the `where` argument doesn't exist, create a new Tipper with this data.
     * 
    **/
    create: XOR<TipperCreateInput, TipperUncheckedCreateInput>
    /**
     * In case the Tipper was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<TipperUpdateInput, TipperUncheckedUpdateInput>
  }


  /**
   * Tipper delete
   */
  export type TipperDeleteArgs = {
    /**
     * Select specific fields to fetch from the Tipper
     * 
    **/
    select?: TipperSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TipperInclude | null
    /**
     * Filter which Tipper to delete.
     * 
    **/
    where: TipperWhereUniqueInput
  }


  /**
   * Tipper deleteMany
   */
  export type TipperDeleteManyArgs = {
    /**
     * Filter which Tippers to delete
     * 
    **/
    where?: TipperWhereInput
  }


  /**
   * Tipper: findUniqueOrThrow
   */
  export type TipperFindUniqueOrThrowArgs = TipperFindUniqueArgsBase
      

  /**
   * Tipper: findFirstOrThrow
   */
  export type TipperFindFirstOrThrowArgs = TipperFindFirstArgsBase
      

  /**
   * Tipper without action
   */
  export type TipperArgs = {
    /**
     * Select specific fields to fetch from the Tipper
     * 
    **/
    select?: TipperSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TipperInclude | null
  }



  /**
   * Model Page
   */


  export type AggregatePage = {
    _count: PageCountAggregateOutputType | null
    _min: PageMinAggregateOutputType | null
    _max: PageMaxAggregateOutputType | null
  }

  export type PageMinAggregateOutputType = {
    id: string | null
    affixUrl: string | null
    description: string | null
    banerId: string | null
  }

  export type PageMaxAggregateOutputType = {
    id: string | null
    affixUrl: string | null
    description: string | null
    banerId: string | null
  }

  export type PageCountAggregateOutputType = {
    id: number
    affixUrl: number
    description: number
    banerId: number
    _all: number
  }


  export type PageMinAggregateInputType = {
    id?: true
    affixUrl?: true
    description?: true
    banerId?: true
  }

  export type PageMaxAggregateInputType = {
    id?: true
    affixUrl?: true
    description?: true
    banerId?: true
  }

  export type PageCountAggregateInputType = {
    id?: true
    affixUrl?: true
    description?: true
    banerId?: true
    _all?: true
  }

  export type PageAggregateArgs = {
    /**
     * Filter which Page to aggregate.
     * 
    **/
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     * 
    **/
    orderBy?: Enumerable<PageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pages
    **/
    _count?: true | PageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PageMaxAggregateInputType
  }

  export type GetPageAggregateType<T extends PageAggregateArgs> = {
        [P in keyof T & keyof AggregatePage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePage[P]>
      : GetScalarType<T[P], AggregatePage[P]>
  }




  export type PageGroupByArgs = {
    where?: PageWhereInput
    orderBy?: Enumerable<PageOrderByWithAggregationInput>
    by: Array<PageScalarFieldEnum>
    having?: PageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PageCountAggregateInputType | true
    _min?: PageMinAggregateInputType
    _max?: PageMaxAggregateInputType
  }


  export type PageGroupByOutputType = {
    id: string
    affixUrl: string
    description: string | null
    banerId: string | null
    _count: PageCountAggregateOutputType | null
    _min: PageMinAggregateOutputType | null
    _max: PageMaxAggregateOutputType | null
  }

  type GetPageGroupByPayload<T extends PageGroupByArgs> = PrismaPromise<
    Array<
      PickArray<PageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PageGroupByOutputType[P]>
            : GetScalarType<T[P], PageGroupByOutputType[P]>
        }
      >
    >


  export type PageSelect = {
    id?: boolean
    affixUrl?: boolean
    description?: boolean
    baner?: boolean | FileArgs
    banerId?: boolean
    Streamer?: boolean | StreamerFindManyArgs
    _count?: boolean | PageCountOutputTypeArgs
  }

  export type PageInclude = {
    baner?: boolean | FileArgs
    Streamer?: boolean | StreamerFindManyArgs
    _count?: boolean | PageCountOutputTypeArgs
  }

  export type PageGetPayload<
    S extends boolean | null | undefined | PageArgs,
    U = keyof S
      > = S extends true
        ? Page
    : S extends undefined
    ? never
    : S extends PageArgs | PageFindManyArgs
    ?'include' extends U
    ? Page  & {
    [P in TrueKeys<S['include']>]:
        P extends 'baner' ? FileGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
        P extends 'Streamer' ? Array < StreamerGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? PageCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'baner' ? FileGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
        P extends 'Streamer' ? Array < StreamerGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? PageCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Page ? Page[P] : never
  } 
    : Page
  : Page


  type PageCountArgs = Merge<
    Omit<PageFindManyArgs, 'select' | 'include'> & {
      select?: PageCountAggregateInputType | true
    }
  >

  export interface PageDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Page that matches the filter.
     * @param {PageFindUniqueArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PageFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PageFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Page'> extends True ? CheckSelect<T, Prisma__PageClient<Page>, Prisma__PageClient<PageGetPayload<T>>> : CheckSelect<T, Prisma__PageClient<Page | null, null>, Prisma__PageClient<PageGetPayload<T> | null, null>>

    /**
     * Find the first Page that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindFirstArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PageFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PageFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Page'> extends True ? CheckSelect<T, Prisma__PageClient<Page>, Prisma__PageClient<PageGetPayload<T>>> : CheckSelect<T, Prisma__PageClient<Page | null, null>, Prisma__PageClient<PageGetPayload<T> | null, null>>

    /**
     * Find zero or more Pages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pages
     * const pages = await prisma.page.findMany()
     * 
     * // Get first 10 Pages
     * const pages = await prisma.page.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pageWithIdOnly = await prisma.page.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PageFindManyArgs>(
      args?: SelectSubset<T, PageFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Page>>, PrismaPromise<Array<PageGetPayload<T>>>>

    /**
     * Create a Page.
     * @param {PageCreateArgs} args - Arguments to create a Page.
     * @example
     * // Create one Page
     * const Page = await prisma.page.create({
     *   data: {
     *     // ... data to create a Page
     *   }
     * })
     * 
    **/
    create<T extends PageCreateArgs>(
      args: SelectSubset<T, PageCreateArgs>
    ): CheckSelect<T, Prisma__PageClient<Page>, Prisma__PageClient<PageGetPayload<T>>>

    /**
     * Create many Pages.
     *     @param {PageCreateManyArgs} args - Arguments to create many Pages.
     *     @example
     *     // Create many Pages
     *     const page = await prisma.page.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PageCreateManyArgs>(
      args?: SelectSubset<T, PageCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Page.
     * @param {PageDeleteArgs} args - Arguments to delete one Page.
     * @example
     * // Delete one Page
     * const Page = await prisma.page.delete({
     *   where: {
     *     // ... filter to delete one Page
     *   }
     * })
     * 
    **/
    delete<T extends PageDeleteArgs>(
      args: SelectSubset<T, PageDeleteArgs>
    ): CheckSelect<T, Prisma__PageClient<Page>, Prisma__PageClient<PageGetPayload<T>>>

    /**
     * Update one Page.
     * @param {PageUpdateArgs} args - Arguments to update one Page.
     * @example
     * // Update one Page
     * const page = await prisma.page.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PageUpdateArgs>(
      args: SelectSubset<T, PageUpdateArgs>
    ): CheckSelect<T, Prisma__PageClient<Page>, Prisma__PageClient<PageGetPayload<T>>>

    /**
     * Delete zero or more Pages.
     * @param {PageDeleteManyArgs} args - Arguments to filter Pages to delete.
     * @example
     * // Delete a few Pages
     * const { count } = await prisma.page.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PageDeleteManyArgs>(
      args?: SelectSubset<T, PageDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pages
     * const page = await prisma.page.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PageUpdateManyArgs>(
      args: SelectSubset<T, PageUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Page.
     * @param {PageUpsertArgs} args - Arguments to update or create a Page.
     * @example
     * // Update or create a Page
     * const page = await prisma.page.upsert({
     *   create: {
     *     // ... data to create a Page
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Page we want to update
     *   }
     * })
    **/
    upsert<T extends PageUpsertArgs>(
      args: SelectSubset<T, PageUpsertArgs>
    ): CheckSelect<T, Prisma__PageClient<Page>, Prisma__PageClient<PageGetPayload<T>>>

    /**
     * Find one Page that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {PageFindUniqueOrThrowArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PageFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, PageFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__PageClient<Page>, Prisma__PageClient<PageGetPayload<T>>>

    /**
     * Find the first Page that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindFirstOrThrowArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PageFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PageFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__PageClient<Page>, Prisma__PageClient<PageGetPayload<T>>>

    /**
     * Count the number of Pages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageCountArgs} args - Arguments to filter Pages to count.
     * @example
     * // Count the number of Pages
     * const count = await prisma.page.count({
     *   where: {
     *     // ... the filter for the Pages we want to count
     *   }
     * })
    **/
    count<T extends PageCountArgs>(
      args?: Subset<T, PageCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Page.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PageAggregateArgs>(args: Subset<T, PageAggregateArgs>): PrismaPromise<GetPageAggregateType<T>>

    /**
     * Group by Page.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PageGroupByArgs['orderBy'] }
        : { orderBy?: PageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPageGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Page.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PageClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    baner<T extends FileArgs = {}>(args?: Subset<T, FileArgs>): CheckSelect<T, Prisma__FileClient<File | Null>, Prisma__FileClient<FileGetPayload<T> | Null>>;

    Streamer<T extends StreamerFindManyArgs = {}>(args?: Subset<T, StreamerFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Streamer>| Null>, PrismaPromise<Array<StreamerGetPayload<T>>| Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Page base type for findUnique actions
   */
  export type PageFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Page
     * 
    **/
    select?: PageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PageInclude | null
    /**
     * Filter, which Page to fetch.
     * 
    **/
    where: PageWhereUniqueInput
  }

  /**
   * Page: findUnique
   */
  export interface PageFindUniqueArgs extends PageFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Page base type for findFirst actions
   */
  export type PageFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Page
     * 
    **/
    select?: PageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PageInclude | null
    /**
     * Filter, which Page to fetch.
     * 
    **/
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     * 
    **/
    orderBy?: Enumerable<PageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pages.
     * 
    **/
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pages.
     * 
    **/
    distinct?: Enumerable<PageScalarFieldEnum>
  }

  /**
   * Page: findFirst
   */
  export interface PageFindFirstArgs extends PageFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Page findMany
   */
  export type PageFindManyArgs = {
    /**
     * Select specific fields to fetch from the Page
     * 
    **/
    select?: PageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PageInclude | null
    /**
     * Filter, which Pages to fetch.
     * 
    **/
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     * 
    **/
    orderBy?: Enumerable<PageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pages.
     * 
    **/
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     * 
    **/
    skip?: number
    distinct?: Enumerable<PageScalarFieldEnum>
  }


  /**
   * Page create
   */
  export type PageCreateArgs = {
    /**
     * Select specific fields to fetch from the Page
     * 
    **/
    select?: PageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PageInclude | null
    /**
     * The data needed to create a Page.
     * 
    **/
    data: XOR<PageCreateInput, PageUncheckedCreateInput>
  }


  /**
   * Page createMany
   */
  export type PageCreateManyArgs = {
    /**
     * The data used to create many Pages.
     * 
    **/
    data: Enumerable<PageCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Page update
   */
  export type PageUpdateArgs = {
    /**
     * Select specific fields to fetch from the Page
     * 
    **/
    select?: PageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PageInclude | null
    /**
     * The data needed to update a Page.
     * 
    **/
    data: XOR<PageUpdateInput, PageUncheckedUpdateInput>
    /**
     * Choose, which Page to update.
     * 
    **/
    where: PageWhereUniqueInput
  }


  /**
   * Page updateMany
   */
  export type PageUpdateManyArgs = {
    /**
     * The data used to update Pages.
     * 
    **/
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyInput>
    /**
     * Filter which Pages to update
     * 
    **/
    where?: PageWhereInput
  }


  /**
   * Page upsert
   */
  export type PageUpsertArgs = {
    /**
     * Select specific fields to fetch from the Page
     * 
    **/
    select?: PageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PageInclude | null
    /**
     * The filter to search for the Page to update in case it exists.
     * 
    **/
    where: PageWhereUniqueInput
    /**
     * In case the Page found by the `where` argument doesn't exist, create a new Page with this data.
     * 
    **/
    create: XOR<PageCreateInput, PageUncheckedCreateInput>
    /**
     * In case the Page was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<PageUpdateInput, PageUncheckedUpdateInput>
  }


  /**
   * Page delete
   */
  export type PageDeleteArgs = {
    /**
     * Select specific fields to fetch from the Page
     * 
    **/
    select?: PageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PageInclude | null
    /**
     * Filter which Page to delete.
     * 
    **/
    where: PageWhereUniqueInput
  }


  /**
   * Page deleteMany
   */
  export type PageDeleteManyArgs = {
    /**
     * Filter which Pages to delete
     * 
    **/
    where?: PageWhereInput
  }


  /**
   * Page: findUniqueOrThrow
   */
  export type PageFindUniqueOrThrowArgs = PageFindUniqueArgsBase
      

  /**
   * Page: findFirstOrThrow
   */
  export type PageFindFirstOrThrowArgs = PageFindFirstArgsBase
      

  /**
   * Page without action
   */
  export type PageArgs = {
    /**
     * Select specific fields to fetch from the Page
     * 
    **/
    select?: PageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PageInclude | null
  }



  /**
   * Model Tip
   */


  export type AggregateTip = {
    _count: TipCountAggregateOutputType | null
    _avg: TipAvgAggregateOutputType | null
    _sum: TipSumAggregateOutputType | null
    _min: TipMinAggregateOutputType | null
    _max: TipMaxAggregateOutputType | null
  }

  export type TipAvgAggregateOutputType = {
    amount: Decimal | null
    value: Decimal | null
    receivedTokensAmount: Decimal | null
  }

  export type TipSumAggregateOutputType = {
    amount: Decimal | null
    value: Decimal | null
    receivedTokensAmount: Decimal | null
  }

  export type TipMinAggregateOutputType = {
    txHash: string | null
    amount: Decimal | null
    value: Decimal | null
    message: string | null
    displayed: boolean | null
    date: Date | null
    receivedTokensAmount: Decimal | null
    userRole: Role | null
    userAddress: string | null
    userTokenAddress: string | null
    tokenAddress: string | null
    tipperAddress: string | null
  }

  export type TipMaxAggregateOutputType = {
    txHash: string | null
    amount: Decimal | null
    value: Decimal | null
    message: string | null
    displayed: boolean | null
    date: Date | null
    receivedTokensAmount: Decimal | null
    userRole: Role | null
    userAddress: string | null
    userTokenAddress: string | null
    tokenAddress: string | null
    tipperAddress: string | null
  }

  export type TipCountAggregateOutputType = {
    txHash: number
    amount: number
    value: number
    message: number
    displayed: number
    date: number
    receivedTokensAmount: number
    userRole: number
    userAddress: number
    userTokenAddress: number
    tokenAddress: number
    tipperAddress: number
    _all: number
  }


  export type TipAvgAggregateInputType = {
    amount?: true
    value?: true
    receivedTokensAmount?: true
  }

  export type TipSumAggregateInputType = {
    amount?: true
    value?: true
    receivedTokensAmount?: true
  }

  export type TipMinAggregateInputType = {
    txHash?: true
    amount?: true
    value?: true
    message?: true
    displayed?: true
    date?: true
    receivedTokensAmount?: true
    userRole?: true
    userAddress?: true
    userTokenAddress?: true
    tokenAddress?: true
    tipperAddress?: true
  }

  export type TipMaxAggregateInputType = {
    txHash?: true
    amount?: true
    value?: true
    message?: true
    displayed?: true
    date?: true
    receivedTokensAmount?: true
    userRole?: true
    userAddress?: true
    userTokenAddress?: true
    tokenAddress?: true
    tipperAddress?: true
  }

  export type TipCountAggregateInputType = {
    txHash?: true
    amount?: true
    value?: true
    message?: true
    displayed?: true
    date?: true
    receivedTokensAmount?: true
    userRole?: true
    userAddress?: true
    userTokenAddress?: true
    tokenAddress?: true
    tipperAddress?: true
    _all?: true
  }

  export type TipAggregateArgs = {
    /**
     * Filter which Tip to aggregate.
     * 
    **/
    where?: TipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tips to fetch.
     * 
    **/
    orderBy?: Enumerable<TipOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: TipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tips from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tips.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tips
    **/
    _count?: true | TipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TipAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TipSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TipMaxAggregateInputType
  }

  export type GetTipAggregateType<T extends TipAggregateArgs> = {
        [P in keyof T & keyof AggregateTip]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTip[P]>
      : GetScalarType<T[P], AggregateTip[P]>
  }




  export type TipGroupByArgs = {
    where?: TipWhereInput
    orderBy?: Enumerable<TipOrderByWithAggregationInput>
    by: Array<TipScalarFieldEnum>
    having?: TipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TipCountAggregateInputType | true
    _avg?: TipAvgAggregateInputType
    _sum?: TipSumAggregateInputType
    _min?: TipMinAggregateInputType
    _max?: TipMaxAggregateInputType
  }


  export type TipGroupByOutputType = {
    txHash: string
    amount: Decimal
    value: Decimal
    message: string
    displayed: boolean
    date: Date
    receivedTokensAmount: Decimal
    userRole: Role
    userAddress: string
    userTokenAddress: string
    tokenAddress: string
    tipperAddress: string
    _count: TipCountAggregateOutputType | null
    _avg: TipAvgAggregateOutputType | null
    _sum: TipSumAggregateOutputType | null
    _min: TipMinAggregateOutputType | null
    _max: TipMaxAggregateOutputType | null
  }

  type GetTipGroupByPayload<T extends TipGroupByArgs> = PrismaPromise<
    Array<
      PickArray<TipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TipGroupByOutputType[P]>
            : GetScalarType<T[P], TipGroupByOutputType[P]>
        }
      >
    >


  export type TipSelect = {
    txHash?: boolean
    amount?: boolean
    value?: boolean
    message?: boolean
    displayed?: boolean
    date?: boolean
    receivedTokensAmount?: boolean
    userRole?: boolean
    user?: boolean | UserArgs
    userAddress?: boolean
    userToken?: boolean | UserTokenArgs
    userTokenAddress?: boolean
    token?: boolean | TokenArgs
    tokenAddress?: boolean
    tipper?: boolean | TipperArgs
    tipperAddress?: boolean
  }

  export type TipInclude = {
    user?: boolean | UserArgs
    userToken?: boolean | UserTokenArgs
    token?: boolean | TokenArgs
    tipper?: boolean | TipperArgs
  }

  export type TipGetPayload<
    S extends boolean | null | undefined | TipArgs,
    U = keyof S
      > = S extends true
        ? Tip
    : S extends undefined
    ? never
    : S extends TipArgs | TipFindManyArgs
    ?'include' extends U
    ? Tip  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> :
        P extends 'userToken' ? UserTokenGetPayload<Exclude<S['include'], undefined | null>[P]> :
        P extends 'token' ? TokenGetPayload<Exclude<S['include'], undefined | null>[P]> :
        P extends 'tipper' ? TipperGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> :
        P extends 'userToken' ? UserTokenGetPayload<Exclude<S['select'], undefined | null>[P]> :
        P extends 'token' ? TokenGetPayload<Exclude<S['select'], undefined | null>[P]> :
        P extends 'tipper' ? TipperGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Tip ? Tip[P] : never
  } 
    : Tip
  : Tip


  type TipCountArgs = Merge<
    Omit<TipFindManyArgs, 'select' | 'include'> & {
      select?: TipCountAggregateInputType | true
    }
  >

  export interface TipDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Tip that matches the filter.
     * @param {TipFindUniqueArgs} args - Arguments to find a Tip
     * @example
     * // Get one Tip
     * const tip = await prisma.tip.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TipFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TipFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Tip'> extends True ? CheckSelect<T, Prisma__TipClient<Tip>, Prisma__TipClient<TipGetPayload<T>>> : CheckSelect<T, Prisma__TipClient<Tip | null, null>, Prisma__TipClient<TipGetPayload<T> | null, null>>

    /**
     * Find the first Tip that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipFindFirstArgs} args - Arguments to find a Tip
     * @example
     * // Get one Tip
     * const tip = await prisma.tip.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TipFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TipFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Tip'> extends True ? CheckSelect<T, Prisma__TipClient<Tip>, Prisma__TipClient<TipGetPayload<T>>> : CheckSelect<T, Prisma__TipClient<Tip | null, null>, Prisma__TipClient<TipGetPayload<T> | null, null>>

    /**
     * Find zero or more Tips that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tips
     * const tips = await prisma.tip.findMany()
     * 
     * // Get first 10 Tips
     * const tips = await prisma.tip.findMany({ take: 10 })
     * 
     * // Only select the `txHash`
     * const tipWithTxHashOnly = await prisma.tip.findMany({ select: { txHash: true } })
     * 
    **/
    findMany<T extends TipFindManyArgs>(
      args?: SelectSubset<T, TipFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Tip>>, PrismaPromise<Array<TipGetPayload<T>>>>

    /**
     * Create a Tip.
     * @param {TipCreateArgs} args - Arguments to create a Tip.
     * @example
     * // Create one Tip
     * const Tip = await prisma.tip.create({
     *   data: {
     *     // ... data to create a Tip
     *   }
     * })
     * 
    **/
    create<T extends TipCreateArgs>(
      args: SelectSubset<T, TipCreateArgs>
    ): CheckSelect<T, Prisma__TipClient<Tip>, Prisma__TipClient<TipGetPayload<T>>>

    /**
     * Create many Tips.
     *     @param {TipCreateManyArgs} args - Arguments to create many Tips.
     *     @example
     *     // Create many Tips
     *     const tip = await prisma.tip.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TipCreateManyArgs>(
      args?: SelectSubset<T, TipCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Tip.
     * @param {TipDeleteArgs} args - Arguments to delete one Tip.
     * @example
     * // Delete one Tip
     * const Tip = await prisma.tip.delete({
     *   where: {
     *     // ... filter to delete one Tip
     *   }
     * })
     * 
    **/
    delete<T extends TipDeleteArgs>(
      args: SelectSubset<T, TipDeleteArgs>
    ): CheckSelect<T, Prisma__TipClient<Tip>, Prisma__TipClient<TipGetPayload<T>>>

    /**
     * Update one Tip.
     * @param {TipUpdateArgs} args - Arguments to update one Tip.
     * @example
     * // Update one Tip
     * const tip = await prisma.tip.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TipUpdateArgs>(
      args: SelectSubset<T, TipUpdateArgs>
    ): CheckSelect<T, Prisma__TipClient<Tip>, Prisma__TipClient<TipGetPayload<T>>>

    /**
     * Delete zero or more Tips.
     * @param {TipDeleteManyArgs} args - Arguments to filter Tips to delete.
     * @example
     * // Delete a few Tips
     * const { count } = await prisma.tip.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TipDeleteManyArgs>(
      args?: SelectSubset<T, TipDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tips.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tips
     * const tip = await prisma.tip.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TipUpdateManyArgs>(
      args: SelectSubset<T, TipUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Tip.
     * @param {TipUpsertArgs} args - Arguments to update or create a Tip.
     * @example
     * // Update or create a Tip
     * const tip = await prisma.tip.upsert({
     *   create: {
     *     // ... data to create a Tip
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tip we want to update
     *   }
     * })
    **/
    upsert<T extends TipUpsertArgs>(
      args: SelectSubset<T, TipUpsertArgs>
    ): CheckSelect<T, Prisma__TipClient<Tip>, Prisma__TipClient<TipGetPayload<T>>>

    /**
     * Find one Tip that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {TipFindUniqueOrThrowArgs} args - Arguments to find a Tip
     * @example
     * // Get one Tip
     * const tip = await prisma.tip.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TipFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, TipFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__TipClient<Tip>, Prisma__TipClient<TipGetPayload<T>>>

    /**
     * Find the first Tip that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipFindFirstOrThrowArgs} args - Arguments to find a Tip
     * @example
     * // Get one Tip
     * const tip = await prisma.tip.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TipFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TipFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__TipClient<Tip>, Prisma__TipClient<TipGetPayload<T>>>

    /**
     * Count the number of Tips.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipCountArgs} args - Arguments to filter Tips to count.
     * @example
     * // Count the number of Tips
     * const count = await prisma.tip.count({
     *   where: {
     *     // ... the filter for the Tips we want to count
     *   }
     * })
    **/
    count<T extends TipCountArgs>(
      args?: Subset<T, TipCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tip.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TipAggregateArgs>(args: Subset<T, TipAggregateArgs>): PrismaPromise<GetTipAggregateType<T>>

    /**
     * Group by Tip.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TipGroupByArgs['orderBy'] }
        : { orderBy?: TipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTipGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Tip.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TipClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

    userToken<T extends UserTokenArgs = {}>(args?: Subset<T, UserTokenArgs>): CheckSelect<T, Prisma__UserTokenClient<UserToken | Null>, Prisma__UserTokenClient<UserTokenGetPayload<T> | Null>>;

    token<T extends TokenArgs = {}>(args?: Subset<T, TokenArgs>): CheckSelect<T, Prisma__TokenClient<Token | Null>, Prisma__TokenClient<TokenGetPayload<T> | Null>>;

    tipper<T extends TipperArgs = {}>(args?: Subset<T, TipperArgs>): CheckSelect<T, Prisma__TipperClient<Tipper | Null>, Prisma__TipperClient<TipperGetPayload<T> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Tip base type for findUnique actions
   */
  export type TipFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Tip
     * 
    **/
    select?: TipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TipInclude | null
    /**
     * Filter, which Tip to fetch.
     * 
    **/
    where: TipWhereUniqueInput
  }

  /**
   * Tip: findUnique
   */
  export interface TipFindUniqueArgs extends TipFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Tip base type for findFirst actions
   */
  export type TipFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Tip
     * 
    **/
    select?: TipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TipInclude | null
    /**
     * Filter, which Tip to fetch.
     * 
    **/
    where?: TipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tips to fetch.
     * 
    **/
    orderBy?: Enumerable<TipOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tips.
     * 
    **/
    cursor?: TipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tips from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tips.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tips.
     * 
    **/
    distinct?: Enumerable<TipScalarFieldEnum>
  }

  /**
   * Tip: findFirst
   */
  export interface TipFindFirstArgs extends TipFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Tip findMany
   */
  export type TipFindManyArgs = {
    /**
     * Select specific fields to fetch from the Tip
     * 
    **/
    select?: TipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TipInclude | null
    /**
     * Filter, which Tips to fetch.
     * 
    **/
    where?: TipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tips to fetch.
     * 
    **/
    orderBy?: Enumerable<TipOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tips.
     * 
    **/
    cursor?: TipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tips from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tips.
     * 
    **/
    skip?: number
    distinct?: Enumerable<TipScalarFieldEnum>
  }


  /**
   * Tip create
   */
  export type TipCreateArgs = {
    /**
     * Select specific fields to fetch from the Tip
     * 
    **/
    select?: TipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TipInclude | null
    /**
     * The data needed to create a Tip.
     * 
    **/
    data: XOR<TipCreateInput, TipUncheckedCreateInput>
  }


  /**
   * Tip createMany
   */
  export type TipCreateManyArgs = {
    /**
     * The data used to create many Tips.
     * 
    **/
    data: Enumerable<TipCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Tip update
   */
  export type TipUpdateArgs = {
    /**
     * Select specific fields to fetch from the Tip
     * 
    **/
    select?: TipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TipInclude | null
    /**
     * The data needed to update a Tip.
     * 
    **/
    data: XOR<TipUpdateInput, TipUncheckedUpdateInput>
    /**
     * Choose, which Tip to update.
     * 
    **/
    where: TipWhereUniqueInput
  }


  /**
   * Tip updateMany
   */
  export type TipUpdateManyArgs = {
    /**
     * The data used to update Tips.
     * 
    **/
    data: XOR<TipUpdateManyMutationInput, TipUncheckedUpdateManyInput>
    /**
     * Filter which Tips to update
     * 
    **/
    where?: TipWhereInput
  }


  /**
   * Tip upsert
   */
  export type TipUpsertArgs = {
    /**
     * Select specific fields to fetch from the Tip
     * 
    **/
    select?: TipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TipInclude | null
    /**
     * The filter to search for the Tip to update in case it exists.
     * 
    **/
    where: TipWhereUniqueInput
    /**
     * In case the Tip found by the `where` argument doesn't exist, create a new Tip with this data.
     * 
    **/
    create: XOR<TipCreateInput, TipUncheckedCreateInput>
    /**
     * In case the Tip was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<TipUpdateInput, TipUncheckedUpdateInput>
  }


  /**
   * Tip delete
   */
  export type TipDeleteArgs = {
    /**
     * Select specific fields to fetch from the Tip
     * 
    **/
    select?: TipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TipInclude | null
    /**
     * Filter which Tip to delete.
     * 
    **/
    where: TipWhereUniqueInput
  }


  /**
   * Tip deleteMany
   */
  export type TipDeleteManyArgs = {
    /**
     * Filter which Tips to delete
     * 
    **/
    where?: TipWhereInput
  }


  /**
   * Tip: findUniqueOrThrow
   */
  export type TipFindUniqueOrThrowArgs = TipFindUniqueArgsBase
      

  /**
   * Tip: findFirstOrThrow
   */
  export type TipFindFirstOrThrowArgs = TipFindFirstArgsBase
      

  /**
   * Tip without action
   */
  export type TipArgs = {
    /**
     * Select specific fields to fetch from the Tip
     * 
    **/
    select?: TipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TipInclude | null
  }



  /**
   * Model UserToken
   */


  export type AggregateUserToken = {
    _count: UserTokenCountAggregateOutputType | null
    _avg: UserTokenAvgAggregateOutputType | null
    _sum: UserTokenSumAggregateOutputType | null
    _min: UserTokenMinAggregateOutputType | null
    _max: UserTokenMaxAggregateOutputType | null
  }

  export type UserTokenAvgAggregateOutputType = {
    chainId: number | null
  }

  export type UserTokenSumAggregateOutputType = {
    chainId: number | null
  }

  export type UserTokenMinAggregateOutputType = {
    address: string | null
    symbol: string | null
    name: string | null
    chainId: number | null
    txHash: string | null
    userAddress: string | null
  }

  export type UserTokenMaxAggregateOutputType = {
    address: string | null
    symbol: string | null
    name: string | null
    chainId: number | null
    txHash: string | null
    userAddress: string | null
  }

  export type UserTokenCountAggregateOutputType = {
    address: number
    symbol: number
    name: number
    chainId: number
    txHash: number
    userAddress: number
    _all: number
  }


  export type UserTokenAvgAggregateInputType = {
    chainId?: true
  }

  export type UserTokenSumAggregateInputType = {
    chainId?: true
  }

  export type UserTokenMinAggregateInputType = {
    address?: true
    symbol?: true
    name?: true
    chainId?: true
    txHash?: true
    userAddress?: true
  }

  export type UserTokenMaxAggregateInputType = {
    address?: true
    symbol?: true
    name?: true
    chainId?: true
    txHash?: true
    userAddress?: true
  }

  export type UserTokenCountAggregateInputType = {
    address?: true
    symbol?: true
    name?: true
    chainId?: true
    txHash?: true
    userAddress?: true
    _all?: true
  }

  export type UserTokenAggregateArgs = {
    /**
     * Filter which UserToken to aggregate.
     * 
    **/
    where?: UserTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserTokens to fetch.
     * 
    **/
    orderBy?: Enumerable<UserTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTokens.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserTokens
    **/
    _count?: true | UserTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserTokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserTokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserTokenMaxAggregateInputType
  }

  export type GetUserTokenAggregateType<T extends UserTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateUserToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserToken[P]>
      : GetScalarType<T[P], AggregateUserToken[P]>
  }




  export type UserTokenGroupByArgs = {
    where?: UserTokenWhereInput
    orderBy?: Enumerable<UserTokenOrderByWithAggregationInput>
    by: Array<UserTokenScalarFieldEnum>
    having?: UserTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserTokenCountAggregateInputType | true
    _avg?: UserTokenAvgAggregateInputType
    _sum?: UserTokenSumAggregateInputType
    _min?: UserTokenMinAggregateInputType
    _max?: UserTokenMaxAggregateInputType
  }


  export type UserTokenGroupByOutputType = {
    address: string
    symbol: string
    name: string
    chainId: number
    txHash: string
    userAddress: string
    _count: UserTokenCountAggregateOutputType | null
    _avg: UserTokenAvgAggregateOutputType | null
    _sum: UserTokenSumAggregateOutputType | null
    _min: UserTokenMinAggregateOutputType | null
    _max: UserTokenMaxAggregateOutputType | null
  }

  type GetUserTokenGroupByPayload<T extends UserTokenGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UserTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserTokenGroupByOutputType[P]>
            : GetScalarType<T[P], UserTokenGroupByOutputType[P]>
        }
      >
    >


  export type UserTokenSelect = {
    address?: boolean
    symbol?: boolean
    name?: boolean
    chainId?: boolean
    txHash?: boolean
    user?: boolean | UserArgs
    userAddress?: boolean
    Tip?: boolean | TipFindManyArgs
    _count?: boolean | UserTokenCountOutputTypeArgs
  }

  export type UserTokenInclude = {
    user?: boolean | UserArgs
    Tip?: boolean | TipFindManyArgs
    _count?: boolean | UserTokenCountOutputTypeArgs
  }

  export type UserTokenGetPayload<
    S extends boolean | null | undefined | UserTokenArgs,
    U = keyof S
      > = S extends true
        ? UserToken
    : S extends undefined
    ? never
    : S extends UserTokenArgs | UserTokenFindManyArgs
    ?'include' extends U
    ? UserToken  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> :
        P extends 'Tip' ? Array < TipGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? UserTokenCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> :
        P extends 'Tip' ? Array < TipGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? UserTokenCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof UserToken ? UserToken[P] : never
  } 
    : UserToken
  : UserToken


  type UserTokenCountArgs = Merge<
    Omit<UserTokenFindManyArgs, 'select' | 'include'> & {
      select?: UserTokenCountAggregateInputType | true
    }
  >

  export interface UserTokenDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one UserToken that matches the filter.
     * @param {UserTokenFindUniqueArgs} args - Arguments to find a UserToken
     * @example
     * // Get one UserToken
     * const userToken = await prisma.userToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserTokenFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserTokenFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'UserToken'> extends True ? CheckSelect<T, Prisma__UserTokenClient<UserToken>, Prisma__UserTokenClient<UserTokenGetPayload<T>>> : CheckSelect<T, Prisma__UserTokenClient<UserToken | null, null>, Prisma__UserTokenClient<UserTokenGetPayload<T> | null, null>>

    /**
     * Find the first UserToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTokenFindFirstArgs} args - Arguments to find a UserToken
     * @example
     * // Get one UserToken
     * const userToken = await prisma.userToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserTokenFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserTokenFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'UserToken'> extends True ? CheckSelect<T, Prisma__UserTokenClient<UserToken>, Prisma__UserTokenClient<UserTokenGetPayload<T>>> : CheckSelect<T, Prisma__UserTokenClient<UserToken | null, null>, Prisma__UserTokenClient<UserTokenGetPayload<T> | null, null>>

    /**
     * Find zero or more UserTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTokenFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserTokens
     * const userTokens = await prisma.userToken.findMany()
     * 
     * // Get first 10 UserTokens
     * const userTokens = await prisma.userToken.findMany({ take: 10 })
     * 
     * // Only select the `address`
     * const userTokenWithAddressOnly = await prisma.userToken.findMany({ select: { address: true } })
     * 
    **/
    findMany<T extends UserTokenFindManyArgs>(
      args?: SelectSubset<T, UserTokenFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<UserToken>>, PrismaPromise<Array<UserTokenGetPayload<T>>>>

    /**
     * Create a UserToken.
     * @param {UserTokenCreateArgs} args - Arguments to create a UserToken.
     * @example
     * // Create one UserToken
     * const UserToken = await prisma.userToken.create({
     *   data: {
     *     // ... data to create a UserToken
     *   }
     * })
     * 
    **/
    create<T extends UserTokenCreateArgs>(
      args: SelectSubset<T, UserTokenCreateArgs>
    ): CheckSelect<T, Prisma__UserTokenClient<UserToken>, Prisma__UserTokenClient<UserTokenGetPayload<T>>>

    /**
     * Create many UserTokens.
     *     @param {UserTokenCreateManyArgs} args - Arguments to create many UserTokens.
     *     @example
     *     // Create many UserTokens
     *     const userToken = await prisma.userToken.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserTokenCreateManyArgs>(
      args?: SelectSubset<T, UserTokenCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a UserToken.
     * @param {UserTokenDeleteArgs} args - Arguments to delete one UserToken.
     * @example
     * // Delete one UserToken
     * const UserToken = await prisma.userToken.delete({
     *   where: {
     *     // ... filter to delete one UserToken
     *   }
     * })
     * 
    **/
    delete<T extends UserTokenDeleteArgs>(
      args: SelectSubset<T, UserTokenDeleteArgs>
    ): CheckSelect<T, Prisma__UserTokenClient<UserToken>, Prisma__UserTokenClient<UserTokenGetPayload<T>>>

    /**
     * Update one UserToken.
     * @param {UserTokenUpdateArgs} args - Arguments to update one UserToken.
     * @example
     * // Update one UserToken
     * const userToken = await prisma.userToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserTokenUpdateArgs>(
      args: SelectSubset<T, UserTokenUpdateArgs>
    ): CheckSelect<T, Prisma__UserTokenClient<UserToken>, Prisma__UserTokenClient<UserTokenGetPayload<T>>>

    /**
     * Delete zero or more UserTokens.
     * @param {UserTokenDeleteManyArgs} args - Arguments to filter UserTokens to delete.
     * @example
     * // Delete a few UserTokens
     * const { count } = await prisma.userToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserTokenDeleteManyArgs>(
      args?: SelectSubset<T, UserTokenDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserTokens
     * const userToken = await prisma.userToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserTokenUpdateManyArgs>(
      args: SelectSubset<T, UserTokenUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one UserToken.
     * @param {UserTokenUpsertArgs} args - Arguments to update or create a UserToken.
     * @example
     * // Update or create a UserToken
     * const userToken = await prisma.userToken.upsert({
     *   create: {
     *     // ... data to create a UserToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserToken we want to update
     *   }
     * })
    **/
    upsert<T extends UserTokenUpsertArgs>(
      args: SelectSubset<T, UserTokenUpsertArgs>
    ): CheckSelect<T, Prisma__UserTokenClient<UserToken>, Prisma__UserTokenClient<UserTokenGetPayload<T>>>

    /**
     * Find one UserToken that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {UserTokenFindUniqueOrThrowArgs} args - Arguments to find a UserToken
     * @example
     * // Get one UserToken
     * const userToken = await prisma.userToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserTokenFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserTokenFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__UserTokenClient<UserToken>, Prisma__UserTokenClient<UserTokenGetPayload<T>>>

    /**
     * Find the first UserToken that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTokenFindFirstOrThrowArgs} args - Arguments to find a UserToken
     * @example
     * // Get one UserToken
     * const userToken = await prisma.userToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserTokenFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserTokenFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__UserTokenClient<UserToken>, Prisma__UserTokenClient<UserTokenGetPayload<T>>>

    /**
     * Count the number of UserTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTokenCountArgs} args - Arguments to filter UserTokens to count.
     * @example
     * // Count the number of UserTokens
     * const count = await prisma.userToken.count({
     *   where: {
     *     // ... the filter for the UserTokens we want to count
     *   }
     * })
    **/
    count<T extends UserTokenCountArgs>(
      args?: Subset<T, UserTokenCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserTokenAggregateArgs>(args: Subset<T, UserTokenAggregateArgs>): PrismaPromise<GetUserTokenAggregateType<T>>

    /**
     * Group by UserToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserTokenGroupByArgs['orderBy'] }
        : { orderBy?: UserTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserTokenGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for UserToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserTokenClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

    Tip<T extends TipFindManyArgs = {}>(args?: Subset<T, TipFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Tip>| Null>, PrismaPromise<Array<TipGetPayload<T>>| Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * UserToken base type for findUnique actions
   */
  export type UserTokenFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the UserToken
     * 
    **/
    select?: UserTokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserTokenInclude | null
    /**
     * Filter, which UserToken to fetch.
     * 
    **/
    where: UserTokenWhereUniqueInput
  }

  /**
   * UserToken: findUnique
   */
  export interface UserTokenFindUniqueArgs extends UserTokenFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * UserToken base type for findFirst actions
   */
  export type UserTokenFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the UserToken
     * 
    **/
    select?: UserTokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserTokenInclude | null
    /**
     * Filter, which UserToken to fetch.
     * 
    **/
    where?: UserTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserTokens to fetch.
     * 
    **/
    orderBy?: Enumerable<UserTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserTokens.
     * 
    **/
    cursor?: UserTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTokens.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserTokens.
     * 
    **/
    distinct?: Enumerable<UserTokenScalarFieldEnum>
  }

  /**
   * UserToken: findFirst
   */
  export interface UserTokenFindFirstArgs extends UserTokenFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * UserToken findMany
   */
  export type UserTokenFindManyArgs = {
    /**
     * Select specific fields to fetch from the UserToken
     * 
    **/
    select?: UserTokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserTokenInclude | null
    /**
     * Filter, which UserTokens to fetch.
     * 
    **/
    where?: UserTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserTokens to fetch.
     * 
    **/
    orderBy?: Enumerable<UserTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserTokens.
     * 
    **/
    cursor?: UserTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserTokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserTokens.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserTokenScalarFieldEnum>
  }


  /**
   * UserToken create
   */
  export type UserTokenCreateArgs = {
    /**
     * Select specific fields to fetch from the UserToken
     * 
    **/
    select?: UserTokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserTokenInclude | null
    /**
     * The data needed to create a UserToken.
     * 
    **/
    data: XOR<UserTokenCreateInput, UserTokenUncheckedCreateInput>
  }


  /**
   * UserToken createMany
   */
  export type UserTokenCreateManyArgs = {
    /**
     * The data used to create many UserTokens.
     * 
    **/
    data: Enumerable<UserTokenCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * UserToken update
   */
  export type UserTokenUpdateArgs = {
    /**
     * Select specific fields to fetch from the UserToken
     * 
    **/
    select?: UserTokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserTokenInclude | null
    /**
     * The data needed to update a UserToken.
     * 
    **/
    data: XOR<UserTokenUpdateInput, UserTokenUncheckedUpdateInput>
    /**
     * Choose, which UserToken to update.
     * 
    **/
    where: UserTokenWhereUniqueInput
  }


  /**
   * UserToken updateMany
   */
  export type UserTokenUpdateManyArgs = {
    /**
     * The data used to update UserTokens.
     * 
    **/
    data: XOR<UserTokenUpdateManyMutationInput, UserTokenUncheckedUpdateManyInput>
    /**
     * Filter which UserTokens to update
     * 
    **/
    where?: UserTokenWhereInput
  }


  /**
   * UserToken upsert
   */
  export type UserTokenUpsertArgs = {
    /**
     * Select specific fields to fetch from the UserToken
     * 
    **/
    select?: UserTokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserTokenInclude | null
    /**
     * The filter to search for the UserToken to update in case it exists.
     * 
    **/
    where: UserTokenWhereUniqueInput
    /**
     * In case the UserToken found by the `where` argument doesn't exist, create a new UserToken with this data.
     * 
    **/
    create: XOR<UserTokenCreateInput, UserTokenUncheckedCreateInput>
    /**
     * In case the UserToken was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserTokenUpdateInput, UserTokenUncheckedUpdateInput>
  }


  /**
   * UserToken delete
   */
  export type UserTokenDeleteArgs = {
    /**
     * Select specific fields to fetch from the UserToken
     * 
    **/
    select?: UserTokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserTokenInclude | null
    /**
     * Filter which UserToken to delete.
     * 
    **/
    where: UserTokenWhereUniqueInput
  }


  /**
   * UserToken deleteMany
   */
  export type UserTokenDeleteManyArgs = {
    /**
     * Filter which UserTokens to delete
     * 
    **/
    where?: UserTokenWhereInput
  }


  /**
   * UserToken: findUniqueOrThrow
   */
  export type UserTokenFindUniqueOrThrowArgs = UserTokenFindUniqueArgsBase
      

  /**
   * UserToken: findFirstOrThrow
   */
  export type UserTokenFindFirstOrThrowArgs = UserTokenFindFirstArgsBase
      

  /**
   * UserToken without action
   */
  export type UserTokenArgs = {
    /**
     * Select specific fields to fetch from the UserToken
     * 
    **/
    select?: UserTokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserTokenInclude | null
  }



  /**
   * Model Widget
   */


  export type AggregateWidget = {
    _count: WidgetCountAggregateOutputType | null
    _avg: WidgetAvgAggregateOutputType | null
    _sum: WidgetSumAggregateOutputType | null
    _min: WidgetMinAggregateOutputType | null
    _max: WidgetMaxAggregateOutputType | null
  }

  export type WidgetAvgAggregateOutputType = {
    showTime: number | null
  }

  export type WidgetSumAggregateOutputType = {
    showTime: number | null
  }

  export type WidgetMinAggregateOutputType = {
    id: string | null
    url: string | null
    songPath: string | null
    backgroundPath: string | null
    nickColor: string | null
    messageColor: string | null
    valueColor: string | null
    showTime: number | null
    filterProfanity: boolean | null
    voiceMessage: boolean | null
    streamerAddress: string | null
  }

  export type WidgetMaxAggregateOutputType = {
    id: string | null
    url: string | null
    songPath: string | null
    backgroundPath: string | null
    nickColor: string | null
    messageColor: string | null
    valueColor: string | null
    showTime: number | null
    filterProfanity: boolean | null
    voiceMessage: boolean | null
    streamerAddress: string | null
  }

  export type WidgetCountAggregateOutputType = {
    id: number
    url: number
    songPath: number
    backgroundPath: number
    nickColor: number
    messageColor: number
    valueColor: number
    showTime: number
    filterProfanity: number
    voiceMessage: number
    streamerAddress: number
    _all: number
  }


  export type WidgetAvgAggregateInputType = {
    showTime?: true
  }

  export type WidgetSumAggregateInputType = {
    showTime?: true
  }

  export type WidgetMinAggregateInputType = {
    id?: true
    url?: true
    songPath?: true
    backgroundPath?: true
    nickColor?: true
    messageColor?: true
    valueColor?: true
    showTime?: true
    filterProfanity?: true
    voiceMessage?: true
    streamerAddress?: true
  }

  export type WidgetMaxAggregateInputType = {
    id?: true
    url?: true
    songPath?: true
    backgroundPath?: true
    nickColor?: true
    messageColor?: true
    valueColor?: true
    showTime?: true
    filterProfanity?: true
    voiceMessage?: true
    streamerAddress?: true
  }

  export type WidgetCountAggregateInputType = {
    id?: true
    url?: true
    songPath?: true
    backgroundPath?: true
    nickColor?: true
    messageColor?: true
    valueColor?: true
    showTime?: true
    filterProfanity?: true
    voiceMessage?: true
    streamerAddress?: true
    _all?: true
  }

  export type WidgetAggregateArgs = {
    /**
     * Filter which Widget to aggregate.
     * 
    **/
    where?: WidgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Widgets to fetch.
     * 
    **/
    orderBy?: Enumerable<WidgetOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: WidgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Widgets from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Widgets.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Widgets
    **/
    _count?: true | WidgetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WidgetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WidgetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WidgetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WidgetMaxAggregateInputType
  }

  export type GetWidgetAggregateType<T extends WidgetAggregateArgs> = {
        [P in keyof T & keyof AggregateWidget]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWidget[P]>
      : GetScalarType<T[P], AggregateWidget[P]>
  }




  export type WidgetGroupByArgs = {
    where?: WidgetWhereInput
    orderBy?: Enumerable<WidgetOrderByWithAggregationInput>
    by: Array<WidgetScalarFieldEnum>
    having?: WidgetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WidgetCountAggregateInputType | true
    _avg?: WidgetAvgAggregateInputType
    _sum?: WidgetSumAggregateInputType
    _min?: WidgetMinAggregateInputType
    _max?: WidgetMaxAggregateInputType
  }


  export type WidgetGroupByOutputType = {
    id: string
    url: string
    songPath: string
    backgroundPath: string
    nickColor: string
    messageColor: string
    valueColor: string
    showTime: number
    filterProfanity: boolean
    voiceMessage: boolean
    streamerAddress: string | null
    _count: WidgetCountAggregateOutputType | null
    _avg: WidgetAvgAggregateOutputType | null
    _sum: WidgetSumAggregateOutputType | null
    _min: WidgetMinAggregateOutputType | null
    _max: WidgetMaxAggregateOutputType | null
  }

  type GetWidgetGroupByPayload<T extends WidgetGroupByArgs> = PrismaPromise<
    Array<
      PickArray<WidgetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WidgetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WidgetGroupByOutputType[P]>
            : GetScalarType<T[P], WidgetGroupByOutputType[P]>
        }
      >
    >


  export type WidgetSelect = {
    id?: boolean
    url?: boolean
    songPath?: boolean
    backgroundPath?: boolean
    nickColor?: boolean
    messageColor?: boolean
    valueColor?: boolean
    showTime?: boolean
    filterProfanity?: boolean
    voiceMessage?: boolean
    Streamer?: boolean | StreamerArgs
    streamerAddress?: boolean
  }

  export type WidgetInclude = {
    Streamer?: boolean | StreamerArgs
  }

  export type WidgetGetPayload<
    S extends boolean | null | undefined | WidgetArgs,
    U = keyof S
      > = S extends true
        ? Widget
    : S extends undefined
    ? never
    : S extends WidgetArgs | WidgetFindManyArgs
    ?'include' extends U
    ? Widget  & {
    [P in TrueKeys<S['include']>]:
        P extends 'Streamer' ? StreamerGetPayload<Exclude<S['include'], undefined | null>[P]> | null :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'Streamer' ? StreamerGetPayload<Exclude<S['select'], undefined | null>[P]> | null :  P extends keyof Widget ? Widget[P] : never
  } 
    : Widget
  : Widget


  type WidgetCountArgs = Merge<
    Omit<WidgetFindManyArgs, 'select' | 'include'> & {
      select?: WidgetCountAggregateInputType | true
    }
  >

  export interface WidgetDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Widget that matches the filter.
     * @param {WidgetFindUniqueArgs} args - Arguments to find a Widget
     * @example
     * // Get one Widget
     * const widget = await prisma.widget.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends WidgetFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, WidgetFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Widget'> extends True ? CheckSelect<T, Prisma__WidgetClient<Widget>, Prisma__WidgetClient<WidgetGetPayload<T>>> : CheckSelect<T, Prisma__WidgetClient<Widget | null, null>, Prisma__WidgetClient<WidgetGetPayload<T> | null, null>>

    /**
     * Find the first Widget that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WidgetFindFirstArgs} args - Arguments to find a Widget
     * @example
     * // Get one Widget
     * const widget = await prisma.widget.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends WidgetFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, WidgetFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Widget'> extends True ? CheckSelect<T, Prisma__WidgetClient<Widget>, Prisma__WidgetClient<WidgetGetPayload<T>>> : CheckSelect<T, Prisma__WidgetClient<Widget | null, null>, Prisma__WidgetClient<WidgetGetPayload<T> | null, null>>

    /**
     * Find zero or more Widgets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WidgetFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Widgets
     * const widgets = await prisma.widget.findMany()
     * 
     * // Get first 10 Widgets
     * const widgets = await prisma.widget.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const widgetWithIdOnly = await prisma.widget.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends WidgetFindManyArgs>(
      args?: SelectSubset<T, WidgetFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Widget>>, PrismaPromise<Array<WidgetGetPayload<T>>>>

    /**
     * Create a Widget.
     * @param {WidgetCreateArgs} args - Arguments to create a Widget.
     * @example
     * // Create one Widget
     * const Widget = await prisma.widget.create({
     *   data: {
     *     // ... data to create a Widget
     *   }
     * })
     * 
    **/
    create<T extends WidgetCreateArgs>(
      args: SelectSubset<T, WidgetCreateArgs>
    ): CheckSelect<T, Prisma__WidgetClient<Widget>, Prisma__WidgetClient<WidgetGetPayload<T>>>

    /**
     * Create many Widgets.
     *     @param {WidgetCreateManyArgs} args - Arguments to create many Widgets.
     *     @example
     *     // Create many Widgets
     *     const widget = await prisma.widget.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends WidgetCreateManyArgs>(
      args?: SelectSubset<T, WidgetCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Widget.
     * @param {WidgetDeleteArgs} args - Arguments to delete one Widget.
     * @example
     * // Delete one Widget
     * const Widget = await prisma.widget.delete({
     *   where: {
     *     // ... filter to delete one Widget
     *   }
     * })
     * 
    **/
    delete<T extends WidgetDeleteArgs>(
      args: SelectSubset<T, WidgetDeleteArgs>
    ): CheckSelect<T, Prisma__WidgetClient<Widget>, Prisma__WidgetClient<WidgetGetPayload<T>>>

    /**
     * Update one Widget.
     * @param {WidgetUpdateArgs} args - Arguments to update one Widget.
     * @example
     * // Update one Widget
     * const widget = await prisma.widget.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends WidgetUpdateArgs>(
      args: SelectSubset<T, WidgetUpdateArgs>
    ): CheckSelect<T, Prisma__WidgetClient<Widget>, Prisma__WidgetClient<WidgetGetPayload<T>>>

    /**
     * Delete zero or more Widgets.
     * @param {WidgetDeleteManyArgs} args - Arguments to filter Widgets to delete.
     * @example
     * // Delete a few Widgets
     * const { count } = await prisma.widget.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends WidgetDeleteManyArgs>(
      args?: SelectSubset<T, WidgetDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Widgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WidgetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Widgets
     * const widget = await prisma.widget.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends WidgetUpdateManyArgs>(
      args: SelectSubset<T, WidgetUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Widget.
     * @param {WidgetUpsertArgs} args - Arguments to update or create a Widget.
     * @example
     * // Update or create a Widget
     * const widget = await prisma.widget.upsert({
     *   create: {
     *     // ... data to create a Widget
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Widget we want to update
     *   }
     * })
    **/
    upsert<T extends WidgetUpsertArgs>(
      args: SelectSubset<T, WidgetUpsertArgs>
    ): CheckSelect<T, Prisma__WidgetClient<Widget>, Prisma__WidgetClient<WidgetGetPayload<T>>>

    /**
     * Find one Widget that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {WidgetFindUniqueOrThrowArgs} args - Arguments to find a Widget
     * @example
     * // Get one Widget
     * const widget = await prisma.widget.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends WidgetFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, WidgetFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__WidgetClient<Widget>, Prisma__WidgetClient<WidgetGetPayload<T>>>

    /**
     * Find the first Widget that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WidgetFindFirstOrThrowArgs} args - Arguments to find a Widget
     * @example
     * // Get one Widget
     * const widget = await prisma.widget.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends WidgetFindFirstOrThrowArgs>(
      args?: SelectSubset<T, WidgetFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__WidgetClient<Widget>, Prisma__WidgetClient<WidgetGetPayload<T>>>

    /**
     * Count the number of Widgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WidgetCountArgs} args - Arguments to filter Widgets to count.
     * @example
     * // Count the number of Widgets
     * const count = await prisma.widget.count({
     *   where: {
     *     // ... the filter for the Widgets we want to count
     *   }
     * })
    **/
    count<T extends WidgetCountArgs>(
      args?: Subset<T, WidgetCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WidgetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Widget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WidgetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WidgetAggregateArgs>(args: Subset<T, WidgetAggregateArgs>): PrismaPromise<GetWidgetAggregateType<T>>

    /**
     * Group by Widget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WidgetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WidgetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WidgetGroupByArgs['orderBy'] }
        : { orderBy?: WidgetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WidgetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWidgetGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Widget.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__WidgetClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    Streamer<T extends StreamerArgs = {}>(args?: Subset<T, StreamerArgs>): CheckSelect<T, Prisma__StreamerClient<Streamer | Null>, Prisma__StreamerClient<StreamerGetPayload<T> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Widget base type for findUnique actions
   */
  export type WidgetFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Widget
     * 
    **/
    select?: WidgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WidgetInclude | null
    /**
     * Filter, which Widget to fetch.
     * 
    **/
    where: WidgetWhereUniqueInput
  }

  /**
   * Widget: findUnique
   */
  export interface WidgetFindUniqueArgs extends WidgetFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Widget base type for findFirst actions
   */
  export type WidgetFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Widget
     * 
    **/
    select?: WidgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WidgetInclude | null
    /**
     * Filter, which Widget to fetch.
     * 
    **/
    where?: WidgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Widgets to fetch.
     * 
    **/
    orderBy?: Enumerable<WidgetOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Widgets.
     * 
    **/
    cursor?: WidgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Widgets from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Widgets.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Widgets.
     * 
    **/
    distinct?: Enumerable<WidgetScalarFieldEnum>
  }

  /**
   * Widget: findFirst
   */
  export interface WidgetFindFirstArgs extends WidgetFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Widget findMany
   */
  export type WidgetFindManyArgs = {
    /**
     * Select specific fields to fetch from the Widget
     * 
    **/
    select?: WidgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WidgetInclude | null
    /**
     * Filter, which Widgets to fetch.
     * 
    **/
    where?: WidgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Widgets to fetch.
     * 
    **/
    orderBy?: Enumerable<WidgetOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Widgets.
     * 
    **/
    cursor?: WidgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Widgets from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Widgets.
     * 
    **/
    skip?: number
    distinct?: Enumerable<WidgetScalarFieldEnum>
  }


  /**
   * Widget create
   */
  export type WidgetCreateArgs = {
    /**
     * Select specific fields to fetch from the Widget
     * 
    **/
    select?: WidgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WidgetInclude | null
    /**
     * The data needed to create a Widget.
     * 
    **/
    data: XOR<WidgetCreateInput, WidgetUncheckedCreateInput>
  }


  /**
   * Widget createMany
   */
  export type WidgetCreateManyArgs = {
    /**
     * The data used to create many Widgets.
     * 
    **/
    data: Enumerable<WidgetCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Widget update
   */
  export type WidgetUpdateArgs = {
    /**
     * Select specific fields to fetch from the Widget
     * 
    **/
    select?: WidgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WidgetInclude | null
    /**
     * The data needed to update a Widget.
     * 
    **/
    data: XOR<WidgetUpdateInput, WidgetUncheckedUpdateInput>
    /**
     * Choose, which Widget to update.
     * 
    **/
    where: WidgetWhereUniqueInput
  }


  /**
   * Widget updateMany
   */
  export type WidgetUpdateManyArgs = {
    /**
     * The data used to update Widgets.
     * 
    **/
    data: XOR<WidgetUpdateManyMutationInput, WidgetUncheckedUpdateManyInput>
    /**
     * Filter which Widgets to update
     * 
    **/
    where?: WidgetWhereInput
  }


  /**
   * Widget upsert
   */
  export type WidgetUpsertArgs = {
    /**
     * Select specific fields to fetch from the Widget
     * 
    **/
    select?: WidgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WidgetInclude | null
    /**
     * The filter to search for the Widget to update in case it exists.
     * 
    **/
    where: WidgetWhereUniqueInput
    /**
     * In case the Widget found by the `where` argument doesn't exist, create a new Widget with this data.
     * 
    **/
    create: XOR<WidgetCreateInput, WidgetUncheckedCreateInput>
    /**
     * In case the Widget was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<WidgetUpdateInput, WidgetUncheckedUpdateInput>
  }


  /**
   * Widget delete
   */
  export type WidgetDeleteArgs = {
    /**
     * Select specific fields to fetch from the Widget
     * 
    **/
    select?: WidgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WidgetInclude | null
    /**
     * Filter which Widget to delete.
     * 
    **/
    where: WidgetWhereUniqueInput
  }


  /**
   * Widget deleteMany
   */
  export type WidgetDeleteManyArgs = {
    /**
     * Filter which Widgets to delete
     * 
    **/
    where?: WidgetWhereInput
  }


  /**
   * Widget: findUniqueOrThrow
   */
  export type WidgetFindUniqueOrThrowArgs = WidgetFindUniqueArgsBase
      

  /**
   * Widget: findFirstOrThrow
   */
  export type WidgetFindFirstOrThrowArgs = WidgetFindFirstArgsBase
      

  /**
   * Widget without action
   */
  export type WidgetArgs = {
    /**
     * Select specific fields to fetch from the Widget
     * 
    **/
    select?: WidgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WidgetInclude | null
  }



  /**
   * Model Token
   */


  export type AggregateToken = {
    _count: TokenCountAggregateOutputType | null
    _avg: TokenAvgAggregateOutputType | null
    _sum: TokenSumAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
  }

  export type TokenAvgAggregateOutputType = {
    chainId: number | null
    latestPrice: Decimal | null
  }

  export type TokenSumAggregateOutputType = {
    chainId: number | null
    latestPrice: Decimal | null
  }

  export type TokenMinAggregateOutputType = {
    address: string | null
    symbol: string | null
    name: string | null
    chainId: number | null
    imageId: string | null
    latestPrice: Decimal | null
    priceUpdateAt: Date | null
    streamerAddress: string | null
  }

  export type TokenMaxAggregateOutputType = {
    address: string | null
    symbol: string | null
    name: string | null
    chainId: number | null
    imageId: string | null
    latestPrice: Decimal | null
    priceUpdateAt: Date | null
    streamerAddress: string | null
  }

  export type TokenCountAggregateOutputType = {
    address: number
    symbol: number
    name: number
    chainId: number
    imageId: number
    latestPrice: number
    priceUpdateAt: number
    streamerAddress: number
    _all: number
  }


  export type TokenAvgAggregateInputType = {
    chainId?: true
    latestPrice?: true
  }

  export type TokenSumAggregateInputType = {
    chainId?: true
    latestPrice?: true
  }

  export type TokenMinAggregateInputType = {
    address?: true
    symbol?: true
    name?: true
    chainId?: true
    imageId?: true
    latestPrice?: true
    priceUpdateAt?: true
    streamerAddress?: true
  }

  export type TokenMaxAggregateInputType = {
    address?: true
    symbol?: true
    name?: true
    chainId?: true
    imageId?: true
    latestPrice?: true
    priceUpdateAt?: true
    streamerAddress?: true
  }

  export type TokenCountAggregateInputType = {
    address?: true
    symbol?: true
    name?: true
    chainId?: true
    imageId?: true
    latestPrice?: true
    priceUpdateAt?: true
    streamerAddress?: true
    _all?: true
  }

  export type TokenAggregateArgs = {
    /**
     * Filter which Token to aggregate.
     * 
    **/
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     * 
    **/
    orderBy?: Enumerable<TokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tokens
    **/
    _count?: true | TokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TokenMaxAggregateInputType
  }

  export type GetTokenAggregateType<T extends TokenAggregateArgs> = {
        [P in keyof T & keyof AggregateToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateToken[P]>
      : GetScalarType<T[P], AggregateToken[P]>
  }




  export type TokenGroupByArgs = {
    where?: TokenWhereInput
    orderBy?: Enumerable<TokenOrderByWithAggregationInput>
    by: Array<TokenScalarFieldEnum>
    having?: TokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TokenCountAggregateInputType | true
    _avg?: TokenAvgAggregateInputType
    _sum?: TokenSumAggregateInputType
    _min?: TokenMinAggregateInputType
    _max?: TokenMaxAggregateInputType
  }


  export type TokenGroupByOutputType = {
    address: string
    symbol: string
    name: string
    chainId: number
    imageId: string | null
    latestPrice: Decimal | null
    priceUpdateAt: Date | null
    streamerAddress: string | null
    _count: TokenCountAggregateOutputType | null
    _avg: TokenAvgAggregateOutputType | null
    _sum: TokenSumAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
  }

  type GetTokenGroupByPayload<T extends TokenGroupByArgs> = PrismaPromise<
    Array<
      PickArray<TokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TokenGroupByOutputType[P]>
            : GetScalarType<T[P], TokenGroupByOutputType[P]>
        }
      >
    >


  export type TokenSelect = {
    address?: boolean
    symbol?: boolean
    name?: boolean
    chainId?: boolean
    image?: boolean | FileArgs
    imageId?: boolean
    latestPrice?: boolean
    priceUpdateAt?: boolean
    Streamer?: boolean | StreamerArgs
    streamerAddress?: boolean
    Tip?: boolean | TipFindManyArgs
    _count?: boolean | TokenCountOutputTypeArgs
  }

  export type TokenInclude = {
    image?: boolean | FileArgs
    Streamer?: boolean | StreamerArgs
    Tip?: boolean | TipFindManyArgs
    _count?: boolean | TokenCountOutputTypeArgs
  }

  export type TokenGetPayload<
    S extends boolean | null | undefined | TokenArgs,
    U = keyof S
      > = S extends true
        ? Token
    : S extends undefined
    ? never
    : S extends TokenArgs | TokenFindManyArgs
    ?'include' extends U
    ? Token  & {
    [P in TrueKeys<S['include']>]:
        P extends 'image' ? FileGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
        P extends 'Streamer' ? StreamerGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
        P extends 'Tip' ? Array < TipGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? TokenCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'image' ? FileGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
        P extends 'Streamer' ? StreamerGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
        P extends 'Tip' ? Array < TipGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? TokenCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Token ? Token[P] : never
  } 
    : Token
  : Token


  type TokenCountArgs = Merge<
    Omit<TokenFindManyArgs, 'select' | 'include'> & {
      select?: TokenCountAggregateInputType | true
    }
  >

  export interface TokenDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Token that matches the filter.
     * @param {TokenFindUniqueArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TokenFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TokenFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Token'> extends True ? CheckSelect<T, Prisma__TokenClient<Token>, Prisma__TokenClient<TokenGetPayload<T>>> : CheckSelect<T, Prisma__TokenClient<Token | null, null>, Prisma__TokenClient<TokenGetPayload<T> | null, null>>

    /**
     * Find the first Token that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindFirstArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TokenFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TokenFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Token'> extends True ? CheckSelect<T, Prisma__TokenClient<Token>, Prisma__TokenClient<TokenGetPayload<T>>> : CheckSelect<T, Prisma__TokenClient<Token | null, null>, Prisma__TokenClient<TokenGetPayload<T> | null, null>>

    /**
     * Find zero or more Tokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tokens
     * const tokens = await prisma.token.findMany()
     * 
     * // Get first 10 Tokens
     * const tokens = await prisma.token.findMany({ take: 10 })
     * 
     * // Only select the `address`
     * const tokenWithAddressOnly = await prisma.token.findMany({ select: { address: true } })
     * 
    **/
    findMany<T extends TokenFindManyArgs>(
      args?: SelectSubset<T, TokenFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Token>>, PrismaPromise<Array<TokenGetPayload<T>>>>

    /**
     * Create a Token.
     * @param {TokenCreateArgs} args - Arguments to create a Token.
     * @example
     * // Create one Token
     * const Token = await prisma.token.create({
     *   data: {
     *     // ... data to create a Token
     *   }
     * })
     * 
    **/
    create<T extends TokenCreateArgs>(
      args: SelectSubset<T, TokenCreateArgs>
    ): CheckSelect<T, Prisma__TokenClient<Token>, Prisma__TokenClient<TokenGetPayload<T>>>

    /**
     * Create many Tokens.
     *     @param {TokenCreateManyArgs} args - Arguments to create many Tokens.
     *     @example
     *     // Create many Tokens
     *     const token = await prisma.token.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TokenCreateManyArgs>(
      args?: SelectSubset<T, TokenCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Token.
     * @param {TokenDeleteArgs} args - Arguments to delete one Token.
     * @example
     * // Delete one Token
     * const Token = await prisma.token.delete({
     *   where: {
     *     // ... filter to delete one Token
     *   }
     * })
     * 
    **/
    delete<T extends TokenDeleteArgs>(
      args: SelectSubset<T, TokenDeleteArgs>
    ): CheckSelect<T, Prisma__TokenClient<Token>, Prisma__TokenClient<TokenGetPayload<T>>>

    /**
     * Update one Token.
     * @param {TokenUpdateArgs} args - Arguments to update one Token.
     * @example
     * // Update one Token
     * const token = await prisma.token.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TokenUpdateArgs>(
      args: SelectSubset<T, TokenUpdateArgs>
    ): CheckSelect<T, Prisma__TokenClient<Token>, Prisma__TokenClient<TokenGetPayload<T>>>

    /**
     * Delete zero or more Tokens.
     * @param {TokenDeleteManyArgs} args - Arguments to filter Tokens to delete.
     * @example
     * // Delete a few Tokens
     * const { count } = await prisma.token.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TokenDeleteManyArgs>(
      args?: SelectSubset<T, TokenDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tokens
     * const token = await prisma.token.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TokenUpdateManyArgs>(
      args: SelectSubset<T, TokenUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Token.
     * @param {TokenUpsertArgs} args - Arguments to update or create a Token.
     * @example
     * // Update or create a Token
     * const token = await prisma.token.upsert({
     *   create: {
     *     // ... data to create a Token
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Token we want to update
     *   }
     * })
    **/
    upsert<T extends TokenUpsertArgs>(
      args: SelectSubset<T, TokenUpsertArgs>
    ): CheckSelect<T, Prisma__TokenClient<Token>, Prisma__TokenClient<TokenGetPayload<T>>>

    /**
     * Find one Token that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {TokenFindUniqueOrThrowArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TokenFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, TokenFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__TokenClient<Token>, Prisma__TokenClient<TokenGetPayload<T>>>

    /**
     * Find the first Token that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindFirstOrThrowArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TokenFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TokenFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__TokenClient<Token>, Prisma__TokenClient<TokenGetPayload<T>>>

    /**
     * Count the number of Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenCountArgs} args - Arguments to filter Tokens to count.
     * @example
     * // Count the number of Tokens
     * const count = await prisma.token.count({
     *   where: {
     *     // ... the filter for the Tokens we want to count
     *   }
     * })
    **/
    count<T extends TokenCountArgs>(
      args?: Subset<T, TokenCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TokenAggregateArgs>(args: Subset<T, TokenAggregateArgs>): PrismaPromise<GetTokenAggregateType<T>>

    /**
     * Group by Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TokenGroupByArgs['orderBy'] }
        : { orderBy?: TokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTokenGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Token.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TokenClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    image<T extends FileArgs = {}>(args?: Subset<T, FileArgs>): CheckSelect<T, Prisma__FileClient<File | Null>, Prisma__FileClient<FileGetPayload<T> | Null>>;

    Streamer<T extends StreamerArgs = {}>(args?: Subset<T, StreamerArgs>): CheckSelect<T, Prisma__StreamerClient<Streamer | Null>, Prisma__StreamerClient<StreamerGetPayload<T> | Null>>;

    Tip<T extends TipFindManyArgs = {}>(args?: Subset<T, TipFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Tip>| Null>, PrismaPromise<Array<TipGetPayload<T>>| Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Token base type for findUnique actions
   */
  export type TokenFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Token
     * 
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TokenInclude | null
    /**
     * Filter, which Token to fetch.
     * 
    **/
    where: TokenWhereUniqueInput
  }

  /**
   * Token: findUnique
   */
  export interface TokenFindUniqueArgs extends TokenFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Token base type for findFirst actions
   */
  export type TokenFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Token
     * 
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TokenInclude | null
    /**
     * Filter, which Token to fetch.
     * 
    **/
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     * 
    **/
    orderBy?: Enumerable<TokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     * 
    **/
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     * 
    **/
    distinct?: Enumerable<TokenScalarFieldEnum>
  }

  /**
   * Token: findFirst
   */
  export interface TokenFindFirstArgs extends TokenFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Token findMany
   */
  export type TokenFindManyArgs = {
    /**
     * Select specific fields to fetch from the Token
     * 
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TokenInclude | null
    /**
     * Filter, which Tokens to fetch.
     * 
    **/
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     * 
    **/
    orderBy?: Enumerable<TokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tokens.
     * 
    **/
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     * 
    **/
    skip?: number
    distinct?: Enumerable<TokenScalarFieldEnum>
  }


  /**
   * Token create
   */
  export type TokenCreateArgs = {
    /**
     * Select specific fields to fetch from the Token
     * 
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TokenInclude | null
    /**
     * The data needed to create a Token.
     * 
    **/
    data: XOR<TokenCreateInput, TokenUncheckedCreateInput>
  }


  /**
   * Token createMany
   */
  export type TokenCreateManyArgs = {
    /**
     * The data used to create many Tokens.
     * 
    **/
    data: Enumerable<TokenCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Token update
   */
  export type TokenUpdateArgs = {
    /**
     * Select specific fields to fetch from the Token
     * 
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TokenInclude | null
    /**
     * The data needed to update a Token.
     * 
    **/
    data: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
    /**
     * Choose, which Token to update.
     * 
    **/
    where: TokenWhereUniqueInput
  }


  /**
   * Token updateMany
   */
  export type TokenUpdateManyArgs = {
    /**
     * The data used to update Tokens.
     * 
    **/
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyInput>
    /**
     * Filter which Tokens to update
     * 
    **/
    where?: TokenWhereInput
  }


  /**
   * Token upsert
   */
  export type TokenUpsertArgs = {
    /**
     * Select specific fields to fetch from the Token
     * 
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TokenInclude | null
    /**
     * The filter to search for the Token to update in case it exists.
     * 
    **/
    where: TokenWhereUniqueInput
    /**
     * In case the Token found by the `where` argument doesn't exist, create a new Token with this data.
     * 
    **/
    create: XOR<TokenCreateInput, TokenUncheckedCreateInput>
    /**
     * In case the Token was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
  }


  /**
   * Token delete
   */
  export type TokenDeleteArgs = {
    /**
     * Select specific fields to fetch from the Token
     * 
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TokenInclude | null
    /**
     * Filter which Token to delete.
     * 
    **/
    where: TokenWhereUniqueInput
  }


  /**
   * Token deleteMany
   */
  export type TokenDeleteManyArgs = {
    /**
     * Filter which Tokens to delete
     * 
    **/
    where?: TokenWhereInput
  }


  /**
   * Token: findUniqueOrThrow
   */
  export type TokenFindUniqueOrThrowArgs = TokenFindUniqueArgsBase
      

  /**
   * Token: findFirstOrThrow
   */
  export type TokenFindFirstOrThrowArgs = TokenFindFirstArgsBase
      

  /**
   * Token without action
   */
  export type TokenArgs = {
    /**
     * Select specific fields to fetch from the Token
     * 
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TokenInclude | null
  }



  /**
   * Model Withdraw
   */


  export type AggregateWithdraw = {
    _count: WithdrawCountAggregateOutputType | null
    _avg: WithdrawAvgAggregateOutputType | null
    _sum: WithdrawSumAggregateOutputType | null
    _min: WithdrawMinAggregateOutputType | null
    _max: WithdrawMaxAggregateOutputType | null
  }

  export type WithdrawAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type WithdrawSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type WithdrawMinAggregateOutputType = {
    id: string | null
    amount: Decimal | null
    date: Date | null
    txHash: string | null
    userAddress: string | null
  }

  export type WithdrawMaxAggregateOutputType = {
    id: string | null
    amount: Decimal | null
    date: Date | null
    txHash: string | null
    userAddress: string | null
  }

  export type WithdrawCountAggregateOutputType = {
    id: number
    amount: number
    date: number
    txHash: number
    userAddress: number
    _all: number
  }


  export type WithdrawAvgAggregateInputType = {
    amount?: true
  }

  export type WithdrawSumAggregateInputType = {
    amount?: true
  }

  export type WithdrawMinAggregateInputType = {
    id?: true
    amount?: true
    date?: true
    txHash?: true
    userAddress?: true
  }

  export type WithdrawMaxAggregateInputType = {
    id?: true
    amount?: true
    date?: true
    txHash?: true
    userAddress?: true
  }

  export type WithdrawCountAggregateInputType = {
    id?: true
    amount?: true
    date?: true
    txHash?: true
    userAddress?: true
    _all?: true
  }

  export type WithdrawAggregateArgs = {
    /**
     * Filter which Withdraw to aggregate.
     * 
    **/
    where?: WithdrawWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Withdraws to fetch.
     * 
    **/
    orderBy?: Enumerable<WithdrawOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: WithdrawWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Withdraws from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Withdraws.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Withdraws
    **/
    _count?: true | WithdrawCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WithdrawAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WithdrawSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WithdrawMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WithdrawMaxAggregateInputType
  }

  export type GetWithdrawAggregateType<T extends WithdrawAggregateArgs> = {
        [P in keyof T & keyof AggregateWithdraw]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWithdraw[P]>
      : GetScalarType<T[P], AggregateWithdraw[P]>
  }




  export type WithdrawGroupByArgs = {
    where?: WithdrawWhereInput
    orderBy?: Enumerable<WithdrawOrderByWithAggregationInput>
    by: Array<WithdrawScalarFieldEnum>
    having?: WithdrawScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WithdrawCountAggregateInputType | true
    _avg?: WithdrawAvgAggregateInputType
    _sum?: WithdrawSumAggregateInputType
    _min?: WithdrawMinAggregateInputType
    _max?: WithdrawMaxAggregateInputType
  }


  export type WithdrawGroupByOutputType = {
    id: string
    amount: Decimal
    date: Date
    txHash: string
    userAddress: string | null
    _count: WithdrawCountAggregateOutputType | null
    _avg: WithdrawAvgAggregateOutputType | null
    _sum: WithdrawSumAggregateOutputType | null
    _min: WithdrawMinAggregateOutputType | null
    _max: WithdrawMaxAggregateOutputType | null
  }

  type GetWithdrawGroupByPayload<T extends WithdrawGroupByArgs> = PrismaPromise<
    Array<
      PickArray<WithdrawGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WithdrawGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WithdrawGroupByOutputType[P]>
            : GetScalarType<T[P], WithdrawGroupByOutputType[P]>
        }
      >
    >


  export type WithdrawSelect = {
    id?: boolean
    amount?: boolean
    date?: boolean
    txHash?: boolean
    User?: boolean | UserArgs
    userAddress?: boolean
  }

  export type WithdrawInclude = {
    User?: boolean | UserArgs
  }

  export type WithdrawGetPayload<
    S extends boolean | null | undefined | WithdrawArgs,
    U = keyof S
      > = S extends true
        ? Withdraw
    : S extends undefined
    ? never
    : S extends WithdrawArgs | WithdrawFindManyArgs
    ?'include' extends U
    ? Withdraw  & {
    [P in TrueKeys<S['include']>]:
        P extends 'User' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> | null :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'User' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> | null :  P extends keyof Withdraw ? Withdraw[P] : never
  } 
    : Withdraw
  : Withdraw


  type WithdrawCountArgs = Merge<
    Omit<WithdrawFindManyArgs, 'select' | 'include'> & {
      select?: WithdrawCountAggregateInputType | true
    }
  >

  export interface WithdrawDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Withdraw that matches the filter.
     * @param {WithdrawFindUniqueArgs} args - Arguments to find a Withdraw
     * @example
     * // Get one Withdraw
     * const withdraw = await prisma.withdraw.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends WithdrawFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, WithdrawFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Withdraw'> extends True ? CheckSelect<T, Prisma__WithdrawClient<Withdraw>, Prisma__WithdrawClient<WithdrawGetPayload<T>>> : CheckSelect<T, Prisma__WithdrawClient<Withdraw | null, null>, Prisma__WithdrawClient<WithdrawGetPayload<T> | null, null>>

    /**
     * Find the first Withdraw that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WithdrawFindFirstArgs} args - Arguments to find a Withdraw
     * @example
     * // Get one Withdraw
     * const withdraw = await prisma.withdraw.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends WithdrawFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, WithdrawFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Withdraw'> extends True ? CheckSelect<T, Prisma__WithdrawClient<Withdraw>, Prisma__WithdrawClient<WithdrawGetPayload<T>>> : CheckSelect<T, Prisma__WithdrawClient<Withdraw | null, null>, Prisma__WithdrawClient<WithdrawGetPayload<T> | null, null>>

    /**
     * Find zero or more Withdraws that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WithdrawFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Withdraws
     * const withdraws = await prisma.withdraw.findMany()
     * 
     * // Get first 10 Withdraws
     * const withdraws = await prisma.withdraw.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const withdrawWithIdOnly = await prisma.withdraw.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends WithdrawFindManyArgs>(
      args?: SelectSubset<T, WithdrawFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Withdraw>>, PrismaPromise<Array<WithdrawGetPayload<T>>>>

    /**
     * Create a Withdraw.
     * @param {WithdrawCreateArgs} args - Arguments to create a Withdraw.
     * @example
     * // Create one Withdraw
     * const Withdraw = await prisma.withdraw.create({
     *   data: {
     *     // ... data to create a Withdraw
     *   }
     * })
     * 
    **/
    create<T extends WithdrawCreateArgs>(
      args: SelectSubset<T, WithdrawCreateArgs>
    ): CheckSelect<T, Prisma__WithdrawClient<Withdraw>, Prisma__WithdrawClient<WithdrawGetPayload<T>>>

    /**
     * Create many Withdraws.
     *     @param {WithdrawCreateManyArgs} args - Arguments to create many Withdraws.
     *     @example
     *     // Create many Withdraws
     *     const withdraw = await prisma.withdraw.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends WithdrawCreateManyArgs>(
      args?: SelectSubset<T, WithdrawCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Withdraw.
     * @param {WithdrawDeleteArgs} args - Arguments to delete one Withdraw.
     * @example
     * // Delete one Withdraw
     * const Withdraw = await prisma.withdraw.delete({
     *   where: {
     *     // ... filter to delete one Withdraw
     *   }
     * })
     * 
    **/
    delete<T extends WithdrawDeleteArgs>(
      args: SelectSubset<T, WithdrawDeleteArgs>
    ): CheckSelect<T, Prisma__WithdrawClient<Withdraw>, Prisma__WithdrawClient<WithdrawGetPayload<T>>>

    /**
     * Update one Withdraw.
     * @param {WithdrawUpdateArgs} args - Arguments to update one Withdraw.
     * @example
     * // Update one Withdraw
     * const withdraw = await prisma.withdraw.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends WithdrawUpdateArgs>(
      args: SelectSubset<T, WithdrawUpdateArgs>
    ): CheckSelect<T, Prisma__WithdrawClient<Withdraw>, Prisma__WithdrawClient<WithdrawGetPayload<T>>>

    /**
     * Delete zero or more Withdraws.
     * @param {WithdrawDeleteManyArgs} args - Arguments to filter Withdraws to delete.
     * @example
     * // Delete a few Withdraws
     * const { count } = await prisma.withdraw.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends WithdrawDeleteManyArgs>(
      args?: SelectSubset<T, WithdrawDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Withdraws.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WithdrawUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Withdraws
     * const withdraw = await prisma.withdraw.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends WithdrawUpdateManyArgs>(
      args: SelectSubset<T, WithdrawUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Withdraw.
     * @param {WithdrawUpsertArgs} args - Arguments to update or create a Withdraw.
     * @example
     * // Update or create a Withdraw
     * const withdraw = await prisma.withdraw.upsert({
     *   create: {
     *     // ... data to create a Withdraw
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Withdraw we want to update
     *   }
     * })
    **/
    upsert<T extends WithdrawUpsertArgs>(
      args: SelectSubset<T, WithdrawUpsertArgs>
    ): CheckSelect<T, Prisma__WithdrawClient<Withdraw>, Prisma__WithdrawClient<WithdrawGetPayload<T>>>

    /**
     * Find one Withdraw that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {WithdrawFindUniqueOrThrowArgs} args - Arguments to find a Withdraw
     * @example
     * // Get one Withdraw
     * const withdraw = await prisma.withdraw.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends WithdrawFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, WithdrawFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__WithdrawClient<Withdraw>, Prisma__WithdrawClient<WithdrawGetPayload<T>>>

    /**
     * Find the first Withdraw that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WithdrawFindFirstOrThrowArgs} args - Arguments to find a Withdraw
     * @example
     * // Get one Withdraw
     * const withdraw = await prisma.withdraw.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends WithdrawFindFirstOrThrowArgs>(
      args?: SelectSubset<T, WithdrawFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__WithdrawClient<Withdraw>, Prisma__WithdrawClient<WithdrawGetPayload<T>>>

    /**
     * Count the number of Withdraws.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WithdrawCountArgs} args - Arguments to filter Withdraws to count.
     * @example
     * // Count the number of Withdraws
     * const count = await prisma.withdraw.count({
     *   where: {
     *     // ... the filter for the Withdraws we want to count
     *   }
     * })
    **/
    count<T extends WithdrawCountArgs>(
      args?: Subset<T, WithdrawCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WithdrawCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Withdraw.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WithdrawAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WithdrawAggregateArgs>(args: Subset<T, WithdrawAggregateArgs>): PrismaPromise<GetWithdrawAggregateType<T>>

    /**
     * Group by Withdraw.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WithdrawGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WithdrawGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WithdrawGroupByArgs['orderBy'] }
        : { orderBy?: WithdrawGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WithdrawGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWithdrawGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Withdraw.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__WithdrawClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    User<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Withdraw base type for findUnique actions
   */
  export type WithdrawFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Withdraw
     * 
    **/
    select?: WithdrawSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WithdrawInclude | null
    /**
     * Filter, which Withdraw to fetch.
     * 
    **/
    where: WithdrawWhereUniqueInput
  }

  /**
   * Withdraw: findUnique
   */
  export interface WithdrawFindUniqueArgs extends WithdrawFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Withdraw base type for findFirst actions
   */
  export type WithdrawFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Withdraw
     * 
    **/
    select?: WithdrawSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WithdrawInclude | null
    /**
     * Filter, which Withdraw to fetch.
     * 
    **/
    where?: WithdrawWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Withdraws to fetch.
     * 
    **/
    orderBy?: Enumerable<WithdrawOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Withdraws.
     * 
    **/
    cursor?: WithdrawWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Withdraws from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Withdraws.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Withdraws.
     * 
    **/
    distinct?: Enumerable<WithdrawScalarFieldEnum>
  }

  /**
   * Withdraw: findFirst
   */
  export interface WithdrawFindFirstArgs extends WithdrawFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Withdraw findMany
   */
  export type WithdrawFindManyArgs = {
    /**
     * Select specific fields to fetch from the Withdraw
     * 
    **/
    select?: WithdrawSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WithdrawInclude | null
    /**
     * Filter, which Withdraws to fetch.
     * 
    **/
    where?: WithdrawWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Withdraws to fetch.
     * 
    **/
    orderBy?: Enumerable<WithdrawOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Withdraws.
     * 
    **/
    cursor?: WithdrawWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Withdraws from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Withdraws.
     * 
    **/
    skip?: number
    distinct?: Enumerable<WithdrawScalarFieldEnum>
  }


  /**
   * Withdraw create
   */
  export type WithdrawCreateArgs = {
    /**
     * Select specific fields to fetch from the Withdraw
     * 
    **/
    select?: WithdrawSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WithdrawInclude | null
    /**
     * The data needed to create a Withdraw.
     * 
    **/
    data: XOR<WithdrawCreateInput, WithdrawUncheckedCreateInput>
  }


  /**
   * Withdraw createMany
   */
  export type WithdrawCreateManyArgs = {
    /**
     * The data used to create many Withdraws.
     * 
    **/
    data: Enumerable<WithdrawCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Withdraw update
   */
  export type WithdrawUpdateArgs = {
    /**
     * Select specific fields to fetch from the Withdraw
     * 
    **/
    select?: WithdrawSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WithdrawInclude | null
    /**
     * The data needed to update a Withdraw.
     * 
    **/
    data: XOR<WithdrawUpdateInput, WithdrawUncheckedUpdateInput>
    /**
     * Choose, which Withdraw to update.
     * 
    **/
    where: WithdrawWhereUniqueInput
  }


  /**
   * Withdraw updateMany
   */
  export type WithdrawUpdateManyArgs = {
    /**
     * The data used to update Withdraws.
     * 
    **/
    data: XOR<WithdrawUpdateManyMutationInput, WithdrawUncheckedUpdateManyInput>
    /**
     * Filter which Withdraws to update
     * 
    **/
    where?: WithdrawWhereInput
  }


  /**
   * Withdraw upsert
   */
  export type WithdrawUpsertArgs = {
    /**
     * Select specific fields to fetch from the Withdraw
     * 
    **/
    select?: WithdrawSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WithdrawInclude | null
    /**
     * The filter to search for the Withdraw to update in case it exists.
     * 
    **/
    where: WithdrawWhereUniqueInput
    /**
     * In case the Withdraw found by the `where` argument doesn't exist, create a new Withdraw with this data.
     * 
    **/
    create: XOR<WithdrawCreateInput, WithdrawUncheckedCreateInput>
    /**
     * In case the Withdraw was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<WithdrawUpdateInput, WithdrawUncheckedUpdateInput>
  }


  /**
   * Withdraw delete
   */
  export type WithdrawDeleteArgs = {
    /**
     * Select specific fields to fetch from the Withdraw
     * 
    **/
    select?: WithdrawSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WithdrawInclude | null
    /**
     * Filter which Withdraw to delete.
     * 
    **/
    where: WithdrawWhereUniqueInput
  }


  /**
   * Withdraw deleteMany
   */
  export type WithdrawDeleteManyArgs = {
    /**
     * Filter which Withdraws to delete
     * 
    **/
    where?: WithdrawWhereInput
  }


  /**
   * Withdraw: findUniqueOrThrow
   */
  export type WithdrawFindUniqueOrThrowArgs = WithdrawFindUniqueArgsBase
      

  /**
   * Withdraw: findFirstOrThrow
   */
  export type WithdrawFindFirstOrThrowArgs = WithdrawFindFirstArgsBase
      

  /**
   * Withdraw without action
   */
  export type WithdrawArgs = {
    /**
     * Select specific fields to fetch from the Withdraw
     * 
    **/
    select?: WithdrawSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WithdrawInclude | null
  }



  /**
   * Model File
   */


  export type AggregateFile = {
    _count: FileCountAggregateOutputType | null
    _min: FileMinAggregateOutputType | null
    _max: FileMaxAggregateOutputType | null
  }

  export type FileMinAggregateOutputType = {
    id: string | null
    filename: string | null
    extension: string | null
  }

  export type FileMaxAggregateOutputType = {
    id: string | null
    filename: string | null
    extension: string | null
  }

  export type FileCountAggregateOutputType = {
    id: number
    filename: number
    extension: number
    _all: number
  }


  export type FileMinAggregateInputType = {
    id?: true
    filename?: true
    extension?: true
  }

  export type FileMaxAggregateInputType = {
    id?: true
    filename?: true
    extension?: true
  }

  export type FileCountAggregateInputType = {
    id?: true
    filename?: true
    extension?: true
    _all?: true
  }

  export type FileAggregateArgs = {
    /**
     * Filter which File to aggregate.
     * 
    **/
    where?: FileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Files to fetch.
     * 
    **/
    orderBy?: Enumerable<FileOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: FileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Files from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Files.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Files
    **/
    _count?: true | FileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FileMaxAggregateInputType
  }

  export type GetFileAggregateType<T extends FileAggregateArgs> = {
        [P in keyof T & keyof AggregateFile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFile[P]>
      : GetScalarType<T[P], AggregateFile[P]>
  }




  export type FileGroupByArgs = {
    where?: FileWhereInput
    orderBy?: Enumerable<FileOrderByWithAggregationInput>
    by: Array<FileScalarFieldEnum>
    having?: FileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FileCountAggregateInputType | true
    _min?: FileMinAggregateInputType
    _max?: FileMaxAggregateInputType
  }


  export type FileGroupByOutputType = {
    id: string
    filename: string
    extension: string
    _count: FileCountAggregateOutputType | null
    _min: FileMinAggregateOutputType | null
    _max: FileMaxAggregateOutputType | null
  }

  type GetFileGroupByPayload<T extends FileGroupByArgs> = PrismaPromise<
    Array<
      PickArray<FileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FileGroupByOutputType[P]>
            : GetScalarType<T[P], FileGroupByOutputType[P]>
        }
      >
    >


  export type FileSelect = {
    id?: boolean
    filename?: boolean
    extension?: boolean
    User?: boolean | UserFindManyArgs
    Token?: boolean | TokenFindManyArgs
    Page?: boolean | PageFindManyArgs
    _count?: boolean | FileCountOutputTypeArgs
  }

  export type FileInclude = {
    User?: boolean | UserFindManyArgs
    Token?: boolean | TokenFindManyArgs
    Page?: boolean | PageFindManyArgs
    _count?: boolean | FileCountOutputTypeArgs
  }

  export type FileGetPayload<
    S extends boolean | null | undefined | FileArgs,
    U = keyof S
      > = S extends true
        ? File
    : S extends undefined
    ? never
    : S extends FileArgs | FileFindManyArgs
    ?'include' extends U
    ? File  & {
    [P in TrueKeys<S['include']>]:
        P extends 'User' ? Array < UserGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'Token' ? Array < TokenGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'Page' ? Array < PageGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? FileCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'User' ? Array < UserGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'Token' ? Array < TokenGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'Page' ? Array < PageGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? FileCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof File ? File[P] : never
  } 
    : File
  : File


  type FileCountArgs = Merge<
    Omit<FileFindManyArgs, 'select' | 'include'> & {
      select?: FileCountAggregateInputType | true
    }
  >

  export interface FileDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one File that matches the filter.
     * @param {FileFindUniqueArgs} args - Arguments to find a File
     * @example
     * // Get one File
     * const file = await prisma.file.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends FileFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, FileFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'File'> extends True ? CheckSelect<T, Prisma__FileClient<File>, Prisma__FileClient<FileGetPayload<T>>> : CheckSelect<T, Prisma__FileClient<File | null, null>, Prisma__FileClient<FileGetPayload<T> | null, null>>

    /**
     * Find the first File that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileFindFirstArgs} args - Arguments to find a File
     * @example
     * // Get one File
     * const file = await prisma.file.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends FileFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, FileFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'File'> extends True ? CheckSelect<T, Prisma__FileClient<File>, Prisma__FileClient<FileGetPayload<T>>> : CheckSelect<T, Prisma__FileClient<File | null, null>, Prisma__FileClient<FileGetPayload<T> | null, null>>

    /**
     * Find zero or more Files that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Files
     * const files = await prisma.file.findMany()
     * 
     * // Get first 10 Files
     * const files = await prisma.file.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fileWithIdOnly = await prisma.file.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends FileFindManyArgs>(
      args?: SelectSubset<T, FileFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<File>>, PrismaPromise<Array<FileGetPayload<T>>>>

    /**
     * Create a File.
     * @param {FileCreateArgs} args - Arguments to create a File.
     * @example
     * // Create one File
     * const File = await prisma.file.create({
     *   data: {
     *     // ... data to create a File
     *   }
     * })
     * 
    **/
    create<T extends FileCreateArgs>(
      args: SelectSubset<T, FileCreateArgs>
    ): CheckSelect<T, Prisma__FileClient<File>, Prisma__FileClient<FileGetPayload<T>>>

    /**
     * Create many Files.
     *     @param {FileCreateManyArgs} args - Arguments to create many Files.
     *     @example
     *     // Create many Files
     *     const file = await prisma.file.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends FileCreateManyArgs>(
      args?: SelectSubset<T, FileCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a File.
     * @param {FileDeleteArgs} args - Arguments to delete one File.
     * @example
     * // Delete one File
     * const File = await prisma.file.delete({
     *   where: {
     *     // ... filter to delete one File
     *   }
     * })
     * 
    **/
    delete<T extends FileDeleteArgs>(
      args: SelectSubset<T, FileDeleteArgs>
    ): CheckSelect<T, Prisma__FileClient<File>, Prisma__FileClient<FileGetPayload<T>>>

    /**
     * Update one File.
     * @param {FileUpdateArgs} args - Arguments to update one File.
     * @example
     * // Update one File
     * const file = await prisma.file.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends FileUpdateArgs>(
      args: SelectSubset<T, FileUpdateArgs>
    ): CheckSelect<T, Prisma__FileClient<File>, Prisma__FileClient<FileGetPayload<T>>>

    /**
     * Delete zero or more Files.
     * @param {FileDeleteManyArgs} args - Arguments to filter Files to delete.
     * @example
     * // Delete a few Files
     * const { count } = await prisma.file.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends FileDeleteManyArgs>(
      args?: SelectSubset<T, FileDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Files
     * const file = await prisma.file.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends FileUpdateManyArgs>(
      args: SelectSubset<T, FileUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one File.
     * @param {FileUpsertArgs} args - Arguments to update or create a File.
     * @example
     * // Update or create a File
     * const file = await prisma.file.upsert({
     *   create: {
     *     // ... data to create a File
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the File we want to update
     *   }
     * })
    **/
    upsert<T extends FileUpsertArgs>(
      args: SelectSubset<T, FileUpsertArgs>
    ): CheckSelect<T, Prisma__FileClient<File>, Prisma__FileClient<FileGetPayload<T>>>

    /**
     * Find one File that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {FileFindUniqueOrThrowArgs} args - Arguments to find a File
     * @example
     * // Get one File
     * const file = await prisma.file.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends FileFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, FileFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__FileClient<File>, Prisma__FileClient<FileGetPayload<T>>>

    /**
     * Find the first File that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileFindFirstOrThrowArgs} args - Arguments to find a File
     * @example
     * // Get one File
     * const file = await prisma.file.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends FileFindFirstOrThrowArgs>(
      args?: SelectSubset<T, FileFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__FileClient<File>, Prisma__FileClient<FileGetPayload<T>>>

    /**
     * Count the number of Files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileCountArgs} args - Arguments to filter Files to count.
     * @example
     * // Count the number of Files
     * const count = await prisma.file.count({
     *   where: {
     *     // ... the filter for the Files we want to count
     *   }
     * })
    **/
    count<T extends FileCountArgs>(
      args?: Subset<T, FileCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a File.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FileAggregateArgs>(args: Subset<T, FileAggregateArgs>): PrismaPromise<GetFileAggregateType<T>>

    /**
     * Group by File.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FileGroupByArgs['orderBy'] }
        : { orderBy?: FileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFileGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for File.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__FileClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    User<T extends UserFindManyArgs = {}>(args?: Subset<T, UserFindManyArgs>): CheckSelect<T, PrismaPromise<Array<User>| Null>, PrismaPromise<Array<UserGetPayload<T>>| Null>>;

    Token<T extends TokenFindManyArgs = {}>(args?: Subset<T, TokenFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Token>| Null>, PrismaPromise<Array<TokenGetPayload<T>>| Null>>;

    Page<T extends PageFindManyArgs = {}>(args?: Subset<T, PageFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Page>| Null>, PrismaPromise<Array<PageGetPayload<T>>| Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * File base type for findUnique actions
   */
  export type FileFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the File
     * 
    **/
    select?: FileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FileInclude | null
    /**
     * Filter, which File to fetch.
     * 
    **/
    where: FileWhereUniqueInput
  }

  /**
   * File: findUnique
   */
  export interface FileFindUniqueArgs extends FileFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * File base type for findFirst actions
   */
  export type FileFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the File
     * 
    **/
    select?: FileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FileInclude | null
    /**
     * Filter, which File to fetch.
     * 
    **/
    where?: FileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Files to fetch.
     * 
    **/
    orderBy?: Enumerable<FileOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Files.
     * 
    **/
    cursor?: FileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Files from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Files.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Files.
     * 
    **/
    distinct?: Enumerable<FileScalarFieldEnum>
  }

  /**
   * File: findFirst
   */
  export interface FileFindFirstArgs extends FileFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * File findMany
   */
  export type FileFindManyArgs = {
    /**
     * Select specific fields to fetch from the File
     * 
    **/
    select?: FileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FileInclude | null
    /**
     * Filter, which Files to fetch.
     * 
    **/
    where?: FileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Files to fetch.
     * 
    **/
    orderBy?: Enumerable<FileOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Files.
     * 
    **/
    cursor?: FileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Files from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Files.
     * 
    **/
    skip?: number
    distinct?: Enumerable<FileScalarFieldEnum>
  }


  /**
   * File create
   */
  export type FileCreateArgs = {
    /**
     * Select specific fields to fetch from the File
     * 
    **/
    select?: FileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FileInclude | null
    /**
     * The data needed to create a File.
     * 
    **/
    data: XOR<FileCreateInput, FileUncheckedCreateInput>
  }


  /**
   * File createMany
   */
  export type FileCreateManyArgs = {
    /**
     * The data used to create many Files.
     * 
    **/
    data: Enumerable<FileCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * File update
   */
  export type FileUpdateArgs = {
    /**
     * Select specific fields to fetch from the File
     * 
    **/
    select?: FileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FileInclude | null
    /**
     * The data needed to update a File.
     * 
    **/
    data: XOR<FileUpdateInput, FileUncheckedUpdateInput>
    /**
     * Choose, which File to update.
     * 
    **/
    where: FileWhereUniqueInput
  }


  /**
   * File updateMany
   */
  export type FileUpdateManyArgs = {
    /**
     * The data used to update Files.
     * 
    **/
    data: XOR<FileUpdateManyMutationInput, FileUncheckedUpdateManyInput>
    /**
     * Filter which Files to update
     * 
    **/
    where?: FileWhereInput
  }


  /**
   * File upsert
   */
  export type FileUpsertArgs = {
    /**
     * Select specific fields to fetch from the File
     * 
    **/
    select?: FileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FileInclude | null
    /**
     * The filter to search for the File to update in case it exists.
     * 
    **/
    where: FileWhereUniqueInput
    /**
     * In case the File found by the `where` argument doesn't exist, create a new File with this data.
     * 
    **/
    create: XOR<FileCreateInput, FileUncheckedCreateInput>
    /**
     * In case the File was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<FileUpdateInput, FileUncheckedUpdateInput>
  }


  /**
   * File delete
   */
  export type FileDeleteArgs = {
    /**
     * Select specific fields to fetch from the File
     * 
    **/
    select?: FileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FileInclude | null
    /**
     * Filter which File to delete.
     * 
    **/
    where: FileWhereUniqueInput
  }


  /**
   * File deleteMany
   */
  export type FileDeleteManyArgs = {
    /**
     * Filter which Files to delete
     * 
    **/
    where?: FileWhereInput
  }


  /**
   * File: findUniqueOrThrow
   */
  export type FileFindUniqueOrThrowArgs = FileFindUniqueArgsBase
      

  /**
   * File: findFirstOrThrow
   */
  export type FileFindFirstOrThrowArgs = FileFindFirstArgsBase
      

  /**
   * File without action
   */
  export type FileArgs = {
    /**
     * Select specific fields to fetch from the File
     * 
    **/
    select?: FileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FileInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const FileScalarFieldEnum: {
    id: 'id',
    filename: 'filename',
    extension: 'extension'
  };

  export type FileScalarFieldEnum = (typeof FileScalarFieldEnum)[keyof typeof FileScalarFieldEnum]


  export const PageScalarFieldEnum: {
    id: 'id',
    affixUrl: 'affixUrl',
    description: 'description',
    banerId: 'banerId'
  };

  export type PageScalarFieldEnum = (typeof PageScalarFieldEnum)[keyof typeof PageScalarFieldEnum]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const StreamerScalarFieldEnum: {
    address: 'address',
    tipsCount: 'tipsCount',
    tipsValue: 'tipsValue',
    pageId: 'pageId'
  };

  export type StreamerScalarFieldEnum = (typeof StreamerScalarFieldEnum)[keyof typeof StreamerScalarFieldEnum]


  export const TipScalarFieldEnum: {
    txHash: 'txHash',
    amount: 'amount',
    value: 'value',
    message: 'message',
    displayed: 'displayed',
    date: 'date',
    receivedTokensAmount: 'receivedTokensAmount',
    userRole: 'userRole',
    userAddress: 'userAddress',
    userTokenAddress: 'userTokenAddress',
    tokenAddress: 'tokenAddress',
    tipperAddress: 'tipperAddress'
  };

  export type TipScalarFieldEnum = (typeof TipScalarFieldEnum)[keyof typeof TipScalarFieldEnum]


  export const TipperScalarFieldEnum: {
    address: 'address',
    nick: 'nick',
    tipsValue: 'tipsValue'
  };

  export type TipperScalarFieldEnum = (typeof TipperScalarFieldEnum)[keyof typeof TipperScalarFieldEnum]


  export const TokenScalarFieldEnum: {
    address: 'address',
    symbol: 'symbol',
    name: 'name',
    chainId: 'chainId',
    imageId: 'imageId',
    latestPrice: 'latestPrice',
    priceUpdateAt: 'priceUpdateAt',
    streamerAddress: 'streamerAddress'
  };

  export type TokenScalarFieldEnum = (typeof TokenScalarFieldEnum)[keyof typeof TokenScalarFieldEnum]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    address: 'address',
    nick: 'nick',
    email: 'email',
    emailVerified: 'emailVerified',
    firstName: 'firstName',
    lastName: 'lastName',
    verified: 'verified',
    createdAt: 'createdAt',
    updateAt: 'updateAt',
    allTipsCount: 'allTipsCount',
    allTipsValue: 'allTipsValue',
    allWithdrawsValue: 'allWithdrawsValue',
    apperanceMode: 'apperanceMode',
    roles: 'roles',
    defaultRole: 'defaultRole',
    refreshTokens: 'refreshTokens',
    avatarId: 'avatarId'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserTokenScalarFieldEnum: {
    address: 'address',
    symbol: 'symbol',
    name: 'name',
    chainId: 'chainId',
    txHash: 'txHash',
    userAddress: 'userAddress'
  };

  export type UserTokenScalarFieldEnum = (typeof UserTokenScalarFieldEnum)[keyof typeof UserTokenScalarFieldEnum]


  export const WidgetScalarFieldEnum: {
    id: 'id',
    url: 'url',
    songPath: 'songPath',
    backgroundPath: 'backgroundPath',
    nickColor: 'nickColor',
    messageColor: 'messageColor',
    valueColor: 'valueColor',
    showTime: 'showTime',
    filterProfanity: 'filterProfanity',
    voiceMessage: 'voiceMessage',
    streamerAddress: 'streamerAddress'
  };

  export type WidgetScalarFieldEnum = (typeof WidgetScalarFieldEnum)[keyof typeof WidgetScalarFieldEnum]


  export const WithdrawScalarFieldEnum: {
    id: 'id',
    amount: 'amount',
    date: 'date',
    txHash: 'txHash',
    userAddress: 'userAddress'
  };

  export type WithdrawScalarFieldEnum = (typeof WithdrawScalarFieldEnum)[keyof typeof WithdrawScalarFieldEnum]


  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    address?: StringFilter | string
    nick?: StringFilter | string
    email?: StringFilter | string
    emailVerified?: DateTimeNullableFilter | Date | string | null
    firstName?: StringNullableFilter | string | null
    lastName?: StringNullableFilter | string | null
    verified?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
    updateAt?: DateTimeFilter | Date | string
    allTipsCount?: IntFilter | number
    allTipsValue?: DecimalFilter | Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: DecimalFilter | Decimal | DecimalJsLike | number | string
    apperanceMode?: EnumApperanceModeFilter | ApperanceMode
    roles?: EnumRoleNullableListFilter
    defaultRole?: EnumRoleFilter | Role
    refreshTokens?: StringNullableListFilter
    avatar?: XOR<FileRelationFilter, FileWhereInput> | null
    avatarId?: StringNullableFilter | string | null
    witdraws?: WithdrawListRelationFilter
    userToken?: XOR<UserTokenRelationFilter, UserTokenWhereInput> | null
    tips?: TipListRelationFilter
    streamer?: XOR<StreamerRelationFilter, StreamerWhereInput> | null
    tipper?: XOR<TipperRelationFilter, TipperWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    address?: SortOrder
    nick?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updateAt?: SortOrder
    allTipsCount?: SortOrder
    allTipsValue?: SortOrder
    allWithdrawsValue?: SortOrder
    apperanceMode?: SortOrder
    roles?: SortOrder
    defaultRole?: SortOrder
    refreshTokens?: SortOrder
    avatar?: FileOrderByWithRelationInput
    avatarId?: SortOrder
    witdraws?: WithdrawOrderByRelationAggregateInput
    userToken?: UserTokenOrderByWithRelationInput
    tips?: TipOrderByRelationAggregateInput
    streamer?: StreamerOrderByWithRelationInput
    tipper?: TipperOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = {
    address?: string
    nick?: string
    email?: string
  }

  export type UserOrderByWithAggregationInput = {
    address?: SortOrder
    nick?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updateAt?: SortOrder
    allTipsCount?: SortOrder
    allTipsValue?: SortOrder
    allWithdrawsValue?: SortOrder
    apperanceMode?: SortOrder
    roles?: SortOrder
    defaultRole?: SortOrder
    refreshTokens?: SortOrder
    avatarId?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    address?: StringWithAggregatesFilter | string
    nick?: StringWithAggregatesFilter | string
    email?: StringWithAggregatesFilter | string
    emailVerified?: DateTimeNullableWithAggregatesFilter | Date | string | null
    firstName?: StringNullableWithAggregatesFilter | string | null
    lastName?: StringNullableWithAggregatesFilter | string | null
    verified?: BoolWithAggregatesFilter | boolean
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updateAt?: DateTimeWithAggregatesFilter | Date | string
    allTipsCount?: IntWithAggregatesFilter | number
    allTipsValue?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    apperanceMode?: EnumApperanceModeWithAggregatesFilter | ApperanceMode
    roles?: EnumRoleNullableListFilter
    defaultRole?: EnumRoleWithAggregatesFilter | Role
    refreshTokens?: StringNullableListFilter
    avatarId?: StringNullableWithAggregatesFilter | string | null
  }

  export type StreamerWhereInput = {
    AND?: Enumerable<StreamerWhereInput>
    OR?: Enumerable<StreamerWhereInput>
    NOT?: Enumerable<StreamerWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
    address?: StringFilter | string
    tipsCount?: IntFilter | number
    tipsValue?: DecimalFilter | Decimal | DecimalJsLike | number | string
    page?: XOR<PageRelationFilter, PageWhereInput>
    activeTokens?: TokenListRelationFilter
    widgets?: WidgetListRelationFilter
    pageId?: StringFilter | string
  }

  export type StreamerOrderByWithRelationInput = {
    user?: UserOrderByWithRelationInput
    address?: SortOrder
    tipsCount?: SortOrder
    tipsValue?: SortOrder
    page?: PageOrderByWithRelationInput
    activeTokens?: TokenOrderByRelationAggregateInput
    widgets?: WidgetOrderByRelationAggregateInput
    pageId?: SortOrder
  }

  export type StreamerWhereUniqueInput = {
    address?: string
  }

  export type StreamerOrderByWithAggregationInput = {
    address?: SortOrder
    tipsCount?: SortOrder
    tipsValue?: SortOrder
    pageId?: SortOrder
    _count?: StreamerCountOrderByAggregateInput
    _avg?: StreamerAvgOrderByAggregateInput
    _max?: StreamerMaxOrderByAggregateInput
    _min?: StreamerMinOrderByAggregateInput
    _sum?: StreamerSumOrderByAggregateInput
  }

  export type StreamerScalarWhereWithAggregatesInput = {
    AND?: Enumerable<StreamerScalarWhereWithAggregatesInput>
    OR?: Enumerable<StreamerScalarWhereWithAggregatesInput>
    NOT?: Enumerable<StreamerScalarWhereWithAggregatesInput>
    address?: StringWithAggregatesFilter | string
    tipsCount?: IntWithAggregatesFilter | number
    tipsValue?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    pageId?: StringWithAggregatesFilter | string
  }

  export type TipperWhereInput = {
    AND?: Enumerable<TipperWhereInput>
    OR?: Enumerable<TipperWhereInput>
    NOT?: Enumerable<TipperWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
    address?: StringFilter | string
    nick?: StringFilter | string
    tipsValue?: IntFilter | number
    tips?: TipListRelationFilter
  }

  export type TipperOrderByWithRelationInput = {
    user?: UserOrderByWithRelationInput
    address?: SortOrder
    nick?: SortOrder
    tipsValue?: SortOrder
    tips?: TipOrderByRelationAggregateInput
  }

  export type TipperWhereUniqueInput = {
    address?: string
    nick?: string
  }

  export type TipperOrderByWithAggregationInput = {
    address?: SortOrder
    nick?: SortOrder
    tipsValue?: SortOrder
    _count?: TipperCountOrderByAggregateInput
    _avg?: TipperAvgOrderByAggregateInput
    _max?: TipperMaxOrderByAggregateInput
    _min?: TipperMinOrderByAggregateInput
    _sum?: TipperSumOrderByAggregateInput
  }

  export type TipperScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TipperScalarWhereWithAggregatesInput>
    OR?: Enumerable<TipperScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TipperScalarWhereWithAggregatesInput>
    address?: StringWithAggregatesFilter | string
    nick?: StringWithAggregatesFilter | string
    tipsValue?: IntWithAggregatesFilter | number
  }

  export type PageWhereInput = {
    AND?: Enumerable<PageWhereInput>
    OR?: Enumerable<PageWhereInput>
    NOT?: Enumerable<PageWhereInput>
    id?: StringFilter | string
    affixUrl?: StringFilter | string
    description?: StringNullableFilter | string | null
    baner?: XOR<FileRelationFilter, FileWhereInput> | null
    banerId?: StringNullableFilter | string | null
    Streamer?: StreamerListRelationFilter
  }

  export type PageOrderByWithRelationInput = {
    id?: SortOrder
    affixUrl?: SortOrder
    description?: SortOrder
    baner?: FileOrderByWithRelationInput
    banerId?: SortOrder
    Streamer?: StreamerOrderByRelationAggregateInput
  }

  export type PageWhereUniqueInput = {
    id?: string
  }

  export type PageOrderByWithAggregationInput = {
    id?: SortOrder
    affixUrl?: SortOrder
    description?: SortOrder
    banerId?: SortOrder
    _count?: PageCountOrderByAggregateInput
    _max?: PageMaxOrderByAggregateInput
    _min?: PageMinOrderByAggregateInput
  }

  export type PageScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PageScalarWhereWithAggregatesInput>
    OR?: Enumerable<PageScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PageScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    affixUrl?: StringWithAggregatesFilter | string
    description?: StringNullableWithAggregatesFilter | string | null
    banerId?: StringNullableWithAggregatesFilter | string | null
  }

  export type TipWhereInput = {
    AND?: Enumerable<TipWhereInput>
    OR?: Enumerable<TipWhereInput>
    NOT?: Enumerable<TipWhereInput>
    txHash?: StringFilter | string
    amount?: DecimalFilter | Decimal | DecimalJsLike | number | string
    value?: DecimalFilter | Decimal | DecimalJsLike | number | string
    message?: StringFilter | string
    displayed?: BoolFilter | boolean
    date?: DateTimeFilter | Date | string
    receivedTokensAmount?: DecimalFilter | Decimal | DecimalJsLike | number | string
    userRole?: EnumRoleFilter | Role
    user?: XOR<UserRelationFilter, UserWhereInput>
    userAddress?: StringFilter | string
    userToken?: XOR<UserTokenRelationFilter, UserTokenWhereInput>
    userTokenAddress?: StringFilter | string
    token?: XOR<TokenRelationFilter, TokenWhereInput>
    tokenAddress?: StringFilter | string
    tipper?: XOR<TipperRelationFilter, TipperWhereInput>
    tipperAddress?: StringFilter | string
  }

  export type TipOrderByWithRelationInput = {
    txHash?: SortOrder
    amount?: SortOrder
    value?: SortOrder
    message?: SortOrder
    displayed?: SortOrder
    date?: SortOrder
    receivedTokensAmount?: SortOrder
    userRole?: SortOrder
    user?: UserOrderByWithRelationInput
    userAddress?: SortOrder
    userToken?: UserTokenOrderByWithRelationInput
    userTokenAddress?: SortOrder
    token?: TokenOrderByWithRelationInput
    tokenAddress?: SortOrder
    tipper?: TipperOrderByWithRelationInput
    tipperAddress?: SortOrder
  }

  export type TipWhereUniqueInput = {
    txHash?: string
  }

  export type TipOrderByWithAggregationInput = {
    txHash?: SortOrder
    amount?: SortOrder
    value?: SortOrder
    message?: SortOrder
    displayed?: SortOrder
    date?: SortOrder
    receivedTokensAmount?: SortOrder
    userRole?: SortOrder
    userAddress?: SortOrder
    userTokenAddress?: SortOrder
    tokenAddress?: SortOrder
    tipperAddress?: SortOrder
    _count?: TipCountOrderByAggregateInput
    _avg?: TipAvgOrderByAggregateInput
    _max?: TipMaxOrderByAggregateInput
    _min?: TipMinOrderByAggregateInput
    _sum?: TipSumOrderByAggregateInput
  }

  export type TipScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TipScalarWhereWithAggregatesInput>
    OR?: Enumerable<TipScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TipScalarWhereWithAggregatesInput>
    txHash?: StringWithAggregatesFilter | string
    amount?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    value?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    message?: StringWithAggregatesFilter | string
    displayed?: BoolWithAggregatesFilter | boolean
    date?: DateTimeWithAggregatesFilter | Date | string
    receivedTokensAmount?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    userRole?: EnumRoleWithAggregatesFilter | Role
    userAddress?: StringWithAggregatesFilter | string
    userTokenAddress?: StringWithAggregatesFilter | string
    tokenAddress?: StringWithAggregatesFilter | string
    tipperAddress?: StringWithAggregatesFilter | string
  }

  export type UserTokenWhereInput = {
    AND?: Enumerable<UserTokenWhereInput>
    OR?: Enumerable<UserTokenWhereInput>
    NOT?: Enumerable<UserTokenWhereInput>
    address?: StringFilter | string
    symbol?: StringFilter | string
    name?: StringFilter | string
    chainId?: IntFilter | number
    txHash?: StringFilter | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    userAddress?: StringFilter | string
    Tip?: TipListRelationFilter
  }

  export type UserTokenOrderByWithRelationInput = {
    address?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    chainId?: SortOrder
    txHash?: SortOrder
    user?: UserOrderByWithRelationInput
    userAddress?: SortOrder
    Tip?: TipOrderByRelationAggregateInput
  }

  export type UserTokenWhereUniqueInput = {
    address?: string
    symbol?: string
    name?: string
    userAddress?: string
  }

  export type UserTokenOrderByWithAggregationInput = {
    address?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    chainId?: SortOrder
    txHash?: SortOrder
    userAddress?: SortOrder
    _count?: UserTokenCountOrderByAggregateInput
    _avg?: UserTokenAvgOrderByAggregateInput
    _max?: UserTokenMaxOrderByAggregateInput
    _min?: UserTokenMinOrderByAggregateInput
    _sum?: UserTokenSumOrderByAggregateInput
  }

  export type UserTokenScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserTokenScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserTokenScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserTokenScalarWhereWithAggregatesInput>
    address?: StringWithAggregatesFilter | string
    symbol?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    chainId?: IntWithAggregatesFilter | number
    txHash?: StringWithAggregatesFilter | string
    userAddress?: StringWithAggregatesFilter | string
  }

  export type WidgetWhereInput = {
    AND?: Enumerable<WidgetWhereInput>
    OR?: Enumerable<WidgetWhereInput>
    NOT?: Enumerable<WidgetWhereInput>
    id?: StringFilter | string
    url?: StringFilter | string
    songPath?: StringFilter | string
    backgroundPath?: StringFilter | string
    nickColor?: StringFilter | string
    messageColor?: StringFilter | string
    valueColor?: StringFilter | string
    showTime?: IntFilter | number
    filterProfanity?: BoolFilter | boolean
    voiceMessage?: BoolFilter | boolean
    Streamer?: XOR<StreamerRelationFilter, StreamerWhereInput> | null
    streamerAddress?: StringNullableFilter | string | null
  }

  export type WidgetOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    songPath?: SortOrder
    backgroundPath?: SortOrder
    nickColor?: SortOrder
    messageColor?: SortOrder
    valueColor?: SortOrder
    showTime?: SortOrder
    filterProfanity?: SortOrder
    voiceMessage?: SortOrder
    Streamer?: StreamerOrderByWithRelationInput
    streamerAddress?: SortOrder
  }

  export type WidgetWhereUniqueInput = {
    id?: string
  }

  export type WidgetOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    songPath?: SortOrder
    backgroundPath?: SortOrder
    nickColor?: SortOrder
    messageColor?: SortOrder
    valueColor?: SortOrder
    showTime?: SortOrder
    filterProfanity?: SortOrder
    voiceMessage?: SortOrder
    streamerAddress?: SortOrder
    _count?: WidgetCountOrderByAggregateInput
    _avg?: WidgetAvgOrderByAggregateInput
    _max?: WidgetMaxOrderByAggregateInput
    _min?: WidgetMinOrderByAggregateInput
    _sum?: WidgetSumOrderByAggregateInput
  }

  export type WidgetScalarWhereWithAggregatesInput = {
    AND?: Enumerable<WidgetScalarWhereWithAggregatesInput>
    OR?: Enumerable<WidgetScalarWhereWithAggregatesInput>
    NOT?: Enumerable<WidgetScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    url?: StringWithAggregatesFilter | string
    songPath?: StringWithAggregatesFilter | string
    backgroundPath?: StringWithAggregatesFilter | string
    nickColor?: StringWithAggregatesFilter | string
    messageColor?: StringWithAggregatesFilter | string
    valueColor?: StringWithAggregatesFilter | string
    showTime?: IntWithAggregatesFilter | number
    filterProfanity?: BoolWithAggregatesFilter | boolean
    voiceMessage?: BoolWithAggregatesFilter | boolean
    streamerAddress?: StringNullableWithAggregatesFilter | string | null
  }

  export type TokenWhereInput = {
    AND?: Enumerable<TokenWhereInput>
    OR?: Enumerable<TokenWhereInput>
    NOT?: Enumerable<TokenWhereInput>
    address?: StringFilter | string
    symbol?: StringFilter | string
    name?: StringFilter | string
    chainId?: IntFilter | number
    image?: XOR<FileRelationFilter, FileWhereInput> | null
    imageId?: StringNullableFilter | string | null
    latestPrice?: DecimalNullableFilter | Decimal | DecimalJsLike | number | string | null
    priceUpdateAt?: DateTimeNullableFilter | Date | string | null
    Streamer?: XOR<StreamerRelationFilter, StreamerWhereInput> | null
    streamerAddress?: StringNullableFilter | string | null
    Tip?: TipListRelationFilter
  }

  export type TokenOrderByWithRelationInput = {
    address?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    chainId?: SortOrder
    image?: FileOrderByWithRelationInput
    imageId?: SortOrder
    latestPrice?: SortOrder
    priceUpdateAt?: SortOrder
    Streamer?: StreamerOrderByWithRelationInput
    streamerAddress?: SortOrder
    Tip?: TipOrderByRelationAggregateInput
  }

  export type TokenWhereUniqueInput = {
    address?: string
    symbol?: string
    name?: string
  }

  export type TokenOrderByWithAggregationInput = {
    address?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    chainId?: SortOrder
    imageId?: SortOrder
    latestPrice?: SortOrder
    priceUpdateAt?: SortOrder
    streamerAddress?: SortOrder
    _count?: TokenCountOrderByAggregateInput
    _avg?: TokenAvgOrderByAggregateInput
    _max?: TokenMaxOrderByAggregateInput
    _min?: TokenMinOrderByAggregateInput
    _sum?: TokenSumOrderByAggregateInput
  }

  export type TokenScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TokenScalarWhereWithAggregatesInput>
    OR?: Enumerable<TokenScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TokenScalarWhereWithAggregatesInput>
    address?: StringWithAggregatesFilter | string
    symbol?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    chainId?: IntWithAggregatesFilter | number
    imageId?: StringNullableWithAggregatesFilter | string | null
    latestPrice?: DecimalNullableWithAggregatesFilter | Decimal | DecimalJsLike | number | string | null
    priceUpdateAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    streamerAddress?: StringNullableWithAggregatesFilter | string | null
  }

  export type WithdrawWhereInput = {
    AND?: Enumerable<WithdrawWhereInput>
    OR?: Enumerable<WithdrawWhereInput>
    NOT?: Enumerable<WithdrawWhereInput>
    id?: StringFilter | string
    amount?: DecimalFilter | Decimal | DecimalJsLike | number | string
    date?: DateTimeFilter | Date | string
    txHash?: StringFilter | string
    User?: XOR<UserRelationFilter, UserWhereInput> | null
    userAddress?: StringNullableFilter | string | null
  }

  export type WithdrawOrderByWithRelationInput = {
    id?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    txHash?: SortOrder
    User?: UserOrderByWithRelationInput
    userAddress?: SortOrder
  }

  export type WithdrawWhereUniqueInput = {
    id?: string
    txHash?: string
  }

  export type WithdrawOrderByWithAggregationInput = {
    id?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    txHash?: SortOrder
    userAddress?: SortOrder
    _count?: WithdrawCountOrderByAggregateInput
    _avg?: WithdrawAvgOrderByAggregateInput
    _max?: WithdrawMaxOrderByAggregateInput
    _min?: WithdrawMinOrderByAggregateInput
    _sum?: WithdrawSumOrderByAggregateInput
  }

  export type WithdrawScalarWhereWithAggregatesInput = {
    AND?: Enumerable<WithdrawScalarWhereWithAggregatesInput>
    OR?: Enumerable<WithdrawScalarWhereWithAggregatesInput>
    NOT?: Enumerable<WithdrawScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    amount?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    date?: DateTimeWithAggregatesFilter | Date | string
    txHash?: StringWithAggregatesFilter | string
    userAddress?: StringNullableWithAggregatesFilter | string | null
  }

  export type FileWhereInput = {
    AND?: Enumerable<FileWhereInput>
    OR?: Enumerable<FileWhereInput>
    NOT?: Enumerable<FileWhereInput>
    id?: StringFilter | string
    filename?: StringFilter | string
    extension?: StringFilter | string
    User?: UserListRelationFilter
    Token?: TokenListRelationFilter
    Page?: PageListRelationFilter
  }

  export type FileOrderByWithRelationInput = {
    id?: SortOrder
    filename?: SortOrder
    extension?: SortOrder
    User?: UserOrderByRelationAggregateInput
    Token?: TokenOrderByRelationAggregateInput
    Page?: PageOrderByRelationAggregateInput
  }

  export type FileWhereUniqueInput = {
    id?: string
  }

  export type FileOrderByWithAggregationInput = {
    id?: SortOrder
    filename?: SortOrder
    extension?: SortOrder
    _count?: FileCountOrderByAggregateInput
    _max?: FileMaxOrderByAggregateInput
    _min?: FileMinOrderByAggregateInput
  }

  export type FileScalarWhereWithAggregatesInput = {
    AND?: Enumerable<FileScalarWhereWithAggregatesInput>
    OR?: Enumerable<FileScalarWhereWithAggregatesInput>
    NOT?: Enumerable<FileScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    filename?: StringWithAggregatesFilter | string
    extension?: StringWithAggregatesFilter | string
  }

  export type UserCreateInput = {
    address: string
    nick: string
    email: string
    emailVerified?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    verified?: boolean
    createdAt?: Date | string
    updateAt?: Date | string
    allTipsCount?: number
    allTipsValue?: Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: Decimal | DecimalJsLike | number | string
    apperanceMode?: ApperanceMode
    roles?: UserCreaterolesInput | Enumerable<Role>
    defaultRole?: Role
    refreshTokens?: UserCreaterefreshTokensInput | Enumerable<string>
    avatar?: FileCreateNestedOneWithoutUserInput
    witdraws?: WithdrawCreateNestedManyWithoutUserInput
    userToken?: UserTokenCreateNestedOneWithoutUserInput
    tips?: TipCreateNestedManyWithoutUserInput
    streamer?: StreamerCreateNestedOneWithoutUserInput
    tipper?: TipperCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    address: string
    nick: string
    email: string
    emailVerified?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    verified?: boolean
    createdAt?: Date | string
    updateAt?: Date | string
    allTipsCount?: number
    allTipsValue?: Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: Decimal | DecimalJsLike | number | string
    apperanceMode?: ApperanceMode
    roles?: UserCreaterolesInput | Enumerable<Role>
    defaultRole?: Role
    refreshTokens?: UserCreaterefreshTokensInput | Enumerable<string>
    avatarId?: string | null
    witdraws?: WithdrawUncheckedCreateNestedManyWithoutUserInput
    userToken?: UserTokenUncheckedCreateNestedOneWithoutUserInput
    tips?: TipUncheckedCreateNestedManyWithoutUserInput
    streamer?: StreamerUncheckedCreateNestedOneWithoutUserInput
    tipper?: TipperUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    address?: StringFieldUpdateOperationsInput | string
    nick?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allTipsCount?: IntFieldUpdateOperationsInput | number
    allTipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    apperanceMode?: EnumApperanceModeFieldUpdateOperationsInput | ApperanceMode
    roles?: UserUpdaterolesInput | Enumerable<Role>
    defaultRole?: EnumRoleFieldUpdateOperationsInput | Role
    refreshTokens?: UserUpdaterefreshTokensInput | Enumerable<string>
    avatar?: FileUpdateOneWithoutUserNestedInput
    witdraws?: WithdrawUpdateManyWithoutUserNestedInput
    userToken?: UserTokenUpdateOneWithoutUserNestedInput
    tips?: TipUpdateManyWithoutUserNestedInput
    streamer?: StreamerUpdateOneWithoutUserNestedInput
    tipper?: TipperUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    address?: StringFieldUpdateOperationsInput | string
    nick?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allTipsCount?: IntFieldUpdateOperationsInput | number
    allTipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    apperanceMode?: EnumApperanceModeFieldUpdateOperationsInput | ApperanceMode
    roles?: UserUpdaterolesInput | Enumerable<Role>
    defaultRole?: EnumRoleFieldUpdateOperationsInput | Role
    refreshTokens?: UserUpdaterefreshTokensInput | Enumerable<string>
    avatarId?: NullableStringFieldUpdateOperationsInput | string | null
    witdraws?: WithdrawUncheckedUpdateManyWithoutUserNestedInput
    userToken?: UserTokenUncheckedUpdateOneWithoutUserNestedInput
    tips?: TipUncheckedUpdateManyWithoutUserNestedInput
    streamer?: StreamerUncheckedUpdateOneWithoutUserNestedInput
    tipper?: TipperUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    address: string
    nick: string
    email: string
    emailVerified?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    verified?: boolean
    createdAt?: Date | string
    updateAt?: Date | string
    allTipsCount?: number
    allTipsValue?: Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: Decimal | DecimalJsLike | number | string
    apperanceMode?: ApperanceMode
    roles?: UserCreaterolesInput | Enumerable<Role>
    defaultRole?: Role
    refreshTokens?: UserCreaterefreshTokensInput | Enumerable<string>
    avatarId?: string | null
  }

  export type UserUpdateManyMutationInput = {
    address?: StringFieldUpdateOperationsInput | string
    nick?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allTipsCount?: IntFieldUpdateOperationsInput | number
    allTipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    apperanceMode?: EnumApperanceModeFieldUpdateOperationsInput | ApperanceMode
    roles?: UserUpdaterolesInput | Enumerable<Role>
    defaultRole?: EnumRoleFieldUpdateOperationsInput | Role
    refreshTokens?: UserUpdaterefreshTokensInput | Enumerable<string>
  }

  export type UserUncheckedUpdateManyInput = {
    address?: StringFieldUpdateOperationsInput | string
    nick?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allTipsCount?: IntFieldUpdateOperationsInput | number
    allTipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    apperanceMode?: EnumApperanceModeFieldUpdateOperationsInput | ApperanceMode
    roles?: UserUpdaterolesInput | Enumerable<Role>
    defaultRole?: EnumRoleFieldUpdateOperationsInput | Role
    refreshTokens?: UserUpdaterefreshTokensInput | Enumerable<string>
    avatarId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StreamerCreateInput = {
    user: UserCreateNestedOneWithoutStreamerInput
    tipsCount?: number
    tipsValue?: Decimal | DecimalJsLike | number | string
    page: PageCreateNestedOneWithoutStreamerInput
    activeTokens?: TokenCreateNestedManyWithoutStreamerInput
    widgets?: WidgetCreateNestedManyWithoutStreamerInput
  }

  export type StreamerUncheckedCreateInput = {
    address: string
    tipsCount?: number
    tipsValue?: Decimal | DecimalJsLike | number | string
    activeTokens?: TokenUncheckedCreateNestedManyWithoutStreamerInput
    widgets?: WidgetUncheckedCreateNestedManyWithoutStreamerInput
    pageId: string
  }

  export type StreamerUpdateInput = {
    user?: UserUpdateOneRequiredWithoutStreamerNestedInput
    tipsCount?: IntFieldUpdateOperationsInput | number
    tipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    page?: PageUpdateOneRequiredWithoutStreamerNestedInput
    activeTokens?: TokenUpdateManyWithoutStreamerNestedInput
    widgets?: WidgetUpdateManyWithoutStreamerNestedInput
  }

  export type StreamerUncheckedUpdateInput = {
    address?: StringFieldUpdateOperationsInput | string
    tipsCount?: IntFieldUpdateOperationsInput | number
    tipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    activeTokens?: TokenUncheckedUpdateManyWithoutStreamerNestedInput
    widgets?: WidgetUncheckedUpdateManyWithoutStreamerNestedInput
    pageId?: StringFieldUpdateOperationsInput | string
  }

  export type StreamerCreateManyInput = {
    address: string
    tipsCount?: number
    tipsValue?: Decimal | DecimalJsLike | number | string
    pageId: string
  }

  export type StreamerUpdateManyMutationInput = {
    tipsCount?: IntFieldUpdateOperationsInput | number
    tipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type StreamerUncheckedUpdateManyInput = {
    address?: StringFieldUpdateOperationsInput | string
    tipsCount?: IntFieldUpdateOperationsInput | number
    tipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    pageId?: StringFieldUpdateOperationsInput | string
  }

  export type TipperCreateInput = {
    user: UserCreateNestedOneWithoutTipperInput
    nick: string
    tipsValue?: number
    tips?: TipCreateNestedManyWithoutTipperInput
  }

  export type TipperUncheckedCreateInput = {
    address: string
    nick: string
    tipsValue?: number
    tips?: TipUncheckedCreateNestedManyWithoutTipperInput
  }

  export type TipperUpdateInput = {
    user?: UserUpdateOneRequiredWithoutTipperNestedInput
    nick?: StringFieldUpdateOperationsInput | string
    tipsValue?: IntFieldUpdateOperationsInput | number
    tips?: TipUpdateManyWithoutTipperNestedInput
  }

  export type TipperUncheckedUpdateInput = {
    address?: StringFieldUpdateOperationsInput | string
    nick?: StringFieldUpdateOperationsInput | string
    tipsValue?: IntFieldUpdateOperationsInput | number
    tips?: TipUncheckedUpdateManyWithoutTipperNestedInput
  }

  export type TipperCreateManyInput = {
    address: string
    nick: string
    tipsValue?: number
  }

  export type TipperUpdateManyMutationInput = {
    nick?: StringFieldUpdateOperationsInput | string
    tipsValue?: IntFieldUpdateOperationsInput | number
  }

  export type TipperUncheckedUpdateManyInput = {
    address?: StringFieldUpdateOperationsInput | string
    nick?: StringFieldUpdateOperationsInput | string
    tipsValue?: IntFieldUpdateOperationsInput | number
  }

  export type PageCreateInput = {
    id?: string
    affixUrl: string
    description?: string | null
    baner?: FileCreateNestedOneWithoutPageInput
    Streamer?: StreamerCreateNestedManyWithoutPageInput
  }

  export type PageUncheckedCreateInput = {
    id?: string
    affixUrl: string
    description?: string | null
    banerId?: string | null
    Streamer?: StreamerUncheckedCreateNestedManyWithoutPageInput
  }

  export type PageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    affixUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    baner?: FileUpdateOneWithoutPageNestedInput
    Streamer?: StreamerUpdateManyWithoutPageNestedInput
  }

  export type PageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    affixUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    banerId?: NullableStringFieldUpdateOperationsInput | string | null
    Streamer?: StreamerUncheckedUpdateManyWithoutPageNestedInput
  }

  export type PageCreateManyInput = {
    id?: string
    affixUrl: string
    description?: string | null
    banerId?: string | null
  }

  export type PageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    affixUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    affixUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    banerId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TipCreateInput = {
    txHash: string
    amount: Decimal | DecimalJsLike | number | string
    value: Decimal | DecimalJsLike | number | string
    message: string
    displayed: boolean
    date?: Date | string
    receivedTokensAmount: Decimal | DecimalJsLike | number | string
    userRole: Role
    user: UserCreateNestedOneWithoutTipsInput
    userToken: UserTokenCreateNestedOneWithoutTipInput
    token: TokenCreateNestedOneWithoutTipInput
    tipper: TipperCreateNestedOneWithoutTipsInput
  }

  export type TipUncheckedCreateInput = {
    txHash: string
    amount: Decimal | DecimalJsLike | number | string
    value: Decimal | DecimalJsLike | number | string
    message: string
    displayed: boolean
    date?: Date | string
    receivedTokensAmount: Decimal | DecimalJsLike | number | string
    userRole: Role
    userAddress: string
    userTokenAddress: string
    tokenAddress: string
    tipperAddress: string
  }

  export type TipUpdateInput = {
    txHash?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    message?: StringFieldUpdateOperationsInput | string
    displayed?: BoolFieldUpdateOperationsInput | boolean
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedTokensAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    userRole?: EnumRoleFieldUpdateOperationsInput | Role
    user?: UserUpdateOneRequiredWithoutTipsNestedInput
    userToken?: UserTokenUpdateOneRequiredWithoutTipNestedInput
    token?: TokenUpdateOneRequiredWithoutTipNestedInput
    tipper?: TipperUpdateOneRequiredWithoutTipsNestedInput
  }

  export type TipUncheckedUpdateInput = {
    txHash?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    message?: StringFieldUpdateOperationsInput | string
    displayed?: BoolFieldUpdateOperationsInput | boolean
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedTokensAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    userRole?: EnumRoleFieldUpdateOperationsInput | Role
    userAddress?: StringFieldUpdateOperationsInput | string
    userTokenAddress?: StringFieldUpdateOperationsInput | string
    tokenAddress?: StringFieldUpdateOperationsInput | string
    tipperAddress?: StringFieldUpdateOperationsInput | string
  }

  export type TipCreateManyInput = {
    txHash: string
    amount: Decimal | DecimalJsLike | number | string
    value: Decimal | DecimalJsLike | number | string
    message: string
    displayed: boolean
    date?: Date | string
    receivedTokensAmount: Decimal | DecimalJsLike | number | string
    userRole: Role
    userAddress: string
    userTokenAddress: string
    tokenAddress: string
    tipperAddress: string
  }

  export type TipUpdateManyMutationInput = {
    txHash?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    message?: StringFieldUpdateOperationsInput | string
    displayed?: BoolFieldUpdateOperationsInput | boolean
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedTokensAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    userRole?: EnumRoleFieldUpdateOperationsInput | Role
  }

  export type TipUncheckedUpdateManyInput = {
    txHash?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    message?: StringFieldUpdateOperationsInput | string
    displayed?: BoolFieldUpdateOperationsInput | boolean
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedTokensAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    userRole?: EnumRoleFieldUpdateOperationsInput | Role
    userAddress?: StringFieldUpdateOperationsInput | string
    userTokenAddress?: StringFieldUpdateOperationsInput | string
    tokenAddress?: StringFieldUpdateOperationsInput | string
    tipperAddress?: StringFieldUpdateOperationsInput | string
  }

  export type UserTokenCreateInput = {
    address: string
    symbol: string
    name: string
    chainId: number
    txHash: string
    user: UserCreateNestedOneWithoutUserTokenInput
    Tip?: TipCreateNestedManyWithoutUserTokenInput
  }

  export type UserTokenUncheckedCreateInput = {
    address: string
    symbol: string
    name: string
    chainId: number
    txHash: string
    userAddress: string
    Tip?: TipUncheckedCreateNestedManyWithoutUserTokenInput
  }

  export type UserTokenUpdateInput = {
    address?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    txHash?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutUserTokenNestedInput
    Tip?: TipUpdateManyWithoutUserTokenNestedInput
  }

  export type UserTokenUncheckedUpdateInput = {
    address?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    txHash?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    Tip?: TipUncheckedUpdateManyWithoutUserTokenNestedInput
  }

  export type UserTokenCreateManyInput = {
    address: string
    symbol: string
    name: string
    chainId: number
    txHash: string
    userAddress: string
  }

  export type UserTokenUpdateManyMutationInput = {
    address?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    txHash?: StringFieldUpdateOperationsInput | string
  }

  export type UserTokenUncheckedUpdateManyInput = {
    address?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    txHash?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
  }

  export type WidgetCreateInput = {
    id?: string
    url: string
    songPath: string
    backgroundPath: string
    nickColor: string
    messageColor: string
    valueColor: string
    showTime: number
    filterProfanity: boolean
    voiceMessage: boolean
    Streamer?: StreamerCreateNestedOneWithoutWidgetsInput
  }

  export type WidgetUncheckedCreateInput = {
    id?: string
    url: string
    songPath: string
    backgroundPath: string
    nickColor: string
    messageColor: string
    valueColor: string
    showTime: number
    filterProfanity: boolean
    voiceMessage: boolean
    streamerAddress?: string | null
  }

  export type WidgetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    songPath?: StringFieldUpdateOperationsInput | string
    backgroundPath?: StringFieldUpdateOperationsInput | string
    nickColor?: StringFieldUpdateOperationsInput | string
    messageColor?: StringFieldUpdateOperationsInput | string
    valueColor?: StringFieldUpdateOperationsInput | string
    showTime?: IntFieldUpdateOperationsInput | number
    filterProfanity?: BoolFieldUpdateOperationsInput | boolean
    voiceMessage?: BoolFieldUpdateOperationsInput | boolean
    Streamer?: StreamerUpdateOneWithoutWidgetsNestedInput
  }

  export type WidgetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    songPath?: StringFieldUpdateOperationsInput | string
    backgroundPath?: StringFieldUpdateOperationsInput | string
    nickColor?: StringFieldUpdateOperationsInput | string
    messageColor?: StringFieldUpdateOperationsInput | string
    valueColor?: StringFieldUpdateOperationsInput | string
    showTime?: IntFieldUpdateOperationsInput | number
    filterProfanity?: BoolFieldUpdateOperationsInput | boolean
    voiceMessage?: BoolFieldUpdateOperationsInput | boolean
    streamerAddress?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WidgetCreateManyInput = {
    id?: string
    url: string
    songPath: string
    backgroundPath: string
    nickColor: string
    messageColor: string
    valueColor: string
    showTime: number
    filterProfanity: boolean
    voiceMessage: boolean
    streamerAddress?: string | null
  }

  export type WidgetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    songPath?: StringFieldUpdateOperationsInput | string
    backgroundPath?: StringFieldUpdateOperationsInput | string
    nickColor?: StringFieldUpdateOperationsInput | string
    messageColor?: StringFieldUpdateOperationsInput | string
    valueColor?: StringFieldUpdateOperationsInput | string
    showTime?: IntFieldUpdateOperationsInput | number
    filterProfanity?: BoolFieldUpdateOperationsInput | boolean
    voiceMessage?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WidgetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    songPath?: StringFieldUpdateOperationsInput | string
    backgroundPath?: StringFieldUpdateOperationsInput | string
    nickColor?: StringFieldUpdateOperationsInput | string
    messageColor?: StringFieldUpdateOperationsInput | string
    valueColor?: StringFieldUpdateOperationsInput | string
    showTime?: IntFieldUpdateOperationsInput | number
    filterProfanity?: BoolFieldUpdateOperationsInput | boolean
    voiceMessage?: BoolFieldUpdateOperationsInput | boolean
    streamerAddress?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TokenCreateInput = {
    address: string
    symbol: string
    name: string
    chainId: number
    image?: FileCreateNestedOneWithoutTokenInput
    latestPrice?: Decimal | DecimalJsLike | number | string | null
    priceUpdateAt?: Date | string | null
    Streamer?: StreamerCreateNestedOneWithoutActiveTokensInput
    Tip?: TipCreateNestedManyWithoutTokenInput
  }

  export type TokenUncheckedCreateInput = {
    address: string
    symbol: string
    name: string
    chainId: number
    imageId?: string | null
    latestPrice?: Decimal | DecimalJsLike | number | string | null
    priceUpdateAt?: Date | string | null
    streamerAddress?: string | null
    Tip?: TipUncheckedCreateNestedManyWithoutTokenInput
  }

  export type TokenUpdateInput = {
    address?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    image?: FileUpdateOneWithoutTokenNestedInput
    latestPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceUpdateAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Streamer?: StreamerUpdateOneWithoutActiveTokensNestedInput
    Tip?: TipUpdateManyWithoutTokenNestedInput
  }

  export type TokenUncheckedUpdateInput = {
    address?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    imageId?: NullableStringFieldUpdateOperationsInput | string | null
    latestPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceUpdateAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streamerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    Tip?: TipUncheckedUpdateManyWithoutTokenNestedInput
  }

  export type TokenCreateManyInput = {
    address: string
    symbol: string
    name: string
    chainId: number
    imageId?: string | null
    latestPrice?: Decimal | DecimalJsLike | number | string | null
    priceUpdateAt?: Date | string | null
    streamerAddress?: string | null
  }

  export type TokenUpdateManyMutationInput = {
    address?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    latestPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceUpdateAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TokenUncheckedUpdateManyInput = {
    address?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    imageId?: NullableStringFieldUpdateOperationsInput | string | null
    latestPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceUpdateAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streamerAddress?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WithdrawCreateInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    date?: Date | string
    txHash: string
    User?: UserCreateNestedOneWithoutWitdrawsInput
  }

  export type WithdrawUncheckedCreateInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    date?: Date | string
    txHash: string
    userAddress?: string | null
  }

  export type WithdrawUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    txHash?: StringFieldUpdateOperationsInput | string
    User?: UserUpdateOneWithoutWitdrawsNestedInput
  }

  export type WithdrawUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    txHash?: StringFieldUpdateOperationsInput | string
    userAddress?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WithdrawCreateManyInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    date?: Date | string
    txHash: string
    userAddress?: string | null
  }

  export type WithdrawUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    txHash?: StringFieldUpdateOperationsInput | string
  }

  export type WithdrawUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    txHash?: StringFieldUpdateOperationsInput | string
    userAddress?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FileCreateInput = {
    id?: string
    filename: string
    extension: string
    User?: UserCreateNestedManyWithoutAvatarInput
    Token?: TokenCreateNestedManyWithoutImageInput
    Page?: PageCreateNestedManyWithoutBanerInput
  }

  export type FileUncheckedCreateInput = {
    id?: string
    filename: string
    extension: string
    User?: UserUncheckedCreateNestedManyWithoutAvatarInput
    Token?: TokenUncheckedCreateNestedManyWithoutImageInput
    Page?: PageUncheckedCreateNestedManyWithoutBanerInput
  }

  export type FileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    User?: UserUpdateManyWithoutAvatarNestedInput
    Token?: TokenUpdateManyWithoutImageNestedInput
    Page?: PageUpdateManyWithoutBanerNestedInput
  }

  export type FileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    User?: UserUncheckedUpdateManyWithoutAvatarNestedInput
    Token?: TokenUncheckedUpdateManyWithoutImageNestedInput
    Page?: PageUncheckedUpdateManyWithoutBanerNestedInput
  }

  export type FileCreateManyInput = {
    id?: string
    filename: string
    extension: string
  }

  export type FileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
  }

  export type FileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type DecimalFilter = {
    equals?: Decimal | DecimalJsLike | number | string
    in?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    notIn?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    lt?: Decimal | DecimalJsLike | number | string
    lte?: Decimal | DecimalJsLike | number | string
    gt?: Decimal | DecimalJsLike | number | string
    gte?: Decimal | DecimalJsLike | number | string
    not?: NestedDecimalFilter | Decimal | DecimalJsLike | number | string
  }

  export type EnumApperanceModeFilter = {
    equals?: ApperanceMode
    in?: Enumerable<ApperanceMode>
    notIn?: Enumerable<ApperanceMode>
    not?: NestedEnumApperanceModeFilter | ApperanceMode
  }

  export type EnumRoleNullableListFilter = {
    equals?: Enumerable<Role> | null
    has?: Role | null
    hasEvery?: Enumerable<Role>
    hasSome?: Enumerable<Role>
    isEmpty?: boolean
  }

  export type EnumRoleFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleFilter | Role
  }

  export type StringNullableListFilter = {
    equals?: Enumerable<string> | null
    has?: string | null
    hasEvery?: Enumerable<string>
    hasSome?: Enumerable<string>
    isEmpty?: boolean
  }

  export type FileRelationFilter = {
    is?: FileWhereInput | null
    isNot?: FileWhereInput | null
  }

  export type WithdrawListRelationFilter = {
    every?: WithdrawWhereInput
    some?: WithdrawWhereInput
    none?: WithdrawWhereInput
  }

  export type UserTokenRelationFilter = {
    is?: UserTokenWhereInput
    isNot?: UserTokenWhereInput
  }

  export type TipListRelationFilter = {
    every?: TipWhereInput
    some?: TipWhereInput
    none?: TipWhereInput
  }

  export type StreamerRelationFilter = {
    is?: StreamerWhereInput | null
    isNot?: StreamerWhereInput | null
  }

  export type TipperRelationFilter = {
    is?: TipperWhereInput
    isNot?: TipperWhereInput
  }

  export type WithdrawOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TipOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    address?: SortOrder
    nick?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updateAt?: SortOrder
    allTipsCount?: SortOrder
    allTipsValue?: SortOrder
    allWithdrawsValue?: SortOrder
    apperanceMode?: SortOrder
    roles?: SortOrder
    defaultRole?: SortOrder
    refreshTokens?: SortOrder
    avatarId?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    allTipsCount?: SortOrder
    allTipsValue?: SortOrder
    allWithdrawsValue?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    address?: SortOrder
    nick?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updateAt?: SortOrder
    allTipsCount?: SortOrder
    allTipsValue?: SortOrder
    allWithdrawsValue?: SortOrder
    apperanceMode?: SortOrder
    defaultRole?: SortOrder
    avatarId?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    address?: SortOrder
    nick?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updateAt?: SortOrder
    allTipsCount?: SortOrder
    allTipsValue?: SortOrder
    allWithdrawsValue?: SortOrder
    apperanceMode?: SortOrder
    defaultRole?: SortOrder
    avatarId?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    allTipsCount?: SortOrder
    allTipsValue?: SortOrder
    allWithdrawsValue?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type DecimalWithAggregatesFilter = {
    equals?: Decimal | DecimalJsLike | number | string
    in?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    notIn?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    lt?: Decimal | DecimalJsLike | number | string
    lte?: Decimal | DecimalJsLike | number | string
    gt?: Decimal | DecimalJsLike | number | string
    gte?: Decimal | DecimalJsLike | number | string
    not?: NestedDecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter
    _avg?: NestedDecimalFilter
    _sum?: NestedDecimalFilter
    _min?: NestedDecimalFilter
    _max?: NestedDecimalFilter
  }

  export type EnumApperanceModeWithAggregatesFilter = {
    equals?: ApperanceMode
    in?: Enumerable<ApperanceMode>
    notIn?: Enumerable<ApperanceMode>
    not?: NestedEnumApperanceModeWithAggregatesFilter | ApperanceMode
    _count?: NestedIntFilter
    _min?: NestedEnumApperanceModeFilter
    _max?: NestedEnumApperanceModeFilter
  }

  export type EnumRoleWithAggregatesFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleWithAggregatesFilter | Role
    _count?: NestedIntFilter
    _min?: NestedEnumRoleFilter
    _max?: NestedEnumRoleFilter
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PageRelationFilter = {
    is?: PageWhereInput
    isNot?: PageWhereInput
  }

  export type TokenListRelationFilter = {
    every?: TokenWhereInput
    some?: TokenWhereInput
    none?: TokenWhereInput
  }

  export type WidgetListRelationFilter = {
    every?: WidgetWhereInput
    some?: WidgetWhereInput
    none?: WidgetWhereInput
  }

  export type TokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WidgetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StreamerCountOrderByAggregateInput = {
    address?: SortOrder
    tipsCount?: SortOrder
    tipsValue?: SortOrder
    pageId?: SortOrder
  }

  export type StreamerAvgOrderByAggregateInput = {
    tipsCount?: SortOrder
    tipsValue?: SortOrder
  }

  export type StreamerMaxOrderByAggregateInput = {
    address?: SortOrder
    tipsCount?: SortOrder
    tipsValue?: SortOrder
    pageId?: SortOrder
  }

  export type StreamerMinOrderByAggregateInput = {
    address?: SortOrder
    tipsCount?: SortOrder
    tipsValue?: SortOrder
    pageId?: SortOrder
  }

  export type StreamerSumOrderByAggregateInput = {
    tipsCount?: SortOrder
    tipsValue?: SortOrder
  }

  export type TipperCountOrderByAggregateInput = {
    address?: SortOrder
    nick?: SortOrder
    tipsValue?: SortOrder
  }

  export type TipperAvgOrderByAggregateInput = {
    tipsValue?: SortOrder
  }

  export type TipperMaxOrderByAggregateInput = {
    address?: SortOrder
    nick?: SortOrder
    tipsValue?: SortOrder
  }

  export type TipperMinOrderByAggregateInput = {
    address?: SortOrder
    nick?: SortOrder
    tipsValue?: SortOrder
  }

  export type TipperSumOrderByAggregateInput = {
    tipsValue?: SortOrder
  }

  export type StreamerListRelationFilter = {
    every?: StreamerWhereInput
    some?: StreamerWhereInput
    none?: StreamerWhereInput
  }

  export type StreamerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PageCountOrderByAggregateInput = {
    id?: SortOrder
    affixUrl?: SortOrder
    description?: SortOrder
    banerId?: SortOrder
  }

  export type PageMaxOrderByAggregateInput = {
    id?: SortOrder
    affixUrl?: SortOrder
    description?: SortOrder
    banerId?: SortOrder
  }

  export type PageMinOrderByAggregateInput = {
    id?: SortOrder
    affixUrl?: SortOrder
    description?: SortOrder
    banerId?: SortOrder
  }

  export type TokenRelationFilter = {
    is?: TokenWhereInput
    isNot?: TokenWhereInput
  }

  export type TipCountOrderByAggregateInput = {
    txHash?: SortOrder
    amount?: SortOrder
    value?: SortOrder
    message?: SortOrder
    displayed?: SortOrder
    date?: SortOrder
    receivedTokensAmount?: SortOrder
    userRole?: SortOrder
    userAddress?: SortOrder
    userTokenAddress?: SortOrder
    tokenAddress?: SortOrder
    tipperAddress?: SortOrder
  }

  export type TipAvgOrderByAggregateInput = {
    amount?: SortOrder
    value?: SortOrder
    receivedTokensAmount?: SortOrder
  }

  export type TipMaxOrderByAggregateInput = {
    txHash?: SortOrder
    amount?: SortOrder
    value?: SortOrder
    message?: SortOrder
    displayed?: SortOrder
    date?: SortOrder
    receivedTokensAmount?: SortOrder
    userRole?: SortOrder
    userAddress?: SortOrder
    userTokenAddress?: SortOrder
    tokenAddress?: SortOrder
    tipperAddress?: SortOrder
  }

  export type TipMinOrderByAggregateInput = {
    txHash?: SortOrder
    amount?: SortOrder
    value?: SortOrder
    message?: SortOrder
    displayed?: SortOrder
    date?: SortOrder
    receivedTokensAmount?: SortOrder
    userRole?: SortOrder
    userAddress?: SortOrder
    userTokenAddress?: SortOrder
    tokenAddress?: SortOrder
    tipperAddress?: SortOrder
  }

  export type TipSumOrderByAggregateInput = {
    amount?: SortOrder
    value?: SortOrder
    receivedTokensAmount?: SortOrder
  }

  export type UserTokenCountOrderByAggregateInput = {
    address?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    chainId?: SortOrder
    txHash?: SortOrder
    userAddress?: SortOrder
  }

  export type UserTokenAvgOrderByAggregateInput = {
    chainId?: SortOrder
  }

  export type UserTokenMaxOrderByAggregateInput = {
    address?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    chainId?: SortOrder
    txHash?: SortOrder
    userAddress?: SortOrder
  }

  export type UserTokenMinOrderByAggregateInput = {
    address?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    chainId?: SortOrder
    txHash?: SortOrder
    userAddress?: SortOrder
  }

  export type UserTokenSumOrderByAggregateInput = {
    chainId?: SortOrder
  }

  export type WidgetCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    songPath?: SortOrder
    backgroundPath?: SortOrder
    nickColor?: SortOrder
    messageColor?: SortOrder
    valueColor?: SortOrder
    showTime?: SortOrder
    filterProfanity?: SortOrder
    voiceMessage?: SortOrder
    streamerAddress?: SortOrder
  }

  export type WidgetAvgOrderByAggregateInput = {
    showTime?: SortOrder
  }

  export type WidgetMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    songPath?: SortOrder
    backgroundPath?: SortOrder
    nickColor?: SortOrder
    messageColor?: SortOrder
    valueColor?: SortOrder
    showTime?: SortOrder
    filterProfanity?: SortOrder
    voiceMessage?: SortOrder
    streamerAddress?: SortOrder
  }

  export type WidgetMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    songPath?: SortOrder
    backgroundPath?: SortOrder
    nickColor?: SortOrder
    messageColor?: SortOrder
    valueColor?: SortOrder
    showTime?: SortOrder
    filterProfanity?: SortOrder
    voiceMessage?: SortOrder
    streamerAddress?: SortOrder
  }

  export type WidgetSumOrderByAggregateInput = {
    showTime?: SortOrder
  }

  export type DecimalNullableFilter = {
    equals?: Decimal | DecimalJsLike | number | string | null
    in?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string> | null
    notIn?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string> | null
    lt?: Decimal | DecimalJsLike | number | string
    lte?: Decimal | DecimalJsLike | number | string
    gt?: Decimal | DecimalJsLike | number | string
    gte?: Decimal | DecimalJsLike | number | string
    not?: NestedDecimalNullableFilter | Decimal | DecimalJsLike | number | string | null
  }

  export type TokenCountOrderByAggregateInput = {
    address?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    chainId?: SortOrder
    imageId?: SortOrder
    latestPrice?: SortOrder
    priceUpdateAt?: SortOrder
    streamerAddress?: SortOrder
  }

  export type TokenAvgOrderByAggregateInput = {
    chainId?: SortOrder
    latestPrice?: SortOrder
  }

  export type TokenMaxOrderByAggregateInput = {
    address?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    chainId?: SortOrder
    imageId?: SortOrder
    latestPrice?: SortOrder
    priceUpdateAt?: SortOrder
    streamerAddress?: SortOrder
  }

  export type TokenMinOrderByAggregateInput = {
    address?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    chainId?: SortOrder
    imageId?: SortOrder
    latestPrice?: SortOrder
    priceUpdateAt?: SortOrder
    streamerAddress?: SortOrder
  }

  export type TokenSumOrderByAggregateInput = {
    chainId?: SortOrder
    latestPrice?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter = {
    equals?: Decimal | DecimalJsLike | number | string | null
    in?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string> | null
    notIn?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string> | null
    lt?: Decimal | DecimalJsLike | number | string
    lte?: Decimal | DecimalJsLike | number | string
    gt?: Decimal | DecimalJsLike | number | string
    gte?: Decimal | DecimalJsLike | number | string
    not?: NestedDecimalNullableWithAggregatesFilter | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter
    _avg?: NestedDecimalNullableFilter
    _sum?: NestedDecimalNullableFilter
    _min?: NestedDecimalNullableFilter
    _max?: NestedDecimalNullableFilter
  }

  export type WithdrawCountOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    txHash?: SortOrder
    userAddress?: SortOrder
  }

  export type WithdrawAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type WithdrawMaxOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    txHash?: SortOrder
    userAddress?: SortOrder
  }

  export type WithdrawMinOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    txHash?: SortOrder
    userAddress?: SortOrder
  }

  export type WithdrawSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type PageListRelationFilter = {
    every?: PageWhereInput
    some?: PageWhereInput
    none?: PageWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FileCountOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    extension?: SortOrder
  }

  export type FileMaxOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    extension?: SortOrder
  }

  export type FileMinOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    extension?: SortOrder
  }

  export type UserCreaterolesInput = {
    set: Enumerable<Role>
  }

  export type UserCreaterefreshTokensInput = {
    set: Enumerable<string>
  }

  export type FileCreateNestedOneWithoutUserInput = {
    create?: XOR<FileCreateWithoutUserInput, FileUncheckedCreateWithoutUserInput>
    connectOrCreate?: FileCreateOrConnectWithoutUserInput
    connect?: FileWhereUniqueInput
  }

  export type WithdrawCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<WithdrawCreateWithoutUserInput>, Enumerable<WithdrawUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<WithdrawCreateOrConnectWithoutUserInput>
    createMany?: WithdrawCreateManyUserInputEnvelope
    connect?: Enumerable<WithdrawWhereUniqueInput>
  }

  export type UserTokenCreateNestedOneWithoutUserInput = {
    create?: XOR<UserTokenCreateWithoutUserInput, UserTokenUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserTokenCreateOrConnectWithoutUserInput
    connect?: UserTokenWhereUniqueInput
  }

  export type TipCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<TipCreateWithoutUserInput>, Enumerable<TipUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TipCreateOrConnectWithoutUserInput>
    createMany?: TipCreateManyUserInputEnvelope
    connect?: Enumerable<TipWhereUniqueInput>
  }

  export type StreamerCreateNestedOneWithoutUserInput = {
    create?: XOR<StreamerCreateWithoutUserInput, StreamerUncheckedCreateWithoutUserInput>
    connectOrCreate?: StreamerCreateOrConnectWithoutUserInput
    connect?: StreamerWhereUniqueInput
  }

  export type TipperCreateNestedOneWithoutUserInput = {
    create?: XOR<TipperCreateWithoutUserInput, TipperUncheckedCreateWithoutUserInput>
    connectOrCreate?: TipperCreateOrConnectWithoutUserInput
    connect?: TipperWhereUniqueInput
  }

  export type WithdrawUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<WithdrawCreateWithoutUserInput>, Enumerable<WithdrawUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<WithdrawCreateOrConnectWithoutUserInput>
    createMany?: WithdrawCreateManyUserInputEnvelope
    connect?: Enumerable<WithdrawWhereUniqueInput>
  }

  export type UserTokenUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserTokenCreateWithoutUserInput, UserTokenUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserTokenCreateOrConnectWithoutUserInput
    connect?: UserTokenWhereUniqueInput
  }

  export type TipUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<TipCreateWithoutUserInput>, Enumerable<TipUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TipCreateOrConnectWithoutUserInput>
    createMany?: TipCreateManyUserInputEnvelope
    connect?: Enumerable<TipWhereUniqueInput>
  }

  export type StreamerUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<StreamerCreateWithoutUserInput, StreamerUncheckedCreateWithoutUserInput>
    connectOrCreate?: StreamerCreateOrConnectWithoutUserInput
    connect?: StreamerWhereUniqueInput
  }

  export type TipperUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<TipperCreateWithoutUserInput, TipperUncheckedCreateWithoutUserInput>
    connectOrCreate?: TipperCreateOrConnectWithoutUserInput
    connect?: TipperWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumApperanceModeFieldUpdateOperationsInput = {
    set?: ApperanceMode
  }

  export type UserUpdaterolesInput = {
    set?: Enumerable<Role>
    push?: Enumerable<Role>
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: Role
  }

  export type UserUpdaterefreshTokensInput = {
    set?: Enumerable<string>
    push?: string | Enumerable<string>
  }

  export type FileUpdateOneWithoutUserNestedInput = {
    create?: XOR<FileCreateWithoutUserInput, FileUncheckedCreateWithoutUserInput>
    connectOrCreate?: FileCreateOrConnectWithoutUserInput
    upsert?: FileUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: FileWhereUniqueInput
    update?: XOR<FileUpdateWithoutUserInput, FileUncheckedUpdateWithoutUserInput>
  }

  export type WithdrawUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<WithdrawCreateWithoutUserInput>, Enumerable<WithdrawUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<WithdrawCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<WithdrawUpsertWithWhereUniqueWithoutUserInput>
    createMany?: WithdrawCreateManyUserInputEnvelope
    set?: Enumerable<WithdrawWhereUniqueInput>
    disconnect?: Enumerable<WithdrawWhereUniqueInput>
    delete?: Enumerable<WithdrawWhereUniqueInput>
    connect?: Enumerable<WithdrawWhereUniqueInput>
    update?: Enumerable<WithdrawUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<WithdrawUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<WithdrawScalarWhereInput>
  }

  export type UserTokenUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserTokenCreateWithoutUserInput, UserTokenUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserTokenCreateOrConnectWithoutUserInput
    upsert?: UserTokenUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: UserTokenWhereUniqueInput
    update?: XOR<UserTokenUpdateWithoutUserInput, UserTokenUncheckedUpdateWithoutUserInput>
  }

  export type TipUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<TipCreateWithoutUserInput>, Enumerable<TipUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TipCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<TipUpsertWithWhereUniqueWithoutUserInput>
    createMany?: TipCreateManyUserInputEnvelope
    set?: Enumerable<TipWhereUniqueInput>
    disconnect?: Enumerable<TipWhereUniqueInput>
    delete?: Enumerable<TipWhereUniqueInput>
    connect?: Enumerable<TipWhereUniqueInput>
    update?: Enumerable<TipUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<TipUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<TipScalarWhereInput>
  }

  export type StreamerUpdateOneWithoutUserNestedInput = {
    create?: XOR<StreamerCreateWithoutUserInput, StreamerUncheckedCreateWithoutUserInput>
    connectOrCreate?: StreamerCreateOrConnectWithoutUserInput
    upsert?: StreamerUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: StreamerWhereUniqueInput
    update?: XOR<StreamerUpdateWithoutUserInput, StreamerUncheckedUpdateWithoutUserInput>
  }

  export type TipperUpdateOneWithoutUserNestedInput = {
    create?: XOR<TipperCreateWithoutUserInput, TipperUncheckedCreateWithoutUserInput>
    connectOrCreate?: TipperCreateOrConnectWithoutUserInput
    upsert?: TipperUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: TipperWhereUniqueInput
    update?: XOR<TipperUpdateWithoutUserInput, TipperUncheckedUpdateWithoutUserInput>
  }

  export type WithdrawUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<WithdrawCreateWithoutUserInput>, Enumerable<WithdrawUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<WithdrawCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<WithdrawUpsertWithWhereUniqueWithoutUserInput>
    createMany?: WithdrawCreateManyUserInputEnvelope
    set?: Enumerable<WithdrawWhereUniqueInput>
    disconnect?: Enumerable<WithdrawWhereUniqueInput>
    delete?: Enumerable<WithdrawWhereUniqueInput>
    connect?: Enumerable<WithdrawWhereUniqueInput>
    update?: Enumerable<WithdrawUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<WithdrawUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<WithdrawScalarWhereInput>
  }

  export type UserTokenUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserTokenCreateWithoutUserInput, UserTokenUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserTokenCreateOrConnectWithoutUserInput
    upsert?: UserTokenUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: UserTokenWhereUniqueInput
    update?: XOR<UserTokenUpdateWithoutUserInput, UserTokenUncheckedUpdateWithoutUserInput>
  }

  export type TipUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<TipCreateWithoutUserInput>, Enumerable<TipUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TipCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<TipUpsertWithWhereUniqueWithoutUserInput>
    createMany?: TipCreateManyUserInputEnvelope
    set?: Enumerable<TipWhereUniqueInput>
    disconnect?: Enumerable<TipWhereUniqueInput>
    delete?: Enumerable<TipWhereUniqueInput>
    connect?: Enumerable<TipWhereUniqueInput>
    update?: Enumerable<TipUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<TipUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<TipScalarWhereInput>
  }

  export type StreamerUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<StreamerCreateWithoutUserInput, StreamerUncheckedCreateWithoutUserInput>
    connectOrCreate?: StreamerCreateOrConnectWithoutUserInput
    upsert?: StreamerUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: StreamerWhereUniqueInput
    update?: XOR<StreamerUpdateWithoutUserInput, StreamerUncheckedUpdateWithoutUserInput>
  }

  export type TipperUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<TipperCreateWithoutUserInput, TipperUncheckedCreateWithoutUserInput>
    connectOrCreate?: TipperCreateOrConnectWithoutUserInput
    upsert?: TipperUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: TipperWhereUniqueInput
    update?: XOR<TipperUpdateWithoutUserInput, TipperUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutStreamerInput = {
    create?: XOR<UserCreateWithoutStreamerInput, UserUncheckedCreateWithoutStreamerInput>
    connectOrCreate?: UserCreateOrConnectWithoutStreamerInput
    connect?: UserWhereUniqueInput
  }

  export type PageCreateNestedOneWithoutStreamerInput = {
    create?: XOR<PageCreateWithoutStreamerInput, PageUncheckedCreateWithoutStreamerInput>
    connectOrCreate?: PageCreateOrConnectWithoutStreamerInput
    connect?: PageWhereUniqueInput
  }

  export type TokenCreateNestedManyWithoutStreamerInput = {
    create?: XOR<Enumerable<TokenCreateWithoutStreamerInput>, Enumerable<TokenUncheckedCreateWithoutStreamerInput>>
    connectOrCreate?: Enumerable<TokenCreateOrConnectWithoutStreamerInput>
    createMany?: TokenCreateManyStreamerInputEnvelope
    connect?: Enumerable<TokenWhereUniqueInput>
  }

  export type WidgetCreateNestedManyWithoutStreamerInput = {
    create?: XOR<Enumerable<WidgetCreateWithoutStreamerInput>, Enumerable<WidgetUncheckedCreateWithoutStreamerInput>>
    connectOrCreate?: Enumerable<WidgetCreateOrConnectWithoutStreamerInput>
    createMany?: WidgetCreateManyStreamerInputEnvelope
    connect?: Enumerable<WidgetWhereUniqueInput>
  }

  export type TokenUncheckedCreateNestedManyWithoutStreamerInput = {
    create?: XOR<Enumerable<TokenCreateWithoutStreamerInput>, Enumerable<TokenUncheckedCreateWithoutStreamerInput>>
    connectOrCreate?: Enumerable<TokenCreateOrConnectWithoutStreamerInput>
    createMany?: TokenCreateManyStreamerInputEnvelope
    connect?: Enumerable<TokenWhereUniqueInput>
  }

  export type WidgetUncheckedCreateNestedManyWithoutStreamerInput = {
    create?: XOR<Enumerable<WidgetCreateWithoutStreamerInput>, Enumerable<WidgetUncheckedCreateWithoutStreamerInput>>
    connectOrCreate?: Enumerable<WidgetCreateOrConnectWithoutStreamerInput>
    createMany?: WidgetCreateManyStreamerInputEnvelope
    connect?: Enumerable<WidgetWhereUniqueInput>
  }

  export type UserUpdateOneRequiredWithoutStreamerNestedInput = {
    create?: XOR<UserCreateWithoutStreamerInput, UserUncheckedCreateWithoutStreamerInput>
    connectOrCreate?: UserCreateOrConnectWithoutStreamerInput
    upsert?: UserUpsertWithoutStreamerInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutStreamerInput, UserUncheckedUpdateWithoutStreamerInput>
  }

  export type PageUpdateOneRequiredWithoutStreamerNestedInput = {
    create?: XOR<PageCreateWithoutStreamerInput, PageUncheckedCreateWithoutStreamerInput>
    connectOrCreate?: PageCreateOrConnectWithoutStreamerInput
    upsert?: PageUpsertWithoutStreamerInput
    connect?: PageWhereUniqueInput
    update?: XOR<PageUpdateWithoutStreamerInput, PageUncheckedUpdateWithoutStreamerInput>
  }

  export type TokenUpdateManyWithoutStreamerNestedInput = {
    create?: XOR<Enumerable<TokenCreateWithoutStreamerInput>, Enumerable<TokenUncheckedCreateWithoutStreamerInput>>
    connectOrCreate?: Enumerable<TokenCreateOrConnectWithoutStreamerInput>
    upsert?: Enumerable<TokenUpsertWithWhereUniqueWithoutStreamerInput>
    createMany?: TokenCreateManyStreamerInputEnvelope
    set?: Enumerable<TokenWhereUniqueInput>
    disconnect?: Enumerable<TokenWhereUniqueInput>
    delete?: Enumerable<TokenWhereUniqueInput>
    connect?: Enumerable<TokenWhereUniqueInput>
    update?: Enumerable<TokenUpdateWithWhereUniqueWithoutStreamerInput>
    updateMany?: Enumerable<TokenUpdateManyWithWhereWithoutStreamerInput>
    deleteMany?: Enumerable<TokenScalarWhereInput>
  }

  export type WidgetUpdateManyWithoutStreamerNestedInput = {
    create?: XOR<Enumerable<WidgetCreateWithoutStreamerInput>, Enumerable<WidgetUncheckedCreateWithoutStreamerInput>>
    connectOrCreate?: Enumerable<WidgetCreateOrConnectWithoutStreamerInput>
    upsert?: Enumerable<WidgetUpsertWithWhereUniqueWithoutStreamerInput>
    createMany?: WidgetCreateManyStreamerInputEnvelope
    set?: Enumerable<WidgetWhereUniqueInput>
    disconnect?: Enumerable<WidgetWhereUniqueInput>
    delete?: Enumerable<WidgetWhereUniqueInput>
    connect?: Enumerable<WidgetWhereUniqueInput>
    update?: Enumerable<WidgetUpdateWithWhereUniqueWithoutStreamerInput>
    updateMany?: Enumerable<WidgetUpdateManyWithWhereWithoutStreamerInput>
    deleteMany?: Enumerable<WidgetScalarWhereInput>
  }

  export type TokenUncheckedUpdateManyWithoutStreamerNestedInput = {
    create?: XOR<Enumerable<TokenCreateWithoutStreamerInput>, Enumerable<TokenUncheckedCreateWithoutStreamerInput>>
    connectOrCreate?: Enumerable<TokenCreateOrConnectWithoutStreamerInput>
    upsert?: Enumerable<TokenUpsertWithWhereUniqueWithoutStreamerInput>
    createMany?: TokenCreateManyStreamerInputEnvelope
    set?: Enumerable<TokenWhereUniqueInput>
    disconnect?: Enumerable<TokenWhereUniqueInput>
    delete?: Enumerable<TokenWhereUniqueInput>
    connect?: Enumerable<TokenWhereUniqueInput>
    update?: Enumerable<TokenUpdateWithWhereUniqueWithoutStreamerInput>
    updateMany?: Enumerable<TokenUpdateManyWithWhereWithoutStreamerInput>
    deleteMany?: Enumerable<TokenScalarWhereInput>
  }

  export type WidgetUncheckedUpdateManyWithoutStreamerNestedInput = {
    create?: XOR<Enumerable<WidgetCreateWithoutStreamerInput>, Enumerable<WidgetUncheckedCreateWithoutStreamerInput>>
    connectOrCreate?: Enumerable<WidgetCreateOrConnectWithoutStreamerInput>
    upsert?: Enumerable<WidgetUpsertWithWhereUniqueWithoutStreamerInput>
    createMany?: WidgetCreateManyStreamerInputEnvelope
    set?: Enumerable<WidgetWhereUniqueInput>
    disconnect?: Enumerable<WidgetWhereUniqueInput>
    delete?: Enumerable<WidgetWhereUniqueInput>
    connect?: Enumerable<WidgetWhereUniqueInput>
    update?: Enumerable<WidgetUpdateWithWhereUniqueWithoutStreamerInput>
    updateMany?: Enumerable<WidgetUpdateManyWithWhereWithoutStreamerInput>
    deleteMany?: Enumerable<WidgetScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutTipperInput = {
    create?: XOR<UserCreateWithoutTipperInput, UserUncheckedCreateWithoutTipperInput>
    connectOrCreate?: UserCreateOrConnectWithoutTipperInput
    connect?: UserWhereUniqueInput
  }

  export type TipCreateNestedManyWithoutTipperInput = {
    create?: XOR<Enumerable<TipCreateWithoutTipperInput>, Enumerable<TipUncheckedCreateWithoutTipperInput>>
    connectOrCreate?: Enumerable<TipCreateOrConnectWithoutTipperInput>
    createMany?: TipCreateManyTipperInputEnvelope
    connect?: Enumerable<TipWhereUniqueInput>
  }

  export type TipUncheckedCreateNestedManyWithoutTipperInput = {
    create?: XOR<Enumerable<TipCreateWithoutTipperInput>, Enumerable<TipUncheckedCreateWithoutTipperInput>>
    connectOrCreate?: Enumerable<TipCreateOrConnectWithoutTipperInput>
    createMany?: TipCreateManyTipperInputEnvelope
    connect?: Enumerable<TipWhereUniqueInput>
  }

  export type UserUpdateOneRequiredWithoutTipperNestedInput = {
    create?: XOR<UserCreateWithoutTipperInput, UserUncheckedCreateWithoutTipperInput>
    connectOrCreate?: UserCreateOrConnectWithoutTipperInput
    upsert?: UserUpsertWithoutTipperInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutTipperInput, UserUncheckedUpdateWithoutTipperInput>
  }

  export type TipUpdateManyWithoutTipperNestedInput = {
    create?: XOR<Enumerable<TipCreateWithoutTipperInput>, Enumerable<TipUncheckedCreateWithoutTipperInput>>
    connectOrCreate?: Enumerable<TipCreateOrConnectWithoutTipperInput>
    upsert?: Enumerable<TipUpsertWithWhereUniqueWithoutTipperInput>
    createMany?: TipCreateManyTipperInputEnvelope
    set?: Enumerable<TipWhereUniqueInput>
    disconnect?: Enumerable<TipWhereUniqueInput>
    delete?: Enumerable<TipWhereUniqueInput>
    connect?: Enumerable<TipWhereUniqueInput>
    update?: Enumerable<TipUpdateWithWhereUniqueWithoutTipperInput>
    updateMany?: Enumerable<TipUpdateManyWithWhereWithoutTipperInput>
    deleteMany?: Enumerable<TipScalarWhereInput>
  }

  export type TipUncheckedUpdateManyWithoutTipperNestedInput = {
    create?: XOR<Enumerable<TipCreateWithoutTipperInput>, Enumerable<TipUncheckedCreateWithoutTipperInput>>
    connectOrCreate?: Enumerable<TipCreateOrConnectWithoutTipperInput>
    upsert?: Enumerable<TipUpsertWithWhereUniqueWithoutTipperInput>
    createMany?: TipCreateManyTipperInputEnvelope
    set?: Enumerable<TipWhereUniqueInput>
    disconnect?: Enumerable<TipWhereUniqueInput>
    delete?: Enumerable<TipWhereUniqueInput>
    connect?: Enumerable<TipWhereUniqueInput>
    update?: Enumerable<TipUpdateWithWhereUniqueWithoutTipperInput>
    updateMany?: Enumerable<TipUpdateManyWithWhereWithoutTipperInput>
    deleteMany?: Enumerable<TipScalarWhereInput>
  }

  export type FileCreateNestedOneWithoutPageInput = {
    create?: XOR<FileCreateWithoutPageInput, FileUncheckedCreateWithoutPageInput>
    connectOrCreate?: FileCreateOrConnectWithoutPageInput
    connect?: FileWhereUniqueInput
  }

  export type StreamerCreateNestedManyWithoutPageInput = {
    create?: XOR<Enumerable<StreamerCreateWithoutPageInput>, Enumerable<StreamerUncheckedCreateWithoutPageInput>>
    connectOrCreate?: Enumerable<StreamerCreateOrConnectWithoutPageInput>
    createMany?: StreamerCreateManyPageInputEnvelope
    connect?: Enumerable<StreamerWhereUniqueInput>
  }

  export type StreamerUncheckedCreateNestedManyWithoutPageInput = {
    create?: XOR<Enumerable<StreamerCreateWithoutPageInput>, Enumerable<StreamerUncheckedCreateWithoutPageInput>>
    connectOrCreate?: Enumerable<StreamerCreateOrConnectWithoutPageInput>
    createMany?: StreamerCreateManyPageInputEnvelope
    connect?: Enumerable<StreamerWhereUniqueInput>
  }

  export type FileUpdateOneWithoutPageNestedInput = {
    create?: XOR<FileCreateWithoutPageInput, FileUncheckedCreateWithoutPageInput>
    connectOrCreate?: FileCreateOrConnectWithoutPageInput
    upsert?: FileUpsertWithoutPageInput
    disconnect?: boolean
    delete?: boolean
    connect?: FileWhereUniqueInput
    update?: XOR<FileUpdateWithoutPageInput, FileUncheckedUpdateWithoutPageInput>
  }

  export type StreamerUpdateManyWithoutPageNestedInput = {
    create?: XOR<Enumerable<StreamerCreateWithoutPageInput>, Enumerable<StreamerUncheckedCreateWithoutPageInput>>
    connectOrCreate?: Enumerable<StreamerCreateOrConnectWithoutPageInput>
    upsert?: Enumerable<StreamerUpsertWithWhereUniqueWithoutPageInput>
    createMany?: StreamerCreateManyPageInputEnvelope
    set?: Enumerable<StreamerWhereUniqueInput>
    disconnect?: Enumerable<StreamerWhereUniqueInput>
    delete?: Enumerable<StreamerWhereUniqueInput>
    connect?: Enumerable<StreamerWhereUniqueInput>
    update?: Enumerable<StreamerUpdateWithWhereUniqueWithoutPageInput>
    updateMany?: Enumerable<StreamerUpdateManyWithWhereWithoutPageInput>
    deleteMany?: Enumerable<StreamerScalarWhereInput>
  }

  export type StreamerUncheckedUpdateManyWithoutPageNestedInput = {
    create?: XOR<Enumerable<StreamerCreateWithoutPageInput>, Enumerable<StreamerUncheckedCreateWithoutPageInput>>
    connectOrCreate?: Enumerable<StreamerCreateOrConnectWithoutPageInput>
    upsert?: Enumerable<StreamerUpsertWithWhereUniqueWithoutPageInput>
    createMany?: StreamerCreateManyPageInputEnvelope
    set?: Enumerable<StreamerWhereUniqueInput>
    disconnect?: Enumerable<StreamerWhereUniqueInput>
    delete?: Enumerable<StreamerWhereUniqueInput>
    connect?: Enumerable<StreamerWhereUniqueInput>
    update?: Enumerable<StreamerUpdateWithWhereUniqueWithoutPageInput>
    updateMany?: Enumerable<StreamerUpdateManyWithWhereWithoutPageInput>
    deleteMany?: Enumerable<StreamerScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutTipsInput = {
    create?: XOR<UserCreateWithoutTipsInput, UserUncheckedCreateWithoutTipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTipsInput
    connect?: UserWhereUniqueInput
  }

  export type UserTokenCreateNestedOneWithoutTipInput = {
    create?: XOR<UserTokenCreateWithoutTipInput, UserTokenUncheckedCreateWithoutTipInput>
    connectOrCreate?: UserTokenCreateOrConnectWithoutTipInput
    connect?: UserTokenWhereUniqueInput
  }

  export type TokenCreateNestedOneWithoutTipInput = {
    create?: XOR<TokenCreateWithoutTipInput, TokenUncheckedCreateWithoutTipInput>
    connectOrCreate?: TokenCreateOrConnectWithoutTipInput
    connect?: TokenWhereUniqueInput
  }

  export type TipperCreateNestedOneWithoutTipsInput = {
    create?: XOR<TipperCreateWithoutTipsInput, TipperUncheckedCreateWithoutTipsInput>
    connectOrCreate?: TipperCreateOrConnectWithoutTipsInput
    connect?: TipperWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutTipsNestedInput = {
    create?: XOR<UserCreateWithoutTipsInput, UserUncheckedCreateWithoutTipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTipsInput
    upsert?: UserUpsertWithoutTipsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutTipsInput, UserUncheckedUpdateWithoutTipsInput>
  }

  export type UserTokenUpdateOneRequiredWithoutTipNestedInput = {
    create?: XOR<UserTokenCreateWithoutTipInput, UserTokenUncheckedCreateWithoutTipInput>
    connectOrCreate?: UserTokenCreateOrConnectWithoutTipInput
    upsert?: UserTokenUpsertWithoutTipInput
    connect?: UserTokenWhereUniqueInput
    update?: XOR<UserTokenUpdateWithoutTipInput, UserTokenUncheckedUpdateWithoutTipInput>
  }

  export type TokenUpdateOneRequiredWithoutTipNestedInput = {
    create?: XOR<TokenCreateWithoutTipInput, TokenUncheckedCreateWithoutTipInput>
    connectOrCreate?: TokenCreateOrConnectWithoutTipInput
    upsert?: TokenUpsertWithoutTipInput
    connect?: TokenWhereUniqueInput
    update?: XOR<TokenUpdateWithoutTipInput, TokenUncheckedUpdateWithoutTipInput>
  }

  export type TipperUpdateOneRequiredWithoutTipsNestedInput = {
    create?: XOR<TipperCreateWithoutTipsInput, TipperUncheckedCreateWithoutTipsInput>
    connectOrCreate?: TipperCreateOrConnectWithoutTipsInput
    upsert?: TipperUpsertWithoutTipsInput
    connect?: TipperWhereUniqueInput
    update?: XOR<TipperUpdateWithoutTipsInput, TipperUncheckedUpdateWithoutTipsInput>
  }

  export type UserCreateNestedOneWithoutUserTokenInput = {
    create?: XOR<UserCreateWithoutUserTokenInput, UserUncheckedCreateWithoutUserTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserTokenInput
    connect?: UserWhereUniqueInput
  }

  export type TipCreateNestedManyWithoutUserTokenInput = {
    create?: XOR<Enumerable<TipCreateWithoutUserTokenInput>, Enumerable<TipUncheckedCreateWithoutUserTokenInput>>
    connectOrCreate?: Enumerable<TipCreateOrConnectWithoutUserTokenInput>
    createMany?: TipCreateManyUserTokenInputEnvelope
    connect?: Enumerable<TipWhereUniqueInput>
  }

  export type TipUncheckedCreateNestedManyWithoutUserTokenInput = {
    create?: XOR<Enumerable<TipCreateWithoutUserTokenInput>, Enumerable<TipUncheckedCreateWithoutUserTokenInput>>
    connectOrCreate?: Enumerable<TipCreateOrConnectWithoutUserTokenInput>
    createMany?: TipCreateManyUserTokenInputEnvelope
    connect?: Enumerable<TipWhereUniqueInput>
  }

  export type UserUpdateOneRequiredWithoutUserTokenNestedInput = {
    create?: XOR<UserCreateWithoutUserTokenInput, UserUncheckedCreateWithoutUserTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserTokenInput
    upsert?: UserUpsertWithoutUserTokenInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutUserTokenInput, UserUncheckedUpdateWithoutUserTokenInput>
  }

  export type TipUpdateManyWithoutUserTokenNestedInput = {
    create?: XOR<Enumerable<TipCreateWithoutUserTokenInput>, Enumerable<TipUncheckedCreateWithoutUserTokenInput>>
    connectOrCreate?: Enumerable<TipCreateOrConnectWithoutUserTokenInput>
    upsert?: Enumerable<TipUpsertWithWhereUniqueWithoutUserTokenInput>
    createMany?: TipCreateManyUserTokenInputEnvelope
    set?: Enumerable<TipWhereUniqueInput>
    disconnect?: Enumerable<TipWhereUniqueInput>
    delete?: Enumerable<TipWhereUniqueInput>
    connect?: Enumerable<TipWhereUniqueInput>
    update?: Enumerable<TipUpdateWithWhereUniqueWithoutUserTokenInput>
    updateMany?: Enumerable<TipUpdateManyWithWhereWithoutUserTokenInput>
    deleteMany?: Enumerable<TipScalarWhereInput>
  }

  export type TipUncheckedUpdateManyWithoutUserTokenNestedInput = {
    create?: XOR<Enumerable<TipCreateWithoutUserTokenInput>, Enumerable<TipUncheckedCreateWithoutUserTokenInput>>
    connectOrCreate?: Enumerable<TipCreateOrConnectWithoutUserTokenInput>
    upsert?: Enumerable<TipUpsertWithWhereUniqueWithoutUserTokenInput>
    createMany?: TipCreateManyUserTokenInputEnvelope
    set?: Enumerable<TipWhereUniqueInput>
    disconnect?: Enumerable<TipWhereUniqueInput>
    delete?: Enumerable<TipWhereUniqueInput>
    connect?: Enumerable<TipWhereUniqueInput>
    update?: Enumerable<TipUpdateWithWhereUniqueWithoutUserTokenInput>
    updateMany?: Enumerable<TipUpdateManyWithWhereWithoutUserTokenInput>
    deleteMany?: Enumerable<TipScalarWhereInput>
  }

  export type StreamerCreateNestedOneWithoutWidgetsInput = {
    create?: XOR<StreamerCreateWithoutWidgetsInput, StreamerUncheckedCreateWithoutWidgetsInput>
    connectOrCreate?: StreamerCreateOrConnectWithoutWidgetsInput
    connect?: StreamerWhereUniqueInput
  }

  export type StreamerUpdateOneWithoutWidgetsNestedInput = {
    create?: XOR<StreamerCreateWithoutWidgetsInput, StreamerUncheckedCreateWithoutWidgetsInput>
    connectOrCreate?: StreamerCreateOrConnectWithoutWidgetsInput
    upsert?: StreamerUpsertWithoutWidgetsInput
    disconnect?: boolean
    delete?: boolean
    connect?: StreamerWhereUniqueInput
    update?: XOR<StreamerUpdateWithoutWidgetsInput, StreamerUncheckedUpdateWithoutWidgetsInput>
  }

  export type FileCreateNestedOneWithoutTokenInput = {
    create?: XOR<FileCreateWithoutTokenInput, FileUncheckedCreateWithoutTokenInput>
    connectOrCreate?: FileCreateOrConnectWithoutTokenInput
    connect?: FileWhereUniqueInput
  }

  export type StreamerCreateNestedOneWithoutActiveTokensInput = {
    create?: XOR<StreamerCreateWithoutActiveTokensInput, StreamerUncheckedCreateWithoutActiveTokensInput>
    connectOrCreate?: StreamerCreateOrConnectWithoutActiveTokensInput
    connect?: StreamerWhereUniqueInput
  }

  export type TipCreateNestedManyWithoutTokenInput = {
    create?: XOR<Enumerable<TipCreateWithoutTokenInput>, Enumerable<TipUncheckedCreateWithoutTokenInput>>
    connectOrCreate?: Enumerable<TipCreateOrConnectWithoutTokenInput>
    createMany?: TipCreateManyTokenInputEnvelope
    connect?: Enumerable<TipWhereUniqueInput>
  }

  export type TipUncheckedCreateNestedManyWithoutTokenInput = {
    create?: XOR<Enumerable<TipCreateWithoutTokenInput>, Enumerable<TipUncheckedCreateWithoutTokenInput>>
    connectOrCreate?: Enumerable<TipCreateOrConnectWithoutTokenInput>
    createMany?: TipCreateManyTokenInputEnvelope
    connect?: Enumerable<TipWhereUniqueInput>
  }

  export type FileUpdateOneWithoutTokenNestedInput = {
    create?: XOR<FileCreateWithoutTokenInput, FileUncheckedCreateWithoutTokenInput>
    connectOrCreate?: FileCreateOrConnectWithoutTokenInput
    upsert?: FileUpsertWithoutTokenInput
    disconnect?: boolean
    delete?: boolean
    connect?: FileWhereUniqueInput
    update?: XOR<FileUpdateWithoutTokenInput, FileUncheckedUpdateWithoutTokenInput>
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type StreamerUpdateOneWithoutActiveTokensNestedInput = {
    create?: XOR<StreamerCreateWithoutActiveTokensInput, StreamerUncheckedCreateWithoutActiveTokensInput>
    connectOrCreate?: StreamerCreateOrConnectWithoutActiveTokensInput
    upsert?: StreamerUpsertWithoutActiveTokensInput
    disconnect?: boolean
    delete?: boolean
    connect?: StreamerWhereUniqueInput
    update?: XOR<StreamerUpdateWithoutActiveTokensInput, StreamerUncheckedUpdateWithoutActiveTokensInput>
  }

  export type TipUpdateManyWithoutTokenNestedInput = {
    create?: XOR<Enumerable<TipCreateWithoutTokenInput>, Enumerable<TipUncheckedCreateWithoutTokenInput>>
    connectOrCreate?: Enumerable<TipCreateOrConnectWithoutTokenInput>
    upsert?: Enumerable<TipUpsertWithWhereUniqueWithoutTokenInput>
    createMany?: TipCreateManyTokenInputEnvelope
    set?: Enumerable<TipWhereUniqueInput>
    disconnect?: Enumerable<TipWhereUniqueInput>
    delete?: Enumerable<TipWhereUniqueInput>
    connect?: Enumerable<TipWhereUniqueInput>
    update?: Enumerable<TipUpdateWithWhereUniqueWithoutTokenInput>
    updateMany?: Enumerable<TipUpdateManyWithWhereWithoutTokenInput>
    deleteMany?: Enumerable<TipScalarWhereInput>
  }

  export type TipUncheckedUpdateManyWithoutTokenNestedInput = {
    create?: XOR<Enumerable<TipCreateWithoutTokenInput>, Enumerable<TipUncheckedCreateWithoutTokenInput>>
    connectOrCreate?: Enumerable<TipCreateOrConnectWithoutTokenInput>
    upsert?: Enumerable<TipUpsertWithWhereUniqueWithoutTokenInput>
    createMany?: TipCreateManyTokenInputEnvelope
    set?: Enumerable<TipWhereUniqueInput>
    disconnect?: Enumerable<TipWhereUniqueInput>
    delete?: Enumerable<TipWhereUniqueInput>
    connect?: Enumerable<TipWhereUniqueInput>
    update?: Enumerable<TipUpdateWithWhereUniqueWithoutTokenInput>
    updateMany?: Enumerable<TipUpdateManyWithWhereWithoutTokenInput>
    deleteMany?: Enumerable<TipScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutWitdrawsInput = {
    create?: XOR<UserCreateWithoutWitdrawsInput, UserUncheckedCreateWithoutWitdrawsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWitdrawsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutWitdrawsNestedInput = {
    create?: XOR<UserCreateWithoutWitdrawsInput, UserUncheckedCreateWithoutWitdrawsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWitdrawsInput
    upsert?: UserUpsertWithoutWitdrawsInput
    disconnect?: boolean
    delete?: boolean
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutWitdrawsInput, UserUncheckedUpdateWithoutWitdrawsInput>
  }

  export type UserCreateNestedManyWithoutAvatarInput = {
    create?: XOR<Enumerable<UserCreateWithoutAvatarInput>, Enumerable<UserUncheckedCreateWithoutAvatarInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutAvatarInput>
    createMany?: UserCreateManyAvatarInputEnvelope
    connect?: Enumerable<UserWhereUniqueInput>
  }

  export type TokenCreateNestedManyWithoutImageInput = {
    create?: XOR<Enumerable<TokenCreateWithoutImageInput>, Enumerable<TokenUncheckedCreateWithoutImageInput>>
    connectOrCreate?: Enumerable<TokenCreateOrConnectWithoutImageInput>
    createMany?: TokenCreateManyImageInputEnvelope
    connect?: Enumerable<TokenWhereUniqueInput>
  }

  export type PageCreateNestedManyWithoutBanerInput = {
    create?: XOR<Enumerable<PageCreateWithoutBanerInput>, Enumerable<PageUncheckedCreateWithoutBanerInput>>
    connectOrCreate?: Enumerable<PageCreateOrConnectWithoutBanerInput>
    createMany?: PageCreateManyBanerInputEnvelope
    connect?: Enumerable<PageWhereUniqueInput>
  }

  export type UserUncheckedCreateNestedManyWithoutAvatarInput = {
    create?: XOR<Enumerable<UserCreateWithoutAvatarInput>, Enumerable<UserUncheckedCreateWithoutAvatarInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutAvatarInput>
    createMany?: UserCreateManyAvatarInputEnvelope
    connect?: Enumerable<UserWhereUniqueInput>
  }

  export type TokenUncheckedCreateNestedManyWithoutImageInput = {
    create?: XOR<Enumerable<TokenCreateWithoutImageInput>, Enumerable<TokenUncheckedCreateWithoutImageInput>>
    connectOrCreate?: Enumerable<TokenCreateOrConnectWithoutImageInput>
    createMany?: TokenCreateManyImageInputEnvelope
    connect?: Enumerable<TokenWhereUniqueInput>
  }

  export type PageUncheckedCreateNestedManyWithoutBanerInput = {
    create?: XOR<Enumerable<PageCreateWithoutBanerInput>, Enumerable<PageUncheckedCreateWithoutBanerInput>>
    connectOrCreate?: Enumerable<PageCreateOrConnectWithoutBanerInput>
    createMany?: PageCreateManyBanerInputEnvelope
    connect?: Enumerable<PageWhereUniqueInput>
  }

  export type UserUpdateManyWithoutAvatarNestedInput = {
    create?: XOR<Enumerable<UserCreateWithoutAvatarInput>, Enumerable<UserUncheckedCreateWithoutAvatarInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutAvatarInput>
    upsert?: Enumerable<UserUpsertWithWhereUniqueWithoutAvatarInput>
    createMany?: UserCreateManyAvatarInputEnvelope
    set?: Enumerable<UserWhereUniqueInput>
    disconnect?: Enumerable<UserWhereUniqueInput>
    delete?: Enumerable<UserWhereUniqueInput>
    connect?: Enumerable<UserWhereUniqueInput>
    update?: Enumerable<UserUpdateWithWhereUniqueWithoutAvatarInput>
    updateMany?: Enumerable<UserUpdateManyWithWhereWithoutAvatarInput>
    deleteMany?: Enumerable<UserScalarWhereInput>
  }

  export type TokenUpdateManyWithoutImageNestedInput = {
    create?: XOR<Enumerable<TokenCreateWithoutImageInput>, Enumerable<TokenUncheckedCreateWithoutImageInput>>
    connectOrCreate?: Enumerable<TokenCreateOrConnectWithoutImageInput>
    upsert?: Enumerable<TokenUpsertWithWhereUniqueWithoutImageInput>
    createMany?: TokenCreateManyImageInputEnvelope
    set?: Enumerable<TokenWhereUniqueInput>
    disconnect?: Enumerable<TokenWhereUniqueInput>
    delete?: Enumerable<TokenWhereUniqueInput>
    connect?: Enumerable<TokenWhereUniqueInput>
    update?: Enumerable<TokenUpdateWithWhereUniqueWithoutImageInput>
    updateMany?: Enumerable<TokenUpdateManyWithWhereWithoutImageInput>
    deleteMany?: Enumerable<TokenScalarWhereInput>
  }

  export type PageUpdateManyWithoutBanerNestedInput = {
    create?: XOR<Enumerable<PageCreateWithoutBanerInput>, Enumerable<PageUncheckedCreateWithoutBanerInput>>
    connectOrCreate?: Enumerable<PageCreateOrConnectWithoutBanerInput>
    upsert?: Enumerable<PageUpsertWithWhereUniqueWithoutBanerInput>
    createMany?: PageCreateManyBanerInputEnvelope
    set?: Enumerable<PageWhereUniqueInput>
    disconnect?: Enumerable<PageWhereUniqueInput>
    delete?: Enumerable<PageWhereUniqueInput>
    connect?: Enumerable<PageWhereUniqueInput>
    update?: Enumerable<PageUpdateWithWhereUniqueWithoutBanerInput>
    updateMany?: Enumerable<PageUpdateManyWithWhereWithoutBanerInput>
    deleteMany?: Enumerable<PageScalarWhereInput>
  }

  export type UserUncheckedUpdateManyWithoutAvatarNestedInput = {
    create?: XOR<Enumerable<UserCreateWithoutAvatarInput>, Enumerable<UserUncheckedCreateWithoutAvatarInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutAvatarInput>
    upsert?: Enumerable<UserUpsertWithWhereUniqueWithoutAvatarInput>
    createMany?: UserCreateManyAvatarInputEnvelope
    set?: Enumerable<UserWhereUniqueInput>
    disconnect?: Enumerable<UserWhereUniqueInput>
    delete?: Enumerable<UserWhereUniqueInput>
    connect?: Enumerable<UserWhereUniqueInput>
    update?: Enumerable<UserUpdateWithWhereUniqueWithoutAvatarInput>
    updateMany?: Enumerable<UserUpdateManyWithWhereWithoutAvatarInput>
    deleteMany?: Enumerable<UserScalarWhereInput>
  }

  export type TokenUncheckedUpdateManyWithoutImageNestedInput = {
    create?: XOR<Enumerable<TokenCreateWithoutImageInput>, Enumerable<TokenUncheckedCreateWithoutImageInput>>
    connectOrCreate?: Enumerable<TokenCreateOrConnectWithoutImageInput>
    upsert?: Enumerable<TokenUpsertWithWhereUniqueWithoutImageInput>
    createMany?: TokenCreateManyImageInputEnvelope
    set?: Enumerable<TokenWhereUniqueInput>
    disconnect?: Enumerable<TokenWhereUniqueInput>
    delete?: Enumerable<TokenWhereUniqueInput>
    connect?: Enumerable<TokenWhereUniqueInput>
    update?: Enumerable<TokenUpdateWithWhereUniqueWithoutImageInput>
    updateMany?: Enumerable<TokenUpdateManyWithWhereWithoutImageInput>
    deleteMany?: Enumerable<TokenScalarWhereInput>
  }

  export type PageUncheckedUpdateManyWithoutBanerNestedInput = {
    create?: XOR<Enumerable<PageCreateWithoutBanerInput>, Enumerable<PageUncheckedCreateWithoutBanerInput>>
    connectOrCreate?: Enumerable<PageCreateOrConnectWithoutBanerInput>
    upsert?: Enumerable<PageUpsertWithWhereUniqueWithoutBanerInput>
    createMany?: PageCreateManyBanerInputEnvelope
    set?: Enumerable<PageWhereUniqueInput>
    disconnect?: Enumerable<PageWhereUniqueInput>
    delete?: Enumerable<PageWhereUniqueInput>
    connect?: Enumerable<PageWhereUniqueInput>
    update?: Enumerable<PageUpdateWithWhereUniqueWithoutBanerInput>
    updateMany?: Enumerable<PageUpdateManyWithWhereWithoutBanerInput>
    deleteMany?: Enumerable<PageScalarWhereInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedDecimalFilter = {
    equals?: Decimal | DecimalJsLike | number | string
    in?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    notIn?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    lt?: Decimal | DecimalJsLike | number | string
    lte?: Decimal | DecimalJsLike | number | string
    gt?: Decimal | DecimalJsLike | number | string
    gte?: Decimal | DecimalJsLike | number | string
    not?: NestedDecimalFilter | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumApperanceModeFilter = {
    equals?: ApperanceMode
    in?: Enumerable<ApperanceMode>
    notIn?: Enumerable<ApperanceMode>
    not?: NestedEnumApperanceModeFilter | ApperanceMode
  }

  export type NestedEnumRoleFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleFilter | Role
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedDecimalWithAggregatesFilter = {
    equals?: Decimal | DecimalJsLike | number | string
    in?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    notIn?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    lt?: Decimal | DecimalJsLike | number | string
    lte?: Decimal | DecimalJsLike | number | string
    gt?: Decimal | DecimalJsLike | number | string
    gte?: Decimal | DecimalJsLike | number | string
    not?: NestedDecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter
    _avg?: NestedDecimalFilter
    _sum?: NestedDecimalFilter
    _min?: NestedDecimalFilter
    _max?: NestedDecimalFilter
  }

  export type NestedEnumApperanceModeWithAggregatesFilter = {
    equals?: ApperanceMode
    in?: Enumerable<ApperanceMode>
    notIn?: Enumerable<ApperanceMode>
    not?: NestedEnumApperanceModeWithAggregatesFilter | ApperanceMode
    _count?: NestedIntFilter
    _min?: NestedEnumApperanceModeFilter
    _max?: NestedEnumApperanceModeFilter
  }

  export type NestedEnumRoleWithAggregatesFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleWithAggregatesFilter | Role
    _count?: NestedIntFilter
    _min?: NestedEnumRoleFilter
    _max?: NestedEnumRoleFilter
  }

  export type NestedDecimalNullableFilter = {
    equals?: Decimal | DecimalJsLike | number | string | null
    in?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string> | null
    notIn?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string> | null
    lt?: Decimal | DecimalJsLike | number | string
    lte?: Decimal | DecimalJsLike | number | string
    gt?: Decimal | DecimalJsLike | number | string
    gte?: Decimal | DecimalJsLike | number | string
    not?: NestedDecimalNullableFilter | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDecimalNullableWithAggregatesFilter = {
    equals?: Decimal | DecimalJsLike | number | string | null
    in?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string> | null
    notIn?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string> | null
    lt?: Decimal | DecimalJsLike | number | string
    lte?: Decimal | DecimalJsLike | number | string
    gt?: Decimal | DecimalJsLike | number | string
    gte?: Decimal | DecimalJsLike | number | string
    not?: NestedDecimalNullableWithAggregatesFilter | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter
    _avg?: NestedDecimalNullableFilter
    _sum?: NestedDecimalNullableFilter
    _min?: NestedDecimalNullableFilter
    _max?: NestedDecimalNullableFilter
  }

  export type FileCreateWithoutUserInput = {
    id?: string
    filename: string
    extension: string
    Token?: TokenCreateNestedManyWithoutImageInput
    Page?: PageCreateNestedManyWithoutBanerInput
  }

  export type FileUncheckedCreateWithoutUserInput = {
    id?: string
    filename: string
    extension: string
    Token?: TokenUncheckedCreateNestedManyWithoutImageInput
    Page?: PageUncheckedCreateNestedManyWithoutBanerInput
  }

  export type FileCreateOrConnectWithoutUserInput = {
    where: FileWhereUniqueInput
    create: XOR<FileCreateWithoutUserInput, FileUncheckedCreateWithoutUserInput>
  }

  export type WithdrawCreateWithoutUserInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    date?: Date | string
    txHash: string
  }

  export type WithdrawUncheckedCreateWithoutUserInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    date?: Date | string
    txHash: string
  }

  export type WithdrawCreateOrConnectWithoutUserInput = {
    where: WithdrawWhereUniqueInput
    create: XOR<WithdrawCreateWithoutUserInput, WithdrawUncheckedCreateWithoutUserInput>
  }

  export type WithdrawCreateManyUserInputEnvelope = {
    data: Enumerable<WithdrawCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type UserTokenCreateWithoutUserInput = {
    address: string
    symbol: string
    name: string
    chainId: number
    txHash: string
    Tip?: TipCreateNestedManyWithoutUserTokenInput
  }

  export type UserTokenUncheckedCreateWithoutUserInput = {
    address: string
    symbol: string
    name: string
    chainId: number
    txHash: string
    Tip?: TipUncheckedCreateNestedManyWithoutUserTokenInput
  }

  export type UserTokenCreateOrConnectWithoutUserInput = {
    where: UserTokenWhereUniqueInput
    create: XOR<UserTokenCreateWithoutUserInput, UserTokenUncheckedCreateWithoutUserInput>
  }

  export type TipCreateWithoutUserInput = {
    txHash: string
    amount: Decimal | DecimalJsLike | number | string
    value: Decimal | DecimalJsLike | number | string
    message: string
    displayed: boolean
    date?: Date | string
    receivedTokensAmount: Decimal | DecimalJsLike | number | string
    userRole: Role
    userToken: UserTokenCreateNestedOneWithoutTipInput
    token: TokenCreateNestedOneWithoutTipInput
    tipper: TipperCreateNestedOneWithoutTipsInput
  }

  export type TipUncheckedCreateWithoutUserInput = {
    txHash: string
    amount: Decimal | DecimalJsLike | number | string
    value: Decimal | DecimalJsLike | number | string
    message: string
    displayed: boolean
    date?: Date | string
    receivedTokensAmount: Decimal | DecimalJsLike | number | string
    userRole: Role
    userTokenAddress: string
    tokenAddress: string
    tipperAddress: string
  }

  export type TipCreateOrConnectWithoutUserInput = {
    where: TipWhereUniqueInput
    create: XOR<TipCreateWithoutUserInput, TipUncheckedCreateWithoutUserInput>
  }

  export type TipCreateManyUserInputEnvelope = {
    data: Enumerable<TipCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type StreamerCreateWithoutUserInput = {
    tipsCount?: number
    tipsValue?: Decimal | DecimalJsLike | number | string
    page: PageCreateNestedOneWithoutStreamerInput
    activeTokens?: TokenCreateNestedManyWithoutStreamerInput
    widgets?: WidgetCreateNestedManyWithoutStreamerInput
  }

  export type StreamerUncheckedCreateWithoutUserInput = {
    tipsCount?: number
    tipsValue?: Decimal | DecimalJsLike | number | string
    activeTokens?: TokenUncheckedCreateNestedManyWithoutStreamerInput
    widgets?: WidgetUncheckedCreateNestedManyWithoutStreamerInput
    pageId: string
  }

  export type StreamerCreateOrConnectWithoutUserInput = {
    where: StreamerWhereUniqueInput
    create: XOR<StreamerCreateWithoutUserInput, StreamerUncheckedCreateWithoutUserInput>
  }

  export type TipperCreateWithoutUserInput = {
    nick: string
    tipsValue?: number
    tips?: TipCreateNestedManyWithoutTipperInput
  }

  export type TipperUncheckedCreateWithoutUserInput = {
    nick: string
    tipsValue?: number
    tips?: TipUncheckedCreateNestedManyWithoutTipperInput
  }

  export type TipperCreateOrConnectWithoutUserInput = {
    where: TipperWhereUniqueInput
    create: XOR<TipperCreateWithoutUserInput, TipperUncheckedCreateWithoutUserInput>
  }

  export type FileUpsertWithoutUserInput = {
    update: XOR<FileUpdateWithoutUserInput, FileUncheckedUpdateWithoutUserInput>
    create: XOR<FileCreateWithoutUserInput, FileUncheckedCreateWithoutUserInput>
  }

  export type FileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    Token?: TokenUpdateManyWithoutImageNestedInput
    Page?: PageUpdateManyWithoutBanerNestedInput
  }

  export type FileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    Token?: TokenUncheckedUpdateManyWithoutImageNestedInput
    Page?: PageUncheckedUpdateManyWithoutBanerNestedInput
  }

  export type WithdrawUpsertWithWhereUniqueWithoutUserInput = {
    where: WithdrawWhereUniqueInput
    update: XOR<WithdrawUpdateWithoutUserInput, WithdrawUncheckedUpdateWithoutUserInput>
    create: XOR<WithdrawCreateWithoutUserInput, WithdrawUncheckedCreateWithoutUserInput>
  }

  export type WithdrawUpdateWithWhereUniqueWithoutUserInput = {
    where: WithdrawWhereUniqueInput
    data: XOR<WithdrawUpdateWithoutUserInput, WithdrawUncheckedUpdateWithoutUserInput>
  }

  export type WithdrawUpdateManyWithWhereWithoutUserInput = {
    where: WithdrawScalarWhereInput
    data: XOR<WithdrawUpdateManyMutationInput, WithdrawUncheckedUpdateManyWithoutWitdrawsInput>
  }

  export type WithdrawScalarWhereInput = {
    AND?: Enumerable<WithdrawScalarWhereInput>
    OR?: Enumerable<WithdrawScalarWhereInput>
    NOT?: Enumerable<WithdrawScalarWhereInput>
    id?: StringFilter | string
    amount?: DecimalFilter | Decimal | DecimalJsLike | number | string
    date?: DateTimeFilter | Date | string
    txHash?: StringFilter | string
    userAddress?: StringNullableFilter | string | null
  }

  export type UserTokenUpsertWithoutUserInput = {
    update: XOR<UserTokenUpdateWithoutUserInput, UserTokenUncheckedUpdateWithoutUserInput>
    create: XOR<UserTokenCreateWithoutUserInput, UserTokenUncheckedCreateWithoutUserInput>
  }

  export type UserTokenUpdateWithoutUserInput = {
    address?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    txHash?: StringFieldUpdateOperationsInput | string
    Tip?: TipUpdateManyWithoutUserTokenNestedInput
  }

  export type UserTokenUncheckedUpdateWithoutUserInput = {
    address?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    txHash?: StringFieldUpdateOperationsInput | string
    Tip?: TipUncheckedUpdateManyWithoutUserTokenNestedInput
  }

  export type TipUpsertWithWhereUniqueWithoutUserInput = {
    where: TipWhereUniqueInput
    update: XOR<TipUpdateWithoutUserInput, TipUncheckedUpdateWithoutUserInput>
    create: XOR<TipCreateWithoutUserInput, TipUncheckedCreateWithoutUserInput>
  }

  export type TipUpdateWithWhereUniqueWithoutUserInput = {
    where: TipWhereUniqueInput
    data: XOR<TipUpdateWithoutUserInput, TipUncheckedUpdateWithoutUserInput>
  }

  export type TipUpdateManyWithWhereWithoutUserInput = {
    where: TipScalarWhereInput
    data: XOR<TipUpdateManyMutationInput, TipUncheckedUpdateManyWithoutTipsInput>
  }

  export type TipScalarWhereInput = {
    AND?: Enumerable<TipScalarWhereInput>
    OR?: Enumerable<TipScalarWhereInput>
    NOT?: Enumerable<TipScalarWhereInput>
    txHash?: StringFilter | string
    amount?: DecimalFilter | Decimal | DecimalJsLike | number | string
    value?: DecimalFilter | Decimal | DecimalJsLike | number | string
    message?: StringFilter | string
    displayed?: BoolFilter | boolean
    date?: DateTimeFilter | Date | string
    receivedTokensAmount?: DecimalFilter | Decimal | DecimalJsLike | number | string
    userRole?: EnumRoleFilter | Role
    userAddress?: StringFilter | string
    userTokenAddress?: StringFilter | string
    tokenAddress?: StringFilter | string
    tipperAddress?: StringFilter | string
  }

  export type StreamerUpsertWithoutUserInput = {
    update: XOR<StreamerUpdateWithoutUserInput, StreamerUncheckedUpdateWithoutUserInput>
    create: XOR<StreamerCreateWithoutUserInput, StreamerUncheckedCreateWithoutUserInput>
  }

  export type StreamerUpdateWithoutUserInput = {
    tipsCount?: IntFieldUpdateOperationsInput | number
    tipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    page?: PageUpdateOneRequiredWithoutStreamerNestedInput
    activeTokens?: TokenUpdateManyWithoutStreamerNestedInput
    widgets?: WidgetUpdateManyWithoutStreamerNestedInput
  }

  export type StreamerUncheckedUpdateWithoutUserInput = {
    tipsCount?: IntFieldUpdateOperationsInput | number
    tipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    activeTokens?: TokenUncheckedUpdateManyWithoutStreamerNestedInput
    widgets?: WidgetUncheckedUpdateManyWithoutStreamerNestedInput
    pageId?: StringFieldUpdateOperationsInput | string
  }

  export type TipperUpsertWithoutUserInput = {
    update: XOR<TipperUpdateWithoutUserInput, TipperUncheckedUpdateWithoutUserInput>
    create: XOR<TipperCreateWithoutUserInput, TipperUncheckedCreateWithoutUserInput>
  }

  export type TipperUpdateWithoutUserInput = {
    nick?: StringFieldUpdateOperationsInput | string
    tipsValue?: IntFieldUpdateOperationsInput | number
    tips?: TipUpdateManyWithoutTipperNestedInput
  }

  export type TipperUncheckedUpdateWithoutUserInput = {
    nick?: StringFieldUpdateOperationsInput | string
    tipsValue?: IntFieldUpdateOperationsInput | number
    tips?: TipUncheckedUpdateManyWithoutTipperNestedInput
  }

  export type UserCreateWithoutStreamerInput = {
    address: string
    nick: string
    email: string
    emailVerified?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    verified?: boolean
    createdAt?: Date | string
    updateAt?: Date | string
    allTipsCount?: number
    allTipsValue?: Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: Decimal | DecimalJsLike | number | string
    apperanceMode?: ApperanceMode
    roles?: UserCreaterolesInput | Enumerable<Role>
    defaultRole?: Role
    refreshTokens?: UserCreaterefreshTokensInput | Enumerable<string>
    avatar?: FileCreateNestedOneWithoutUserInput
    witdraws?: WithdrawCreateNestedManyWithoutUserInput
    userToken?: UserTokenCreateNestedOneWithoutUserInput
    tips?: TipCreateNestedManyWithoutUserInput
    tipper?: TipperCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutStreamerInput = {
    address: string
    nick: string
    email: string
    emailVerified?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    verified?: boolean
    createdAt?: Date | string
    updateAt?: Date | string
    allTipsCount?: number
    allTipsValue?: Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: Decimal | DecimalJsLike | number | string
    apperanceMode?: ApperanceMode
    roles?: UserCreaterolesInput | Enumerable<Role>
    defaultRole?: Role
    refreshTokens?: UserCreaterefreshTokensInput | Enumerable<string>
    avatarId?: string | null
    witdraws?: WithdrawUncheckedCreateNestedManyWithoutUserInput
    userToken?: UserTokenUncheckedCreateNestedOneWithoutUserInput
    tips?: TipUncheckedCreateNestedManyWithoutUserInput
    tipper?: TipperUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutStreamerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStreamerInput, UserUncheckedCreateWithoutStreamerInput>
  }

  export type PageCreateWithoutStreamerInput = {
    id?: string
    affixUrl: string
    description?: string | null
    baner?: FileCreateNestedOneWithoutPageInput
  }

  export type PageUncheckedCreateWithoutStreamerInput = {
    id?: string
    affixUrl: string
    description?: string | null
    banerId?: string | null
  }

  export type PageCreateOrConnectWithoutStreamerInput = {
    where: PageWhereUniqueInput
    create: XOR<PageCreateWithoutStreamerInput, PageUncheckedCreateWithoutStreamerInput>
  }

  export type TokenCreateWithoutStreamerInput = {
    address: string
    symbol: string
    name: string
    chainId: number
    image?: FileCreateNestedOneWithoutTokenInput
    latestPrice?: Decimal | DecimalJsLike | number | string | null
    priceUpdateAt?: Date | string | null
    Tip?: TipCreateNestedManyWithoutTokenInput
  }

  export type TokenUncheckedCreateWithoutStreamerInput = {
    address: string
    symbol: string
    name: string
    chainId: number
    imageId?: string | null
    latestPrice?: Decimal | DecimalJsLike | number | string | null
    priceUpdateAt?: Date | string | null
    Tip?: TipUncheckedCreateNestedManyWithoutTokenInput
  }

  export type TokenCreateOrConnectWithoutStreamerInput = {
    where: TokenWhereUniqueInput
    create: XOR<TokenCreateWithoutStreamerInput, TokenUncheckedCreateWithoutStreamerInput>
  }

  export type TokenCreateManyStreamerInputEnvelope = {
    data: Enumerable<TokenCreateManyStreamerInput>
    skipDuplicates?: boolean
  }

  export type WidgetCreateWithoutStreamerInput = {
    id?: string
    url: string
    songPath: string
    backgroundPath: string
    nickColor: string
    messageColor: string
    valueColor: string
    showTime: number
    filterProfanity: boolean
    voiceMessage: boolean
  }

  export type WidgetUncheckedCreateWithoutStreamerInput = {
    id?: string
    url: string
    songPath: string
    backgroundPath: string
    nickColor: string
    messageColor: string
    valueColor: string
    showTime: number
    filterProfanity: boolean
    voiceMessage: boolean
  }

  export type WidgetCreateOrConnectWithoutStreamerInput = {
    where: WidgetWhereUniqueInput
    create: XOR<WidgetCreateWithoutStreamerInput, WidgetUncheckedCreateWithoutStreamerInput>
  }

  export type WidgetCreateManyStreamerInputEnvelope = {
    data: Enumerable<WidgetCreateManyStreamerInput>
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutStreamerInput = {
    update: XOR<UserUpdateWithoutStreamerInput, UserUncheckedUpdateWithoutStreamerInput>
    create: XOR<UserCreateWithoutStreamerInput, UserUncheckedCreateWithoutStreamerInput>
  }

  export type UserUpdateWithoutStreamerInput = {
    address?: StringFieldUpdateOperationsInput | string
    nick?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allTipsCount?: IntFieldUpdateOperationsInput | number
    allTipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    apperanceMode?: EnumApperanceModeFieldUpdateOperationsInput | ApperanceMode
    roles?: UserUpdaterolesInput | Enumerable<Role>
    defaultRole?: EnumRoleFieldUpdateOperationsInput | Role
    refreshTokens?: UserUpdaterefreshTokensInput | Enumerable<string>
    avatar?: FileUpdateOneWithoutUserNestedInput
    witdraws?: WithdrawUpdateManyWithoutUserNestedInput
    userToken?: UserTokenUpdateOneWithoutUserNestedInput
    tips?: TipUpdateManyWithoutUserNestedInput
    tipper?: TipperUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutStreamerInput = {
    address?: StringFieldUpdateOperationsInput | string
    nick?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allTipsCount?: IntFieldUpdateOperationsInput | number
    allTipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    apperanceMode?: EnumApperanceModeFieldUpdateOperationsInput | ApperanceMode
    roles?: UserUpdaterolesInput | Enumerable<Role>
    defaultRole?: EnumRoleFieldUpdateOperationsInput | Role
    refreshTokens?: UserUpdaterefreshTokensInput | Enumerable<string>
    avatarId?: NullableStringFieldUpdateOperationsInput | string | null
    witdraws?: WithdrawUncheckedUpdateManyWithoutUserNestedInput
    userToken?: UserTokenUncheckedUpdateOneWithoutUserNestedInput
    tips?: TipUncheckedUpdateManyWithoutUserNestedInput
    tipper?: TipperUncheckedUpdateOneWithoutUserNestedInput
  }

  export type PageUpsertWithoutStreamerInput = {
    update: XOR<PageUpdateWithoutStreamerInput, PageUncheckedUpdateWithoutStreamerInput>
    create: XOR<PageCreateWithoutStreamerInput, PageUncheckedCreateWithoutStreamerInput>
  }

  export type PageUpdateWithoutStreamerInput = {
    id?: StringFieldUpdateOperationsInput | string
    affixUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    baner?: FileUpdateOneWithoutPageNestedInput
  }

  export type PageUncheckedUpdateWithoutStreamerInput = {
    id?: StringFieldUpdateOperationsInput | string
    affixUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    banerId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TokenUpsertWithWhereUniqueWithoutStreamerInput = {
    where: TokenWhereUniqueInput
    update: XOR<TokenUpdateWithoutStreamerInput, TokenUncheckedUpdateWithoutStreamerInput>
    create: XOR<TokenCreateWithoutStreamerInput, TokenUncheckedCreateWithoutStreamerInput>
  }

  export type TokenUpdateWithWhereUniqueWithoutStreamerInput = {
    where: TokenWhereUniqueInput
    data: XOR<TokenUpdateWithoutStreamerInput, TokenUncheckedUpdateWithoutStreamerInput>
  }

  export type TokenUpdateManyWithWhereWithoutStreamerInput = {
    where: TokenScalarWhereInput
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyWithoutActiveTokensInput>
  }

  export type TokenScalarWhereInput = {
    AND?: Enumerable<TokenScalarWhereInput>
    OR?: Enumerable<TokenScalarWhereInput>
    NOT?: Enumerable<TokenScalarWhereInput>
    address?: StringFilter | string
    symbol?: StringFilter | string
    name?: StringFilter | string
    chainId?: IntFilter | number
    imageId?: StringNullableFilter | string | null
    latestPrice?: DecimalNullableFilter | Decimal | DecimalJsLike | number | string | null
    priceUpdateAt?: DateTimeNullableFilter | Date | string | null
    streamerAddress?: StringNullableFilter | string | null
  }

  export type WidgetUpsertWithWhereUniqueWithoutStreamerInput = {
    where: WidgetWhereUniqueInput
    update: XOR<WidgetUpdateWithoutStreamerInput, WidgetUncheckedUpdateWithoutStreamerInput>
    create: XOR<WidgetCreateWithoutStreamerInput, WidgetUncheckedCreateWithoutStreamerInput>
  }

  export type WidgetUpdateWithWhereUniqueWithoutStreamerInput = {
    where: WidgetWhereUniqueInput
    data: XOR<WidgetUpdateWithoutStreamerInput, WidgetUncheckedUpdateWithoutStreamerInput>
  }

  export type WidgetUpdateManyWithWhereWithoutStreamerInput = {
    where: WidgetScalarWhereInput
    data: XOR<WidgetUpdateManyMutationInput, WidgetUncheckedUpdateManyWithoutWidgetsInput>
  }

  export type WidgetScalarWhereInput = {
    AND?: Enumerable<WidgetScalarWhereInput>
    OR?: Enumerable<WidgetScalarWhereInput>
    NOT?: Enumerable<WidgetScalarWhereInput>
    id?: StringFilter | string
    url?: StringFilter | string
    songPath?: StringFilter | string
    backgroundPath?: StringFilter | string
    nickColor?: StringFilter | string
    messageColor?: StringFilter | string
    valueColor?: StringFilter | string
    showTime?: IntFilter | number
    filterProfanity?: BoolFilter | boolean
    voiceMessage?: BoolFilter | boolean
    streamerAddress?: StringNullableFilter | string | null
  }

  export type UserCreateWithoutTipperInput = {
    address: string
    nick: string
    email: string
    emailVerified?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    verified?: boolean
    createdAt?: Date | string
    updateAt?: Date | string
    allTipsCount?: number
    allTipsValue?: Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: Decimal | DecimalJsLike | number | string
    apperanceMode?: ApperanceMode
    roles?: UserCreaterolesInput | Enumerable<Role>
    defaultRole?: Role
    refreshTokens?: UserCreaterefreshTokensInput | Enumerable<string>
    avatar?: FileCreateNestedOneWithoutUserInput
    witdraws?: WithdrawCreateNestedManyWithoutUserInput
    userToken?: UserTokenCreateNestedOneWithoutUserInput
    tips?: TipCreateNestedManyWithoutUserInput
    streamer?: StreamerCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTipperInput = {
    address: string
    nick: string
    email: string
    emailVerified?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    verified?: boolean
    createdAt?: Date | string
    updateAt?: Date | string
    allTipsCount?: number
    allTipsValue?: Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: Decimal | DecimalJsLike | number | string
    apperanceMode?: ApperanceMode
    roles?: UserCreaterolesInput | Enumerable<Role>
    defaultRole?: Role
    refreshTokens?: UserCreaterefreshTokensInput | Enumerable<string>
    avatarId?: string | null
    witdraws?: WithdrawUncheckedCreateNestedManyWithoutUserInput
    userToken?: UserTokenUncheckedCreateNestedOneWithoutUserInput
    tips?: TipUncheckedCreateNestedManyWithoutUserInput
    streamer?: StreamerUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTipperInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTipperInput, UserUncheckedCreateWithoutTipperInput>
  }

  export type TipCreateWithoutTipperInput = {
    txHash: string
    amount: Decimal | DecimalJsLike | number | string
    value: Decimal | DecimalJsLike | number | string
    message: string
    displayed: boolean
    date?: Date | string
    receivedTokensAmount: Decimal | DecimalJsLike | number | string
    userRole: Role
    user: UserCreateNestedOneWithoutTipsInput
    userToken: UserTokenCreateNestedOneWithoutTipInput
    token: TokenCreateNestedOneWithoutTipInput
  }

  export type TipUncheckedCreateWithoutTipperInput = {
    txHash: string
    amount: Decimal | DecimalJsLike | number | string
    value: Decimal | DecimalJsLike | number | string
    message: string
    displayed: boolean
    date?: Date | string
    receivedTokensAmount: Decimal | DecimalJsLike | number | string
    userRole: Role
    userAddress: string
    userTokenAddress: string
    tokenAddress: string
  }

  export type TipCreateOrConnectWithoutTipperInput = {
    where: TipWhereUniqueInput
    create: XOR<TipCreateWithoutTipperInput, TipUncheckedCreateWithoutTipperInput>
  }

  export type TipCreateManyTipperInputEnvelope = {
    data: Enumerable<TipCreateManyTipperInput>
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutTipperInput = {
    update: XOR<UserUpdateWithoutTipperInput, UserUncheckedUpdateWithoutTipperInput>
    create: XOR<UserCreateWithoutTipperInput, UserUncheckedCreateWithoutTipperInput>
  }

  export type UserUpdateWithoutTipperInput = {
    address?: StringFieldUpdateOperationsInput | string
    nick?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allTipsCount?: IntFieldUpdateOperationsInput | number
    allTipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    apperanceMode?: EnumApperanceModeFieldUpdateOperationsInput | ApperanceMode
    roles?: UserUpdaterolesInput | Enumerable<Role>
    defaultRole?: EnumRoleFieldUpdateOperationsInput | Role
    refreshTokens?: UserUpdaterefreshTokensInput | Enumerable<string>
    avatar?: FileUpdateOneWithoutUserNestedInput
    witdraws?: WithdrawUpdateManyWithoutUserNestedInput
    userToken?: UserTokenUpdateOneWithoutUserNestedInput
    tips?: TipUpdateManyWithoutUserNestedInput
    streamer?: StreamerUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTipperInput = {
    address?: StringFieldUpdateOperationsInput | string
    nick?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allTipsCount?: IntFieldUpdateOperationsInput | number
    allTipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    apperanceMode?: EnumApperanceModeFieldUpdateOperationsInput | ApperanceMode
    roles?: UserUpdaterolesInput | Enumerable<Role>
    defaultRole?: EnumRoleFieldUpdateOperationsInput | Role
    refreshTokens?: UserUpdaterefreshTokensInput | Enumerable<string>
    avatarId?: NullableStringFieldUpdateOperationsInput | string | null
    witdraws?: WithdrawUncheckedUpdateManyWithoutUserNestedInput
    userToken?: UserTokenUncheckedUpdateOneWithoutUserNestedInput
    tips?: TipUncheckedUpdateManyWithoutUserNestedInput
    streamer?: StreamerUncheckedUpdateOneWithoutUserNestedInput
  }

  export type TipUpsertWithWhereUniqueWithoutTipperInput = {
    where: TipWhereUniqueInput
    update: XOR<TipUpdateWithoutTipperInput, TipUncheckedUpdateWithoutTipperInput>
    create: XOR<TipCreateWithoutTipperInput, TipUncheckedCreateWithoutTipperInput>
  }

  export type TipUpdateWithWhereUniqueWithoutTipperInput = {
    where: TipWhereUniqueInput
    data: XOR<TipUpdateWithoutTipperInput, TipUncheckedUpdateWithoutTipperInput>
  }

  export type TipUpdateManyWithWhereWithoutTipperInput = {
    where: TipScalarWhereInput
    data: XOR<TipUpdateManyMutationInput, TipUncheckedUpdateManyWithoutTipsInput>
  }

  export type FileCreateWithoutPageInput = {
    id?: string
    filename: string
    extension: string
    User?: UserCreateNestedManyWithoutAvatarInput
    Token?: TokenCreateNestedManyWithoutImageInput
  }

  export type FileUncheckedCreateWithoutPageInput = {
    id?: string
    filename: string
    extension: string
    User?: UserUncheckedCreateNestedManyWithoutAvatarInput
    Token?: TokenUncheckedCreateNestedManyWithoutImageInput
  }

  export type FileCreateOrConnectWithoutPageInput = {
    where: FileWhereUniqueInput
    create: XOR<FileCreateWithoutPageInput, FileUncheckedCreateWithoutPageInput>
  }

  export type StreamerCreateWithoutPageInput = {
    user: UserCreateNestedOneWithoutStreamerInput
    tipsCount?: number
    tipsValue?: Decimal | DecimalJsLike | number | string
    activeTokens?: TokenCreateNestedManyWithoutStreamerInput
    widgets?: WidgetCreateNestedManyWithoutStreamerInput
  }

  export type StreamerUncheckedCreateWithoutPageInput = {
    address: string
    tipsCount?: number
    tipsValue?: Decimal | DecimalJsLike | number | string
    activeTokens?: TokenUncheckedCreateNestedManyWithoutStreamerInput
    widgets?: WidgetUncheckedCreateNestedManyWithoutStreamerInput
  }

  export type StreamerCreateOrConnectWithoutPageInput = {
    where: StreamerWhereUniqueInput
    create: XOR<StreamerCreateWithoutPageInput, StreamerUncheckedCreateWithoutPageInput>
  }

  export type StreamerCreateManyPageInputEnvelope = {
    data: Enumerable<StreamerCreateManyPageInput>
    skipDuplicates?: boolean
  }

  export type FileUpsertWithoutPageInput = {
    update: XOR<FileUpdateWithoutPageInput, FileUncheckedUpdateWithoutPageInput>
    create: XOR<FileCreateWithoutPageInput, FileUncheckedCreateWithoutPageInput>
  }

  export type FileUpdateWithoutPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    User?: UserUpdateManyWithoutAvatarNestedInput
    Token?: TokenUpdateManyWithoutImageNestedInput
  }

  export type FileUncheckedUpdateWithoutPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    User?: UserUncheckedUpdateManyWithoutAvatarNestedInput
    Token?: TokenUncheckedUpdateManyWithoutImageNestedInput
  }

  export type StreamerUpsertWithWhereUniqueWithoutPageInput = {
    where: StreamerWhereUniqueInput
    update: XOR<StreamerUpdateWithoutPageInput, StreamerUncheckedUpdateWithoutPageInput>
    create: XOR<StreamerCreateWithoutPageInput, StreamerUncheckedCreateWithoutPageInput>
  }

  export type StreamerUpdateWithWhereUniqueWithoutPageInput = {
    where: StreamerWhereUniqueInput
    data: XOR<StreamerUpdateWithoutPageInput, StreamerUncheckedUpdateWithoutPageInput>
  }

  export type StreamerUpdateManyWithWhereWithoutPageInput = {
    where: StreamerScalarWhereInput
    data: XOR<StreamerUpdateManyMutationInput, StreamerUncheckedUpdateManyWithoutStreamerInput>
  }

  export type StreamerScalarWhereInput = {
    AND?: Enumerable<StreamerScalarWhereInput>
    OR?: Enumerable<StreamerScalarWhereInput>
    NOT?: Enumerable<StreamerScalarWhereInput>
    address?: StringFilter | string
    tipsCount?: IntFilter | number
    tipsValue?: DecimalFilter | Decimal | DecimalJsLike | number | string
    pageId?: StringFilter | string
  }

  export type UserCreateWithoutTipsInput = {
    address: string
    nick: string
    email: string
    emailVerified?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    verified?: boolean
    createdAt?: Date | string
    updateAt?: Date | string
    allTipsCount?: number
    allTipsValue?: Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: Decimal | DecimalJsLike | number | string
    apperanceMode?: ApperanceMode
    roles?: UserCreaterolesInput | Enumerable<Role>
    defaultRole?: Role
    refreshTokens?: UserCreaterefreshTokensInput | Enumerable<string>
    avatar?: FileCreateNestedOneWithoutUserInput
    witdraws?: WithdrawCreateNestedManyWithoutUserInput
    userToken?: UserTokenCreateNestedOneWithoutUserInput
    streamer?: StreamerCreateNestedOneWithoutUserInput
    tipper?: TipperCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTipsInput = {
    address: string
    nick: string
    email: string
    emailVerified?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    verified?: boolean
    createdAt?: Date | string
    updateAt?: Date | string
    allTipsCount?: number
    allTipsValue?: Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: Decimal | DecimalJsLike | number | string
    apperanceMode?: ApperanceMode
    roles?: UserCreaterolesInput | Enumerable<Role>
    defaultRole?: Role
    refreshTokens?: UserCreaterefreshTokensInput | Enumerable<string>
    avatarId?: string | null
    witdraws?: WithdrawUncheckedCreateNestedManyWithoutUserInput
    userToken?: UserTokenUncheckedCreateNestedOneWithoutUserInput
    streamer?: StreamerUncheckedCreateNestedOneWithoutUserInput
    tipper?: TipperUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTipsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTipsInput, UserUncheckedCreateWithoutTipsInput>
  }

  export type UserTokenCreateWithoutTipInput = {
    address: string
    symbol: string
    name: string
    chainId: number
    txHash: string
    user: UserCreateNestedOneWithoutUserTokenInput
  }

  export type UserTokenUncheckedCreateWithoutTipInput = {
    address: string
    symbol: string
    name: string
    chainId: number
    txHash: string
    userAddress: string
  }

  export type UserTokenCreateOrConnectWithoutTipInput = {
    where: UserTokenWhereUniqueInput
    create: XOR<UserTokenCreateWithoutTipInput, UserTokenUncheckedCreateWithoutTipInput>
  }

  export type TokenCreateWithoutTipInput = {
    address: string
    symbol: string
    name: string
    chainId: number
    image?: FileCreateNestedOneWithoutTokenInput
    latestPrice?: Decimal | DecimalJsLike | number | string | null
    priceUpdateAt?: Date | string | null
    Streamer?: StreamerCreateNestedOneWithoutActiveTokensInput
  }

  export type TokenUncheckedCreateWithoutTipInput = {
    address: string
    symbol: string
    name: string
    chainId: number
    imageId?: string | null
    latestPrice?: Decimal | DecimalJsLike | number | string | null
    priceUpdateAt?: Date | string | null
    streamerAddress?: string | null
  }

  export type TokenCreateOrConnectWithoutTipInput = {
    where: TokenWhereUniqueInput
    create: XOR<TokenCreateWithoutTipInput, TokenUncheckedCreateWithoutTipInput>
  }

  export type TipperCreateWithoutTipsInput = {
    user: UserCreateNestedOneWithoutTipperInput
    nick: string
    tipsValue?: number
  }

  export type TipperUncheckedCreateWithoutTipsInput = {
    address: string
    nick: string
    tipsValue?: number
  }

  export type TipperCreateOrConnectWithoutTipsInput = {
    where: TipperWhereUniqueInput
    create: XOR<TipperCreateWithoutTipsInput, TipperUncheckedCreateWithoutTipsInput>
  }

  export type UserUpsertWithoutTipsInput = {
    update: XOR<UserUpdateWithoutTipsInput, UserUncheckedUpdateWithoutTipsInput>
    create: XOR<UserCreateWithoutTipsInput, UserUncheckedCreateWithoutTipsInput>
  }

  export type UserUpdateWithoutTipsInput = {
    address?: StringFieldUpdateOperationsInput | string
    nick?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allTipsCount?: IntFieldUpdateOperationsInput | number
    allTipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    apperanceMode?: EnumApperanceModeFieldUpdateOperationsInput | ApperanceMode
    roles?: UserUpdaterolesInput | Enumerable<Role>
    defaultRole?: EnumRoleFieldUpdateOperationsInput | Role
    refreshTokens?: UserUpdaterefreshTokensInput | Enumerable<string>
    avatar?: FileUpdateOneWithoutUserNestedInput
    witdraws?: WithdrawUpdateManyWithoutUserNestedInput
    userToken?: UserTokenUpdateOneWithoutUserNestedInput
    streamer?: StreamerUpdateOneWithoutUserNestedInput
    tipper?: TipperUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTipsInput = {
    address?: StringFieldUpdateOperationsInput | string
    nick?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allTipsCount?: IntFieldUpdateOperationsInput | number
    allTipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    apperanceMode?: EnumApperanceModeFieldUpdateOperationsInput | ApperanceMode
    roles?: UserUpdaterolesInput | Enumerable<Role>
    defaultRole?: EnumRoleFieldUpdateOperationsInput | Role
    refreshTokens?: UserUpdaterefreshTokensInput | Enumerable<string>
    avatarId?: NullableStringFieldUpdateOperationsInput | string | null
    witdraws?: WithdrawUncheckedUpdateManyWithoutUserNestedInput
    userToken?: UserTokenUncheckedUpdateOneWithoutUserNestedInput
    streamer?: StreamerUncheckedUpdateOneWithoutUserNestedInput
    tipper?: TipperUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserTokenUpsertWithoutTipInput = {
    update: XOR<UserTokenUpdateWithoutTipInput, UserTokenUncheckedUpdateWithoutTipInput>
    create: XOR<UserTokenCreateWithoutTipInput, UserTokenUncheckedCreateWithoutTipInput>
  }

  export type UserTokenUpdateWithoutTipInput = {
    address?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    txHash?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutUserTokenNestedInput
  }

  export type UserTokenUncheckedUpdateWithoutTipInput = {
    address?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    txHash?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
  }

  export type TokenUpsertWithoutTipInput = {
    update: XOR<TokenUpdateWithoutTipInput, TokenUncheckedUpdateWithoutTipInput>
    create: XOR<TokenCreateWithoutTipInput, TokenUncheckedCreateWithoutTipInput>
  }

  export type TokenUpdateWithoutTipInput = {
    address?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    image?: FileUpdateOneWithoutTokenNestedInput
    latestPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceUpdateAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Streamer?: StreamerUpdateOneWithoutActiveTokensNestedInput
  }

  export type TokenUncheckedUpdateWithoutTipInput = {
    address?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    imageId?: NullableStringFieldUpdateOperationsInput | string | null
    latestPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceUpdateAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streamerAddress?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TipperUpsertWithoutTipsInput = {
    update: XOR<TipperUpdateWithoutTipsInput, TipperUncheckedUpdateWithoutTipsInput>
    create: XOR<TipperCreateWithoutTipsInput, TipperUncheckedCreateWithoutTipsInput>
  }

  export type TipperUpdateWithoutTipsInput = {
    user?: UserUpdateOneRequiredWithoutTipperNestedInput
    nick?: StringFieldUpdateOperationsInput | string
    tipsValue?: IntFieldUpdateOperationsInput | number
  }

  export type TipperUncheckedUpdateWithoutTipsInput = {
    address?: StringFieldUpdateOperationsInput | string
    nick?: StringFieldUpdateOperationsInput | string
    tipsValue?: IntFieldUpdateOperationsInput | number
  }

  export type UserCreateWithoutUserTokenInput = {
    address: string
    nick: string
    email: string
    emailVerified?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    verified?: boolean
    createdAt?: Date | string
    updateAt?: Date | string
    allTipsCount?: number
    allTipsValue?: Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: Decimal | DecimalJsLike | number | string
    apperanceMode?: ApperanceMode
    roles?: UserCreaterolesInput | Enumerable<Role>
    defaultRole?: Role
    refreshTokens?: UserCreaterefreshTokensInput | Enumerable<string>
    avatar?: FileCreateNestedOneWithoutUserInput
    witdraws?: WithdrawCreateNestedManyWithoutUserInput
    tips?: TipCreateNestedManyWithoutUserInput
    streamer?: StreamerCreateNestedOneWithoutUserInput
    tipper?: TipperCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUserTokenInput = {
    address: string
    nick: string
    email: string
    emailVerified?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    verified?: boolean
    createdAt?: Date | string
    updateAt?: Date | string
    allTipsCount?: number
    allTipsValue?: Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: Decimal | DecimalJsLike | number | string
    apperanceMode?: ApperanceMode
    roles?: UserCreaterolesInput | Enumerable<Role>
    defaultRole?: Role
    refreshTokens?: UserCreaterefreshTokensInput | Enumerable<string>
    avatarId?: string | null
    witdraws?: WithdrawUncheckedCreateNestedManyWithoutUserInput
    tips?: TipUncheckedCreateNestedManyWithoutUserInput
    streamer?: StreamerUncheckedCreateNestedOneWithoutUserInput
    tipper?: TipperUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUserTokenInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserTokenInput, UserUncheckedCreateWithoutUserTokenInput>
  }

  export type TipCreateWithoutUserTokenInput = {
    txHash: string
    amount: Decimal | DecimalJsLike | number | string
    value: Decimal | DecimalJsLike | number | string
    message: string
    displayed: boolean
    date?: Date | string
    receivedTokensAmount: Decimal | DecimalJsLike | number | string
    userRole: Role
    user: UserCreateNestedOneWithoutTipsInput
    token: TokenCreateNestedOneWithoutTipInput
    tipper: TipperCreateNestedOneWithoutTipsInput
  }

  export type TipUncheckedCreateWithoutUserTokenInput = {
    txHash: string
    amount: Decimal | DecimalJsLike | number | string
    value: Decimal | DecimalJsLike | number | string
    message: string
    displayed: boolean
    date?: Date | string
    receivedTokensAmount: Decimal | DecimalJsLike | number | string
    userRole: Role
    userAddress: string
    tokenAddress: string
    tipperAddress: string
  }

  export type TipCreateOrConnectWithoutUserTokenInput = {
    where: TipWhereUniqueInput
    create: XOR<TipCreateWithoutUserTokenInput, TipUncheckedCreateWithoutUserTokenInput>
  }

  export type TipCreateManyUserTokenInputEnvelope = {
    data: Enumerable<TipCreateManyUserTokenInput>
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutUserTokenInput = {
    update: XOR<UserUpdateWithoutUserTokenInput, UserUncheckedUpdateWithoutUserTokenInput>
    create: XOR<UserCreateWithoutUserTokenInput, UserUncheckedCreateWithoutUserTokenInput>
  }

  export type UserUpdateWithoutUserTokenInput = {
    address?: StringFieldUpdateOperationsInput | string
    nick?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allTipsCount?: IntFieldUpdateOperationsInput | number
    allTipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    apperanceMode?: EnumApperanceModeFieldUpdateOperationsInput | ApperanceMode
    roles?: UserUpdaterolesInput | Enumerable<Role>
    defaultRole?: EnumRoleFieldUpdateOperationsInput | Role
    refreshTokens?: UserUpdaterefreshTokensInput | Enumerable<string>
    avatar?: FileUpdateOneWithoutUserNestedInput
    witdraws?: WithdrawUpdateManyWithoutUserNestedInput
    tips?: TipUpdateManyWithoutUserNestedInput
    streamer?: StreamerUpdateOneWithoutUserNestedInput
    tipper?: TipperUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUserTokenInput = {
    address?: StringFieldUpdateOperationsInput | string
    nick?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allTipsCount?: IntFieldUpdateOperationsInput | number
    allTipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    apperanceMode?: EnumApperanceModeFieldUpdateOperationsInput | ApperanceMode
    roles?: UserUpdaterolesInput | Enumerable<Role>
    defaultRole?: EnumRoleFieldUpdateOperationsInput | Role
    refreshTokens?: UserUpdaterefreshTokensInput | Enumerable<string>
    avatarId?: NullableStringFieldUpdateOperationsInput | string | null
    witdraws?: WithdrawUncheckedUpdateManyWithoutUserNestedInput
    tips?: TipUncheckedUpdateManyWithoutUserNestedInput
    streamer?: StreamerUncheckedUpdateOneWithoutUserNestedInput
    tipper?: TipperUncheckedUpdateOneWithoutUserNestedInput
  }

  export type TipUpsertWithWhereUniqueWithoutUserTokenInput = {
    where: TipWhereUniqueInput
    update: XOR<TipUpdateWithoutUserTokenInput, TipUncheckedUpdateWithoutUserTokenInput>
    create: XOR<TipCreateWithoutUserTokenInput, TipUncheckedCreateWithoutUserTokenInput>
  }

  export type TipUpdateWithWhereUniqueWithoutUserTokenInput = {
    where: TipWhereUniqueInput
    data: XOR<TipUpdateWithoutUserTokenInput, TipUncheckedUpdateWithoutUserTokenInput>
  }

  export type TipUpdateManyWithWhereWithoutUserTokenInput = {
    where: TipScalarWhereInput
    data: XOR<TipUpdateManyMutationInput, TipUncheckedUpdateManyWithoutTipInput>
  }

  export type StreamerCreateWithoutWidgetsInput = {
    user: UserCreateNestedOneWithoutStreamerInput
    tipsCount?: number
    tipsValue?: Decimal | DecimalJsLike | number | string
    page: PageCreateNestedOneWithoutStreamerInput
    activeTokens?: TokenCreateNestedManyWithoutStreamerInput
  }

  export type StreamerUncheckedCreateWithoutWidgetsInput = {
    address: string
    tipsCount?: number
    tipsValue?: Decimal | DecimalJsLike | number | string
    activeTokens?: TokenUncheckedCreateNestedManyWithoutStreamerInput
    pageId: string
  }

  export type StreamerCreateOrConnectWithoutWidgetsInput = {
    where: StreamerWhereUniqueInput
    create: XOR<StreamerCreateWithoutWidgetsInput, StreamerUncheckedCreateWithoutWidgetsInput>
  }

  export type StreamerUpsertWithoutWidgetsInput = {
    update: XOR<StreamerUpdateWithoutWidgetsInput, StreamerUncheckedUpdateWithoutWidgetsInput>
    create: XOR<StreamerCreateWithoutWidgetsInput, StreamerUncheckedCreateWithoutWidgetsInput>
  }

  export type StreamerUpdateWithoutWidgetsInput = {
    user?: UserUpdateOneRequiredWithoutStreamerNestedInput
    tipsCount?: IntFieldUpdateOperationsInput | number
    tipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    page?: PageUpdateOneRequiredWithoutStreamerNestedInput
    activeTokens?: TokenUpdateManyWithoutStreamerNestedInput
  }

  export type StreamerUncheckedUpdateWithoutWidgetsInput = {
    address?: StringFieldUpdateOperationsInput | string
    tipsCount?: IntFieldUpdateOperationsInput | number
    tipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    activeTokens?: TokenUncheckedUpdateManyWithoutStreamerNestedInput
    pageId?: StringFieldUpdateOperationsInput | string
  }

  export type FileCreateWithoutTokenInput = {
    id?: string
    filename: string
    extension: string
    User?: UserCreateNestedManyWithoutAvatarInput
    Page?: PageCreateNestedManyWithoutBanerInput
  }

  export type FileUncheckedCreateWithoutTokenInput = {
    id?: string
    filename: string
    extension: string
    User?: UserUncheckedCreateNestedManyWithoutAvatarInput
    Page?: PageUncheckedCreateNestedManyWithoutBanerInput
  }

  export type FileCreateOrConnectWithoutTokenInput = {
    where: FileWhereUniqueInput
    create: XOR<FileCreateWithoutTokenInput, FileUncheckedCreateWithoutTokenInput>
  }

  export type StreamerCreateWithoutActiveTokensInput = {
    user: UserCreateNestedOneWithoutStreamerInput
    tipsCount?: number
    tipsValue?: Decimal | DecimalJsLike | number | string
    page: PageCreateNestedOneWithoutStreamerInput
    widgets?: WidgetCreateNestedManyWithoutStreamerInput
  }

  export type StreamerUncheckedCreateWithoutActiveTokensInput = {
    address: string
    tipsCount?: number
    tipsValue?: Decimal | DecimalJsLike | number | string
    widgets?: WidgetUncheckedCreateNestedManyWithoutStreamerInput
    pageId: string
  }

  export type StreamerCreateOrConnectWithoutActiveTokensInput = {
    where: StreamerWhereUniqueInput
    create: XOR<StreamerCreateWithoutActiveTokensInput, StreamerUncheckedCreateWithoutActiveTokensInput>
  }

  export type TipCreateWithoutTokenInput = {
    txHash: string
    amount: Decimal | DecimalJsLike | number | string
    value: Decimal | DecimalJsLike | number | string
    message: string
    displayed: boolean
    date?: Date | string
    receivedTokensAmount: Decimal | DecimalJsLike | number | string
    userRole: Role
    user: UserCreateNestedOneWithoutTipsInput
    userToken: UserTokenCreateNestedOneWithoutTipInput
    tipper: TipperCreateNestedOneWithoutTipsInput
  }

  export type TipUncheckedCreateWithoutTokenInput = {
    txHash: string
    amount: Decimal | DecimalJsLike | number | string
    value: Decimal | DecimalJsLike | number | string
    message: string
    displayed: boolean
    date?: Date | string
    receivedTokensAmount: Decimal | DecimalJsLike | number | string
    userRole: Role
    userAddress: string
    userTokenAddress: string
    tipperAddress: string
  }

  export type TipCreateOrConnectWithoutTokenInput = {
    where: TipWhereUniqueInput
    create: XOR<TipCreateWithoutTokenInput, TipUncheckedCreateWithoutTokenInput>
  }

  export type TipCreateManyTokenInputEnvelope = {
    data: Enumerable<TipCreateManyTokenInput>
    skipDuplicates?: boolean
  }

  export type FileUpsertWithoutTokenInput = {
    update: XOR<FileUpdateWithoutTokenInput, FileUncheckedUpdateWithoutTokenInput>
    create: XOR<FileCreateWithoutTokenInput, FileUncheckedCreateWithoutTokenInput>
  }

  export type FileUpdateWithoutTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    User?: UserUpdateManyWithoutAvatarNestedInput
    Page?: PageUpdateManyWithoutBanerNestedInput
  }

  export type FileUncheckedUpdateWithoutTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    User?: UserUncheckedUpdateManyWithoutAvatarNestedInput
    Page?: PageUncheckedUpdateManyWithoutBanerNestedInput
  }

  export type StreamerUpsertWithoutActiveTokensInput = {
    update: XOR<StreamerUpdateWithoutActiveTokensInput, StreamerUncheckedUpdateWithoutActiveTokensInput>
    create: XOR<StreamerCreateWithoutActiveTokensInput, StreamerUncheckedCreateWithoutActiveTokensInput>
  }

  export type StreamerUpdateWithoutActiveTokensInput = {
    user?: UserUpdateOneRequiredWithoutStreamerNestedInput
    tipsCount?: IntFieldUpdateOperationsInput | number
    tipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    page?: PageUpdateOneRequiredWithoutStreamerNestedInput
    widgets?: WidgetUpdateManyWithoutStreamerNestedInput
  }

  export type StreamerUncheckedUpdateWithoutActiveTokensInput = {
    address?: StringFieldUpdateOperationsInput | string
    tipsCount?: IntFieldUpdateOperationsInput | number
    tipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    widgets?: WidgetUncheckedUpdateManyWithoutStreamerNestedInput
    pageId?: StringFieldUpdateOperationsInput | string
  }

  export type TipUpsertWithWhereUniqueWithoutTokenInput = {
    where: TipWhereUniqueInput
    update: XOR<TipUpdateWithoutTokenInput, TipUncheckedUpdateWithoutTokenInput>
    create: XOR<TipCreateWithoutTokenInput, TipUncheckedCreateWithoutTokenInput>
  }

  export type TipUpdateWithWhereUniqueWithoutTokenInput = {
    where: TipWhereUniqueInput
    data: XOR<TipUpdateWithoutTokenInput, TipUncheckedUpdateWithoutTokenInput>
  }

  export type TipUpdateManyWithWhereWithoutTokenInput = {
    where: TipScalarWhereInput
    data: XOR<TipUpdateManyMutationInput, TipUncheckedUpdateManyWithoutTipInput>
  }

  export type UserCreateWithoutWitdrawsInput = {
    address: string
    nick: string
    email: string
    emailVerified?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    verified?: boolean
    createdAt?: Date | string
    updateAt?: Date | string
    allTipsCount?: number
    allTipsValue?: Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: Decimal | DecimalJsLike | number | string
    apperanceMode?: ApperanceMode
    roles?: UserCreaterolesInput | Enumerable<Role>
    defaultRole?: Role
    refreshTokens?: UserCreaterefreshTokensInput | Enumerable<string>
    avatar?: FileCreateNestedOneWithoutUserInput
    userToken?: UserTokenCreateNestedOneWithoutUserInput
    tips?: TipCreateNestedManyWithoutUserInput
    streamer?: StreamerCreateNestedOneWithoutUserInput
    tipper?: TipperCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWitdrawsInput = {
    address: string
    nick: string
    email: string
    emailVerified?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    verified?: boolean
    createdAt?: Date | string
    updateAt?: Date | string
    allTipsCount?: number
    allTipsValue?: Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: Decimal | DecimalJsLike | number | string
    apperanceMode?: ApperanceMode
    roles?: UserCreaterolesInput | Enumerable<Role>
    defaultRole?: Role
    refreshTokens?: UserCreaterefreshTokensInput | Enumerable<string>
    avatarId?: string | null
    userToken?: UserTokenUncheckedCreateNestedOneWithoutUserInput
    tips?: TipUncheckedCreateNestedManyWithoutUserInput
    streamer?: StreamerUncheckedCreateNestedOneWithoutUserInput
    tipper?: TipperUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWitdrawsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWitdrawsInput, UserUncheckedCreateWithoutWitdrawsInput>
  }

  export type UserUpsertWithoutWitdrawsInput = {
    update: XOR<UserUpdateWithoutWitdrawsInput, UserUncheckedUpdateWithoutWitdrawsInput>
    create: XOR<UserCreateWithoutWitdrawsInput, UserUncheckedCreateWithoutWitdrawsInput>
  }

  export type UserUpdateWithoutWitdrawsInput = {
    address?: StringFieldUpdateOperationsInput | string
    nick?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allTipsCount?: IntFieldUpdateOperationsInput | number
    allTipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    apperanceMode?: EnumApperanceModeFieldUpdateOperationsInput | ApperanceMode
    roles?: UserUpdaterolesInput | Enumerable<Role>
    defaultRole?: EnumRoleFieldUpdateOperationsInput | Role
    refreshTokens?: UserUpdaterefreshTokensInput | Enumerable<string>
    avatar?: FileUpdateOneWithoutUserNestedInput
    userToken?: UserTokenUpdateOneWithoutUserNestedInput
    tips?: TipUpdateManyWithoutUserNestedInput
    streamer?: StreamerUpdateOneWithoutUserNestedInput
    tipper?: TipperUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWitdrawsInput = {
    address?: StringFieldUpdateOperationsInput | string
    nick?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allTipsCount?: IntFieldUpdateOperationsInput | number
    allTipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    apperanceMode?: EnumApperanceModeFieldUpdateOperationsInput | ApperanceMode
    roles?: UserUpdaterolesInput | Enumerable<Role>
    defaultRole?: EnumRoleFieldUpdateOperationsInput | Role
    refreshTokens?: UserUpdaterefreshTokensInput | Enumerable<string>
    avatarId?: NullableStringFieldUpdateOperationsInput | string | null
    userToken?: UserTokenUncheckedUpdateOneWithoutUserNestedInput
    tips?: TipUncheckedUpdateManyWithoutUserNestedInput
    streamer?: StreamerUncheckedUpdateOneWithoutUserNestedInput
    tipper?: TipperUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutAvatarInput = {
    address: string
    nick: string
    email: string
    emailVerified?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    verified?: boolean
    createdAt?: Date | string
    updateAt?: Date | string
    allTipsCount?: number
    allTipsValue?: Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: Decimal | DecimalJsLike | number | string
    apperanceMode?: ApperanceMode
    roles?: UserCreaterolesInput | Enumerable<Role>
    defaultRole?: Role
    refreshTokens?: UserCreaterefreshTokensInput | Enumerable<string>
    witdraws?: WithdrawCreateNestedManyWithoutUserInput
    userToken?: UserTokenCreateNestedOneWithoutUserInput
    tips?: TipCreateNestedManyWithoutUserInput
    streamer?: StreamerCreateNestedOneWithoutUserInput
    tipper?: TipperCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAvatarInput = {
    address: string
    nick: string
    email: string
    emailVerified?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    verified?: boolean
    createdAt?: Date | string
    updateAt?: Date | string
    allTipsCount?: number
    allTipsValue?: Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: Decimal | DecimalJsLike | number | string
    apperanceMode?: ApperanceMode
    roles?: UserCreaterolesInput | Enumerable<Role>
    defaultRole?: Role
    refreshTokens?: UserCreaterefreshTokensInput | Enumerable<string>
    witdraws?: WithdrawUncheckedCreateNestedManyWithoutUserInput
    userToken?: UserTokenUncheckedCreateNestedOneWithoutUserInput
    tips?: TipUncheckedCreateNestedManyWithoutUserInput
    streamer?: StreamerUncheckedCreateNestedOneWithoutUserInput
    tipper?: TipperUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAvatarInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAvatarInput, UserUncheckedCreateWithoutAvatarInput>
  }

  export type UserCreateManyAvatarInputEnvelope = {
    data: Enumerable<UserCreateManyAvatarInput>
    skipDuplicates?: boolean
  }

  export type TokenCreateWithoutImageInput = {
    address: string
    symbol: string
    name: string
    chainId: number
    latestPrice?: Decimal | DecimalJsLike | number | string | null
    priceUpdateAt?: Date | string | null
    Streamer?: StreamerCreateNestedOneWithoutActiveTokensInput
    Tip?: TipCreateNestedManyWithoutTokenInput
  }

  export type TokenUncheckedCreateWithoutImageInput = {
    address: string
    symbol: string
    name: string
    chainId: number
    latestPrice?: Decimal | DecimalJsLike | number | string | null
    priceUpdateAt?: Date | string | null
    streamerAddress?: string | null
    Tip?: TipUncheckedCreateNestedManyWithoutTokenInput
  }

  export type TokenCreateOrConnectWithoutImageInput = {
    where: TokenWhereUniqueInput
    create: XOR<TokenCreateWithoutImageInput, TokenUncheckedCreateWithoutImageInput>
  }

  export type TokenCreateManyImageInputEnvelope = {
    data: Enumerable<TokenCreateManyImageInput>
    skipDuplicates?: boolean
  }

  export type PageCreateWithoutBanerInput = {
    id?: string
    affixUrl: string
    description?: string | null
    Streamer?: StreamerCreateNestedManyWithoutPageInput
  }

  export type PageUncheckedCreateWithoutBanerInput = {
    id?: string
    affixUrl: string
    description?: string | null
    Streamer?: StreamerUncheckedCreateNestedManyWithoutPageInput
  }

  export type PageCreateOrConnectWithoutBanerInput = {
    where: PageWhereUniqueInput
    create: XOR<PageCreateWithoutBanerInput, PageUncheckedCreateWithoutBanerInput>
  }

  export type PageCreateManyBanerInputEnvelope = {
    data: Enumerable<PageCreateManyBanerInput>
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutAvatarInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutAvatarInput, UserUncheckedUpdateWithoutAvatarInput>
    create: XOR<UserCreateWithoutAvatarInput, UserUncheckedCreateWithoutAvatarInput>
  }

  export type UserUpdateWithWhereUniqueWithoutAvatarInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutAvatarInput, UserUncheckedUpdateWithoutAvatarInput>
  }

  export type UserUpdateManyWithWhereWithoutAvatarInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutUserInput>
  }

  export type UserScalarWhereInput = {
    AND?: Enumerable<UserScalarWhereInput>
    OR?: Enumerable<UserScalarWhereInput>
    NOT?: Enumerable<UserScalarWhereInput>
    address?: StringFilter | string
    nick?: StringFilter | string
    email?: StringFilter | string
    emailVerified?: DateTimeNullableFilter | Date | string | null
    firstName?: StringNullableFilter | string | null
    lastName?: StringNullableFilter | string | null
    verified?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
    updateAt?: DateTimeFilter | Date | string
    allTipsCount?: IntFilter | number
    allTipsValue?: DecimalFilter | Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: DecimalFilter | Decimal | DecimalJsLike | number | string
    apperanceMode?: EnumApperanceModeFilter | ApperanceMode
    roles?: EnumRoleNullableListFilter
    defaultRole?: EnumRoleFilter | Role
    refreshTokens?: StringNullableListFilter
    avatarId?: StringNullableFilter | string | null
  }

  export type TokenUpsertWithWhereUniqueWithoutImageInput = {
    where: TokenWhereUniqueInput
    update: XOR<TokenUpdateWithoutImageInput, TokenUncheckedUpdateWithoutImageInput>
    create: XOR<TokenCreateWithoutImageInput, TokenUncheckedCreateWithoutImageInput>
  }

  export type TokenUpdateWithWhereUniqueWithoutImageInput = {
    where: TokenWhereUniqueInput
    data: XOR<TokenUpdateWithoutImageInput, TokenUncheckedUpdateWithoutImageInput>
  }

  export type TokenUpdateManyWithWhereWithoutImageInput = {
    where: TokenScalarWhereInput
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyWithoutTokenInput>
  }

  export type PageUpsertWithWhereUniqueWithoutBanerInput = {
    where: PageWhereUniqueInput
    update: XOR<PageUpdateWithoutBanerInput, PageUncheckedUpdateWithoutBanerInput>
    create: XOR<PageCreateWithoutBanerInput, PageUncheckedCreateWithoutBanerInput>
  }

  export type PageUpdateWithWhereUniqueWithoutBanerInput = {
    where: PageWhereUniqueInput
    data: XOR<PageUpdateWithoutBanerInput, PageUncheckedUpdateWithoutBanerInput>
  }

  export type PageUpdateManyWithWhereWithoutBanerInput = {
    where: PageScalarWhereInput
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyWithoutPageInput>
  }

  export type PageScalarWhereInput = {
    AND?: Enumerable<PageScalarWhereInput>
    OR?: Enumerable<PageScalarWhereInput>
    NOT?: Enumerable<PageScalarWhereInput>
    id?: StringFilter | string
    affixUrl?: StringFilter | string
    description?: StringNullableFilter | string | null
    banerId?: StringNullableFilter | string | null
  }

  export type WithdrawCreateManyUserInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    date?: Date | string
    txHash: string
  }

  export type TipCreateManyUserInput = {
    txHash: string
    amount: Decimal | DecimalJsLike | number | string
    value: Decimal | DecimalJsLike | number | string
    message: string
    displayed: boolean
    date?: Date | string
    receivedTokensAmount: Decimal | DecimalJsLike | number | string
    userRole: Role
    userTokenAddress: string
    tokenAddress: string
    tipperAddress: string
  }

  export type WithdrawUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    txHash?: StringFieldUpdateOperationsInput | string
  }

  export type WithdrawUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    txHash?: StringFieldUpdateOperationsInput | string
  }

  export type WithdrawUncheckedUpdateManyWithoutWitdrawsInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    txHash?: StringFieldUpdateOperationsInput | string
  }

  export type TipUpdateWithoutUserInput = {
    txHash?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    message?: StringFieldUpdateOperationsInput | string
    displayed?: BoolFieldUpdateOperationsInput | boolean
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedTokensAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    userRole?: EnumRoleFieldUpdateOperationsInput | Role
    userToken?: UserTokenUpdateOneRequiredWithoutTipNestedInput
    token?: TokenUpdateOneRequiredWithoutTipNestedInput
    tipper?: TipperUpdateOneRequiredWithoutTipsNestedInput
  }

  export type TipUncheckedUpdateWithoutUserInput = {
    txHash?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    message?: StringFieldUpdateOperationsInput | string
    displayed?: BoolFieldUpdateOperationsInput | boolean
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedTokensAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    userRole?: EnumRoleFieldUpdateOperationsInput | Role
    userTokenAddress?: StringFieldUpdateOperationsInput | string
    tokenAddress?: StringFieldUpdateOperationsInput | string
    tipperAddress?: StringFieldUpdateOperationsInput | string
  }

  export type TipUncheckedUpdateManyWithoutTipsInput = {
    txHash?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    message?: StringFieldUpdateOperationsInput | string
    displayed?: BoolFieldUpdateOperationsInput | boolean
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedTokensAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    userRole?: EnumRoleFieldUpdateOperationsInput | Role
    userTokenAddress?: StringFieldUpdateOperationsInput | string
    tokenAddress?: StringFieldUpdateOperationsInput | string
    tipperAddress?: StringFieldUpdateOperationsInput | string
  }

  export type TokenCreateManyStreamerInput = {
    address: string
    symbol: string
    name: string
    chainId: number
    imageId?: string | null
    latestPrice?: Decimal | DecimalJsLike | number | string | null
    priceUpdateAt?: Date | string | null
  }

  export type WidgetCreateManyStreamerInput = {
    id?: string
    url: string
    songPath: string
    backgroundPath: string
    nickColor: string
    messageColor: string
    valueColor: string
    showTime: number
    filterProfanity: boolean
    voiceMessage: boolean
  }

  export type TokenUpdateWithoutStreamerInput = {
    address?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    image?: FileUpdateOneWithoutTokenNestedInput
    latestPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceUpdateAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Tip?: TipUpdateManyWithoutTokenNestedInput
  }

  export type TokenUncheckedUpdateWithoutStreamerInput = {
    address?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    imageId?: NullableStringFieldUpdateOperationsInput | string | null
    latestPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceUpdateAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Tip?: TipUncheckedUpdateManyWithoutTokenNestedInput
  }

  export type TokenUncheckedUpdateManyWithoutActiveTokensInput = {
    address?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    imageId?: NullableStringFieldUpdateOperationsInput | string | null
    latestPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceUpdateAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WidgetUpdateWithoutStreamerInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    songPath?: StringFieldUpdateOperationsInput | string
    backgroundPath?: StringFieldUpdateOperationsInput | string
    nickColor?: StringFieldUpdateOperationsInput | string
    messageColor?: StringFieldUpdateOperationsInput | string
    valueColor?: StringFieldUpdateOperationsInput | string
    showTime?: IntFieldUpdateOperationsInput | number
    filterProfanity?: BoolFieldUpdateOperationsInput | boolean
    voiceMessage?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WidgetUncheckedUpdateWithoutStreamerInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    songPath?: StringFieldUpdateOperationsInput | string
    backgroundPath?: StringFieldUpdateOperationsInput | string
    nickColor?: StringFieldUpdateOperationsInput | string
    messageColor?: StringFieldUpdateOperationsInput | string
    valueColor?: StringFieldUpdateOperationsInput | string
    showTime?: IntFieldUpdateOperationsInput | number
    filterProfanity?: BoolFieldUpdateOperationsInput | boolean
    voiceMessage?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WidgetUncheckedUpdateManyWithoutWidgetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    songPath?: StringFieldUpdateOperationsInput | string
    backgroundPath?: StringFieldUpdateOperationsInput | string
    nickColor?: StringFieldUpdateOperationsInput | string
    messageColor?: StringFieldUpdateOperationsInput | string
    valueColor?: StringFieldUpdateOperationsInput | string
    showTime?: IntFieldUpdateOperationsInput | number
    filterProfanity?: BoolFieldUpdateOperationsInput | boolean
    voiceMessage?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TipCreateManyTipperInput = {
    txHash: string
    amount: Decimal | DecimalJsLike | number | string
    value: Decimal | DecimalJsLike | number | string
    message: string
    displayed: boolean
    date?: Date | string
    receivedTokensAmount: Decimal | DecimalJsLike | number | string
    userRole: Role
    userAddress: string
    userTokenAddress: string
    tokenAddress: string
  }

  export type TipUpdateWithoutTipperInput = {
    txHash?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    message?: StringFieldUpdateOperationsInput | string
    displayed?: BoolFieldUpdateOperationsInput | boolean
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedTokensAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    userRole?: EnumRoleFieldUpdateOperationsInput | Role
    user?: UserUpdateOneRequiredWithoutTipsNestedInput
    userToken?: UserTokenUpdateOneRequiredWithoutTipNestedInput
    token?: TokenUpdateOneRequiredWithoutTipNestedInput
  }

  export type TipUncheckedUpdateWithoutTipperInput = {
    txHash?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    message?: StringFieldUpdateOperationsInput | string
    displayed?: BoolFieldUpdateOperationsInput | boolean
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedTokensAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    userRole?: EnumRoleFieldUpdateOperationsInput | Role
    userAddress?: StringFieldUpdateOperationsInput | string
    userTokenAddress?: StringFieldUpdateOperationsInput | string
    tokenAddress?: StringFieldUpdateOperationsInput | string
  }

  export type StreamerCreateManyPageInput = {
    address: string
    tipsCount?: number
    tipsValue?: Decimal | DecimalJsLike | number | string
  }

  export type StreamerUpdateWithoutPageInput = {
    user?: UserUpdateOneRequiredWithoutStreamerNestedInput
    tipsCount?: IntFieldUpdateOperationsInput | number
    tipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    activeTokens?: TokenUpdateManyWithoutStreamerNestedInput
    widgets?: WidgetUpdateManyWithoutStreamerNestedInput
  }

  export type StreamerUncheckedUpdateWithoutPageInput = {
    address?: StringFieldUpdateOperationsInput | string
    tipsCount?: IntFieldUpdateOperationsInput | number
    tipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    activeTokens?: TokenUncheckedUpdateManyWithoutStreamerNestedInput
    widgets?: WidgetUncheckedUpdateManyWithoutStreamerNestedInput
  }

  export type StreamerUncheckedUpdateManyWithoutStreamerInput = {
    address?: StringFieldUpdateOperationsInput | string
    tipsCount?: IntFieldUpdateOperationsInput | number
    tipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type TipCreateManyUserTokenInput = {
    txHash: string
    amount: Decimal | DecimalJsLike | number | string
    value: Decimal | DecimalJsLike | number | string
    message: string
    displayed: boolean
    date?: Date | string
    receivedTokensAmount: Decimal | DecimalJsLike | number | string
    userRole: Role
    userAddress: string
    tokenAddress: string
    tipperAddress: string
  }

  export type TipUpdateWithoutUserTokenInput = {
    txHash?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    message?: StringFieldUpdateOperationsInput | string
    displayed?: BoolFieldUpdateOperationsInput | boolean
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedTokensAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    userRole?: EnumRoleFieldUpdateOperationsInput | Role
    user?: UserUpdateOneRequiredWithoutTipsNestedInput
    token?: TokenUpdateOneRequiredWithoutTipNestedInput
    tipper?: TipperUpdateOneRequiredWithoutTipsNestedInput
  }

  export type TipUncheckedUpdateWithoutUserTokenInput = {
    txHash?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    message?: StringFieldUpdateOperationsInput | string
    displayed?: BoolFieldUpdateOperationsInput | boolean
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedTokensAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    userRole?: EnumRoleFieldUpdateOperationsInput | Role
    userAddress?: StringFieldUpdateOperationsInput | string
    tokenAddress?: StringFieldUpdateOperationsInput | string
    tipperAddress?: StringFieldUpdateOperationsInput | string
  }

  export type TipUncheckedUpdateManyWithoutTipInput = {
    txHash?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    message?: StringFieldUpdateOperationsInput | string
    displayed?: BoolFieldUpdateOperationsInput | boolean
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedTokensAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    userRole?: EnumRoleFieldUpdateOperationsInput | Role
    userAddress?: StringFieldUpdateOperationsInput | string
    tokenAddress?: StringFieldUpdateOperationsInput | string
    tipperAddress?: StringFieldUpdateOperationsInput | string
  }

  export type TipCreateManyTokenInput = {
    txHash: string
    amount: Decimal | DecimalJsLike | number | string
    value: Decimal | DecimalJsLike | number | string
    message: string
    displayed: boolean
    date?: Date | string
    receivedTokensAmount: Decimal | DecimalJsLike | number | string
    userRole: Role
    userAddress: string
    userTokenAddress: string
    tipperAddress: string
  }

  export type TipUpdateWithoutTokenInput = {
    txHash?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    message?: StringFieldUpdateOperationsInput | string
    displayed?: BoolFieldUpdateOperationsInput | boolean
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedTokensAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    userRole?: EnumRoleFieldUpdateOperationsInput | Role
    user?: UserUpdateOneRequiredWithoutTipsNestedInput
    userToken?: UserTokenUpdateOneRequiredWithoutTipNestedInput
    tipper?: TipperUpdateOneRequiredWithoutTipsNestedInput
  }

  export type TipUncheckedUpdateWithoutTokenInput = {
    txHash?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    message?: StringFieldUpdateOperationsInput | string
    displayed?: BoolFieldUpdateOperationsInput | boolean
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedTokensAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    userRole?: EnumRoleFieldUpdateOperationsInput | Role
    userAddress?: StringFieldUpdateOperationsInput | string
    userTokenAddress?: StringFieldUpdateOperationsInput | string
    tipperAddress?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateManyAvatarInput = {
    address: string
    nick: string
    email: string
    emailVerified?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    verified?: boolean
    createdAt?: Date | string
    updateAt?: Date | string
    allTipsCount?: number
    allTipsValue?: Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: Decimal | DecimalJsLike | number | string
    apperanceMode?: ApperanceMode
    roles?: UserCreaterolesInput | Enumerable<Role>
    defaultRole?: Role
    refreshTokens?: UserCreaterefreshTokensInput | Enumerable<string>
  }

  export type TokenCreateManyImageInput = {
    address: string
    symbol: string
    name: string
    chainId: number
    latestPrice?: Decimal | DecimalJsLike | number | string | null
    priceUpdateAt?: Date | string | null
    streamerAddress?: string | null
  }

  export type PageCreateManyBanerInput = {
    id?: string
    affixUrl: string
    description?: string | null
  }

  export type UserUpdateWithoutAvatarInput = {
    address?: StringFieldUpdateOperationsInput | string
    nick?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allTipsCount?: IntFieldUpdateOperationsInput | number
    allTipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    apperanceMode?: EnumApperanceModeFieldUpdateOperationsInput | ApperanceMode
    roles?: UserUpdaterolesInput | Enumerable<Role>
    defaultRole?: EnumRoleFieldUpdateOperationsInput | Role
    refreshTokens?: UserUpdaterefreshTokensInput | Enumerable<string>
    witdraws?: WithdrawUpdateManyWithoutUserNestedInput
    userToken?: UserTokenUpdateOneWithoutUserNestedInput
    tips?: TipUpdateManyWithoutUserNestedInput
    streamer?: StreamerUpdateOneWithoutUserNestedInput
    tipper?: TipperUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAvatarInput = {
    address?: StringFieldUpdateOperationsInput | string
    nick?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allTipsCount?: IntFieldUpdateOperationsInput | number
    allTipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    apperanceMode?: EnumApperanceModeFieldUpdateOperationsInput | ApperanceMode
    roles?: UserUpdaterolesInput | Enumerable<Role>
    defaultRole?: EnumRoleFieldUpdateOperationsInput | Role
    refreshTokens?: UserUpdaterefreshTokensInput | Enumerable<string>
    witdraws?: WithdrawUncheckedUpdateManyWithoutUserNestedInput
    userToken?: UserTokenUncheckedUpdateOneWithoutUserNestedInput
    tips?: TipUncheckedUpdateManyWithoutUserNestedInput
    streamer?: StreamerUncheckedUpdateOneWithoutUserNestedInput
    tipper?: TipperUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutUserInput = {
    address?: StringFieldUpdateOperationsInput | string
    nick?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allTipsCount?: IntFieldUpdateOperationsInput | number
    allTipsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    allWithdrawsValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    apperanceMode?: EnumApperanceModeFieldUpdateOperationsInput | ApperanceMode
    roles?: UserUpdaterolesInput | Enumerable<Role>
    defaultRole?: EnumRoleFieldUpdateOperationsInput | Role
    refreshTokens?: UserUpdaterefreshTokensInput | Enumerable<string>
  }

  export type TokenUpdateWithoutImageInput = {
    address?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    latestPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceUpdateAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Streamer?: StreamerUpdateOneWithoutActiveTokensNestedInput
    Tip?: TipUpdateManyWithoutTokenNestedInput
  }

  export type TokenUncheckedUpdateWithoutImageInput = {
    address?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    latestPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceUpdateAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streamerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    Tip?: TipUncheckedUpdateManyWithoutTokenNestedInput
  }

  export type TokenUncheckedUpdateManyWithoutTokenInput = {
    address?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    latestPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceUpdateAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streamerAddress?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PageUpdateWithoutBanerInput = {
    id?: StringFieldUpdateOperationsInput | string
    affixUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    Streamer?: StreamerUpdateManyWithoutPageNestedInput
  }

  export type PageUncheckedUpdateWithoutBanerInput = {
    id?: StringFieldUpdateOperationsInput | string
    affixUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    Streamer?: StreamerUncheckedUpdateManyWithoutPageNestedInput
  }

  export type PageUncheckedUpdateManyWithoutPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    affixUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}