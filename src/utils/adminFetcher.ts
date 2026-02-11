
"use client";

const cache = new Map<string, any>();
const listeners = new Map<string, Set<(data: any) => void>>();

/**
 * Global fetcher with caching and SWR support
 */
export async function adminFetch(url: string, forceRefetch = false) {
    // If not forcing refetch and we have cache, we still fetch in background
    // but the caller will get the cached value first.

    const doFetch = async () => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            cache.set(url, data);

            // Notify all subscribers
            if (listeners.has(url)) {
                listeners.get(url)?.forEach(cb => cb(data));
            }
            return data;
        } catch (err) {
            console.error(`Fetch failed for ${url}:`, err);
            throw err;
        }
    };

    if (forceRefetch) {
        return await doFetch();
    }

    // Prefetching or background revalidation
    const fetchPromise = doFetch();

    // Return cached if exists, otherwise return the promise
    if (cache.has(url)) {
        return cache.get(url);
    }

    return await fetchPromise;
}

/**
 * Hook-like function to subscribe to cache updates
 */
export function subscribeToCache(url: string, callback: (data: any) => void) {
    if (!listeners.has(url)) {
        listeners.set(url, new Set());
    }
    listeners.get(url)?.add(callback);

    // Return cached value immediately if exists
    if (cache.has(url)) {
        callback(cache.get(url));
    }

    return () => {
        listeners.get(url)?.delete(callback);
    };
}

export function getCachedData(url: string) {
    return cache.get(url);
}

export function updateCache(url: string, data: any) {
    cache.set(url, data);
    if (listeners.has(url)) {
        listeners.get(url)?.forEach(cb => cb(data));
    }
}

export function invalidateCache(url: string) {
    cache.delete(url);
    // Optionally trigger a refetch
    adminFetch(url, true);
}
