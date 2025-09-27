import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		useCache: true,
		cacheLife: {
			"1h": {
				stale: 300, // 5 minutes
				revalidate: 3600, // 1 hour
				expire: 7200, // 2 hours
			},
		},
		optimizeCss: true,
		optimizePackageImports: ["@radix-ui/react-icons", "lucide-react"],
		useLightningcss: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.pexels.com",
				port: "",
				pathname: "/**",
			},
		],
		formats: ["image/webp", "image/avif"],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		minimumCacheTTL: 60,
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},
};

export default nextConfig;
