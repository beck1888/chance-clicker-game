import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: {
    buildActivity: false,
    appIsrStatus: false,
  },
  experimental: {
    // disableNextDevTools: true, // TO FIX: Key not recognized
  },
};

export default nextConfig;