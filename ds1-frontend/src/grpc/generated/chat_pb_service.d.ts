// package: proto.chat
// file: src/grpc/protos/chat.proto

import * as src_grpc_protos_chat_pb from "../../../src/grpc/generated/chat_pb";
import {grpc} from "@improbable-eng/grpc-web";

type ChatServicesendMsg = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof src_grpc_protos_chat_pb.ChatMessage;
  readonly responseType: typeof src_grpc_protos_chat_pb.Empty;
};

type ChatServicereceiveMsg = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof src_grpc_protos_chat_pb.UserInChat;
  readonly responseType: typeof src_grpc_protos_chat_pb.ChatMessage;
};

export class ChatService {
  static readonly serviceName: string;
  static readonly sendMsg: ChatServicesendMsg;
  static readonly receiveMsg: ChatServicereceiveMsg;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class ChatServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  sendMsg(
    requestMessage: src_grpc_protos_chat_pb.ChatMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: src_grpc_protos_chat_pb.Empty|null) => void
  ): UnaryResponse;
  sendMsg(
    requestMessage: src_grpc_protos_chat_pb.ChatMessage,
    callback: (error: ServiceError|null, responseMessage: src_grpc_protos_chat_pb.Empty|null) => void
  ): UnaryResponse;
  receiveMsg(requestMessage: src_grpc_protos_chat_pb.UserInChat, metadata?: grpc.Metadata): ResponseStream<src_grpc_protos_chat_pb.ChatMessage>;
}

