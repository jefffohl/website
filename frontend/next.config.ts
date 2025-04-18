import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    output: 'export',
    distDir: 'out',
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
