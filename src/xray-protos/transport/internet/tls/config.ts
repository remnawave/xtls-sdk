// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.7
//   protoc               v5.28.3
// source: transport/internet/tls/config.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { messageTypeRegistry } from "../../../typeRegistry";

export const protobufPackage = "xray.transport.internet.tls";

export interface Certificate {
  $type: "xray.transport.internet.tls.Certificate";
  /** TLS certificate in x509 format. */
  certificate: Uint8Array;
  /** TLS key in x509 format. */
  key: Uint8Array;
  usage: Certificate_Usage;
  ocspStapling: number;
  /** TLS certificate path */
  certificatePath: string;
  /** TLS Key path */
  keyPath: string;
  /** If true, one-Time Loading */
  OneTimeLoading: boolean;
  buildChain: boolean;
}

export enum Certificate_Usage {
  ENCIPHERMENT = 0,
  AUTHORITY_VERIFY = 1,
  AUTHORITY_ISSUE = 2,
  UNRECOGNIZED = -1,
}

export function certificate_UsageFromJSON(object: any): Certificate_Usage {
  switch (object) {
    case 0:
    case "ENCIPHERMENT":
      return Certificate_Usage.ENCIPHERMENT;
    case 1:
    case "AUTHORITY_VERIFY":
      return Certificate_Usage.AUTHORITY_VERIFY;
    case 2:
    case "AUTHORITY_ISSUE":
      return Certificate_Usage.AUTHORITY_ISSUE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Certificate_Usage.UNRECOGNIZED;
  }
}

