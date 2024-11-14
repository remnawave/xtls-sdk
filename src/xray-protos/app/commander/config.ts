// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.7
//   protoc               v5.28.3
// source: app/commander/config.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { TypedMessage } from "../../common/serial/typed_message";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "xray.app.commander";

/** Config is the settings for Commander. */
export interface Config {
  $type: "xray.app.commander.Config";
  /** Tag of the outbound handler that handles grpc connections. */
  tag: string;
  /** Network address of commander grpc service. */
  listen: string;
  /**
   * Services that supported by this server. All services must implement Service
   * interface.
   */
  service: TypedMessage[];
}

/** ReflectionConfig is the placeholder config for ReflectionService. */
export interface ReflectionConfig {
  $type: "xray.app.commander.ReflectionConfig";
}

function createBaseConfig(): Config {
  return { $type: "xray.app.commander.Config", tag: "", listen: "", service: [] };
}

export const Config: MessageFns<Config, "xray.app.commander.Config"> = {
  $type: "xray.app.commander.Config" as const,

  encode(message: Config, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.tag !== "") {
      writer.uint32(10).string(message.tag);
    }
    if (message.listen !== "") {
      writer.uint32(26).string(message.listen);
    }
    for (const v of message.service) {
      TypedMessage.encode(v!, writer.uint32(18).fork()).join();
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

          message.tag = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.listen = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.service.push(TypedMessage.decode(reader, reader.uint32()));
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
      tag: isSet(object.tag) ? globalThis.String(object.tag) : "",
      listen: isSet(object.listen) ? globalThis.String(object.listen) : "",
      service: globalThis.Array.isArray(object?.service)
        ? object.service.map((e: any) => TypedMessage.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Config): unknown {
    const obj: any = {};
    if (message.tag !== "") {
      obj.tag = message.tag;
    }
    if (message.listen !== "") {
      obj.listen = message.listen;
    }
    if (message.service?.length) {
      obj.service = message.service.map((e) => TypedMessage.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<Config>): Config {
    return Config.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Config>): Config {
    const message = createBaseConfig();
    message.tag = object.tag ?? "";
    message.listen = object.listen ?? "";
    message.service = object.service?.map((e) => TypedMessage.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(Config.$type, Config);

function createBaseReflectionConfig(): ReflectionConfig {
  return { $type: "xray.app.commander.ReflectionConfig" };
}

export const ReflectionConfig: MessageFns<ReflectionConfig, "xray.app.commander.ReflectionConfig"> = {
  $type: "xray.app.commander.ReflectionConfig" as const,

  encode(_: ReflectionConfig, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): ReflectionConfig {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReflectionConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): ReflectionConfig {
    return { $type: ReflectionConfig.$type };
  },

  toJSON(_: ReflectionConfig): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<ReflectionConfig>): ReflectionConfig {
    return ReflectionConfig.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<ReflectionConfig>): ReflectionConfig {
    const message = createBaseReflectionConfig();
    return message;
  },
};

messageTypeRegistry.set(ReflectionConfig.$type, ReflectionConfig);

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
