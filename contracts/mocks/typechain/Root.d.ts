/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface RootInterface extends ethers.utils.Interface {
  functions: {
    "addRootAttribute(string)": FunctionFragment;
    "isController(address)": FunctionFragment;
    "isRootMinted(address)": FunctionFragment;
    "mintRoot(address,string[],string[])": FunctionFragment;
    "mintRootBatch(address,string[])": FunctionFragment;
    "setController(address)": FunctionFragment;
    "setRootInfo(uint256,string[],string[])": FunctionFragment;
    "setRootNodeType(bytes)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addRootAttribute",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "isController",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "isRootMinted",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "mintRoot",
    values: [string, string[], string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "mintRootBatch",
    values: [string, string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setController",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setRootInfo",
    values: [BigNumberish, string[], string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setRootNodeType",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "addRootAttribute",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isController",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isRootMinted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mintRoot", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "mintRootBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setController",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRootInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRootNodeType",
    data: BytesLike
  ): Result;

  events: {
    "Approval(address,address,uint256)": EventFragment;
    "ApprovalForAll(address,address,bool)": EventFragment;
    "AttributeAdded(uint256,string)": EventFragment;
    "ControllerSet(address)": EventFragment;
    "NodeMinted(uint256,uint256)": EventFragment;
    "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
    "RoleGranted(bytes32,address,address)": EventFragment;
    "RoleRevoked(bytes32,address,address)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ApprovalForAll"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AttributeAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ControllerSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NodeMinted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export type ApprovalEvent = TypedEvent<
  [string, string, BigNumber] & {
    owner: string;
    operator: string;
    tokenId: BigNumber;
  }
>;

export type ApprovalForAllEvent = TypedEvent<
  [string, string, boolean] & {
    owner: string;
    operator: string;
    approved: boolean;
  }
>;

export type AttributeAddedEvent = TypedEvent<
  [BigNumber, string] & { nodeType: BigNumber; attribute: string }
>;

export type ControllerSetEvent = TypedEvent<[string] & { controller: string }>;

export type NodeMintedEvent = TypedEvent<
  [BigNumber, BigNumber] & { nodeType: BigNumber; nodeId: BigNumber }
>;

export type RoleAdminChangedEvent = TypedEvent<
  [string, string, string] & {
    role: string;
    previousAdminRole: string;
    newAdminRole: string;
  }
>;

export type RoleGrantedEvent = TypedEvent<
  [string, string, string] & { role: string; account: string; sender: string }
>;

export type RoleRevokedEvent = TypedEvent<
  [string, string, string] & { role: string; account: string; sender: string }
>;

export type TransferEvent = TypedEvent<
  [string, string, BigNumber] & { from: string; to: string; tokenId: BigNumber }
>;

export class Root extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: RootInterface;

  functions: {
    addRootAttribute(
      attribute: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isController(
      addr: string,
      overrides?: CallOverrides
    ): Promise<[boolean] & { _isController: boolean }>;

    isRootMinted(
      addr: string,
      overrides?: CallOverrides
    ): Promise<[boolean] & { _isRootMinted: boolean }>;

    mintRoot(
      _owner: string,
      attributes: string[],
      infos: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    mintRootBatch(
      _owner: string,
      names: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setController(
      _controller: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setRootInfo(
      nodeId: BigNumberish,
      attributes: string[],
      infos: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setRootNodeType(
      label: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addRootAttribute(
    attribute: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isController(addr: string, overrides?: CallOverrides): Promise<boolean>;

  isRootMinted(addr: string, overrides?: CallOverrides): Promise<boolean>;

  mintRoot(
    _owner: string,
    attributes: string[],
    infos: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  mintRootBatch(
    _owner: string,
    names: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setController(
    _controller: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setRootInfo(
    nodeId: BigNumberish,
    attributes: string[],
    infos: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setRootNodeType(
    label: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addRootAttribute(
      attribute: string,
      overrides?: CallOverrides
    ): Promise<void>;

    isController(addr: string, overrides?: CallOverrides): Promise<boolean>;

    isRootMinted(addr: string, overrides?: CallOverrides): Promise<boolean>;

    mintRoot(
      _owner: string,
      attributes: string[],
      infos: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    mintRootBatch(
      _owner: string,
      names: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    setController(
      _controller: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setRootInfo(
      nodeId: BigNumberish,
      attributes: string[],
      infos: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    setRootNodeType(label: BytesLike, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "Approval(address,address,uint256)"(
      owner?: string | null,
      operator?: string | null,
      tokenId?: BigNumberish | null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { owner: string; operator: string; tokenId: BigNumber }
    >;

    Approval(
      owner?: string | null,
      operator?: string | null,
      tokenId?: BigNumberish | null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { owner: string; operator: string; tokenId: BigNumber }
    >;

    "ApprovalForAll(address,address,bool)"(
      owner?: string | null,
      operator?: string | null,
      approved?: null
    ): TypedEventFilter<
      [string, string, boolean],
      { owner: string; operator: string; approved: boolean }
    >;

    ApprovalForAll(
      owner?: string | null,
      operator?: string | null,
      approved?: null
    ): TypedEventFilter<
      [string, string, boolean],
      { owner: string; operator: string; approved: boolean }
    >;

    "AttributeAdded(uint256,string)"(
      nodeType?: BigNumberish | null,
      attribute?: string | null
    ): TypedEventFilter<
      [BigNumber, string],
      { nodeType: BigNumber; attribute: string }
    >;

    AttributeAdded(
      nodeType?: BigNumberish | null,
      attribute?: string | null
    ): TypedEventFilter<
      [BigNumber, string],
      { nodeType: BigNumber; attribute: string }
    >;

    "ControllerSet(address)"(
      controller?: string | null
    ): TypedEventFilter<[string], { controller: string }>;

    ControllerSet(
      controller?: string | null
    ): TypedEventFilter<[string], { controller: string }>;

    "NodeMinted(uint256,uint256)"(
      nodeType?: BigNumberish | null,
      nodeId?: BigNumberish | null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { nodeType: BigNumber; nodeId: BigNumber }
    >;

    NodeMinted(
      nodeType?: BigNumberish | null,
      nodeId?: BigNumberish | null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { nodeType: BigNumber; nodeId: BigNumber }
    >;

    "RoleAdminChanged(bytes32,bytes32,bytes32)"(
      role?: BytesLike | null,
      previousAdminRole?: BytesLike | null,
      newAdminRole?: BytesLike | null
    ): TypedEventFilter<
      [string, string, string],
      { role: string; previousAdminRole: string; newAdminRole: string }
    >;

    RoleAdminChanged(
      role?: BytesLike | null,
      previousAdminRole?: BytesLike | null,
      newAdminRole?: BytesLike | null
    ): TypedEventFilter<
      [string, string, string],
      { role: string; previousAdminRole: string; newAdminRole: string }
    >;

    "RoleGranted(bytes32,address,address)"(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): TypedEventFilter<
      [string, string, string],
      { role: string; account: string; sender: string }
    >;

    RoleGranted(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): TypedEventFilter<
      [string, string, string],
      { role: string; account: string; sender: string }
    >;

    "RoleRevoked(bytes32,address,address)"(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): TypedEventFilter<
      [string, string, string],
      { role: string; account: string; sender: string }
    >;

    RoleRevoked(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): TypedEventFilter<
      [string, string, string],
      { role: string; account: string; sender: string }
    >;

    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      tokenId?: BigNumberish | null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { from: string; to: string; tokenId: BigNumber }
    >;

    Transfer(
      from?: string | null,
      to?: string | null,
      tokenId?: BigNumberish | null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { from: string; to: string; tokenId: BigNumber }
    >;
  };

  estimateGas: {
    addRootAttribute(
      attribute: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isController(addr: string, overrides?: CallOverrides): Promise<BigNumber>;

    isRootMinted(addr: string, overrides?: CallOverrides): Promise<BigNumber>;

    mintRoot(
      _owner: string,
      attributes: string[],
      infos: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    mintRootBatch(
      _owner: string,
      names: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setController(
      _controller: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setRootInfo(
      nodeId: BigNumberish,
      attributes: string[],
      infos: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setRootNodeType(
      label: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addRootAttribute(
      attribute: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isController(
      addr: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isRootMinted(
      addr: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    mintRoot(
      _owner: string,
      attributes: string[],
      infos: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    mintRootBatch(
      _owner: string,
      names: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setController(
      _controller: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setRootInfo(
      nodeId: BigNumberish,
      attributes: string[],
      infos: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setRootNodeType(
      label: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}