export function certificate_UsageToJSON(object: Certificate_Usage): string {
  switch (object) {
    case Certificate_Usage.ENCIPHERMENT:
      return "ENCIPHERMENT";
    case Certificate_Usage.AUTHORITY_VERIFY:
      return "AUTHORITY_VERIFY";
    case Certificate_Usage.AUTHORITY_ISSUE:
      return "AUTHORITY_ISSUE";
    case Certificate_Usage.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Config {
  $type: "xray.transport.internet.tls.Config";
  /** Whether or not to allow self-signed certificates. */
  allowInsecure: boolean;
  /** List of certificates to be served on server. */
  certificate: Certificate[];
  /** Override server name. */
  serverName: string;
  /** Lists of string as ALPN values. */
  nextProtocol: string[];
  /** Whether or not to enable session (ticket) resumption. */
  enableSessionResumption: boolean;
  /**
   * If true, root certificates on the system will not be loaded for
   * verification.
   */
  disableSystemRoot: boolean;
  /** The minimum TLS version. */
  minVersion: string;
  /** The maximum TLS version. */
  maxVersion: string;
  /** Specify cipher suites, except for TLS 1.3. */
  cipherSuites: string;
  /** TLS Client Hello fingerprint (uTLS). */
  fingerprint: string;
  rejectUnknownSni: boolean;
  /**
   * @Document Some certificate chain sha256 hashes.
   * @Document After normal validation or allow_insecure, if the server's cert chain hash does not match any of these values, the connection will be aborted.
   * @Critical
   */
  pinnedPeerCertificateChainSha256: Uint8Array[];
  /**
   * @Document Some certificate public key sha256 hashes.
   * @Document After normal validation (required), if the verified cert's public key hash does not match any of these values, the connection will be aborted.
   * @Critical
   */
  pinnedPeerCertificatePublicKeySha256: Uint8Array[];
  masterKeyLog: string;
  /** Lists of string as CurvePreferences values. */
  curvePreferences: string[];
  /**
   * @Document Replaces server_name to verify the peer cert.
   * @Document After allow_insecure (automatically), if the server's cert can't be verified by any of these names, pinned_peer_certificate_chain_sha256 will be tried.
   * @Critical
   */
  verifyPeerCertInNames: string[];
}

function createBaseCertificate(): Certificate {
  return {
    $type: "xray.transport.internet.tls.Certificate",
    certificate: new Uint8Array(0),
    key: new Uint8Array(0),
    usage: 0,
    ocspStapling: 0,
    certificatePath: "",
    keyPath: "",
    OneTimeLoading: false,
    buildChain: false,
  };
}

export const Certificate: MessageFns<Certificate, "xray.transport.internet.tls.Certificate"> = {
  $type: "xray.transport.internet.tls.Certificate" as const,

  encode(message: Certificate, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.certificate.length !== 0) {
      writer.uint32(10).bytes(message.certificate);
    }
    if (message.key.length !== 0) {
      writer.uint32(18).bytes(message.key);
    }
    if (message.usage !== 0) {
      writer.uint32(24).int32(message.usage);
    }
    if (message.ocspStapling !== 0) {
      writer.uint32(32).uint64(message.ocspStapling);
    }
    if (message.certificatePath !== "") {
      writer.uint32(42).string(message.certificatePath);
    }
    if (message.keyPath !== "") {
      writer.uint32(50).string(message.keyPath);
    }
    if (message.OneTimeLoading !== false) {
      writer.uint32(56).bool(message.OneTimeLoading);
    }
    if (message.buildChain !== false) {
      writer.uint32(64).bool(message.buildChain);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Certificate {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCertificate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.certificate = reader.bytes();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.key = reader.bytes();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }

          message.usage = reader.int32() as any;
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }

          message.ocspStapling = longToNumber(reader.uint64());
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }

          message.certificatePath = reader.string();
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }

          message.keyPath = reader.string();
          continue;
        }
        case 7: {
          if (tag !== 56) {
            break;
          }

          message.OneTimeLoading = reader.bool();
          continue;
        }
        case 8: {
          if (tag !== 64) {
            break;
          }

          message.buildChain = reader.bool();
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

  fromJSON(object: any): Certificate {
    return {
      $type: Certificate.$type,
      certificate: isSet(object.certificate) ? bytesFromBase64(object.certificate) : new Uint8Array(0),
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(0),
      usage: isSet(object.usage) ? certificate_UsageFromJSON(object.usage) : 0,
      ocspStapling: isSet(object.ocspStapling) ? globalThis.Number(object.ocspStapling) : 0,
      certificatePath: isSet(object.certificatePath) ? globalThis.String(object.certificatePath) : "",
      keyPath: isSet(object.keyPath) ? globalThis.String(object.keyPath) : "",
      OneTimeLoading: isSet(object.OneTimeLoading) ? globalThis.Boolean(object.OneTimeLoading) : false,
      buildChain: isSet(object.buildChain) ? globalThis.Boolean(object.buildChain) : false,
    };
  },

  toJSON(message: Certificate): unknown {
    const obj: any = {};
    if (message.certificate.length !== 0) {
      obj.certificate = base64FromBytes(message.certificate);
    }
    if (message.key.length !== 0) {
      obj.key = base64FromBytes(message.key);
    }
    if (message.usage !== 0) {
      obj.usage = certificate_UsageToJSON(message.usage);
    }
    if (message.ocspStapling !== 0) {
      obj.ocspStapling = Math.round(message.ocspStapling);
    }
    if (message.certificatePath !== "") {
      obj.certificatePath = message.certificatePath;
    }
    if (message.keyPath !== "") {
      obj.keyPath = message.keyPath;
    }
    if (message.OneTimeLoading !== false) {
      obj.OneTimeLoading = message.OneTimeLoading;
    }
    if (message.buildChain !== false) {
      obj.buildChain = message.buildChain;
    }
    return obj;
  },

  create(base?: DeepPartial<Certificate>): Certificate {
    return Certificate.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Certificate>): Certificate {
    const message = createBaseCertificate();
    message.certificate = object.certificate ?? new Uint8Array(0);
    message.key = object.key ?? new Uint8Array(0);
    message.usage = object.usage ?? 0;
    message.ocspStapling = object.ocspStapling ?? 0;
    message.certificatePath = object.certificatePath ?? "";
    message.keyPath = object.keyPath ?? "";
    message.OneTimeLoading = object.OneTimeLoading ?? false;
    message.buildChain = object.buildChain ?? false;
    return message;
  },
};

messageTypeRegistry.set(Certificate.$type, Certificate);

function createBaseConfig(): Config {
  return {
    $type: "xray.transport.internet.tls.Config",
    allowInsecure: false,
    certificate: [],
    serverName: "",
    nextProtocol: [],
    enableSessionResumption: false,
    disableSystemRoot: false,
    minVersion: "",
    maxVersion: "",
    cipherSuites: "",
    fingerprint: "",
    rejectUnknownSni: false,
    pinnedPeerCertificateChainSha256: [],
    pinnedPeerCertificatePublicKeySha256: [],
    masterKeyLog: "",
    curvePreferences: [],
    verifyPeerCertInNames: [],
  };
}

