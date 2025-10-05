/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "imgs.search.brave.com", // 👈 allow Brave image CDN
      "wallpapercat.com",      // (if you plan to use this too)
      "your-backend-domain.com" // 👈 replace with your API domain
    ],
  },

};

export default nextConfig;
