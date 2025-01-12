import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  publicRuntimeConfig: {
    NProgressShowSpinner: true,
    pageTitle: "Prism | True Network",
    pageDescription: "Explore the on-chain attestations & reputation algorithms on the True Network.",
  }
};

export default nextConfig;
