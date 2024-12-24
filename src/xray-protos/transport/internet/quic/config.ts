// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.7
//   protoc               v5.28.3
// source: transport/internet/quic/config.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { SecurityConfig } from "../../../common/protocol/headers";
import { TypedMessage } from "../../../common/serial/typed_message";
import { messageTypeRegistry } from "../../../typeRegistry";

export const protobufPackage = "xray.transport.internet.quic";

export interface Config {
  $type: "xray.transport.internet.quic.Config";
  key: string;
  security: SecurityConfig | undefined;
  header: TypedMessage | undefined;
}

function createBaseConfig(): Config {
  return { $type: "xray.transport.internet.quic.Config", key: "", security: undefined, header: undefined };
}

export const Config: MessageFns<Config, "xray.transport.internet.quic.Config"> = {
  $type: "xray.transport.internet.quic.Config" as const,

  encode(message: Config, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.security !== undefined) {
      SecurityConfig.encode(message.security, writer.uint32(18).fork()).join();
    }
    if (message.header !== undefined) {
      TypedMessage.encode(message.header, writer.uint32(26).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Config {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.security = SecurityConfig.decode(reader, reader.uint32());
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.header = TypedMessage.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Config {
    return {
      $type: Config.$type,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      security: isSet(object.security) ? SecurityConfig.fromJSON(object.security) : undefined,
      header: isSet(object.header) ? TypedMessage.fromJSON(object.header) : undefined,
    };
  },

  toJSON(message: Config): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.security !== undefined) {
      obj.security = SecurityConfig.toJSON(message.security);
    }
    if (message.header !== undefined) {
      obj.header = TypedMessage.toJSON(message.header);
    }
    return obj;
  },

  create(base?: DeepPartial<Config>): Config {
    return Config.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Config>): Config {
    const message = createBaseConfig();
    message.key = object.key ?? "";
    message.security = (object.security !== undefined && object.security !== null)
      ? SecurityConfig.fromPartial(object.security)
      : undefined;
    message.header = (object.header !== undefined && object.header !== null)
      ? TypedMessage.fromPartial(object.header)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(Config.$type, Config);

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]> }
  : Partial<T>;

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T, V extends string> {
  readonly $type: V;
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create(base?: DeepPartial<T>): T;
  fromPartial(object: DeepPartial<T>): T;
}
