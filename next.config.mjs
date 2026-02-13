/** @type {import('next').NextConfig} */
const nextConfig = {
  // הסרנו את ה-experimental.runtime
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
