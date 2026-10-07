/**
 * Single source of truth for the backend base URL.
 *  - NEXT_PUBLIC_API_URL set      -> use it (separate backend: Render, Railway, 2nd Vercel project…)
 *  - development, nothing set     -> FastAPI on localhost:8000
 *  - production, nothing set      -> same-origin "/api" (combined Vercel deployment)
 */
export const API_BASE: string = (
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production" ? "/api" : "http://localhost:8000")
).replace(/\/$/, "");

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

/** JSON POST helper. Throws ApiError for HTTP errors; network failures throw TypeError. */
export async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    let detail = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (typeof data?.detail === "string") detail = data.detail;
    } catch {}
    throw new ApiError(res.status, detail);
  }
  return res.json() as Promise<T>;
}
