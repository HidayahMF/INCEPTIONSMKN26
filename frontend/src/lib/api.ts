export type ApiError = Error & { status?: number; details?: unknown };

export async function api<T>(url: string, options: RequestInit = {}): Promise<T> {
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
    const error = new Error(body.error?.message || 'Permintaan gagal.') as ApiError;
    error.status = response.status;
    error.details = body.error;
    throw error;
  }
  return body.data as T;
}
