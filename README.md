# XTLS SDK

![GitHub top language](https://img.shields.io/github/languages/top/remnawave/xtls-sdk)
![GitHub Repo stars](https://img.shields.io/github/stars/remnawave/xtls-sdk)

![npm version](https://img.shields.io/npm/v/@remnawave/xtls-sdk)
![GitHub Tag](https://img.shields.io/github/v/tag/remnawave/xtls-sdk)

![Build Status](https://img.shields.io/github/actions/workflow/status/remnawave/xtls-sdk/.github/workflows/deploy-lib.yml)
![Downloads](https://img.shields.io/npm/dt/@remnawave/xtls-sdk)
![License](https://img.shields.io/npm/l/@remnawave/xtls-sdk)
![NPM Last Update](https://img.shields.io/npm/last-update/%40remnawave%2Fxtls-sdk)

![Known Vulnerabilities](https://snyk.io/test/github/remnawave/xtls-sdk/badge.svg)
![Coverage Status](https://img.shields.io/codecov/c/github/remnawave/xtls-sdk)

A TypeScript SDK for interacting with XRAY (XTLS) Core via gRPC API. This package provides a type-safe interface for managing and monitoring your XRAY server, including statistics, user management, and connection information.

## Features

- 🔒 Type-safe API interactions
- 📊 Comprehensive statistics monitoring
- 👥 User management capabilities
- 🔄 Connection monitoring
- ⚡ Async/Promise-based API
- 📝 Detailed error handling

## Installation

```bash
npm install @remnawave/xtls-sdk
# or
yarn add @remnawave/xtls-sdk
# or
pnpm add @remnawave/xtls-sdk
```

## Quick Start

```typescript
import { XtlsApi } from '@remnawave/xtls-sdk';

// Initialize the API client
const api = new XtlsApi('127.0.0.1', '10085');

// Example: Get system statistics
const stats = await api.stats.getSysStats();
if (stats.isOk) {
  console.log('System Stats:', stats.data);
}
```

## Core Features

### Statistics Management

```typescript
// System Statistics
const sysStats = await api.stats.getSysStats();

// User Statistics
const userStats = await api.stats.getUserStats('username');
const allUsers = await api.stats.getAllUsersStats();
const isOnline = await api.stats.getUserOnlineStatus('username');

// Traffic Statistics
const inbounds = await api.stats.getAllInboundsStats();
const outbounds = await api.stats.getAllOutboundsStats();
```

### Response Handling

All API methods return a standardized response format:

```typescript
interface ISdkResponse<T> {
  isOk: boolean;
  data?: T;
  message?: string;
  code?: string;
}
```

Example usage:

```typescript
const response = await api.stats.getSysStats();

if (response.isOk) {
  // Success case
  console.log('Stats:', response.data);
} else {
  // Error case
  console.error(`Error ${response.code}: ${response.message}`);
}
```

### Reset Options

Many methods support statistics reset functionality:

```typescript
// Get stats and reset counters
const stats = await api.stats.getUserStats('username', true);
```

## API Reference

### XtlsApi

Main client class for interacting with the XRAY server.

```typescript
const api = new XtlsApi(ip: string, port: string);
```

### HandlerService

Service for managing inbound handlers and their users.

#### User Management Methods

| Method                                      | Description                      | Parameters                                               |
| ------------------------------------------- | -------------------------------- | -------------------------------------------------------- |
| `getInboundUsers(tag: string)`              | Get all users from an inbound    | `tag`: Inbound handler tag                               |
| `getInboundUsersCount(tag: string)`         | Get count of users in an inbound | `tag`: Inbound handler tag                               |
| `removeUser(tag: string, username: string)` | Remove a user from an inbound    | `tag`: Inbound handler tag<br>`username`: User to remove |

#### Add User Methods

| Method                                                  | Description               | Parameters                                                       |
| ------------------------------------------------------- | ------------------------- | ---------------------------------------------------------------- |
| `addTrojanUser(data: IAddTrojanUser)`                   | Add Trojan user           | `data`: { tag, username, password, level }                       |
| `addVlessUser(data: IAddVlessUser)`                     | Add VLESS user            | `data`: { tag, username, uuid, flow, level }                     |
| `addShadowsocksUser(data: IAddShadowsocksUser)`         | Add Shadowsocks user      | `data`: { tag, username, password, cipherType, ivCheck, level }  |
| `addShadowsocks2022User(data: IAddShadowsocks2022User)` | Add Shadowsocks 2022 user | `data`: { tag, username, key, level }                            |
| `addSocksUser(data: IAddSocksUser)`                     | Add SOCKS user            | `data`: { tag, username, socks_username, socks_password, level } |
| `addHttpUser(data: IAddHttpUser)`                       | Add HTTP user             | `data`: { tag, username, http_username, http_password, level }   |

Example usage:

```typescript
// Get all users in an inbound
const users = await api.handler.getInboundUsers('main-inbound');
if (users.isOk) {
  console.log('Users:', users.data.users);
}

// Add a new Trojan user
const newUser = await api.handler.addTrojanUser({
  tag: 'main-inbound',
  username: 'user@example.com',
  password: 'secure-password',
  level: 0,
});

// Remove a user
const removed = await api.handler.removeUser('main-inbound', 'user@example.com');

// Get user count
const count = await api.handler.getInboundUsersCount('main-inbound');
if (count.isOk) {
  console.log('Total users:', count.data);
}
```

### StatsService

Statistics management service.

| Method                                                | Description                      | Parameters                                                       |
| ----------------------------------------------------- | -------------------------------- | ---------------------------------------------------------------- |
| `getSysStats()`                                       | Get system statistics            | None                                                             |
| `getAllUsersStats(reset?: boolean)`                   | Get all users' statistics        | `reset`: Reset stats after retrieval                             |
| `getUserStats(username: string, reset?: boolean)`     | Get specific user statistics     | `username`: Target user<br>`reset`: Reset stats after retrieval  |
| `getUserOnlineStatus(username: string)`               | Check user online status         | `username`: Target user                                          |
| `getAllInboundsStats(reset?: boolean)`                | Get all inbound statistics       | `reset`: Reset stats after retrieval                             |
| `getInboundStats(inbound: string, reset?: boolean)`   | Get specific inbound statistics  | `inbound`: Inbound tag<br>`reset`: Reset stats after retrieval   |
| `getAllOutboundsStats(reset?: boolean)`               | Get all outbound statistics      | `reset`: Reset stats after retrieval                             |
| `getOutboundStats(outbound: string, reset?: boolean)` | Get specific outbound statistics | `outbound`: Outbound tag<br>`reset`: Reset stats after retrieval |

## Error Handling

The SDK provides detailed error information through the response object:

```typescript
try {
  const response = await api.stats.getUserStats('username');
  if (!response.isOk) {
    console.error(`Operation failed: ${response.message}`);
    console.error(`Error code: ${response.code}`);
  }
} catch (error) {
  console.error('Unexpected error:', error);
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE](LICENSE) file for details.
