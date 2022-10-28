/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export declare namespace TaskContract {
  export type TaskStruct = {
    id: PromiseOrValue<BigNumberish>;
    username: PromiseOrValue<string>;
    taskText: PromiseOrValue<string>;
    isDeleted: PromiseOrValue<boolean>;
  };

  export type TaskStructOutput = [BigNumber, string, string, boolean] & {
    id: BigNumber;
    username: string;
    taskText: string;
    isDeleted: boolean;
  };
}

export interface TaskContractInterface extends utils.Interface {
  functions: {
    "addTask(string,bool)": FunctionFragment;
    "deleteTask(uint256,bool)": FunctionFragment;
    "getMyTasks()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "addTask" | "deleteTask" | "getMyTasks"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addTask",
    values: [PromiseOrValue<string>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "deleteTask",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "getMyTasks",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "addTask", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deleteTask", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getMyTasks", data: BytesLike): Result;

  events: {
    "AddTask(address,uint256)": EventFragment;
    "DeleteTask(uint256,bool)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AddTask"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DeleteTask"): EventFragment;
}

export interface AddTaskEventObject {
  recipient: string;
  taskId: BigNumber;
}
export type AddTaskEvent = TypedEvent<[string, BigNumber], AddTaskEventObject>;

export type AddTaskEventFilter = TypedEventFilter<AddTaskEvent>;

export interface DeleteTaskEventObject {
  taskId: BigNumber;
  isDeleted: boolean;
}
export type DeleteTaskEvent = TypedEvent<
  [BigNumber, boolean],
  DeleteTaskEventObject
>;

export type DeleteTaskEventFilter = TypedEventFilter<DeleteTaskEvent>;

export interface TaskContract extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TaskContractInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addTask(
      taskText: PromiseOrValue<string>,
      isDeleted: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    deleteTask(
      taskId: PromiseOrValue<BigNumberish>,
      isDeleted: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getMyTasks(
      overrides?: CallOverrides
    ): Promise<[TaskContract.TaskStructOutput[]]>;
  };

  addTask(
    taskText: PromiseOrValue<string>,
    isDeleted: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  deleteTask(
    taskId: PromiseOrValue<BigNumberish>,
    isDeleted: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getMyTasks(
    overrides?: CallOverrides
  ): Promise<TaskContract.TaskStructOutput[]>;

  callStatic: {
    addTask(
      taskText: PromiseOrValue<string>,
      isDeleted: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    deleteTask(
      taskId: PromiseOrValue<BigNumberish>,
      isDeleted: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    getMyTasks(
      overrides?: CallOverrides
    ): Promise<TaskContract.TaskStructOutput[]>;
  };

  filters: {
    "AddTask(address,uint256)"(
      recipient?: null,
      taskId?: null
    ): AddTaskEventFilter;
    AddTask(recipient?: null, taskId?: null): AddTaskEventFilter;

    "DeleteTask(uint256,bool)"(
      taskId?: null,
      isDeleted?: null
    ): DeleteTaskEventFilter;
    DeleteTask(taskId?: null, isDeleted?: null): DeleteTaskEventFilter;
  };

  estimateGas: {
    addTask(
      taskText: PromiseOrValue<string>,
      isDeleted: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    deleteTask(
      taskId: PromiseOrValue<BigNumberish>,
      isDeleted: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getMyTasks(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    addTask(
      taskText: PromiseOrValue<string>,
      isDeleted: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    deleteTask(
      taskId: PromiseOrValue<BigNumberish>,
      isDeleted: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getMyTasks(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}