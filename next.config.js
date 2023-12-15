/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  reactStrictMode: false,
  webpack: (config) => {
  config.externals.push({
  sharp: "commonjs sharp",
  canvas: "commonjs canvas"
  })
  return config
  },
  }
  
  module.exports = nextConfig