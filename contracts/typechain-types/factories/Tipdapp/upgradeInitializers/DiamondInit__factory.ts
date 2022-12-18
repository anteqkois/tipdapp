/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  DiamondInit,
  DiamondInitInterface,
} from "../../../Tipdapp/upgradeInitializers/DiamondInit";

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
  "0x608060405234801561001057600080fd5b50610126806100206000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063e1c7392a14602d575b600080fd5b60ee60036020527f28b0ef64f7e82d3b26f3fd404bd0151552f792965f39c29ae82c0a78df67af9c8054600160ff1991821681179092557f9b7e66eb0c7005d906623b0f9e5d7a33fdb5fbc396d45a9cbdf373920791d9d680548216831790557f3aaf3f076fb24203ee1bcf0f2e25d1605e12f54b2932b80b78ba8b482a188f1680548216831790556307f5828d60e41b6000527fb615b8373ab64c13d507b56993f9a52b82e9920bdba5814889d6bc33aad2b21f80549091169091179055565b00fea26469706673582212204ffe17290fa0656b58007a062585478abe2dc8c7ef0a48fc624535407dc2c7fb64736f6c63430008110033";

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
