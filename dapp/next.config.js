// /** @type {import('next').NextConfig} */

const nextConfig = {
  // async redirects() {
  //   return [
  //     {
  //       source: '/api/auth/:path*',
  //       destination: 'http://localhost:3001/api/auth/:path*',
  //       permanent: true,
  //       basePath: false,
  //     },
  //   ];
  // },
  experimental: { appDir: true },
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
