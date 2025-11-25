import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  // Always deploy to root (custom domain: www.superinference.org)
  // No basePath needed since we're using a custom domain, not GitHub Pages subdirectory
};

export default nextConfig;
