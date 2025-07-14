# @zignal/persist

[![npm version](https://img.shields.io/npm/v/@zignal/persist.svg)](https://www.npmjs.com/package/@zignal/persist)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@zignal/persist)](https://bundlephobia.com/result?p=@zignal/persist)
[![npm downloads](https://img.shields.io/npm/dm/@zignal/persist.svg)](https://www.npmjs.com/package/@zignal/persist)

Persistence plugin for [@zignal/core](https://github.com/Zignal-React/zignal-core) signal stores. Adds localStorage/sessionStorage support to your state.

## Install

```sh
npm install @zignal/core
npm install @zignal/persist
# or
yarn add @zignal/core
yarn add @zignal/persist
# or
pnpm add @zignal/core
pnpm add @zignal/persist
```

> You must also install [`@zignal/core`](https://github.com/Zignal-React/zignal-core).

## Usage

```tsx
import { createZignal } from '@zignal/core';
import { write } from '@zignal/persist';

const useCounter = createZignal(0); // non-persistent
const usePersistentCounter = write(createZignal(0), { key: 'counter', storage: 'localStorage' });

function Counter() {
  const [count, setCount] = useCounter();
  // ...
}

function PersistentCounter() {
  const [count, setCount] = usePersistentCounter();
  // ...
}
```

## API

### `write(hook, options)`
Wraps a signal store hook to persist its value to localStorage or sessionStorage.

- `hook`: The hook returned by `createZignal`.
- `options.key`: Storage key (string, optional).
- `options.storage`: `'localStorage'` (default) or `'sessionStorage'`.

### `cleanupZignal(key?)`
Removes all (or one) persisted zignal keys from storage.

---
MIT License. 