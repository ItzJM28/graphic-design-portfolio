import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // The old auto-generated Vercel address forwards to the main link.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "graphic-design-portfolio-coral.vercel.app" }],
        destination: "https://jdcreates.vercel.app/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
