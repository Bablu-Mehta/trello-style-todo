import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "out",
  images: {
    unoptimized: true,
  },
  basePath: "/trello-style-todo",
  assetPrefix: "/trello-style-todo/",
};

export default nextConfig;
