// /** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: { appDir: true },
  images: {
    domains: ['avatars.dicebear.com', 'assets.coingecko.com'],
  },
  transpilePackages: ['@tipdapp/contracts'],
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

    config.resolve.fallback = {
      'pino-pretty': false,
      'lokijs': false,
    };
    return config;
  },
};

export default nextConfig;

// if you can change svg color, use currentColor in svg grafic
