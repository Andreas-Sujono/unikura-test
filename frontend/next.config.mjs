/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "build",
  basePath: "/unikura",
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
