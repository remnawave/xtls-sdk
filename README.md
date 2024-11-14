# XTLS API SDK

A TypeScript SDK for interacting with Xray server statistics via gRPC.

This package provides a simple and type-safe way to retrieve various statistics from your Xray server, including system stats, user stats, and connection information.

## Installation

```bash
npm install @remnawave/xtls-sdk
# or
yarn add @remnawave/xtls-sdk
```

## Usage

### Basic Setup

```typescript
import { XtlsApi } from '@remnawave/xtls-sdk';

// Create a new instance
const xtlsApi = new XtlsApi('127.0.0.1', '8080');
```

### Examples

#### Get System Statistics

```typescript
const response = await xtlsApi.stats.getSysStats();

if (response.isOk) {
  console.log('System Stats:', response.data);
} else {
  console.error('Error:', response.message);
}
```

#### Get User Statistics

```typescript
// Get stats for all users
const allUsers = await xtlsApi.stats.getAllUsersStats();

// Get stats for a specific user
const userStats = await xtlsApi.stats.getUserStats('username123');

// Check if a user is online
const onlineStatus = await xtlsApi.stats.getUserOnlineStatus('username123');
```

#### Connection Statistics

```typescript
// Get all inbound connection stats
const inbounds = await xtlsApi.stats.getAllInboundsStats();

// Get specific inbound stats
const inbound = await xtlsApi.stats.getInboundStats('http_in');

// Get all outbound connection stats
const outbounds = await xtlsApi.stats.getAllOutboundsStats();

// Get specific outbound stats
const outbound = await xtlsApi.stats.getOutboundStats('http_out');
```

### Reset Statistics

Most methods support an optional `reset` parameter to clear statistics after retrieval:

```typescript
// Get and reset user stats
const stats = await xtlsApi.stats.getUserStats('username123', true);
```

## API Reference

### XtlsApi

- `constructor(ip: string, port: string)`: Creates a new XtlsApi instance

### StatsService

- `getSysStats()`: Get system statistics
- `getAllUsersStats(reset?: boolean)`: Get statistics for all users
- `getUserStats(username: string, reset?: boolean)`: Get statistics for a specific user
- `getUserOnlineStatus(username: string)`: Check if a user is currently online
- `getAllInboundsStats(reset?: boolean)`: Get statistics for all inbound connections
- `getInboundStats(inbound: string, reset?: boolean)`: Get statistics for a specific inbound connection
- `getAllOutboundsStats(reset?: boolean)`: Get statistics for all outbound connections
- `getOutboundStats(outbound: string, reset?: boolean)`: Get statistics for a specific outbound connection

All methods return a Promise with an `ISdkResponse` type that includes:

- `isOk`: Boolean indicating success/failure
- `data`: The requested statistics (when successful)
- `message`: Error message (when unsuccessful)
- `code`: Error code (when unsuccessful)

## License

MIT
