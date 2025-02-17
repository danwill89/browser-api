import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "x-forwarded-host",
            value: "localhost:3000",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "x-forwarded-host",
            value: `${process.env.CODESPACE_NAME}-3000.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
