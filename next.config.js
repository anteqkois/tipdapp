// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.dicebear.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    });
    return config;
  },
};

export default nextConfig;

// if you can change svg color, use currentColor in svg grafic
