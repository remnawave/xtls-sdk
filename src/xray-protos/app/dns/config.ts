// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.7
//   protoc               v5.28.3
// source: app/dns/config.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { Endpoint } from "../../common/net/destination";
import { messageTypeRegistry } from "../../typeRegistry";
import { GeoIP } from "../router/config";

export const protobufPackage = "xray.app.dns";

export enum DomainMatchingType {
  Full = 0,
  Subdomain = 1,
  Keyword = 2,
  Regex = 3,
  UNRECOGNIZED = -1,
}

export function domainMatchingTypeFromJSON(object: any): DomainMatchingType {
  switch (object) {
    case 0:
    case "Full":
      return DomainMatchingType.Full;
    case 1:
    case "Subdomain":
      return DomainMatchingType.Subdomain;
    case 2:
    case "Keyword":
      return DomainMatchingType.Keyword;
    case 3:
    case "Regex":
      return DomainMatchingType.Regex;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DomainMatchingType.UNRECOGNIZED;
  }
}

export function domainMatchingTypeToJSON(object: DomainMatchingType): string {
  switch (object) {
    case DomainMatchingType.Full:
      return "Full";
    case DomainMatchingType.Subdomain:
      return "Subdomain";
    case DomainMatchingType.Keyword:
      return "Keyword";
    case DomainMatchingType.Regex:
      return "Regex";
    case DomainMatchingType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum QueryStrategy {
  USE_IP = 0,
  USE_IP4 = 1,
  USE_IP6 = 2,
  UNRECOGNIZED = -1,
}

export function queryStrategyFromJSON(object: any): QueryStrategy {
  switch (object) {
    case 0:
    case "USE_IP":
      return QueryStrategy.USE_IP;
    case 1:
    case "USE_IP4":
      return QueryStrategy.USE_IP4;
    case 2:
    case "USE_IP6":
      return QueryStrategy.USE_IP6;
    case -1:
    case "UNRECOGNIZED":
    default:
      return QueryStrategy.UNRECOGNIZED;
  }
}

export function queryStrategyToJSON(object: QueryStrategy): string {
  switch (object) {
    case QueryStrategy.USE_IP:
      return "USE_IP";
    case QueryStrategy.USE_IP4:
      return "USE_IP4";
    case QueryStrategy.USE_IP6:
      return "USE_IP6";
    case QueryStrategy.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface NameServer {
  $type: "xray.app.dns.NameServer";
  address: Endpoint | undefined;
  clientIp: Uint8Array;
  skipFallback: boolean;
  prioritizedDomain: NameServer_PriorityDomain[];
  geoip: GeoIP[];
  originalRules: NameServer_OriginalRule[];
  queryStrategy: QueryStrategy;
}

export interface NameServer_PriorityDomain {
  $type: "xray.app.dns.NameServer.PriorityDomain";
  type: DomainMatchingType;
  domain: string;
}

export interface NameServer_OriginalRule {
  $type: "xray.app.dns.NameServer.OriginalRule";
  rule: string;
  size: number;
}

export interface Config {
  $type: "xray.app.dns.Config";
  /**
   * NameServer list used by this DNS client.
   * A special value 'localhost' as a domain address can be set to use DNS on local system.
   */
  nameServer: NameServer[];
  /**
   * Client IP for EDNS client subnet. Must be 4 bytes (IPv4) or 16 bytes
   * (IPv6).
   */
  clientIp: Uint8Array;
  staticHosts: Config_HostMapping[];
  /** Tag is the inbound tag of DNS client. */
  tag: string;
  /** DisableCache disables DNS cache */
  disableCache: boolean;
  queryStrategy: QueryStrategy;
  disableFallback: boolean;
  disableFallbackIfMatch: boolean;
}

export interface Config_HostMapping {
  $type: "xray.app.dns.Config.HostMapping";
  type: DomainMatchingType;
  domain: string;
  ip: Uint8Array[];
  /**
   * ProxiedDomain indicates the mapped domain has the same IP address on this
   * domain. Xray will use this domain for IP queries.
   */
  proxiedDomain: string;
}

function createBaseNameServer(): NameServer {
  return {
    $type: "xray.app.dns.NameServer",
    address: undefined,
    clientIp: new Uint8Array(0),
    skipFallback: false,
    prioritizedDomain: [],
    geoip: [],
    originalRules: [],
    queryStrategy: 0,
  };
}

export const NameServer: MessageFns<NameServer, "xray.app.dns.NameServer"> = {
  $type: "xray.app.dns.NameServer" as const,

  encode(message: NameServer, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.address !== undefined) {
      Endpoint.encode(message.address, writer.uint32(10).fork()).join();
    }
    if (message.clientIp.length !== 0) {
      writer.uint32(42).bytes(message.clientIp);
    }
    if (message.skipFallback !== false) {
      writer.uint32(48).bool(message.skipFallback);
    }
    for (const v of message.prioritizedDomain) {
      NameServer_PriorityDomain.encode(v!, writer.uint32(18).fork()).join();
    }
    for (const v of message.geoip) {
      GeoIP.encode(v!, writer.uint32(26).fork()).join();
    }
    for (const v of message.originalRules) {
      NameServer_OriginalRule.encode(v!, writer.uint32(34).fork()).join();
    }
    if (message.queryStrategy !== 0) {
      writer.uint32(56).int32(message.queryStrategy);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): NameServer {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNameServer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.address = Endpoint.decode(reader, reader.uint32());
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }

          message.clientIp = reader.bytes();
          continue;
        }
        case 6: {
          if (tag !== 48) {
            break;
          }

          message.skipFallback = reader.bool();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.prioritizedDomain.push(NameServer_PriorityDomain.decode(reader, reader.uint32()));
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.geoip.push(GeoIP.decode(reader, reader.uint32()));
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.originalRules.push(NameServer_OriginalRule.decode(reader, reader.uint32()));
          continue;
        }
        case 7: {
          if (tag !== 56) {
            break;
          }

          message.queryStrategy = reader.int32() as any;
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

  fromJSON(object: any): NameServer {
    return {
      $type: NameServer.$type,
      address: isSet(object.address) ? Endpoint.fromJSON(object.address) : undefined,
      clientIp: isSet(object.clientIp) ? bytesFromBase64(object.clientIp) : new Uint8Array(0),
      skipFallback: isSet(object.skipFallback) ? globalThis.Boolean(object.skipFallback) : false,
      prioritizedDomain: globalThis.Array.isArray(object?.prioritizedDomain)
        ? object.prioritizedDomain.map((e: any) => NameServer_PriorityDomain.fromJSON(e))
        : [],
      geoip: globalThis.Array.isArray(object?.geoip) ? object.geoip.map((e: any) => GeoIP.fromJSON(e)) : [],
      originalRules: globalThis.Array.isArray(object?.originalRules)
        ? object.originalRules.map((e: any) => NameServer_OriginalRule.fromJSON(e))
        : [],
      queryStrategy: isSet(object.queryStrategy) ? queryStrategyFromJSON(object.queryStrategy) : 0,
    };
  },

  toJSON(message: NameServer): unknown {
    const obj: any = {};
    if (message.address !== undefined) {
      obj.address = Endpoint.toJSON(message.address);
    }
    if (message.clientIp.length !== 0) {
      obj.clientIp = base64FromBytes(message.clientIp);
    }
    if (message.skipFallback !== false) {
      obj.skipFallback = message.skipFallback;
    }
    if (message.prioritizedDomain?.length) {
      obj.prioritizedDomain = message.prioritizedDomain.map((e) => NameServer_PriorityDomain.toJSON(e));
    }
    if (message.geoip?.length) {
      obj.geoip = message.geoip.map((e) => GeoIP.toJSON(e));
    }
    if (message.originalRules?.length) {
      obj.originalRules = message.originalRules.map((e) => NameServer_OriginalRule.toJSON(e));
    }
    if (message.queryStrategy !== 0) {
      obj.queryStrategy = queryStrategyToJSON(message.queryStrategy);
    }
    return obj;
  },

  create(base?: DeepPartial<NameServer>): NameServer {
    return NameServer.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<NameServer>): NameServer {
    const message = createBaseNameServer();
    message.address = (object.address !== undefined && object.address !== null)
      ? Endpoint.fromPartial(object.address)
      : undefined;
    message.clientIp = object.clientIp ?? new Uint8Array(0);
    message.skipFallback = object.skipFallback ?? false;
    message.prioritizedDomain = object.prioritizedDomain?.map((e) => NameServer_PriorityDomain.fromPartial(e)) || [];
    message.geoip = object.geoip?.map((e) => GeoIP.fromPartial(e)) || [];
    message.originalRules = object.originalRules?.map((e) => NameServer_OriginalRule.fromPartial(e)) || [];
    message.queryStrategy = object.queryStrategy ?? 0;
    return message;
  },
};

messageTypeRegistry.set(NameServer.$type, NameServer);

function createBaseNameServer_PriorityDomain(): NameServer_PriorityDomain {
  return { $type: "xray.app.dns.NameServer.PriorityDomain", type: 0, domain: "" };
}

export const NameServer_PriorityDomain: MessageFns<
  NameServer_PriorityDomain,
  "xray.app.dns.NameServer.PriorityDomain"
> = {
  $type: "xray.app.dns.NameServer.PriorityDomain" as const,

  encode(message: NameServer_PriorityDomain, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.domain !== "") {
      writer.uint32(18).string(message.domain);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): NameServer_PriorityDomain {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNameServer_PriorityDomain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.domain = reader.string();
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

  fromJSON(object: any): NameServer_PriorityDomain {
    return {
      $type: NameServer_PriorityDomain.$type,
      type: isSet(object.type) ? domainMatchingTypeFromJSON(object.type) : 0,
      domain: isSet(object.domain) ? globalThis.String(object.domain) : "",
    };
  },

  toJSON(message: NameServer_PriorityDomain): unknown {
    const obj: any = {};
    if (message.type !== 0) {
      obj.type = domainMatchingTypeToJSON(message.type);
    }
    if (message.domain !== "") {
      obj.domain = message.domain;
    }
    return obj;
  },

  create(base?: DeepPartial<NameServer_PriorityDomain>): NameServer_PriorityDomain {
    return NameServer_PriorityDomain.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<NameServer_PriorityDomain>): NameServer_PriorityDomain {
    const message = createBaseNameServer_PriorityDomain();
    message.type = object.type ?? 0;
    message.domain = object.domain ?? "";
    return message;
  },
};

messageTypeRegistry.set(NameServer_PriorityDomain.$type, NameServer_PriorityDomain);

function createBaseNameServer_OriginalRule(): NameServer_OriginalRule {
  return { $type: "xray.app.dns.NameServer.OriginalRule", rule: "", size: 0 };
}

export const NameServer_OriginalRule: MessageFns<NameServer_OriginalRule, "xray.app.dns.NameServer.OriginalRule"> = {
  $type: "xray.app.dns.NameServer.OriginalRule" as const,

  encode(message: NameServer_OriginalRule, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.rule !== "") {
      writer.uint32(10).string(message.rule);
    }
    if (message.size !== 0) {
      writer.uint32(16).uint32(message.size);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): NameServer_OriginalRule {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNameServer_OriginalRule();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.rule = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }

          message.size = reader.uint32();
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

  fromJSON(object: any): NameServer_OriginalRule {
    return {
      $type: NameServer_OriginalRule.$type,
      rule: isSet(object.rule) ? globalThis.String(object.rule) : "",
      size: isSet(object.size) ? globalThis.Number(object.size) : 0,
    };
  },

  toJSON(message: NameServer_OriginalRule): unknown {
    const obj: any = {};
    if (message.rule !== "") {
      obj.rule = message.rule;
    }
    if (message.size !== 0) {
      obj.size = Math.round(message.size);
    }
    return obj;
  },

  create(base?: DeepPartial<NameServer_OriginalRule>): NameServer_OriginalRule {
    return NameServer_OriginalRule.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<NameServer_OriginalRule>): NameServer_OriginalRule {
    const message = createBaseNameServer_OriginalRule();
    message.rule = object.rule ?? "";
    message.size = object.size ?? 0;
    return message;
  },
};

messageTypeRegistry.set(NameServer_OriginalRule.$type, NameServer_OriginalRule);

function createBaseConfig(): Config {
  return {
    $type: "xray.app.dns.Config",
    nameServer: [],
    clientIp: new Uint8Array(0),
    staticHosts: [],
    tag: "",
    disableCache: false,
    queryStrategy: 0,
    disableFallback: false,
    disableFallbackIfMatch: false,
  };
}

export const Config: MessageFns<Config, "xray.app.dns.Config"> = {
  $type: "xray.app.dns.Config" as const,

  encode(message: Config, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    for (const v of message.nameServer) {
      NameServer.encode(v!, writer.uint32(42).fork()).join();
    }
    if (message.clientIp.length !== 0) {
      writer.uint32(26).bytes(message.clientIp);
    }
    for (const v of message.staticHosts) {
      Config_HostMapping.encode(v!, writer.uint32(34).fork()).join();
    }
    if (message.tag !== "") {
      writer.uint32(50).string(message.tag);
    }
    if (message.disableCache !== false) {
      writer.uint32(64).bool(message.disableCache);
    }
    if (message.queryStrategy !== 0) {
      writer.uint32(72).int32(message.queryStrategy);
    }
    if (message.disableFallback !== false) {
      writer.uint32(80).bool(message.disableFallback);
    }
    if (message.disableFallbackIfMatch !== false) {
      writer.uint32(88).bool(message.disableFallbackIfMatch);
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
        case 5: {
          if (tag !== 42) {
            break;
          }

          message.nameServer.push(NameServer.decode(reader, reader.uint32()));
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.clientIp = reader.bytes();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.staticHosts.push(Config_HostMapping.decode(reader, reader.uint32()));
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }

          message.tag = reader.string();
          continue;
        }
        case 8: {
          if (tag !== 64) {
            break;
          }

          message.disableCache = reader.bool();
          continue;
        }
        case 9: {
          if (tag !== 72) {
            break;
          }

          message.queryStrategy = reader.int32() as any;
          continue;
        }
        case 10: {
          if (tag !== 80) {
            break;
          }

          message.disableFallback = reader.bool();
          continue;
        }
        case 11: {
          if (tag !== 88) {
            break;
          }

          message.disableFallbackIfMatch = reader.bool();
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
      nameServer: globalThis.Array.isArray(object?.nameServer)
        ? object.nameServer.map((e: any) => NameServer.fromJSON(e))
        : [],
      clientIp: isSet(object.clientIp) ? bytesFromBase64(object.clientIp) : new Uint8Array(0),
      staticHosts: globalThis.Array.isArray(object?.staticHosts)
        ? object.staticHosts.map((e: any) => Config_HostMapping.fromJSON(e))
        : [],
      tag: isSet(object.tag) ? globalThis.String(object.tag) : "",
      disableCache: isSet(object.disableCache) ? globalThis.Boolean(object.disableCache) : false,
      queryStrategy: isSet(object.queryStrategy) ? queryStrategyFromJSON(object.queryStrategy) : 0,
      disableFallback: isSet(object.disableFallback) ? globalThis.Boolean(object.disableFallback) : false,
      disableFallbackIfMatch: isSet(object.disableFallbackIfMatch)
        ? globalThis.Boolean(object.disableFallbackIfMatch)
        : false,
    };
  },

  toJSON(message: Config): unknown {
    const obj: any = {};
    if (message.nameServer?.length) {
      obj.nameServer = message.nameServer.map((e) => NameServer.toJSON(e));
    }
    if (message.clientIp.length !== 0) {
      obj.clientIp = base64FromBytes(message.clientIp);
    }
    if (message.staticHosts?.length) {
      obj.staticHosts = message.staticHosts.map((e) => Config_HostMapping.toJSON(e));
    }
    if (message.tag !== "") {
      obj.tag = message.tag;
    }
    if (message.disableCache !== false) {
      obj.disableCache = message.disableCache;
    }
    if (message.queryStrategy !== 0) {
      obj.queryStrategy = queryStrategyToJSON(message.queryStrategy);
    }
    if (message.disableFallback !== false) {
      obj.disableFallback = message.disableFallback;
    }
    if (message.disableFallbackIfMatch !== false) {
      obj.disableFallbackIfMatch = message.disableFallbackIfMatch;
    }
    return obj;
  },

  create(base?: DeepPartial<Config>): Config {
    return Config.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Config>): Config {
    const message = createBaseConfig();
    message.nameServer = object.nameServer?.map((e) => NameServer.fromPartial(e)) || [];
    message.clientIp = object.clientIp ?? new Uint8Array(0);
    message.staticHosts = object.staticHosts?.map((e) => Config_HostMapping.fromPartial(e)) || [];
    message.tag = object.tag ?? "";
    message.disableCache = object.disableCache ?? false;
    message.queryStrategy = object.queryStrategy ?? 0;
    message.disableFallback = object.disableFallback ?? false;
    message.disableFallbackIfMatch = object.disableFallbackIfMatch ?? false;
    return message;
  },
};

messageTypeRegistry.set(Config.$type, Config);

function createBaseConfig_HostMapping(): Config_HostMapping {
  return { $type: "xray.app.dns.Config.HostMapping", type: 0, domain: "", ip: [], proxiedDomain: "" };
}

export const Config_HostMapping: MessageFns<Config_HostMapping, "xray.app.dns.Config.HostMapping"> = {
  $type: "xray.app.dns.Config.HostMapping" as const,

  encode(message: Config_HostMapping, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.domain !== "") {
      writer.uint32(18).string(message.domain);
    }
    for (const v of message.ip) {
      writer.uint32(26).bytes(v!);
    }
    if (message.proxiedDomain !== "") {
      writer.uint32(34).string(message.proxiedDomain);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Config_HostMapping {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConfig_HostMapping();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.domain = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.ip.push(reader.bytes());
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.proxiedDomain = reader.string();
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

  fromJSON(object: any): Config_HostMapping {
    return {
      $type: Config_HostMapping.$type,
      type: isSet(object.type) ? domainMatchingTypeFromJSON(object.type) : 0,
      domain: isSet(object.domain) ? globalThis.String(object.domain) : "",
      ip: globalThis.Array.isArray(object?.ip) ? object.ip.map((e: any) => bytesFromBase64(e)) : [],
      proxiedDomain: isSet(object.proxiedDomain) ? globalThis.String(object.proxiedDomain) : "",
    };
  },

  toJSON(message: Config_HostMapping): unknown {
    const obj: any = {};
    if (message.type !== 0) {
      obj.type = domainMatchingTypeToJSON(message.type);
    }
    if (message.domain !== "") {
      obj.domain = message.domain;
    }
    if (message.ip?.length) {
      obj.ip = message.ip.map((e) => base64FromBytes(e));
    }
    if (message.proxiedDomain !== "") {
      obj.proxiedDomain = message.proxiedDomain;
    }
    return obj;
  },

  create(base?: DeepPartial<Config_HostMapping>): Config_HostMapping {
    return Config_HostMapping.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Config_HostMapping>): Config_HostMapping {
    const message = createBaseConfig_HostMapping();
    message.type = object.type ?? 0;
    message.domain = object.domain ?? "";
    message.ip = object.ip?.map((e) => e) || [];
    message.proxiedDomain = object.proxiedDomain ?? "";
    return message;
  },
};

messageTypeRegistry.set(Config_HostMapping.$type, Config_HostMapping);

function bytesFromBase64(b64: string): Uint8Array {
  if ((globalThis as any).Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if ((globalThis as any).Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

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
