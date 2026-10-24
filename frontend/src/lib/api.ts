export type ApiError = Error & { status?: number; details?: unknown };

type CacheEntry = { value: unknown; expiresAt: number };

// The portal is an authenticated SPA, so keep short-lived GET results in
// memory. This avoids both duplicate concurrent requests and refetches when a
// user returns to a page. Nothing is persisted to localStorage/sessionStorage.
const cache = new Map<string, CacheEntry>();
const pending = new Map<string, Promise<unknown>>();
let cacheIdentity = 'anonymous';
const cacheStats = { hits: 0, misses: 0 };

function cacheTtl(url: string) {
  if (url.startsWith('/api/public/')) return 5 * 60_000;
  if (url === '/api/me') return 30_000;
  if (url.includes('/canteen/')) return 3_000;
  if (url.includes('/management/') || url.includes('/reviewer/')) return 10_000;
  if (url.includes('/learning')) return 60_000;
  return 30_000;
}

function cacheKey(url: string) {
  return `${cacheIdentity}:${url}`;
}

export function setApiCacheIdentity(identity: string | null) {
  const next = identity || 'anonymous';
  if (next === cacheIdentity) return;
  cacheIdentity = next;
  cache.clear();
  pending.clear();
}

export function clearApiCache() {
  cache.clear();
  pending.clear();
}

export function getCachedApi<T>(url: string): T | undefined {
  const entry = cache.get(cacheKey(url));
  if (!entry) return undefined;
  if (entry.expiresAt <= Date.now()) {
    cache.delete(cacheKey(url));
    return undefined;
  }
  cacheStats.hits += 1;
  return entry.value as T;
}

export function getApiCacheStats() {
  return { ...cacheStats };
}

export function invalidateApiCache(prefixes?: string[]) {
  if (!prefixes?.length) {
    clearApiCache();
    return;
  }
  for (const key of cache.keys()) {
    if (prefixes.some((prefix) => key.includes(`:${prefix}`))) cache.delete(key);
  }
}

export async function api<T>(url: string, options: RequestInit = {}): Promise<T> {
  const method = (options.method || 'GET').toUpperCase();
  const canCache = method === 'GET' && options.cache !== 'no-store';
  const key = canCache ? cacheKey(url) : '';
  if (canCache) {
    const cached = cache.get(key);
    if (cached && cached.expiresAt > Date.now()) {
      cacheStats.hits += 1;
      if (import.meta.env.DEV) console.debug(`[api-cache] hit ${url}`);
      return cached.value as T;
    }
    if (cached) cache.delete(key);
    const existing = pending.get(key);
    if (existing) {
      cacheStats.hits += 1;
      if (import.meta.env.DEV) console.debug(`[api-cache] dedupe ${url}`);
      return existing as Promise<T>;
    }
    cacheStats.misses += 1;
    if (import.meta.env.DEV) console.debug(`[api-cache] miss ${url}`);
  }

  const request = requestApi<T>(url, options, method, canCache, key);
  if (canCache) {
    pending.set(key, request);
    void request.then(() => pending.delete(key), () => pending.delete(key));
  }
  return request;
}

async function requestApi<T>(url: string, options: RequestInit, method: string, canCache: boolean, key: string): Promise<T> {
  const started = performance.now();
  const headers = new Headers(options.headers);
  if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  const response = await fetch(url, { ...options, headers, credentials: 'include' });
  const body = await response.json().catch(() => ({ data: null, error: { message: 'Respons server tidak valid.' } }));
  if (import.meta.env.DEV) {
    const key = `smkn26-api-count:${url}`;
    const count = Number(sessionStorage.getItem(key) || '0') + 1;
    sessionStorage.setItem(key, String(count));
    console.debug(`[api] ${options.method || 'GET'} ${url} ${response.status} ${(performance.now() - started).toFixed(0)}ms #${count}`);
  }
  if (!response.ok || body.error) {
    if (response.status === 401) clearApiCache();
    const error = new Error(body.error?.message || 'Permintaan gagal.') as ApiError;
    error.status = response.status;
    error.details = body.error;
    throw error;
  }
  const value = body.data as T;
  if (canCache) cache.set(key, { value, expiresAt: Date.now() + cacheTtl(url) });
  else if (method !== 'GET') invalidateApiCache();
  if (import.meta.env.DEV) {
    performance.mark(`smkn26-data-ready:${url}`);
    console.debug(`[data] ${method} ${url} ready ${(performance.now() - started).toFixed(0)}ms`);
  }
  return value;
}
