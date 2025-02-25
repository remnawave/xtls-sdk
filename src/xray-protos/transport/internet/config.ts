// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.7
//   protoc               v5.28.3
// source: transport/internet/config.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { IPOrDomain } from "../../common/net/address";
import { TypedMessage } from "../../common/serial/typed_message";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "xray.transport.internet";

export enum DomainStrategy {
  AS_IS = 0,
  USE_IP = 1,
  USE_IP4 = 2,
  USE_IP6 = 3,
  USE_IP46 = 4,
  USE_IP64 = 5,
  FORCE_IP = 6,
  FORCE_IP4 = 7,
  FORCE_IP6 = 8,
  FORCE_IP46 = 9,
  FORCE_IP64 = 10,
  UNRECOGNIZED = -1,
}

export function domainStrategyFromJSON(object: any): DomainStrategy {
  switch (object) {
    case 0:
    case "AS_IS":
      return DomainStrategy.AS_IS;
    case 1:
    case "USE_IP":
      return DomainStrategy.USE_IP;
    case 2:
    case "USE_IP4":
      return DomainStrategy.USE_IP4;
    case 3:
    case "USE_IP6":
      return DomainStrategy.USE_IP6;
    case 4:
    case "USE_IP46":
      return DomainStrategy.USE_IP46;
    case 5:
    case "USE_IP64":
      return DomainStrategy.USE_IP64;
    case 6:
    case "FORCE_IP":
      return DomainStrategy.FORCE_IP;
    case 7:
    case "FORCE_IP4":
      return DomainStrategy.FORCE_IP4;
    case 8:
    case "FORCE_IP6":
      return DomainStrategy.FORCE_IP6;
    case 9:
    case "FORCE_IP46":
      return DomainStrategy.FORCE_IP46;
    case 10:
    case "FORCE_IP64":
      return DomainStrategy.FORCE_IP64;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DomainStrategy.UNRECOGNIZED;
  }
}

