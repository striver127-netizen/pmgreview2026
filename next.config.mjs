/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone", // Enabled for Azure Static Web Apps to reduce size
    images: { unoptimized: true },
    typescript: {
        ignoreBuildErrors: true,
    }
}

export default nextConfig
