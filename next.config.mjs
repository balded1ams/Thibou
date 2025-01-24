/** @type {import('next').NextConfig} */
const nextConfig = {
    //output: 'export', // Outputs a Single-Page Application (SPA).
    distDir: './dist', // Changes the build output directory to `./dist/`.
    basePath: process.env.NEXT_PUBLIC_BASE_PATH, 
    experimental: {
        ppr: false,
    },
    typescript: {
        ignoreBuildErrors: false,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: ['www.unique-poster.com', 'https://musees-reims.fr/', 'https://webmuseo.com', 'arts-graphiques.louvre.fr', 'http://collections.mba-lyon.fr/', 'https://collections.domaine-de-sceaux.hauts-de-seine.fr/']
    },
};

export default nextConfig;