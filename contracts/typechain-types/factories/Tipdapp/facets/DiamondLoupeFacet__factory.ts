/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  DiamondLoupeFacet,
  DiamondLoupeFacetInterface,
} from "../../../Tipdapp/facets/DiamondLoupeFacet";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "_functionSelector",
        type: "bytes4",
      },
    ],
    name: "facetAddress",
    outputs: [
      {
        internalType: "address",
        name: "facetAddress_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "facetAddresses",
    outputs: [
      {
        internalType: "address[]",
        name: "facetAddresses_",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_facet",
        type: "address",
      },
    ],
    name: "facetFunctionSelectors",
    outputs: [
      {
        internalType: "bytes4[]",
        name: "_facetFunctionSelectors",
        type: "bytes4[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "facets",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "facetAddress",
            type: "address",
          },
          {
            internalType: "bytes4[]",
            name: "functionSelectors",
            type: "bytes4[]",
          },
        ],
        internalType: "struct IDiamondLoupe.Facet[]",
        name: "facets_",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "_interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610b2b806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806301ffc9a71461005c57806352ef6b2c146100bd5780637a0ed627146100d2578063adfca15e146100e7578063cdffacc614610107575b600080fd5b6100a861006a3660046108dd565b6001600160e01b03191660009081527fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131f602052604090205460ff1690565b60405190151581526020015b60405180910390f35b6100c5610159565b6040516100b4919061090e565b6100da61031d565b6040516100b491906109a0565b6100fa6100f5366004610a1d565b61076b565b6040516100b49190610a46565b6101416101153660046108dd565b6001600160e01b0319166000908152600080516020610ad6833981519152602052604090205460601c90565b6040516001600160a01b0390911681526020016100b4565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131e54606090600080516020610ad68339815191529061ffff1667ffffffffffffffff8111156101aa576101aa610a59565b6040519080825280602002602001820160405280156101d3578160200160208202803683370190505b50915060008060005b600284015461ffff16821015610315576000818152600185016020526040812054905b6008811015610300578361021281610a85565b600288015490955061ffff168511905061030057600581901b82901b6001600160e01b0319811660009081526020889052604081205460601c90805b888110156102a3578a818151811061026857610268610a9e565b60200260200101516001600160a01b0316836001600160a01b03160361029157600191506102a3565b8061029b81610a85565b91505061024e565b5080156102b2575050506102ee565b818a89815181106102c5576102c5610a9e565b6001600160a01b0390921660209283029190910190910152876102e781610a85565b9850505050505b806102f881610a85565b9150506101ff565b5050808061030d90610a85565b9150506101dc565b505082525090565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131e54606090600080516020610ad68339815191529061ffff1667ffffffffffffffff81111561036e5761036e610a59565b6040519080825280602002602001820160405280156103b457816020015b60408051808201909152600081526060602082015281526020019060019003908161038c5790505b50600282015490925060009061ffff1667ffffffffffffffff8111156103dc576103dc610a59565b604051908082528060200260200182016040528015610405578160200160208202803683370190505b50905060008060005b600285015461ffff168210156106f8576000818152600186016020526040812054905b60088110156106e3578361044481610a85565b600289015490955061ffff16851190506106e357600581901b82901b6001600160e01b0319811660009081526020899052604081205460601c90805b888110156105a057826001600160a01b03168c82815181106104a4576104a4610a9e565b6020026020010151600001516001600160a01b03160361058e57838c82815181106104d1576104d1610a9e565b6020026020010151602001518b83815181106104ef576104ef610a9e565b602002602001015161ffff168151811061050b5761050b610a9e565b60200260200101906001600160e01b03191690816001600160e01b0319168152505060ff8a828151811061054157610541610a9e565b602002602001015161ffff161061055757600080fd5b89818151811061056957610569610a9e565b60200260200101805180919061057e90610ab4565b61ffff16905250600191506105a0565b8061059881610a85565b915050610480565b5080156105af575050506106d1565b818b89815181106105c2576105c2610a9e565b60209081029190910101516001600160a01b03909116905260028a015461ffff1667ffffffffffffffff8111156105fb576105fb610a59565b604051908082528060200260200182016040528015610624578160200160208202803683370190505b508b898151811061063757610637610a9e565b602002602001015160200181905250828b898151811061065957610659610a9e565b60200260200101516020015160008151811061067757610677610a9e565b60200260200101906001600160e01b03191690816001600160e01b0319168152505060018989815181106106ad576106ad610a9e565b61ffff90921660209283029190910190910152876106ca81610a85565b9850505050505b806106db81610a85565b915050610431565b505080806106f090610a85565b91505061040e565b5060005b8281101561076057600084828151811061071857610718610a9e565b602002602001015161ffff169050600087838151811061073a5761073a610a9e565b60200260200101516020015190508181525050808061075890610a85565b9150506106fc565b508185525050505090565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131e54606090600080516020610ad68339815191529060009061ffff1667ffffffffffffffff8111156107bf576107bf610a59565b6040519080825280602002602001820160405280156107e8578160200160208202803683370190505b5092506000805b600284015461ffff168210156108d3576000818152600185016020526040812054905b60088110156108be578361082581610a85565b600288015490955061ffff16851190506108be57600581901b82901b6001600160e01b0319811660009081526020889052604090205460601c6001600160a01b038a168190036108a9578189888151811061088257610882610a9e565b6001600160e01b031990921660209283029190910190910152866108a581610a85565b9750505b505080806108b690610a85565b915050610812565b505080806108cb90610a85565b9150506107ef565b5050825250919050565b6000602082840312156108ef57600080fd5b81356001600160e01b03198116811461090757600080fd5b9392505050565b6020808252825182820181905260009190848201906040850190845b8181101561094f5783516001600160a01b03168352928401929184019160010161092a565b50909695505050505050565b600081518084526020808501945080840160005b838110156109955781516001600160e01b0319168752958201959082019060010161096f565b509495945050505050565b60006020808301818452808551808352604092508286019150828160051b87010184880160005b83811015610a0f57888303603f19018552815180516001600160a01b031684528701518784018790526109fc8785018261095b565b95880195935050908601906001016109c7565b509098975050505050505050565b600060208284031215610a2f57600080fd5b81356001600160a01b038116811461090757600080fd5b602081526000610907602083018461095b565b634e487b7160e01b600052604160045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600060018201610a9757610a97610a6f565b5060010190565b634e487b7160e01b600052603260045260246000fd5b600061ffff808316818103610acb57610acb610a6f565b600101939250505056fec8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131ca26469706673582212201b1d2f41953e79b7213490d15119b7297fd1760298e58f0d16dbdd10accf4b6964736f6c63430008110033";

type DiamondLoupeFacetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DiamondLoupeFacetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DiamondLoupeFacet__factory extends ContractFactory {
  constructor(...args: DiamondLoupeFacetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DiamondLoupeFacet> {
    return super.deploy(overrides || {}) as Promise<DiamondLoupeFacet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DiamondLoupeFacet {
    return super.attach(address) as DiamondLoupeFacet;
  }
  override connect(signer: Signer): DiamondLoupeFacet__factory {
    return super.connect(signer) as DiamondLoupeFacet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DiamondLoupeFacetInterface {
    return new utils.Interface(_abi) as DiamondLoupeFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DiamondLoupeFacet {
    return new Contract(address, _abi, signerOrProvider) as DiamondLoupeFacet;
  }
}
