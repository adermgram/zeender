/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Required for @react-pdf/renderer to work in API routes
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    }
    return config
  },
}

export default nextConfig
