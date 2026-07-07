import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  allowedDevOrigins: ["kamden-nonmodifying-matthew.ngrok-free.dev"],
};

export default nextConfig;
