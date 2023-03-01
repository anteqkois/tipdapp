
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  decompressFromBase64,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  findSync
} = require('./runtime/library')


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

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
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


  const path = require('path')

const fs = require('fs')

// some frameworks or bundlers replace or totally remove __dirname
const hasDirname = typeof __dirname !== 'undefined' && __dirname !== '/'

// will work in most cases, ie. if the client has not been bundled
const regularDirname = hasDirname && fs.existsSync(path.join(__dirname, 'schema.prisma')) && __dirname

// if the client has been bundled, we need to look for the folders
const foundDirname = !regularDirname && findSync(process.cwd(), [
    "client",
    
], ['d'], ['d'], 1)[0]

const dirname = regularDirname || foundDirname || __dirname

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
  id: 'id',
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

const dmmfString = "{\"datamodel\":{\"enums\":[{\"name\":\"Role\",\"values\":[{\"name\":\"streamer\",\"dbName\":null},{\"name\":\"charity\",\"dbName\":null},{\"name\":\"shop\",\"dbName\":null}],\"dbName\":null},{\"name\":\"ApperanceMode\",\"values\":[{\"name\":\"dark\",\"dbName\":null},{\"name\":\"light\",\"dbName\":null}],\"dbName\":null},{\"name\":\"Extension\",\"values\":[{\"name\":\"png\",\"dbName\":null},{\"name\":\"jpeg\",\"dbName\":null},{\"name\":\"jpg\",\"dbName\":null}],\"dbName\":null}],\"models\":[{\"name\":\"User\",\"dbName\":null,\"fields\":[{\"name\":\"address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nick\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"emailVerified\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"firstName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"verified\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updateAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"allTipsCount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"allTipsValue\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"allWithdrawsValue\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"roles\",\"kind\":\"enum\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Role\",\"default\":[\"streamer\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"activeRole\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Role\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"avatar\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"File\",\"relationName\":\"FileToUser\",\"relationFromFields\":[\"avatarUrl\"],\"relationToFields\":[\"url\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"avatarUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"witdraws\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Withdraw\",\"relationName\":\"UserToWithdraw\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userToken\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UserToken\",\"relationName\":\"UserToUserToken\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tips\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Tip\",\"relationName\":\"TipToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"streamer\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Streamer\",\"relationName\":\"StreamerToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"verificationEmailToken\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"VerificationEmailToken\",\"relationName\":\"UserToVerificationEmailToken\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"settings\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Settings\",\"relationName\":\"SettingsToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Settings\",\"dbName\":null,\"fields\":[{\"name\":\"address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"SettingsToUser\",\"relationFromFields\":[\"address\"],\"relationToFields\":[\"address\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"apperanceMode\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"ApperanceMode\",\"default\":\"light\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"VerificationEmailToken\",\"dbName\":null,\"fields\":[{\"name\":\"address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"UserToVerificationEmailToken\",\"relationFromFields\":[\"address\"],\"relationToFields\":[\"address\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expires\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Streamer\",\"dbName\":null,\"fields\":[{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"StreamerToUser\",\"relationFromFields\":[\"address\"],\"relationToFields\":[\"address\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tipsCount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tipsValue\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"page\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Page\",\"relationName\":\"PageToStreamer\",\"relationFromFields\":[\"pageAffixUrl\"],\"relationToFields\":[\"affixUrl\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pageAffixUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"activeTokens\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Token\",\"relationName\":\"StreamerToToken\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"widgets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Widget\",\"relationName\":\"StreamerToWidget\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Tipper\",\"dbName\":null,\"fields\":[{\"name\":\"address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nick\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tipsValue\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tips\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Tip\",\"relationName\":\"TipToTipper\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Page\",\"dbName\":null,\"fields\":[{\"name\":\"role\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Role\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"affixUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"baner\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"File\",\"relationName\":\"FileToPage\",\"relationFromFields\":[\"banerUrl\"],\"relationToFields\":[\"url\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"banerUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"streamer\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Streamer\",\"relationName\":\"PageToStreamer\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"role\",\"affixUrl\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Tip\",\"dbName\":null,\"fields\":[{\"name\":\"txHash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"amount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"value\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"message\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"displayed\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"receivedTokensAmount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userRole\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Role\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"TipToUser\",\"relationFromFields\":[\"userAddress\"],\"relationToFields\":[\"address\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userAddress\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userToken\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UserToken\",\"relationName\":\"TipToUserToken\",\"relationFromFields\":[\"userTokenAddress\"],\"relationToFields\":[\"address\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userTokenAddress\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"token\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Token\",\"relationName\":\"TipToToken\",\"relationFromFields\":[\"tokenAddress\"],\"relationToFields\":[\"address\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tokenAddress\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tipper\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Tipper\",\"relationName\":\"TipToTipper\",\"relationFromFields\":[\"tipperAddress\"],\"relationToFields\":[\"address\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tipperAddress\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"UserToken\",\"dbName\":null,\"fields\":[{\"name\":\"address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"symbol\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chainId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"txHash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"UserToUserToken\",\"relationFromFields\":[\"userAddress\"],\"relationToFields\":[\"address\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userAddress\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Tip\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Tip\",\"relationName\":\"TipToUserToken\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Widget\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"songPath\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"backgroundPath\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nickColor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"messageColor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"valueColor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"showTime\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"filterProfanity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"voiceMessage\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"streamer\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Streamer\",\"relationName\":\"StreamerToWidget\",\"relationFromFields\":[\"streamerAddress\"],\"relationToFields\":[\"address\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"streamerAddress\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Token\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"symbol\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"coinGeckoId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chainId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"File\",\"relationName\":\"FileToToken\",\"relationFromFields\":[\"imageUrl\"],\"relationToFields\":[\"url\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"imageUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"streamer\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Streamer\",\"relationName\":\"StreamerToToken\",\"relationFromFields\":[\"streamerAddress\"],\"relationToFields\":[\"address\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"streamerAddress\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tip\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Tip\",\"relationName\":\"TipToToken\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Withdraw\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"amount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"txHash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"UserToWithdraw\",\"relationFromFields\":[\"userAddress\"],\"relationToFields\":[\"address\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userAddress\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"File\",\"dbName\":null,\"fields\":[{\"name\":\"url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"filename\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"extension\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Extension\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"FileToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"token\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Token\",\"relationName\":\"FileToToken\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"page\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Page\",\"relationName\":\"FileToPage\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"filename\",\"extension\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"filename\",\"extension\"]}],\"isGenerated\":false}],\"types\":[]},\"mappings\":{\"modelOperations\":[{\"model\":\"User\",\"plural\":\"users\",\"findUnique\":\"findUniqueUser\",\"findUniqueOrThrow\":\"findUniqueUserOrThrow\",\"findFirst\":\"findFirstUser\",\"findFirstOrThrow\":\"findFirstUserOrThrow\",\"findMany\":\"findManyUser\",\"create\":\"createOneUser\",\"createMany\":\"createManyUser\",\"delete\":\"deleteOneUser\",\"update\":\"updateOneUser\",\"deleteMany\":\"deleteManyUser\",\"updateMany\":\"updateManyUser\",\"upsert\":\"upsertOneUser\",\"aggregate\":\"aggregateUser\",\"groupBy\":\"groupByUser\"},{\"model\":\"Settings\",\"plural\":\"settings\",\"findUnique\":\"findUniqueSettings\",\"findUniqueOrThrow\":\"findUniqueSettingsOrThrow\",\"findFirst\":\"findFirstSettings\",\"findFirstOrThrow\":\"findFirstSettingsOrThrow\",\"findMany\":\"findManySettings\",\"create\":\"createOneSettings\",\"createMany\":\"createManySettings\",\"delete\":\"deleteOneSettings\",\"update\":\"updateOneSettings\",\"deleteMany\":\"deleteManySettings\",\"updateMany\":\"updateManySettings\",\"upsert\":\"upsertOneSettings\",\"aggregate\":\"aggregateSettings\",\"groupBy\":\"groupBySettings\"},{\"model\":\"VerificationEmailToken\",\"plural\":\"verificationEmailTokens\",\"findUnique\":\"findUniqueVerificationEmailToken\",\"findUniqueOrThrow\":\"findUniqueVerificationEmailTokenOrThrow\",\"findFirst\":\"findFirstVerificationEmailToken\",\"findFirstOrThrow\":\"findFirstVerificationEmailTokenOrThrow\",\"findMany\":\"findManyVerificationEmailToken\",\"create\":\"createOneVerificationEmailToken\",\"createMany\":\"createManyVerificationEmailToken\",\"delete\":\"deleteOneVerificationEmailToken\",\"update\":\"updateOneVerificationEmailToken\",\"deleteMany\":\"deleteManyVerificationEmailToken\",\"updateMany\":\"updateManyVerificationEmailToken\",\"upsert\":\"upsertOneVerificationEmailToken\",\"aggregate\":\"aggregateVerificationEmailToken\",\"groupBy\":\"groupByVerificationEmailToken\"},{\"model\":\"Streamer\",\"plural\":\"streamers\",\"findUnique\":\"findUniqueStreamer\",\"findUniqueOrThrow\":\"findUniqueStreamerOrThrow\",\"findFirst\":\"findFirstStreamer\",\"findFirstOrThrow\":\"findFirstStreamerOrThrow\",\"findMany\":\"findManyStreamer\",\"create\":\"createOneStreamer\",\"createMany\":\"createManyStreamer\",\"delete\":\"deleteOneStreamer\",\"update\":\"updateOneStreamer\",\"deleteMany\":\"deleteManyStreamer\",\"updateMany\":\"updateManyStreamer\",\"upsert\":\"upsertOneStreamer\",\"aggregate\":\"aggregateStreamer\",\"groupBy\":\"groupByStreamer\"},{\"model\":\"Tipper\",\"plural\":\"tippers\",\"findUnique\":\"findUniqueTipper\",\"findUniqueOrThrow\":\"findUniqueTipperOrThrow\",\"findFirst\":\"findFirstTipper\",\"findFirstOrThrow\":\"findFirstTipperOrThrow\",\"findMany\":\"findManyTipper\",\"create\":\"createOneTipper\",\"createMany\":\"createManyTipper\",\"delete\":\"deleteOneTipper\",\"update\":\"updateOneTipper\",\"deleteMany\":\"deleteManyTipper\",\"updateMany\":\"updateManyTipper\",\"upsert\":\"upsertOneTipper\",\"aggregate\":\"aggregateTipper\",\"groupBy\":\"groupByTipper\"},{\"model\":\"Page\",\"plural\":\"pages\",\"findUnique\":\"findUniquePage\",\"findUniqueOrThrow\":\"findUniquePageOrThrow\",\"findFirst\":\"findFirstPage\",\"findFirstOrThrow\":\"findFirstPageOrThrow\",\"findMany\":\"findManyPage\",\"create\":\"createOnePage\",\"createMany\":\"createManyPage\",\"delete\":\"deleteOnePage\",\"update\":\"updateOnePage\",\"deleteMany\":\"deleteManyPage\",\"updateMany\":\"updateManyPage\",\"upsert\":\"upsertOnePage\",\"aggregate\":\"aggregatePage\",\"groupBy\":\"groupByPage\"},{\"model\":\"Tip\",\"plural\":\"tips\",\"findUnique\":\"findUniqueTip\",\"findUniqueOrThrow\":\"findUniqueTipOrThrow\",\"findFirst\":\"findFirstTip\",\"findFirstOrThrow\":\"findFirstTipOrThrow\",\"findMany\":\"findManyTip\",\"create\":\"createOneTip\",\"createMany\":\"createManyTip\",\"delete\":\"deleteOneTip\",\"update\":\"updateOneTip\",\"deleteMany\":\"deleteManyTip\",\"updateMany\":\"updateManyTip\",\"upsert\":\"upsertOneTip\",\"aggregate\":\"aggregateTip\",\"groupBy\":\"groupByTip\"},{\"model\":\"UserToken\",\"plural\":\"userTokens\",\"findUnique\":\"findUniqueUserToken\",\"findUniqueOrThrow\":\"findUniqueUserTokenOrThrow\",\"findFirst\":\"findFirstUserToken\",\"findFirstOrThrow\":\"findFirstUserTokenOrThrow\",\"findMany\":\"findManyUserToken\",\"create\":\"createOneUserToken\",\"createMany\":\"createManyUserToken\",\"delete\":\"deleteOneUserToken\",\"update\":\"updateOneUserToken\",\"deleteMany\":\"deleteManyUserToken\",\"updateMany\":\"updateManyUserToken\",\"upsert\":\"upsertOneUserToken\",\"aggregate\":\"aggregateUserToken\",\"groupBy\":\"groupByUserToken\"},{\"model\":\"Widget\",\"plural\":\"widgets\",\"findUnique\":\"findUniqueWidget\",\"findUniqueOrThrow\":\"findUniqueWidgetOrThrow\",\"findFirst\":\"findFirstWidget\",\"findFirstOrThrow\":\"findFirstWidgetOrThrow\",\"findMany\":\"findManyWidget\",\"create\":\"createOneWidget\",\"createMany\":\"createManyWidget\",\"delete\":\"deleteOneWidget\",\"update\":\"updateOneWidget\",\"deleteMany\":\"deleteManyWidget\",\"updateMany\":\"updateManyWidget\",\"upsert\":\"upsertOneWidget\",\"aggregate\":\"aggregateWidget\",\"groupBy\":\"groupByWidget\"},{\"model\":\"Token\",\"plural\":\"tokens\",\"findUnique\":\"findUniqueToken\",\"findUniqueOrThrow\":\"findUniqueTokenOrThrow\",\"findFirst\":\"findFirstToken\",\"findFirstOrThrow\":\"findFirstTokenOrThrow\",\"findMany\":\"findManyToken\",\"create\":\"createOneToken\",\"createMany\":\"createManyToken\",\"delete\":\"deleteOneToken\",\"update\":\"updateOneToken\",\"deleteMany\":\"deleteManyToken\",\"updateMany\":\"updateManyToken\",\"upsert\":\"upsertOneToken\",\"aggregate\":\"aggregateToken\",\"groupBy\":\"groupByToken\"},{\"model\":\"Withdraw\",\"plural\":\"withdraws\",\"findUnique\":\"findUniqueWithdraw\",\"findUniqueOrThrow\":\"findUniqueWithdrawOrThrow\",\"findFirst\":\"findFirstWithdraw\",\"findFirstOrThrow\":\"findFirstWithdrawOrThrow\",\"findMany\":\"findManyWithdraw\",\"create\":\"createOneWithdraw\",\"createMany\":\"createManyWithdraw\",\"delete\":\"deleteOneWithdraw\",\"update\":\"updateOneWithdraw\",\"deleteMany\":\"deleteManyWithdraw\",\"updateMany\":\"updateManyWithdraw\",\"upsert\":\"upsertOneWithdraw\",\"aggregate\":\"aggregateWithdraw\",\"groupBy\":\"groupByWithdraw\"},{\"model\":\"File\",\"plural\":\"files\",\"findUnique\":\"findUniqueFile\",\"findUniqueOrThrow\":\"findUniqueFileOrThrow\",\"findFirst\":\"findFirstFile\",\"findFirstOrThrow\":\"findFirstFileOrThrow\",\"findMany\":\"findManyFile\",\"create\":\"createOneFile\",\"createMany\":\"createManyFile\",\"delete\":\"deleteOneFile\",\"update\":\"updateOneFile\",\"deleteMany\":\"deleteManyFile\",\"updateMany\":\"updateManyFile\",\"upsert\":\"upsertOneFile\",\"aggregate\":\"aggregateFile\",\"groupBy\":\"groupByFile\"}],\"otherOperations\":{\"read\":[],\"write\":[\"executeRaw\",\"queryRaw\"]}}}"
const dmmf = JSON.parse(dmmfString)
exports.Prisma.dmmf = JSON.parse(dmmfString)

/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Users/anteqkois/Code/Projects/tipdapp/packages/prisma/client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "darwin-arm64"
      },
      {
        "fromEnvVar": null,
        "value": "linux-arm64-openssl-1.1.x"
      }
    ],
    "previewFeatures": [],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "../.env",
    "schemaEnvPath": "../.env"
  },
  "relativePath": "..",
  "clientVersion": "4.10.0",
  "engineVersion": "aead147aa326ccb985dcfed5b065b4fdabd44b19",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "dataProxy": false
}
config.document = dmmf
config.dirname = dirname




const { warnEnvConflicts } = require('./runtime/library')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

path.join(__dirname, "libquery_engine-darwin-arm64.dylib.node");
path.join(process.cwd(), "client/libquery_engine-darwin-arm64.dylib.node")

path.join(__dirname, "libquery_engine-linux-arm64-openssl-1.1.x.so.node");
path.join(process.cwd(), "client/libquery_engine-linux-arm64-openssl-1.1.x.so.node")
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "client/schema.prisma")
