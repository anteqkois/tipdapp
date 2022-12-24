/* global ethers */

import { BaseContract, ethers as Ethers } from "ethers";
import { ethers } from "hardhat";
import { IDiamondLoupe } from "../../typechain-types";

type Selector = string; // 0xa9059cbb itdl.
type Signature = string; // transfer(address,uint256) diamondCut(tuple(address,uint8,bytes4[])[],address,bytes)
type ContractOrFactory = BaseContract | Ethers.ContractFactory;

const FacetCutAction = { Add: 0, Replace: 1, Remove: 2 };

// get function selectors from ABI
function getSelectors(contract: ContractOrFactory) {
  const signatures = Object.keys(contract.interface.functions);
  const selectors = signatures.reduce((acc: string[], val) => {
    if (val !== "init(bytes)") {
      acc.push(contract.interface.getSighash(val));
    }
    return acc;
  }, []);
  //@ts-ignore
  selectors.contract = contract;
  //@ts-ignore
  selectors.remove = remove;
  //@ts-ignore
  selectors.get = get;
  return selectors as string[] & {
    contract: ContractOrFactory;
    remove: typeof remove;
    get: typeof get;
  };
}

// get function selector from function signature
function getSelector(funcSignature: Signature) {
  const abiInterface = new ethers.utils.Interface([funcSignature]);
  return abiInterface.getSighash(ethers.utils.Fragment.from(funcSignature));
}

// used with getSelectors to remove selectors from an array of selectors
// functionNames argument is an array of function signatures
function remove(
  this: Selector[] & { contract: ContractOrFactory },
  functionNames: Signature[]
) {
  const selectors = this.filter((v: string) => {
    for (const functionName of functionNames) {
      if (v === this.contract.interface.getSighash(functionName)) {
        return false;
      }
    }
    return true;
  });
  //@ts-ignore
  selectors.contract = this.contract;
  //@ts-ignore
  selectors.remove = this.remove;
  //@ts-ignore
  selectors.get = this.get;
  return selectors as string[] & {
    contract: ContractOrFactory;
    remove: typeof remove;
    get: typeof get;
  };
}

// used with getSelectors to get selectors from an array of selectors
// functionNames argument is an array of function signatures
function get(
  this: Selector[] & { contract: ContractOrFactory },
  functionNames: Signature[]
) {
  const selectors = this.filter((v) => {
    for (const functionName of functionNames) {
      if (v === this.contract.interface.getSighash(functionName)) {
        return true;
      }
    }
    return false;
  });
  //@ts-ignore
  selectors.contract = this.contract;
  //@ts-ignore
  selectors.remove = this.remove;
  //@ts-ignore
  selectors.get = this.get;
  return selectors as string[] & {
    contract: ContractOrFactory;
    remove: typeof remove;
    get: typeof get;
  };
}

// remove selectors using an array of signatures
function removeSelectors(selectors: Selector[], signatures: Signature[]) {
  const iface = new ethers.utils.Interface(
    signatures.map((v) => "function " + v)
  );
  const removeSelectors = signatures.map((v) => iface.getSighash(v));
  selectors = selectors.filter((v) => !removeSelectors.includes(v));
  return selectors;
}

// find a particular address position in the return value of diamondLoupeFacet.facets()
function findAddressPositionInFacets(
  facetAddress: string,
  facets: IDiamondLoupe.FacetStructOutput[]
) {
  for (let i = 0; i < facets.length; i++) {
    if (facets[i].facetAddress === facetAddress) {
      return i;
    }
  }
  return -1;
}

export {
  getSelectors,
  getSelector,
  FacetCutAction,
  remove,
  removeSelectors,
  findAddressPositionInFacets,
};
