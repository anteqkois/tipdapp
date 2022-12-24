/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  DiamondInit,
  DiamondInitInterface,
} from "../../../../contracts/Tipdapp/upgradeInitializers/DiamondInit";

const _abi = [
  {
    inputs: [],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610149806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063e1c7392a14610030575b600080fd5b6101117fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131f6020527f699d9daa71b280d05a152715774afa0a81a312594b2d731d6b0b2552b7d6f69f8054600160ff1991821681179092557ff97e938d8af42f52387bb74b8b526fda8f184cc2aa534340a8d75a88fbecc77580548216831790557f65d510a5d8f7ef134ec444f7f34ee808c8eeb5177cdfd16be0c40fe1ab43369580548216831790556307f5828d60e41b6000527f5622121b47b8cd0120c4efe45dd5483242f54a3d49bd7679be565d47694918c380549091169091179055565b00fea2646970667358221220f5ba5c88d4ec747a4c2df5b44197e6fc6bbcf88417290ee3dca79a6ed72ae86264736f6c63430008110033";

type DiamondInitConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DiamondInitConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DiamondInit__factory extends ContractFactory {
  constructor(...args: DiamondInitConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DiamondInit> {
    return super.deploy(overrides || {}) as Promise<DiamondInit>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DiamondInit {
    return super.attach(address) as DiamondInit;
  }
  override connect(signer: Signer): DiamondInit__factory {
    return super.connect(signer) as DiamondInit__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DiamondInitInterface {
    return new utils.Interface(_abi) as DiamondInitInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DiamondInit {
    return new Contract(address, _abi, signerOrProvider) as DiamondInit;
  }
}
