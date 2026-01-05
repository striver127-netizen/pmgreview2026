/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: "export", // Disabled for Node.js hosting (Cafe24)
    images: { unoptimized: true },
    typescript: {
        ignoreBuildErrors: true,
    }
}

export default nextConfig
