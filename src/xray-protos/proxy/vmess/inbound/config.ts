// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.7
//   protoc               v5.28.3
// source: proxy/vmess/inbound/config.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { User } from "../../../common/protocol/user";
import { messageTypeRegistry } from "../../../typeRegistry";

export const protobufPackage = "xray.proxy.vmess.inbound";

export interface DetourConfig {
  $type: "xray.proxy.vmess.inbound.DetourConfig";
  to: string;
}

export interface DefaultConfig {
  $type: "xray.proxy.vmess.inbound.DefaultConfig";
  level: number;
}

export interface Config {
  $type: "xray.proxy.vmess.inbound.Config";
  user: User[];
  default:
    | DefaultConfig
    | undefined;
  /** 4 is for legacy setting */
  detour: DetourConfig | undefined;
}

function createBaseDetourConfig(): DetourConfig {
  return { $type: "xray.proxy.vmess.inbound.DetourConfig", to: "" };
}

export const DetourConfig: MessageFns<DetourConfig, "xray.proxy.vmess.inbound.DetourConfig"> = {
  $type: "xray.proxy.vmess.inbound.DetourConfig" as const,

  encode(message: DetourConfig, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.to !== "") {
      writer.uint32(10).string(message.to);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): DetourConfig {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDetourConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.to = reader.string();
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

  fromJSON(object: any): DetourConfig {
    return { $type: DetourConfig.$type, to: isSet(object.to) ? globalThis.String(object.to) : "" };
  },

  toJSON(message: DetourConfig): unknown {
    const obj: any = {};
    if (message.to !== "") {
      obj.to = message.to;
    }
    return obj;
  },

  create(base?: DeepPartial<DetourConfig>): DetourConfig {
    return DetourConfig.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<DetourConfig>): DetourConfig {
    const message = createBaseDetourConfig();
    message.to = object.to ?? "";
    return message;
  },
};

messageTypeRegistry.set(DetourConfig.$type, DetourConfig);

function createBaseDefaultConfig(): DefaultConfig {
  return { $type: "xray.proxy.vmess.inbound.DefaultConfig", level: 0 };
}

export const DefaultConfig: MessageFns<DefaultConfig, "xray.proxy.vmess.inbound.DefaultConfig"> = {
  $type: "xray.proxy.vmess.inbound.DefaultConfig" as const,

  encode(message: DefaultConfig, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.level !== 0) {
      writer.uint32(16).uint32(message.level);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): DefaultConfig {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDefaultConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2: {
          if (tag !== 16) {
            break;
          }

          message.level = reader.uint32();
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

  fromJSON(object: any): DefaultConfig {
    return { $type: DefaultConfig.$type, level: isSet(object.level) ? globalThis.Number(object.level) : 0 };
  },

  toJSON(message: DefaultConfig): unknown {
    const obj: any = {};
    if (message.level !== 0) {
      obj.level = Math.round(message.level);
    }
    return obj;
  },

  create(base?: DeepPartial<DefaultConfig>): DefaultConfig {
    return DefaultConfig.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<DefaultConfig>): DefaultConfig {
    const message = createBaseDefaultConfig();
    message.level = object.level ?? 0;
    return message;
  },
};

messageTypeRegistry.set(DefaultConfig.$type, DefaultConfig);

function createBaseConfig(): Config {
  return { $type: "xray.proxy.vmess.inbound.Config", user: [], default: undefined, detour: undefined };
}

export const Config: MessageFns<Config, "xray.proxy.vmess.inbound.Config"> = {
  $type: "xray.proxy.vmess.inbound.Config" as const,

  encode(message: Config, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    for (const v of message.user) {
      User.encode(v!, writer.uint32(10).fork()).join();
    }
    if (message.default !== undefined) {
      DefaultConfig.encode(message.default, writer.uint32(18).fork()).join();
    }
    if (message.detour !== undefined) {
      DetourConfig.encode(message.detour, writer.uint32(26).fork()).join();
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

          message.user.push(User.decode(reader, reader.uint32()));
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.default = DefaultConfig.decode(reader, reader.uint32());
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.detour = DetourConfig.decode(reader, reader.uint32());
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
      user: globalThis.Array.isArray(object?.user) ? object.user.map((e: any) => User.fromJSON(e)) : [],
      default: isSet(object.default) ? DefaultConfig.fromJSON(object.default) : undefined,
      detour: isSet(object.detour) ? DetourConfig.fromJSON(object.detour) : undefined,
    };
  },

  toJSON(message: Config): unknown {
    const obj: any = {};
    if (message.user?.length) {
      obj.user = message.user.map((e) => User.toJSON(e));
    }
    if (message.default !== undefined) {
      obj.default = DefaultConfig.toJSON(message.default);
    }
    if (message.detour !== undefined) {
      obj.detour = DetourConfig.toJSON(message.detour);
    }
    return obj;
  },

  create(base?: DeepPartial<Config>): Config {
    return Config.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Config>): Config {
    const message = createBaseConfig();
    message.user = object.user?.map((e) => User.fromPartial(e)) || [];
    message.default = (object.default !== undefined && object.default !== null)
      ? DefaultConfig.fromPartial(object.default)
      : undefined;
    message.detour = (object.detour !== undefined && object.detour !== null)
      ? DetourConfig.fromPartial(object.detour)
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
