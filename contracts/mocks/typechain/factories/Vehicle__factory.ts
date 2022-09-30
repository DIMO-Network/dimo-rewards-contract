/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Vehicle, VehicleInterface } from "../Vehicle";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "nodeType",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "string",
        name: "attribute",
        type: "string",
      },
    ],
    name: "AttributeAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "nodeType",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "nodeId",
        type: "uint256",
      },
    ],
    name: "NodeMinted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "attribute",
        type: "string",
      },
    ],
    name: "addVehicleAttribute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "rootNode",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "string[]",
        name: "attributes",
        type: "string[]",
      },
      {
        internalType: "string[]",
        name: "infos",
        type: "string[]",
      },
    ],
    name: "mintVehicle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "rootNode",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "string[]",
        name: "attributes",
        type: "string[]",
      },
      {
        internalType: "string[]",
        name: "infos",
        type: "string[]",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "mintVehicleSign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nodeId",
        type: "uint256",
      },
      {
        internalType: "string[]",
        name: "attributes",
        type: "string[]",
      },
      {
        internalType: "string[]",
        name: "infos",
        type: "string[]",
      },
    ],
    name: "setVehicleInfo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "label",
        type: "bytes",
      },
    ],
    name: "setVehicleNodeType",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506130fc806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806363822b131461005c5780639c4e715514610078578063c175eb4614610094578063d7d1e236146100b0578063f0d1a557146100cc575b600080fd5b61007660048036038101906100719190611c4f565b6100e8565b005b610092600480360381019061008d9190611d86565b610171565b005b6100ae60048036038101906100a99190611e62565b61035b565b005b6100ca60048036038101906100c59190611ef7565b6103f5565b005b6100e660048036038101906100e19190611ff4565b61053d565b005b6000801b6100f5816105b4565b60006100ff6105c1565b90506000816000015414610148576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161013f9061209e565b60405180910390fd5b83836040516101589291906120fd565b604051809103902060001c816000018190555050505050565b6000801b61017e816105b4565b60006101886105ee565b905060006101946105c1565b905061019e61061b565b600001548260030160008d815260200190815260200160002060000154146101fb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101f290612162565b60405180910390fd5b816004016000815480929190610210906121b1565b91905055506000826004015490508b8360030160008381526020019081526020016000206001018190555081600001548360030160008381526020019081526020016000206000018190555060008061026c838d8d8d8d610648565b9150915060007f3e58defa8c28f56e49ef990ba7b807733fb6cbb551f6136cd82880ab428ba5fc8f8f85856040516020016102ab959493929190612230565b6040516020818303038152906040528051906020012090506102cf8e828b8b61097d565b61030e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610305906122cf565b60405180910390fd5b6103188e85610aa8565b8385600001547f0c2616265c4fd089569533525abc7b19b9f82b423d7cdb61801490b8f9e0ce5960405160405180910390a3505050505050505050505050505050565b6000801b610368816105b4565b60006103726105ee565b9050600061037e6105c1565b905080600001548260030160008a815260200190815260200160002060000154146103de576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103d59061233b565b60405180910390fd5b6103eb8888888888610ac6565b5050505050505050565b6000801b610402816105b4565b600061040c6105ee565b9050600061041861061b565b905060006104246105c1565b905081600001548360030160008c81526020019081526020016000206000015414610484576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161047b90612162565b60405180910390fd5b826004016000815480929190610499906121b1565b91905055506000836004015490506000826000015490508b8560030160008481526020019081526020016000206001018190555080856003016000848152602001908152602001600020600001819055506104f48b83610aa8565b610501828b8b8b8b610ac6565b81817f0c2616265c4fd089569533525abc7b19b9f82b423d7cdb61801490b8f9e0ce5960405160405180910390a3505050505050505050505050565b6000801b61054a816105b4565b60006105546105c1565b9050610564816001018585610c4d565b50838360405161057592919061238b565b604051809103902081600001547fdee1f2fc87d9c834bee1095ebfc0b81ae1b364a7c74060167ab8a82623b22f9c60405160405180910390a350505050565b6105be8133610ce1565b50565b6000807fec68e743e11f3509477f41b0ec121b040a15d46b2c24a1935aa31ef46eca17ad90508091505090565b6000807f334bcdc01ad42928dc76b974b9dc2d08aef6ae80f647d452bdc48c2baf971e8890508091505090565b6000807f74441b47f4359d9186ef9d2bbfd162ba2a52d7b56ea85032b163cadf9e7e3bdc90508091505090565b600080838390508686905014610693576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161068a906123f0565b60405180910390fd5b600061069d6105ee565b905060006106a96105c1565b905060008888905067ffffffffffffffff8111156106ca576106c9612410565b5b6040519080825280602002602001820160405280156106f85781602001602082028036833780820191505090505b50905060008989905067ffffffffffffffff81111561071a57610719612410565b5b6040519080825280602002602001820160405280156107485781602001602082028036833780820191505090505b50905060005b8a8a905081101561091c5761078a846001018c8c848181106107735761077261243f565b5b9050602002810190610785919061247d565b610d85565b6107c9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107c09061252c565b60405180910390fd5b8a8a828181106107dc576107db61243f565b5b90506020028101906107ee919061247d565b6040516107fc9291906120fd565b60405180910390208382815181106108175761081661243f565b5b6020026020010181815250508888828181106108365761083561243f565b5b9050602002810190610848919061247d565b6040516108569291906120fd565b60405180910390208282815181106108715761087061243f565b5b6020026020010181815250508888828181106108905761088f61243f565b5b90506020028101906108a2919061247d565b8660030160008f81526020019081526020016000206002018d8d858181106108cd576108cc61243f565b5b90506020028101906108df919061247d565b6040516108ed92919061238b565b90815260200160405180910390209190610908929190611afd565b508080610914906121b1565b91505061074e565b508160405160200161092e9190612604565b60405160208183030381529060405280519060200120816040516020016109559190612604565b6040516020818303038152906040528051906020012095509550505050509550959350505050565b60008073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16036109ed576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109e490612667565b60405180910390fd5b60006109f7610db6565b85604051602001610a099291906126f4565b604051602081830303815290604052805190602001209050610a6f8185858080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050610e20565b73ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff1614915050949350505050565b610ac2828260405180602001604052806000815250610e9a565b5050565b818190508484905014610b0e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b05906123f0565b60405180910390fd5b6000610b186105ee565b90506000610b246105c1565b905060005b86869050811015610c4357610b6582600101888884818110610b4e57610b4d61243f565b5b9050602002810190610b60919061247d565b610d85565b610ba4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b9b9061252c565b60405180910390fd5b848482818110610bb757610bb661243f565b5b9050602002810190610bc9919061247d565b8460030160008b8152602001908152602001600020600201898985818110610bf457610bf361243f565b5b9050602002810190610c06919061247d565b604051610c1492919061238b565b90815260200160405180910390209190610c2f929190611afd565b508080610c3b906121b1565b915050610b29565b5050505050505050565b6000610c5a848484610d85565b610cd55783600001838390918060018154018082558091505060019003906000526020600020016000909192909192909192909192509190610c9d929190611afd565b508360000180549050846001018484604051610cba92919061238b565b90815260200160405180910390208190555060019050610cda565b600090505b9392505050565b610ceb8282610ef5565b610d8157610d0e8173ffffffffffffffffffffffffffffffffffffffff16610f69565b610d2560208460001c610f9c90919063ffffffff16565b604051602001610d36929190612832565b6040516020818303038152906040526040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d7891906128b6565b60405180910390fd5b5050565b600080846001018484604051610d9c92919061238b565b908152602001604051809103902054141590509392505050565b600080610dc16111c1565b90507f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f816000015482600101544630604051602001610e049594939291906128d8565b6040516020818303038152906040528051906020012091505090565b60006041825114610e66576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e5d90612977565b60405180910390fd5b60008060006020850151925060408501519150606085015160001a9050610e8f868285856111ee565b935050505092915050565b610ea48383611378565b610eb16000848484611520565b610ef0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ee790612a09565b60405180910390fd5b505050565b6000610eff611696565b600001600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6060610f9560148373ffffffffffffffffffffffffffffffffffffffff16610f9c90919063ffffffff16565b9050919050565b606060006002836002610faf9190612a29565b610fb99190612a83565b67ffffffffffffffff811115610fd257610fd1612410565b5b6040519080825280601f01601f1916602001820160405280156110045781602001600182028036833780820191505090505b5090507f30000000000000000000000000000000000000000000000000000000000000008160008151811061103c5761103b61243f565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f7800000000000000000000000000000000000000000000000000000000000000816001815181106110a05761109f61243f565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535060006001846002020190505b6001811115611173577f3031323334353637383961626364656600000000000000000000000000000000600f86166010811061111a5761111961243f565b5b1a60f81b8282815181106111315761113061243f565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600485901c9450806001900390506110db565b50600084146111b7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111ae90612b4b565b60405180910390fd5b8091505092915050565b6000807f1caba0f9c68661100ca506c628d69817ec17e818730121b067a9c57efc89b27290508091505090565b60007f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08260001c1115611256576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161124d90612bdd565b60405180910390fd5b601b8460ff16148061126b5750601c8460ff16145b6112aa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112a190612c6f565b60405180910390fd5b6000600186868686604051600081526020016040526040516112cf9493929190612cab565b6020604051602081039080840390855afa1580156112f1573d6000803e3d6000fd5b505050602060405103519050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361136c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161136390612d3c565b60405180910390fd5b80915050949350505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036113e7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113de90612da8565b60405180910390fd5b60006113f16116c3565b905061140682826116f090919063ffffffff16565b15611446576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161143d90612e14565b60405180910390fd5b61145260008484611710565b6114a5828260020160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002061177d90919063ffffffff16565b506114be8284836000016117979092919063ffffffff16565b50818373ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050565b60006115418473ffffffffffffffffffffffffffffffffffffffff166117cc565b61154e576001905061168e565b600061160e63150b7a0260e01b338887876040516024016115729493929190612e89565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051806060016040528060328152602001613095603291398773ffffffffffffffffffffffffffffffffffffffff166117df9092919063ffffffff16565b90506000818060200190518101906116269190612f2d565b90507f150b7a02000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614925050505b949350505050565b6000807f0166504e5ccb463bc7d5bd33317cff1a2c4b9d767f1c547638f719d36741a1d090508091505090565b6000807f3c7bf052874fa81625121783266a03507bd2cd48b16e571c01a04e8dd3fb07a690508091505090565b600061170882846000016117f790919063ffffffff16565b905092915050565b61171b838383611811565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361177857611757611816565b600301600082815260200190815260200160002060006117779190611b83565b5b505050565b600061178f836000018360001b611843565b905092915050565b60006117c3846000018460001b8473ffffffffffffffffffffffffffffffffffffffff1660001b6118b3565b90509392505050565b600080823b905060008111915050919050565b60606117ee8484600085611995565b90509392505050565b6000611809836000018360001b611ab7565b905092915050565b505050565b6000807f99574a7094154bb123ae6ae102096f0bf9679b85a5cd1e727aaa0ae5f132e6b190508091505090565b600061184f8383611ada565b6118a85782600001829080600181540180825580915050600190039060005260206000200160009091909190915055826000018054905083600101600084815260200190815260200160002081905550600190506118ad565b600090505b92915050565b600080846001016000858152602001908152602001600020549050600081036119595784600001604051806040016040528086815260200185815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000155602082015181600101555050846000018054905085600101600086815260200190815260200160002081905550600191505061198e565b828560000160018303815481106119735761197261243f565b5b90600052602060002090600202016001018190555060009150505b9392505050565b60606119a0856117cc565b6119df576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119d690612fcc565b60405180910390fd5b6000808673ffffffffffffffffffffffffffffffffffffffff168587604051611a08919061301d565b60006040518083038185875af1925050503d8060008114611a45576040519150601f19603f3d011682016040523d82523d6000602084013e611a4a565b606091505b50915091508115611a5f578092505050611aaf565b600081511115611a725780518082602001fd5b836040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611aa691906128b6565b60405180910390fd5b949350505050565b600080836001016000848152602001908152602001600020541415905092915050565b600080836001016000848152602001908152602001600020541415905092915050565b828054611b0990613063565b90600052602060002090601f016020900481019282611b2b5760008555611b72565b82601f10611b4457803560ff1916838001178555611b72565b82800160010185558215611b72579182015b82811115611b71578235825591602001919060010190611b56565b5b509050611b7f9190611bc3565b5090565b508054611b8f90613063565b6000825580601f10611ba15750611bc0565b601f016020900490600052602060002090810190611bbf9190611bc3565b5b50565b5b80821115611bdc576000816000905550600101611bc4565b5090565b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b60008083601f840112611c0f57611c0e611bea565b5b8235905067ffffffffffffffff811115611c2c57611c2b611bef565b5b602083019150836001820283011115611c4857611c47611bf4565b5b9250929050565b60008060208385031215611c6657611c65611be0565b5b600083013567ffffffffffffffff811115611c8457611c83611be5565b5b611c9085828601611bf9565b92509250509250929050565b6000819050919050565b611caf81611c9c565b8114611cba57600080fd5b50565b600081359050611ccc81611ca6565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611cfd82611cd2565b9050919050565b611d0d81611cf2565b8114611d1857600080fd5b50565b600081359050611d2a81611d04565b92915050565b60008083601f840112611d4657611d45611bea565b5b8235905067ffffffffffffffff811115611d6357611d62611bef565b5b602083019150836020820283011115611d7f57611d7e611bf4565b5b9250929050565b60008060008060008060008060a0898b031215611da657611da5611be0565b5b6000611db48b828c01611cbd565b9850506020611dc58b828c01611d1b565b975050604089013567ffffffffffffffff811115611de657611de5611be5565b5b611df28b828c01611d30565b9650965050606089013567ffffffffffffffff811115611e1557611e14611be5565b5b611e218b828c01611d30565b9450945050608089013567ffffffffffffffff811115611e4457611e43611be5565b5b611e508b828c01611bf9565b92509250509295985092959890939650565b600080600080600060608688031215611e7e57611e7d611be0565b5b6000611e8c88828901611cbd565b955050602086013567ffffffffffffffff811115611ead57611eac611be5565b5b611eb988828901611d30565b9450945050604086013567ffffffffffffffff811115611edc57611edb611be5565b5b611ee888828901611d30565b92509250509295509295909350565b60008060008060008060808789031215611f1457611f13611be0565b5b6000611f2289828a01611cbd565b9650506020611f3389828a01611d1b565b955050604087013567ffffffffffffffff811115611f5457611f53611be5565b5b611f6089828a01611d30565b9450945050606087013567ffffffffffffffff811115611f8357611f82611be5565b5b611f8f89828a01611d30565b92509250509295509295509295565b60008083601f840112611fb457611fb3611bea565b5b8235905067ffffffffffffffff811115611fd157611fd0611bef565b5b602083019150836001820283011115611fed57611fec611bf4565b5b9250929050565b6000806020838503121561200b5761200a611be0565b5b600083013567ffffffffffffffff81111561202957612028611be5565b5b61203585828601611f9e565b92509250509250929050565b600082825260208201905092915050565b7f4e6f6465207479706520616c7265616479207365740000000000000000000000600082015250565b6000612088601583612041565b915061209382612052565b602082019050919050565b600060208201905081810360008301526120b78161207b565b9050919050565b600081905092915050565b82818337600083830152505050565b60006120e483856120be565b93506120f18385846120c9565b82840190509392505050565b600061210a8284866120d8565b91508190509392505050565b7f496e76616c696420706172656e74206e6f646500000000000000000000000000600082015250565b600061214c601383612041565b915061215782612116565b602082019050919050565b6000602082019050818103600083015261217b8161213f565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006121bc82611c9c565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036121ee576121ed612182565b5b600182019050919050565b6000819050919050565b61220c816121f9565b82525050565b61221b81611c9c565b82525050565b61222a81611cf2565b82525050565b600060a0820190506122456000830188612203565b6122526020830187612212565b61225f6040830186612221565b61226c6060830185612203565b6122796080830184612203565b9695505050505050565b7f496e76616c6964207369676e6174757265000000000000000000000000000000600082015250565b60006122b9601183612041565b91506122c482612283565b602082019050919050565b600060208201905081810360008301526122e8816122ac565b9050919050565b7f4e6f6465206d75737420626520612076656869636c6500000000000000000000600082015250565b6000612325601683612041565b9150612330826122ef565b602082019050919050565b6000602082019050818103600083015261235481612318565b9050919050565b600081905092915050565b6000612372838561235b565b935061237f8385846120c9565b82840190509392505050565b6000612398828486612366565b91508190509392505050565b7f53616d65206c656e677468000000000000000000000000000000000000000000600082015250565b60006123da600b83612041565b91506123e5826123a4565b602082019050919050565b60006020820190508181036000830152612409816123cd565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600080fd5b600080fd5b600080fd5b6000808335600160200384360303811261249a5761249961246e565b5b80840192508235915067ffffffffffffffff8211156124bc576124bb612473565b5b6020830192506001820236038313156124d8576124d7612478565b5b509250929050565b7f4e6f742077686974656c69737465640000000000000000000000000000000000600082015250565b6000612516600f83612041565b9150612521826124e0565b602082019050919050565b6000602082019050818103600083015261254581612509565b9050919050565b600081519050919050565b600081905092915050565b6000819050602082019050919050565b61257b816121f9565b82525050565b600061258d8383612572565b60208301905092915050565b6000602082019050919050565b60006125b18261254c565b6125bb8185612557565b93506125c683612562565b8060005b838110156125f75781516125de8882612581565b97506125e983612599565b9250506001810190506125ca565b5085935050505092915050565b600061261082846125a6565b915081905092915050565b7f45434453413a207a65726f207369676e61746f72792061646472657373000000600082015250565b6000612651601d83612041565b915061265c8261261b565b602082019050919050565b6000602082019050818103600083015261268081612644565b9050919050565b7f1901000000000000000000000000000000000000000000000000000000000000600082015250565b60006126bd60028361235b565b91506126c882612687565b600282019050919050565b6000819050919050565b6126ee6126e9826121f9565b6126d3565b82525050565b60006126ff826126b0565b915061270b82856126dd565b60208201915061271b82846126dd565b6020820191508190509392505050565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000600082015250565b600061276160178361235b565b915061276c8261272b565b601782019050919050565b600081519050919050565b60005b838110156127a0578082015181840152602081019050612785565b838111156127af576000848401525b50505050565b60006127c082612777565b6127ca818561235b565b93506127da818560208601612782565b80840191505092915050565b7f206973206d697373696e6720726f6c6520000000000000000000000000000000600082015250565b600061281c60118361235b565b9150612827826127e6565b601182019050919050565b600061283d82612754565b915061284982856127b5565b91506128548261280f565b915061286082846127b5565b91508190509392505050565b6000601f19601f8301169050919050565b600061288882612777565b6128928185612041565b93506128a2818560208601612782565b6128ab8161286c565b840191505092915050565b600060208201905081810360008301526128d0818461287d565b905092915050565b600060a0820190506128ed6000830188612203565b6128fa6020830187612203565b6129076040830186612203565b6129146060830185612212565b6129216080830184612221565b9695505050505050565b7f45434453413a20696e76616c6964207369676e6174757265206c656e67746800600082015250565b6000612961601f83612041565b915061296c8261292b565b602082019050919050565b6000602082019050818103600083015261299081612954565b9050919050565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b60006129f3603283612041565b91506129fe82612997565b604082019050919050565b60006020820190508181036000830152612a22816129e6565b9050919050565b6000612a3482611c9c565b9150612a3f83611c9c565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615612a7857612a77612182565b5b828202905092915050565b6000612a8e82611c9c565b9150612a9983611c9c565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115612ace57612acd612182565b5b828201905092915050565b7f55696e745574696c733a20686578206c656e67746820696e737566666963696560008201527f6e74000000000000000000000000000000000000000000000000000000000000602082015250565b6000612b35602283612041565b9150612b4082612ad9565b604082019050919050565b60006020820190508181036000830152612b6481612b28565b9050919050565b7f45434453413a20696e76616c6964207369676e6174757265202773272076616c60008201527f7565000000000000000000000000000000000000000000000000000000000000602082015250565b6000612bc7602283612041565b9150612bd282612b6b565b604082019050919050565b60006020820190508181036000830152612bf681612bba565b9050919050565b7f45434453413a20696e76616c6964207369676e6174757265202776272076616c60008201527f7565000000000000000000000000000000000000000000000000000000000000602082015250565b6000612c59602283612041565b9150612c6482612bfd565b604082019050919050565b60006020820190508181036000830152612c8881612c4c565b9050919050565b600060ff82169050919050565b612ca581612c8f565b82525050565b6000608082019050612cc06000830187612203565b612ccd6020830186612c9c565b612cda6040830185612203565b612ce76060830184612203565b95945050505050565b7f45434453413a20696e76616c6964207369676e61747572650000000000000000600082015250565b6000612d26601883612041565b9150612d3182612cf0565b602082019050919050565b60006020820190508181036000830152612d5581612d19565b9050919050565b7f4552433732313a206d696e7420746f20746865207a65726f2061646472657373600082015250565b6000612d92602083612041565b9150612d9d82612d5c565b602082019050919050565b60006020820190508181036000830152612dc181612d85565b9050919050565b7f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000600082015250565b6000612dfe601c83612041565b9150612e0982612dc8565b602082019050919050565b60006020820190508181036000830152612e2d81612df1565b9050919050565b600081519050919050565b600082825260208201905092915050565b6000612e5b82612e34565b612e658185612e3f565b9350612e75818560208601612782565b612e7e8161286c565b840191505092915050565b6000608082019050612e9e6000830187612221565b612eab6020830186612221565b612eb86040830185612212565b8181036060830152612eca8184612e50565b905095945050505050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b612f0a81612ed5565b8114612f1557600080fd5b50565b600081519050612f2781612f01565b92915050565b600060208284031215612f4357612f42611be0565b5b6000612f5184828501612f18565b91505092915050565b7f416464726573735574696c733a2066756e6374696f6e2063616c6c20746f206e60008201527f6f6e2d636f6e7472616374000000000000000000000000000000000000000000602082015250565b6000612fb6602b83612041565b9150612fc182612f5a565b604082019050919050565b60006020820190508181036000830152612fe581612fa9565b9050919050565b6000612ff782612e34565b61300181856120be565b9350613011818560208601612782565b80840191505092915050565b60006130298284612fec565b915081905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061307b57607f821691505b60208210810361308e5761308d613034565b5b5091905056fe4552433732313a207472616e7366657220746f206e6f6e20455243373231526563656976657220696d706c656d656e746572a2646970667358221220212852aa0cc5027c6e856573e22707ba2330420afc93fa8f7a5f4086ce55a42864736f6c634300080d0033";

export class Vehicle__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Vehicle> {
    return super.deploy(overrides || {}) as Promise<Vehicle>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Vehicle {
    return super.attach(address) as Vehicle;
  }
  connect(signer: Signer): Vehicle__factory {
    return super.connect(signer) as Vehicle__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VehicleInterface {
    return new utils.Interface(_abi) as VehicleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Vehicle {
    return new Contract(address, _abi, signerOrProvider) as Vehicle;
  }
}
