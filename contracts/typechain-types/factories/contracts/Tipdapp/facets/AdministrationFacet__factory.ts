/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  AdministrationFacet,
  AdministrationFacetInterface,
} from "../../../../contracts/Tipdapp/facets/AdministrationFacet";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_newSignerAdmin",
        type: "address",
      },
    ],
    name: "changeSignerAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newFee",
        type: "uint256",
      },
    ],
    name: "setFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newImplementation",
        type: "address",
      },
    ],
    name: "setUserTokenImplmentation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "signerAdmin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tipFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "unPause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "userTokenImplmentation",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
    ],
    name: "withdrawERC20Admin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawETHAdmin",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_tokenAddress",
        type: "address[]",
      },
    ],
    name: "withdrawManyERC20Admin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506115cf806100206000396000f3fe6080604052600436106100a75760003560e01c8063a1244ca111610064578063a1244ca114610175578063d63fc60a1461019e578063d8a3740e146101c7578063e98827b6146101f2578063f7b188a51461021b578063fab6a80314610232576100a7565b806335759788146100ac5780635c975abb146100b657806369fe0e2d146100e157806379cc3f1c1461010a5780638456cb59146101335780638b08da6d1461014a575b600080fd5b6100b461025d565b005b3480156100c257600080fd5b506100cb6104e0565b6040516100d8919061110e565b60405180910390f35b3480156100ed57600080fd5b5061010860048036038101906101039190611169565b610536565b005b34801561011657600080fd5b50610131600480360381019061012c91906111fb565b610648565b005b34801561013f57600080fd5b506101486107d1565b005b34801561015657600080fd5b5061015f610899565b60405161016c9190611289565b60405180910390f35b34801561018157600080fd5b5061019c600480360381019061019791906112d0565b610902565b005b3480156101aa57600080fd5b506101c560048036038101906101c091906112d0565b6109f1565b005b3480156101d357600080fd5b506101dc610ae0565b6040516101e9919061130c565b60405180910390f35b3480156101fe57600080fd5b50610219600480360381019061021491906112d0565b610b28565b005b34801561022757600080fd5b50610230610e3d565b005b34801561023e57600080fd5b50610247610f04565b6040516102549190611289565b60405180910390f35b610271676a3a55236d7137ce60c01b610f6d565b610285671191189d98c9f32160c01b610f70565b6102996735cb6f94d103facd60c01b610f70565b6102ad67b714585a7f4b650060c01b610f70565b6102b5610f73565b6102c9670c83715678333ae060c01b610f70565b6102dd67e95fd74c5d9b69f860c01b610f6d565b6102f167b58d2a9574dfbe6c60c01b610f6d565b610304666de9391be6018860c01b610f6d565b6103186710dae1bee1ae268960c01b610f6d565b60008060020160003073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050610372676daebf5d341c29b660c01b610f6d565b600060020160003073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600090556103cc67d9e963965a45df5860c01b610f6d565b6103e067929137e69c09a5b560c01b610f6d565b60003373ffffffffffffffffffffffffffffffffffffffff168260405161040690611358565b60006040518083038185875af1925050503d8060008114610443576040519150601f19603f3d011682016040523d82523d6000602084013e610448565b606091505b50509050610460674e3007b8481f0f2a60c01b610f6d565b610474678862ddba2565162c60c01b610f6d565b61048867d8128cbca49a9d9e60c01b610f6d565b806104c8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104bf906113ca565b60405180910390fd5b6104dc67f4753d32b6a11f3f60c01b610f6d565b5050565b60006104f667fa08175465d28c8b60c01b610f6d565b61050a6723ddf8e64bdda51260c01b610f6d565b61051e675dc1b550ab220dc860c01b610f6d565b600060010160009054906101000a900460ff16905090565b61054a67a84d7e0159c5831c60c01b610f6d565b61055e671191189d98c9f32160c01b610f70565b6105726735cb6f94d103facd60c01b610f70565b61058667b714585a7f4b650060c01b610f70565b61058e610f73565b6105a2670c83715678333ae060c01b610f70565b6105b667f4911792f5ced36760c01b610f6d565b6105ca67890a0dec12892d0f60c01b610f6d565b6105de67aa5077ce83d47da660c01b610f6d565b6105f267ce3d21d52c387b0060c01b610f6d565b61060667c8157bfad425f36e60c01b610f6d565b6105dc811061061457600080fd5b61062867f5fd60f22b992f9b60c01b610f6d565b61063c6783ec0cffcde52bdc60c01b610f6d565b80600080018190555050565b61065c677c3adeb3eadb655f60c01b610f6d565b610670671191189d98c9f32160c01b610f70565b6106846735cb6f94d103facd60c01b610f70565b61069867b714585a7f4b650060c01b610f70565b6106a0610f73565b6106b4670c83715678333ae060c01b610f70565b6106c867c6788b619650e6f060c01b610f6d565b6106dc672e3a1f8b0134fbf360c01b610f6d565b6106f067eb7e1e39952531fe60c01b610f6d565b61070467da39899141267b4a60c01b610f6d565b600082829050905061072067993f20f9a1fcd55760c01b610f6d565b61073467cfd866663e87260760c01b610f6d565b60005b8181146107cb5761075267668c6f62a2da3c3a60c01b610f6d565b6107666784d054af1efbb06160c01b610f6d565b61079684848381811061077c5761077b6113ea565b5b905060200201602081019061079191906112d0565b610b28565b6107aa673f094d5a0560b5b460c01b610f6d565b6107be674eeddf46a16282c660c01b610f6d565b8080600101915050610737565b50505050565b6107e5673399915267b0071860c01b610f6d565b6107f9671191189d98c9f32160c01b610f70565b61080d6735cb6f94d103facd60c01b610f70565b61082167b714585a7f4b650060c01b610f70565b610829610f73565b61083d670c83715678333ae060c01b610f70565b610851672827ec614f8892b360c01b610f6d565b61086567864b71e775fe2c6460c01b610f6d565b610879678f6af04c839eb19360c01b610f6d565b6001600060010160006101000a81548160ff021916908315150217905550565b60006108af67d70deef1c68b01e360c01b610f6d565b6108c367fcc0d1d175d9087e60c01b610f6d565b6108d767e604abe60a037dde60c01b610f6d565b600060050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b610916674925a4d7d1794eb460c01b610f6d565b61092a671191189d98c9f32160c01b610f70565b61093e6735cb6f94d103facd60c01b610f70565b61095267b714585a7f4b650060c01b610f70565b61095a610f73565b61096e670c83715678333ae060c01b610f70565b61098267c8e9c5e739be64ec60c01b610f6d565b61099667377efad36060609260c01b610f6d565b6109aa67e3881f219fcb68c060c01b610f6d565b80600060050160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b610a0567b09999685cb4661460c01b610f6d565b610a19671191189d98c9f32160c01b610f70565b610a2d6735cb6f94d103facd60c01b610f70565b610a4167b714585a7f4b650060c01b610f70565b610a49610f73565b610a5d670c83715678333ae060c01b610f70565b610a716716ac4a184e8a5bc760c01b610f6d565b610a8567c03a0320ee8d292e60c01b610f6d565b610a9967b3b81f3aa356b00860c01b610f6d565b80600060010160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000610af667462d082a8979904560c01b610f6d565b610b0a671ca5013553091b7e60c01b610f6d565b610b1e674b3e6f979082255f60c01b610f6d565b6000800154905090565b610b3c67b35def7c14f47cba60c01b610f6d565b610b50671191189d98c9f32160c01b610f70565b610b646735cb6f94d103facd60c01b610f70565b610b7867b714585a7f4b650060c01b610f70565b610b80610f73565b610b94670c83715678333ae060c01b610f70565b610ba8671fa2bfdeb270d89560c01b610f6d565b610bbc67ff692d1f4bbab4bb60c01b610f6d565b610bd067a55666679fe8e74860c01b610f6d565b610be467803b4d05a8d90c3960c01b610f6d565b60008060030160003073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050610c7b67b75db48010356a8060c01b610f6d565b600060030160003073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009055610d126729bba06b0e137a9260c01b610f6d565b610d2667ded57f86b53f6c3760c01b610f6d565b60008273ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33846040518363ffffffff1660e01b8152600401610d63929190611419565b6020604051808303816000875af1158015610d82573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610da6919061146e565b9050610dbc67f22793643760447260c01b610f6d565b610dd067540c5a2b8f315f7460c01b610f6d565b610de46740c11745179c680260c01b610f6d565b80610e24576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e1b906114e7565b60405180910390fd5b610e3867671ff998438134c860c01b610f6d565b505050565b610e5167ff2c1c1fecc3165060c01b610f6d565b610e65671191189d98c9f32160c01b610f70565b610e796735cb6f94d103facd60c01b610f70565b610e8d67b714585a7f4b650060c01b610f70565b610e95610f73565b610ea9670c83715678333ae060c01b610f70565b610ebd67c76ced0bdee8b1e760c01b610f6d565b610ed1678377e0885da152e860c01b610f6d565b610ee56759c4ac801bf2a5c260c01b610f6d565b60008060010160006101000a81548160ff021916908315150217905550565b6000610f1a67e54b2bae3d23d92260c01b610f6d565b610f2e67739c16467a83643b60c01b610f6d565b610f426744f956ba6ab94e7d60c01b610f6d565b600060010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b50565b50565b610f8767f6e307ae25e8c1ad60c01b611072565b610f9b6794851268fb3010da60c01b611072565b610faf678054043697ae4c8d60c01b611072565b610fc36705c00ecec330d89760c01b611072565b610fcb611075565b60040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461105c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161105390611579565b60405180910390fd5b611070673916e4e374a3849760c01b611072565b565b50565b600061108b67490f858169e23fcf60c01b611072565b61109f67b8ec81ecfa37635f60c01b611072565b6110b3678a797775da8e062d60c01b611072565b60007fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c90506110ec6756376c9f774eadcc60c01b611072565b8091505090565b60008115159050919050565b611108816110f3565b82525050565b600060208201905061112360008301846110ff565b92915050565b600080fd5b600080fd5b6000819050919050565b61114681611133565b811461115157600080fd5b50565b6000813590506111638161113d565b92915050565b60006020828403121561117f5761117e611129565b5b600061118d84828501611154565b91505092915050565b600080fd5b600080fd5b600080fd5b60008083601f8401126111bb576111ba611196565b5b8235905067ffffffffffffffff8111156111d8576111d761119b565b5b6020830191508360208202830111156111f4576111f36111a0565b5b9250929050565b6000806020838503121561121257611211611129565b5b600083013567ffffffffffffffff8111156112305761122f61112e565b5b61123c858286016111a5565b92509250509250929050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061127382611248565b9050919050565b61128381611268565b82525050565b600060208201905061129e600083018461127a565b92915050565b6112ad81611268565b81146112b857600080fd5b50565b6000813590506112ca816112a4565b92915050565b6000602082840312156112e6576112e5611129565b5b60006112f4848285016112bb565b91505092915050565b61130681611133565b82525050565b600060208201905061132160008301846112fd565b92915050565b600081905092915050565b50565b6000611342600083611327565b915061134d82611332565b600082019050919050565b600061136382611335565b9150819050919050565b600082825260208201905092915050565b7f4661696c656420746f2077697468647261772045746865720000000000000000600082015250565b60006113b460188361136d565b91506113bf8261137e565b602082019050919050565b600060208201905081810360008301526113e3816113a7565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600060408201905061142e600083018561127a565b61143b60208301846112fd565b9392505050565b61144b816110f3565b811461145657600080fd5b50565b60008151905061146881611442565b92915050565b60006020828403121561148457611483611129565b5b600061149284828501611459565b91505092915050565b7f5769746864726177204552433230206e6f742073756363657373000000000000600082015250565b60006114d1601a8361136d565b91506114dc8261149b565b602082019050919050565b60006020820190508181036000830152611500816114c4565b9050919050565b7f4c69624469616d6f6e643a204d75737420626520636f6e7472616374206f776e60008201527f6572000000000000000000000000000000000000000000000000000000000000602082015250565b600061156360228361136d565b915061156e82611507565b604082019050919050565b6000602082019050818103600083015261159281611556565b905091905056fea2646970667358221220a6e2fbc6cb2c38c154fa8840a807e41dd8fe8c3b907e22e25bfc250c1992333164736f6c63430008110033";

type AdministrationFacetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AdministrationFacetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AdministrationFacet__factory extends ContractFactory {
  constructor(...args: AdministrationFacetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<AdministrationFacet> {
    return super.deploy(overrides || {}) as Promise<AdministrationFacet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): AdministrationFacet {
    return super.attach(address) as AdministrationFacet;
  }
  override connect(signer: Signer): AdministrationFacet__factory {
    return super.connect(signer) as AdministrationFacet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AdministrationFacetInterface {
    return new utils.Interface(_abi) as AdministrationFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AdministrationFacet {
    return new Contract(address, _abi, signerOrProvider) as AdministrationFacet;
  }
}
