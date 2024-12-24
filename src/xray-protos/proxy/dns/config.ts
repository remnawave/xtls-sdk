// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.7
//   protoc               v5.28.3
// source: proxy/dns/config.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { Endpoint } from "../../common/net/destination";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "xray.proxy.dns";

export interface Config {
  $type: "xray.proxy.dns.Config";
  /**
   * Server is the DNS server address. If specified, this address overrides the
   * original one.
   */
  server: Endpoint | undefined;
  userLevel: number;
  nonIPQuery: string;
}

function createBaseConfig(): Config {
  return { $type: "xray.proxy.dns.Config", server: undefined, userLevel: 0, nonIPQuery: "" };
}

export const Config: MessageFns<Config, "xray.proxy.dns.Config"> = {
  $type: "xray.proxy.dns.Config" as const,

  encode(message: Config, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.server !== undefined) {
      Endpoint.encode(message.server, writer.uint32(10).fork()).join();
    }
    if (message.userLevel !== 0) {
      writer.uint32(16).uint32(message.userLevel);
    }
    if (message.nonIPQuery !== "") {
      writer.uint32(26).string(message.nonIPQuery);
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

          message.server = Endpoint.decode(reader, reader.uint32());
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }

          message.userLevel = reader.uint32();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.nonIPQuery = reader.string();
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
      server: isSet(object.server) ? Endpoint.fromJSON(object.server) : undefined,
      userLevel: isSet(object.userLevel) ? globalThis.Number(object.userLevel) : 0,
      nonIPQuery: isSet(object.nonIPQuery) ? globalThis.String(object.nonIPQuery) : "",
    };
  },

  toJSON(message: Config): unknown {
    const obj: any = {};
    if (message.server !== undefined) {
      obj.server = Endpoint.toJSON(message.server);
    }
    if (message.userLevel !== 0) {
      obj.userLevel = Math.round(message.userLevel);
    }
    if (message.nonIPQuery !== "") {
      obj.nonIPQuery = message.nonIPQuery;
    }
    return obj;
  },

  create(base?: DeepPartial<Config>): Config {
    return Config.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Config>): Config {
    const message = createBaseConfig();
    message.server = (object.server !== undefined && object.server !== null)
      ? Endpoint.fromPartial(object.server)
      : undefined;
    message.userLevel = object.userLevel ?? 0;
    message.nonIPQuery = object.nonIPQuery ?? "";
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
