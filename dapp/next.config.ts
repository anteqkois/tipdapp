// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

import { NextConfig } from "next";

// module.exports = {
//   redirects() {
//     return [
//       {
//         source: '/with', // automatically becomes /docs/with-basePath
//         destination: '/another', // automatically becomes /docs/another
//         permanent: false,
//       },
//       {
//         // does not add /docs since basePath: false is set
//         source: '/without-basePath',
//         destination: '/another',
//         basePath: false,
//         permanent: false,
//       },
//     ];
//   },
//   // async redirects() {
//   //   return [
//   //     {
//   //       source: '/test',
//   //       destination: '/XDDDD',
//   //       permanent: true,
//   //       basePath: false,
//   //       // destination: 'http://localhost:3001/api/test/XD',
//   //     },
//   //     {
//   //       source: '/auth/:path*',
//   //       destination: 'http://localhost:3001/:path*',
//   //       permanent: true,
//   //       basePath: false,
//   //     },
//   //   ];
//   // },
//   reactStrictMode: true,
//   images: {
//     domains: ['avatars.dicebear.com'],
//   },
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/,
//       use: [{ loader: '@svgr/webpack', options: { icon: true } }],
//     });
//     return config;
//   },
// };

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
  // appDir: true,
  experimental: { appDir: true },
  images: {
    domains: ['avatars.dicebear.com'],
  },
  webpack(config: NextConfig) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    });
    return config;
  },
};

export default nextConfig;

// if you can change svg color, use currentColor in svg grafic
