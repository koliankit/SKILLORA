/** @type {import('next').NextConfig} */
const isExport = process.env.NEXT_EXPORT === "true"; // static build for the Capacitor / Android app

// Only proxy /api when a separate backend is configured. On a combined Vercel
// deployment, vercel.json already routes /api/* to the Python function.
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
  ...(isExport
    ? { output: "export", trailingSlash: true }
    : {
        async headers() {
          return [{ source: "/(.*)", headers: securityHeaders }];
        },
        async rewrites() {
          if (!apiUrl || process.env.VERCEL) return [];
          return [{ source: "/backend/:path*", destination: `${apiUrl.replace(/\/$/, "")}/:path*` }];
        },
      }),
};

module.exports = nextConfig;
