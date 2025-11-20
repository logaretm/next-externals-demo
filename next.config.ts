import {withSentryConfig} from "@sentry/nextjs";
import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";


const nextConfig: NextConfig = {
  /* config options here */
  // Works with yarn, doesn't work with pnpm or npm
  // Try this one OR the one in the webpack config to test it out
  serverExternalPackages: ['@apm-js-collab/tracing-hooks'],
  webpack: (config, { isServer }) => {
    // has no effect
    // config.optimization.minimize = false;
    // config.optimization.moduleIds = "named";

    // works in all cases, but then there is turbopack
    config.externals = config.externals || [];
    if (isServer) {
      // config.externals.push({
      //   '@apm-js-collab/tracing-hooks': '@apm-js-collab/tracing-hooks'
      // });
    }

    return config;
  }
};

const sentryConfig= withSentryConfig(nextConfig);

export default withBundleAnalyzer({
  enabled: true
})(sentryConfig);