export function domainStrategyToJSON(object: DomainStrategy): string {
  switch (object) {
    case DomainStrategy.AS_IS:
      return "AS_IS";
    case DomainStrategy.USE_IP:
      return "USE_IP";
    case DomainStrategy.USE_IP4:
      return "USE_IP4";
    case DomainStrategy.USE_IP6:
      return "USE_IP6";
    case DomainStrategy.USE_IP46:
      return "USE_IP46";
    case DomainStrategy.USE_IP64:
      return "USE_IP64";
    case DomainStrategy.FORCE_IP:
      return "FORCE_IP";
    case DomainStrategy.FORCE_IP4:
      return "FORCE_IP4";
    case DomainStrategy.FORCE_IP6:
      return "FORCE_IP6";
    case DomainStrategy.FORCE_IP46:
      return "FORCE_IP46";
    case DomainStrategy.FORCE_IP64:
      return "FORCE_IP64";
    case DomainStrategy.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface TransportConfig {
  $type: "xray.transport.internet.TransportConfig";
  /** Transport protocol name. */
  protocolName: string;
  /** Specific transport protocol settings. */
  settings: TypedMessage | undefined;
}

export interface StreamConfig {
  $type: "xray.transport.internet.StreamConfig";
  address: IPOrDomain | undefined;
  port: number;
  /** Effective network. */
  protocolName: string;
  transportSettings: TransportConfig[];
  /** Type of security. Must be a message name of the settings proto. */
  securityType: string;
  /** Transport security settings. They can be either TLS or REALITY. */
  securitySettings: TypedMessage[];
  socketSettings: SocketConfig | undefined;
}

export interface ProxyConfig {
  $type: "xray.transport.internet.ProxyConfig";
  tag: string;
  transportLayerProxy: boolean;
}

export interface CustomSockopt {
  $type: "xray.transport.internet.CustomSockopt";
  level: string;
  opt: string;
  value: string;
  type: string;
}

/** SocketConfig is options to be applied on network sockets. */
export interface SocketConfig {
  $type: "xray.transport.internet.SocketConfig";
  /** Mark of the connection. If non-zero, the value will be set to SO_MARK. */
  mark: number;
  /** TFO is the state of TFO settings. */
  tfo: number;
  /** TProxy is for enabling TProxy socket option. */
  tproxy: SocketConfig_TProxyMode;
  /**
   * ReceiveOriginalDestAddress is for enabling IP_RECVORIGDSTADDR socket
   * option. This option is for UDP only.
   */
  receiveOriginalDestAddress: boolean;
  bindAddress: Uint8Array;
  bindPort: number;
  acceptProxyProtocol: boolean;
  domainStrategy: DomainStrategy;
  dialerProxy: string;
  tcpKeepAliveInterval: number;
  tcpKeepAliveIdle: number;
  tcpCongestion: string;
  interface: string;
  v6only: boolean;
  tcpWindowClamp: number;
  tcpUserTimeout: number;
  tcpMaxSeg: number;
  penetrate: boolean;
  tcpMptcp: boolean;
  customSockopt: CustomSockopt[];
}

export enum SocketConfig_TProxyMode {
  /** Off - TProxy is off. */
  Off = 0,
  /** TProxy - TProxy mode. */
  TProxy = 1,
  /** Redirect - Redirect mode. */
  Redirect = 2,
  UNRECOGNIZED = -1,
}

export function socketConfig_TProxyModeFromJSON(object: any): SocketConfig_TProxyMode {
  switch (object) {
    case 0:
    case "Off":
      return SocketConfig_TProxyMode.Off;
    case 1:
    case "TProxy":
      return SocketConfig_TProxyMode.TProxy;
    case 2:
    case "Redirect":
      return SocketConfig_TProxyMode.Redirect;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SocketConfig_TProxyMode.UNRECOGNIZED;
  }
}

export function socketConfig_TProxyModeToJSON(object: SocketConfig_TProxyMode): string {
  switch (object) {
    case SocketConfig_TProxyMode.Off:
      return "Off";
    case SocketConfig_TProxyMode.TProxy:
      return "TProxy";
    case SocketConfig_TProxyMode.Redirect:
      return "Redirect";
    case SocketConfig_TProxyMode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseTransportConfig(): TransportConfig {
  return { $type: "xray.transport.internet.TransportConfig", protocolName: "", settings: undefined };
}

export const TransportConfig: MessageFns<TransportConfig, "xray.transport.internet.TransportConfig"> = {
  $type: "xray.transport.internet.TransportConfig" as const,

  encode(message: TransportConfig, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.protocolName !== "") {
      writer.uint32(26).string(message.protocolName);
    }
    if (message.settings !== undefined) {
      TypedMessage.encode(message.settings, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): TransportConfig {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransportConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.protocolName = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.settings = TypedMessage.decode(reader, reader.uint32());
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

  fromJSON(object: any): TransportConfig {
    return {
      $type: TransportConfig.$type,
      protocolName: isSet(object.protocolName) ? globalThis.String(object.protocolName) : "",
      settings: isSet(object.settings) ? TypedMessage.fromJSON(object.settings) : undefined,
    };
  },

  toJSON(message: TransportConfig): unknown {
    const obj: any = {};
    if (message.protocolName !== "") {
      obj.protocolName = message.protocolName;
    }
    if (message.settings !== undefined) {
      obj.settings = TypedMessage.toJSON(message.settings);
    }
    return obj;
  },

  create(base?: DeepPartial<TransportConfig>): TransportConfig {
    return TransportConfig.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<TransportConfig>): TransportConfig {
    const message = createBaseTransportConfig();
    message.protocolName = object.protocolName ?? "";
    message.settings = (object.settings !== undefined && object.settings !== null)
      ? TypedMessage.fromPartial(object.settings)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(TransportConfig.$type, TransportConfig);

function createBaseStreamConfig(): StreamConfig {
  return {
    $type: "xray.transport.internet.StreamConfig",
    address: undefined,
    port: 0,
    protocolName: "",
    transportSettings: [],
    securityType: "",
    securitySettings: [],
    socketSettings: undefined,
  };
}

export const StreamConfig: MessageFns<StreamConfig, "xray.transport.internet.StreamConfig"> = {
  $type: "xray.transport.internet.StreamConfig" as const,

  encode(message: StreamConfig, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.address !== undefined) {
      IPOrDomain.encode(message.address, writer.uint32(66).fork()).join();
    }
    if (message.port !== 0) {
      writer.uint32(72).uint32(message.port);
    }
    if (message.protocolName !== "") {
      writer.uint32(42).string(message.protocolName);
    }
    for (const v of message.transportSettings) {
      TransportConfig.encode(v!, writer.uint32(18).fork()).join();
    }
    if (message.securityType !== "") {
      writer.uint32(26).string(message.securityType);
    }
    for (const v of message.securitySettings) {
      TypedMessage.encode(v!, writer.uint32(34).fork()).join();
    }
    if (message.socketSettings !== undefined) {
      SocketConfig.encode(message.socketSettings, writer.uint32(50).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): StreamConfig {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 8: {
          if (tag !== 66) {
            break;
          }

          message.address = IPOrDomain.decode(reader, reader.uint32());
          continue;
        }
        case 9: {
          if (tag !== 72) {
            break;
          }

          message.port = reader.uint32();
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }

          message.protocolName = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.transportSettings.push(TransportConfig.decode(reader, reader.uint32()));
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.securityType = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.securitySettings.push(TypedMessage.decode(reader, reader.uint32()));
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }

          message.socketSettings = SocketConfig.decode(reader, reader.uint32());
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

  fromJSON(object: any): StreamConfig {
    return {
      $type: StreamConfig.$type,
      address: isSet(object.address) ? IPOrDomain.fromJSON(object.address) : undefined,
      port: isSet(object.port) ? globalThis.Number(object.port) : 0,
      protocolName: isSet(object.protocolName) ? globalThis.String(object.protocolName) : "",
      transportSettings: globalThis.Array.isArray(object?.transportSettings)
        ? object.transportSettings.map((e: any) => TransportConfig.fromJSON(e))
        : [],
      securityType: isSet(object.securityType) ? globalThis.String(object.securityType) : "",
      securitySettings: globalThis.Array.isArray(object?.securitySettings)
        ? object.securitySettings.map((e: any) => TypedMessage.fromJSON(e))
        : [],
      socketSettings: isSet(object.socketSettings) ? SocketConfig.fromJSON(object.socketSettings) : undefined,
    };
  },

  toJSON(message: StreamConfig): unknown {
    const obj: any = {};
    if (message.address !== undefined) {
      obj.address = IPOrDomain.toJSON(message.address);
    }
    if (message.port !== 0) {
      obj.port = Math.round(message.port);
    }
    if (message.protocolName !== "") {
      obj.protocolName = message.protocolName;
    }
    if (message.transportSettings?.length) {
      obj.transportSettings = message.transportSettings.map((e) => TransportConfig.toJSON(e));
    }
    if (message.securityType !== "") {
      obj.securityType = message.securityType;
    }
    if (message.securitySettings?.length) {
      obj.securitySettings = message.securitySettings.map((e) => TypedMessage.toJSON(e));
    }
    if (message.socketSettings !== undefined) {
      obj.socketSettings = SocketConfig.toJSON(message.socketSettings);
    }
    return obj;
  },

  create(base?: DeepPartial<StreamConfig>): StreamConfig {
    return StreamConfig.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<StreamConfig>): StreamConfig {
    const message = createBaseStreamConfig();
    message.address = (object.address !== undefined && object.address !== null)
      ? IPOrDomain.fromPartial(object.address)
      : undefined;
    message.port = object.port ?? 0;
    message.protocolName = object.protocolName ?? "";
    message.transportSettings = object.transportSettings?.map((e) => TransportConfig.fromPartial(e)) || [];
    message.securityType = object.securityType ?? "";
    message.securitySettings = object.securitySettings?.map((e) => TypedMessage.fromPartial(e)) || [];
    message.socketSettings = (object.socketSettings !== undefined && object.socketSettings !== null)
      ? SocketConfig.fromPartial(object.socketSettings)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(StreamConfig.$type, StreamConfig);

function createBaseProxyConfig(): ProxyConfig {
  return { $type: "xray.transport.internet.ProxyConfig", tag: "", transportLayerProxy: false };
}

export const ProxyConfig: MessageFns<ProxyConfig, "xray.transport.internet.ProxyConfig"> = {
  $type: "xray.transport.internet.ProxyConfig" as const,

  encode(message: ProxyConfig, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.tag !== "") {
      writer.uint32(10).string(message.tag);
    }
    if (message.transportLayerProxy !== false) {
      writer.uint32(16).bool(message.transportLayerProxy);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): ProxyConfig {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProxyConfig();
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
        case 2: {
          if (tag !== 16) {
            break;
          }

          message.transportLayerProxy = reader.bool();
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

  fromJSON(object: any): ProxyConfig {
    return {
      $type: ProxyConfig.$type,
      tag: isSet(object.tag) ? globalThis.String(object.tag) : "",
      transportLayerProxy: isSet(object.transportLayerProxy) ? globalThis.Boolean(object.transportLayerProxy) : false,
    };
  },

  toJSON(message: ProxyConfig): unknown {
    const obj: any = {};
    if (message.tag !== "") {
      obj.tag = message.tag;
    }
    if (message.transportLayerProxy !== false) {
      obj.transportLayerProxy = message.transportLayerProxy;
    }
    return obj;
  },

  create(base?: DeepPartial<ProxyConfig>): ProxyConfig {
    return ProxyConfig.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ProxyConfig>): ProxyConfig {
    const message = createBaseProxyConfig();
    message.tag = object.tag ?? "";
    message.transportLayerProxy = object.transportLayerProxy ?? false;
    return message;
  },
};

messageTypeRegistry.set(ProxyConfig.$type, ProxyConfig);

function createBaseCustomSockopt(): CustomSockopt {
  return { $type: "xray.transport.internet.CustomSockopt", level: "", opt: "", value: "", type: "" };
}

export const CustomSockopt: MessageFns<CustomSockopt, "xray.transport.internet.CustomSockopt"> = {
  $type: "xray.transport.internet.CustomSockopt" as const,

  encode(message: CustomSockopt, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.level !== "") {
      writer.uint32(10).string(message.level);
    }
    if (message.opt !== "") {
      writer.uint32(18).string(message.opt);
    }
    if (message.value !== "") {
      writer.uint32(26).string(message.value);
    }
    if (message.type !== "") {
      writer.uint32(34).string(message.type);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): CustomSockopt {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCustomSockopt();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.level = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.opt = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.value = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.type = reader.string();
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

  fromJSON(object: any): CustomSockopt {
    return {
      $type: CustomSockopt.$type,
      level: isSet(object.level) ? globalThis.String(object.level) : "",
      opt: isSet(object.opt) ? globalThis.String(object.opt) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
      type: isSet(object.type) ? globalThis.String(object.type) : "",
    };
  },

  toJSON(message: CustomSockopt): unknown {
    const obj: any = {};
    if (message.level !== "") {
      obj.level = message.level;
    }
    if (message.opt !== "") {
      obj.opt = message.opt;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    if (message.type !== "") {
      obj.type = message.type;
    }
    return obj;
  },

  create(base?: DeepPartial<CustomSockopt>): CustomSockopt {
    return CustomSockopt.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<CustomSockopt>): CustomSockopt {
    const message = createBaseCustomSockopt();
    message.level = object.level ?? "";
    message.opt = object.opt ?? "";
    message.value = object.value ?? "";
    message.type = object.type ?? "";
    return message;
  },
};

messageTypeRegistry.set(CustomSockopt.$type, CustomSockopt);

function createBaseSocketConfig(): SocketConfig {
  return {
    $type: "xray.transport.internet.SocketConfig",
    mark: 0,
    tfo: 0,
    tproxy: 0,
    receiveOriginalDestAddress: false,
    bindAddress: new Uint8Array(0),
    bindPort: 0,
    acceptProxyProtocol: false,
    domainStrategy: 0,
    dialerProxy: "",
    tcpKeepAliveInterval: 0,
    tcpKeepAliveIdle: 0,
    tcpCongestion: "",
    interface: "",
    v6only: false,
    tcpWindowClamp: 0,
    tcpUserTimeout: 0,
    tcpMaxSeg: 0,
    penetrate: false,
    tcpMptcp: false,
    customSockopt: [],
  };
}

export const SocketConfig: MessageFns<SocketConfig, "xray.transport.internet.SocketConfig"> = {
  $type: "xray.transport.internet.SocketConfig" as const,

  encode(message: SocketConfig, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.mark !== 0) {
      writer.uint32(8).int32(message.mark);
    }
    if (message.tfo !== 0) {
      writer.uint32(16).int32(message.tfo);
    }
    if (message.tproxy !== 0) {
      writer.uint32(24).int32(message.tproxy);
    }
    if (message.receiveOriginalDestAddress !== false) {
      writer.uint32(32).bool(message.receiveOriginalDestAddress);
    }
    if (message.bindAddress.length !== 0) {
      writer.uint32(42).bytes(message.bindAddress);
    }
    if (message.bindPort !== 0) {
      writer.uint32(48).uint32(message.bindPort);
    }
    if (message.acceptProxyProtocol !== false) {
      writer.uint32(56).bool(message.acceptProxyProtocol);
    }
    if (message.domainStrategy !== 0) {
      writer.uint32(64).int32(message.domainStrategy);
    }
    if (message.dialerProxy !== "") {
      writer.uint32(74).string(message.dialerProxy);
    }
    if (message.tcpKeepAliveInterval !== 0) {
      writer.uint32(80).int32(message.tcpKeepAliveInterval);
    }
    if (message.tcpKeepAliveIdle !== 0) {
      writer.uint32(88).int32(message.tcpKeepAliveIdle);
    }
    if (message.tcpCongestion !== "") {
      writer.uint32(98).string(message.tcpCongestion);
    }
    if (message.interface !== "") {
      writer.uint32(106).string(message.interface);
    }
    if (message.v6only !== false) {
      writer.uint32(112).bool(message.v6only);
    }
    if (message.tcpWindowClamp !== 0) {
      writer.uint32(120).int32(message.tcpWindowClamp);
    }
    if (message.tcpUserTimeout !== 0) {
      writer.uint32(128).int32(message.tcpUserTimeout);
    }
    if (message.tcpMaxSeg !== 0) {
      writer.uint32(136).int32(message.tcpMaxSeg);
    }
    if (message.penetrate !== false) {
      writer.uint32(144).bool(message.penetrate);
    }
    if (message.tcpMptcp !== false) {
      writer.uint32(152).bool(message.tcpMptcp);
    }
    for (const v of message.customSockopt) {
      CustomSockopt.encode(v!, writer.uint32(162).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): SocketConfig {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSocketConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.mark = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }

          message.tfo = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }

          message.tproxy = reader.int32() as any;
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }

          message.receiveOriginalDestAddress = reader.bool();
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }

          message.bindAddress = reader.bytes();
          continue;
        }
        case 6: {
          if (tag !== 48) {
            break;
          }

          message.bindPort = reader.uint32();
          continue;
        }
        case 7: {
          if (tag !== 56) {
            break;
          }

          message.acceptProxyProtocol = reader.bool();
          continue;
        }
        case 8: {
          if (tag !== 64) {
            break;
          }

          message.domainStrategy = reader.int32() as any;
          continue;
        }
        case 9: {
          if (tag !== 74) {
            break;
          }

          message.dialerProxy = reader.string();
          continue;
        }
        case 10: {
          if (tag !== 80) {
            break;
          }

          message.tcpKeepAliveInterval = reader.int32();
          continue;
        }
        case 11: {
          if (tag !== 88) {
            break;
          }

          message.tcpKeepAliveIdle = reader.int32();
          continue;
        }
        case 12: {
          if (tag !== 98) {
            break;
          }

          message.tcpCongestion = reader.string();
          continue;
        }
        case 13: {
          if (tag !== 106) {
            break;
          }

          message.interface = reader.string();
          continue;
        }
        case 14: {
          if (tag !== 112) {
            break;
          }

          message.v6only = reader.bool();
          continue;
        }
        case 15: {
          if (tag !== 120) {
            break;
          }

          message.tcpWindowClamp = reader.int32();
          continue;
        }
        case 16: {
          if (tag !== 128) {
            break;
          }

          message.tcpUserTimeout = reader.int32();
          continue;
        }
        case 17: {
          if (tag !== 136) {
            break;
          }

          message.tcpMaxSeg = reader.int32();
          continue;
        }
        case 18: {
          if (tag !== 144) {
            break;
          }

          message.penetrate = reader.bool();
          continue;
        }
        case 19: {
          if (tag !== 152) {
            break;
          }

          message.tcpMptcp = reader.bool();
          continue;
        }
        case 20: {
          if (tag !== 162) {
            break;
          }

          message.customSockopt.push(CustomSockopt.decode(reader, reader.uint32()));
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

  fromJSON(object: any): SocketConfig {
    return {
      $type: SocketConfig.$type,
      mark: isSet(object.mark) ? globalThis.Number(object.mark) : 0,
      tfo: isSet(object.tfo) ? globalThis.Number(object.tfo) : 0,
      tproxy: isSet(object.tproxy) ? socketConfig_TProxyModeFromJSON(object.tproxy) : 0,
      receiveOriginalDestAddress: isSet(object.receiveOriginalDestAddress)
        ? globalThis.Boolean(object.receiveOriginalDestAddress)
        : false,
      bindAddress: isSet(object.bindAddress) ? bytesFromBase64(object.bindAddress) : new Uint8Array(0),
      bindPort: isSet(object.bindPort) ? globalThis.Number(object.bindPort) : 0,
      acceptProxyProtocol: isSet(object.acceptProxyProtocol) ? globalThis.Boolean(object.acceptProxyProtocol) : false,
      domainStrategy: isSet(object.domainStrategy) ? domainStrategyFromJSON(object.domainStrategy) : 0,
      dialerProxy: isSet(object.dialerProxy) ? globalThis.String(object.dialerProxy) : "",
      tcpKeepAliveInterval: isSet(object.tcpKeepAliveInterval) ? globalThis.Number(object.tcpKeepAliveInterval) : 0,
      tcpKeepAliveIdle: isSet(object.tcpKeepAliveIdle) ? globalThis.Number(object.tcpKeepAliveIdle) : 0,
      tcpCongestion: isSet(object.tcpCongestion) ? globalThis.String(object.tcpCongestion) : "",
      interface: isSet(object.interface) ? globalThis.String(object.interface) : "",
      v6only: isSet(object.v6only) ? globalThis.Boolean(object.v6only) : false,
      tcpWindowClamp: isSet(object.tcpWindowClamp) ? globalThis.Number(object.tcpWindowClamp) : 0,
      tcpUserTimeout: isSet(object.tcpUserTimeout) ? globalThis.Number(object.tcpUserTimeout) : 0,
      tcpMaxSeg: isSet(object.tcpMaxSeg) ? globalThis.Number(object.tcpMaxSeg) : 0,
      penetrate: isSet(object.penetrate) ? globalThis.Boolean(object.penetrate) : false,
      tcpMptcp: isSet(object.tcpMptcp) ? globalThis.Boolean(object.tcpMptcp) : false,
      customSockopt: globalThis.Array.isArray(object?.customSockopt)
        ? object.customSockopt.map((e: any) => CustomSockopt.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SocketConfig): unknown {
    const obj: any = {};
    if (message.mark !== 0) {
      obj.mark = Math.round(message.mark);
    }
    if (message.tfo !== 0) {
      obj.tfo = Math.round(message.tfo);
    }
    if (message.tproxy !== 0) {
      obj.tproxy = socketConfig_TProxyModeToJSON(message.tproxy);
    }
    if (message.receiveOriginalDestAddress !== false) {
      obj.receiveOriginalDestAddress = message.receiveOriginalDestAddress;
    }
    if (message.bindAddress.length !== 0) {
      obj.bindAddress = base64FromBytes(message.bindAddress);
    }
    if (message.bindPort !== 0) {
      obj.bindPort = Math.round(message.bindPort);
    }
    if (message.acceptProxyProtocol !== false) {
      obj.acceptProxyProtocol = message.acceptProxyProtocol;
    }
    if (message.domainStrategy !== 0) {
      obj.domainStrategy = domainStrategyToJSON(message.domainStrategy);
    }
    if (message.dialerProxy !== "") {
      obj.dialerProxy = message.dialerProxy;
    }
    if (message.tcpKeepAliveInterval !== 0) {
      obj.tcpKeepAliveInterval = Math.round(message.tcpKeepAliveInterval);
    }
    if (message.tcpKeepAliveIdle !== 0) {
      obj.tcpKeepAliveIdle = Math.round(message.tcpKeepAliveIdle);
    }
    if (message.tcpCongestion !== "") {
      obj.tcpCongestion = message.tcpCongestion;
    }
    if (message.interface !== "") {
      obj.interface = message.interface;
    }
    if (message.v6only !== false) {
      obj.v6only = message.v6only;
    }
    if (message.tcpWindowClamp !== 0) {
      obj.tcpWindowClamp = Math.round(message.tcpWindowClamp);
    }
    if (message.tcpUserTimeout !== 0) {
      obj.tcpUserTimeout = Math.round(message.tcpUserTimeout);
    }
    if (message.tcpMaxSeg !== 0) {
      obj.tcpMaxSeg = Math.round(message.tcpMaxSeg);
    }
    if (message.penetrate !== false) {
      obj.penetrate = message.penetrate;
    }
    if (message.tcpMptcp !== false) {
      obj.tcpMptcp = message.tcpMptcp;
    }
    if (message.customSockopt?.length) {
      obj.customSockopt = message.customSockopt.map((e) => CustomSockopt.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<SocketConfig>): SocketConfig {
    return SocketConfig.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<SocketConfig>): SocketConfig {
    const message = createBaseSocketConfig();
    message.mark = object.mark ?? 0;
    message.tfo = object.tfo ?? 0;
    message.tproxy = object.tproxy ?? 0;
    message.receiveOriginalDestAddress = object.receiveOriginalDestAddress ?? false;
    message.bindAddress = object.bindAddress ?? new Uint8Array(0);
    message.bindPort = object.bindPort ?? 0;
    message.acceptProxyProtocol = object.acceptProxyProtocol ?? false;
    message.domainStrategy = object.domainStrategy ?? 0;
    message.dialerProxy = object.dialerProxy ?? "";
    message.tcpKeepAliveInterval = object.tcpKeepAliveInterval ?? 0;
    message.tcpKeepAliveIdle = object.tcpKeepAliveIdle ?? 0;
    message.tcpCongestion = object.tcpCongestion ?? "";
    message.interface = object.interface ?? "";
    message.v6only = object.v6only ?? false;
    message.tcpWindowClamp = object.tcpWindowClamp ?? 0;
    message.tcpUserTimeout = object.tcpUserTimeout ?? 0;
    message.tcpMaxSeg = object.tcpMaxSeg ?? 0;
    message.penetrate = object.penetrate ?? false;
    message.tcpMptcp = object.tcpMptcp ?? false;
    message.customSockopt = object.customSockopt?.map((e) => CustomSockopt.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(SocketConfig.$type, SocketConfig);

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
