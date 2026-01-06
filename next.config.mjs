import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: "standalone", // Removed for Azure Static Web Apps compatibility
    images: { unoptimized: true },
    typescript: {
        ignoreBuildErrors: true,
    },
    async rewrites() {
        return [
            {
                source: "/api/external/:path*",
                destination: "https://kobe.pmgasia.co.kr/api/:path*",
            },
        ]
    },
}

export default nextConfig