export const Config: MessageFns<Config, "xray.transport.internet.tls.Config"> = {
  $type: "xray.transport.internet.tls.Config" as const,

  encode(message: Config, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.allowInsecure !== false) {
      writer.uint32(8).bool(message.allowInsecure);
    }
    for (const v of message.certificate) {
      Certificate.encode(v!, writer.uint32(18).fork()).join();
    }
    if (message.serverName !== "") {
      writer.uint32(26).string(message.serverName);
    }
    for (const v of message.nextProtocol) {
      writer.uint32(34).string(v!);
    }
    if (message.enableSessionResumption !== false) {
      writer.uint32(40).bool(message.enableSessionResumption);
    }
    if (message.disableSystemRoot !== false) {
      writer.uint32(48).bool(message.disableSystemRoot);
    }
    if (message.minVersion !== "") {
      writer.uint32(58).string(message.minVersion);
    }
    if (message.maxVersion !== "") {
      writer.uint32(66).string(message.maxVersion);
    }
    if (message.cipherSuites !== "") {
      writer.uint32(74).string(message.cipherSuites);
    }
    if (message.fingerprint !== "") {
      writer.uint32(90).string(message.fingerprint);
    }
    if (message.rejectUnknownSni !== false) {
      writer.uint32(96).bool(message.rejectUnknownSni);
    }
    for (const v of message.pinnedPeerCertificateChainSha256) {
      writer.uint32(106).bytes(v!);
    }
    for (const v of message.pinnedPeerCertificatePublicKeySha256) {
      writer.uint32(114).bytes(v!);
    }
    if (message.masterKeyLog !== "") {
      writer.uint32(122).string(message.masterKeyLog);
    }
    for (const v of message.curvePreferences) {
      writer.uint32(130).string(v!);
    }
    for (const v of message.verifyPeerCertInNames) {
      writer.uint32(138).string(v!);
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
          if (tag !== 8) {
            break;
          }

          message.allowInsecure = reader.bool();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.certificate.push(Certificate.decode(reader, reader.uint32()));
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.serverName = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.nextProtocol.push(reader.string());
          continue;
        }
        case 5: {
          if (tag !== 40) {
            break;
          }

          message.enableSessionResumption = reader.bool();
          continue;
        }
        case 6: {
          if (tag !== 48) {
            break;
          }

          message.disableSystemRoot = reader.bool();
          continue;
        }
        case 7: {
          if (tag !== 58) {
            break;
          }

          message.minVersion = reader.string();
          continue;
        }
        case 8: {
          if (tag !== 66) {
            break;
          }

          message.maxVersion = reader.string();
          continue;
        }
        case 9: {
          if (tag !== 74) {
            break;
          }

          message.cipherSuites = reader.string();
          continue;
        }
        case 11: {
          if (tag !== 90) {
            break;
          }

          message.fingerprint = reader.string();
          continue;
        }
        case 12: {
          if (tag !== 96) {
            break;
          }

          message.rejectUnknownSni = reader.bool();
          continue;
        }
        case 13: {
          if (tag !== 106) {
            break;
          }

          message.pinnedPeerCertificateChainSha256.push(reader.bytes());
          continue;
        }
        case 14: {
          if (tag !== 114) {
            break;
          }

          message.pinnedPeerCertificatePublicKeySha256.push(reader.bytes());
          continue;
        }
        case 15: {
          if (tag !== 122) {
            break;
          }

          message.masterKeyLog = reader.string();
          continue;
        }
        case 16: {
          if (tag !== 130) {
            break;
          }

          message.curvePreferences.push(reader.string());
          continue;
        }
        case 17: {
          if (tag !== 138) {
            break;
          }

          message.verifyPeerCertInNames.push(reader.string());
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
      allowInsecure: isSet(object.allowInsecure) ? globalThis.Boolean(object.allowInsecure) : false,
      certificate: globalThis.Array.isArray(object?.certificate)
        ? object.certificate.map((e: any) => Certificate.fromJSON(e))
        : [],
      serverName: isSet(object.serverName) ? globalThis.String(object.serverName) : "",
      nextProtocol: globalThis.Array.isArray(object?.nextProtocol)
        ? object.nextProtocol.map((e: any) => globalThis.String(e))
        : [],
      enableSessionResumption: isSet(object.enableSessionResumption)
        ? globalThis.Boolean(object.enableSessionResumption)
        : false,
      disableSystemRoot: isSet(object.disableSystemRoot) ? globalThis.Boolean(object.disableSystemRoot) : false,
      minVersion: isSet(object.minVersion) ? globalThis.String(object.minVersion) : "",
      maxVersion: isSet(object.maxVersion) ? globalThis.String(object.maxVersion) : "",
      cipherSuites: isSet(object.cipherSuites) ? globalThis.String(object.cipherSuites) : "",
      fingerprint: isSet(object.fingerprint) ? globalThis.String(object.fingerprint) : "",
      rejectUnknownSni: isSet(object.rejectUnknownSni) ? globalThis.Boolean(object.rejectUnknownSni) : false,
      pinnedPeerCertificateChainSha256: globalThis.Array.isArray(object?.pinnedPeerCertificateChainSha256)
        ? object.pinnedPeerCertificateChainSha256.map((e: any) => bytesFromBase64(e))
        : [],
      pinnedPeerCertificatePublicKeySha256: globalThis.Array.isArray(object?.pinnedPeerCertificatePublicKeySha256)
        ? object.pinnedPeerCertificatePublicKeySha256.map((e: any) => bytesFromBase64(e))
        : [],
      masterKeyLog: isSet(object.masterKeyLog) ? globalThis.String(object.masterKeyLog) : "",
      curvePreferences: globalThis.Array.isArray(object?.curvePreferences)
        ? object.curvePreferences.map((e: any) => globalThis.String(e))
        : [],
      verifyPeerCertInNames: globalThis.Array.isArray(object?.verifyPeerCertInNames)
        ? object.verifyPeerCertInNames.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: Config): unknown {
    const obj: any = {};
    if (message.allowInsecure !== false) {
      obj.allowInsecure = message.allowInsecure;
    }
    if (message.certificate?.length) {
      obj.certificate = message.certificate.map((e) => Certificate.toJSON(e));
    }
    if (message.serverName !== "") {
      obj.serverName = message.serverName;
    }
    if (message.nextProtocol?.length) {
      obj.nextProtocol = message.nextProtocol;
    }
    if (message.enableSessionResumption !== false) {
      obj.enableSessionResumption = message.enableSessionResumption;
    }
    if (message.disableSystemRoot !== false) {
      obj.disableSystemRoot = message.disableSystemRoot;
    }
    if (message.minVersion !== "") {
      obj.minVersion = message.minVersion;
    }
    if (message.maxVersion !== "") {
      obj.maxVersion = message.maxVersion;
    }
    if (message.cipherSuites !== "") {
      obj.cipherSuites = message.cipherSuites;
    }
    if (message.fingerprint !== "") {
      obj.fingerprint = message.fingerprint;
    }
    if (message.rejectUnknownSni !== false) {
      obj.rejectUnknownSni = message.rejectUnknownSni;
    }
    if (message.pinnedPeerCertificateChainSha256?.length) {
      obj.pinnedPeerCertificateChainSha256 = message.pinnedPeerCertificateChainSha256.map((e) => base64FromBytes(e));
    }
    if (message.pinnedPeerCertificatePublicKeySha256?.length) {
      obj.pinnedPeerCertificatePublicKeySha256 = message.pinnedPeerCertificatePublicKeySha256.map((e) =>
        base64FromBytes(e)
      );
    }
    if (message.masterKeyLog !== "") {
      obj.masterKeyLog = message.masterKeyLog;
    }
    if (message.curvePreferences?.length) {
      obj.curvePreferences = message.curvePreferences;
    }
    if (message.verifyPeerCertInNames?.length) {
      obj.verifyPeerCertInNames = message.verifyPeerCertInNames;
    }
    return obj;
  },

  create(base?: DeepPartial<Config>): Config {
    return Config.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Config>): Config {
    const message = createBaseConfig();
    message.allowInsecure = object.allowInsecure ?? false;
    message.certificate = object.certificate?.map((e) => Certificate.fromPartial(e)) || [];
    message.serverName = object.serverName ?? "";
    message.nextProtocol = object.nextProtocol?.map((e) => e) || [];
    message.enableSessionResumption = object.enableSessionResumption ?? false;
    message.disableSystemRoot = object.disableSystemRoot ?? false;
    message.minVersion = object.minVersion ?? "";
    message.maxVersion = object.maxVersion ?? "";
    message.cipherSuites = object.cipherSuites ?? "";
    message.fingerprint = object.fingerprint ?? "";
    message.rejectUnknownSni = object.rejectUnknownSni ?? false;
    message.pinnedPeerCertificateChainSha256 = object.pinnedPeerCertificateChainSha256?.map((e) => e) || [];
    message.pinnedPeerCertificatePublicKeySha256 = object.pinnedPeerCertificatePublicKeySha256?.map((e) => e) || [];
    message.masterKeyLog = object.masterKeyLog ?? "";
    message.curvePreferences = object.curvePreferences?.map((e) => e) || [];
    message.verifyPeerCertInNames = object.verifyPeerCertInNames?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(Config.$type, Config);

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

function longToNumber(int64: { toString(): string }): number {
  const num = globalThis.Number(int64.toString());
  if (num > globalThis.Number.MAX_SAFE_INTEGER) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  if (num < globalThis.Number.MIN_SAFE_INTEGER) {
    throw new globalThis.Error("Value is smaller than Number.MIN_SAFE_INTEGER");
  }
  return num;
}

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
