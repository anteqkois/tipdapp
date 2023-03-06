import {
  address,
  UserFacet__factory,
  UserToken__factory,
} from '@tipdapp/contracts';
import { HandledNetworks } from '@tipdapp/types';
import { netowrkInfo } from './src/config/network';
import { provider } from './src/lib/ethersProvider';

export const UserFacet = UserFacet__factory.connect(
  address[netowrkInfo.network as HandledNetworks].Diamond,
  // '0x25A1DF485cFBb93117f12fc673D87D1cddEb845a',
  provider
);

// const userToken = UserToken__factory.connect(
//   '0x47873862c10b3f80E2Ebc2800C9B63aB895D453d',
//   provider
// );

// dotenv_config_path=.env.development npx ts-node --project tsconfig.json --files  playground.ts
(async () => {
  console.log('UserFacet :>> ', UserFacet);

  const userTokenAddress = await UserFacet.userToken(
    '0x69E952d100e786aAA6B63a3473D67ccaF1183271'
  );

  console.log('userTokenAddress :>> ', userTokenAddress);
  const userToken = UserToken__factory.connect(userTokenAddress, provider);

  const decimal = await userToken.decimals();
  console.log('decimal :>> ', decimal);
  const symbol = await userToken.symbol();
  console.log('symbol :>> ', symbol);
  // const name = await userToken.name();
  // console.log('name :>> ', name);
})();
