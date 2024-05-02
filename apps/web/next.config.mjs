/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    reactStrictMode: false,
    typescript: {
      ignoreBuildErrors: true
    },
    transpilePackages: [],
    webpack: config => {
      config.module.rules.push({
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
      });
  
      return config;
    },
    experimental: {
      webpackBuildWorker: true,
    },
  
  };
  
  export default nextConfig;