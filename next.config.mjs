/** @type {import('next').NextConfig} */
const nextConfig = {
  // הגדרת ה-Runtime ל-Edge עבור Cloudflare
  experimental: {
    runtime: 'edge',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
