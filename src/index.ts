import { useEffect, useSyncExternalStore } from 'react';
import type { ZignalStore } from '@zignal/core';
let storeId = 0;

export function write<T>(
	hook: (() => [T, (v: T) => void]) & { store?: ZignalStore<T> },
	options?: { key?: string; storage?: 'localStorage' | 'sessionStorage' }
) {
	const store = hook.store;
	if (!store) throw new Error('write() expects a hook created by createZignal');
	const storageKey = (options?.key && options.key.startsWith('z_') ? options.key : `z_${options?.key || 'store_' + ++storeId}`);
	return () => {
		const value = useSyncExternalStore(cb => store.subscribe(cb), store.get);
		useEffect(() => {
			if (typeof window === 'undefined') return;
			const storage = options?.storage === 'sessionStorage' ? window.sessionStorage : window.localStorage;
			const storedValue = storage.getItem(storageKey);
			if (storedValue !== null) store.set(JSON.parse(storedValue));
		}, []);
		useEffect(() => {
			if (typeof window === 'undefined') return;
			const storage = options?.storage === 'sessionStorage' ? window.sessionStorage : window.localStorage;
			storage.setItem(storageKey, JSON.stringify(value));
		}, [value]);
		return [value, store.set] as [T, (v: T) => void];
	};
}

export function cleanupZignal(key?: string) {
	if (typeof window !== 'undefined') {
		if (key) {
			const k = key.startsWith('z_') ? key : `z_${key}`;
			window.localStorage?.removeItem(k);
			window.sessionStorage?.removeItem(k);
		} else {
			[window.localStorage, window.sessionStorage].forEach(storage => {
				if (!storage) return;
				for (let i = storage.length - 1; i >= 0; i--) {
					const storageKey = storage.key(i);
					if (storageKey && storageKey.startsWith('z_')) storage.removeItem(storageKey);
				}
			});
		}
	}
} 