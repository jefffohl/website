import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    images: {
        unoptimized: true,
    },
    generateBuildId: async () => {
        return Date.now().toString()
    },
    typescript: {
        tsconfigPath: './tsconfig.json',
    },
    poweredByHeader: false,
}

export default nextConfig
