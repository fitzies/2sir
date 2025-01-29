import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    // [!code ++] // [!code focus]
    serverComponentsExternalPackages: ["grammy"], // [!code ++] // [!code focus]
  }, // [!code ++] // [!code focus]
};

export default nextConfig;
