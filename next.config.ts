/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],  // Claude's Modern fast formats
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Safely allows your Supabase images to load
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'], // Claude's speed boost
  },
};

export default nextConfig;