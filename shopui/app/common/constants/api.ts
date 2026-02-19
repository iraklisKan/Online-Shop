// Server-side (SSR / Server Actions): use the internal Docker network URL when available.
// Client-side (browser): always use the public NEXT_PUBLIC_API_URL.
export const API_URL =
  typeof window === 'undefined'
    ? (process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL)
    : process.env.NEXT_PUBLIC_API_URL;
