import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Static HTML export to out/. Deploys to Cloudflare Pages as plain files, no server.
  output: 'export',
  // Keeps the existing URLs (/privacy/ rather than /privacy).
  trailingSlash: true,
  // The image optimiser needs a server; static export serves images as-is.
  images: { unoptimized: true },
}

export default nextConfig