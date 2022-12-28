// /** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: { appDir: true },
  images: {
    domains: ['avatars.dicebear.com'],
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      // customize default plugin options
                      inlineStyles: {
                        onlyMatchedOnce: false,
                      },

                      // or disable plugins
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;

// if you can change svg color, use currentColor in svg grafic
