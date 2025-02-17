import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      process.env.CODESPACES ? {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Forwarded-Host',
            value: `${process.env.CODESPACE_NAME}-3000.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`,
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: `https://${process.env.CODESPACE_NAME}-3000.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`,
          },
        ],
      } : {
        source: "/(.*)",
        headers: [
          {
            key: "x-forwarded-host",
            value: "localhost:3000",
          },
        ],
      },
    ]
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"]
    }
  }
};

export default nextConfig;
