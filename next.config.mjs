/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ["clsx"],
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
