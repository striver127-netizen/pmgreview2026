import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone", // Enabled for Azure Static Web Apps to reduce size
    outputFileTracingRoot: path.join(process.cwd()),
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
