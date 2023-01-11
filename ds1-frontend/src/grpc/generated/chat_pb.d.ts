// package: proto.chat
// file: src/grpc/protos/chat.proto

import * as jspb from "google-protobuf";

export class ChatMessage extends jspb.Message {
  getFrom(): string;
  setFrom(value: string): void;

  getMsg(): string;
  setMsg(value: string): void;

  getTo(): string;
  setTo(value: string): void;

  getTyping(): boolean;
  setTyping(value: boolean): void;

  getRead(): boolean;
  setRead(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChatMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ChatMessage): ChatMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChatMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChatMessage;
  static deserializeBinaryFromReader(message: ChatMessage, reader: jspb.BinaryReader): ChatMessage;
}

export namespace ChatMessage {
  export type AsObject = {
    from: string,
    msg: string,
    to: string,
    typing: boolean,
    read: boolean,
  }
}

export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

export class UserInChat extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserInChat.AsObject;
  static toObject(includeInstance: boolean, msg: UserInChat): UserInChat.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserInChat, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserInChat;
  static deserializeBinaryFromReader(message: UserInChat, reader: jspb.BinaryReader): UserInChat;
}

export namespace UserInChat {
  export type AsObject = {
    username: string,
  }
}

export class ReadMessage extends jspb.Message {
  getFrom(): string;
  setFrom(value: string): void;

  getTo(): string;
  setTo(value: string): void;

  getRead(): boolean;
  setRead(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReadMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ReadMessage): ReadMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ReadMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReadMessage;
  static deserializeBinaryFromReader(message: ReadMessage, reader: jspb.BinaryReader): ReadMessage;
}

export namespace ReadMessage {
  export type AsObject = {
    from: string,
    to: string,
    read: boolean,
  }
}

