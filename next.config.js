/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: true,
    },
    images: {
      domains: ["pixner.net", "res.cloudinary.com","encrypted-tbn2.gstatic.com"],
    },
    swcMinify: true,
  };
  
  module.exports = nextConfig;