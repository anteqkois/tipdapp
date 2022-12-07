## Code and types (include Prisma models) from web3 dapp server

This package was creted to share code and types from web3 dapp server to other microservice and apps which are dependent
It have example on how to export a package which wraps the "normal" Prisma but include your specific typings.
It is useful for e.g. a microservice setup in which every service can import the package and you can manage/publish the prisma package from a dedicated place/repository.

in future maybe bundle .prisma folder to package like in this [repo](https://github.com/aiji42/turbo-with-prisma/blob/main/packages/database/src/client.ts)