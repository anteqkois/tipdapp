
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.10.0
 * Query Engine version: aead147aa326ccb985dcfed5b065b4fdabd44b19
 */
Prisma.prismaVersion = {
  client: "4.10.0",
  engine: "aead147aa326ccb985dcfed5b065b4fdabd44b19"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val


/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.FileScalarFieldEnum = makeEnum({
  url: 'url',
  filename: 'filename',
  extension: 'extension'
});

exports.Prisma.PageScalarFieldEnum = makeEnum({
  role: 'role',
  affixUrl: 'affixUrl',
  description: 'description',
  banerUrl: 'banerUrl'
});

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive'
});

exports.Prisma.SessionScalarFieldEnum = makeEnum({
  ip: 'ip',
  address: 'address',
  refreshTokens: 'refreshTokens',
  expires: 'expires'
});

exports.Prisma.SettingsScalarFieldEnum = makeEnum({
  address: 'address',
  apperanceMode: 'apperanceMode'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.StreamerScalarFieldEnum = makeEnum({
  address: 'address',
  tipsCount: 'tipsCount',
  tipsValue: 'tipsValue',
  pageAffixUrl: 'pageAffixUrl'
});

exports.Prisma.TipScalarFieldEnum = makeEnum({
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
});

exports.Prisma.TipperScalarFieldEnum = makeEnum({
  address: 'address',
  nick: 'nick',
  tipsValue: 'tipsValue'
});

exports.Prisma.TokenScalarFieldEnum = makeEnum({
  address: 'address',
  symbol: 'symbol',
  name: 'name',
  coinGeckoId: 'coinGeckoId',
  chainId: 'chainId',
  imageUrl: 'imageUrl',
  streamerAddress: 'streamerAddress'
});

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = makeEnum({
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
  roles: 'roles',
  activeRole: 'activeRole',
  avatarUrl: 'avatarUrl'
});

exports.Prisma.UserTokenScalarFieldEnum = makeEnum({
  address: 'address',
  symbol: 'symbol',
  name: 'name',
  chainId: 'chainId',
  txHash: 'txHash',
  userAddress: 'userAddress'
});

exports.Prisma.VerificationEmailTokenScalarFieldEnum = makeEnum({
  address: 'address',
  token: 'token',
  expires: 'expires'
});

exports.Prisma.WidgetScalarFieldEnum = makeEnum({
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
});

exports.Prisma.WithdrawScalarFieldEnum = makeEnum({
  id: 'id',
  amount: 'amount',
  date: 'date',
  txHash: 'txHash',
  userAddress: 'userAddress'
});
exports.ApperanceMode = makeEnum({
  dark: 'dark',
  light: 'light'
});

exports.Extension = makeEnum({
  png: 'png',
  jpeg: 'jpeg',
  jpg: 'jpg'
});

exports.Role = makeEnum({
  streamer: 'streamer',
  charity: 'charity',
  shop: 'shop'
});

exports.Prisma.ModelName = makeEnum({
  User: 'User',
  Session: 'Session',
  Settings: 'Settings',
  VerificationEmailToken: 'VerificationEmailToken',
  Streamer: 'Streamer',
  Tipper: 'Tipper',
  Page: 'Page',
  Tip: 'Tip',
  UserToken: 'UserToken',
  Widget: 'Widget',
  Token: 'Token',
  Withdraw: 'Withdraw',
  File: 'File'
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
